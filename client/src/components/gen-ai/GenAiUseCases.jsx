import { motion } from "framer-motion";
import { Megaphone, Headphones, LineChart, Workflow, Users, Scale } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { useCases } from "../../data/generativeAiData";

const ICONS = {
  marketing: Megaphone,
  support: Headphones,
  sales: LineChart,
  ops: Workflow,
  hr: Users,
  legal: Scale,
};

/** Use cases grouped by business function rather than by industry. */
export default function GenAiUseCases() {
  return (
    <section id="generative-ai-use-cases" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-14"
          eyebrow={useCases.eyebrow}
          title={
            <>
              <span className="text-brand">{useCases.titleAccent}</span> {useCases.titleLead}
            </>
          }
          subtitle={useCases.subtitle}
        />

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {useCases.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Workflow;
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
                className="group relative bg-surface-card p-8 transition-colors hover:bg-surface-inset md:p-10"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl2 border border-line bg-surface text-brand transition-colors group-hover:border-brand/40 group-hover:text-accent">
                  <Icon size={24} aria-hidden="true" />
                </span>

                <h3 className="mt-6 font-display text-xl font-semibold text-content md:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                  {item.body}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-content-dim md:text-base">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
