import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles, Star } from "lucide-react";
import GenAiCanvas from "./GenAiCanvas";
import { hero } from "../../data/generativeAiData";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: "easeOut" },
  }),
};

/** Deliberately a DARK hero, unlike the AI Development page's light one. */
export default function GenAiHero() {
  const [main, chat, chip] = hero.images;

  return (
    <section
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse pb-20 pt-32 md:pb-28 md:pt-40"
    >
      <GenAiCanvas variant="latent" className="opacity-[0.85]" />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse/80 via-inverse/45 to-inverse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-48 top-10 h-[40rem] w-[40rem] rounded-full bg-brand/25 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-52 h-[34rem] w-[34rem] rounded-full bg-accent-vivid/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-8xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.06fr_1fr] lg:gap-20">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-mono text-sm uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm md:text-base"
          >
            <Sparkles size={15} className="text-accent-vivid" aria-hidden="true" />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4rem]"
          >
            {hero.titleLead} <span className="text-gradient">{hero.titleAccent}</span>
            <span className="mt-2 block">{hero.titleTail}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="copy-justify mt-8 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl md:leading-relaxed"
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
              href="#generative-ai-capabilities"
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
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6"
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                {hero.proof.source}
              </span>
              <span className="flex items-center gap-2">
                <span className="flex" role="img" aria-label={`${hero.proof.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-gold text-gold" aria-hidden="true" />
                  ))}
                </span>
                <span className="text-sm text-white/70 md:text-base">
                  {hero.proof.rating} from {hero.proof.reviews}
                </span>
              </span>
            </div>

            <dl className="flex flex-wrap gap-x-10 gap-y-4">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  {s.value ? (
                    <>
                      <dt className="sr-only">{s.label}</dt>
                      <dd>
                        <span className="block font-display text-2xl font-semibold text-white md:text-3xl">
                          {s.value}
                        </span>
                        <span className="text-sm text-white/55">{s.label}</span>
                      </dd>
                    </>
                  ) : (
                    /* No verified figure for this item, so the label carries it alone. */
                    <>
                      <dt className="sr-only">Capability</dt>
                      <dd className="font-display text-xl font-semibold text-white md:text-2xl">
                        {s.label}
                      </dd>
                    </>
                  )}
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-xl lg:mx-0"
        >
          <div className="relative overflow-hidden rounded-xl2 border border-white/15 shadow-glow">
            <img
              src={main.src}
              alt={main.alt}
              className="h-72 w-full object-cover sm:h-96 lg:h-[28rem]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/70 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-6 hidden w-52 overflow-hidden rounded-xl2 border border-white/15 bg-inverse-card shadow-card sm:block"
          >
            <img
              src={chat.src}
              alt={chat.alt}
              loading="lazy"
              className="h-32 w-full object-cover"
            />
            <p className="px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-vivid">
              Copilots &amp; agents
            </p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            className="absolute -right-6 -top-10 hidden w-48 overflow-hidden rounded-xl2 border border-white/15 bg-inverse-card shadow-card sm:block"
          >
            <img
              src={chip.src}
              alt={chip.alt}
              loading="lazy"
              className="h-28 w-full object-cover"
            />
            <p className="px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-accent-vivid">
              Fine-tuned models
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
