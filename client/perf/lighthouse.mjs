/**
 * Runs Lighthouse (mobile + desktop) against `vite preview` for every route
 * and writes one JSON per run plus summary.json into the given directory.
 *
 *   node perf/lighthouse.mjs perf/baseline [--only /,/about]
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";
import { routes } from "./routes.mjs";

const outDir = path.resolve(process.argv[2] || "perf/latest");
const onlyIdx = process.argv.indexOf("--only");
const list = onlyIdx > 0 ? process.argv[onlyIdx + 1].split(",") : routes();
const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;
mkdirSync(outDir, { recursive: true });

const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], {
  stdio: "ignore",
  detached: true,
});
await new Promise((r) => setTimeout(r, 2500));

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
const summary = {};
try {
  for (const route of list) {
    for (const form of ["mobile", "desktop"]) {
      const config = form === "desktop" ? desktopConfig : undefined;
      const res = await lighthouse(
        ORIGIN + route,
        { port: chrome.port, output: "json", logLevel: "error" },
        config
      );
      const lhr = res.lhr;
      const slug = route === "/" ? "home" : route.slice(1).replace(/\//g, "__");
      writeFileSync(path.join(outDir, `${slug}.${form}.json`), res.report);
      const s = (k) => Math.round((lhr.categories[k]?.score ?? 0) * 100);
      const a = (k) => lhr.audits[k]?.numericValue;
      summary[route] ??= {};
      summary[route][form] = {
        perf: s("performance"),
        a11y: s("accessibility"),
        bp: s("best-practices"),
        seo: s("seo"),
        fcp: Math.round(a("first-contentful-paint")),
        lcp: Math.round(a("largest-contentful-paint")),
        tbt: Math.round(a("total-blocking-time")),
        cls: +a("cumulative-layout-shift").toFixed(3),
        si: Math.round(a("speed-index")),
        bytes: Math.round(a("total-byte-weight") / 1024),
      };
      console.log(route, form, JSON.stringify(summary[route][form]));
    }
  }
} finally {
  writeFileSync(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
  await chrome.kill();
  process.kill(-server.pid);
}
