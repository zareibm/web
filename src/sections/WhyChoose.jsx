import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { IMAGES } from '../data/images.js'
import { STATS, WHY_CHOOSE } from '../data/site.js'

export default function WhyChoose() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-16 text-white sm:py-24 lg:py-28">
      <img
        src={IMAGES.whyChoose}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-navy-950/75" />

      <div className="container-x relative">
        <Reveal>
          <SectionHeading
            tone="light"
            label="Why Horizon"
            title="Why Choose Horizon"
            align="center"
            description="Four commitments that shape how we work — and the reason most of our business arrives by referral."
          />
        </Reveal>

        <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((item, index) => (
            <Reveal key={item.title} delay={index * 90} className="border-t border-champagne/40 pt-5">
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-white">{item.title}</h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-white/60">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 70}>
              <p className="text-[clamp(1.9rem,3vw,2.5rem)] font-semibold tracking-[-0.03em] text-champagne">
                {stat.value}
              </p>
              <p className="mt-2 text-[12.5px] uppercase tracking-[0.14em] text-white/50">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
