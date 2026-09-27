import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { technologies } from "../../../data/fashionData";
import { SERVICES_BASE_PATH } from "../../../data/servicesData";

/**
 * Sticky intro on the left, self-stacking numbered cards on the right. Same
 * fold pattern as the home page's Proven Results: each card pins under the
 * navbar a little lower than the last, and dims as the next one climbs over it.
 */
const TOP_BASE_REM = 7; // clears the fixed navbar
const TOP_STEP_REM = 1.75;

function TechCard({ item, index }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.28", "end 0.1"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);

  return (
    <div ref={ref} className="sticky" style={{ top: `${TOP_BASE_REM + index * TOP_STEP_REM}rem` }}>
      <motion.article
        style={{ scale }}
        className="group origin-top overflow-hidden rounded-[1.5rem] border border-line bg-surface-card shadow-card transition-colors duration-300 hover:border-brand"
      >
        <motion.div style={{ opacity }} className="p-7 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <h3 className="font-display text-2xl font-semibold leading-snug text-content transition-colors duration-300 group-hover:text-brand md:text-3xl">
              {item.title}
            </h3>
            <span
              className="shrink-0 font-display text-4xl font-semibold tabular-nums text-accent md:text-5xl"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <p className="copy-justify mt-5 text-base leading-relaxed text-content-dim md:text-lg">{item.body}</p>

          <div className="mt-7 flex items-baseline gap-3 border-t border-line pt-5">
            <span className="font-display text-3xl font-semibold text-brand md:text-4xl">{item.metric}</span>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-content-faint md:text-sm">
              {item.metricLabel}
            </span>
          </div>
        </motion.div>
      </motion.article>
    </div>
  );
}

export default function FashionTechnologies() {
  return (
    <section id="fashion-technologies" className="relative bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
            {technologies.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-content md:text-5xl lg:text-[3.5rem]">
            {technologies.titleLead} <span className="text-brand">{technologies.titleTail}</span>
          </h2>
          <p className="copy-justify mt-6 text-lg leading-relaxed text-content-dim md:text-xl">{technologies.body}</p>

          <Link
            to={SERVICES_BASE_PATH}
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-4 text-base font-semibold text-content transition-colors hover:border-brand/50 hover:text-brand focus-ring md:text-lg"
          >
            {technologies.ctaText}
            <ArrowUpRight
              size={19}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        <div className="space-y-6">
          {technologies.items.map((item, i) => (
            <TechCard key={item.title} item={item} index={i} />
          ))}
          {/* Runway so the last card can finish its climb before the section ends. */}
          <div aria-hidden="true" className="h-[30vh]" />
        </div>
      </div>
    </section>
  );
}
