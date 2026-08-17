import { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Same lazy-loaded Three.js particle network used on the homepage Hero —
// reused here instead of rebuilt, keeping the animation consistent site-wide.
const NetworkBackground = lazy(() => import("./NetworkBackground"));

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" } }),
};

export default function ServicesHero() {
  return (
    <section className="relative bg-navy overflow-hidden pt-36 pb-24">
      <Suspense fallback={null}>
        <NetworkBackground className="opacity-70" />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/40 to-navy" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-white/70 text-sm font-medium mb-5">
          Our AI Services & Solutions
        </motion.p>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="font-display font-semibold text-4xl md:text-6xl text-white leading-[1.08] tracking-tight">
          Tailored AI Services For{" "}
          <span className="text-gradient">Tomorrow's Growing Businesses</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-6 text-white/70 max-w-2xl mx-auto leading-relaxed">
          Partner with Axiomra, a trusted artificial intelligence company delivering
          intelligent solutions that streamline workflows and empower businesses to
          grow with confidence.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9">
          <a href="/#contact" className="group inline-flex items-center gap-2 border border-white/25 text-white font-medium px-7 py-3.5 rounded-full hover:bg-white/10 transition-all focus-ring">
            Request A Free Consultation
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
