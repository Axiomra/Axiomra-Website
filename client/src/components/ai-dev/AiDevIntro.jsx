import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import { intro } from "../../data/aiDevelopmentData";

/** "Stay Ahead In Tech" block, company positioning plus the capability list. */
export default function AiDevIntro() {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto grid max-w-8xl grid-cols-1 items-start gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl lg:text-[3.5rem]">
            <span className="text-brand">{intro.titleAccent}</span>{" "}
            <span className="text-content">{intro.titleLead}</span>
          </h2>

          {intro.paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              className="copy-justify mt-6 text-xl leading-relaxed text-content-dim"
            >
              {p}
            </p>
          ))}

          <h3 className="mt-10 font-display text-2xl font-semibold text-content">
            {intro.capabilitiesTitle}
          </h3>
          <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {intro.capabilities.map((c) => (
              <li key={c} className="flex items-start gap-3 text-lg text-content-dim">
                <Check size={20} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <p className="copy-justify mt-8 text-xl leading-relaxed text-content-dim">
            {intro.closing}
          </p>

          <Link
            to="/contact"
            className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-[#2563EB] px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-ring"
          >
            {intro.ctaText}
            <ArrowUpRight
              size={19}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="lg:sticky lg:top-28"
        >
          <div className="relative overflow-hidden rounded-xl2 border border-line shadow-card">
            <img
              src={intro.image}
              alt={intro.imageAlt}
              loading="lazy"
              className="h-80 w-full object-cover md:h-[30rem] lg:h-[36rem]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
