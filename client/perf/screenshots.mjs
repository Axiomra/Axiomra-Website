/**
 * Full-page screenshots of every route, for visual regression.
 *
 *   node perf/screenshots.mjs <distDir> <outDir> [--only /,/about]
 *
 * Scroll-triggered reveals are fired by scrolling the whole page first, finite
 * animations are fast-forwarded and infinite ones reset (Playwright's
 * `animations: "disabled"`), and <canvas> elements are hidden because their
 * particle layouts are random per mount. Canvas frame 0 is compared separately.
 */
import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import { routes } from "./routes.mjs";

const [distDir = "dist", outDir = "perf/screenshots/latest"] = process.argv.slice(2);
const onlyIdx = process.argv.indexOf("--only");
const list = onlyIdx > 0 ? process.argv[onlyIdx + 1].split(",") : routes();
const PORT = 4174;
mkdirSync(outDir, { recursive: true });

const server = spawn(
  "npx",
  ["vite", "preview", "--port", String(PORT), "--strictPort", "--outDir", distDir],
  { stdio: "ignore", detached: true }
);
await new Promise((r) => setTimeout(r, 2500));

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true },
};

const browser = await chromium.launch({ channel: "chrome" }); // system Chrome, same as Lighthouse
try {
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    const ctx = await browser.newContext({ viewport, colorScheme: "light" });
    const page = await ctx.newPage();
    for (const route of list) {
      // A fake clock makes carousels, counters and reveal timings land on the
      // same frame every run; real timers leave ~1% noise between runs.
      await page.clock.install({ time: new Date("2026-01-01T00:00:00Z") });
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });
      await page.clock.runFor(1000);
      // Walk the page so every whileInView / ScrollTrigger reveal fires.
      const height = await page.evaluate(() => document.body.scrollHeight);
      const step = Math.round(viewport.height / 2);
      for (let y = 0; y < height; y += step) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.clock.runFor(150);
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.clock.runFor(3000);
      const slug = route === "/" ? "home" : route.slice(1).replace(/\//g, "__");
      await page.screenshot({
        path: path.join(outDir, `${slug}.${name}.png`),
        fullPage: true,
        animations: "disabled",
        // Hidden rather than masked: a mask box would also cover the hero
        // copy that sits on top of the canvas.
        style: "canvas, video { visibility: hidden !important; }",
      });
      console.log(name, route);
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  process.kill(-server.pid);
}
