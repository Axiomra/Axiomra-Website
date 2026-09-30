import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { whyUs } from "../../data/agenticAiData";

/** Closing argument: four reasons, the numbers, and the human-in-the-loop panel. */
export default function AgenticWhyUs() {
  return (
    <section id="agentic-ai-why-us" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-content-faint md:text-base">
              {whyUs.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.14] text-content sm:text-4xl md:text-5xl">
              <span className="text-brand">{whyUs.titleAccent}</span> {whyUs.titleLead}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-content-dim md:text-lg">
              {whyUs.body}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55 }}
              className="mt-10 overflow-hidden rounded-xl2 shadow-card"
            >
              <img
                src={whyUs.image}
                alt={whyUs.imageAlt}
                loading="lazy"
                className="h-64 w-full object-cover sm:h-80"
              />
            </motion.div>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-line bg-line sm:grid-cols-4">
              {whyUs.stats.map((s) => (
                <div key={s.label} className="bg-surface-card px-4 py-6 text-center">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold text-brand md:text-3xl">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-content-faint md:text-sm">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              to="/contact"
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-grad-sky px-7 py-4 text-base font-semibold text-[#0A1428] shadow-glow transition-transform hover:-translate-y-0.5 focus-ring md:text-lg"
            >
              {whyUs.ctaText}
              <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div>
            <ol className="divide-y divide-line border-y border-line">
              {whyUs.reasons.map((reason, i) => (
                <motion.li
                  key={reason.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="flex gap-6 py-7 md:gap-8 md:py-8"
                >
                  <span className="shrink-0 font-mono text-sm text-brand/70 md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-content md:text-xl">
                      {reason.title}
                    </h3>
                    <p className="mt-2.5 text-base leading-relaxed text-content-dim md:text-lg">
                      {reason.body}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>

            {/* Human-in-the-loop panel */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55 }}
              className="mt-10 overflow-hidden rounded-xl2 border border-line bg-surface-card shadow-card"
            >
              <img
                src={whyUs.humanImage}
                alt={whyUs.humanImageAlt}
                loading="lazy"
                className="h-48 w-full object-cover md:h-56"
              />
              <div className="p-8 md:p-10">
                <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent md:text-sm">
                  <ShieldCheck size={15} aria-hidden="true" />
                  Autonomy with a hand on the brake
                </p>
                <ul className="mt-5 space-y-3">
                  {whyUs.humanLoopPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-base leading-relaxed text-content-dim md:text-lg"
                    >
                      <span
                        className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cta-gradient"
                        aria-hidden="true"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
