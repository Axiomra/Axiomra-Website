import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import NetworkBackground from "./NetworkBackground";

/**
 * Two variants, both intentionally dark in either theme:
 *  - default: the brand gradient
 *  - dark:    flat inverse surface, used to break up consecutive gradients
 *
 * `three` layers the lazily-loaded three.js particle field behind the copy.
 * It is opt-in per instance — the WebGL bundle should not load for every CTA.
 */
export default function GradientCTA({
  title,
  subtitle,
  buttonText = "Book My Strategy Call",
  dark = false,
  three = false,
}) {
  return (
    <section className={`relative overflow-hidden px-6 py-24 ${dark ? "bg-inverse" : "bg-cta-gradient"}`}>
      {three && <NetworkBackground className="opacity-80" count={70} />}
      {three && <div className="absolute inset-0 bg-gradient-to-b from-inverse/70 via-inverse/40 to-inverse/80" />}

      <div className="absolute -left-16 -top-16 h-72 w-72 animate-float rounded-full bg-white/10 blur-3xl" />
      <div
        className="absolute -bottom-16 -right-16 h-72 w-72 animate-float rounded-full bg-white/10 blur-3xl"
        style={{ animationDelay: "2s" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-none text-center"
      >
        <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-5xl lg:text-6xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-4xl text-lg leading-relaxed text-inverse-fg/85 md:text-xl">{subtitle}</p>
        )}
        <a
          href="#contact"
          className="group mt-10 inline-flex items-center gap-2 rounded-full bg-inverse-fg px-8 py-4 text-base font-medium text-inverse transition-all hover:shadow-glow focus-ring md:text-lg"
        >
          {buttonText}
          <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </motion.div>
    </section>
  );
}
