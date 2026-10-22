import PageHero from '../components/layout/PageHero.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import CtaSection from '../sections/CtaSection.jsx'
import TeamSection from '../sections/TeamSection.jsx'
import { IMAGES } from '../data/images.js'
import { JOURNEY_STEPS, STATS } from '../data/site.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function AboutPage() {
  useDocumentTitle('About Us')

  return (
    <>
      <PageHero
        label="About Us"
        title="Who We Are"
        description="Horizon Properties was founded to make buying an exceptional home feel considered rather than transactional."
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              title="A small team, deliberately"
              description="We take on a limited number of mandates each season. It means every client works with a senior advisor from the first conversation to completion, and no home we represent is one we would not be comfortable buying ourselves."
            />
            <p className="mt-5 text-[15px] leading-[1.8] text-ink-soft">
              Our work is quiet and evidence-led. We would rather tell you the timing is wrong than
              take an instruction we cannot deliver on — and when we do take it, we bring comparable
              sales, a written rationale and a buyer list built over fifteen years in the prime
              markets we cover.
            </p>
            <p className="mt-5 text-[15px] leading-[1.8] text-ink-soft">
              That approach is why most of what we sell now comes from people we have already
              worked with, or from the people they send our way.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={120}>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="overflow-hidden rounded-card bg-navy-100">
                <img
                  src={IMAGES.aboutPrimary}
                  alt="A contemporary home surrounded by mature planting"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-card bg-navy-100 sm:mt-10">
                <img
                  src={IMAGES.aboutSecondary}
                  alt="Detail of a modern residential facade"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-navy-100 bg-mist py-14 sm:py-16">
        <div className="container-x grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <p className="text-[clamp(1.9rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-navy">
                {stat.value}
              </p>
              <p className="mt-2 text-[12.5px] uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              label="How We Work"
              title="Four steps, no surprises"
              align="center"
              description="From the first conversation to the day you get the keys, you always know what happens next."
            />
          </Reveal>

          <ol className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.map((step, index) => (
              <Reveal as="li" key={step.step} delay={index * 80} className="border-t border-navy-100 pt-5">
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

      <TeamSection />
      <CtaSection />
    </>
  )
}
