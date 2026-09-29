import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowUpRight } from "lucide-react";

/** One alternating image/copy row for the Services listing page. */
export default function ServiceRow({
  id,
  index = 0,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  links = [],
  ctaHref,
  ctaText,
  zebra = true,
  compact = false,
}) {
  const imageFirst = index % 2 === 1;
  const bg = zebra && index % 2 === 1 ? "bg-surface-subtle" : "bg-surface";
  const number = String(index + 1).padStart(2, "0");

  const Copy = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      {eyebrow && (
        <p className="mb-5 font-mono text-sm uppercase tracking-widest text-accent">{eyebrow}</p>
      )}

      {!compact && (
        <div className="mb-6 flex items-center gap-4">
          <span
            className="font-mono text-base font-semibold text-brand/70 tabular-nums"
            aria-hidden="true"
          >
            {number}
          </span>
          <span className="h-px flex-1 bg-line" aria-hidden="true" />
        </div>
      )}

      <h2
        className={
          compact
            ? "mb-6 font-display text-3xl font-semibold leading-[1.15] tracking-tight text-content md:text-4xl"
            : "mb-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-brand md:text-5xl lg:text-[3.5rem]"
        }
      >
        {title}
      </h2>

      <p
        className={
          compact
            ? "copy-justify mb-9 max-w-2xl text-xl leading-relaxed text-content-dim"
            : "mb-9 max-w-2xl text-lg leading-relaxed text-content-dim md:text-xl md:leading-relaxed"
        }
      >
        {description}
      </p>

      <ul className={`flex flex-wrap gap-3 ${ctaHref && ctaText ? "mb-10" : ""}`}>
        {links.map((l) => (
          <li key={l}>
            <Link
              to={ctaHref}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-card px-4 py-2.5 text-sm font-medium text-content-dim transition-colors hover:border-brand/50 hover:text-brand md:text-base focus-ring"
            >
              <ChevronRight size={15} className="shrink-0 text-accent" aria-hidden="true" />
              <span>{l}</span>
            </Link>
          </li>
        ))}
      </ul>

      {ctaHref && ctaText && (
        <Link
          to={ctaHref}
          className="group inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-4 text-base font-semibold transition-colors hover:border-brand/50 hover:text-brand md:text-lg focus-ring"
        >
          {ctaText}
          <ArrowUpRight
            size={19}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </motion.div>
  );

  const Visual = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className={`group relative ${compact ? "h-full" : ""}`}
    >
      <div
        className="absolute -right-10 -top-10 h-44 w-44 rounded-2xl bg-brand/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className={`relative overflow-hidden rounded-xl2 border border-line shadow-card ${
          compact ? "h-full" : ""
        }`}
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className={
            compact
              ? "h-80 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-full md:min-h-[24rem]"
              : "h-80 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-[26rem] lg:h-[32rem]"
          }
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/45 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>
    </motion.div>
  );

  return (
    <section id={id} className={`${bg} ${compact ? "py-12 md:py-16" : "py-20 md:py-28"}`}>
      <div
        className={`mx-auto grid max-w-8xl grid-cols-1 gap-14 px-6 md:grid-cols-2 md:gap-20 lg:gap-24 ${
          compact ? "items-center md:items-stretch" : "items-center"
        }`}
      >
        {imageFirst ? (
          <>
            <div className="order-1">{Visual}</div>
            <div className="order-2">{Copy}</div>
          </>
        ) : (
          <>
            <div className="order-2 md:order-1">{Copy}</div>
            <div className="order-1 md:order-2">{Visual}</div>
          </>
        )}
      </div>
    </section>
  );
}
