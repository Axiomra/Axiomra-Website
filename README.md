# Axiomra — MERN AI-Agency Website

Full homepage rebuild inspired by tezeract.ai's layout (from your screenshots/PDF),
re-skinned with the **Axiomra** brand and your coolors.co palette. React + Tailwind +
Framer Motion + Three.js on the frontend, Express + MongoDB on the backend.

## ⚠️ IMPORTANT — read before running
There are **two separate projects** inside this folder: `client/` (the website)
and `server/` (the API). Each has its own `package.json`. A tiny root
`package.json` is also included, purely as a shortcut so you don't have to
manually `cd` into each folder. Just run the commands below exactly as
written, from the top-level `axiomra` folder (the one this README is in).

## ✅ Verified before delivery (this exact zip)
- `npm run setup` from the root installs **both** client and server with zero errors.
- `npm run dev:client` starts Vite and serves the real page — confirmed the
  HTML title (`Axiomra — Result-Driven AI Development Company`) actually
  renders at `http://localhost:5173`.
- `npm run build` (client) completes with zero errors.
- All backend files pass `node --check` (no syntax errors).
- Re-extracted this zip fresh and diffed every file — no empty or corrupted files.

## Setup (copy-paste these, in order)

```bash
# 1. Unzip, then open a terminal in the axiomra folder (the one with this README)
cd axiomra

# 2. Install everything (client + server) in one go
npm run setup

# 3. Start the website (Terminal window 1)
npm run dev:client
# -> opens at http://localhost:5173

# 4. Start the API (Terminal window 2 — open a second terminal, still in axiomra/)
cp server/.env.example server/.env
# edit server/.env and set MONGO_URI to your MongoDB connection string
npm run dev:server
# -> runs at http://localhost:5000
```

If `npm run setup` ever fails, install one at a time to see exactly where it breaks:
```bash
cd client && npm install
cd ../server && npm install
```

MongoDB must be running (local install, Docker, or a free MongoDB Atlas
cluster) for the contact form to save leads. The site itself (`npm run
dev:client`) works and looks complete even without the backend running — only
the contact form submission needs the API.

## Brand
- **Logo**: your uploaded Axiomra logo, processed into two versions —
  `client/src/assets/logo-dark.png` (black wordmark, light backgrounds) and
  `logo-light.png` (white wordmark, dark hero/footer) — per your "dark theme →
  light logo, light theme → dark logo" instruction. The navbar swaps
  automatically on scroll.
- **Palette** (`client/tailwind.config.js`):

| Token | Hex | Source |
|---|---|---|
| `periwinkle` | #788BE3 | your coolors palette (primary accent) |
| `periwinkle-dark` | #777ACF | your coolors palette (hover/secondary) |
| `mist` | #D9E2EC | your coolors palette (light section tint) |
| `navy` | #0A1428 | matched from your tezeract.ai screenshots |
| `teal` | #14D8C4 | matched from your Axiomra logo icon |
| `gold` | #FFB020 | matched from the star ratings in your screenshots |

- **Fonts**: Space Grotesk (display) / Inter (body) / JetBrains Mono (stats/labels)
- **Hero animation**: a live Three.js particle-network field (nodes drifting +
  connecting lines), echoing the wavy AI-network graphic in your screenshots.

## Sections included (matching your screenshots)
Navbar → Hero (Three.js network + client marquee) → "What Founders Say" cards →
Transformation split → Video testimonials → Gradient CTA → Services grid (8
cards) → Dark CTA banner → Industries grid (12 tiles) → Testimonial wall →
Portfolio/case-study carousel → CTA → Process timeline (5 steps) → Tech stack
(tabbed) → Why Us + animated counters → Awards row → Resources/blog cards →
FAQ accordion → Contact form (wired to MongoDB) → Final CTA → Footer →
WhatsApp button → exit-intent "Book a call" modal.

## Next steps
This is the homepage. Tell me which to build next: individual service/industry
pages, a full blog, portfolio detail pages, or an admin view for leads saved
in MongoDB.
