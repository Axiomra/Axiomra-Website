import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { caseStudies } from "../../data/generativeAiData";
import { PORTFOLIO_PATH } from "../../data/portfolioData";

/** Three shipped projects as full cards, problem, solution, then the numbers. */
export default function GenAiCaseStudies() {
  return (
    <section id="generative-ai-work" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-14"
          eyebrow={caseStudies.eyebrow}
          title={
            <>
              {caseStudies.titleLead}{" "}
              <span className="text-brand">{caseStudies.titleAccent}</span>
            </>
          }
          subtitle={caseStudies.subtitle}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-xl2 border border-line bg-surface-card shadow-card"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  loading="lazy"
                  className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <span className="absolute left-5 top-5 rounded-full bg-inverse/80 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-inverse-fg backdrop-blur-sm">
                  {item.name}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7 md:p-8">
                <h3 className="font-display text-2xl font-semibold leading-tight text-content">
                  {item.title}
                </h3>

                <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-content-faint">
                  Problem
                </p>
                <p className="mt-2 text-base leading-relaxed text-content-dim">{item.problem}</p>

                <p className="mt-5 font-mono text-xs uppercase tracking-[0.18em] text-content-faint">
                  Solution
                </p>
                <p className="mt-2 text-base leading-relaxed text-content-dim">{item.solution}</p>

                <dl className="mt-auto grid grid-cols-3 gap-px overflow-hidden rounded-xl2 border border-line bg-line pt-px">
                  {item.results.map((r) => (
                    <div key={r.label} className="bg-surface-inset px-3 py-5 text-center">
                      <dt className="sr-only">{r.label}</dt>
                      <dd>
                        <span className="block font-display text-2xl font-semibold text-brand md:text-3xl">
                          {r.value}
                        </span>
                        <span className="mt-1 block text-xs leading-snug text-content-dim">
                          {r.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            to={PORTFOLIO_PATH}
            className="group inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-4 text-base font-semibold transition-colors hover:border-brand/50 hover:text-brand focus-ring md:text-lg"
          >
            Check out our full portfolio
            <ArrowUpRight
              size={19}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
