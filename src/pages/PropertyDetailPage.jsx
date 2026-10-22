import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarCheck, Check, ChevronRight, Mail, MapPin, MessageSquare, Phone } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Dialog from '../components/ui/Dialog.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import FavoriteButton from '../components/property/FavoriteButton.jsx'
import PropertyCard from '../components/property/PropertyCard.jsx'
import PropertyGallery from '../components/property/PropertyGallery.jsx'
import PropertySpecs from '../components/property/PropertySpecs.jsx'
import InquiryForm from '../components/forms/InquiryForm.jsx'
import { getAgentById } from '../data/agents.js'
import { getPropertyBySlug, getSimilarProperties } from '../data/properties.js'
import { formatPrice } from '../lib/format.js'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function PropertyDetailPage() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)
  const [dialog, setDialog] = useState(null)

  useDocumentTitle(
    property ? `${property.name} — ${property.location.label}` : 'Property not found',
  )

  if (!property) {
    return (
      <section className="container-x pb-24 pt-40 text-center">
        <p className="label-eyebrow">Not found</p>
        <h1 className="mt-4 text-[clamp(1.8rem,4vw,2.6rem)] font-semibold tracking-[-0.025em] text-ink">
          This property is no longer listed
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          It may have been sold or withdrawn. Browse the current portfolio to see what is available
          today.
        </p>
        <Button to="/properties" size="lg" className="mt-8">
          Browse all properties
        </Button>
      </section>
    )
  }

  const agent = getAgentById(property.agent)
  const agentPhoneHref = `tel:${agent.phone.replace(/[^\d+]/g, '')}`
  const similar = getSimilarProperties(property, 3)

  return (
    <>
      <div className="border-b border-navy-100 bg-mist/70 pb-10 pt-28 sm:pt-32">
        <div className="container-x">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] text-muted">
            <Link to="/" className="transition-colors hover:text-navy">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
            <Link to="/properties" className="transition-colors hover:text-navy">
              Properties
            </Link>
            <ChevronRight className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden="true" />
            <span className="truncate text-ink-soft">{property.name}</span>
          </nav>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="label-eyebrow">
                {property.status} · {property.type}
              </p>
              <h1 className="mt-3 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.028em] text-ink text-balance">
                {property.name}
              </h1>
              <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted">
                <MapPin className="h-4 w-4 text-champagne-dark" strokeWidth={1.9} aria-hidden="true" />
                {property.location.label}
              </p>
            </div>

            <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end lg:gap-3">
              <p className="text-[clamp(1.4rem,2.5vw,1.75rem)] font-semibold tracking-[-0.022em] text-ink">
                {formatPrice(property.price)}
              </p>
              <FavoriteButton
                propertyId={property.id}
                propertyName={property.name}
                tone="plain"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="bg-white py-10 sm:py-12">
        <div className="container-x">
          <PropertyGallery photos={property.photos} title={property.name} />

          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-8">
              <PropertySpecs property={property} />

              <h2 className="mt-11 text-xl font-semibold tracking-[-0.018em] text-ink">
                About this home
              </h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-ink-soft">{property.description}</p>

              <h2 className="mt-11 text-xl font-semibold tracking-[-0.018em] text-ink">
                Key features
              </h2>
              <ul className="mt-5 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-[14.5px] text-ink-soft">
                    <Check
                      className="mt-[3px] h-4 w-4 shrink-0 text-champagne-dark"
                      strokeWidth={2.2}
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <h2 className="mt-11 text-xl font-semibold tracking-[-0.018em] text-ink">Amenities</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {property.amenities.map((amenity) => (
                  <li
                    key={amenity}
                    className="rounded-pill border border-navy-100 bg-mist/70 px-3.5 py-1.5 text-[12.5px] text-ink-soft"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-4 lg:sticky lg:top-28">
                <div className="surface p-6 shadow-card">
                  <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-muted">
                    Your advisor
                  </p>

                  <div className="mt-4 flex items-center gap-4">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      loading="lazy"
                      decoding="async"
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-ink">{agent.name}</p>
                      <p className="text-[12.5px] text-muted">{agent.role}</p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2.5 text-[13.5px]">
                    <li>
                      <a
                        href={agentPhoneHref}
                        className="inline-flex items-center gap-2.5 text-ink-soft transition-colors hover:text-navy"
                      >
                        <Phone className="h-4 w-4 text-champagne-dark" strokeWidth={1.8} aria-hidden="true" />
                        {agent.phone}
                      </a>
                    </li>
                    <li>
                      <a
                        href={`mailto:${agent.email}`}
                        className="inline-flex items-center gap-2.5 break-all text-ink-soft transition-colors hover:text-navy"
                      >
                        <Mail className="h-4 w-4 shrink-0 text-champagne-dark" strokeWidth={1.8} aria-hidden="true" />
                        {agent.email}
                      </a>
                    </li>
                  </ul>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full" onClick={() => setDialog('contact')}>
                      <MessageSquare className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                      Contact agent
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setDialog('viewing')}
                    >
                      <CalendarCheck className="h-4 w-4" strokeWidth={1.9} aria-hidden="true" />
                      Schedule a viewing
                    </Button>
                  </div>
                </div>

                <div className="rounded-card bg-mist p-5">
                  <p className="text-[13px] leading-relaxed text-muted">
                    Reference{' '}
                    <span className="font-medium text-ink">
                      HP-{property.id.slice(0, 6).toUpperCase()}
                    </span>
                    . Viewings are accompanied and usually available within 48 hours.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-t border-navy-100 bg-white py-16 pb-28 sm:py-20 lg:pb-24">
        <div className="container-x">
          <Reveal>
            <h2 className="text-[clamp(1.4rem,2.6vw,1.9rem)] font-semibold tracking-[-0.022em] text-ink">
              Similar properties
            </h2>
          </Reveal>

          <ul className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
            {similar.map((item, index) => (
              <Reveal as="li" key={item.id} delay={index * 70}>
                <PropertyCard property={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Sticky enquiry bar on small screens. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-100 bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-[11px] uppercase tracking-[0.14em] text-muted">
              {property.location.city}, {property.location.region}
            </p>
            <p className="text-[15px] font-semibold text-ink">{formatPrice(property.price)}</p>
          </div>
          <Button size="md" onClick={() => setDialog('contact')} className="shrink-0">
            Contact
          </Button>
        </div>
      </div>

      <Dialog
        open={dialog === 'contact'}
        onClose={() => setDialog(null)}
        title={`Enquire with ${agent.name}`}
        description={`Send an enquiry about ${property.name} and ${agent.name.split(' ')[0]} will reply personally.`}
      >
        <InquiryForm mode="contact" property={property} />
      </Dialog>

      <Dialog
        open={dialog === 'viewing'}
        onClose={() => setDialog(null)}
        title="Schedule a viewing"
        description={`Choose a preferred date for ${property.name} and we will confirm by email.`}
      >
        <InquiryForm mode="viewing" property={property} />
      </Dialog>
    </>
  )
}
