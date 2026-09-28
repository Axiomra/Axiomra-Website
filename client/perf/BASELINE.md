# Performance baseline

Measured before any of the changes in `perf/REPORT.md`, against a production
build of commit `0384ee3d` served by `vite preview`, with Lighthouse 12.8.2 (simulated
throttling; mobile = Moto G Power / slow 4G, desktop = default desktop preset).
Raw reports are in `perf/baseline/` (JSON is gitignored; `summary.json` is kept).
Reproduce with `npm run build && node perf/lighthouse.mjs perf/baseline` on that commit.

Caveat: a few unrelated builds ran on the same machine during this run. Simulated
throttling makes the metrics largely host-independent, but treat single-point
differences of a few points as noise.

## Key findings

- **TBT is dominated by WebGL running in software.** Lighthouse and PageSpeed
  Insights run headless Chrome with SwiftShader (CPU-emulated WebGL). A CPU
  profile of `/industries/healthcare` showed ~95% of main-thread time in
  "(program)", i.e. the GL emulation, which is why TBT reaches 50–124 s on the
  industry and generative-AI pages. Real visitors with a GPU never see this.
- **LCP is late because the site is client-rendered.** Every route ships an
  empty `#root`; the hero only paints after `react-vendor` + `motion-vendor` +
  the `index` chunk (≈194 KB brotli) and the route chunk have loaded and run.
- CLS is already 0 everywhere.
- SEO 92 on `/ai-services-and-solutions/ai-development-services`; accessibility
  85 on `/computer-vision-services`, 92 on `/agentic-ai-services`, 94 on the
  case studies.

## Initial JS/CSS (home page)

| Chunk | Raw KB | Gzip KB | Brotli KB | In index.html |
|---|---|---|---|---|
| react-three-fiber.esm-BdcsiXtH.js | 788.4 | 211.9 | 174.9 |  |
| index-iQvTBUb-.js | 244.3 | 80.9 | 67.3 | yes |
| motion-vendor-BfAUsZKs.js | 194.7 | 69.0 | 61.4 | yes |
| index-BqXY4y0U.css | 167.4 | 26.0 | 20.0 | yes |
| react-vendor-CiR_b87R.js | 158.9 | 51.8 | 45.4 | yes |
| caseStudiesData-Dcpf7yuO.js | 119.4 | 31.1 | 26.0 |  |
| TechStackPage-DskohJRZ.js | 113.1 | 40.7 | 34.5 |  |
| AgenticAiPage-CuauhzbR.js | 94.3 | 27.1 | 22.9 |  |
| NlpPage-CigZy-w0.js | 78.7 | 23.3 | 19.6 |  |
| ComputerVisionPage-D3vZ3DRG.js | 75.3 | 22.9 | 19.1 |  |
| AdminLeadsPage-t_ch1LD6.js | 64.9 | 16.6 | 14.6 |  |
| LegalPage-D-6FcVrT.js | 62.6 | 18.5 | 15.8 |  |
| **index.html total** | 765.3 | 227.7 | 194.1 | 4 files |

## Lighthouse per route

### mobile

| Route | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | KB |
|---|---|---|---|---|---|---|---|---|---|
| / | 36 | 99 | 100 | 100 | 4.1s | 6.8s | 6926ms | 0.000 | 874 |
| /about | 37 | 99 | 100 | 100 | 2.7s | 8.5s | 3834ms | 0.000 | 1981 |
| /tech | 40 | 98 | 100 | 100 | 3.5s | 5.9s | 4381ms | 0.000 | 843 |
| /faqs | 44 | 98 | 100 | 100 | 2.7s | 5.8s | 2896ms | 0.000 | 792 |
| /contact | 44 | 100 | 100 | 100 | 3.6s | 4.8s | 6516ms | 0.000 | 581 |
| /portfolio | 33 | 98 | 100 | 100 | 3.0s | 8.9s | 18893ms | 0.000 | 2140 |
| /ai-services-and-solutions | 35 | 99 | 100 | 100 | 3.4s | 9.0s | 3111ms | 0.000 | 2531 |
| /ai-services-and-solutions/ai-development-services | 41 | 95 | 100 | 92 | 2.9s | 7.5s | 2361ms | 0.000 | 1520 |
| /ai-services-and-solutions/generative-ai-services | 32 | 95 | 100 | 100 | 3.0s | 9.4s | 55239ms | 0.000 | 2022 |
| /ai-services-and-solutions/agentic-ai-services | 35 | 92 | 100 | 100 | 3.5s | 10.1s | 1655ms | 0.000 | 2943 |
| /ai-services-and-solutions/computer-vision-services | 38 | 85 | 100 | 100 | 2.8s | 7.1s | 8366ms | 0.000 | 2150 |
| /ai-services-and-solutions/natural-language-processing-services | 41 | 98 | 100 | 100 | 3.5s | 9.2s | 1117ms | 0.000 | 3869 |
| /industries | 36 | 95 | 100 | 100 | 3.0s | 10.2s | 2420ms | 0.000 | 4477 |
| /industries/fashion | 34 | 98 | 100 | 100 | 3.6s | 9.7s | 17039ms | 0.000 | 2940 |
| /industries/sports | 30 | 95 | 100 | 100 | 3.1s | 9.8s | 32795ms | 0.000 | 8675 |
| /industries/education | 30 | 95 | 100 | 100 | 3.1s | 10.1s | 50770ms | 0.000 | 4288 |
| /industries/healthcare | 30 | 95 | 100 | 100 | 3.1s | 9.4s | 122127ms | 0.000 | 3490 |
| /industries/real-estate | 30 | 99 | 100 | 100 | 3.1s | 10.3s | 72349ms | 0.000 | 3244 |
| /industries/retail | 33 | 95 | 100 | 100 | 3.7s | 10.3s | 3791ms | 0.000 | 3478 |
| /industries/marketing | 30 | 95 | 100 | 100 | 3.2s | 9.2s | 117591ms | 0.000 | 3837 |
| /industries/supply-chain | 35 | 95 | 100 | 100 | 3.2s | 10.0s | 2818ms | 0.000 | 2526 |
| /industries/insurance | 30 | 98 | 100 | 100 | 3.1s | 9.8s | 124333ms | 0.000 | 3189 |
| /industries/finance | 37 | 95 | 100 | 100 | 3.0s | 9.5s | 3957ms | 0.000 | 4076 |
| /industries/legal | 39 | 95 | 100 | 100 | 3.1s | 9.5s | 1859ms | 0.000 | 4787 |
| /industries/transportation | 41 | 95 | 100 | 100 | 3.1s | 11.9s | 1154ms | 0.000 | 4883 |
| /case-studies/axiomra-ai-sales-agent | 69 | 94 | 100 | 100 | 3.3s | 7.3s | 103ms | 0.000 | 1342 |
| /case-studies/healthcare-patient-intake-triage-ai-agent | 69 | 94 | 100 | 100 | 3.4s | 7.0s | 91ms | 0.000 | 1300 |
| /case-studies/healthcare-chatbot-virtual-assistant | 69 | 94 | 100 | 100 | 3.4s | 7.1s | 82ms | 0.000 | 1334 |
| /case-studies/healthcare-medical-imaging-disease-identification | 71 | 94 | 100 | 100 | 2.8s | 7.1s | 83ms | 0.000 | 1333 |
| /case-studies/ai-physical-therapy-pose-estimation | 71 | 94 | 100 | 100 | 2.9s | 7.0s | 65ms | 0.000 | 1337 |
| /case-studies/healthcare-readmission-risk-prediction | 69 | 94 | 100 | 100 | 3.3s | 7.0s | 41ms | 0.000 | 1329 |
| /case-studies/fintech-autonomous-financial-advisor-ai-agent | 69 | 94 | 100 | 100 | 3.3s | 7.1s | 85ms | 0.000 | 1328 |
| /case-studies/fintech-ai-fraud-detection-anomalous-transactions | 67 | 94 | 100 | 100 | 2.8s | 7.0s | 240ms | 0.000 | 1318 |
| /case-studies/fintech-kyc-document-processing-onboarding-automation | 69 | 94 | 100 | 100 | 3.3s | 7.1s | 63ms | 0.000 | 1316 |
| /case-studies/retail-in-store-ai-shopping-assistant | 69 | 94 | 100 | 100 | 3.3s | 7.1s | 65ms | 0.000 | 1386 |
| /case-studies/fintech-regulatory-document-analysis-compliance-nlp | 69 | 94 | 100 | 100 | 3.3s | 6.9s | 62ms | 0.000 | 1316 |
| /case-studies/retail-ai-personalized-marketing | 69 | 94 | 100 | 100 | 3.3s | 7.2s | 81ms | 0.000 | 1341 |
| /case-studies/fintech-machine-learning-credit-scoring | 71 | 94 | 100 | 100 | 2.9s | 7.0s | 83ms | 0.000 | 1330 |
| /case-studies/retail-ai-inventory-demand-forecasting | 70 | 94 | 100 | 100 | 2.8s | 7.5s | 111ms | 0.000 | 1354 |
| /case-studies/retail-dynamic-pricing-optimization | 70 | 94 | 100 | 100 | 2.8s | 7.6s | 112ms | 0.000 | 1387 |
| **median** | 41 | 95 | 100 | 100 | 3.1s | 7.6s | 2420ms | 0.000 | 1981 |

### desktop

| Route | Perf | A11y | BP | SEO | FCP | LCP | TBT | CLS | KB |
|---|---|---|---|---|---|---|---|---|---|
| / | 82 | 99 | 100 | 100 | 0.9s | 1.3s | 313ms | 0.000 | 898 |
| /about | 90 | 99 | 100 | 100 | 0.7s | 1.6s | 117ms | 0.000 | 1981 |
| /tech | 93 | 98 | 100 | 100 | 0.7s | 1.2s | 149ms | 0.000 | 843 |
| /faqs | 95 | 98 | 100 | 100 | 0.7s | 1.1s | 133ms | 0.000 | 792 |
| /contact | 91 | 100 | 100 | 100 | 0.7s | 1.0s | 221ms | 0.000 | 581 |
| /portfolio | 71 | 98 | 100 | 100 | 0.7s | 1.6s | 475ms | 0.000 | 2140 |
| /ai-services-and-solutions | 90 | 99 | 100 | 100 | 0.7s | 1.7s | 109ms | 0.000 | 2531 |
| /ai-services-and-solutions/ai-development-services | 95 | 95 | 100 | 92 | 0.7s | 1.4s | 37ms | 0.000 | 1520 |
| /ai-services-and-solutions/generative-ai-services | 58 | 95 | 100 | 100 | 0.7s | 1.7s | 6475ms | 0.000 | 2022 |
| /ai-services-and-solutions/agentic-ai-services | 78 | 92 | 100 | 100 | 0.8s | 2.0s | 224ms | 0.000 | 2946 |
| /ai-services-and-solutions/computer-vision-services | 72 | 85 | 100 | 100 | 0.7s | 1.7s | 475ms | 0.000 | 2150 |
| /ai-services-and-solutions/natural-language-processing-services | 89 | 98 | 100 | 100 | 0.7s | 1.7s | 142ms | 0.000 | 3869 |
| /industries | 85 | 95 | 100 | 100 | 0.7s | 1.9s | 150ms | 0.000 | 4198 |
| /industries/fashion | 52 | 95 | 100 | 100 | 0.7s | 1.8s | 8950ms | 0.000 | 2994 |
| /industries/sports | 88 | 95 | 100 | 100 | 0.7s | 1.8s | 111ms | 0.000 | 8675 |
| /industries/education | 52 | 95 | 100 | 100 | 0.7s | 1.8s | 9122ms | 0.000 | 2865 |
| /industries/healthcare | 53 | 98 | 100 | 100 | 0.7s | 1.7s | 8020ms | 0.000 | 2083 |
| /industries/real-estate | 52 | 99 | 100 | 100 | 0.7s | 1.8s | 6762ms | 0.000 | 3838 |
| /industries/retail | 74 | 95 | 100 | 100 | 0.8s | 1.8s | 298ms | 0.000 | 3824 |
| /industries/marketing | 53 | 95 | 100 | 100 | 0.7s | 1.6s | 11347ms | 0.000 | 3012 |
| /industries/supply-chain | 90 | 95 | 100 | 100 | 0.7s | 1.7s | 64ms | 0.000 | 3466 |
| /industries/insurance | 93 | 95 | 100 | 100 | 0.7s | 1.6s | 32ms | 0.000 | 2843 |
| /industries/finance | 92 | 95 | 100 | 100 | 0.7s | 1.7s | 51ms | 0.000 | 3913 |
| /industries/legal | 92 | 95 | 100 | 100 | 0.7s | 1.7s | 11ms | 0.000 | 4787 |
| /industries/transportation | 88 | 95 | 100 | 100 | 0.7s | 2.0s | 13ms | 0.000 | 5170 |
| /case-studies/axiomra-ai-sales-agent | 96 | 94 | 100 | 100 | 0.7s | 1.4s | 0ms | 0.000 | 1342 |
| /case-studies/healthcare-patient-intake-triage-ai-agent | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1300 |
| /case-studies/healthcare-chatbot-virtual-assistant | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1334 |
| /case-studies/healthcare-medical-imaging-disease-identification | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1333 |
| /case-studies/ai-physical-therapy-pose-estimation | 96 | 94 | 100 | 100 | 0.7s | 1.4s | 4ms | 0.000 | 1337 |
| /case-studies/healthcare-readmission-risk-prediction | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1329 |
| /case-studies/fintech-autonomous-financial-advisor-ai-agent | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1328 |
| /case-studies/fintech-ai-fraud-detection-anomalous-transactions | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1318 |
| /case-studies/fintech-kyc-document-processing-onboarding-automation | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1316 |
| /case-studies/retail-in-store-ai-shopping-assistant | 96 | 94 | 100 | 100 | 0.7s | 1.4s | 0ms | 0.000 | 1386 |
| /case-studies/fintech-regulatory-document-analysis-compliance-nlp | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1316 |
| /case-studies/retail-ai-personalized-marketing | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1341 |
| /case-studies/fintech-machine-learning-credit-scoring | 96 | 94 | 100 | 100 | 0.7s | 1.3s | 0ms | 0.000 | 1330 |
| /case-studies/retail-ai-inventory-demand-forecasting | 96 | 94 | 100 | 100 | 0.7s | 1.4s | 0ms | 0.000 | 1354 |
| /case-studies/retail-dynamic-pricing-optimization | 96 | 94 | 100 | 100 | 0.7s | 1.4s | 0ms | 0.000 | 1387 |
| **median** | 92 | 95 | 100 | 100 | 0.7s | 1.6s | 64ms | 0.000 | 1981 |
