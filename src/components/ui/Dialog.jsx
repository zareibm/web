import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/cn.js'

/**
 * Accessible modal: labelled dialog, Escape to close, backdrop click, body
 * scroll lock and initial focus on the first field.
 */
export default function Dialog({ open, onClose, title, description, children, className }) {
  const panelRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const field = panelRef.current?.querySelector('input, select, textarea')
    const fallback = panelRef.current?.querySelector('button')
    ;(field ?? fallback)?.focus()

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="Close dialog"
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-navy-950/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div
        ref={panelRef}
        className={cn(
          'relative z-10 max-h-[92vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-lift animate-sheet-up sm:max-w-lg sm:rounded-card sm:p-8',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.015em] text-ink">{title}</h2>
            {description ? (
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-mist hover:text-navy"
          >
            <X className="h-[18px] w-[18px]" strokeWidth={1.6} />
          </button>
        </div>

        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}
