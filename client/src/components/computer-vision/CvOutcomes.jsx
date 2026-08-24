import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { outcomes } from "../../data/computerVisionData";

export default function CvOutcomes() {
  return (
    <section id="computer-vision-outcomes" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow={outcomes.eyebrow}
              title={
                <>
                  <span className="text-brand">{outcomes.titleAccent}</span> {outcomes.titleLead}
                </>
              }
            />
          </div>

          <div className="space-y-5">
            {outcomes.items.map((item, i) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="rounded-xl2 border border-line bg-surface-card p-8 transition-colors hover:border-brand/40 md:p-10"
              >
                <span className="font-display text-4xl font-semibold text-brand md:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-content md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
