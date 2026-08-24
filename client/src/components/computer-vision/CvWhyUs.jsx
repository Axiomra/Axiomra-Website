import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { whyUs } from "../../data/computerVisionData";

/** Differentiation: the stat block up top, then six numbered reasons. */
export default function CvWhyUs() {
  return (
    <section id="computer-vision-why-us" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={whyUs.eyebrow}
              title={
                <>
                  <span className="text-brand">{whyUs.titleAccent}</span> {whyUs.titleLead}
                </>
              }
              subtitle={whyUs.subtitle}
            />

            <Link
              to="/contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-base font-medium text-content transition-colors hover:border-brand hover:text-brand focus-ring md:text-lg"
            >
              {whyUs.ctaText}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <dl className="grid grid-cols-2 gap-4">
            {whyUs.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-xl2 border border-line bg-surface-card px-6 py-9 text-center"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-brand md:text-4xl">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-sm text-content-dim md:text-base">{s.label}</span>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <h3 className="mt-20 font-display text-2xl font-semibold text-content md:text-4xl">
          <span className="text-brand">6 Reasons</span> To Choose Us
        </h3>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.reasons.map((r, i) => (
            <motion.article
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.07 }}
              className="flex flex-col rounded-xl2 border border-line bg-surface-card p-8 transition-colors hover:border-brand/40 md:p-9"
            >
              <span className="font-display text-4xl font-semibold text-brand md:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-5 font-display text-lg font-semibold leading-snug text-content md:text-xl">
                {r.title}
              </h4>
              <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">{r.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
