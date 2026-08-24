import { motion } from "framer-motion";
import { Headphones, LineChart, Wallet, Users, Truck, Megaphone, Workflow } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { useCases } from "../../data/agenticAiData";

const ICONS = {
  support: Headphones,
  sales: LineChart,
  finance: Wallet,
  hr: Users,
  supply: Truck,
  marketing: Megaphone,
};

/** Use cases by business function, as numbered rows. */
export default function AgenticUseCases() {
  return (
    <section id="agentic-ai-use-cases" className="bg-surface-subtle py-20 md:py-28">
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

        <div className="divide-y divide-line border-y border-line">
          {useCases.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Workflow;
            return (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.06 }}
                className="group grid grid-cols-1 gap-6 py-9 transition-colors md:grid-cols-[auto_minmax(0,1.5fr)_minmax(0,1fr)] md:gap-10 md:py-11"
              >
                <div className="flex items-start gap-5">
                  <span className="font-mono text-sm text-brand/70 md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl2 border border-line bg-surface-card text-brand transition-colors group-hover:border-brand/40 group-hover:text-accent">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold text-content md:text-2xl">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                    {item.body}
                  </p>
                </div>

                <ul className="flex flex-col justify-center gap-2.5">
                  {item.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-content-dim md:text-base"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cta-gradient"
                        aria-hidden="true"
                      />
                      {b}
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
