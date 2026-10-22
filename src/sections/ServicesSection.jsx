import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { IMAGES } from '../data/images.js'
import { SERVICES } from '../data/site.js'

export default function ServicesSection() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading
              label="Services"
              title="What We Do"
              description="Six disciplines, one team. Everything a home or an investment needs from first conversation to completion."
            />
          </Reveal>

          <Reveal delay={120} className="group/img mt-10 overflow-hidden rounded-card bg-navy-100">
            <img
              src={IMAGES.servicesPrimary}
              alt="A modern residence with a reflecting pool at golden hour"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover/img:scale-[1.04]"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="border-y border-navy-100">
            {SERVICES.map((service, index) => (
              <li key={service.id} className="border-b border-navy-100 last:border-b-0">
                <Link
                  to="/services"
                  className="group flex items-start gap-5 py-6 transition-colors duration-300 sm:gap-7 sm:py-7"
                >
                  <span className="mt-1 text-[11px] font-semibold tracking-[0.2em] text-champagne">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="flex-1">
                    <span className="flex items-start justify-between gap-5">
                      <span className="text-[17px] font-semibold tracking-[-0.012em] text-ink transition-colors duration-300 group-hover:text-navy-600 sm:text-lg">
                        {service.title}
                      </span>
                      <ArrowUpRight
                        className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne-dark"
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1.5 block max-w-md text-[13.5px] leading-relaxed text-muted">
                      {service.blurb}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
