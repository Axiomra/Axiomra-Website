import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { hero } from "../../data/techStackData";
import heroImage from "../../assets/tech-hero-stack.webp";

const NetworkBackground = lazy(() => import("../NetworkBackground"));

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: i * 0.11, ease: EASE },
  }),
};

/**
 * Asymmetric split hero. Copy is pinned to the left column and the WebGL core
 * is allowed to sit in the right half, which is why the scrim is directional
 * rather than a flat overlay.
 */
export default function TechHero() {
  return (
    <section
      data-nav-tone="dark"
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-inverse pb-20 pt-24"
    >
      {/* Photographic base coat, then the WebGL lattice over it. The still
          image paints immediately, so the hero is never a flat block of colour
          while the canvas chunk downloads (or on devices that never get one). */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
      />

      <Suspense fallback={null}>
        <NetworkBackground variant="tech" className="opacity-90" />
      </Suspense>

      {/* Directional scrims: enough contrast on the left to read text, while the
          right half stays clear so the core is actually visible. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse via-inverse/75 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse/60 via-transparent to-inverse/90" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-0 h-[38rem] w-[38rem] rounded-full bg-brand/25 blur-[160px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-8xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 font-mono text-sm uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-inverse-fg sm:text-5xl lg:text-[3.4rem] xl:text-[4rem]"
          >
            {hero.titleLead}
            <span className="mt-2 block text-gradient">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-8 max-w-xl text-lg leading-relaxed text-inverse-fg/70 md:text-xl"
          >
            {hero.body}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-grad-sky py-2 pl-7 pr-2 text-lg font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] focus-ring"
            >
              {hero.ctaText}
              {/* Button-in-button: the arrow gets its own well so the pill reads
                  as a machined control rather than a text link with an icon. */}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-105">
                <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
