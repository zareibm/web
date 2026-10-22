import { Check } from 'lucide-react'
import PageHero from '../components/layout/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import CtaSection from '../sections/CtaSection.jsx'
import { JOURNEY_STEPS, SERVICES } from '../data/site.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function ServicesPage() {
  useDocumentTitle('Services')

  return (
    <>
      <PageHero
        label="Services"
        title="What We Do"
        description="Six disciplines, one team. Everything a home or an investment needs, from first conversation to completion."
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x space-y-16 sm:space-y-20 lg:space-y-24">
          {SERVICES.map((service, index) => (
            <Reveal
              key={service.id}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              <div
                className={`overflow-hidden rounded-card bg-navy-100 lg:col-span-6 ${
                  index % 2 === 1 ? 'lg:order-2' : ''
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>

              <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="text-[11px] font-semibold tracking-[0.2em] text-champagne">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h2 className="mt-3 text-[clamp(1.5rem,2.8vw,2rem)] font-semibold tracking-[-0.024em] text-ink">
                  {service.title}
                </h2>
                <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft">{service.description}</p>

                <ul className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[14px] text-ink-soft">
                      <Check
                        className="mt-[3px] h-4 w-4 shrink-0 text-champagne-dark"
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <Button to="/contact" variant="outline" className="mt-7">
                  Discuss this service
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-navy-100 bg-mist py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              label="Process"
              title="How an engagement runs"
              align="center"
              description="Every mandate follows the same four steps, whatever the price bracket."
            />
          </Reveal>

          <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.map((step, index) => (
              <Reveal as="li" key={step.step} delay={index * 80} className="border-t border-navy-200 pt-5">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-champagne">
                  {step.step}
                </span>
                <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.012em] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
