# CLAUDE.md

Guidance for working in this repo. It's the personal portfolio of Mohit Kumar
(Security Engineer) — a React SPA deployed on Vercel, with an optional Spring
Boot backend. The site is the product; treat accuracy and security as first-class.

## Architecture

- **Frontend** (`frontend/`) — React 19 + Vite 7 + Tailwind + Framer Motion +
  React Router 7, deployed to Vercel. This is the live site.
- **Backend** (`backend/`) — Spring Boot 3.2 (Java 17), **optional**. It serves the
  same JSON the frontend already bundles as fallback, so the site runs fully
  without it. It is not required for local dev or production.

## Content data flow (important)

- Source of truth: `backend/src/main/resources/content/*.json`.
- `frontend/scripts/sync-content.mjs` (runs on **prebuild**) copies those to
  `frontend/src/data/*Content.json`. **Edit the backend copy, then let the build
  sync** — or edit both. `frontend/src/hooks/useApi.js` tries the backend, then
  falls back to the bundled JSON.
- **Blog posts** live only in `frontend/src/data/postsData.js` (not backend-synced).
  Internal posts have `content`; external posts have `url` (hosted on dev.to).

## Commands (run in `frontend/`)

- `npm run dev` — local dev server.
- `npm run build` — **prebuild** syncs content → **build** → **postbuild** prerenders.
- `npm run verify:prod` — checks the **live** URL: every route serves per-route
  canonical + og:url + real body, and all 6 security headers are present. Exits
  non-zero on failure. Run it after every production deploy.

## Prerender + SEO (`frontend/scripts/prerender.mjs`, postbuild)

- Writes `dist/<route>/index.html` for ~46 routes with a route-correct `<title>`,
  meta, **canonical**, OG/Twitter, and real fallback body inside `#root` (React
  clears it on mount). **Fails the build loudly** on an empty body, missing
  canonical, failed injection, or duplicate route.
- Emits per-post `og:type=article` + `article:*` + `BlogPosting` JSON-LD.
  **External posts canonical to their dev.to original** and are excluded from the
  sitemap. Site-wide `Person` + `WebSite` JSON-LD live in `index.html`; do not
  duplicate them in `SEO.jsx`.
- **`sitemap.xml` is generated here** (to `dist/` and a committed copy in
  `public/`) from the same route list — never hand-edit it.

## Security (do not regress)

- `frontend/vercel.json` sets **CSP** (no `unsafe-inline`/`unsafe-eval` for
  scripts; the one inline theme script is allowed by SHA-256 hash — if you edit
  that script in `index.html`, recompute the hash), **HSTS**, and the standard
  headers. **No third-party CDN scripts**: mermaid is self-hosted at
  `public/vendor/`. Keep it that way — an external `<script src>` will be
  CSP-blocked and silently break.
- No secrets in the frontend (Web3Forms key is a public access key via
  `VITE_WEB3FORMS_KEY`). Never commit `.env*`. No PII beyond intentional contact
  info (email/city) — the résumé phone number was deliberately removed from the
  bundled data.
- Backend CORS is pinned to the exact prod origin with credentials off; keep it
  that way.

## Conventions

- **Keep slugs stable** — they're in the sitemap, prerender, and cross-links.
- After changing routes/projects/posts, `npm run build` and confirm the prerender
  count and sitemap look right, then `npm run verify:prod` after deploy.
- Deploys go to `main` (Vercel auto-deploys). Confirm outward-facing/irreversible
  actions before pushing.
- The résumé PDF served by the hero is `frontend/public/resume/Mohit_Kumar.pdf` —
  replace that file to update the CV.
