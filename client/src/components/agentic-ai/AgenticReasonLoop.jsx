import { motion } from "framer-motion";
import { Brain, Play, Eye, RotateCw } from "lucide-react";
import AgenticCanvas from "./AgenticCanvas";
import { reactLoop } from "../../data/agenticAiData";

const STEP_ICONS = { reason: Brain, act: Play, observe: Eye, repeat: RotateCw };

/** The architecture band, the second WebGL field on the page. */
export default function AgenticReasonLoop() {
  return (
    <section
      id="agentic-ai-architecture"
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse py-20 md:py-28"
    >
      <AgenticCanvas variant="loop" className="opacity-75" />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse via-inverse/50 to-inverse"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent-vivid md:text-base">
            {reactLoop.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl">
            <span className="text-gradient">{reactLoop.titleAccent}</span> {reactLoop.titleLead}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70 md:text-xl">{reactLoop.body}</p>
        </motion.div>

        <ol className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reactLoop.steps.map((step, i) => {
            const Icon = STEP_ICONS[step.key] ?? Brain;
            return (
              <motion.li
                key={step.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="relative rounded-xl2 border border-white/12 bg-white/[0.05] p-7 backdrop-blur-sm md:p-8"
              >
                {/* Connector between cards, the loop, drawn flat. */}
                {i < reactLoop.steps.length - 1 && (
                  <span
                    className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-grad-blue/60 to-transparent lg:block"
                    aria-hidden="true"
                  />
                )}
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-accent-vivid">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-white md:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-base leading-relaxed text-white/65 md:text-lg">
                  {step.body}
                </p>
              </motion.li>
            );
          })}
        </ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-10 max-w-4xl rounded-xl2 border border-white/12 bg-white/[0.04] px-8 py-6 text-center text-base leading-relaxed text-white/75 md:text-lg"
        >
          {reactLoop.note}
        </motion.p>

        {/* Capabilities table, the enterprise-readiness answer. */}
        <div className="mt-20">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="font-display text-2xl font-semibold text-white md:text-4xl">
              {reactLoop.capabilities.title}
            </h3>
            <p className="mt-5 text-base leading-relaxed text-white/65 md:text-lg">
              {reactLoop.capabilities.subtitle}
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-xl2 border border-white/12">
            <div className="hidden grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] gap-6 border-b border-white/12 bg-white/[0.06] px-8 py-4 md:grid">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                Capability
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                What it means for you
              </span>
            </div>

            {reactLoop.capabilities.rows.map((row, i) => (
              <motion.div
                key={row.capability}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
                className="grid grid-cols-1 gap-2 border-b border-white/[0.08] px-8 py-6 transition-colors last:border-b-0 hover:bg-white/[0.04] md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] md:gap-6"
              >
                <span className="font-display text-lg font-semibold text-white md:text-xl">
                  {row.capability}
                </span>
                <span className="text-base leading-relaxed text-white/65 md:text-lg">
                  {row.meaning}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
