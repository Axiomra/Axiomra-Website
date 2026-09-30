import { companyStats } from "../data/companyStats.js";
import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BOOKING_URL } from "../lib/booking";

const NetworkBackground = lazy(() => import("./NetworkBackground"));

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

const stats = [
  { value: `${companyStats.projects}+`, label: "Projects delivered" },
  { value: `${companyStats.experts}+`, label: "In-house experts" },
  { value: `${companyStats.industries}+`, label: "Industries served" },
  { value: `${companyStats.countries}+`, label: "Countries" },
];

export default function ServicesHero() {
  return (
    <section
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <Suspense fallback={null}>
        <NetworkBackground className="opacity-70" />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-inverse/40 to-inverse" />
      {/* Two wide colour washes so the headline sits on light instead of flat navy. */}
      <div
        className="pointer-events-none absolute -left-40 top-0 h-[38rem] w-[38rem] rounded-full bg-brand/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-40 top-32 h-[34rem] w-[34rem] rounded-full bg-accent-vivid/10 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <div className="mx-auto max-w-5xl text-center">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 backdrop-blur-sm"
          >
            AI Services and Solutions
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {/* Two deliberate lines, the old copy wrapped to three and pushed the CTA row below the fold on laptop viewports. */}
            Custom AI Services{" "}
            <span className="block text-gradient">Built Around Your Business</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl md:leading-relaxed"
          >
            From AI strategy to development and integration, Axiomra helps you turn business
            challenges into practical solutions. Explore services that simplify work, improve access
            to information, and support your growth.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-grad-sky px-9 py-4 text-base font-semibold text-inverse transition-transform hover:scale-[1.02] focus-ring"
            >
              Book a Free Consultation
              <ArrowUpRight
                size={19}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#ai-development-services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-9 py-4 text-base font-medium text-white transition-colors hover:bg-white/10 focus-ring"
            >
              Explore Our Services
            </a>
          </motion.div>
        </div>

        <motion.dl
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-white/12 bg-white/12 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-inverse/80 px-6 py-6 text-center backdrop-blur-sm">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-4xl font-semibold text-white md:text-5xl">
                  {s.value}
                </span>
                <span className="mt-2 block text-sm text-white/60 md:text-base">{s.label}</span>
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
