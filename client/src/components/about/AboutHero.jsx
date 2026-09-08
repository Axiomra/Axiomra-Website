import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { hero } from "../../data/aboutData";

const NetworkBackground = lazy(() => import("../NetworkBackground"));

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" } }),
};

/** Dark hero, three.js core behind the copy. */
export default function AboutHero() {
  return (
    <section
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <Suspense fallback={null}>
        <NetworkBackground variant="about" className="opacity-90" />
      </Suspense>

      {/* Scrims: enough to hold text contrast without flattening the animation underneath. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse via-inverse/75 to-inverse/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse/60 via-transparent to-inverse" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-brand/20 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <div className="max-w-4xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-mono text-sm uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm"
          >
            <Sparkles size={15} className="text-accent-vivid" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-inverse-fg sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            {hero.titleLead}
            <span className="mt-2 block text-gradient">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="copy-justify mt-8 max-w-3xl text-lg leading-relaxed text-inverse-fg/75 md:text-xl md:leading-relaxed"
          >
            {hero.body}
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-10">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-cta-gradient px-8 py-4 text-lg font-semibold text-inverse transition-transform hover:scale-[1.02] focus-ring"
            >
              {hero.ctaText}
              <ArrowUpRight
                size={19}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-white/10 bg-white/10 backdrop-blur-sm md:mt-20 md:grid-cols-4"
        >
          {hero.stats.map((s) => (
            <div key={s.label} className="bg-inverse/70 px-6 py-7">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold text-accent-vivid md:text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 block text-base text-inverse-fg/65">{s.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
