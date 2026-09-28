/**
 * Pixel-diffs two screenshot directories. Exits non-zero when any image
 * differs by more than the anti-aliasing noise threshold.
 *
 *   node perf/diff.mjs perf/screenshots/before perf/screenshots/after [maxRatio]
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const [a, b, maxRatioArg] = process.argv.slice(2);
const MAX_RATIO = Number(maxRatioArg ?? 0.001);
const diffDir = path.join(b, "_diff");
mkdirSync(diffDir, { recursive: true });

let failed = 0;
for (const file of readdirSync(a).filter((f) => f.endsWith(".png"))) {
  const pb = path.join(b, file);
  if (!existsSync(pb)) {
    console.log(`MISSING ${file}`);
    failed++;
    continue;
  }
  const imgA = PNG.sync.read(readFileSync(path.join(a, file)));
  const imgB = PNG.sync.read(readFileSync(pb));
  if (imgA.width !== imgB.width || imgA.height !== imgB.height) {
    console.log(`SIZE    ${file}: ${imgA.width}x${imgA.height} -> ${imgB.width}x${imgB.height}`);
    failed++;
    continue;
  }
  const out = new PNG({ width: imgA.width, height: imgA.height });
  const n = pixelmatch(imgA.data, imgB.data, out.data, imgA.width, imgA.height, {
    threshold: 0.1,
    includeAA: false,
  });
  const ratio = n / (imgA.width * imgA.height);
  const bad = ratio > MAX_RATIO;
  if (bad) {
    failed++;
    writeFileSync(path.join(diffDir, file), PNG.sync.write(out));
  }
  console.log(`${bad ? "DIFF   " : "ok     "} ${file}  ${n}px (${(ratio * 100).toFixed(3)}%)`);
}
console.log(failed ? `\n${failed} image(s) differ` : "\nall identical within noise");
process.exit(failed ? 1 : 0);
