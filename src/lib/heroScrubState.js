import { useEffect, useState } from 'react'

/**
 * Whether the scroll-driven hero currently owns the viewport.
 *
 * The hero is ~3 viewports tall and its film only finishes at the very end of
 * that scroll, so the header has to stay transparent over the whole scene —
 * otherwise it turns solid white across the film after the first wheel notch.
 * The header sits outside the hero in the tree, so the flag travels as a DOM
 * event instead of prop drilling through pages and layout.
 *
 * It only flips twice per visit (hero entered / hero finished), never per
 * scroll frame, so the subscriber re-renders at most twice.
 */
const EVENT = 'horizon:hero-scrub'

let active = false

export function setHeroScrubActive(next) {
  if (next === active) return
  active = next
  window.dispatchEvent(new CustomEvent(EVENT, { detail: active }))
}

export function useHeroScrubActive() {
  const [value, setValue] = useState(active)

  useEffect(() => {
    const onChange = (event) => setValue(event.detail)
    window.addEventListener(EVENT, onChange)
    setValue(active)
    return () => window.removeEventListener(EVENT, onChange)
  }, [])

  return value
}
