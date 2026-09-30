import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { whyUs } from "../../data/computerVisionData";

const EASE = [0.16, 1, 0.3, 1];

/** Parent holds the rhythm; children only describe their own entrance. */
const gridStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Differentiation: the stat block up top, then six numbered reasons. */
export default function CvWhyUs() {
  return (
    <section id="computer-vision-why-us" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={whyUs.eyebrow}
              title={
                <>
                  <span className="text-brand">{whyUs.titleAccent}</span> {whyUs.titleLead}
                </>
              }
              subtitle={whyUs.subtitle}
            />

            <Link
              to="/contact"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-base font-medium text-content transition-colors hover:border-brand hover:text-brand focus-ring md:text-lg"
            >
              {whyUs.ctaText}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Stat tiles flip top-to-bottom on hover: the number is the hook, the
              sentence behind it is the proof. Both faces sit in the same 3D
              box, so the tile never changes size mid-flip. */}
          <div className="grid grid-cols-2 gap-4">
            {whyUs.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                tabIndex={0}
                className="group h-40 rounded-xl2 [perspective:1200px] focus-ring md:h-44"
              >
                <div className="relative h-full w-full transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover:[transform:rotateX(-180deg)] group-focus-visible:[transform:rotateX(-180deg)]">
                  {/* Front */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl2 border border-line bg-surface-card px-6 text-center [backface-visibility:hidden]">
                    {/* A plain div, not dt/dd: the flip wrappers would sit
                        between <dl> and its items, which is invalid markup. */}
                    <div>
                      <span className="block font-display text-3xl font-semibold text-brand md:text-4xl">
                        {s.value}
                      </span>
                      <span className="mt-2 block text-sm text-content-dim md:text-base">
                        {s.label}
                      </span>
                    </div>
                  </div>

                  {/* Back, pre-rotated so it reads upright once the tile lands. */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-xl2 border border-brand bg-surface-wash px-5 text-center [backface-visibility:hidden] [transform:rotateX(180deg)]"
                  >
                    <span className="font-display text-lg font-semibold text-brand md:text-xl">
                      {s.label}
                    </span>
                    <p className="mt-2 text-xs leading-relaxed text-content-dim md:text-sm">
                      {s.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mt-20 font-display text-2xl font-semibold text-content md:text-4xl"
        >
          <span className="text-brand">6 Reasons</span> To Choose Us
        </motion.h3>

        {/* The grid owns the stagger so the six cards land as one wave rather
            than six independent viewport triggers firing at slightly different
            scroll positions. */}
        <motion.div
          variants={gridStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {whyUs.reasons.map((r, i) => (
            <motion.article
              key={r.title}
              variants={cardReveal}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="group relative flex flex-col overflow-hidden rounded-xl2 border border-line bg-surface-card p-8 transition-[border-color,box-shadow] duration-300 hover:border-brand hover:shadow-glow md:p-9"
            >
              {/* Brand wash that fades up on hover, kept behind the copy. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grad-sky/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="relative font-display text-4xl font-semibold text-brand transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:scale-110 md:text-5xl">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Rule under the number draws itself in on hover. */}
              <span
                aria-hidden="true"
                className="relative mt-4 h-px w-10 bg-line transition-[width,background-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full group-hover:bg-brand/50"
              />

              <h4 className="relative mt-5 font-display text-lg font-semibold leading-snug text-content transition-colors duration-300 group-hover:text-brand md:text-xl">
                {r.title}
              </h4>
              <p className="relative mt-3 text-base leading-relaxed text-content-dim transition-colors duration-300 group-hover:text-content md:text-lg">
                {r.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
