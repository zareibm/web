/** `2350000` → `$2.35 Million` (matches the editorial style of the reference). */
export function formatPrice(value) {
  if (value == null || Number.isNaN(value)) return 'Price on request'

  if (value >= 1_000_000) {
    const millions = value / 1_000_000
    const rounded = millions >= 10 ? millions.toFixed(1) : millions.toFixed(2)
    return `$${rounded.replace(/\.0+$/, '')} Million`
  }

  return `$${value.toLocaleString('en-US')}`
}

/** Compact axis/card labels: 1250000 → `1.25M`. */
export function formatCompact(value) {
  if (value == null) return '—'
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2).replace(/\.?0+$/, '')}M`
  if (value >= 1_000) return `${Math.round(value / 1_000)}K`
  return String(value)
}

export function formatNumber(value) {
  if (value == null) return '—'
  return value.toLocaleString('en-US')
}
