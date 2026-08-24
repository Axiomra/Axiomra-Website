import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { stack } from "../../data/computerVisionData";

/** The tech stack, grouped by layer. */
export default function CvStack() {
  const [active, setActive] = useState(0);
  const group = stack.groups[active];

  return (
    <section
      id="computer-vision-stack"
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse py-20 md:py-28"
    >
      <img
        src={stack.image}
        alt={stack.imageAlt}
        loading="lazy"
        className="pointer-events-none absolute right-0 top-0 h-full w-full object-cover opacity-[0.14] md:w-2/3"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse via-inverse/85 to-inverse/60"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-12"
          align="left"
          onInverse
          eyebrow={stack.eyebrow}
          title={
            <>
              <span className="text-gradient">{stack.titleAccent}</span> {stack.titleLead}
            </>
          }
          subtitle={stack.subtitle}
        />

        <div className="mb-10 flex flex-wrap gap-3" role="tablist" aria-label="Technology layers">
          {stack.groups.map((g, i) => {
            const selected = i === active;
            return (
              <button
                key={g.name}
                role="tab"
                id={`cv-stack-tab-${i}`}
                aria-selected={selected}
                aria-controls={`cv-stack-panel-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors focus-ring md:text-base ${
                  selected
                    ? "bg-cta-gradient text-inverse"
                    : "border border-white/20 text-white/70 hover:border-brand/60 hover:text-white"
                }`}
              >
                {g.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.name}
            role="tabpanel"
            id={`cv-stack-panel-${active}`}
            aria-labelledby={`cv-stack-tab-${active}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
            className="rounded-xl2 border border-white/12 bg-inverse-card/70 p-8 backdrop-blur-sm md:p-12"
          >
            <p className="max-w-3xl text-base leading-relaxed text-white/70 md:text-lg">
              {group.why}
            </p>

            <ul className="mt-8 flex flex-wrap gap-3 border-t border-white/10 pt-8">
              {group.items.map((t, i) => (
                <motion.li
                  key={t}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-sm text-white/85 md:text-base"
                >
                  {t}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
