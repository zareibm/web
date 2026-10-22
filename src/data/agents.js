/**
 * Horizon Properties advisors. Each property references one by `id`.
 */
export const AGENTS = [
  {
    id: 'daniel-morgan',
    name: 'Daniel Morgan',
    role: 'Managing Director',
    photo: '/images/team-01.jpg',
    phone: '(555) 246-7890',
    email: 'daniel.morgan@horizonproperties.com',
    bio: 'Daniel founded Horizon Properties on a simple conviction: that buying a home should feel considered, unhurried and entirely transparent. He has led more than $600M in residential transactions.',
    languages: ['English', 'Spanish'],
    focus: 'Waterfront & architectural estates',
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    role: 'Luxury Property Advisor',
    photo: '/images/team-02.jpg',
    phone: '(555) 246-7891',
    email: 'olivia.carter@horizonproperties.com',
    bio: 'Olivia represents design-led homes across the Californian coast. Her background in interior architecture means she reads a building the way a buyer feels it.',
    languages: ['English', 'French'],
    focus: 'Coastal & design-forward homes',
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Investment Consultant',
    photo: '/images/team-03.jpg',
    phone: '(555) 246-7892',
    email: 'james.wilson@horizonproperties.com',
    bio: 'James advises private clients and family offices on income-producing residential assets, from single prime rentals to multi-unit portfolios.',
    languages: ['English', 'German'],
    focus: 'Yield & portfolio acquisitions',
  },
  {
    id: 'sophia-bennett',
    name: 'Sophia Bennett',
    role: 'Senior Property Specialist',
    photo: '/images/team-04.jpg',
    phone: '(555) 246-7893',
    email: 'sophia.bennett@horizonproperties.com',
    bio: 'Sophia handles relocation and first-time prime purchases, guiding international buyers through every stage from shortlist to closing.',
    languages: ['English', 'Italian'],
    focus: 'Relocation & first prime purchase',
  },
]

export function getAgentById(id) {
  return AGENTS.find((agent) => agent.id === id) ?? AGENTS[0]
}
