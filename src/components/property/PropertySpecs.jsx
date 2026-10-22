import { formatNumber } from '../../lib/format.js'

/** Key facts grid used on the detail page. */
export default function PropertySpecs({ property, className }) {
  const items = [
    { label: 'Bedrooms', value: property.beds },
    { label: 'Bathrooms', value: property.baths },
    { label: 'Interior', value: `${formatNumber(property.sqft)} sq ft` },
    { label: 'Lot', value: property.lot },
    { label: 'Year built', value: property.year },
    { label: 'Type', value: property.type },
  ]

  return (
    <dl className={`grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 ${className ?? ''}`}>
      {items.map((item) => (
        <div key={item.label} className="border-t border-navy-100 pt-3.5">
          <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
            {item.label}
          </dt>
          <dd className="mt-1.5 text-[15px] font-medium text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
