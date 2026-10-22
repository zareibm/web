import { cn } from '../../lib/cn.js'

/**
 * Section label + title + optional description. `tone="light"` for navy
 * backgrounds.
 */
export default function SectionHeading({
  label,
  title,
  description,
  align = 'left',
  tone = 'dark',
  as: Tag = 'h2',
  className,
  descriptionClassName,
}) {
  const light = tone === 'light'

  return (
    <div className={cn(align === 'center' && 'mx-auto max-w-2xl text-center', className)}>
      {label ? <p className="label-eyebrow">{label}</p> : null}
      <Tag
        className={cn(
          'mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.022em] text-balance',
          light ? 'text-white' : 'text-ink',
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            'mt-4 max-w-xl text-[15px] leading-relaxed',
            align === 'center' && 'mx-auto',
            light ? 'text-white/70' : 'text-muted',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}
