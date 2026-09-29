// Usage: node perf/fpdiff.mjs before.json after.json [limit]
// Classifies each differing element:
//   moving   - only the transform differs (a running infinite animation), or
//              only x/y differ under such an element
//   canvas   - a WebGL host showing its static fallback in one build and the
//              mounted canvas in the other (timing of the lazy mount)
//   real     - everything else; these need a look
import { readFileSync } from "node:fs";
const load = (f) => JSON.parse(readFileSync(f, "utf8"));
const norm = (v) =>
  v == null ? v : v.replace(/, "[^"]+ Fallback"/g, "").replace(/matrix\(1, 0, 0, 1, 0, 0\)/g, "none");
const [a, b] = process.argv.slice(2, 4).map(load);
const limit = +process.argv[4] || 6;
// Footer column titles moved from h4 to h2 on purpose; compare them as one.
// Case-study tab panels (article) and CvWhyUs (dl/dt/dd) became divs on purpose:
// compare them under one tag too.
const rekey = (o) =>
  Object.fromEntries(
    Object.entries(o).map(([k, v]) => [
      k.replace(/(footer0\/div2\/div\d+\/)h2(\d+)$/, "$1h4$2").replace(/\/(?:article|dl|dt|dd)(\d+)/g, "/div$1"),
      v,
    ]),
  );
const OPACITY = 16, TRANSFORM = 18;
const totals = { real: 0, moving: 0, canvas: 0 };
for (const page of Object.keys(a)) {
  if (!b[page]) continue;
  const A = rekey(a[page]), B = rekey(b[page]);
  const moving = [], canvas = [];
  const under = (list, k) => list.some((m) => k.startsWith(m + "/"));
  const real = [];
  for (const k of Object.keys({ ...A, ...B }).sort()) {
    const x = norm(A[k]), y = norm(B[k]);
    if (x === y) continue;
    if (under(canvas, k)) continue;
    if (x && y) {
      const fx = x.split("|"), fy = y.split("|");
      const rest = (f) => f.filter((_, i) => i !== 0 && i !== TRANSFORM && i !== OPACITY).join("|");
      const size = (f) => f[0].split(",").slice(2).join();
      if (fx[TRANSFORM] !== fy[TRANSFORM] && fx[TRANSFORM] !== "none" && fy[TRANSFORM] !== "none" && rest(fx) === rest(fy) && size(fx) === size(fy)) {
        moving.push(k); continue;
      }
      if (under(moving, k) && rest(fx) === rest(fy) && fx[OPACITY] === fy[OPACITY] && fx[TRANSFORM] === fy[TRANSFORM] && size(fx) === size(fy)) continue;
      if (/radial-gradient\(circle, rgba\(20, 216, 196/.test(fx[5] + fy[5])) { canvas.push(k); continue; }
    }
    real.push([k, x, y]);
  }
  totals.real += real.length; totals.moving += moving.length; totals.canvas += canvas.length;
  if (!real.length && !canvas.length) continue;
  console.log(`${page}: real ${real.length}, canvas ${canvas.length}, moving ${moving.length}`);
  for (const [k, x, y] of real.slice(0, limit)) console.log(`   ${k}\n     - ${x}\n     + ${y}`);
}
console.log("totals", totals);
