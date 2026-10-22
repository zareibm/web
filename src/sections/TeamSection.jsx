import { Mail, Phone } from 'lucide-react'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { getAgentById } from '../data/agents.js'
import { TEAM } from '../data/site.js'

export default function TeamSection() {
  return (
    <section className="bg-white py-16 sm:py-24 lg:py-28">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            label="Our Team"
            title="The People Behind Horizon"
            align="center"
            description="A small advisory team, deliberately. You will always know who is handling your file."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, index) => {
            const agent = getAgentById(member.id)

            return (
              <Reveal key={member.id} delay={index * 80} className="group">
                <div className="relative overflow-hidden rounded-card bg-navy-100">
                  <img
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-editorial group-hover:scale-[1.05]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-950/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex translate-y-2 items-center gap-2 p-4 opacity-0 transition-all duration-500 ease-editorial group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <a
                      href={`mailto:${agent.email}`}
                      aria-label={`Email ${member.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-navy transition-colors duration-300 hover:bg-champagne"
                    >
                      <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                    </a>
                    <a
                      href={agent.phoneHref ?? `tel:${agent.phone.replace(/[^\d+]/g, '')}`}
                      aria-label={`Call ${member.name}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-navy transition-colors duration-300 hover:bg-champagne"
                    >
                      <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <h3 className="mt-4 text-[15px] font-semibold tracking-[-0.01em] text-ink">
                  {member.name}
                </h3>
                <p className="mt-0.5 text-[13px] text-muted">{member.role}</p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
