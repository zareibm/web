import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react'
import IconButton from '../ui/IconButton.jsx'
import { cn } from '../../lib/cn.js'

/**
 * Detail-page gallery: hero image with inline stepping, a thumbnail rail and a
 * fullscreen viewer (arrow keys + Escape).
 */
export default function PropertyGallery({ photos, title }) {
  const total = photos.length
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const go = useCallback(
    (delta) => setIndex((current) => (current + delta + total) % total),
    [total],
  )

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, go])

  return (
    <div>
      <div className="relative overflow-hidden rounded-card bg-navy-100">
        <img
          src={photos[index]}
          alt={`${title} — photo ${index + 1} of ${total}`}
          className="aspect-[16/11] w-full object-cover sm:aspect-[16/9]"
          decoding="async"
        />

        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 sm:inset-x-4 sm:bottom-4">
          <div className="flex items-center gap-2">
            <IconButton label="Previous photo" tone="glass" size="sm" onClick={() => go(-1)}>
              <ArrowLeft className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </IconButton>
            <IconButton label="Next photo" tone="glass" size="sm" onClick={() => go(1)}>
              <ArrowRight className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </IconButton>
            <span className="rounded-pill bg-navy-950/40 px-3 py-1.5 text-[11.5px] font-medium text-white backdrop-blur-sm">
              {index + 1} / {total}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-pill bg-white/92 px-3.5 py-2 text-[12.5px] font-medium text-navy backdrop-blur-sm transition-colors duration-300 hover:bg-white"
          >
            <Expand className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden="true" />
            View all photos
          </button>
        </div>
      </div>

      <ul className="no-scrollbar mt-3 flex gap-3 overflow-x-auto">
        {photos.map((photo, photoIndex) => (
          <li key={photo} className="shrink-0">
            <button
              type="button"
              onClick={() => setIndex(photoIndex)}
              aria-label={`Show photo ${photoIndex + 1}`}
              aria-current={photoIndex === index ? 'true' : undefined}
              className={cn(
                'block overflow-hidden rounded-lg transition-all duration-300',
                photoIndex === index
                  ? 'ring-2 ring-champagne ring-offset-2'
                  : 'opacity-70 hover:opacity-100',
              )}
            >
              <img
                src={photo}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-16 w-24 object-cover sm:h-[70px] sm:w-28"
              />
            </button>
          </li>
        ))}
      </ul>

      {open ? (
        <div
          className="fixed inset-0 z-[95] flex flex-col bg-navy-950/96 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
            <p className="text-[12.5px] font-medium tracking-[0.02em] text-white/70">
              {title} — {index + 1} of {total}
            </p>
            <IconButton label="Close gallery" tone="glass" size="sm" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            </IconButton>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
            <img
              src={photos[index]}
              alt={`${title} — photo ${index + 1} of ${total}`}
              className="max-h-full w-auto max-w-full rounded-card object-contain"
            />

            <div className="absolute inset-y-0 left-2 flex items-center sm:left-4">
              <IconButton label="Previous photo" tone="glass" onClick={() => go(-1)}>
                <ArrowLeft className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
              </IconButton>
            </div>
            <div className="absolute inset-y-0 right-2 flex items-center sm:right-4">
              <IconButton label="Next photo" tone="glass" onClick={() => go(1)}>
                <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
              </IconButton>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
