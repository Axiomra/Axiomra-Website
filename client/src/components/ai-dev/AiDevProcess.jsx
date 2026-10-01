import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { process } from "../../data/aiDevelopmentData";

/** Sticky intro on the left, one advancing step on the right. */
export default function AiDevProcess() {
  const [step, setStep] = useState(0);
  const total = process.steps.length;
  const current = process.steps[step];

  const go = (delta) => setStep((s) => (s + delta + total) % total);

  return (
    <section id="ai-process" className="bg-surface py-12 md:py-16">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
            {process.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-content md:text-5xl lg:text-[3.5rem]">
            {process.titleLead} <span className="text-brand">{process.titleAccent}</span>{" "}
            {process.titleTail}
          </h2>
          <p className="copy-justify mt-6 text-xl leading-relaxed text-content-dim">
            {process.body}
          </p>

          <Link
            to="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#2563EB] px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-ring"
          >
            {process.ctaText}
            <ArrowUpRight
              size={19}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        <div className="flex flex-col">
          <p className="font-display text-xl font-semibold text-content">
            Step {step + 1} of {total}
          </p>

          <div className="min-h-[22rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -22 }}
                transition={{ duration: 0.3 }}
              >
                <span
                  className="mt-4 block font-display text-5xl font-semibold tabular-nums text-accent md:text-6xl"
                  aria-hidden="true"
                >
                  {String(step + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-3xl font-semibold text-content md:text-4xl">
                  {current.title}
                </h3>
                <p className="copy-justify mt-5 text-xl leading-relaxed text-content-dim">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous step"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-content-dim transition-colors hover:border-brand/50 hover:text-brand focus-ring"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next step"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-content-dim transition-colors hover:border-brand/50 hover:text-brand focus-ring"
            >
              <ArrowRight size={18} />
            </button>

            <div className="ml-4 flex gap-2" aria-hidden="true">
              {process.steps.map((s, i) => (
                <span
                  key={s.title}
                  className={`h-1.5 rounded-full transition-all ${
                    i === step ? "w-7 bg-brand" : "w-1.5 bg-line-strong"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
