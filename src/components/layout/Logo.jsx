import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn.js'

/**
 * The Horizon mark: a minimal architectural glyph in champagne plus a compact
 * two-line wordmark. `tone="light"` for placement over dark imagery.
 */
export default function Logo({ tone = 'dark', className, onClick }) {
  const light = tone === 'light'

  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Horizon Properties — home"
      className={cn('group inline-flex items-center gap-2.5', className)}
    >
      <span
        className={cn(
          'inline-flex h-9 w-9 items-center justify-center rounded-[10px] transition-colors duration-300',
          light ? 'bg-white/10 ring-1 ring-inset ring-white/20' : 'bg-navy',
        )}
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6" aria-hidden="true" focusable="false">
          <g
            fill="none"
            stroke="#c5a073"
            strokeWidth="1.9"
            strokeLinejoin="round"
            strokeLinecap="round"
          >
            <path d="M7 24.5V13.2L16 7l9 6.2v11.3" />
            <path d="M13 24.5v-6.2h6v6.2" />
            <path d="M5.5 24.5h21" />
          </g>
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'text-[13.5px] font-semibold uppercase tracking-[0.19em] transition-colors duration-300',
            light ? 'text-white' : 'text-ink',
          )}
        >
          Horizon
        </span>
        <span className="mt-[3px] text-[8.5px] font-medium uppercase tracking-[0.34em] text-champagne">
          Properties
        </span>
      </span>
    </Link>
  )
}
