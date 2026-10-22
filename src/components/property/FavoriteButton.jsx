import { Heart } from 'lucide-react'
import { useFavorites } from '../../context/FavoritesContext.jsx'
import { cn } from '../../lib/cn.js'

const TONES = {
  glass: 'border-white/30 bg-navy-950/30 text-white backdrop-blur-sm hover:bg-white hover:text-navy',
  plain: 'border-navy-100 bg-white text-ink-soft hover:border-navy/30 hover:text-navy',
}

/** Toggles a property in the saved list; state persists across sessions. */
export default function FavoriteButton({
  propertyId,
  propertyName,
  tone = 'glass',
  size = 'md',
  className,
}) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(propertyId)

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? `Remove ${propertyName} from saved` : `Save ${propertyName}`}
      title={active ? 'Remove from saved' : 'Save property'}
      onClick={() => toggle(propertyId)}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-2',
        size === 'lg' ? 'h-11 w-11' : 'h-9 w-9',
        TONES[tone],
        active && 'border-transparent bg-white text-champagne-dark hover:bg-white hover:text-champagne-dark',
        className,
      )}
    >
      <Heart
        className={size === 'lg' ? 'h-[19px] w-[19px]' : 'h-[17px] w-[17px]'}
        strokeWidth={1.8}
        fill={active ? 'currentColor' : 'none'}
        aria-hidden="true"
      />
    </button>
  )
}
