import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import SectionHeading from "../SectionHeading";
import useGsapReveal from "../../hooks/useGsapReveal";
import { industries } from "../../data/nlpData";

/** Industry coverage as tabs over the world-map photograph. */
export default function NlpIndustries() {
  const [active, setActive] = useState(0);
  const scope = useGsapReveal();
  const item = industries.items[active];

  return (
    <section id="nlp-industries" ref={scope} className="scroll-mt-24 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-12"
          eyebrow={industries.eyebrow}
          title={
            <>
              <span className="text-brand">{industries.titleAccent}</span> {industries.titleLead}
            </>
          }
          subtitle={industries.subtitle}
        />

        <div
          data-reveal
          className="mb-10 flex flex-wrap gap-3"
          role="tablist"
          aria-label="Industries"
        >
          {industries.items.map((ind, i) => {
            const selected = i === active;
            return (
              <button
                key={ind.name}
                role="tab"
                id={`nlp-industry-tab-${i}`}
                aria-selected={selected}
                aria-controls={`nlp-industry-panel-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors focus-ring md:text-base ${
                  selected
                    ? "bg-cta-gradient text-inverse"
                    : "border border-line bg-surface-card text-content-dim hover:border-brand/50 hover:text-content"
                }`}
              >
                {ind.name}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.name}
              role="tabpanel"
              id={`nlp-industry-panel-${active}`}
              aria-labelledby={`nlp-industry-tab-${active}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
            >
              <h3 className="font-display text-2xl font-semibold text-content md:text-4xl">
                {item.name}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-content-dim md:text-lg">
                {item.body}
              </p>

              <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-brand">
                What we build here
              </p>
              <ul className="mt-4 space-y-2.5 border-t border-line pt-5">
                {item.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2.5 text-sm text-content-dim md:text-base"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70"
                      aria-hidden="true"
                    />
                    {b}
                  </li>
                ))}
              </ul>

              {item.note && (
                <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-brand/5 px-5 py-2.5 text-sm font-medium text-content md:text-base">
                  <ShieldCheck size={16} className="shrink-0 text-brand" aria-hidden="true" />
                  {item.note}
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          <div
            data-reveal
            className="relative min-h-[20rem] overflow-hidden rounded-xl2 border border-line shadow-card lg:min-h-0"
          >
            <img
              src={industries.image}
              alt={industries.imageAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/92 via-inverse/25 to-transparent"
              aria-hidden="true"
            />
            <p className="absolute inset-x-0 bottom-0 p-8 font-display text-lg font-semibold leading-snug text-white md:p-10 md:text-2xl">
              {industries.imageCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
