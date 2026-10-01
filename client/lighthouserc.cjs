/**
 * Lighthouse CI budgets, run by `npm run perf` (and the pre-push hook).
 *
 * A handful of routes that cover every page shape: the home page, a plain
 * content page, the heaviest industry and service pages (WebGL heroes) and a
 * case study. `node perf/lighthouse.mjs` covers every route when needed.
 *
 * Mobile preset with simulated throttling, the same as PageSpeed Insights.
 */
const PORT = 4180;
const ROUTES = [
  "/",
  "/about",
  "/industries/healthcare",
  "/ai-services-and-solutions/generative-ai-services",
  "/case-studies/retail-dynamic-pricing-optimization",
];

const BUDGETS = {
  "categories:performance": ["error", { minScore: 0.65 }],
  "categories:accessibility": ["error", { minScore: 0.95 }],
  "categories:best-practices": ["error", { minScore: 1 }],
  "categories:seo": ["error", { minScore: 1 }],
  "largest-contentful-paint": ["error", { maxNumericValue: 7000 }],
  "cumulative-layout-shift": ["error", { maxNumericValue: 0.05 }],
  "total-blocking-time": ["error", { maxNumericValue: 400 }],
};

module.exports = {
  ci: {
    collect: {
      startServerCommand: `npx vite preview --port ${PORT} --strictPort`,
      startServerReadyPattern: "Local",
      url: ROUTES.map((r) => `http://localhost:${PORT}${r}`),
      numberOfRuns: 1,
      settings: { chromeFlags: "--headless=new --no-sandbox" },
    },
    assert: {
      // A ratchet, not the goal. The brief's targets (mobile Perf >= 0.95,
      // LCP < 2s, TBT < 150ms) are not met yet on mobile; see perf/REPORT.md
      // for why. These fail a push that makes things clearly worse than the
      // measured state (with room for run-to-run noise); tighten them as the
      // numbers improve. A11y, best practices, SEO and CLS are at target.
      // The home page has its own, tighter LCP budget: measured 4835 ms after
      // the below-the-fold image work, plus ~500 ms of noise margin.
      assertMatrix: [
        {
          matchingUrlPattern: `^http://localhost:${PORT}/$`,
          assertions: { ...BUDGETS, "largest-contentful-paint": ["error", { maxNumericValue: 5300 }] },
        },
        { matchingUrlPattern: `^http://localhost:${PORT}/.+`, assertions: BUDGETS },
      ],
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
