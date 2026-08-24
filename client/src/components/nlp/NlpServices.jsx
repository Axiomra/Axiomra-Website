import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import NlpMotif from "./NlpMotif";
import { services } from "../../data/nlpData";

/** The six engagement types, alternating left/right. */
export default function NlpServices() {
  return (
    <section id="nlp-services" className="scroll-mt-24 bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-16"
          eyebrow={services.eyebrow}
          title={
            <>
              <span className="text-brand">{services.titleAccent}</span> {services.titleLead}
            </>
          }
          subtitle={services.subtitle}
        />

        <div className="space-y-16 md:space-y-24">
          {services.items.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <motion.article
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6 }}
                className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative overflow-hidden rounded-xl2 border border-line bg-surface-inset ${
                    flipped ? "lg:order-2" : ""
                  }`}
                >
                  <div className="aspect-[400/280]">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.imageAlt ?? item.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <NlpMotif variant={item.motif} />
                    )}
                  </div>
                  {!item.image && (
                    <span className="absolute left-5 top-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-content-faint">
                      output · {item.motif}
                    </span>
                  )}
                </div>

                <div className={flipped ? "lg:order-1" : ""}>
                  <span className="font-mono text-sm text-brand md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-3 font-display text-2xl font-semibold text-content md:text-[2rem]">
                    {item.title}
                  </h3>

                  <p className="mt-5 max-w-2xl text-base leading-relaxed text-content-dim md:text-lg">
                    {item.body}
                  </p>

                  <ul className="mt-7 grid grid-cols-1 gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
                    {item.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 text-sm text-content-dim md:text-base"
                      >
                        <ArrowRight
                          size={15}
                          className="mt-1.5 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
