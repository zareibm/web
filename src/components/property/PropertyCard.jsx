import { Link } from 'react-router-dom'
import { Bath, BedDouble, MapPin, Maximize } from 'lucide-react'
import FavoriteButton from './FavoriteButton.jsx'
import { formatNumber, formatPrice } from '../../lib/format.js'
import { cn } from '../../lib/cn.js'

const SPECS = (property) => [
  { icon: BedDouble, label: `${property.beds} Beds` },
  { icon: Bath, label: `${property.baths} Baths` },
  { icon: Maximize, label: `${formatNumber(property.sqft)} sq ft` },
]

/** The single reusable property card — carousel, grids and saved list. */
export default function PropertyCard({ property, priority = false, className }) {
  return (
    <article className={cn('group relative', className)}>
      <Link
        to={`/properties/${property.slug}`}
        className="block rounded-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne focus-visible:ring-offset-4"
      >
        <div className="relative overflow-hidden rounded-card bg-navy-100">
          <div className="aspect-[4/5]">
            <img
              src={property.cover}
              alt={`${property.name} — ${property.location.label}`}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.06]"
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-navy-950/5"
          />

          <span className="absolute left-3.5 top-3.5 inline-flex max-w-[calc(100%-4rem)] items-center gap-1.5 rounded-pill bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy backdrop-blur-sm">
            <MapPin className="h-3 w-3 shrink-0 text-champagne-dark" strokeWidth={2.1} aria-hidden="true" />
            <span className="truncate">
              {property.location.city}, {property.location.region}
            </span>
          </span>

          <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-champagne">
              {property.status} · {property.type}
            </p>
            <h3 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-[-0.012em]">
              {property.name}
            </h3>
            <p className="mt-1 text-[15px] font-medium text-white/95">{formatPrice(property.price)}</p>
          </div>
        </div>
      </Link>

      <FavoriteButton
        propertyId={property.id}
        propertyName={property.name}
        className="absolute right-3.5 top-3.5"
      />

      <ul className="mt-3 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12.5px] text-muted">
        {SPECS(property).map(({ icon: Icon, label }, index) => (
          <li key={label} className="inline-flex items-center gap-1.5">
            {index > 0 ? <span aria-hidden="true" className="mr-2 h-3 w-px bg-navy-100" /> : null}
            <Icon className="h-[15px] w-[15px] text-navy-500" strokeWidth={1.8} aria-hidden="true" />
            {label}
          </li>
        ))}
      </ul>
    </article>
  )
}
