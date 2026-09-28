/**
 * Prints the largest JS/CSS chunks of a build as a markdown table, and which
 * of them the home page loads before anything else (its entry graph).
 *
 *   node perf/sizes.mjs <distDir> [top=15]
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { brotliCompressSync, gzipSync, constants } from "node:zlib";

const [dist = "dist", top = "15"] = process.argv.slice(2);
const assets = join(dist, "assets");
const kb = (n) => (n / 1024).toFixed(1);

const html = readFileSync(join(dist, "index.html"), "utf8");
const initial = new Set(
  [...html.matchAll(/(?:src|href)="\/assets\/([^"]+\.(?:js|css))"/g)].map((m) => m[1])
);

const rows = readdirSync(assets)
  .filter((f) => /\.(js|css)$/.test(f))
  .map((f) => {
    const buf = readFileSync(join(assets, f));
    return {
      f,
      raw: buf.length,
      gz: gzipSync(buf, { level: 9 }).length,
      br: brotliCompressSync(buf, {
        params: { [constants.BROTLI_PARAM_QUALITY]: 11 },
      }).length,
    };
  })
  .sort((a, b) => b.raw - a.raw);

console.log("| Chunk | Raw KB | Gzip KB | Brotli KB | In index.html |");
console.log("|---|---|---|---|---|");
for (const r of rows.slice(0, Number(top))) {
  console.log(`| ${r.f} | ${kb(r.raw)} | ${kb(r.gz)} | ${kb(r.br)} | ${initial.has(r.f) ? "yes" : ""} |`);
}
const first = rows.filter((r) => initial.has(r.f));
const sum = (k) => kb(first.reduce((s, r) => s + r[k], 0));
console.log(`| **index.html total** | ${sum("raw")} | ${sum("gz")} | ${sum("br")} | ${first.length} files |`);
