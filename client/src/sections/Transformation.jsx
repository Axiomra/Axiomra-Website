import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import teamImg from "../assets/team.webp";
import { METRIC_IMAGE } from "../lib/media";

export default function Transformation() {
  return (
    <section className="mx-auto grid max-w-8xl items-center gap-14 px-4 py-24 sm:px-6 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl2 bg-inverse">
          <img
            src={teamImg}
            alt="Abstract rendering of a networked AI system"
            width={1600}
            height={1216}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse/70 via-transparent to-transparent" />
        </div>

        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 -right-8 hidden h-44 w-44 overflow-hidden rounded-xl2 border border-line bg-surface-card shadow-card md:block"
        >
          <img
            src={METRIC_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-inverse/75 backdrop-blur-[1px]" />
          <div className="relative flex h-full flex-col items-center justify-center gap-1 text-center">
            <TrendingUp
              size={26}
              className="text-accent-vivid"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="px-3 font-display text-xl font-semibold leading-tight text-inverse-fg">
              Measurable Outcomes
            </span>
            <span className="px-3 text-[11px] uppercase tracking-widest text-inverse-fg/70">
              Defined with you
            </span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="mb-4 text-center font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
          AI for Everyday Business
        </p>
        <h2 className="text-center font-display text-4xl font-semibold leading-[1.1] tracking-tight text-content md:text-5xl">
          <span className="text-brand">Turn Business Challenges</span> Into Working AI Solutions
        </h2>
        <p className="mt-6 text-justify text-lg leading-relaxed text-content-dim md:text-xl">
          We don&apos;t just follow trends; we set the standard for how businesses apply AI to
          create impact.
        </p>
        <p className="mt-5 text-justify text-base leading-relaxed text-content-dim md:text-lg">
          Axiomra is powered by a dedicated team of 25+ AI engineers, data scientists, and solution
          architects who have been building production-grade systems since 2021. We provide an
          elite, in-house engine that specializes in converting complex business challenges into
          scalable AI products.
        </p>
        <p className="mt-5 text-justify text-base leading-relaxed text-content-dim md:text-lg">
          We connect process automation and predictive insights to clear goals, such as reducing
          manual work, improving decision quality, and managing operating costs. Together, we define
          the measures that matter and track progress against them.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-inverse px-7 py-3.5 text-base font-medium text-inverse-fg transition-all duration-300 hover:-translate-y-0.5 hover:bg-inverse-soft hover:shadow-glow focus-ring"
        >
          Work With Our AI Team <ArrowUpRight size={17} />
        </a>
      </motion.div>
    </section>
  );
}
