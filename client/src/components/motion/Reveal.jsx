import { forwardRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-reveal primitives shared across the marketing pages.
 *
 * Every section was repeating the same `initial / whileInView / viewport`
 * triple with slightly different numbers, which made the page feel uneven and
 * made `prefers-reduced-motion` a per-component decision. These wrappers hold
 * the one set of timings, and collapse to plain elements when the visitor has
 * asked for reduced motion, so nothing animates in or out of view at all.
 */

const EASE = [0.22, 0.61, 0.36, 1];

const OFFSETS = {
  up: { y: 26 },
  down: { y: -26 },
  left: { x: 28 },
  right: { x: -28 },
  scale: { scale: 0.96 },
  none: {},
};

/** Motion component for a tag name, so callers can keep semantic markup. */
function tag(as) {
  return motion[as] ?? motion.div;
}

/** Fades a block up into view once, the first time it crosses the fold. */
export const Reveal = forwardRef(function Reveal(
  {
    as = "div",
    from = "up",
    delay = 0,
    duration = 0.55,
    once = true,
    margin = "-60px",
    className = "",
    children,
    ...rest
  },
  ref
) {
  const reduced = useReducedMotion();
  const Tag = tag(as);

  if (reduced) {
    return (
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, ...(OFFSETS[from] ?? OFFSETS.up) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
});

/**
 * Parent for a list whose children should arrive one after another. Pair it
 * with `StaggerItem`: the delay lives on the parent, so adding or reordering
 * cards never means renumbering per-item delays by hand.
 */
export const Stagger = forwardRef(function Stagger(
  {
    as = "div",
    step = 0.08,
    delay = 0,
    once = true,
    margin = "-60px",
    className = "",
    children,
    ...rest
  },
  ref
) {
  const reduced = useReducedMotion();
  const Tag = tag(as);

  if (reduced) {
    return (
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: step, delayChildren: delay } } }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
});

/** One child of a `Stagger`. Outside one it simply renders static. */
export const StaggerItem = forwardRef(function StaggerItem(
  { as = "div", from = "up", duration = 0.5, className = "", children, ...rest },
  ref
) {
  const reduced = useReducedMotion();
  const Tag = tag(as);

  if (reduced) {
    return (
      <Tag ref={ref} className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      variants={{
        hidden: { opacity: 0, ...(OFFSETS[from] ?? OFFSETS.up) },
        show: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration, ease: EASE } },
      }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
});

export { EASE as REVEAL_EASE };
