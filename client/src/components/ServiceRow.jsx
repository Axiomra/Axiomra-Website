import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowUpRight } from "lucide-react";

/**
 * One alternating image/copy row for the Services listing page.
 * Reused for every service category — pass in content via props so
 * nothing here is hard-coded per-service.
 */
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
  ctaText = "Explore service details",
  zebra = true,
}) {
  const imageFirst = index % 2 === 1;
  const bg = zebra && index % 2 === 1 ? "bg-mist-50" : "bg-page";

  const Copy = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      {eyebrow && (
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display font-semibold text-2xl md:text-3xl text-periwinkle mb-4">{title}</h2>
      <p className="text-sm md:text-base text-ink-dim leading-relaxed mb-6 max-w-xl">{description}</p>

      <Link
        to={ctaHref}
        className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-mist hover:border-periwinkle/50 hover:text-periwinkle transition-colors focus-ring mb-7"
      >
        {ctaText} <ArrowUpRight size={16} />
      </Link>

      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2.5">
        {links.map((l) => (
          <li key={l}>
            <Link
              to={ctaHref}
              className="inline-flex items-center gap-1.5 text-xs md:text-sm text-ink-dim hover:text-periwinkle transition-colors focus-ring"
            >
              <ChevronRight size={13} className="text-teal shrink-0" />
              <span>{l}</span>
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );

  const Visual = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="relative"
    >
      <div className="absolute -top-6 -right-6 w-28 h-28 bg-periwinkle/15 rounded-2xl blur-2xl" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-teal/15 rounded-full blur-2xl" aria-hidden="true" />
      <div className="relative rounded-xl2 overflow-hidden shadow-card border border-mist">
        <img src={image} alt={imageAlt} loading="lazy" className="w-full h-64 md:h-72 object-cover" />
      </div>
    </motion.div>
  );

  return (
    <section id={id} className={`${bg} py-14 md:py-16`}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 md:gap-16 items-center">
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
