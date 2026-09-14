import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../../SectionHeading";
import { Reveal } from "../../motion/Reveal";
import { specialisms } from "../../../data/educationData";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Full-bleed photo band with the product types as pills, exactly as in the
 * reference. The selected pill opens its copy on a slate underneath, so the
 * band stays one screen tall however long the list grows.
 */
export default function EducationSpecialisms() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const items = specialisms.items;
  const active = items[index];

  const onKeyDown = (e) => {
    const last = items.length - 1;
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
  };

  return (
    <section
      data-nav-tone="dark"
      className="relative isolate overflow-hidden bg-inverse py-24 md:py-32"
    >
      <img
        src={specialisms.background}
        alt=""
        aria-hidden="true"
        width={1800}
        height={1000}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-inverse via-inverse/80 to-inverse" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent-vivid/15 blur-[140px]"
      />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          onInverse
          eyebrow={specialisms.eyebrow}
          title={
            <>
              {specialisms.titleLead}{" "}
              <span className="text-gradient">{specialisms.titleAccent}</span>
            </>
          }
        />

        <Reveal>
          <div
            role="tablist"
            aria-label="Education products we specialise in"
            onKeyDown={onKeyDown}
            className="mt-12 flex flex-wrap gap-3"
          >
            {items.map((item, i) => {
              const isActive = i === index;
              return (
                <button
                  key={item.label}
                  id={`edu-spec-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="edu-spec-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className={`rounded-full border px-6 py-3 text-sm font-medium transition-colors duration-300 focus-ring md:text-base ${
                    isActive
                      ? "border-transparent bg-cta-gradient text-inverse"
                      : "border-inverse-fg/20 bg-inverse-fg/5 text-inverse-fg/75 backdrop-blur-sm hover:border-accent-vivid/60 hover:text-inverse-fg"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal>
          <div
            id="edu-spec-panel"
            role="tabpanel"
            aria-labelledby={`edu-spec-tab-${index}`}
            className="clip-slate mt-8 max-w-4xl bg-inverse-card/80 p-8 backdrop-blur-md md:p-12"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.label}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <h3 className="font-display text-2xl font-semibold leading-snug tracking-tight text-inverse-fg md:text-3xl">
                  {active.label}
                </h3>
                <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-inverse-fg/75 md:text-lg">
                  {active.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
