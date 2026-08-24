import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { process } from "../../data/generativeAiData";

/** Six delivery stages on a rail that fills as the reader scrolls. */
export default function GenAiProcess() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 65%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="generative-ai-process" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-content-faint">
              {process.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.15] text-content sm:text-4xl md:text-5xl">
              <span className="text-brand">{process.titleAccent}</span> {process.titleLead}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-content-dim md:text-lg">
              {process.body}
            </p>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-cta-gradient px-7 py-4 text-base font-semibold text-inverse-fg shadow-glow transition-transform hover:-translate-y-0.5 focus-ring md:text-lg"
            >
              {process.ctaText}
              <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div ref={railRef} className="relative pl-12 md:pl-16">
            <div className="absolute bottom-0 left-[13px] top-2 w-px bg-line md:left-[17px]" aria-hidden="true">
              <motion.div
                style={{ scaleY: fill, transformOrigin: "top" }}
                className="h-full w-full bg-cta-gradient"
              />
            </div>

            <ol className="space-y-12 md:space-y-14">
              {process.steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45 }}
                  className="group relative"
                >
                  <span className="absolute -left-12 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-line bg-surface font-mono text-xs text-content-dim transition-colors group-hover:border-brand group-hover:text-brand md:-left-16 md:h-9 md:w-9 md:text-sm">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-xl font-semibold leading-snug text-content md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                    {step.body}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
