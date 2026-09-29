import { describe, expect, it } from "vitest";
import { MAX_DIST, buildLinks, makeGrid } from "./linkGrid";

// The O(n²) sweep the grid replaced, as the reference.
function bruteForce(pos, count) {
  const pairs = new Set();
  for (let i = 0; i < count; i++) {
    for (let j = i + 1; j < count; j++) {
      const dx = pos[i * 3] - pos[j * 3];
      const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
      const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < MAX_DIST * MAX_DIST) pairs.add(`${i}-${j}`);
    }
  }
  return pairs;
}

// Maps the written segments back to particle index pairs.
function gridPairs(pos, count) {
  const out = new Float32Array(count * 12 * 6);
  const n = buildLinks(pos, count, makeGrid(count), out);
  const index = new Map();
  for (let i = 0; i < count; i++) index.set(`${pos[i * 3]},${pos[i * 3 + 1]},${pos[i * 3 + 2]}`, i);
  const pairs = new Set();
  for (let k = 0; k < n; k += 6) {
    const a = index.get(`${out[k]},${out[k + 1]},${out[k + 2]}`);
    const b = index.get(`${out[k + 3]},${out[k + 4]},${out[k + 5]}`);
    pairs.add(`${Math.min(a, b)}-${Math.max(a, b)}`);
  }
  return { pairs, segments: n / 6 };
}

// Deterministic PRNG so a failure reproduces.
function rng(seed) {
  return () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32;
}

describe("buildLinks", () => {
  it.each([70, 90, 140, 400])("finds exactly the brute-force pairs for %i particles", (count) => {
    const r = rng(count);
    for (let trial = 0; trial < 20; trial++) {
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        // The scatter volume plus the drift, and a margin outside the grid.
        pos[i * 3] = (r() - 0.5) * 24;
        pos[i * 3 + 1] = (r() - 0.5) * 14;
        pos[i * 3 + 2] = (r() - 0.5) * 9;
      }
      const expected = bruteForce(pos, count);
      const { pairs, segments } = gridPairs(pos, count);
      expect(segments).toBe(expected.size);
      expect(pairs).toEqual(expected);
    }
  });
});
