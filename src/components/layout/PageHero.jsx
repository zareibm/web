import SectionHeading from '../ui/SectionHeading.jsx'
import Reveal from '../ui/Reveal.jsx'

/** Consistent header band for every inner page. */
export default function PageHero({ label, title, description, children }) {
  return (
    <section className="border-b border-navy-100 bg-mist/70 pb-12 pt-28 sm:pb-14 sm:pt-32 lg:pb-16 lg:pt-36">
      <div className="container-x">
        <Reveal>
          <SectionHeading label={label} title={title} description={description} />
        </Reveal>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  )
}
