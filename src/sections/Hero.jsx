import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import { IMAGES } from '../data/images.js'
import { VIDEOS } from '../data/videos.js'
import useScrollScrubVideo from '../hooks/useScrollScrubVideo.js'
import { setHeroScrubActive } from '../lib/heroScrubState.js'
import { cn } from '../lib/cn.js'

/**
 * The headline holds for the opening beat, then recedes as the scene takes
 * over the screen. Fractions of the hero's scroll progress.
 */
const TEXT_FADE_START = 0.34
const TEXT_FADE_END = 0.62
const TEXT_LIFT_PX = 26

const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value)
const smoothstep = (value) => {
  const t = clamp01(value)
  return t * t * (3 - 2 * t)
}

/**
 * The hero is a pinned, scroll-scrubbed film: three viewports of scroll carry
 * the timeline from its first frame to its last, and the film is paused the
 * whole way — see `useScrollScrubVideo`.
 *
 * Everything the scroll touches is written straight to the DOM from the
 * animation frame loop. This component re-renders three times in its life
 * (loading, ready, error), never once per scroll frame.
 */
export default function Hero() {
  const textRef = useRef(null)
  const hintRef = useRef(null)
  const [isNarrow] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches,
  )

  const handleProgress = useCallback((progress) => {
    const text = textRef.current
    if (text) {
      const eased = smoothstep((progress - TEXT_FADE_START) / (TEXT_FADE_END - TEXT_FADE_START))
      text.style.opacity = String(1 - eased)
      text.style.transform = `translate3d(0, ${(-TEXT_LIFT_PX * eased).toFixed(2)}px, 0)`
      // An invisible CTA must not keep swallowing clicks where it used to be.
      text.style.pointerEvents = eased > 0.85 ? 'none' : ''
    }

    const hint = hintRef.current
    if (hint) hint.style.opacity = String(1 - clamp01(progress / 0.05))

    setHeroScrubActive(progress < 0.999)
  }, [])

  const { sectionRef, stickyRef, videoRef, status, enabled, heightVh } =
    useScrollScrubVideo(handleProgress)

  const scrubActive = enabled && status !== 'error'
  const showLoader = enabled && status === 'loading'
  const showFilm = enabled && status !== 'error'

  // Leaving the page mid-film must not strand the header in its light state.
  useEffect(() => () => setHeroScrubActive(false), [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-navy-950"
      // Without a film there is nothing to scrub through, so the scroll area
      // collapses to a plain single-viewport hero rather than 200 vh of
      // empty navy.
      style={scrubActive ? { height: `${heightVh}vh` } : undefined}
    >
      <div
        ref={stickyRef}
        className={cn(
          'isolate flex flex-col overflow-hidden',
          scrubActive ? 'sticky top-0 h-svh' : 'relative h-svh',
        )}
      >
        {/* Painted first and left in place: it is the fallback if the film
            never arrives, and it covers the sliver a short viewport leaves
            while the film scrubs. */}
        <img
          src={IMAGES.hero}
          alt={
            showFilm
              ? ''
              : 'Contemporary villa with an infinity pool at dusk'
          }
          aria-hidden={showFilm || undefined}
          className={cn(
            'absolute inset-0 h-full w-full object-cover',
            !showFilm && 'animate-hero-zoom',
          )}
          loading="eager"
          decoding="async"
        />

        {enabled ? (
          <video
            ref={videoRef}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-editorial',
              status === 'ready' ? 'opacity-100' : 'opacity-0',
            )}
            preload="auto"
            muted
            playsInline
            disablePictureInPicture
            tabIndex={-1}
            aria-hidden="true"
          >
            <source src={isNarrow ? VIDEOS.hero.mobile : VIDEOS.hero.desktop} type="video/mp4" />
            {/* Engines without H.264 fall through to the WebM master. */}
            {isNarrow ? null : <source src={VIDEOS.hero.webm} type="video/webm" />}
          </video>
        ) : null}

        {/* Enough scrim to carry white type over a bright film, kept light
            through the middle so the picture stays dominant. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-950/25 to-navy-950/75"
        />

        <div
          ref={textRef}
          className="container-x relative flex flex-1 flex-col justify-start pb-24 pt-[22vh] text-center will-change-[opacity,transform] sm:pb-28 sm:pt-[25vh]"
        >
          <h1 className="animate-fade-up text-[clamp(2.4rem,6.4vw,5.1rem)] font-semibold leading-[1.03] tracking-[-0.032em] text-white text-balance">
            Discover Exceptional
            <br className="hidden sm:block" /> Homes &amp; Investments
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl animate-fade-up text-[15px] leading-relaxed text-white/80 text-pretty sm:text-[17px]"
            style={{ animationDelay: '130ms' }}
          >
            Premium properties in prime locations. Find your dream home or the perfect investment
            with confidence.
          </p>

          <div
            className="mt-9 flex animate-fade-up flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: '240ms' }}
          >
            <Button to="/properties" variant="champagne" size="lg">
              Explore Properties
              <ArrowRight
                className="h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </Button>
            <Button to="/contact" variant="outlineLight" size="lg">
              Book a Consultation
            </Button>
          </div>
        </div>

        <div className="container-x relative pb-10">
          {showLoader ? (
            <div
              className="mx-auto flex animate-fade-in-late flex-col items-center gap-3"
              role="status"
            >
              <span className="h-px w-28 overflow-hidden bg-white/15" aria-hidden="true">
                <span className="block h-full w-1/3 animate-hero-loading bg-champagne/80" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
                Preparing the scene
              </span>
            </div>
          ) : (
            <div ref={hintRef} className="mx-auto flex flex-col items-center gap-2.5">
              <span
                className="h-10 w-px bg-gradient-to-b from-transparent to-champagne/70"
                aria-hidden="true"
              />
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
                Scroll to explore
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
