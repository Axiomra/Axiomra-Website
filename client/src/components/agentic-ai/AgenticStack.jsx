import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { techStack } from "../../data/agenticAiData";

/** All eight stack groups at once, under a full-width image band. */
export default function AgenticStack() {
  return (
    <section id="agentic-ai-stack" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-12"
          eyebrow={techStack.eyebrow}
          title={
            <>
              <span className="text-brand">{techStack.titleAccent}</span> {techStack.titleLead}
            </>
          }
          subtitle={techStack.subtitle}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-xl2 bg-cta-gradient p-px shadow-card"
        >
          <div className="overflow-hidden rounded-[calc(1.25rem-1px)]">
            <img
              src={techStack.image}
              alt={techStack.imageAlt}
              loading="lazy"
              className="h-52 w-full object-cover md:h-64"
            />
          </div>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {techStack.groups.map((group, i) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="bg-surface-card p-7 md:p-8"
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-accent md:text-sm">
                {group.name}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {group.tools.map((tool) => (
                  <li key={tool} className="text-base text-content-dim md:text-lg">
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-content-dim md:text-lg">
          Model choice is a cost decision as much as a quality one. We benchmark the reasoning step
          on your own tasks first, then run the smallest model that clears the bar.
        </p>
      </div>
    </section>
  );
}
