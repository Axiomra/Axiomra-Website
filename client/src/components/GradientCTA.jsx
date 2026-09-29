import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import NetworkBackground from "./NetworkBackground";
import { Link } from "react-router-dom";

export default function GradientCTA({
  title,
  subtitle,
  buttonText = "Book My Strategy Call",
  dark = false,
  three = false,
  solid = false,
  compact = false,
  image,
}) {
  // `solid` swaps the gradient for the flat logo teal. White text is under 2:1
  // on that teal, so the copy and button flip to the dark teal ink.
  const bg = dark ? "bg-inverse" : solid ? "bg-assistant" : "bg-cta-gradient";
  const heading = solid ? "text-assistant-ink-soft" : "text-inverse-fg";
  const body = solid ? "text-assistant-ink-soft/85" : "text-inverse-fg/85";
  const button = solid ? "bg-assistant-ink-soft text-white" : "bg-inverse-fg text-inverse";

  return (
    <section
      className={`relative overflow-hidden px-6 ${compact ? "py-14 md:py-16" : "py-24"} ${bg}`}
    >
      {/* Optional photographic base coat. The scrim over it is what keeps the
          headline readable, so the two always ship together. */}
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            width={1800}
            height={1200}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse/85 via-inverse/60 to-inverse/90" />
        </>
      )}

      {three && <NetworkBackground className="opacity-80" count={70} />}
      {three && (
        <div className="absolute inset-0 bg-gradient-to-b from-inverse/70 via-inverse/40 to-inverse/80" />
      )}

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
        <h2
          className={`font-display text-4xl font-semibold leading-[1.1] tracking-tight ${heading} md:text-5xl lg:text-6xl`}
        >
          {title}
        </h2>
        {subtitle && (
          <p className={`mx-auto mt-6 max-w-4xl text-lg leading-relaxed ${body} md:text-xl`}>
            {subtitle}
          </p>
        )}
        <Link
          to="/contact"
          className={`group mt-10 inline-flex items-center gap-2 rounded-full ${button} px-8 py-4 text-base font-medium transition-all hover:shadow-glow focus-ring md:text-lg`}
        >
          {buttonText}
          <ArrowUpRight
            size={20}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </motion.div>
    </section>
  );
}
