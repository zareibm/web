# Horizon Properties

A premium real-estate website: editorial layout, large architectural photography,
restrained champagne-on-navy palette, and a complete property discovery
experience with detail pages.

## Stack

- **Vite** (dev server + build) with **React 18** and **React Router 6**
- **Tailwind CSS 3** — the design tokens live in `tailwind.config.js`
  (`navy`, `champagne`, `mist`, `ink`, radii, shadows, easing) and the shared
  rhythm utilities in `src/index.css` (`container-x`, `label-eyebrow`,
  `surface`, `reveal`)
- **lucide-react** for icons

No backend, no database. All content is static data in `src/data/`.

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production bundle into dist/
```

### Running in the sandbox / preview

```bash
docker compose -f docker-compose.base44.yml up -d
```

The dev server runs from the bind-mounted checkout, so edits appear without a
rebuild. See `AGENTS.md` for sandbox-specific details.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home — hero, Who We Are, Featured Properties, Services, Why Choose Horizon, Team, CTA |
| `/properties` | Browsable portfolio with search, filters and sorting |
| `/properties/:slug` | Property detail — gallery, specs, features, amenities, agent, viewing request |
| `/about` | Story, stats, working process, team |
| `/services` | The six services in detail |
| `/team` | Advisor profiles |
| `/contact` | Office details and enquiry form |
| `/saved` | The visitor's saved shortlist |

## Editing content

Everything editorial is one of four modules:

- `src/data/properties.js` — listings, plus the filter/sort query helpers'
  source data. Each record has cover art, a photo gallery, features, amenities
  and an `agent` id.
- `src/data/agents.js` — advisors, keyed by id and referenced from listings.
- `src/data/site.js` — navigation, services, team, values, stats, contact
  details and social links.
- `src/data/images.js` — the site-wide art (hero, about pair, section imagery).

Photography lives in `public/images/` and is referenced by absolute path.

## Reusable pieces

- `components/ui/` — `Button`, `Field` (`TextField`, `SearchField`,
  `SelectField`, `TextAreaField`), `IconButton`, `Dialog`, `SectionHeading`,
  `Reveal`
- `components/property/` — `PropertyCard`, `PropertyCarousel`,
  `PropertyFilters`, `PropertyGallery`, `PropertySpecs`, `FavoriteButton`
- `components/forms/InquiryForm` — one form for both enquiries and viewing
  requests

## Forms, favourites and persistence

There is no server in this repository, so:

- enquiry and viewing-request submissions are validated client-side and stored
  in `localStorage` (`horizon.inquiries`); the UI confirms with a reference id
- newsletter sign-ups are stored in `horizon.subscribers`
- saved properties are stored in `horizon.favorites`

Point `src/lib/inquiries.js` at a real endpoint to make submissions live — the
form components need no changes.

## Accessibility & performance notes

- Semantic landmarks, skip link, visible focus rings, labelled controls,
  `aria-pressed` on toggles, live regions for filter counts and form results.
- Carousels are real scroll containers: touch swipe is native, desktop drag and
  arrow keys are layered on top.
- Below-the-fold imagery is lazy-loaded; only above-the-fold art is eager.
