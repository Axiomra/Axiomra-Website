import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import { hero } from "../../data/aiDevelopmentData";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" },
  }),
};

/** Split hero: copy left, product imagery right. */
export default function AiDevHero() {
  return (
    <section
      data-nav-tone="light"
      className="relative overflow-hidden bg-surface pb-12 pt-36 md:pb-16 md:pt-44"
    >
      {/* Two soft washes stand in for the reference's engraved line-art field. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-32 h-[42rem] w-[42rem] rounded-full bg-accent/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-40 h-[34rem] w-[34rem] rounded-full bg-brand/10 blur-[150px]"
      />

      <div className="relative z-10 mx-auto grid max-w-8xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface-card px-5 py-2 font-mono text-base uppercase tracking-[0.18em] text-accent"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-content sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            {hero.titleLead}
            <span className="mt-2 block text-brand">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="copy-justify mt-8 max-w-2xl text-xl leading-relaxed text-content-dim md:text-2xl md:leading-relaxed"
          >
            {hero.body}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-assistant px-8 py-4 text-lg font-semibold text-assistant-ink-soft transition-transform hover:scale-[1.02] focus-ring"
            >
              {hero.ctaText}
              <ArrowUpRight
                size={19}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-content-faint">
                {hero.proof.source}
              </span>
              <span className="flex items-center gap-2">
                <span className="flex" role="img" aria-label={`${hero.proof.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-gold text-gold" aria-hidden="true" />
                  ))}
                </span>
                <span className="text-base text-content-dim">{hero.proof.reviews}</span>
              </span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-xl2 border border-line shadow-card">
            <img
              src={hero.image}
              alt={hero.imageAlt}
              className="h-72 w-full object-cover sm:h-96 lg:h-[30rem]"
            />
          </div>

          {/* Floating stack chips echo the reference's framework badges. */}
          <div className="absolute -left-4 -top-6 hidden rounded-xl2 border border-line bg-surface-card px-4 py-3 shadow-card sm:block">
            <span className="font-mono text-sm font-semibold text-brand">LangChain</span>
          </div>
          <div className="absolute -bottom-6 -right-4 hidden rounded-xl2 border border-line bg-surface-card px-4 py-3 shadow-card sm:block">
            <span className="font-mono text-sm font-semibold text-accent">PyTorch</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
