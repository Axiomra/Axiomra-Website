# Performance report

Before: commit `0384ee3d`, see `perf/BASELINE.md`. After: branch `safe-fixes`.
Both measured with the same harness (`perf/lighthouse.mjs`, Lighthouse 12.8.2,
simulated throttling, `vite preview`), one route at a time, nothing else
running on the machine.

## Lighthouse results

Before is `0384ee3d`, re-measured on a quiet machine (`perf/before/summary.json`,
cleaner than the original `perf/baseline/` run, which had builds running
alongside it). After is `d86b785c` (`perf/after/summary.json`). One run per
route and form factor, so single routes move a few points between runs; the
medians are the number to read.

| Median of 40 routes | Mobile before | Mobile after | Desktop before | Desktop after |
| --- | --- | --- | --- | --- |
| Performance | 46 | **87** | 95 | **100** |
| Accessibility | 95 | 96 | 95 | 96 |
| Best practices | 100 | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| FCP | 3.1 s | 2.0 s | 0.7 s | 0.4 s |
| LCP | 7.5 s | 3.9 s | 1.4 s | 0.8 s |
| TBT | 1471 ms | 33 ms | 29 ms | 0 ms |
| CLS | 0 | 0 | 0 | 0 |
| Transfer (KB) | 1982 | 546 | 1520 | 557 |

### Against the brief's targets

| Target | Result |
| --- | --- |
| Desktop Perf 100 | **Met on 21 of 40 routes**, 97–99 on the rest. Not met everywhere. |
| Mobile Perf ≥ 95 | **Not met on any route.** Range 75 (home) to 92 (contact), median 87. |
| LCP < 2.0 s | **Met on desktop** (all routes ≤ 1.3 s). **Not met on mobile** (3.3–6.6 s, home 6.3 s). |
| TBT < 150 ms | **Met** on every route, both form factors (worst: 146 ms, generative-AI mobile). |
| CLS < 0.05 | **Met**: 0 everywhere. |
| SEO 100 | Met except `/ai-services-and-solutions/ai-development-services` (92, link text: a copy change, see below). |
| BP 100 | Met everywhere. |
| A11y ≥ 95 | Met everywhere (96–100). |
| INP < 200 ms | Not measurable in the lab. Lighthouse has no INP; TBT is its proxy and is under target. Field data (CrUX) has to confirm it after deploy. |

Numbers not measured are not claimed: there is no field data here, and the
WebGL scenes' main-thread cost on GPU devices is not in these numbers (see
above).

### Why mobile stops at ~87

- **Home LCP is simulated at 6.3 s although it is observed at 0.24 s.**
  Unthrottled, the home page paints FCP = LCP at ~0.24 s from the prerendered
  HTML. Lighthouse's simulation (Lantern) estimates LCP from every request and
  script task that started before the observed LCP, which includes the
  page's JS chunks, and replays them on a throttled Moto G.
- **The LCP element is the navbar logo, not the hero.** The hero text fades in
  from `opacity: 0` (the existing entrance animation), and Chrome does not
  count invisible text as an LCP candidate. Framer-motion entrances on the
  other pages are gated the same way until hydration. Making the hero text
  paint at full opacity immediately would let LCP land at FCP (~2 s), but it
  changes the entrance, so it is on the design-decision list below.
- **Render-blocking CSS and fonts** (~900 ms simulated). Inlining the CSS was
  tried and measured (see below); it did not help.

### Tried, measured, rejected

| Experiment | Result | Verdict |
| --- | --- | --- |
| Inline the whole stylesheet into each page | Negligible gain; `/about` LCP got worse | Rejected |
| `<link rel="preload">` for the navbar logo (the home LCP image) | No change | Rejected |
| Drop all modulepreloads | FCP −1.5 s, but `/about` LCP 3.5 → 4.4 s | Rejected |
| Preload only the page chunk | No gain on home | Rejected |
| **All modulepreloads at `fetchpriority="low"`** | Home FCP 4.1 → 2.1 s, healthcare 73 → 82, `/about` 86 → 90, no LCP loss | **Kept** (`d86b785c`) |
| Low-priority preloads + hydrate one frame later | No gain; home TBT 48 → 193 ms | Rejected |

Noise seen along the way, for anyone re-running this: one full run had the NLP
page at 57 on mobile (re-runs: 78–83), and one ai-development desktop run
showed 6.9 s TBT while the machine had a load average of ~10 from other
programs (quiet re-run: 2 ms). Run `npm run perf:all` on an idle machine.

Accessibility on some industry routes reads 96 after vs 98 before. That is
not a regression: the heading-order failure is fixed, and the remaining
`target-size` failure (carousel dots, a design decision below) is flagged or
not depending on which slide is showing when Lighthouse looks.

## Read this first: what the lab numbers do and do not include

Lighthouse and PageSpeed Insights run Chrome without a GPU, so WebGL runs in
SwiftShader on the CPU. In the baseline that alone produced TBT of 50–124 s on
the industry and generative-AI pages. After this work, every decorative WebGL
scene checks the renderer and shows its static fallback (the dot-grid
background it already had) on a software rasteriser. So:

- The **lab numbers below are for the static fallback**, not the WebGL scenes.
- Visitors with a GPU still get every scene, unchanged, mounted after the page
  has loaded and gone idle, and only once the scene is near the viewport.
  Their main thread is not in these numbers.
- Visitors without GPU acceleration (blocklisted drivers, some VMs) now get the
  fallback too, instead of a page that stutters for seconds.

## Changes

### 1. First paint

- **Build-time prerender** (`scripts/prerender.mjs`, `src/entry-server.jsx`).
  Every public route is rendered to static HTML at build time with
  `renderToPipeableStream` and hydrated with `hydrateRoot`. The hero, headings
  and copy paint from HTML instead of waiting for ~190 KB of JS.
  - `vercel.json`: `cleanUrls` serves the prerendered page. Rewrites for
    unknown slugs and `/admin` go to `/spa.html`, the old client-only shell.
  - `<link rel="modulepreload">` for each page's chunks comes from the Vite
    manifest. `RenderedPagesContext` records which lazy pages actually
    rendered, so each page preloads only its own chunks. The manifest is
    deleted afterwards so it is not deployed.
  - Pieces that differed between server and client are guarded so hydration
    matches: `ThemeProvider`, `SubmissionModal` (`useMounted`), `ThemeToggle`,
    navbar hero tone, `Seo` (helmet tags are written into the HTML).
  - **Prerender gate.** Framer-motion elements start at `opacity: 0` on the
    client. In static HTML they would flash visible and then snap hidden at
    hydration. An inline `<style id="prerender-gate">` keeps exactly those
    elements hidden until hydration adds `html.hydrated`. The result is
    identical to the old client render. `perf/flash-check.mjs` checks every
    route and viewport for a flash.
- **Home hero** (`sections/Hero.jsx`, `index.css`). The entrance fade is a CSS
  animation with the same curve, distance and stagger as the old framer
  variants, so the hero text paints without waiting for JS (it still fades in from
  `opacity: 0`, see the design-decision list). It follows the site-wide
  `prefers-reduced-motion` rule.
- **Font fallbacks** (`index.css`, `tailwind.config.js`). `@font-face`
  fallbacks with `size-adjust`/ascent overrides for Satoshi, Clash Grotesk and
  JetBrains Mono, so the swap to the web font does not shift text. Once the
  font has loaded, the render is unchanged.
- **Home page is lazy** like every other page, so the entry chunk no longer
  carries it: entry `index` chunk 67.3 → 18.7 KB brotli.

### 2. WebGL

- **`useCanvasGate`** (`src/lib/useCanvasGate.js`, `src/lib/idle.js`). Every
  canvas renders its static fallback first, on the server and the client
  alike. The canvas and its three.js chunk mount only when all of these hold:
  - the page has loaded and `requestIdleCallback` has fired;
  - the host is near the viewport;
  - WebGL is hardware accelerated: a renderer check rejects SwiftShader,
    llvmpipe and softpipe;
  - the user has not asked for reduced motion.

  This covers `NetworkBackground` and all its variants, and the generative-AI,
  agentic and computer-vision canvases. `BusinessTypeModal` uses the same
  WebGL check.
  Before this, a scene mounted as soon as any WebGL context could be created,
  including software ones, and started downloading three.js during the
  initial load.
- **`NetworkCanvas` link search** uses a spatial grid (`src/lib/linkGrid.js`,
  with tests) instead of the O(n²) all-pairs loop. It finds the same links in
  the same order.
- Already in place and unchanged: render loops park off screen
  (`frameloop="never"`), DPR is capped at `[1, 1.5]`, and reduced motion
  already opted out of the scenes. That check now lives in `useCanvasGate`.

### 3. Bundles and caching

- `gsap` is split out of `motion-vendor`. Only the industry, portfolio and NLP
  pages use it, and grouping it with framer-motion made every home visit load
  it.
- `cn()` is plain `clsx`; `tailwind-merge` is gone from the runtime.
  `src/lib/utils.test.jsx` pins every former conflict site to the class list
  twMerge produced.
- `vite-plugin-compression` (brotli/gzip) and the immutable cache headers for
  `/assets/*` were already in place and are unchanged.

Bundle sizes, brotli (`node perf/sizes.mjs dist`):

| What                                  | Before           | After                          |
| ------------------------------------- | ---------------- | ------------------------------ |
| Home page, all JS + CSS it loads      | 194.1 KB, 4 files | 181.3 KB, 53 files (preloaded) |
| Entry `index` chunk                   | 67.3 KB          | 18.7 KB                        |
| `motion-vendor`                       | 61.4 KB          | 37.4 KB                        |
| `HomePage` chunk                      | (in entry)       | 28.6 KB                        |
| `gsap` (not loaded on the home page)  | (in motion-vendor) | 39.6 KB                      |
| CSS                                   | 20.0 KB          | 21.3 KB (font fallbacks, hero keyframes) |

### 4. Blur, marquee, timers

No changes. The marquees and floating elements animate `transform` only. The
blurred glows are static layers that only translate. Every `setInterval` /
`setTimeout` in the client is functional: carousels, typing effect, toasts.
None needed removing.

### 5. SEO and accessibility

- Site-wide 1200×630 `og:image` (`public/og/default.jpg`). Case studies still
  pass their own.
- Robots, sitemap, canonical and JSON-LD were already correct. With the
  prerender they are now in the served HTML, not only after JS.
- One `<h1>` per route, which was already true.
- Accessibility fixes, all invisible:
  - **Heading order:** footer column titles are `h4` → `h2`. The classes set
    every style, so the render is identical.
  - **ARIA:** star ratings in four service heroes now use
    `role="img" aria-label`.
  - **Invalid role/markup:** case-study tab panels are `motion.article` →
    `motion.div`. `CvWhyUs` uses plain `div`s instead of a `dl` whose items
    sat inside flip wrappers.

### 6. Guard rails

- `lighthouserc.cjs`: LHCI budgets on five representative routes. `npm run
  perf` builds and runs it. The budgets are a ratchet at today's level plus
  noise (mobile Perf ≥ 0.65, LCP ≤ 7 s, TBT ≤ 400 ms; A11y, BP, SEO and CLS at
  the brief's targets), not the brief's mobile targets: those are not met yet,
  so asserting them would fail every push. Tighten them as numbers improve.
- `.husky/pre-push` runs `npm run perf` when `client/` changed since the last
  push. It defaults `VITE_API_URL` to the production API when unset, since the
  build refuses to run without it.
- `npm run perf:all`: every route, compared against the baseline.

## Visual equivalence

Pixel screenshots were not usable as the gate: infinite marquees, pulses,
carousels and WebGL scenes never land on the same frame twice, and
Playwright's fake clock does not drive the prerendered build correctly (see
trade-offs below). Equivalence was checked with a layout and style
fingerprint instead:

- `perf/fingerprint.mjs` loads every route at 1440×900 and 390×844 (touch)
  with real timers and a real GPU, walks the page so every reveal fires,
  waits for images and canvases, returns to the top and finishes every finite
  animation. For each element it records the box plus 22 computed style
  properties and its text.
- `perf/fpdiff.mjs` compares two runs and sets aside what is motion, not
  design: elements whose only difference is a running transform (and their
  children), and WebGL hosts caught with the fallback in one run and the
  canvas in the other.

Before (`0384ee3d`) against after, all 40 routes, both viewports. Every
remaining difference was read and falls into one of these:

| Difference | Where | Verdict |
| --- | --- | --- |
| Testimonial carousel on a different slide (and everything below shifted by the quote's height) | industry pages | Auto-advance timing, not a change |
| Pulse dots, SVG twinkles, NLP prediction loop mid-cycle | service heroes, case studies, NLP | Infinite animation phase |
| `article`/`dl`/`dt`/`dd` → `div`, footer `h4` → `h2`, an `sr-only` duplicate label removed from the CV stat tiles | CV, NLP, footer | Intended markup fixes, same boxes and styles |
| **NLP hero headline hidden after scrolling back to the top** | `/ai-services-and-solutions/natural-language-processing-services` | **A real regression from the prerender gate. Fixed**: `[data-hero-heading]` came off the gate list (see `prerenderGate.js`). Re-run: 0 real differences on desktop, only the prediction loop on mobile |

`perf/flash-check.mjs` passes on every route and viewport after the fix.

## Not done / requires a design decision

These would change what the page looks like or says, so they are left alone:

- **Hero entrances from `opacity: 0`** (home CSS fade, framer entrances on the
  other heroes). This is the biggest remaining mobile LCP cost: invisible text
  is not an LCP candidate, so LCP waits for hydration and the fade. Showing the
  hero heading and copy at full opacity from the first paint (or animating
  only `transform`) should bring mobile LCP close to FCP (~2 s).

- **Colour contrast** (axe `color-contrast`): muted text on the case-study,
  computer-vision and agentic pages. Fixing it means darker text colours.
- **Tap target size** (`target-size`, mobile): small dot/slider controls on the
  industries pages. Fixing it means bigger controls or more spacing.
- **Link text** (`link-text`): "Learn more" links on
  `/ai-services-and-solutions/ai-development-services` (SEO 92). Fixing it
  means changing the copy.

Left as is, on purpose:

- **Lucide icons stay as ~46 tiny chunks** (~25 KB raw in total) that the home
  page modulepreloads. Grouping them would ship every icon to every route.
- **Home sections are not split further.** Making the whole home page lazy gave
  the entry-chunk win, and the sections below the fold are prerendered HTML
  anyway.
- **One shared WebGL context** for all scenes was not attempted. Each canvas
  keeps its own context, now mounted lazily. A page can still have several
  live contexts once they have all been scrolled past (they stay mounted
  so the scene is not re-randomised).

Noticed, not changed (it predates this work and behaves the same in both builds):

- On `/portfolio`, a smooth scroll (anchor jump, `scrollIntoView`) often stops
  short of its target. The page calls `ScrollTrigger.refresh()` on every image
  load, and each refresh cancels the scroll in progress. Debouncing it until
  scrolling has settled would fix it, but it changes behaviour, so it is left
  for a separate change.

Known trade-offs:

- The repo's pre-commit hook (lint-staged: eslint --fix + prettier) reformats
  whole files on commit, so the diffs for `index.css`, `Hero.jsx` and
  `App.jsx` include formatting-only lines alongside the real change.

- The prerender gate hides framer-animated elements until hydration. If JS
  fails to load entirely, those elements stay hidden. That is the same
  outcome as before, when the whole page was blank without JS.
- Under `prefers-reduced-motion`, framer's own `useReducedMotion` handling is
  unchanged. The new CSS hero animation collapses to its end state through the
  global reduced-motion rule, after the same short delay.
- Playwright's fake clock (`page.clock`), used by `perf/screenshots.mjs`, does
  not drive lazy images, `requestIdleCallback` or framer animations the way
  real timers do. Pixel screenshots of the prerendered build under it show
  harness artefacts, which is why equivalence was checked with real timers (see
  above).
