/**
 * Catches prerendered content that paints visible and then vanishes when React
 * hydrates (a GSAP `from()` target missing from src/seo/prerenderGate.js).
 *
 *   node perf/flash-check.mjs <distDir> [--only /,/about]
 *
 * For each route it records which elements in the first viewport are visible
 * before any module script runs, then checks them again the moment <html>
 * gets the `hydrated` class. Anything that was visible and is now hidden is a
 * flash the visitor would see. Exits 1 if any route has one.
 */
import { spawn } from "node:child_process";
import { chromium } from "playwright";
import { routes } from "./routes.mjs";

const [distDir = "dist"] = process.argv.slice(2);
const onlyIdx = process.argv.indexOf("--only");
const list = onlyIdx > 0 ? process.argv[onlyIdx + 1].split(",") : routes();
const PORT = 4175;

const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PORT), "--strictPort", "--outDir", distDir],
  { stdio: "ignore", detached: true }
);
await new Promise((r) => setTimeout(r, 2500));

// Runs in the page. Marks visible first-viewport elements before scripts run,
// then lists the marked ones that are hidden once hydration is signalled.
const probe = () => {
  const shown = (el) => {
    if (!el.isConnected) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2 || r.bottom <= 0 || r.top >= innerHeight) return false;
    if (getComputedStyle(el).visibility === "hidden") return false;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      if (parseFloat(getComputedStyle(n).opacity) < 0.05) return false;
    }
    return true;
  };
  const describe = (el) => {
    const attrs = [...el.attributes]
      .filter((a) => a.name.startsWith("data-"))
      .map((a) => `[${a.name}]`)
      .join("");
    return `${el.tagName.toLowerCase()}${attrs} "${(el.textContent || "").trim().slice(0, 40)}"`;
  };
  // "interactive" can fire before the stylesheets have applied, when even
  // `hidden lg:flex` elements still have a box. Snapshot once they all have.
  let before = [];
  const snapshot = () => {
    const pending = [...document.querySelectorAll('link[rel="stylesheet"]')].some((l) => !l.sheet);
    if (pending) return requestAnimationFrame(snapshot);
    if (!document.documentElement.classList.contains("hydrated")) {
      before = [...document.querySelectorAll("#root *")].filter(shown);
    }
  };
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "interactive") snapshot();
  });
  window.__flashes = null;
  // Init scripts run before <html> exists, so watch the document instead.
  new MutationObserver((_, obs) => {
    if (!document.documentElement?.classList.contains("hydrated")) return;
    obs.disconnect();
    window.__flashes = before.filter((el) => !shown(el)).map(describe);
  }).observe(document, { subtree: true, attributes: true, attributeFilter: ["class"] });
};

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
};

let failed = false;
const browser = await chromium.launch({ channel: "chrome" }); // system Chrome, same as Lighthouse
try {
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ viewport, colorScheme: "light" });
    await ctx.addInitScript(probe);
    const page = await ctx.newPage();
    for (const route of list) {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "load" });
      const flashes = await page
        .waitForFunction(() => window.__flashes, null, { timeout: 15000 })
        .then((h) => h.jsonValue())
        .catch((e) => [`(never hydrated) ${e.message.split("\n")[0]}`]);
      // Children of a hidden element are reported too; keep the outermost few.
      if (flashes.length) {
        failed = true;
        console.log(`${name} ${route}: ${flashes.length} flashed`);
        for (const f of flashes.slice(0, 8)) console.log(`    ${f}`);
      } else {
        console.log(`${name} ${route}: ok`);
      }
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  process.kill(-server.pid);
}
process.exit(failed ? 1 : 0);
