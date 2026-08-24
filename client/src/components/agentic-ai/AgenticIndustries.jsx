import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { industries } from "../../data/agenticAiData";

/** Industry coverage as a card grid with the workflow list visible. */
export default function AgenticIndustries() {
  return (
    <section id="agentic-ai-industries" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-14"
          eyebrow={industries.eyebrow}
          title={
            <>
              <span className="text-brand">{industries.titleAccent}</span> {industries.titleLead}
            </>
          }
          subtitle={industries.subtitle}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative mb-8 overflow-hidden rounded-xl2 border border-line shadow-card"
        >
          <img
            src={industries.image}
            alt={industries.imageAlt}
            loading="lazy"
            className="h-56 w-full object-cover md:h-72"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse/80 via-inverse/30 to-transparent"
            aria-hidden="true"
          />
          <p className="absolute inset-y-0 left-0 flex max-w-md items-center px-8 font-display text-xl font-semibold leading-snug text-white md:px-12 md:text-3xl">
            Same architecture, different rules, and the rules are where agent
            projects fail.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.items.map((item, i) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              className="flex flex-col rounded-xl2 border border-line bg-surface-card p-8 transition-colors hover:border-brand/40 md:p-9"
            >
              <h3 className="font-display text-xl font-semibold text-content md:text-2xl">
                {item.name}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                {item.body}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5 border-t border-line pt-6">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-content-dim md:text-base">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70"
                      aria-hidden="true"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
