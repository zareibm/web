# AGENTS.md

Notes for automated sessions working on this repository. Only non-obvious
things — manifests already describe the stack.

## What this is

A static front-end site (Vite + React + React Router + Tailwind). There is no
backend, no database and no external service credentials: the only network
call at runtime is the Google Fonts stylesheet for Inter.

## Running it

```bash
docker compose -f docker-compose.base44.yml up -d --build
```

- The dev server is served from the bind-mounted checkout at `/app`; edits are
  picked up live. **Do not** replace the `web` service with a built image —
  the preview would freeze at the baked bundle.
- `node_modules` lives in the named volume `horizon-properties_node_modules`,
  not in the checkout. Deleting that volume only forces a reinstall.
- `npm install` runs on every container start (a few seconds when warm). The
  committed `package-lock.json` is what makes it deterministic; regenerate it
  with `npm install --package-lock-only` if dependencies change.
- First boot takes ~2 minutes (cold `npm install` + first Vite optimize).
  `docker compose logs -f web` shows progress; the healthcheck has a 150s
  grace period for exactly this reason.

## Sandbox-specific configuration

All of it is gated on `BASE44_PREVIEW_MODE === "1"` in `vite.config.js`:

- `server.allowedHosts` gains `.<BASE44_SANDBOX_HOST_DOMAIN>` (the sandbox id
  rotates, so a wildcard is required). Vite also appends
  `__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS`, which compose passes through.
- `server.hmr` is pinned to `wss` on port 443 because the preview proxy
  terminates TLS and forwards the websocket upgrade.

With the flag unset or any other value, `vite.config.js` keeps Vite's
defaults: no extra allowed hosts, default HMR on the dev port. Nothing else in
the app branches on the flag.

## Verifying a change

1. `curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/` → `200`.
2. `docker compose logs --tail=50 web` should show Vite's "ready" line and no
   transform errors.
3. Routes are client-side (SPA fallback). `/`, `/properties`,
   `/properties/<slug>`, `/about`, `/services`, `/team`, `/contact`, `/saved`.
   A slug that does not exist renders the in-app "no longer listed" state, not
   a 404 — that is intended.

## Gotchas

- **`public/images/*.jpg` are the only photography source.** They were
  downloaded from Unsplash and are referenced by absolute path from
  `src/data/images.js` (site-wide art) and `src/data/properties.js` (listing
  covers + galleries). Keep the aspect ratios wide when swapping — cards crop
  to 4:5 and galleries to 16:9.
- **No image tooling of any kind**, so nothing has been through a resize step.
  The masters are ~1400px wide; keep new ones in that range or the page weight
  balloons.
- `src/data/*` is the whole content layer. `src/data/site.js` holds nav,
  services, team, stats and contact details; agents live in `agents.js`.
- **Forms have no backend.** `src/lib/inquiries.js` validates and writes to
  `localStorage` (`horizon.inquiries`, `horizon.subscribers`) and the UI shows a
  success state with a reference id. Swapping in a real endpoint means changing
  that one module — `InquiryForm` otherwise needs no edits.
- Favourites persist in `localStorage` under `horizon.favorites` via
  `src/context/FavoritesContext.jsx`.
- Tailwind `content` globs cover `index.html` and `src/**/*.{js,jsx}`. New
  component directories are picked up automatically; a new file *extension*
  would not be.
