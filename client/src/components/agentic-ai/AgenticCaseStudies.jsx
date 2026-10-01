import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { caseStudies } from "../../data/agenticAiData";

/** Three shipped systems as full-width rows. */
export default function AgenticCaseStudies() {
  return (
    <section id="agentic-ai-work" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-16"
          eyebrow={caseStudies.eyebrow}
          title={
            <>
              {caseStudies.titleLead} <span className="text-brand">{caseStudies.titleAccent}</span>
            </>
          }
          subtitle={caseStudies.subtitle}
        />

        <div className="space-y-8 md:space-y-12">
          {caseStudies.items.map((item, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55 }}
                className="grid grid-cols-1 items-stretch gap-8 rounded-xl2 border border-line bg-surface-card p-6 shadow-card lg:grid-cols-2 lg:gap-12 lg:p-8"
              >
                <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
                  <div className="overflow-hidden rounded-xl2">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="h-64 w-full object-cover sm:h-80 lg:h-[22rem]"
                    />
                  </div>

                  <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl2 border border-line bg-line">
                    {item.results.map((r) => (
                      <div key={r.label} className="bg-surface-inset px-4 py-5 text-center">
                        <dt className="sr-only">{r.label}</dt>
                        <dd>
                          <span className="block font-display text-2xl font-semibold text-brand md:text-3xl">
                            {r.value}
                          </span>
                          <span className="mt-1 block text-xs leading-snug text-content-faint md:text-sm">
                            {r.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div
                  className={`flex flex-col justify-center ${imageFirst ? "lg:order-2" : "lg:order-1"}`}
                >
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent md:text-sm">
                    {String(i + 1).padStart(2, "0")}: {item.name}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-content md:text-3xl">
                    {item.title}
                  </h3>

                  <div className="mt-7 space-y-6">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-content-faint">
                        The problem
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-content-dim md:text-lg">
                        {item.problem}
                      </p>
                    </div>
                    <div className="border-l-2 border-brand/40 pl-5">
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-content-faint">
                        What we built
                      </p>
                      <p className="mt-2 text-base leading-relaxed text-content-dim md:text-lg">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-2 self-start font-medium text-brand transition-colors hover:text-accent focus-ring md:text-lg"
                  >
                    Talk about a system like this
                    <ArrowUpRight
                      size={18}
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
