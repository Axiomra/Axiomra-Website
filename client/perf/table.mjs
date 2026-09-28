/**
 * Renders a Lighthouse summary.json (from perf/lighthouse.mjs) as markdown.
 *
 *   node perf/table.mjs perf/baseline/summary.json [perf/final/summary.json]
 *
 * With two files, each cell reads "before → after".
 */
import { readFileSync } from "node:fs";

const [a, b] = process.argv.slice(2).map((f) => JSON.parse(readFileSync(f, "utf8")));
const COLS = [
  ["perf", "Perf", (v) => v],
  ["a11y", "A11y", (v) => v],
  ["bp", "BP", (v) => v],
  ["seo", "SEO", (v) => v],
  ["fcp", "FCP", (v) => `${(v / 1000).toFixed(1)}s`],
  ["lcp", "LCP", (v) => `${(v / 1000).toFixed(1)}s`],
  ["tbt", "TBT", (v) => `${Math.round(v)}ms`],
  ["cls", "CLS", (v) => v.toFixed(3)],
  ["bytes", "KB", (v) => v],
];

const cell = (x, y, fmt) => {
  if (x == null) return "n/a";
  return y == null ? fmt(x) : `${fmt(x)} → ${fmt(y)}`;
};

for (const form of ["mobile", "desktop"]) {
  console.log(`\n### ${form}\n`);
  console.log(`| Route | ${COLS.map((c) => c[1]).join(" | ")} |`);
  console.log(`|---|${COLS.map(() => "---").join("|")}|`);
  for (const route of Object.keys(a)) {
    const x = a[route][form] ?? {};
    const y = b?.[route]?.[form];
    const cells = COLS.map(([k, , fmt]) => cell(x[k], y?.[k], fmt));
    console.log(`| ${route} | ${cells.join(" | ")} |`);
  }
  const med = (s, k) => {
    const v = Object.values(s)
      .map((r) => r[form]?.[k])
      .filter((n) => n != null)
      .sort((p, q) => p - q);
    return v[Math.floor(v.length / 2)];
  };
  const cells = COLS.map(([k, , fmt]) => cell(med(a, k), b && med(b, k), fmt));
  console.log(`| **median** | ${cells.join(" | ")} |`);
}
