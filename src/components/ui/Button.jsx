import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn.js'

const BASE =
  'group inline-flex items-center justify-center gap-2.5 rounded-pill font-medium tracking-[0.01em] transition-all duration-300 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'

const VARIANTS = {
  primary: 'bg-navy text-white shadow-card hover:bg-navy-700 hover:shadow-lift',
  champagne: 'bg-champagne text-navy-950 hover:bg-champagne-dark hover:text-white',
  outline: 'border border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white',
  outlineLight: 'border border-white/40 text-white hover:bg-white hover:text-navy',
  subtle: 'bg-mist text-navy hover:bg-navy-100',
  ghost: 'text-navy hover:text-champagne-dark',
}

const SIZES = {
  sm: 'h-10 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-[52px] px-7 text-[15px]',
}

/**
 * One button for the whole site. Renders a router link, an anchor or a real
 * <button> depending on the props supplied.
 */
export default function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  children,
  type = 'button',
  ...rest
}) {
  const classes = cn(BASE, VARIANTS[variant], SIZES[size], className)

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
