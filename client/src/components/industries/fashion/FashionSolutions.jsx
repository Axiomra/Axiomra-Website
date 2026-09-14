import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { solutions } from "../../../data/fashionData";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Full-bleed photo with a tab rail of app types. The photo is pinned and
 * scrubbed a little slower than the page so it reads as a window, not a card.
 */
export default function FashionSolutions() {
  const [activeId, setActiveId] = useState(solutions.tabs[0].id);
  const scope = useRef(null);
  const reduced = useReducedMotion();
  const active = solutions.tabs.find((t) => t.id === activeId);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-bg]",
          { yPercent: -10 },
          {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.from("[data-sol-reveal]", {
          autoAlpha: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 75%", once: true },
        });
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={scope} data-nav-tone="dark" className="relative overflow-hidden bg-inverse py-20 md:py-28">
      <img
        data-bg
        src={solutions.image}
        alt=""
        aria-hidden="true"
        width={1800}
        height={1200}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.25] object-cover opacity-60"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse via-inverse/55 to-inverse" />

      <div className="relative z-10 mx-auto max-w-8xl px-4 text-center sm:px-6 lg:px-8">
        <p data-sol-reveal className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent-vivid md:text-base">
          {solutions.eyebrow}
        </p>
        <h2
          data-sol-reveal
          className="mx-auto max-w-4xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-5xl"
        >
          {solutions.titleLead} <span className="text-gradient">{solutions.titleTail}</span>
        </h2>

        <div
          data-sol-reveal
          role="tablist"
          aria-label="Fashion app types"
          className="scrollbar-hide mt-10 flex justify-start gap-2 overflow-x-auto pb-1 md:flex-wrap md:justify-center"
        >
          {solutions.tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                id={`sol-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="sol-panel"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                className={`relative whitespace-nowrap rounded-full border px-5 py-2.5 text-sm transition-colors duration-300 focus-ring md:text-base ${
                  isActive
                    ? "border-accent-vivid/60 bg-accent-vivid/15 text-inverse-fg"
                    : "border-white/15 bg-white/5 text-inverse-fg/70 hover:border-white/30 hover:text-inverse-fg"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id="sol-panel"
          role="tabpanel"
          aria-labelledby={`sol-tab-${active.id}`}
          data-sol-reveal
          className="mx-auto mt-6 max-w-3xl rounded-[2rem] border border-inverse-fg/12 bg-inverse-fg/5 p-2 backdrop-blur-sm"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="rounded-[calc(2rem-0.5rem)] bg-inverse-card/80 p-7 text-left md:p-9"
            >
              <h3 className="font-display text-2xl font-semibold leading-[1.15] tracking-tight text-inverse-fg md:text-3xl">
                {active.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-inverse-fg/70 md:text-lg">{active.body}</p>
              <ul className="mt-6 space-y-2.5">
                {active.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-inverse-fg/85">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-vivid/20 text-accent-vivid">
                      <Check size={12} strokeWidth={2.5} aria-hidden="true" />
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
