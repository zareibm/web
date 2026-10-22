import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import PropertyCarousel from '../components/property/PropertyCarousel.jsx'
import { getFeaturedProperties } from '../data/properties.js'

export default function FeaturedProperties() {
  const featured = getFeaturedProperties()

  return (
    <section className="bg-mist py-16 sm:py-24 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            label="Featured"
            title="Featured Properties"
            description="A considered selection of the homes we currently represent, updated as mandates come and go."
            align="center"
          />
        </Reveal>

        <Reveal className="mt-12 lg:mt-14" delay={100}>
          <PropertyCarousel properties={featured} ariaLabel="Featured properties" />
        </Reveal>

        <div className="mt-10 flex justify-center lg:mt-8">
          <Button to="/properties" variant="outline" size="lg">
            View all properties
            <ArrowRight
              className="h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </Button>
        </div>
      </div>
    </section>
  )
}
