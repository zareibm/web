import { IMAGES } from './images.js'

export const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Contact', to: '/contact' },
]

export const CONTACT = {
  phone: '(555) 246-7890',
  phoneHref: 'tel:+15552467890',
  email: 'hello@horizonproperties.com',
  address: ['Horizon Properties', '2140 Riverbend Terrace, Suite 500', 'Austin, Texas 78701'],
}

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'X', href: 'https://x.com', icon: 'twitter' },
]

export const SERVICES = [
  {
    id: 'luxury-home-sales',
    title: 'Luxury Home Sales',
    blurb: 'Representation for design-led homes, from valuation to closing.',
    description:
      'We take a small number of mandates each season so every listing receives proper attention. That means considered photography, a controlled launch, and a buyer list built over years rather than days.',
    points: ['Discreet off-market introductions', 'Editorial photography and film', 'Private viewing management'],
    image: IMAGES.servicesPrimary,
  },
  {
    id: 'property-investment',
    title: 'Property Investment',
    blurb: 'Income-producing residential assets, structured and modelled.',
    description:
      'We model each acquisition on real numbers — achievable rent, vacancy, holding costs and exit — then stay with you through the hold. Suitable for private clients and family offices.',
    points: ['Yield and cash-flow modelling', 'Portfolio acquisition strategy', 'Ongoing asset management'],
    image: IMAGES.servicesSecondary,
  },
  {
    id: 'property-marketing',
    title: 'Property Marketing',
    blurb: 'Art direction that positions a home correctly in its market.',
    description:
      'A home is launched once. We build the campaign around the single strongest idea in the property, then place it in front of the buyers most likely to act on it.',
    points: ['Architectural photography and film', 'Print and digital campaigns', 'Targeted buyer outreach'],
    image: IMAGES.serviceMarketing,
  },
  {
    id: 'real-estate-advisory',
    title: 'Real Estate Advisory',
    blurb: 'Independent guidance on buying, holding and selling.',
    description:
      'For clients who want an opinion they can trust before they move. We advise on timing, structure and negotiation, and we are happy to tell you when the answer is to wait.',
    points: ['Acquisition and disposal advice', 'Negotiation strategy', 'Independent market opinion'],
    image: IMAGES.serviceAdvisory,
  },
  {
    id: 'property-valuation',
    title: 'Property Valuation',
    blurb: 'Defensible valuations grounded in comparable evidence.',
    description:
      'Whether for sale, lending, probate or portfolio review, every valuation is supported by direct comparables and a written rationale you can put in front of anyone.',
    points: ['Comparable sales analysis', 'Written valuation reports', 'Pre-sale positioning advice'],
    image: IMAGES.serviceValuation,
  },
  {
    id: 'relocation-services',
    title: 'Relocation Services',
    blurb: 'A single point of contact for a move into a new city.',
    description:
      'Shortlisting, neighbourhood orientation, school introductions and settlement — handled by one advisor who knows the city and stays with you until you are settled.',
    points: ['Neighbourhood orientation', 'Shortlisting and viewings', 'Settlement support'],
    image: IMAGES.serviceRelocation,
  },
]

export const WHY_CHOOSE = [
  {
    title: 'Advice before instructions',
    body: 'We would rather tell you the timing is wrong than take a mandate we cannot deliver on.',
  },
  {
    title: 'A deliberately short list',
    body: 'Fewer listings, seen properly. Every home we represent is one we would be comfortable buying.',
  },
  {
    title: 'Evidence, not enthusiasm',
    body: 'Comparables, yield models and written rationale behind every recommendation we make.',
  },
  {
    title: 'One advisor, start to finish',
    body: 'The person who shows you the house is the person who negotiates it and closes it.',
  },
]

export const STATS = [
  { value: '$1.2B', label: 'Residential volume advised' },
  { value: '480+', label: 'Properties placed' },
  { value: '15', label: 'Years in prime markets' },
  { value: '98%', label: 'Clients who would refer us' },
]

export const TEAM = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    photo: '/images/team-01.jpg',
    bio: 'Founded Horizon Properties in 2011 after a decade in architectural practice and prime brokerage. Leads our waterfront and architectural estate mandates.',
    focus: 'Waterfront & architectural estates',
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    photo: '/images/team-02.jpg',
    bio: 'Trained in interior architecture, Olivia represents design-led homes along the Californian coast and reads a building the way a buyer feels it.',
    focus: 'Coastal & design-forward homes',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    photo: '/images/team-03.jpg',
    bio: 'Advises private clients and family offices on income-producing residential assets, from single prime rentals to multi-unit portfolios.',
    focus: 'Yield & portfolio acquisitions',
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    photo: '/images/team-04.jpg',
    bio: 'Handles relocation and first-time prime purchases, guiding international buyers from shortlist through to closing and settlement.',
    focus: 'Relocation & first prime purchase',
  },
]

export const JOURNEY_STEPS = [
  {
    step: '01',
    title: 'Brief',
    body: 'A conversation about how you actually want to live, and the numbers that make it work.',
  },
  {
    step: '02',
    title: 'Shortlist',
    body: 'A tight list of properties worth your time — including off-market homes, where relevant.',
  },
  {
    step: '03',
    title: 'Viewings',
    body: 'Accompanied viewings arranged around your schedule, at the times a home looks its best.',
  },
  {
    step: '04',
    title: 'Closing',
    body: 'Negotiation, due diligence and paperwork handled by one advisor through to completion.',
  },
]
