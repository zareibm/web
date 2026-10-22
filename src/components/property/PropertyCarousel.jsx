import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PropertyCard from './PropertyCard.jsx'
import IconButton from '../ui/IconButton.jsx'

/**
 * Horizontal, snap-scrolling property carousel.
 *
 * - native touch swipe on mobile (the track is a real scroll container)
 * - mouse drag on desktop
 * - previous / next buttons that page by one card
 * - arrow-key navigation when the track has focus
 */
export default function PropertyCarousel({ properties, ariaLabel = 'Property carousel' }) {
  const trackRef = useRef(null)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 8)
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined

    updateArrows()
    track.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)

    return () => {
      track.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  const page = useCallback((direction) => {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector('[data-carousel-item]')
    const step = card ? card.getBoundingClientRect().width + 20 : track.clientWidth * 0.8
    track.scrollBy({ left: direction * step, behavior: 'smooth' })
  }, [])

  function onPointerDown(event) {
    const track = trackRef.current
    // Touch uses the native momentum scroll; only mouse needs drag emulation.
    if (!track || event.pointerType !== 'mouse' || event.button !== 0) return
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
      moved: false,
    }
    track.classList.add('cursor-grabbing')
  }

  function onPointerMove(event) {
    const track = trackRef.current
    if (!track || !drag.current.active || event.pointerType !== 'mouse') return

    const delta = event.clientX - drag.current.startX
    if (Math.abs(delta) > 4) drag.current.moved = true
    track.scrollLeft = drag.current.startScroll - delta
  }

  function endDrag(event) {
    const track = trackRef.current
    if (!track || !drag.current.active) return
    drag.current.active = false
    track.classList.remove('cursor-grabbing')
    if (event?.pointerId != null && track.hasPointerCapture?.(event.pointerId)) {
      track.releasePointerCapture(event.pointerId)
    }
  }

  function onClickCapture(event) {
    // A drag should never be read as a click on the card underneath.
    if (drag.current.moved) {
      event.preventDefault()
      event.stopPropagation()
      drag.current.moved = false
    }
  }

  function onKeyDown(event) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      page(1)
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      page(-1)
    }
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className="relative"
    >
      <div className="flex justify-end">
        <div className="hidden items-center gap-2.5 lg:flex">
          <IconButton label="Previous properties" onClick={() => page(-1)} disabled={!canPrev}>
            <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </IconButton>
          <IconButton label="Next properties" onClick={() => page(1)} disabled={!canNext}>
            <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </IconButton>
        </div>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="no-scrollbar mt-5 flex cursor-grab snap-x snap-mandatory select-none gap-5 overflow-x-auto pb-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4 lg:mt-6"
      >
        {properties.map((property, index) => (
          <li
            key={property.id}
            data-carousel-item
            className="w-[264px] shrink-0 snap-start sm:w-[300px] lg:w-[330px]"
          >
            <PropertyCard property={property} priority={index === 0} />
          </li>
        ))}
      </ul>

      {/* Below lg the overlay-free arrow pair sits under the track. */}
      <div className="mt-7 flex items-center justify-center gap-3 lg:hidden">
        <IconButton label="Previous properties" onClick={() => page(-1)} disabled={!canPrev}>
          <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
        </IconButton>
        <IconButton label="Next properties" onClick={() => page(1)} disabled={!canNext}>
          <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
        </IconButton>
      </div>
    </div>
  )
}
