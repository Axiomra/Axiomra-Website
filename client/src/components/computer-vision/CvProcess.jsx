import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { process } from "../../data/computerVisionData";

/**
 * The eight delivery stages, as a stepper. The intro sits in a two-column
 * header band, then the step card runs the full container width so the longer
 * stage copy reads as a justified block rather than a narrow column.
 */
export default function CvProcess() {
  const [step, setStep] = useState(0);
  const total = process.steps.length;
  const current = process.steps[step];

  const go = (delta) => setStep((s) => (s + delta + total) % total);

  return (
    <section id="computer-vision-process" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        {/* Header band: what the section is, and the way out of it. */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-content-faint md:text-base">
              {process.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-content sm:text-4xl md:text-5xl">
              {process.titleLead} <span className="text-brand">{process.titleAccent}</span>
              {process.titleTail ? <span className="mt-2 block">{process.titleTail}</span> : null}
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="text-justify text-base leading-relaxed text-content-dim md:text-lg">
              {process.subtitle}
            </p>

            <Link
              to="/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-base font-medium text-content transition-colors hover:border-brand hover:text-brand focus-ring md:text-lg"
            >
              {process.ctaText}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Progress rail doubles as a jump control. */}
        <div className="mt-12 flex gap-2" role="group" aria-label="Jump to a process step">
          {process.steps.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => setStep(i)}
              aria-label={`Step ${i + 1}: ${s.title}`}
              aria-current={i === step ? "step" : undefined}
              className={`h-1.5 flex-1 rounded-full transition-colors focus-ring ${
                i <= step ? "bg-brand" : "bg-line"
              }`}
            />
          ))}
        </div>

        {/* Moving side: the step itself, full width. */}
        <div className="mt-8 flex w-full flex-col rounded-xl2 border border-line bg-surface-card p-8 shadow-card md:p-12">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-content-faint md:text-base">
            Step {step + 1} of {total}
          </p>

          <div className="mt-6 min-h-[15rem] flex-1 md:min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.28 }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-4">
                  <span className="font-display text-5xl font-semibold text-brand md:text-6xl">
                    {String(step + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-semibold leading-snug text-content md:text-3xl">
                    {current.title}
                  </h3>
                </div>

                <p className="text-justify text-base leading-relaxed text-content-dim md:text-lg lg:col-span-8">
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex justify-end gap-3 border-t border-line pt-7">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous step"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-content transition-colors hover:border-brand hover:text-brand focus-ring"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next step"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-content transition-colors hover:border-brand hover:text-brand focus-ring"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
