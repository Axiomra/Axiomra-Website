import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { outcomes } from "../../data/computerVisionData";

/**
 * Sticky heading on the left, self-stacking gain cards on the right, the same
 * fold the home page uses for Proven Results. Each card parks a little lower
 * than the one before it, so the stack keeps its numbered spines visible.
 */
const TOP_BASE_REM = 7; // clears the fixed navbar
const TOP_STEP_REM = 1.75;

function OutcomeCard({ item, index }) {
  const ref = useRef(null);

  // Dims and shrinks the card as the next one climbs over it, so the pile
  // reads as depth rather than a flat stack of rectangles.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.28", "end 0.1"],
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.965]);

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: `${TOP_BASE_REM + index * TOP_STEP_REM}rem` }}
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        style={{ scale }}
        className="group origin-top overflow-hidden rounded-xl2 border border-line bg-surface-card shadow-card transition-colors duration-300 hover:border-brand/40"
      >
        <motion.div style={{ opacity }} className="p-8 md:p-10">
          <span className="font-display text-4xl font-semibold text-brand md:text-5xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 font-display text-xl font-semibold text-content md:text-2xl">
            {item.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
            {item.body}
          </p>
        </motion.div>
      </motion.article>
    </div>
  );
}

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

          <div className="space-y-6">
            {outcomes.items.map((item, i) => (
              <OutcomeCard key={item.title} item={item} index={i} />
            ))}
            {/* Runway so the last card can finish its stack before the section ends. */}
            <div aria-hidden="true" className="h-[30vh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
