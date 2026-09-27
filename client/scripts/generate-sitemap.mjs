/**
 * Post-build step (runs after `vite build`):
 *
 *  1. Writes dist/sitemap.xml from src/seo/sitemapRoutes.js.
 *  2. Copies dist/index.html to dist/404.html. Vercel serves that file, with a
 *     real 404 status, for any path no rewrite in vercel.json matches, so the
 *     SPA boots and shows the NotFound page instead of Vercel's default.
 *  3. Fails the build if a sitemap URL would not match a vercel.json rewrite.
 *     Such a page would still render (404.html is the app), but with a 404
 *     status, and Google would drop it from the index without any warning.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE_URL = (process.env.VITE_SITE_URL || "https://axiomra.co").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

// The route list imports data files that import images, so load it through
// Vite rather than plain Node.
const vite = await createServer({
  root,
  logLevel: "error",
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});
let routes;
try {
  const mod = await vite.ssrLoadModule("/src/seo/sitemapRoutes.js");
  routes = mod.default();
} finally {
  await vite.close();
}

/** Last commit date of the given files, or today when git has no history (shallow CI clones). */
function lastmod(sources) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...sources], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return out || today;
  } catch {
    return today;
  }
}

// Mirrors how Vercel matches "source" patterns: ":name" is one segment,
// ":name*" is zero or more.
function sourceToRegExp(source) {
  const pattern = source
    .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\/:\w+\*/g, "(?:/.*)?")
    .replace(/:\w+/g, "[^/]+");
  return new RegExp(`^${pattern}$`);
}

const { rewrites = [] } = JSON.parse(readFileSync(path.join(root, "vercel.json"), "utf8"));
const matchers = rewrites.map((r) => sourceToRegExp(r.source));
const unrouted = routes
  .map((r) => r.path)
  .filter((p) => p !== "/" && !matchers.some((re) => re.test(p)));
if (unrouted.length) {
  console.error(
    "sitemap: these pages match no rewrite in vercel.json and would be served with a 404 status:\n  " +
      unrouted.join("\n  "),
  );
  process.exit(1);
}

const seen = new Set();
const urls = routes.map(({ path: p, sources }) => {
  if (seen.has(p)) throw new Error(`sitemap: duplicate route ${p}`);
  seen.add(p);
  return `  <url>\n    <loc>${SITE_URL}${p}</loc>\n    <lastmod>${lastmod(sources)}</lastmod>\n  </url>`;
});

writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
);
copyFileSync(path.join(dist, "index.html"), path.join(dist, "404.html"));

console.log(`sitemap: ${urls.length} URLs written to dist/sitemap.xml; dist/404.html created`);
