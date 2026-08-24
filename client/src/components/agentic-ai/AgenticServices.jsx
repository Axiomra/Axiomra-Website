import { motion } from "framer-motion";
import { Check } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { services } from "../../data/agenticAiData";

/** The eight service layers, as a card grid. */
export default function AgenticServices() {
  return (
    <section id="agentic-ai-capabilities" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-14"
          align="left"
          eyebrow={services.eyebrow}
          title={
            <>
              <span className="text-brand">{services.titleAccent}</span> {services.titleLead}
            </>
          }
          subtitle={services.subtitle}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.items.map((item, i) => (
            <motion.article
              key={item.id}
              id={item.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              className="group scroll-mt-28 rounded-xl2 bg-cta-gradient p-px transition-transform hover:-translate-y-1"
            >
              {/* Gradient hairline frame: the border is the gradient, the card sits one pixel inside it. */}
              <div className="flex h-full flex-col overflow-hidden rounded-[calc(1.25rem-1px)] bg-surface-card">
                <div className="relative h-48 overflow-hidden md:h-56">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute left-6 top-5 font-mono text-sm text-white/80 mix-blend-difference">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-8 pt-6 md:p-10 md:pt-7">
                  <h3 className="font-display text-2xl font-semibold leading-snug text-content md:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-content-dim md:text-lg">
                    {item.body}
                  </p>

                  <ul className="mt-7 grid flex-1 grid-cols-1 gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-content-dim md:text-base">
                        <Check size={16} className="mt-1 shrink-0 text-brand" aria-hidden="true" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
