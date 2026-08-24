import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { challenges } from "../../data/computerVisionData";

/** The problem statement, as copy on the left and the one monitoring photograph on the right. */
export default function CvChallenges() {
  return (
    <section id="computer-vision-challenges" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={challenges.eyebrow}
              title={
                <>
                  <span className="text-brand">{challenges.titleAccent}</span>{" "}
                  {challenges.titleLead}
                </>
              }
              subtitle={challenges.intro}
            />

            <p className="mt-10 font-display text-lg font-semibold text-content md:text-xl">
              {challenges.listTitle}
            </p>

            <ul className="mt-6 space-y-5">
              {challenges.problems.map((p, i) => (
                <motion.li
                  key={p.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  className="flex gap-4"
                >
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-danger/10 text-danger"
                    aria-hidden="true"
                  >
                    <X size={15} strokeWidth={3} />
                  </span>
                  <span>
                    <span className="block font-semibold text-content md:text-lg">{p.title}</span>
                    <span className="mt-1 block text-base leading-relaxed text-content-dim md:text-lg">
                      {p.body}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>

            <p className="mt-8 text-base leading-relaxed text-content-dim md:text-lg">
              {challenges.outro}
            </p>

            <Link
              to="/contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-base font-medium text-content transition-colors hover:border-brand hover:text-brand focus-ring md:text-lg"
            >
              {challenges.ctaText}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Sticky so the photo stays with the reader through a long list. */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative overflow-hidden rounded-xl2 border border-line shadow-card">
              <img
                src={challenges.image}
                alt={challenges.imageAlt}
                loading="lazy"
                className="h-72 w-full object-cover sm:h-96 lg:h-[30rem]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/85 via-inverse/15 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent-vivid">
                  Live monitoring, not after-the-fact review
                </p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-3 divide-x divide-line rounded-xl2 border border-line bg-surface-card">
              {challenges.metrics.map((m) => (
                <div key={m.label} className="px-4 py-6 text-center">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl font-semibold text-brand md:text-3xl">
                      {m.value}
                    </span>
                    <span className="mt-1 block text-xs text-content-dim md:text-sm">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
