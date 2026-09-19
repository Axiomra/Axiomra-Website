import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ScanEye, Star } from "lucide-react";
import VisionCanvas from "./VisionCanvas";
import { hero } from "../../data/computerVisionData";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: "easeOut" },
  }),
};

/** Dark hero, split left/right. */
export default function CvHero() {
  const [active, setActive] = useState(0);
  // Identity is stable so the canvas never re-mounts when the readout changes.
  const handleActive = useCallback((i) => setActive(i), []);

  const activePanel = hero.panels[active] ?? hero.panels[0];

  return (
    <section
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <div
        className="pointer-events-none absolute -left-40 top-10 h-[38rem] w-[38rem] rounded-full bg-brand/15 blur-[170px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.13]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,139,227,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(120,139,227,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(70% 60% at 50% 40%, #000, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, #000, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:gap-10">
          {/* Copy column */}
          <div>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={0}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-mono text-sm uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm md:text-base"
            >
              <ScanEye size={15} className="text-accent-vivid" aria-hidden="true" />
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-[3.4rem] lg:text-[3.15rem] xl:text-[3.6rem]"
            >
              <span className="text-gradient">{hero.titleLead}</span>{" "}
              <span className="text-gradient">{hero.titleAccent}</span>
              <span className="mt-2 block">{hero.titleTail}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl md:leading-relaxed"
            >
              {hero.body}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
              className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center"
            >
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-cta-gradient px-8 py-4 text-base font-semibold text-inverse transition-transform hover:scale-[1.02] focus-ring md:text-lg"
              >
                {hero.ctaText}
                <ArrowUpRight
                  size={19}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href="#computer-vision-expertise"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-medium text-white transition-colors hover:bg-white/10 focus-ring md:text-lg"
              >
                {hero.secondaryCtaText}
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
              className="mt-9 flex flex-col gap-2"
            >
              <span className="flex items-center gap-2">
                <span className="flex" aria-label={`${hero.proof.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-gold text-gold" aria-hidden="true" />
                  ))}
                </span>
                <span className="text-sm text-white/70 md:text-base">
                  {hero.proof.rating} from {hero.proof.reviews}
                </span>
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
                {hero.proof.source}
              </span>
            </motion.div>
          </div>

          {/* 3D stage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            className="relative h-[24rem] w-full sm:h-[28rem] lg:h-[34rem]"
          >
            <VisionCanvas panels={hero.panels} onActiveChange={handleActive} />

            {/* Viewport chrome: corner rules that frame the stage as a monitor feed rather than an image slot. */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-brand/45" />
              <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-brand/45" />
              <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-brand/45" />
              <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-brand/45" />
            </div>

            <div
              aria-live="polite"
              className="absolute bottom-2 left-2 flex items-center gap-3 rounded-full border border-white/15 bg-inverse/75 px-4 py-2 backdrop-blur-sm sm:bottom-4 sm:left-4"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/85 sm:text-xs">
                {activePanel.label}
              </span>
              <span className="font-mono text-[0.7rem] text-accent-vivid sm:text-xs">
                {activePanel.confidence}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stat strip closes the hero, spanning both columns. */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-14 grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:mt-16"
        >
          {hero.stats.map((s) => (
            <div key={s.label} className="px-6 py-7 text-center">
              {/* Entries without a `value` are capability labels, not statistics. */}
              {s.value ? (
                <>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-3xl font-semibold text-white md:text-4xl">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-sm text-white/55 md:text-base">{s.label}</span>
                  </dd>
                </>
              ) : (
                <>
                  <dt className="sr-only">Capability</dt>
                  <dd className="font-display text-lg font-semibold text-white md:text-xl">
                    {s.label}
                  </dd>
                </>
              )}
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
