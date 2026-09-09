import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, MOTION_OK } from "../../lib/gsap";

/**
 * A vertical progress rail for the case-study run. Twenty-two full-bleed rows
 * is a long scroll, so this exists purely to tell the reader where they are.
 *
 * The counter is written straight to the DOM rather than through state: it
 * updates on every scroll frame and re-rendering React that often for two
 * characters would be indefensible.
 */
export default function CaseStudyProgress({ targetId, total }) {
  const barRef = useRef(null);
  const countRef = useRef(null);

  useLayoutEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return undefined;

    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const trigger = ScrollTrigger.create({
        trigger: target,
        start: "top center",
        end: "bottom bottom",
        onUpdate: (self) => {
          gsap.set(barRef.current, { scaleY: self.progress });
          const current = Math.min(total, Math.max(1, Math.ceil(self.progress * total)));
          const label = String(current).padStart(2, "0");
          if (countRef.current && countRef.current.textContent !== label) {
            countRef.current.textContent = label;
          }
        },
      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, [targetId, total]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-4 xl:flex"
    >
      <span ref={countRef} className="font-mono text-xs tracking-[0.2em] text-content-faint">
        01
      </span>
      <span className="relative h-40 w-px bg-line">
        <span
          ref={barRef}
          className="absolute inset-x-0 top-0 h-full origin-top bg-brand"
          style={{ transform: "scaleY(0)" }}
        />
      </span>
      <span className="font-mono text-xs tracking-[0.2em] text-content-faint">
        {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
