import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Route, Users, PenTool, TrendingUp, Layers } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { agentTypes } from "../../data/agenticAiData";

const ICONS = [Zap, Route, Users, PenTool, TrendingUp, Layers];

/** The six agent classes, as a vertical tab list. */
export default function AgenticAgentTypes() {
  const [active, setActive] = useState(0);
  const item = agentTypes.items[active];
  const ActiveIcon = ICONS[active] ?? Layers;

  return (
    <section id="agentic-ai-agent-types" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-14"
          eyebrow={agentTypes.eyebrow}
          title={
            <>
              <span className="text-brand">{agentTypes.titleAccent}</span> {agentTypes.titleLead}
            </>
          }
          subtitle={agentTypes.subtitle}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.35fr] lg:gap-12">
          {/* Rail */}
          <div role="tablist" aria-label="Types of AI agents" className="flex flex-col gap-2">
            {agentTypes.items.map((t, i) => {
              const Icon = ICONS[i] ?? Layers;
              const selected = i === active;
              return (
                <button
                  key={t.name}
                  role="tab"
                  id={`agent-type-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="agent-type-panel"
                  onClick={() => setActive(i)}
                  className={`group relative flex items-start gap-4 rounded-xl2 border px-6 py-5 text-left transition-colors focus-ring ${
                    selected
                      ? "border-brand/50 bg-surface-card"
                      : "border-line bg-transparent hover:border-line-strong hover:bg-surface-card/60"
                  }`}
                >
                  {/* Active marker rides the left edge of the rail. */}
                  {selected && (
                    <motion.span
                      layoutId="agent-type-marker"
                      className="absolute inset-y-3 left-0 w-[3px] rounded-full bg-cta-gradient"
                      aria-hidden="true"
                    />
                  )}
                  <Icon
                    size={20}
                    className={`mt-1 shrink-0 ${selected ? "text-brand" : "text-content-faint"}`}
                    aria-hidden="true"
                  />
                  <span>
                    <span
                      className={`block font-display text-lg font-semibold md:text-xl ${
                        selected ? "text-content" : "text-content-dim"
                      }`}
                    >
                      {t.name}
                    </span>
                    <span className="mt-1 block text-sm text-content-faint md:text-base">
                      {t.summary}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div
            role="tabpanel"
            id="agent-type-panel"
            aria-labelledby={`agent-type-tab-${active}`}
            className="relative overflow-hidden rounded-xl2 border border-line bg-surface-card p-8 md:p-12"
          >
            <span
              className="pointer-events-none absolute -right-4 -top-8 select-none font-display text-[9rem] font-semibold leading-none text-brand/[0.07] md:text-[12rem]"
              aria-hidden="true"
            >
              {String(active + 1).padStart(2, "0")}
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: "easeOut" }}
                className="relative"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl2 border border-brand/30 bg-surface text-brand">
                  <ActiveIcon size={24} aria-hidden="true" />
                </span>

                <h3 className="mt-6 font-display text-2xl font-semibold text-content md:text-3xl">
                  {item.name}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-content-dim md:text-lg">
                  {item.body}
                </p>

                <div className="mt-8 rounded-xl2 border border-line bg-surface-inset p-6">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-content-faint">
                    Best for
                  </p>
                  <p className="mt-2 text-base font-medium text-content md:text-lg">{item.best}</p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2.5">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-content-dim md:text-sm"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
