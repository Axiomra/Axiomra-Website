import { useMemo } from "react";
import useInView from "../../hooks/useInView";

const W = 400;
const H = 320;
const COLS = 5;
const ROWS = 4;
const DRAW_SPREAD = 0.6; // seconds between the first and last line starting

/** Small seeded PRNG so the mesh is identical on every render and visit. */
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A jittered grid split into triangles. Lines start drawing from the corner
 * nearest the content (`origin`), so the mesh appears to grow out of the page.
 */
function buildMesh(seed, origin) {
  const rand = seeded(seed);
  const sx = W / COLS;
  const sy = H / ROWS;
  const ox = origin === "left" ? 0 : W;
  const maxDist = Math.hypot(W, H);
  const delayAt = (x, y) => (Math.hypot(x - ox, y) / maxDist) * DRAW_SPREAD;

  const points = [];
  for (let r = 0; r <= ROWS; r++) {
    for (let c = 0; c <= COLS; c++) {
      const x = c * sx + (rand() - 0.5) * sx * 0.6;
      const y = r * sy + (rand() - 0.5) * sy * 0.6;
      points.push({
        x,
        y,
        delay: delayAt(x, y) + 0.3,
        pulse: rand() < 0.4,
        pulseDur: 4 + rand() * 2,
        pulseDelay: 1.2 + rand() * 4,
      });
    }
  }

  const id = (r, c) => r * (COLS + 1) + c;
  const pairs = [];
  for (let r = 0; r <= ROWS; r++) {
    for (let c = 0; c <= COLS; c++) {
      if (c < COLS) pairs.push([id(r, c), id(r, c + 1)]);
      if (r < ROWS) pairs.push([id(r, c), id(r + 1, c)]);
      if (r < ROWS && c < COLS) {
        pairs.push((r + c) % 2 ? [id(r, c), id(r + 1, c + 1)] : [id(r, c + 1), id(r + 1, c)]);
      }
    }
  }

  const edges = pairs.map(([a, b]) => {
    const p = points[a];
    const q = points[b];
    return {
      key: `${a}-${b}`,
      d: `M${p.x.toFixed(1)} ${p.y.toFixed(1)}L${q.x.toFixed(1)} ${q.y.toFixed(1)}`,
      delay: delayAt((p.x + q.x) / 2, (p.y + q.y) / 2),
    };
  });

  return { points, edges };
}

/**
 * Low-poly network mesh for tinted panels. Place it absolutely inside a
 * `relative overflow-hidden` parent and let the parent clip it.
 */
export default function NetworkMesh({ seed = 1, origin = "right", className = "", style }) {
  const [ref, inView] = useInView({ rootMargin: "0px" });
  const { points, edges } = useMemo(() => buildMesh(seed, origin), [seed, origin]);
  // Fade out away from the content side so no straight cut shows inside the panel.
  const mask = `radial-gradient(ellipse at ${origin === "left" ? "0% 50%" : "100% 30%"}, #000 35%, transparent 78%)`;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      focusable="false"
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      data-active={inView || undefined}
      className={`cs-decor pointer-events-none absolute text-content-faint ${className}`}
      style={{ maskImage: mask, WebkitMaskImage: mask, ...style }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4">
        {edges.map((e) => (
          <path key={e.key} d={e.d} pathLength="1" className="cs-draw" style={{ "--d": `${e.delay.toFixed(2)}s` }} />
        ))}
      </g>
      <g fill="currentColor">
        {points.map((p, i) => (
          <rect
            key={i}
            x={p.x - 2.5}
            y={p.y - 2.5}
            width="5"
            height="5"
            className={p.pulse ? "cs-node cs-node-pulse" : "cs-node"}
            style={{
              "--d": `${p.delay.toFixed(2)}s`,
              "--dur": `${p.pulseDur.toFixed(2)}s`,
              "--pd": `${p.pulseDelay.toFixed(2)}s`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
