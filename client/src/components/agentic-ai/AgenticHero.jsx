import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import AgenticCanvas from "./AgenticCanvas";
import { hero } from "../../data/agenticAiData";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: "easeOut" },
  }),
};

export default function AgenticHero() {
  const [main, graph, chat] = hero.images;

  return (
    <section
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse pb-24 pt-32 md:pb-32 md:pt-40"
    >
      <AgenticCanvas variant="swarm" className="opacity-90" />

      {/* Washes so the headline never sits on bare geometry. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse/75 via-inverse/40 to-inverse"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 font-mono text-sm uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm md:text-base"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.15rem]"
          >
            {hero.titleLead} <span className="text-gradient">{hero.titleAccent}</span>
            <span className="mt-2 block">{hero.titleTail}</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl md:leading-relaxed"
          >
            {hero.body}
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row"
          >
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-grad-sky px-8 py-4 text-base font-semibold text-inverse transition-transform hover:scale-[1.02] focus-ring md:text-lg"
            >
              {hero.ctaText}
              <ArrowUpRight
                size={19}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
            <a
              href="#agentic-ai-capabilities"
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
            className="mt-9 flex flex-col items-center gap-2"
          >
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
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-white/45">
              {hero.proof.source}
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: "easeOut", delay: 0.35 }}
          className="mt-16 grid grid-cols-1 items-end gap-5 sm:grid-cols-3 md:mt-20 md:gap-6"
        >
          {[
            { img: main, h: "h-56 md:h-72", label: "Autonomous execution", drift: 0 },
            { img: graph, h: "h-64 md:h-[21rem]", label: "Multi-agent delegation", drift: 1.1 },
            { img: chat, h: "h-56 md:h-72", label: "Grounded conversation", drift: 2.2 },
          ].map(({ img, h, label, drift }) => (
            <motion.figure
              key={label}
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: drift }}
              className="relative overflow-hidden rounded-xl2 border border-white/12 bg-inverse-card shadow-card"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className={`w-full object-cover ${h}`}
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/85 via-inverse/10 to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 px-5 py-4 font-mono text-xs uppercase tracking-[0.16em] text-accent-vivid">
                {label}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        {/* Stat strip closes the hero instead of sitting inside the copy column. */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-14 grid grid-cols-1 divide-y divide-white/10 border-y border-white/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0"
        >
          {hero.stats.map((s) => (
            <div key={s.label} className="px-6 py-7 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-semibold text-white md:text-4xl">
                  {s.value}
                </span>
                <span className="mt-1 block text-sm text-white/55 md:text-base">{s.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
