import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import PageHero from '../components/layout/PageHero.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import InquiryForm from '../components/forms/InquiryForm.jsx'
import { CONTACT } from '../data/site.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

const HOURS = [
  { day: 'Monday — Friday', time: '9:00 — 18:00' },
  { day: 'Saturday', time: '10:00 — 16:00' },
  { day: 'Sunday', time: 'By appointment' },
]

export default function ContactPage() {
  useDocumentTitle('Contact')

  return (
    <>
      <PageHero
        label="Contact"
        title="Let's Talk Property"
        description="Tell us what you are looking for, or what you are selling. One of our advisors will reply within one business day."
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2 className="text-lg font-semibold tracking-[-0.015em] text-ink">Office &amp; direct lines</h2>

            <ul className="mt-6 space-y-6">
              <li className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-navy">
                  <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Telephone
                  </p>
                  <a
                    href={CONTACT.phoneHref}
                    className="mt-1 block text-[15px] font-medium text-ink transition-colors hover:text-navy-600"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-navy">
                  <Mail className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="mt-1 block break-all text-[15px] font-medium text-ink transition-colors hover:text-navy-600"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-navy">
                  <MapPin className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Office
                  </p>
                  <address className="mt-1 not-italic text-[15px] leading-relaxed text-ink">
                    {CONTACT.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-navy">
                  <Clock className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-muted">
                    Opening hours
                  </p>
                  <dl className="mt-2 space-y-1.5">
                    {HOURS.map((row) => (
                      <div key={row.day} className="flex items-baseline justify-between gap-4 text-[14px]">
                        <dt className="text-muted">{row.day}</dt>
                        <dd className="font-medium text-ink">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            </ul>

            <div className="mt-10 rounded-card bg-mist p-5">
              <p className="text-[13px] leading-relaxed text-muted">
                Prefer to keep it brief? Call the main line and ask for the advisor covering the
                area you are interested in — we will put you straight through.
              </p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={120}>
            <div className="surface p-6 shadow-card sm:p-8">
              <h2 className="text-lg font-semibold tracking-[-0.015em] text-ink">
                Send us an enquiry
              </h2>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">
                Tell us a little about what you are after and we will come back with something
                useful, not a brochure.
              </p>

              <InquiryForm mode="contact" className="mt-7" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
