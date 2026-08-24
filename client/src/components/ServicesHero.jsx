import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

const NetworkBackground = lazy(() => import("./NetworkBackground"));

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" } }),
};

const stats = [
  { value: "300+", label: "Projects delivered" },
  { value: "25+", label: "In-house experts" },
  { value: "20+", label: "AI service lines" },
  { value: "6-10", label: "Weeks to pilot" },
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
            <Sparkles size={15} className="text-accent-vivid" aria-hidden="true" />
            Our AI Services &amp; Solutions
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {/* Two deliberate lines, the old copy wrapped to three and pushed the CTA row below the fold on laptop viewports. */}
            Tailored AI Services For{" "}
            <span className="block text-gradient">Growing Businesses</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl md:leading-relaxed"
          >
            Partner with Axiomra, a trusted artificial intelligence company delivering
            intelligent solutions that streamline workflows and help businesses
            grow with confidence.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-cta-gradient px-9 py-4 text-base font-semibold text-inverse transition-transform hover:scale-[1.02] focus-ring"
            >
              Request A Free Consultation
              <ArrowUpRight
                size={19}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#ai-development-services"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-9 py-4 text-base font-medium text-white transition-colors hover:bg-white/10 focus-ring"
            >
              Browse all services
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
