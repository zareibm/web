import { Mail, Phone } from 'lucide-react'
import PageHero from '../components/layout/PageHero.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import CtaSection from '../sections/CtaSection.jsx'
import { getAgentById } from '../data/agents.js'
import { TEAM } from '../data/site.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function TeamPage() {
  useDocumentTitle('Our Team')

  return (
    <>
      <PageHero
        label="Our Team"
        title="The People Behind Horizon"
        description="Four advisors, each with a specialism. The person who shows you the house is the person who negotiates it."
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x space-y-14 sm:space-y-16">
          {TEAM.map((member, index) => {
            const agent = getAgentById(member.id)

            return (
              <Reveal
                key={member.id}
                className="grid gap-8 border-b border-navy-100 pb-14 last:border-b-0 last:pb-0 lg:grid-cols-12 lg:gap-14"
              >
                <div
                  className={`lg:col-span-4 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <div className="overflow-hidden rounded-card bg-navy-100">
                    <img
                      src={member.photo}
                      alt={`${member.name}, ${member.role}`}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </div>
                </div>

                <div className={`lg:col-span-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <p className="label-eyebrow">{member.role}</p>
                  <h2 className="mt-3 text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.024em] text-ink">
                    {member.name}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-[1.8] text-ink-soft">
                    {member.bio}
                  </p>

                  <dl className="mt-7 grid gap-6 sm:grid-cols-2">
                    <div className="border-t border-navy-100 pt-3.5">
                      <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                        Focus
                      </dt>
                      <dd className="mt-1.5 text-[14px] text-ink">{member.focus}</dd>
                    </div>
                    <div className="border-t border-navy-100 pt-3.5">
                      <dt className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                        Languages
                      </dt>
                      <dd className="mt-1.5 text-[14px] text-ink">{agent.languages.join(' · ')}</dd>
                    </div>
                  </dl>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <a
                      href={`mailto:${agent.email}`}
                      className="inline-flex items-center gap-2.5 text-[13.5px] text-ink-soft transition-colors hover:text-navy"
                    >
                      <Mail className="h-4 w-4 text-champagne-dark" strokeWidth={1.8} aria-hidden="true" />
                      {agent.email}
                    </a>
                    <a
                      href={`tel:${agent.phone.replace(/[^\d+]/g, '')}`}
                      className="inline-flex items-center gap-2.5 text-[13.5px] text-ink-soft transition-colors hover:text-navy"
                    >
                      <Phone className="h-4 w-4 text-champagne-dark" strokeWidth={1.8} aria-hidden="true" />
                      {agent.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      <CtaSection />
    </>
  )
}
