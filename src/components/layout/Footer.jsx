import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from 'lucide-react'
import Logo from './Logo.jsx'
import { CONTACT, NAV_ITEMS, SOCIALS } from '../../data/site.js'
import { isValidEmail, subscribeToNewsletter } from '../../lib/inquiries.js'

const SOCIAL_ICONS = {
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter,
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | error | success
  const [message, setMessage] = useState('')

  function handleSubscribe(event) {
    event.preventDefault()

    if (!isValidEmail(email)) {
      setStatus('error')
      setMessage('Please enter a valid email address.')
      return
    }

    const result = subscribeToNewsletter(email)
    setStatus('success')
    setMessage(
      result.duplicate
        ? 'You are already on the list — thank you.'
        : 'Thank you — new listings will arrive in your inbox.',
    )
    setEmail('')
  }

  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-x py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
              Horizon Properties connects discerning clients with exceptional homes and smart
              property investments in the world&rsquo;s most desirable locations.
            </p>
            <ul className="mt-7 flex items-center gap-2.5">
              {SOCIALS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon] ?? Instagram
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-champagne hover:bg-champagne hover:text-navy-950"
                    >
                      <Icon className="h-[17px] w-[17px]" strokeWidth={1.7} aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-champagne">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/65 transition-colors duration-300 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-champagne">
              Contact
            </h2>
            <ul className="mt-5 space-y-4 text-sm text-white/65">
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-white"
                >
                  <Phone className="h-4 w-4 text-champagne" strokeWidth={1.7} aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors duration-300 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-champagne" strokeWidth={1.7} aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                  strokeWidth={1.7}
                  aria-hidden="true"
                />
                <address className="not-italic leading-relaxed">
                  {CONTACT.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-champagne">
              Newsletter
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              New listings and market notes. One email a month, no more.
            </p>

            <form onSubmit={handleSubscribe} className="mt-5" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    if (status !== 'idle') setStatus('idle')
                  }}
                  placeholder="you@example.com"
                  aria-invalid={status === 'error' ? 'true' : undefined}
                  aria-describedby="newsletter-status"
                  className="h-11 w-full min-w-0 rounded-pill border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 transition-colors duration-200 focus:border-champagne focus:outline-none focus:ring-2 focus:ring-champagne/25"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to the newsletter"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-champagne text-navy-950 transition-colors duration-300 hover:bg-white"
                >
                  <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.9} aria-hidden="true" />
                </button>
              </div>

              <p
                id="newsletter-status"
                role="status"
                aria-live="polite"
                className={
                  status === 'idle'
                    ? 'sr-only'
                    : status === 'error'
                      ? 'mt-2.5 text-[12.5px] font-medium text-champagne-light'
                      : 'mt-2.5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-champagne-light'
                }
              >
                {status === 'success' ? (
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden="true" />
                ) : null}
                {message}
              </p>
            </form>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-7 text-[12.5px] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Horizon Properties. All rights reserved.</p>
          <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>Licensed Texas Real Estate Brokerage</span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-white/15 sm:block" />
            <span>Equal Housing Opportunity</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
