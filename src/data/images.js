/**
 * Every site-wide image path, in one place.
 *
 * Photos live in /public/images so the site is self-contained (no runtime
 * dependency on a third-party CDN). The selection below is deliberately
 * limited to contemporary architecture — modern facades, glass, water and
 * warm minimal interiors — to keep the art direction consistent. Swap a path
 * here to change an image.
 */
export const IMAGES = {
  // Hero — full-bleed architectural photograph (modern villa with pool)
  hero: '/images/arch-30.jpg',

  // Who We Are — asymmetric editorial pair
  aboutPrimary: '/images/arch-33.jpg',
  aboutSecondary: '/images/arch-04.jpg',

  // Services — one supporting photograph per discipline
  servicesPrimary: '/images/arch-14.jpg',
  servicesSecondary: '/images/arch-09.jpg',
  serviceMarketing: '/images/arch-02.jpg',
  serviceAdvisory: '/images/arch-42.jpg',
  serviceValuation: '/images/arch-40.jpg',
  serviceRelocation: '/images/arch-37.jpg',

  // Why Choose Horizon — muted interior used as texture behind the navy band
  whyChoose: '/images/arch-11.jpg',
}
