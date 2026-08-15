import { motion } from "framer-motion";

/**
 * The single source of truth for section headers.
 *
 * Every section used to size its own eyebrow / h2 / lede, which meant the
 * type scale drifted section to section. Routing them all through here keeps
 * one scale: the heading spans the full container width (no max-w clamp) and
 * the supporting copy sits a step larger than body text.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className = "",
  // Escape hatch for the few headings that must hold a single line: they
  // trade the fixed type scale for a viewport-relative one.
  titleClassName = "",
  children,
  onInverse = false,
}) {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`w-full max-w-none ${centered ? "text-center" : "text-left"} ${className}`}
    >
      {eyebrow && (
        <p
          className={`mb-4 font-mono text-sm uppercase tracking-[0.2em] md:text-base ${
            onInverse ? "text-accent-vivid" : "text-accent"
          }`}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={`font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl ${
          onInverse ? "text-inverse-fg" : "text-content"
        } ${titleClassName}`}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={`mt-6 text-lg leading-relaxed md:text-xl ${
            centered ? "mx-auto max-w-4xl" : "max-w-4xl"
          } ${onInverse ? "text-inverse-fg/80" : "text-content-dim"}`}
        >
          {subtitle}
        </p>
      )}

      {children && <div className={centered ? "flex justify-center" : ""}>{children}</div>}
    </motion.div>
  );
}
