import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { services } from "../../data/generativeAiData";

/** The seven generative AI service lines. */
function ServiceBlock({ item, index }) {
  const imageFirst = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");

  const Visual = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
      className="group relative"
    >
      <div
        className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative rounded-xl2 bg-cta-gradient p-px shadow-card">
        <div className="overflow-hidden rounded-[calc(1.25rem-1px)]">
          <img
            src={item.image}
            alt={item.imageAlt}
            loading="lazy"
            className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-[24rem]"
          />
        </div>
      </div>

      <span
        className="absolute -left-3 -top-8 font-display text-7xl font-semibold tabular-nums text-brand/15 md:-left-6 md:-top-12 md:text-8xl"
        aria-hidden="true"
      >
        {number}
      </span>
    </motion.div>
  );

  const Copy = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55 }}
    >
      <h3 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-content md:text-4xl">
        {item.title}
      </h3>
      <p className="copy-justify mt-5 max-w-2xl text-lg leading-relaxed text-content-dim md:text-xl">
        {item.body}
      </p>

      <p className="mt-8 font-display text-lg font-semibold text-content md:text-xl">
        What you get:
      </p>
      <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {item.bullets.map((b) => (
          <li key={b} className="flex items-start gap-3 text-base text-content-dim md:text-lg">
            <ArrowRight size={18} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Link
        to={item.to ?? "/contact"}
        className="group mt-9 inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3.5 text-base font-semibold transition-colors hover:border-brand/50 hover:text-brand focus-ring md:text-lg"
      >
        {item.ctaText ?? "Learn more"}
        <ArrowUpRight
          size={18}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </motion.div>
  );

  return (
    <div
      id={item.id}
      className={`${index % 2 === 1 ? "bg-surface-subtle" : "bg-surface"} py-16 md:py-20`}
    >
      <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-14 px-6 md:grid-cols-2 md:gap-20">
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
    </div>
  );
}

export default function GenAiServices() {
  return (
    <section id="generative-ai-capabilities">
      <div className="bg-surface pt-20 md:pt-28">
        <div className="mx-auto max-w-8xl px-6">
          <SectionHeading
            eyebrow={services.eyebrow}
            title={
              <>
                <span className="text-brand">{services.titleAccent}</span> {services.titleLead}
              </>
            }
            subtitle={services.subtitle}
          />
        </div>
      </div>

      {services.items.map((item, i) => (
        <ServiceBlock key={item.id} item={item} index={i} />
      ))}
    </section>
  );
}
