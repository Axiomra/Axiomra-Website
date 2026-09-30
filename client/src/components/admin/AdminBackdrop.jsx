import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated wash behind the panel heading, in the brand triad, with a slow
 * smoke drift over the top.
 *
 * The smoke is three elongated, heavily blurred ellipses on long offset
 * cycles, plus one static fractal-noise layer for grain. Turbulence is only
 * rasterised once; animating an SVG filter would re-run it every frame right
 * above a data table that already re-renders on every keystroke. Everything
 * that moves here moves on transform and opacity, so it stays on the
 * compositor.
 */
export default function AdminBackdrop() {
  const reduced = useReducedMotion();

  const drift = (x, y, scale, duration = 26) =>
    reduced
      ? {}
      : {
          animate: { x: [0, x, 0], y: [0, y, 0], scale: [1, scale, 1] },
          transition: { duration, repeat: Infinity, ease: "easeInOut" },
        };

  const smoke = (x, duration, delay) =>
    reduced
      ? {}
      : {
          animate: { x: [0, x, 0], opacity: [0.35, 0.7, 0.35], scaleY: [1, 1.25, 1] },
          transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
        };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Teal, top-left. */}
      <motion.div
        {...drift(60, 30, 1.14)}
        className="absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full opacity-[0.30] blur-[90px]"
        style={{ background: "radial-gradient(circle, #60A5FA 0%, transparent 68%)" }}
      />
      {/* Periwinkle, top-right. */}
      <motion.div
        {...drift(-70, 44, 1.1)}
        className="absolute -right-32 -top-24 h-[30rem] w-[30rem] rounded-full opacity-[0.28] blur-[100px]"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 68%)" }}
      />
      {/* Violet, centre: the colour the dark theme is built around. */}
      <motion.div
        {...drift(50, -20, 1.12, 32)}
        className="absolute -bottom-40 left-1/4 h-[28rem] w-[28rem] rounded-full opacity-[0.22] blur-[110px]"
        style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
      />
      {/* Gold, low and small: an accent, not a third light source. */}
      <motion.div
        {...drift(40, -26, 1.16)}
        className="absolute -bottom-28 left-2/3 h-64 w-64 rounded-full opacity-[0.16] blur-[80px]"
        style={{ background: "radial-gradient(circle, #60A5FA 0%, transparent 70%)" }}
      />

      {/* --- Smoke --- */}
      <motion.div
        {...smoke(90, 34, 0)}
        className="absolute -left-1/4 top-[-30%] h-[22rem] w-[75%] rounded-[50%] opacity-50 blur-[70px] dark:opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(var(--grad-blue) / 0.45) 0%, transparent 70%)",
        }}
      />
      <motion.div
        {...smoke(-110, 42, 3)}
        className="absolute right-[-20%] top-[10%] h-[18rem] w-[70%] rounded-[50%] opacity-40 blur-[80px] dark:opacity-65"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(var(--grad-sky) / 0.30) 0%, transparent 72%)",
        }}
      />
      <motion.div
        {...smoke(70, 50, 7)}
        className="absolute bottom-[-45%] left-[5%] h-[20rem] w-[85%] rounded-[50%] opacity-45 blur-[75px] dark:opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at center, rgb(var(--surface-card) / 0.85) 0%, transparent 70%)",
        }}
      />

      {/* Static grain, so the smoke has texture instead of reading as a gradient. */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.16] mix-blend-overlay">
        <filter id="admin-smoke-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#admin-smoke-grain)" />
      </svg>

      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--line)/0.55) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--line)/0.55) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(70% 80% at 30% 10%, #000 5%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 80% at 30% 10%, #000 5%, transparent 75%)",
        }}
      />
    </div>
  );
}
