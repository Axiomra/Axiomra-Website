import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { helpBanner } from "../../data/faqsData";

const EASE = [0.16, 1, 0.3, 1];

/** Closing band: one question, one route out of the page. */
export default function FaqsHelpBanner() {
  return (
    <section className="bg-surface-subtle pb-24 md:pb-28">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="rounded-[2rem] border border-line bg-surface p-2"
        >
          <div className="flex flex-col items-start gap-8 rounded-[calc(2rem-0.5rem)] bg-surface-card px-7 py-12 md:flex-row md:items-center md:justify-between md:px-12">
            <div>
              <h2 className="font-display text-3xl font-semibold tracking-tight text-content md:text-4xl">
                {helpBanner.title}
              </h2>
              <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-content-dim md:text-lg">
                {helpBanner.body}
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-grad-sky py-2 pl-7 pr-2 text-base font-medium text-[#0A1428] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:shadow-glow active:scale-[0.98] focus-ring"
            >
              {helpBanner.ctaText}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-105">
                <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
