import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "../lib/gsap";

/** Scroll-triggered reveals for a whole section, in one hook. */
export default function useGsapReveal({ y = 34, duration = 0.75, stagger = 0.1 } = {}) {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        // Ungrouped elements: one tween each, triggered by the element itself.
        gsap.utils.toArray("[data-reveal]:not([data-reveal-group])").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y,
            duration,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        const groups = new Map();
        gsap.utils.toArray("[data-reveal-group]").forEach((el) => {
          const name = el.dataset.revealGroup;
          if (!groups.has(name)) groups.set(name, []);
          groups.get(name).push(el);
        });

        groups.forEach((els) => {
          gsap.from(els, {
            autoAlpha: 0,
            y,
            duration,
            ease: "power3.out",
            stagger,
            scrollTrigger: { trigger: els[0], start: "top 88%", once: true },
          });
        });
      }, scope);

      return () => ctx.revert();
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [y, duration, stagger]);

  return scope;
}
