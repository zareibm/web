import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { IMAGES } from '../data/images.js'

export default function WhoWeAre() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            label="About Us"
            title="Who We Are"
            description="At Horizon Properties, we connect people with extraordinary homes and smart investments. Integrity, transparency, and client satisfaction are at the heart of everything we do."
          />

          <Button to="/about" size="lg" className="mt-8">
            Learn More
            <ArrowRight
              className="h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={1.9}
              aria-hidden="true"
            />
          </Button>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={120}>
          <div className="relative">
            <div className="grid grid-cols-12 items-end gap-3 sm:gap-4">
              <div className="group/img col-span-8 overflow-hidden rounded-card bg-navy-100">
                <img
                  src={IMAGES.aboutPrimary}
                  alt="A contemporary two-storey home with a landscaped garden"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover/img:scale-[1.05]"
                />
              </div>

              <div className="group/img col-span-4 overflow-hidden rounded-card bg-navy-100">
                <img
                  src={IMAGES.aboutSecondary}
                  alt="A detail of a modern residential facade"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover/img:scale-[1.05]"
                />
              </div>
            </div>

            <Link
              to="/properties"
              aria-label="Browse our properties"
              className="group/btn absolute bottom-8 left-[66.6%] inline-flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-navy text-white shadow-lift transition-colors duration-300 ease-editorial hover:bg-champagne hover:text-navy-950"
            >
              <ArrowRight
                className="h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-0.5"
                strokeWidth={1.8}
                aria-hidden="true"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
