import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import PageHero from '../components/layout/PageHero.jsx'
import PropertyCard from '../components/property/PropertyCard.jsx'
import PropertyFilters from '../components/property/PropertyFilters.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import { PROPERTIES } from '../data/properties.js'
import { DEFAULT_FILTERS, filterAndSortProperties } from '../lib/propertyQuery.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function PropertiesPage() {
  useDocumentTitle('Properties')
  const [filters, setFilters] = useState(DEFAULT_FILTERS)

  const results = useMemo(() => filterAndSortProperties(PROPERTIES, filters), [filters])

  return (
    <>
      <PageHero
        label="Portfolio"
        title="Properties"
        description="Every home we currently represent. Filter by location, type, price and size to narrow the list."
      />

      <section className="bg-white py-10 sm:py-14">
        <div className="container-x">
          <PropertyFilters filters={filters} onChange={setFilters} resultCount={results.length} />

          {results.length > 0 ? (
            <ul className="mt-9 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
              {results.map((property, index) => (
                <Reveal as="li" key={property.id} delay={Math.min(index, 5) * 60}>
                  <PropertyCard property={property} priority={index < 3} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="mt-10 flex flex-col items-center rounded-card border border-dashed border-navy-200 bg-mist/60 px-6 py-16 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-500 shadow-card">
                <SearchX className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.015em] text-ink">
                No properties match those filters
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                Try widening the price range or clearing the location filter. New listings are added
                every week.
              </p>
              <Button
                variant="outline"
                size="md"
                className="mt-6"
                onClick={() => setFilters({ ...DEFAULT_FILTERS })}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
