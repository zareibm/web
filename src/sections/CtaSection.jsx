import { ArrowRight, KeyRound } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import Reveal from '../components/ui/Reveal.jsx'

export default function CtaSection() {
  return (
    <section className="bg-white pb-16 sm:pb-24 lg:pb-28">
      <div className="container-x">
        <Reveal className="rounded-3xl bg-mist px-6 py-8 sm:px-10 sm:py-10">
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-10">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy text-champagne">
              <KeyRound className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
            </span>

            <div className="flex-1">
              <h2 className="text-[clamp(1.3rem,2.5vw,1.75rem)] font-semibold tracking-[-0.022em] text-ink text-balance">
                Ready to Find Your Perfect Property?
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Let our experts guide you to the right home or investment.
              </p>
            </div>

            <Button to="/contact" size="lg" className="w-full sm:w-auto">
              Get in Touch
              <ArrowRight
                className="h-[15px] w-[15px] transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={1.9}
                aria-hidden="true"
              />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
