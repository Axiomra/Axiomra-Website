import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import SectionHeading from "../SectionHeading";
import useGsapReveal from "../../hooks/useGsapReveal";
import { caseStudies } from "../../data/nlpData";

/** Three projects behind a picker, with the team photograph as a banner. */
export default function NlpCaseStudies() {
  const [active, setActive] = useState(0);
  const scope = useGsapReveal();
  const study = caseStudies.items[active];

  return (
    <section
      id="nlp-case-studies"
      ref={scope}
      className="scroll-mt-24 bg-surface-subtle py-20 md:py-28"
    >
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-12"
          align="left"
          eyebrow={caseStudies.eyebrow}
          title={
            <>
              {caseStudies.titleLead} <span className="text-brand">{caseStudies.titleAccent}</span>
            </>
          }
          subtitle={caseStudies.subtitle}
        />

        <div
          data-reveal
          className="relative mb-8 overflow-hidden rounded-xl2 border border-line shadow-card"
        >
          <img
            src={caseStudies.image}
            alt={caseStudies.imageAlt}
            loading="lazy"
            className="h-52 w-full object-cover md:h-72"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse/85 via-inverse/35 to-transparent"
            aria-hidden="true"
          />
          <p className="absolute inset-y-0 left-0 flex max-w-lg items-center px-8 font-display text-xl font-semibold leading-snug text-white md:px-12 md:text-3xl">
            {caseStudies.bannerCaption}
          </p>
        </div>

        <div
          data-reveal
          className="mb-8 flex flex-wrap gap-3"
          role="tablist"
          aria-label="Case studies"
        >
          {caseStudies.items.map((c, i) => {
            const selected = i === active;
            return (
              <button
                key={c.name}
                role="tab"
                id={`nlp-case-tab-${i}`}
                aria-selected={selected}
                aria-controls={`nlp-case-panel-${i}`}
                type="button"
                onClick={() => setActive(i)}
                className={`rounded-full px-6 py-3 text-sm font-medium transition-colors focus-ring md:text-base ${
                  selected
                    ? "bg-inverse text-inverse-fg"
                    : "border border-line bg-surface-card text-content-dim hover:border-brand/50 hover:text-content"
                }`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={study.name}
            role="tabpanel"
            id={`nlp-case-panel-${active}`}
            aria-labelledby={`nlp-case-tab-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl2 border border-line bg-surface-card p-8 shadow-card md:p-12"
          >
            <h3 className="font-display text-2xl font-semibold text-content md:text-4xl">
              {study.name} <span className="text-content-faint">, </span> {study.tagline}
            </h3>

            <div className="mt-9 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">Problem</p>
                <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                  {study.problem}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-brand">Solution</p>
                <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                  {study.solution}
                </p>
              </div>
            </div>

            <dl className="mt-10 grid grid-cols-1 divide-y divide-line rounded-xl2 border border-line bg-surface-inset sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {study.results.map((r) => (
                <div key={r.label} className="px-6 py-7 text-center">
                  <dt className="sr-only">{r.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-semibold text-brand md:text-4xl">
                      {r.value}
                    </span>
                    <span className="mt-1.5 block text-sm text-content-dim md:text-base">
                      {r.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
