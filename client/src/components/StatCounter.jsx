import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * One stat, counted up on first entry.
 *
 * Its own component on purpose: GSAP owns this element outright, with no Motion
 * wrapper competing for the same transform. The final value is in the DOM from
 * the first render, so no-JS and reduced-motion readers see the real number.
 */
export default function StatCounter({ value, label, onInverse = false }) {
  const numberRef = useRef(null);

  useLayoutEffect(() => {
    const match = /^(\d+)(.*)$/.exec(value);
    if (!match) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    const counter = { n: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: numberRef.current, start: "top 85%", once: true },
        onUpdate: () => {
          numberRef.current.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    }, numberRef);

    return () => ctx.revert();
  }, [value]);

  return (
    <div className="px-2 py-6 text-center">
      <p
        ref={numberRef}
        className={`font-display text-4xl font-semibold tracking-tight md:text-5xl ${
          onInverse ? "text-inverse-fg" : "text-content"
        }`}
      >
        {value}
      </p>
      <p
        className={`mt-2 text-sm uppercase tracking-[0.14em] md:text-base ${
          onInverse ? "text-inverse-fg/60" : "text-content-faint"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
