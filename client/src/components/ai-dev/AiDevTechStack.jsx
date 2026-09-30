import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TECH_PATH } from "../../routes.constants";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { techStack } from "../../data/aiDevelopmentData";

/** Category chips over a tool-chip panel, one group visible at a time. */
export default function AiDevTechStack() {
  const [active, setActive] = useState(0);
  const current = techStack.groups[active];

  return (
    <section id="ai-tech-stack" className="bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-12"
          eyebrow={techStack.eyebrow}
          title={
            <>
              <span className="text-brand">{techStack.titleAccent}</span> {techStack.titleLead}
            </>
          }
          subtitle={techStack.subtitle}
        />

        <div
          role="tablist"
          aria-label="Technology categories"
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {techStack.groups.map((g, i) => {
            const selected = i === active;
            return (
              <button
                key={g.name}
                type="button"
                role="tab"
                id={`tech-tab-${i}`}
                aria-selected={selected}
                aria-controls="tech-panel"
                onClick={() => setActive(i)}
                className={`rounded-xl2 px-5 py-3 text-base font-semibold transition-colors focus-ring md:text-lg ${
                  selected
                    ? "bg-[#2563EB] text-white"
                    : "bg-inverse text-inverse-fg hover:opacity-90"
                }`}
              >
                {g.name}
              </button>
            );
          })}
        </div>

        <div id="tech-panel" role="tabpanel" aria-labelledby={`tech-tab-${active}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <p className="mx-auto max-w-4xl text-center text-xl leading-relaxed text-content-dim">
                {current.blurb}
              </p>

              <ul className="mt-8 flex flex-wrap justify-center gap-3 rounded-xl2 border border-line bg-surface-inset p-6 md:p-8">
                {current.tools.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-line bg-surface-card px-5 py-2.5 text-base font-medium text-content-dim md:text-lg"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to={TECH_PATH}
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#2563EB] px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-ring"
          >
            {techStack.ctaText}
            <ArrowUpRight
              size={19}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
