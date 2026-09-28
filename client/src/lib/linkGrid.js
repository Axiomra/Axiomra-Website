/*
 * Link pass for NetworkCanvas.
 *
 * Buckets particles into a uniform grid of MAX_DIST-sized cells, so each
 * particle is only compared with the 27 cells around it rather than with every
 * other particle.
 *
 * The links come out in a different order than a plain i<j sweep, which is
 * invisible: every segment shares one colour and opacity, so blending them is
 * order-independent, and the segment buffer is far larger than the link count.
 */

export const MAX_DIST = 2.6;

// Grid covering the scatter volume plus the drift (±9.3, ±5.4, ±3); anything
// outside is clamped into the edge cells, which only costs a few extra checks.
const ORIGIN = [-10, -6, -4];
const DIMS = [8, 5, 4];
const CELLS = DIMS[0] * DIMS[1] * DIMS[2];

const cellAxis = (v, axis) =>
  Math.min(DIMS[axis] - 1, Math.max(0, Math.floor((v - ORIGIN[axis]) / MAX_DIST)));

/** Counting-sort scratch for buildLinks, allocated once per field. */
export function makeGrid(count) {
  return {
    cellOf: new Int32Array(count),
    start: new Int32Array(CELLS + 1),
    fill: new Int32Array(CELLS),
    order: new Int32Array(count),
  };
}

/**
 * Writes a segment into `linePos` for every pair of particles closer than
 * MAX_DIST, and returns the number of floats written.
 */
export function buildLinks(pos, count, grid, linePos) {
  const limit = linePos.length - 6;
  const maxDistSq = MAX_DIST * MAX_DIST;
  const { cellOf, start, fill, order } = grid;
  let idx = 0;

  // Bucket every particle by cell: start[c]..start[c+1] indexes into order.
  start.fill(0);
  for (let i = 0; i < count; i++) {
    const c =
      (cellAxis(pos[i * 3 + 2], 2) * DIMS[1] + cellAxis(pos[i * 3 + 1], 1)) * DIMS[0] +
      cellAxis(pos[i * 3], 0);
    cellOf[i] = c;
    start[c + 1]++;
  }
  for (let c = 0; c < CELLS; c++) start[c + 1] += start[c];
  fill.set(start.subarray(0, CELLS));
  for (let i = 0; i < count; i++) order[fill[cellOf[i]]++] = i;

  outer: for (let i = 0; i < count; i++) {
    const xi = pos[i * 3];
    const yi = pos[i * 3 + 1];
    const zi = pos[i * 3 + 2];
    const c = cellOf[i];
    const cx = c % DIMS[0];
    const cy = Math.floor(c / DIMS[0]) % DIMS[1];
    const cz = Math.floor(c / (DIMS[0] * DIMS[1]));

    for (let z = Math.max(0, cz - 1); z <= Math.min(DIMS[2] - 1, cz + 1); z++) {
      for (let y = Math.max(0, cy - 1); y <= Math.min(DIMS[1] - 1, cy + 1); y++) {
        for (let x = Math.max(0, cx - 1); x <= Math.min(DIMS[0] - 1, cx + 1); x++) {
          const n = (z * DIMS[1] + y) * DIMS[0] + x;
          for (let k = start[n]; k < start[n + 1]; k++) {
            const j = order[k];
            // Each pair once, same as the i<j sweep this replaced.
            if (j <= i) continue;
            const dx = xi - pos[j * 3];
            const dy = yi - pos[j * 3 + 1];
            const dz = zi - pos[j * 3 + 2];
            if (dx * dx + dy * dy + dz * dz >= maxDistSq) continue;

            linePos[idx++] = xi;
            linePos[idx++] = yi;
            linePos[idx++] = zi;
            linePos[idx++] = pos[j * 3];
            linePos[idx++] = pos[j * 3 + 1];
            linePos[idx++] = pos[j * 3 + 2];

            if (idx > limit) break outer;
          }
        }
      }
    }
  }

  return idx;
}
