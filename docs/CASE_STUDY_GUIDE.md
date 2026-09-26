# Case Study Guide

How case studies are built on axiomra.co, and the rules every new one follows.
Everything here describes the system as it exists in the code. If the code
changes, update this file in the same commit.

---

## 1. Structure

### Files

| What | Where |
| --- | --- |
| Data (all studies) | `client/src/data/caseStudiesData.js` |
| Page | `client/src/pages/CaseStudyPage.jsx` |
| Decorations + image frame | `client/src/components/case-study/` (`NetworkMesh`, `BinaryGrid`, `MoleculeGraph`, `CategoryBadge`, `BrandedImage`) |
| Motion CSS | `client/src/styles/case-study.css` |
| Section reveal hook | `client/src/hooks/useStaggerReveal.js` |
| Images | `client/src/assets/case-studies/<slug>/` |
| Social preview image | `client/public/og/<slug>.jpg` |
| Portfolio row + link | `client/src/data/portfolioData.js` |

A new case study is **a new entry in `caseStudiesData.js`**, never a new
component or page. The navbar and footer are never touched.

### Route

`/case-studies/:slug` (see `CASE_STUDIES_PATH` and `caseStudyPath(slug)` in the
data file; the route is registered in `client/src/App.jsx`). An unknown slug
redirects to the portfolio.

### Schema

The JSDoc `@typedef CaseStudy` at the top of `caseStudiesData.js` is the source
of truth. Summary:

**Required**

| Field | Type | Notes |
| --- | --- | --- |
| `slug` | string | Same as the object key and the image folder name. |
| `type` | `"client"` \| `"blueprint"` | `client` = delivered work. `blueprint` = representative design (see §2). |
| `accent` | hex string | Tint hue for this study (see §3). |
| `title` | string | H1. |
| `eyebrow` | string | Category, shown in `CategoryBadge` (e.g. "Healthcare"). |
| `subtitle` | string | One or two plain sentences under the title. |
| `seoTitle`, `seoDescription` | string | Page meta. |
| `ogImage` | string | Path under `/public`, e.g. `/og/<slug>.jpg`. |
| `hero` | `CaseImage` | 4:3 hero photo. |
| `keyDetails` | `{ summary?, challenge, solution, technologies }` | The "Key details" band. `technologies` stays plain and ends with "Full details are in the technical section below." |

**Optional** (the page skips any section the entry leaves out)

| Field | Renders as |
| --- | --- |
| `stats` `{ value, label }[]` | Numeric stat strip. **Client studies only.** |
| `highlights` `{ title, text }[]` | Non-numeric strip. Use instead of `stats` on blueprints. |
| `executiveSummary` `string[]` | Paragraphs. |
| `context` `string[]`, `contextImage` | Paragraphs + wide photo. |
| `challenge` `{ intro?, items: { lead?, text }[] }` | Bulleted list with bold leads. |
| `insight`, `insightLabel` | Dark quote card. |
| `solution` `string[]`, `solutionAsList` | Paragraphs, or bullets when `solutionAsList: true`. |
| `capabilities` `{ capability, value }[]` | Two-column table. |
| `flow` `{ title, text, checkpoint? }[]`, `flowImage` | Numbered steps. `checkpoint: true` marks a human step. |
| `outcome` `{ intro, rows: { metric, traditional, agent, target? }[] }` | Before/after table. |
| `impactIntro`, `impact` `{ lead?, text }[]` | Bulleted list. |
| `targetOutcome` string | Dashed "Target" card. |
| `principles` `{ title, text }[]` | Card grid. |
| `whyItMatters`, `nextSteps` `string[]` | Closing pair (side by side when both exist). |
| `tags` `string[]` | Tag pills. |
| `phases` `string[]`, `stack` `{ layer, tool, purpose? }[]` | Inside "Under the hood". |
| `labels` | Section title overrides (keys below). |
| `cta` `{ title, subtitle, buttonText }` | Closing CTA. Defaults to the sales-agent CTA, so set it for any other topic. |

`CaseImage` = `{ sources: { src, width }[], width, height, alt, imageCredit? }`
with `imageCredit` = `{ photographer, site, url }`. (`logoBaked` also exists,
for three legacy sales-agent files only; never set it on a new image.)

**Label keys** and defaults: `summary` Executive summary · `context` Business
context · `challenge` The challenge · `solution` The solution · `capabilities`
What the agent does · `flow` How it works · `phases` Implementation phases ·
`stack` Technology stack · `outcome` Outcome framework · `impact` Business
impact · `principles` Implementation principles · `why` Why this matters ·
`next` Next enhancements · `tech` Under the hood (for technical teams).
Both current studies override most of these with plain wording ("The problem",
"What we built", "How it works, step by step", "What changes for your team").
Do the same.

### Section order (fixed by the page)

1. Header: breadcrumb, back link, `CategoryBadge` + Solution Blueprint badge (blueprints), title, subtitle, hero image
2. `stats` or `highlights` strip
3. Key details band
4. Executive summary
5. Context (+ context image)
6. Challenge
7. Insight card
8. Solution
9. Capabilities table
10. How it works (flow, + flow image beside it on large screens)
11. Outcome table
12. Impact
13. Target outcome card
14. Principles
15. Why it matters / Next steps
16. Tags
17. **Under the hood** (collapsed): implementation phases, then tech stack
18. More case studies
19. Gradient CTA

### Decorations

All are `aria-hidden`, pointer-events-none, and hidden below `lg`/`xl` so they
only live in the page margin.

| Component | Where | Shown from |
| --- | --- | --- |
| `NetworkMesh` ×2 (seeds 3 and 11) | Left and right edges of the Key details band, coloured with the accent at 20% | `lg` |
| `BinaryGrid` | Right margin of the Solution section | `xl` |
| `MoleculeGraph` | Left margin of the phases list; or of the flow when there is no `flowImage` and no `phases` | `xl` |
| `CategoryBadge` | Header, holds `eyebrow` | always |

Do not add new decorations per study. One set, same positions, every page.

### Animations

- Header badge and title rise in on load (`.cs-load-rise`).
- Every `Section` staggers its headings, paragraphs, list items, rows and
  `<figure>`s in once, on scroll (`useStaggerReveal`). Keep images inside a
  `<figure>` so they join the stagger.
- Insight card: gradient drifts slowly. Insight, Target and Why blocks use `<Reveal>`.
- Decorations draw in and pulse only while on screen (`.cs-decor` + `data-active`).
- All motion lives under `prefers-reduced-motion: no-preference`. Reduced
  motion gets the finished static page. Only opacity, transform and
  stroke-dashoffset animate.

### "Under the hood"

A native `<details>`, closed by default, after the tags. It holds `phases` and
`stack` and appears only if one of them exists. This is the **only** place
for tool names, model names, cloud services and architecture terms.

### "More case studies"

Built automatically from every other entry in the data file. Each card shows
the hero at 16:9 (logo overlay, no credit line), the eyebrow, the Solution
Blueprint pill for blueprints, and a border tinted with that study's accent.
Nothing to configure.

### Portfolio linking

Add a row to the `caseStudies` array in `portfolioData.js`:

- `card.webp` (1574×976) imported from the study's asset folder, plus `width`/`height`.
- `accent`: **the same hex** as the case study entry.
- `caseStudy: caseStudyPath("<slug>")`: this swaps the row's button to "Read case study".
- Blueprints: `stats` describe capabilities, not figures, and `statsLabel: "Solution blueprint"`.

---

## 2. Writing

Readers are business owners, not engineers.

- Plain English, grade 7–8 reading level. Check with a readability tool (e.g. Hemingway).
- Sentences under 20 words. Split anything longer.
- Outcome first: say what changes for the reader, then how.
- Speak to the reader: "your team", "your staff".
- Technical terms appear **only** in "Under the hood" (`phases`, `stack`).
  `keyDetails.technologies` describes the tech in plain words.
- Use `labels` to replace the default section titles with plain ones.

### Jargon replacements (from the current studies)

| Don't write | Write |
| --- | --- |
| multi-agent assistant, task agents | a team of AI assistants, each handling one job |
| GPT-4, LLM, GPT-class model | AI that understands and writes natural language |
| RAG, retrieval, embeddings, vectorized, semantic search, pgvector | searches the company's own documents |
| grounded answers | answers based on real company content |
| AWS, serverless, Lambda | cloud hosting |
| Pipedrive opportunity creation | adds the lead to the sales system / CRM automatically |
| qualify leads, lead qualification, scoring | spot serious buyers, sort leads, check for a good fit |
| qualified / high-intent prospect | serious buyer |
| unqualified traffic | poor-fit visitors |
| firmographic data, prospect enrichment | basic facts about the visitor's company |
| engage visitors, first-contact | reply to visitors, first impressions |
| inquiry, session | question, visit |
| representative, geography | sales rep, location |
| chat-to-call conversion | chats that turn into booked calls |
| existing baseline | current rate |
| pipeline quality | better leads |
| passive information channel | a page people read |
| multilingual, market-specific routing | in more languages, sent to the right team for each market |
| lead-nurture sequences | follow-up messages |
| analytics dashboard, intent trends | a dashboard showing what visitors ask about most |
| human-in-the-loop | staff make the final call / people stay in charge |
| escalation | handoff to staff / goes straight to a staff member |
| triage rules, configurable rules | rules your team sets |
| red-flag conditions | serious warning signs you define |
| EHR/EMR | patient records system |
| demographics | personal details |
| NLP structures answers into fields | turns answers into organized information |
| validated against required rules | checks that nothing required is missing |
| fragmented inputs | information arrives in pieces |
| administrative | admin, paperwork |
| clinical judgment | medical judgment |
| role-based access, audit logging, encryption | only the right people can see data, every action is recorded, data is locked and protected |
| monitoring, drift | watched after launch |
| workflow | process, step |
| Agentic AI (tag) | AI Agents |

### Honesty rules

- **Never invent** numbers, clients, testimonials, logos, quotes or compliance
  claims (HIPAA, SOC 2, GDPR, ISO…). Use only what the source document says.
- Any unmeasured figure is a target. In the outcome table set `target: true`
  (the row gets a "Target (not yet validated)" badge). Standalone goals go in
  `targetOutcome` (rendered under the word "Target"). Stat labels say
  "Target …". Never remove a `target` flag without real analytics.
- Representative work uses `type: "blueprint"`. The page then shows the
  **Solution Blueprint** badge and the note "Representative solution design.
  Results depend on deployment." Blueprints use `highlights`, never numeric
  `stats`, and never name a client.

---

## 3. Theme

Each study has an `accent` hex in its data entry. Current hues:

| Study | Accent |
| --- | --- |
| `axiomra-ai-sales-agent` | `#3B4FBF` blue |
| `healthcare-patient-intake-triage-ai-agent` | `#0F766E` teal |
| `healthcare-chatbot-virtual-assistant` | `#D97706` amber |
| `healthcare-medical-imaging-disease-identification` | `#7C3AED` violet |
| `ai-physical-therapy-pose-estimation` | `#E11D48` rose |
| `fintech-autonomous-financial-advisor-ai-agent` | `#16A34A` green |
| `healthcare-readmission-risk-prediction` | `#0284C7` sky |
| `fintech-regulatory-document-analysis-compliance-nlp` | `#0891B2` cyan |
| `fintech-kyc-document-processing-onboarding-automation` | `#C026D3` fuchsia |
| `retail-in-store-ai-shopping-assistant` | `#EA580C` orange |
| `fintech-ai-fraud-detection-anomalous-transactions` | `#65A30D` lime |
| `retail-ai-personalized-marketing` | `#DB2777` pink |
| `fintech-machine-learning-credit-scoring` | `#4F46E5` indigo |
| `retail-ai-inventory-demand-forecasting` | `#059669` emerald |
| `retail-dynamic-pricing-optimization` | `#CA8A04` yellow |

A new study **must use a hue not in this table** (next candidates: slate,
red, purple). Add it to this table and to the portfolio row.

How it is applied: the page sets `--cs-accent` (an RGB triple) on the
`<article>` via `accentVars(hex)`, and uses it only as a tint:

| Where | Opacity |
| --- | --- |
| Key details band background (overlay on `surface-subtle`) | 8% |
| Key details band top/bottom border | 20% |
| `NetworkMesh` lines and nodes (at rest) | 20% |
| Hero image ring | 20% |
| "More case studies" card border (that card's own accent) | 20% |

Rules:

- Backgrounds 6–12%, borders and decorations 15–25%. **Never** a solid fill.
- Text never uses the accent. It keeps the site tokens (`text-content`,
  `text-content-dim`, `text-content-faint`, `text-brand`, `text-accent`).
- Tints are low enough that WCAG AA contrast of the site's text colours is
  unchanged. If you raise a tint, re-check contrast in light **and** dark mode.
- New tint uses go through `rgb(var(--cs-accent)/<alpha>)` in the page, not
  a hard-coded colour.

---

## 4. Images

### Sourcing

- Free-licence sites only: Unsplash, Pexels, Pixabay.
- At least 1920 px wide at source.
- Relevant to the industry of the study.
- No identifiable real patients, no other companies' logos or branded screens.
- Record the photographer, the site and the photo page URL.

### Files

Images live in `client/src/assets/case-studies/<slug>/` and are imported in the
data file. Vite then fingerprints them, so they can be cached forever and a
missing file breaks the build instead of 404ing. (Not `/public`: files there
are served un-hashed and are not checked at build time.)

Each photo is exported as WebP at three widths, each under 300 KB:

| Role | Files | Aspect | `width`×`height` in data |
| --- | --- | --- | --- |
| Hero | `hero-800/1400/2200.webp` | 4:3 | 1400×1050 |
| Context / flow | `<name>-800/1400/2200.webp` | 16:9 | 1400×788 |
| Portfolio card | `card.webp` | 1574×976 | 1574×976 |
| Social preview | `client/public/og/<slug>.jpg` | 1200×630 | — |

Export (Pillow is installed):

```bash
python3 - <<'EOF'
from PIL import Image, ImageOps
src, out, ratio = "photo.jpg", "client/src/assets/case-studies/<slug>/hero", 4/3   # 16/9 for context/flow
im = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
w, h = im.size
if w / h > ratio:  # centre crop to the ratio
    nw = int(h * ratio); im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
else:
    nh = int(w / ratio); im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
for width in (800, 1400, 2200):
    im.resize((width, round(width / ratio)), Image.LANCZOS).save(f"{out}-{width}.webp", "WEBP", quality=78, method=6)
EOF
ls -l client/src/assets/case-studies/<slug>/   # every file < 300 KB
```

### Data

```js
hero: {
  sources: [
    { src: hero800, width: 800 },
    { src: hero1400, width: 1400 },
    { src: hero2200, width: 2200 },
  ],
  width: 1400,
  height: 1050,
  alt: "A nurse reviewing a patient summary on a tablet at a clinic desk",
  imageCredit: { photographer: "Jane Doe", site: "Unsplash", url: "https://unsplash.com/photos/..." },
},
```

- `alt` describes what is in the photo, in plain words. No "image of".
- `imageCredit` renders as "Photo: Jane Doe / Unsplash" in small text under
  the image on the case study page (not on "More case studies" cards).

### Logo: `<BrandedImage>`

`client/src/components/case-study/BrandedImage.jsx` renders every case study
photo. It overlays `assets/logo-light.webp` in the bottom-right corner at
10% of the image width (never smaller than 4.5 rem), 80% opacity, with a
soft drop shadow. **Never bake the logo into the image file.**

```jsx
<BrandedImage image={study.hero} priority sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-xl2 ..." />
```

Props: `image` (a `CaseImage`), `sizes`, `priority` (hero only), `credit`
(default `true`; `false` inside links/cards), `className` (styles the frame).

### When an image can't be downloaded

Keep going with a placeholder: export a flat neutral image (e.g. `#E5EAF2`) at
the right ratio through the same script, write the final `alt` anyway, leave
`imageCredit` out, and add a `// TODO(image): <search terms>` comment on the
entry. List the search terms in the PR/commit message so someone can find the
photo by hand.

---

## 5. Checklist

- [ ] New entry in `caseStudiesData.js`; every required field set; `slug` = key = folder.
- [ ] `type` correct. Blueprint → `highlights`, no client name, no numeric `stats`.
- [ ] Unique `accent`, added to the table in §3 and to the portfolio row.
- [ ] Every unmeasured figure is `target: true` / `targetOutcome` / "Target …".
- [ ] No invented numbers, clients, testimonials or compliance claims.
- [ ] Plain English outside "Under the hood"; sentences under 20 words; `labels` set.
- [ ] Custom `cta` if the topic isn't sales.
- [ ] Images: free licence, ≥1920 px source, WebP, 3 widths, each < 300 KB, `alt`, `imageCredit`, no baked logo.
- [ ] `card.webp` + portfolio row with `caseStudy: caseStudyPath(slug)`; `og/<slug>.jpg`.
- [ ] `cd client && npx eslint src/data src/pages/CaseStudyPage.jsx src/components/case-study && npm run build` passes.
- [ ] Existing case studies unchanged (diff shows no edits to other entries).
- [ ] Screenshots of the new page at 1280 px and ~390 px (mobile), light and
      dark mode; no horizontal scroll; "Under the hood" opens; "More case
      studies" shows the new card on the other pages.
