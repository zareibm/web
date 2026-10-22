import { cn } from '../../lib/cn.js'

const TONES = {
  solid: 'bg-white text-navy shadow-card hover:bg-navy hover:text-white',
  outline: 'border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white',
  outlineLight: 'border border-white/40 text-white hover:bg-white hover:text-navy',
  glass: 'border border-white/25 bg-navy-950/25 text-white backdrop-blur hover:bg-white hover:text-navy',
  navy: 'bg-navy text-white hover:bg-navy-700',
}

const SIZES = {
  sm: 'h-9 w-9',
  md: 'h-11 w-11',
  lg: 'h-14 w-14',
}

/** Circular icon-only control — carousel arrows, gallery controls, close. */
export default function IconButton({
  label,
  tone = 'solid',
  size = 'md',
  className,
  children,
  ...rest
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full transition-all duration-300 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40',
        TONES[tone],
        SIZES[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
