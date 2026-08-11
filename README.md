# MECHPRO SOLUTIONS LTD — Frontend Documentation

Complete technical documentation for the React frontend at
www.mechpro.co.ke. Written so a developer unfamiliar with this project
could get productive using only this document.

---

## 1. Technology Stack

| Layer | Technology |
|---|---|
| Language | JavaScript (React, functional components + hooks) |
| Framework | React 18, bootstrapped with Create React App (react-scripts) |
| Routing | react-router-dom v6 |
| Styling | Plain CSS (no framework/preprocessor) — `index.css` (design tokens) + `App.css` (components) |
| State | React's built-in `useState`/`useEffect`/`useContext` — no Redux or external state library |
| Data fetching | Native `fetch` via a small custom API client (`src/api/`) — no Axios/React Query |
| Hosting | Vercel |
| Analytics | Google Analytics 4 (gated behind an env var; dormant until configured) |

**Why no state-management library:** the app's data is almost entirely
server data (products, services, etc.) fetched per-page, with only small
amounts of local UI state (form inputs, chat messages). React's built-in
hooks are sufficient at this scale; adding Redux or similar would be
unnecessary complexity for the actual problem being solved.

## 2. Project Structure

```
mechpro/
├── public/
│   ├── index.html          # includes Open Graph tags, JSON-LD schema, GSC placeholder
│   ├── logo.svg              # the real MECHPRO logo — used for favicon and navbar
│   ├── robots.txt             # NOTE: CRA serves this file directly; it takes
│   │                          #   precedence over any Vercel rewrite for the same path
│   └── og-image.png           # social link-preview image
├── vercel.json                # proxies /sitemap.xml to the backend; SPA fallback routing
├── .env.development            # REACT_APP_API_URL=http://localhost:8000 (local dev)
├── .env.production              # REACT_APP_API_URL=https://api.mechpro.co.ke (live)
├── src/
│   ├── App.js                   # route definitions, top-level providers
│   ├── index.js / index.css      # entry point + design tokens (colors, fonts, spacing)
│   ├── App.css                    # all component styles
│   ├── api/
│   │   ├── client.js                # fetch wrapper: apiGet, apiGetAll, apiPost
│   │   ├── hooks.js                  # useApi, useApiAll — data-fetching hooks with
│   │   │                             #   bundled-data fallback (site never blanks
│   │   │                             #   if the backend is briefly unreachable)
│   │   ├── analytics.js               # gated GA4 loader
│   │   └── trackClick.js               # fire-and-forget click tracking (NEW)
│   ├── context/
│   │   └── SiteContext.js               # company config, stats, brands, testimonials —
│   │                                     #   loaded once, available everywhere via useSite()
│   ├── hooks/
│   │   ├── useSeo.js                     # per-page title/meta/canonical tags
│   │   ├── useReveal.js                   # scroll-triggered fade-in animation
│   │   ├── useCountUp.js                   # animated number counters (hero stats)
│   │   └── useTypewriter.js                 # the hero's typing animation
│   ├── data/                                 # BUNDLED FALLBACK DATA — see section 5
│   ├── components/
│   │   ├── layout/     (Navbar, Footer, TopBar, WhatsAppButton, ScrollToTop)
│   │   ├── ui/          (Button, Icon, SpecPlate, PageHero, SectionHeader, CTASection,
│   │   │                 Chip, StatItem, TickRule (disabled — see section 6),
│   │   │                 MaintenanceBanner (NEW))
│   │   ├── cards/        (ServiceCard, ProductCard, ProjectCard, TestimonialCard,
│   │   │                  WhyItem, IndustryTile, PostCard)
│   │   └── chat/          (ChatWidget, brain.js — the assistant's intent engine)
│   └── pages/               (one file per route — Home, About, Services, ServiceDetail,
│                              Solutions, SolutionDetail, Products, ProductDetail,
│                              Projects, ProjectDetail (NEW), Blog, RequestQuote,
│                              Contact, Legal (NEW — serves Privacy/Terms/Copyright),
│                              MaintenancePage (NEW), NotFound)
```

## 3. Running Locally

```bash
git clone <repo-url> mechpro
cd mechpro
npm install
npm start
```

Opens at `http://localhost:3000`. Requires the backend running locally
at `http://localhost:8000` (see backend README) for live data — if it's
not running, every page still renders using the bundled fallback data in
`src/data/`, just without live CMS edits reflected.

**Always test a production build before pushing**, since Vercel treats
ESLint warnings as build-breaking errors (`CI=true`) while local `npm
start` does not:
```bash
CI=true npm run build
```

## 4. Deploying

Push to `main` on GitHub — Vercel auto-deploys on every push. To
manually force a fresh deploy without a real code change:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

**Environment variables in Vercel's dashboard** (Settings → Environment
Variables) must be set separately from the local `.env.production` file
— Vercel builds independently on its own servers and does not read your
local files:

| Variable | Production value |
|---|---|
| `REACT_APP_API_URL` | `https://api.mechpro.co.ke` |
| `REACT_APP_GA_MEASUREMENT_ID` | *(set once a real GA4 property exists — see backend README)* |

## 5. The Fallback-Data Pattern (important to understand)

Every page fetches its content from the live backend API using the
`useApi`/`useApiAll` hooks, **but every one of those hooks is given a
bundled fallback** from `src/data/*.js`. This means:

- The site renders **instantly** on first paint using bundled data,
  then silently swaps in live data once the API responds.
- If the backend is ever briefly unreachable, the site **never shows a
  blank page or error** — it just shows the bundled version.
- The bundled data in `src/data/` is a **snapshot**, not the source of
  truth. Editing it does not change the live site; editing content in
  the Django admin does. The files exist purely as an offline-safe
  fallback and as the original seed data the backend was first
  populated from.

## 6. Design System Notes

- **Colors and type scale** live in `src/index.css` as CSS custom
  properties (`--green`, `--ink`, `--font-display`, etc.) — change a
  token there and it updates everywhere that references it.
- **The "tick rule" stroke pattern has been intentionally disabled**
  (per client feedback that it read as generic/AI-templated). The
  `TickRule` component still exists and is still imported everywhere it
  always was, but now renders `null`. This was a deliberate one-file
  change rather than removing every usage individually, to minimize the
  chance of missing an instance.
- **Copy style:** house style avoids em-dashes and hyphenated
  constructions in user-facing text (replaced with commas, periods, or
  restructured sentences) — apply this same standard to any new copy
  written for the site.
- **Icons** are hand-drawn SVG paths in `components/ui/Icon.js` — no
  icon library dependency. Add a new icon by adding a new path entry to
  that file's `paths` object.

## 7. New Pages Added (this update)

| Route | Component | Purpose |
|---|---|---|
| `/projects/:slug` | `ProjectDetail.js` | Full write-up when a project card is clicked (previously projects had no detail page) |
| `/privacy` | `Legal.js` (slug="privacy") | Privacy Policy, content from CMS |
| `/terms` | `Legal.js` (slug="terms") | Terms & Conditions, content from CMS |
| `/copyright` | `Legal.js` (slug="copyright") | Copyright notice, content from CMS |

**Wiring these into `App.js`** — add these routes alongside the existing
ones, and add a click on every `ProjectCard` linking to
`/projects/${project.slug}` (currently project cards are not clickable
links — this is a required companion change for the new detail pages to
be reachable):

```jsx
import ProjectDetail from "./pages/ProjectDetail";
import Legal from "./pages/Legal";
// ...
<Route path="/projects/:slug" element={<ProjectDetail />} />
<Route path="/privacy" element={<Legal slug="privacy" />} />
<Route path="/terms" element={<Legal slug="terms" />} />
<Route path="/copyright" element={<Legal slug="copyright" />} />
```

## 8. Maintenance Mode

The site checks `/api/maintenance/` on load. **Wiring this into
`App.js`** requires wrapping the route tree:

```jsx
import { useState, useEffect } from "react";
import MaintenancePage from "./pages/MaintenancePage";
import MaintenanceBanner from "./components/ui/MaintenanceBanner";
import { apiGet } from "./api/client";

// inside the top-level App component, before rendering routes:
const [maintenance, setMaintenance] = useState(null);
useEffect(() => {
  apiGet("/api/maintenance/").then(setMaintenance).catch(() => setMaintenance({ maintenanceMode: false }));
}, []);

if (maintenance?.maintenanceMode) {
  return <MaintenancePage message={maintenance.message} />;
}
// otherwise render the app as normal, optionally rendering
// <MaintenanceBanner text={maintenance?.ticker} /> above the navbar
// if you want a ticker shown even when NOT in full maintenance mode
```

The admin toggles this in Django admin under Site & Company → Site
settings → Maintenance mode. No redeploy needed — it takes effect the
next time any visitor's browser polls `/api/maintenance/` (on page
load).

## 9. Click Tracking

`src/api/trackClick.js` exports `trackClick(kind)` where `kind` is
`"phone"`, `"whatsapp"`, or `"email"`. Call it alongside the existing
`href` on every Call Now / WhatsApp Us / mailto link, e.g.:

```jsx
<a href={config.phoneHref} onClick={() => trackClick("phone")}>Call now</a>
```

This should be added to: `WhatsAppButton.js`, `CTASection.js`,
`Contact.js`, and any hero/page-hero phone or WhatsApp buttons. It is
fire-and-forget by design — it never blocks or delays the actual link
navigation, and never throws even if the tracking request fails.

## 10. What Was NOT Fully Built (documented, not silently skipped)

- **Full drag-to-crop image editor in the CMS.** What's implemented
  instead: uploaded images are automatically constrained to a sensible
  max size (preserving aspect ratio, never cropping), and the admin can
  choose "Cover" (fills the frame, crops edges) or "Contain" (shows the
  whole image, letterboxed) per image — a real, useful control, but not
  a full visual crop tool. Building an actual crop UI is a meaningfully
  larger frontend project (typically involves a library like
  `react-easy-crop`) and should be scoped as its own task if wanted.
- **Full product filter UI for the new energy rating / capacity /
  installation type filters.** The backend API supports these filters
  now (`?energyRating=`, `?capacity=`, `?installationType=`); wiring
  matching dropdown controls into `Products.js` is a frontend-only
  follow-up using the same pattern as the existing category/brand
  filters already there.

---

*Last updated as part of the ownership handover and feature expansion.
See `README-backend.md` for the corresponding backend documentation.*
