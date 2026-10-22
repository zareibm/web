import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Scroll-driven video scrubbing.
 *
 * The film is never played — `video.play()` is not called anywhere. Scroll
 * position is mapped onto `video.currentTime`, so the user scrubs the timeline
 * forwards and backwards by scrolling, and the frame freezes the moment the
 * scroll stops.
 *
 * How it stays smooth:
 *
 *  - The scroll listener does nothing but restart the animation frame loop.
 *    It never reads layout and never touches the video, so it cannot be
 *    flooded by a high-rate input device (trackpad, momentum, touch).
 *  - All measurement (`getBoundingClientRect`) and all writing (currentTime,
 *    the caller's progress callback) happen inside one requestAnimationFrame
 *    tick — read then write, once per frame, never more.
 *  - The scroll progress is eased with a frame-rate independent exponential
 *    approach (~60 ms to close the gap), so a coarse wheel step does not jump
 *    the picture while a fast flick still tracks the finger.
 *  - Seeks are coalesced: one at a time, only when the target has moved more
 *    than ~half a frame, with a timeout so a missing `seeked` event can never
 *    freeze the timeline.
 *  - Nothing is stored in React state. A scroll frame re-renders nothing; the
 *    only state changes are the three lifecycle ones (loading/ready/error).
 */

const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value)

/** Vertical scroll budget, in vh: how much scrolling one second of footage is worth. */
const TRAVEL_VH_PER_SECOND = 25
const DEFAULT_TRAVEL_VH = 200
const MIN_TRAVEL_VH = 200
const MAX_TRAVEL_VH = 400

/** Exponential approach rate (per second). 16 ≈ a 60 ms time constant. */
const SMOOTHING = 16
/** Ignore sub-frame differences: ~half a frame at 24 fps. */
const SEEK_EPSILON = 0.02
/** Progress delta below which the eased value snaps and the loop may idle. */
const SETTLE_EPSILON = 0.0015
/** Never wait longer than this for a `seeked` event before seeking again. */
const SEEK_TIMEOUT = 150
/** Give up and fall back to the still if no frame has decoded by then. */
const READY_TIMEOUT = 15000

export default function useScrollScrubVideo(onProgress) {
  const sectionRef = useRef(null)
  const stickyRef = useRef(null)
  const videoRef = useRef(null)

  // The callback changes identity on every render; keep it in a ref so the
  // loop and the effect never have to be torn down because of it.
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  const [status, setStatus] = useState('loading')
  const [travelVh, setTravelVh] = useState(DEFAULT_TRAVEL_VH)
  const [enabled, setEnabled] = useState(
    () =>
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  // Animation state is deliberately outside React.
  const targetRef = useRef(0)
  const currentRef = useRef(0)
  const rafRef = useRef(0)
  const lastFrameRef = useRef(0)
  const seekingRef = useRef(false)
  const lastSeekAtRef = useRef(0)
  const snapRef = useRef(false)

  // Reduced motion can be switched on while the page is open.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setEnabled(!query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const step = useCallback(() => {
    rafRef.current = 0

    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const now = performance.now()
    // Clamped so a backgrounded tab (or a long jank) cannot teleport the frame.
    const dt = Math.min((now - lastFrameRef.current) / 1000, 1 / 20)
    lastFrameRef.current = now

    // 1. Where does the scroll say the film should be?
    const rect = section.getBoundingClientRect()
    const frameHeight = stickyRef.current
      ? stickyRef.current.getBoundingClientRect().height
      : window.innerHeight
    const travel = Math.max(rect.height - frameHeight, 1)
    targetRef.current = clamp01(-rect.top / travel)

    // 2. Ease towards it.
    let stopped = false
    if (snapRef.current) {
      // First frame after the film arrived: land exactly on the scroll
      // position instead of easing in from 0, which would look like a
      // fast-forward burst behind the fade-in.
      snapRef.current = false
      currentRef.current = targetRef.current
    } else {
      const alpha = 1 - Math.exp(-SMOOTHING * dt)
      const next = currentRef.current + (targetRef.current - currentRef.current) * alpha
      stopped = Math.abs(targetRef.current - next) < SETTLE_EPSILON
      currentRef.current = stopped ? targetRef.current : next
    }

    // 3. Scrub. Nothing is seeked until a frame has actually decoded.
    const duration = video.duration
    let pending = false
    if (Number.isFinite(duration) && duration > 0 && video.readyState >= 2) {
      const time = currentRef.current * duration
      // `currentTime` reads back the value we asked for even while the seek is
      // still decoding, so this stays true until the last request lands.
      pending = Math.abs(time - video.currentTime) > SEEK_EPSILON
      const canSeek = !seekingRef.current || now - lastSeekAtRef.current > SEEK_TIMEOUT
      if (pending && canSeek) {
        seekingRef.current = true
        lastSeekAtRef.current = now
        video.currentTime = time
      }
    }

    onProgressRef.current?.(currentRef.current)

    // Keep the loop alive while the picture still has to catch up with the
    // scroll, then idle completely — no rAF ticking on a still page.
    if (!stopped || pending) rafRef.current = requestAnimationFrame(step)
  }, [])

  const start = useCallback(() => {
    if (rafRef.current) return
    lastFrameRef.current = performance.now()
    rafRef.current = requestAnimationFrame(step)
  }, [step])

  useEffect(() => {
    if (!enabled) return undefined

    const video = videoRef.current
    if (!video) return undefined

    let watchdog = 0

    const onInput = () => start()

    const onLoadedMetadata = () => {
      const { duration } = video
      if (!Number.isFinite(duration) || duration <= 0) return
      const travel = Math.round(duration * TRAVEL_VH_PER_SECOND)
      setTravelVh(Math.min(Math.max(travel, MIN_TRAVEL_VH), MAX_TRAVEL_VH))
    }

    const onLoadedData = () => {
      window.clearTimeout(watchdog)
      seekingRef.current = false
      snapRef.current = true
      setStatus('ready')
      start()
    }

    const onSeeked = () => {
      seekingRef.current = false
      start()
    }

    const onError = () => {
      window.clearTimeout(watchdog)
      setStatus('error')
    }

    window.addEventListener('scroll', onInput, { passive: true })
    window.addEventListener('resize', onInput)
    video.addEventListener('loadedmetadata', onLoadedMetadata)
    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('error', onError)

    // A stalled or blocked download must not leave the hero waiting forever.
    watchdog = window.setTimeout(() => {
      if (video.readyState < 2) setStatus('error')
    }, READY_TIMEOUT)

    start()

    return () => {
      window.clearTimeout(watchdog)
      window.removeEventListener('scroll', onInput)
      window.removeEventListener('resize', onInput)
      video.removeEventListener('loadedmetadata', onLoadedMetadata)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('error', onError)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = 0
    }
  }, [enabled, start])

  return {
    sectionRef,
    stickyRef,
    videoRef,
    status,
    enabled,
    // Total height of the scroll area: the pinned viewport plus the travel.
    heightVh: 100 + travelVh,
  }
}
