import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { process } from "../../data/agenticAiData";

/** Eight delivery stages on a centred timeline that fills as you scroll. */
export default function AgenticProcess() {
  const railRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="agentic-ai-process" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-content-faint md:text-base">
            {process.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.14] text-content sm:text-4xl md:text-5xl">
            <span className="text-brand">{process.titleAccent}</span> {process.titleLead}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-content-dim md:text-lg">
            {process.body}
          </p>
        </div>

        <div ref={railRef} className="relative mt-16">
          {/* Centre line: static track on desktop, left-aligned on mobile. */}
          <div
            className="absolute inset-y-0 left-[11px] w-[2px] bg-line md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              style={{ scaleY: fill }}
              className="h-full w-full origin-top bg-cta-gradient"
            />
          </div>

          <ol className="space-y-8 md:space-y-0">
            {process.steps.map((step, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45 }}
                  className="relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pb-12 md:pl-0"
                >
                  {/* Node on the line */}
                  <span
                    className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-brand bg-surface md:left-1/2 md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <span className="h-2 w-2 rounded-full bg-cta-gradient" />
                  </span>

                  <div
                    className={
                      right ? "md:col-start-2 md:pl-4" : "md:col-start-1 md:pr-4 md:text-right"
                    }
                  >
                    <span className="font-mono text-sm text-brand/70 md:text-base">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-content md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                      {step.body}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2.5 rounded-full bg-grad-sky px-7 py-4 text-base font-semibold text-[#0A1428] shadow-glow transition-transform hover:-translate-y-0.5 focus-ring md:text-lg"
          >
            {process.ctaText}
            <ArrowRight size={19} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
