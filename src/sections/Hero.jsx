import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import { IMAGES } from '../data/images.js'

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[88svh] flex-col overflow-hidden bg-navy-950 sm:min-h-[92svh]">
      <img
        src={IMAGES.hero}
        alt="Contemporary villa with an infinity pool at dusk"
        className="absolute inset-0 h-full w-full object-cover animate-hero-zoom"
        loading="eager"
        decoding="async"
      />

      {/* Overlay keeps the headline readable without flattening the photograph. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-950/75 via-navy-950/45 to-navy-950/80"
      />

      <div className="container-x relative flex flex-1 flex-col justify-start pb-24 pt-[22vh] text-center sm:pb-28 sm:pt-[25vh]">
        <h1 className="animate-fade-up text-[clamp(2.4rem,6.4vw,5.1rem)] font-semibold leading-[1.03] tracking-[-0.032em] text-white text-balance">
          Discover Exceptional
          <br className="hidden sm:block" /> Homes &amp; Investments
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl animate-fade-up text-[15px] leading-relaxed text-white/80 text-pretty sm:text-[17px]"
          style={{ animationDelay: '130ms' }}
        >
          Premium properties in prime locations. Find your dream home or the perfect investment with
          confidence.
        </p>

        <div
          className="mt-9 flex animate-fade-up flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: '240ms' }}
        >
          <Button to="/properties" variant="champagne" size="lg">
            Explore Properties
            <ArrowRight
              className="h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </Button>
          <Button to="/contact" variant="outlineLight" size="lg">
            Book a Consultation
          </Button>
        </div>
      </div>

      <div className="container-x relative pb-10">
        <div
          className="mx-auto flex animate-fade-up flex-col items-center gap-2.5"
          style={{ animationDelay: '380ms' }}
        >
          <span className="h-10 w-px bg-gradient-to-b from-transparent to-champagne/70" aria-hidden="true" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">
            Scroll to explore
          </span>
        </div>
      </div>
    </section>
  )
}
