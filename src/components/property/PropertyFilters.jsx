import { RotateCcw, Sparkles } from 'lucide-react'
import { cn } from '../../lib/cn.js'
import { SearchField, SelectField } from '../ui/Field.jsx'
import {
  BATH_OPTIONS,
  BED_OPTIONS,
  DEFAULT_FILTERS,
  LOCATION_OPTIONS,
  PRICE_BUCKETS,
  SORT_OPTIONS,
  TYPE_OPTIONS,
  countActiveFilters,
} from '../../lib/propertyQuery.js'

/** Normalises every option source into the `{ value, label }` shape SelectField takes. */
const toOptions = (items) => items.map((item) => ({ value: item.id, label: item.label }))

const LOCATION_SELECT = [
  { value: 'any', label: 'All locations' },
  ...LOCATION_OPTIONS.map((location) => ({ value: location, label: location })),
]
const TYPE_SELECT = [
  { value: 'any', label: 'All types' },
  ...TYPE_OPTIONS.map((type) => ({ value: type, label: type })),
]
const PRICE_SELECT = toOptions(PRICE_BUCKETS)
const SORT_SELECT = toOptions(SORT_OPTIONS)
const BED_SELECT = toOptions(BED_OPTIONS)
const BATH_SELECT = toOptions(BATH_OPTIONS)

export default function PropertyFilters({ filters, onChange, resultCount }) {
  const activeCount = countActiveFilters(filters)

  const set = (key) => (event) => onChange({ ...filters, [key]: event.target.value })

  const reset = () => onChange({ ...DEFAULT_FILTERS })

  return (
    <div className="surface p-4 shadow-card sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <SearchField
          id="property-search"
          label="Search"
          className="lg:flex-1"
          value={filters.query}
          onChange={set('query')}
          placeholder="Search by name, city or property type"
        />

        <div className="flex flex-col gap-1.5 lg:w-auto">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Featured
          </span>
          <button
            type="button"
            aria-pressed={Boolean(filters.featuredOnly)}
            onClick={() => onChange({ ...filters, featuredOnly: !filters.featuredOnly })}
            className={cn(
              'inline-flex h-11 items-center justify-center gap-2 rounded-xl border px-4 text-[13px] font-medium transition-colors duration-200',
              filters.featuredOnly
                ? 'border-transparent bg-navy text-white'
                : 'border-navy-100 bg-white text-ink-soft hover:border-navy/30 hover:text-navy',
            )}
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            Featured only
          </button>
        </div>

        <SelectField
          id="filter-sort"
          label="Sort by"
          className="lg:w-56"
          value={filters.sort}
          onChange={set('sort')}
          options={SORT_SELECT}
        />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <SelectField
          id="filter-location"
          label="Location"
          value={filters.location}
          onChange={set('location')}
          options={LOCATION_SELECT}
        />
        <SelectField
          id="filter-type"
          label="Property type"
          value={filters.type}
          onChange={set('type')}
          options={TYPE_SELECT}
        />
        <SelectField
          id="filter-price"
          label="Price range"
          value={filters.price}
          onChange={set('price')}
          options={PRICE_SELECT}
        />
        <SelectField
          id="filter-beds"
          label="Bedrooms"
          value={filters.beds}
          onChange={set('beds')}
          options={BED_SELECT}
        />
        <SelectField
          id="filter-baths"
          label="Bathrooms"
          value={filters.baths}
          onChange={set('baths')}
          options={BATH_SELECT}
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-navy-100 pt-4">
        <p className="text-[13px] text-muted" role="status" aria-live="polite">
          <span className="font-semibold text-ink">{resultCount}</span>{' '}
          {resultCount === 1 ? 'property' : 'properties'}
          {activeCount > 0 ? ` · ${activeCount} filter${activeCount === 1 ? '' : 's'} applied` : ''}
        </p>

        {activeCount > 0 || filters.query ? (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-navy transition-colors duration-200 hover:text-champagne-dark"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.9} aria-hidden="true" />
            Clear all filters
          </button>
        ) : null}
      </div>
    </div>
  )
}
