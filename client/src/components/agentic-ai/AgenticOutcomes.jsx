import { motion } from "framer-motion";
import { outcomes } from "../../data/agenticAiData";

/** The payoff band, six numbers, on light. */
export default function AgenticOutcomes() {
  return (
    <section id="agentic-ai-outcomes" className="relative overflow-hidden bg-surface-subtle py-20 md:py-28">
      {/* Photo is decorative here, the numbers carry the section. */}
      <img
        src={outcomes.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.07]"
      />

      <div className="relative mx-auto max-w-8xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-content-faint md:text-base">
            {outcomes.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.14] text-content sm:text-4xl md:text-5xl">
            <span className="text-brand">{outcomes.titleAccent}</span> {outcomes.titleLead}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {outcomes.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              className="group bg-surface-card p-8 transition-colors hover:bg-surface-inset md:p-10"
            >
              <span className="block font-display text-4xl font-semibold leading-none text-gradient md:text-5xl">
                {item.value}
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-content md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
