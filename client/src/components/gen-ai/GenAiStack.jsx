import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { techStack } from "../../data/generativeAiData";

/** Every stack group visible at once, next to a sticky image column. */
export default function GenAiStack() {
  return (
    <section id="generative-ai-stack" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-14"
          eyebrow={techStack.eyebrow}
          title={
            <>
              <span className="text-brand">{techStack.titleAccent}</span> {techStack.titleLead}
            </>
          }
          subtitle={techStack.subtitle}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-xl2 bg-cta-gradient p-px shadow-card">
              <div className="overflow-hidden rounded-[calc(1.25rem-1px)]">
                <img
                  src={techStack.image}
                  alt={techStack.imageAlt}
                  loading="lazy"
                  className="h-72 w-full object-cover sm:h-96 lg:h-[30rem]"
                />
              </div>
            </div>
            <p className="mt-6 text-base leading-relaxed text-content-dim md:text-lg">
              Model choice is a cost decision as much as a quality one. We benchmark on your data
              first, then pick the smallest model that clears the bar.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {techStack.groups.map((group, i) => (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                className="group rounded-xl2 border border-line bg-surface-card p-6 transition-colors hover:border-brand/40 md:p-7"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-content-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-content md:text-xl">
                    {group.name}
                  </h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-content-dim transition-colors group-hover:border-line-strong"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
