import CtaSection from '../sections/CtaSection.jsx'
import FeaturedProperties from '../sections/FeaturedProperties.jsx'
import Hero from '../sections/Hero.jsx'
import ServicesSection from '../sections/ServicesSection.jsx'
import TeamSection from '../sections/TeamSection.jsx'
import WhoWeAre from '../sections/WhoWeAre.jsx'
import WhyChoose from '../sections/WhyChoose.jsx'
import useDocumentTitle from '../hooks/useDocumentTitle.js'

export default function HomePage() {
  useDocumentTitle('Horizon Properties — Luxury Homes & Investments')

  return (
    <>
      <Hero />
      <WhoWeAre />
      <FeaturedProperties />
      <ServicesSection />
      <WhyChoose />
      <TeamSection />
      <CtaSection />
    </>
  )
}
