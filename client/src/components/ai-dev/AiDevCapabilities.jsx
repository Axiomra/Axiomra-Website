import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { capabilities } from "../../data/aiDevelopmentData";

/** Vertical tab list on the left, numbered detail panel on the right. */
export default function AiDevCapabilities() {
  const [active, setActive] = useState(0);
  const current = capabilities.items[active];

  return (
    <section id="ai-capabilities" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-14"
          eyebrow={capabilities.eyebrow}
          title={
            <>
              <span className="text-brand">{capabilities.titleAccent}</span>{" "}
              {capabilities.titleLead}
            </>
          }
          subtitle={capabilities.subtitle}
        />

        <div className="grid grid-cols-1 gap-10 rounded-xl2 border border-line bg-surface-card p-6 shadow-card md:p-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-16">
          <div
            role="tablist"
            aria-label="AI capabilities"
            aria-orientation="vertical"
            className="flex flex-col gap-2"
          >
            {capabilities.items.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  id={`capability-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="capability-panel"
                  onClick={() => setActive(i)}
                  className={`rounded-xl2 px-5 py-4 text-left text-lg font-semibold transition-colors focus-ring ${
                    selected
                      ? "bg-assistant text-assistant-ink-soft"
                      : "text-content-dim hover:bg-surface-inset hover:text-content"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <div
            id="capability-panel"
            role="tabpanel"
            aria-labelledby={`capability-tab-${active}`}
            className="lg:border-l lg:border-line lg:pl-16"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <span
                  className="font-display text-5xl font-semibold tabular-nums text-accent md:text-6xl"
                  aria-hidden="true"
                >
                  {String(active + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-3xl font-semibold text-content md:text-4xl">
                  {current.name}
                </h3>
                <p className="copy-justify mt-5 max-w-3xl text-xl leading-relaxed text-content-dim">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
