import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated wash behind the panel heading, in the brand triad.
 *
 * Two CSS-transformed blobs and a masked grid rather than the canvas fields
 * used on the marketing pages: this sits above a data table that re-renders on
 * every keystroke, and a requestAnimationFrame loop competing with that is
 * felt as input lag. Transforms and opacity stay on the compositor.
 */
export default function AdminBackdrop() {
  const reduced = useReducedMotion();

  const drift = (x, y, scale) =>
    reduced
      ? {}
      : {
          animate: { x: [0, x, 0], y: [0, y, 0], scale: [1, scale, 1] },
          transition: { duration: 26, repeat: Infinity, ease: "easeInOut" },
        };

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Teal, top-left. */}
      <motion.div
        {...drift(60, 30, 1.14)}
        className="absolute -left-24 -top-32 h-[26rem] w-[26rem] rounded-full opacity-[0.30] blur-[90px]"
        style={{ background: "radial-gradient(circle, #14D8C4 0%, transparent 68%)" }}
      />
      {/* Periwinkle, top-right. */}
      <motion.div
        {...drift(-70, 44, 1.1)}
        className="absolute -right-32 -top-24 h-[30rem] w-[30rem] rounded-full opacity-[0.28] blur-[100px]"
        style={{ background: "radial-gradient(circle, #788BE3 0%, transparent 68%)" }}
      />
      {/* Gold, low and small — an accent, not a third light source. */}
      <motion.div
        {...drift(40, -26, 1.16)}
        className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full opacity-[0.16] blur-[80px]"
        style={{ background: "radial-gradient(circle, #FFB020 0%, transparent 70%)" }}
      />

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
