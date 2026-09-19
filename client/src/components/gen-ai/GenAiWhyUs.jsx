import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { whyUs } from "../../data/generativeAiData";

const GOVERNANCE_POINTS = [
  "Agreed hosting and data access arrangements",
  "Appropriate handling of personal and sensitive information",
  "Output controls and human review where needed",
  "Logging and retention suited to audit and privacy requirements",
  "Assessment of applicable security and regulatory requirements with your team",
];

export default function GenAiWhyUs() {
  return (
    <section id="generative-ai-why-us" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="overflow-hidden rounded-xl2 shadow-card">
              <img
                src={whyUs.image}
                alt={whyUs.imageAlt}
                loading="lazy"
                className="h-72 w-full object-cover sm:h-96 lg:h-[32rem]"
              />
            </div>
            <dl className="relative mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-line bg-line lg:absolute lg:-bottom-10 lg:right-6 lg:mt-0 lg:w-[22rem] lg:shadow-card">
              {whyUs.stats.map((s) => (
                <div key={s.label} className="bg-surface-card px-5 py-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-semibold text-brand">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-sm leading-snug text-content-dim">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <div>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-content-faint">
              {whyUs.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.15] text-content sm:text-4xl md:text-5xl">
              <span className="text-brand">{whyUs.titleAccent}</span> {whyUs.titleLead}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-content-dim md:text-lg">
              {whyUs.body}
            </p>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-cta-gradient px-7 py-4 text-base font-semibold text-inverse-fg shadow-glow transition-transform hover:-translate-y-0.5 focus-ring md:text-lg"
            >
              {whyUs.ctaText}
              <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:mt-24 lg:gap-x-16">
          {whyUs.reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
              className="group border-t border-line pt-6 transition-colors hover:border-brand"
            >
              <span className="font-mono text-xs tracking-[0.18em] text-content-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-content md:text-2xl">
                {reason.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                {reason.body}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 overflow-hidden rounded-xl2 border border-line bg-surface-card shadow-card lg:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <img
              src={whyUs.governanceImage}
              alt={whyUs.governanceImageAlt}
              loading="lazy"
              className="h-64 w-full object-cover sm:h-80 lg:h-full"
            />
            <div className="p-8 md:p-12">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl2 border border-line bg-surface text-brand">
                <ShieldCheck size={24} aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-content md:text-3xl">
                Security and Governance Built Into the Project
              </h3>
              <p className="mt-4 text-base leading-relaxed text-content-dim md:text-lg">
                We agree on data handling, hosting, and access requirements before
                implementation. Controls are selected for the data and risks involved in your
                use case.
              </p>
              <ul className="mt-7 space-y-3.5">
                {GOVERNANCE_POINTS.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-base text-content-dim">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
