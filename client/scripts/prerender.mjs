/**
 * Post-build step: renders every sitemap URL to static HTML.
 *
 * Without this every route ships an empty <div id="root">: crawlers and link
 * previews see no title, description or copy, and the first paint waits for
 * the whole JS bundle. With it, each page's HTML already holds its nav, h1,
 * copy, footer and head tags, and main.jsx hydrates it instead of rendering
 * from scratch.
 *
 * Output, next to the untouched assets:
 *   dist/index.html            the home page
 *   dist/<path>.html           every other page (served at /<path> via
 *                              "cleanUrls" in vercel.json)
 *   dist/spa.html              the empty shell, for URLs that are not
 *                              prerendered (vercel.json rewrites land there)
 *
 * Runs after generate-sitemap.mjs, which reads the route list and copies the
 * empty shell to 404.html before this overwrites index.html.
 */
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateCss } from "../src/seo/prerenderGate.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrOut = path.join(root, "node_modules/.prerender");

execFileSync(
  "npx",
  ["vite", "build", "--ssr", "src/entry-server.jsx", "--outDir", ssrOut, "--logLevel", "error"],
  { cwd: root, stdio: "inherit" }
);
const { render } = await import(pathToFileURL(path.join(ssrOut, "entry-server.js")).href);

const template = readFileSync(path.join(dist, "index.html"), "utf8");
copyFileSync(path.join(dist, "index.html"), path.join(dist, "spa.html"));

const paths = [
  ...readFileSync(path.join(dist, "sitemap.xml"), "utf8").matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g),
].map((m) => m[1] || "/");

// The crawler defaults in index.html carry data-rh, i.e. they are Helmet's to
// replace. On a prerendered page Helmet's own tags take their place.
const baseHead = template
  .replace(/\s*<title>[\s\S]*?<\/title>/, "")
  .replace(/\s*<meta data-rh="true"[^>]*>/g, "");

const gate = gateCss();

// Vite's manifest, for modulepreload links to each page's own chunks. Nothing
// at runtime reads it, so it is not deployed.
const manifestPath = path.join(dist, ".vite/manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
rmSync(path.dirname(manifestPath), { recursive: true, force: true });

/** Static JS chunks behind the given source files, minus what index.html loads. */
function preloadsFor(sources) {
  const files = new Set();
  const walk = (key) => {
    const chunk = manifest[key];
    if (!chunk || files.has(chunk.file)) return;
    files.add(chunk.file);
    (chunk.imports ?? []).forEach(walk);
  };
  sources.forEach(walk);
  return [...files]
    .filter((f) => !template.includes(`/${f}"`))
    .map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`);
}

const problems = [];

// A stylesheet split off with a lazy chunk only arrives once that chunk loads,
// so a prerendered page would paint without it. Keep all CSS in the entry.
for (const css of readdirSync(path.join(dist, "assets")).filter((f) => f.endsWith(".css"))) {
  if (!template.includes(`/assets/${css}`)) problems.push(`assets/${css}: CSS not linked from index.html`);
}
for (const url of paths) {
  // The navbar is rendered before the page, so it cannot see the hero it sits
  // over. Render once to find the hero's tone, then again with it.
  let { html, helmet, pages } = await render(url);
  const tone = html.match(/data-nav-tone="(\w+)"/)?.[1];
  if (tone) ({ html, helmet, pages } = await render(url, tone === "light" ? "light" : "dark"));
  if (!pages.length) problems.push(`${url}: no lazy page recorded for modulepreload`);
  const preloads = preloadsFor(pages);
  const head = [helmet.title, helmet.meta, helmet.link, helmet.script]
    .map((t) => t.toString())
    .concat(preloads)
    .filter(Boolean)
    .join("\n  ");
  const page = baseHead
    .replace("</head>", `  ${head}\n  ${gate.style}\n  ${gate.noscript}\n</head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) problems.push(`${url}: ${h1s} <h1> elements`);
  if (!helmet.title.toString().includes("</title>")) problems.push(`${url}: no <title>`);

  const file = url === "/" ? "index.html" : `${url.slice(1)}.html`;
  mkdirSync(path.dirname(path.join(dist, file)), { recursive: true });
  writeFileSync(path.join(dist, file), page);
}
rmSync(ssrOut, { recursive: true, force: true });

if (problems.length) {
  console.error("prerender:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log(`prerender: ${paths.length} pages written`);
