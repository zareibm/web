import { Heart } from 'lucide-react'
import PageHero from '../components/layout/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import PropertyCard from '../components/property/PropertyCard.jsx'
import { useFavorites } from '../context/FavoritesContext.jsx'
import { PROPERTIES } from '../data/properties.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function SavedPage() {
  useDocumentTitle('Saved Properties')
  const { ids } = useFavorites()

  const saved = PROPERTIES.filter((property) => ids.includes(property.id))

  return (
    <>
      <PageHero
        label="Shortlist"
        title="Saved Properties"
        description={
          saved.length > 0
            ? 'Your shortlist is stored on this device, so it will be here when you come back.'
            : 'Properties you save are kept on this device so you can compare them later.'
        }
      />

      <section className="bg-white py-12 sm:py-16">
        <div className="container-x">
          {saved.length > 0 ? (
            <ul className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
              {saved.map((property, index) => (
                <Reveal as="li" key={property.id} delay={index * 60}>
                  <PropertyCard property={property} />
                </Reveal>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center rounded-card border border-dashed border-navy-200 bg-mist/60 px-6 py-16 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-500 shadow-card">
                <Heart className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h2 className="mt-5 text-lg font-semibold tracking-[-0.015em] text-ink">
                Nothing saved yet
              </h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                Tap the heart on any property to add it to your shortlist.
              </p>
              <Button to="/properties" size="lg" className="mt-6">
                Browse properties
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
