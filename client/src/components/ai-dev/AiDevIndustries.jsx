import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { industries } from "../../data/aiDevelopmentData";

/** Industry chips over a split copy/photo panel. */
export default function AiDevIndustries() {
  const [active, setActive] = useState(0);
  const current = industries.items[active];

  return (
    <section id="ai-industries" className="bg-surface-subtle py-12 md:py-16">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-10"
          eyebrow={industries.eyebrow}
          title={
            <>
              <span className="text-brand">{industries.titleAccent}</span> {industries.titleLead}
            </>
          }
          subtitle={industries.subtitle}
        />

        <div className="mb-12 flex justify-center">
          <Link
            to="/#industries"
            className="group inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3 text-lg font-semibold transition-colors hover:border-brand/50 hover:text-brand focus-ring"
          >
            {industries.ctaText}
            <ArrowUpRight
              size={18}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div
          role="tablist"
          aria-label="Industries"
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {industries.items.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.name}
                type="button"
                role="tab"
                id={`industry-tab-${i}`}
                aria-selected={selected}
                aria-controls="industry-panel"
                onClick={() => setActive(i)}
                className={`rounded-xl2 px-5 py-3 text-base font-semibold transition-colors focus-ring md:text-lg ${
                  selected
                    ? "bg-assistant text-assistant-ink-soft"
                    : "bg-inverse text-inverse-fg hover:opacity-90"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        <div
          id="industry-panel"
          role="tabpanel"
          aria-labelledby={`industry-tab-${active}`}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <h3 className="font-display text-4xl font-semibold text-content md:text-5xl">
                {current.title}
              </h3>
              <p className="copy-justify mt-5 text-xl leading-relaxed text-content-dim">
                {current.body}
              </p>

              <p className="mt-8 font-display text-xl font-semibold text-content">
                Build solutions for:
              </p>
              <ul className="mt-4 space-y-3">
                {current.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-lg text-content-dim">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 text-lg font-semibold transition-colors hover:border-brand/50 hover:text-brand focus-ring"
              >
                Read more
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="relative overflow-hidden rounded-xl2 border border-line shadow-card">
            <AnimatePresence mode="wait">
              <motion.img
                key={current.name}
                src={current.image}
                alt={`${current.name} teams using AI systems built by Axiomra`}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="h-72 w-full object-cover md:h-[26rem]"
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
