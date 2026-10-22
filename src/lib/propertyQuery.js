import { PROPERTIES } from '../data/properties.js'

export const PRICE_BUCKETS = [
  { id: 'any', label: 'Any price', min: 0, max: Infinity },
  { id: 'under-2m', label: 'Up to $2M', min: 0, max: 2_000_000 },
  { id: '2m-4m', label: '$2M — $4M', min: 2_000_000, max: 4_000_000 },
  { id: '4m-6m', label: '$4M — $6M', min: 4_000_000, max: 6_000_000 },
  { id: '6m-plus', label: '$6M and above', min: 6_000_000, max: Infinity },
]

export const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured first' },
  { id: 'price-desc', label: 'Price: high to low' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'sqft-desc', label: 'Largest first' },
  { id: 'newest', label: 'Newest first' },
]

export const BED_OPTIONS = [
  { id: 'any', label: 'Any' },
  { id: '2', label: '2+' },
  { id: '3', label: '3+' },
  { id: '4', label: '4+' },
  { id: '5', label: '5+' },
]

export const BATH_OPTIONS = [
  { id: 'any', label: 'Any' },
  { id: '2', label: '2+' },
  { id: '3', label: '3+' },
  { id: '4', label: '4+' },
  { id: '5', label: '5+' },
]

export const DEFAULT_FILTERS = {
  query: '',
  location: 'any',
  type: 'any',
  price: 'any',
  beds: 'any',
  baths: 'any',
  sort: 'featured',
  featuredOnly: false,
}

export const LOCATION_OPTIONS = [
  ...new Set(PROPERTIES.map((p) => `${p.location.city}, ${p.location.region}`)),
].sort()

export const TYPE_OPTIONS = [...new Set(PROPERTIES.map((p) => p.type))].sort()

export function filterAndSortProperties(list, filters) {
  const bucket = PRICE_BUCKETS.find((b) => b.id === filters.price) ?? PRICE_BUCKETS[0]
  const query = filters.query.trim().toLowerCase()

  const matches = list.filter((property) => {
    if (
      filters.location !== 'any' &&
      `${property.location.city}, ${property.location.region}` !== filters.location
    ) {
      return false
    }
    if (filters.type !== 'any' && property.type !== filters.type) return false
    if (property.price < bucket.min || property.price >= bucket.max) return false
    if (filters.beds !== 'any' && property.beds < Number(filters.beds)) return false
    if (filters.baths !== 'any' && property.baths < Number(filters.baths)) return false
    if (filters.featuredOnly && !property.featured) return false

    if (query) {
      const haystack = [
        property.name,
        property.location.label,
        property.type,
        property.status,
        property.tagline,
      ]
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(query)) return false
    }

    return true
  })

  const sorted = [...matches]
  switch (filters.sort) {
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price)
      break
    case 'sqft-desc':
      sorted.sort((a, b) => b.sqft - a.sqft)
      break
    case 'newest':
      sorted.sort((a, b) => b.year - a.year)
      break
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || b.price - a.price)
  }

  return sorted
}

export function countActiveFilters(filters) {
  return ['location', 'type', 'price', 'beds', 'baths', 'featuredOnly'].filter(
    (key) => filters[key] !== DEFAULT_FILTERS[key],
  ).length
}
