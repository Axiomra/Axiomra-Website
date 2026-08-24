import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import SectionHeading from "../SectionHeading";
import { outcomes } from "../../data/nlpData";

/** Sticky intro on the left, self-stacking outcome cards on the right. */
const TOP_BASE_REM = 7; // clears the fixed navbar
const TOP_STEP_REM = 1.75;

function OutcomeCard({ item, index }) {
  const ref = useRef(null);

  // Dims the card as the next one climbs over it, so the stack reads as depth instead of a flat pile.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.28", "end 0.1"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${TOP_BASE_REM + index * TOP_STEP_REM}rem` }}
    >
      <motion.article
        style={{ scale }}
        className="group origin-top overflow-hidden rounded-[1.5rem] border border-line bg-surface-card shadow-card transition-colors duration-300 hover:border-brand"
      >
        <motion.div style={{ opacity }} className="p-7 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <h3 className="font-display text-2xl font-semibold leading-snug text-content transition-colors duration-300 group-hover:text-brand md:text-3xl">
              {item.title}
            </h3>
            <span
              className="shrink-0 font-display text-4xl font-semibold tabular-nums text-accent md:text-5xl"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="copy-justify mt-5 text-base leading-relaxed text-content-dim md:text-lg">
            {item.body}
          </p>

          {item.metric && (
            <div className="mt-7 flex items-baseline gap-3 border-t border-line pt-5">
              <span className="font-display text-3xl font-semibold text-brand md:text-4xl">
                {item.metric}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-content-faint md:text-sm">
                {item.metricLabel}
              </span>
            </div>
          )}
        </motion.div>
      </motion.article>
    </div>
  );
}

export default function NlpOutcomes() {
  return (
    <section
      id="nlp-outcomes"
      className="relative scroll-mt-24 overflow-hidden bg-surface py-20 md:py-28"
    >
      <img
        src={outcomes.image}
        alt={outcomes.imageAlt}
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.06]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface via-surface/70 to-surface"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow={outcomes.eyebrow}
              title={
                <>
                  <span className="text-brand">{outcomes.titleAccent}</span>{" "}
                  {outcomes.titleLead}
                </>
              }
              subtitle={outcomes.subtitle}
            />
          </div>

          <div className="space-y-6">
            {outcomes.items.map((item, i) => (
              <OutcomeCard key={item.title} item={item} index={i} />
            ))}
            <div aria-hidden="true" className="h-[35vh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
