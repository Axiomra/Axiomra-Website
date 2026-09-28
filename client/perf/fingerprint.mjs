/**
 * Layout and style fingerprint of every element on every route, for visual
 * regression without pixel noise. Real timers; the page is walked so every
 * reveal fires, then finite animations are finished before sampling.
 *
 *   node perf/fingerprint.mjs <distDir> <out.json> [--only /,/about]
 */
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { chromium } from "playwright";
import { routes } from "./routes.mjs";

const [distDir, out] = process.argv.slice(2);
const onlyIdx = process.argv.indexOf("--only");
const list = onlyIdx > 0 ? process.argv[onlyIdx + 1].split(",") : routes();
const PORT = +(process.env.PORT || 4178);
const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort", "--outDir", distDir], {
  stdio: "ignore",
  detached: true,
});
await new Promise((r) => setTimeout(r, 2500));

const PROPS = [
  "display", "position", "color", "background-color", "background-image", "font-family", "font-size",
  "font-weight", "line-height", "letter-spacing", "padding", "margin", "border", "border-radius",
  "box-shadow", "opacity", "visibility", "transform", "filter", "backdrop-filter", "gap", "text-align",
];
const sample = (props) => {
  const rows = {};
  const skip = (el) => el.closest("canvas") || el.tagName === "CANVAS";
  const walk = (el, p) => {
    [...el.children].forEach((c, i) => {
      const path = `${p}/${c.tagName.toLowerCase()}${i}`;
      if (skip(c)) return;
      const r = c.getBoundingClientRect();
      const cs = getComputedStyle(c);
      rows[path] = [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)].join(",") +
        "|" + props.map((k) => cs.getPropertyValue(k)).join("|") +
        (c.children.length ? "" : "|" + (c.textContent || "").trim().slice(0, 60));
      walk(c, path);
    });
  };
  walk(document.body, "");
  return rows;
};

const result = {};
const browser = await chromium.launch({ channel: "chrome", args: ["--enable-gpu", "--use-angle=gl"] });
try {
  for (const [name, viewport] of Object.entries({
    desktop: { width: 1440, height: 900 },
    mobile: { width: 390, height: 844, isMobile: true, hasTouch: true },
  })) {
    const ctx = await browser.newContext({ viewport, colorScheme: "light", reducedMotion: "no-preference" });
    const page = await ctx.newPage();
    for (const route of list) {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle" });
      await page.waitForFunction(
        () => !document.getElementById("prerender-gate") || document.documentElement.classList.contains("hydrated")
      );
      await page.waitForTimeout(800);
      // Instant scrolling for the walk: the site's smooth scroll is cut short
      // whenever ScrollTrigger refreshes (on every image load), so a smooth
      // walk can stop short of the last sections. Removed before sampling.
      await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" }).then((h) => h.evaluate((n) => n.setAttribute("id", "fp-walk")));
      const height = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < height; y += viewport.height / 2) {
        await page.evaluate((t) => scrollTo(0, t), y);
        await page.waitForTimeout(120);
      }
      // Let lazy images finish and the gated canvases mount (their count stops
      // changing) before going back to the top.
      await page.waitForFunction(() => [...document.images].every((i) => i.complete), null, { timeout: 15000 }).catch(() => {});
      let last = -1;
      for (let i = 0; i < 20; i++) {
        const n = await page.evaluate(() => document.querySelectorAll("canvas").length);
        if (n === last) break;
        last = n;
        await page.waitForTimeout(1000);
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.evaluate(() => document.getElementById("fp-walk")?.remove());
      await page.waitForTimeout(2500);
      await page.evaluate(() =>
        document.getAnimations().forEach((a) => {
          try { if (a.effect?.getTiming().iterations !== Infinity) a.finish(); } catch { /* running */ }
        })
      );
      await page.waitForTimeout(200);
      result[`${name} ${route}`] = await page.evaluate(sample, PROPS);
      writeFileSync(out, JSON.stringify(result));
      process.stdout.write(".");
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  process.kill(-server.pid);
}
writeFileSync(out, JSON.stringify(result));
console.log(" done");
