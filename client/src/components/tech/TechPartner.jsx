import { useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../SectionHeading";
import { partner } from "../../data/techStackData";
import partnerImage from "../../assets/tech-partner-team.webp";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.16, 1, 0.3, 1];

/**
 * One stat, counted up on first entry.
 *
 * Its own component on purpose: GSAP owns this element outright, with no Motion
 * wrapper competing for the same transform. The final value is in the DOM from
 * the first render, so no-JS and reduced-motion readers see the real number.
 */
function StatCounter({ value, label }) {
  const numberRef = useRef(null);

  useLayoutEffect(() => {
    const match = /^(\d+)(.*)$/.exec(value);
    if (!match) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    const counter = { n: 0 };

    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: target,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: numberRef.current, start: "top 85%", once: true },
        onUpdate: () => {
          numberRef.current.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    }, numberRef);

    return () => ctx.revert();
  }, [value]);

  return (
    <div className="px-2 py-6 text-center">
      <p
        ref={numberRef}
        className="font-display text-4xl font-semibold tracking-tight text-content md:text-5xl"
      >
        {value}
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.14em] text-content-faint md:text-base">
        {label}
      </p>
    </div>
  );
}

/** Outer shell plus inner core, so cards read as machined rather than painted on. */
function PartnerCard({ card, index, feature = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.08 }}
      className={`rounded-[2rem] border border-line bg-surface-subtle p-2 ${
        feature ? "md:row-span-2" : ""
      }`}
    >
      <div
        className={`flex h-full flex-col overflow-hidden rounded-[calc(2rem-0.5rem)] bg-surface-card ${
          feature ? "justify-end p-0" : "p-7 md:p-9"
        }`}
      >
        {feature && (
          <img
            src={partnerImage}
            alt="Axiomra engineers working side by side at their monitors in the studio"
            width={1400}
            height={933}
            loading="lazy"
            decoding="async"
            className="h-56 w-full object-cover md:h-72"
          />
        )}
        <div className={feature ? "p-7 md:p-9" : "contents"}>
        <span className="font-mono text-sm text-accent">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className={`mt-5 font-display font-semibold leading-[1.15] tracking-tight text-content ${
            feature ? "text-3xl md:text-4xl" : "text-2xl"
          }`}
        >
          {card.title}
        </h3>
        <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-content-dim md:text-lg">
          {card.body}
        </p>
        </div>
      </div>
    </motion.article>
  );
}

export default function TechPartner() {
  const [feature, ...rest] = partner.cards;

  return (
    <section className="bg-surface-subtle py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow={partner.eyebrow}
          title={
            <>
              {partner.titleLead} <span className="text-gradient">{partner.titleAccent}</span>
            </>
          }
        />

        {/* Two columns, three cells: the feature card spans both rows on the
            left so the grid never leaves an empty square. */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 md:grid-rows-2">
          <PartnerCard card={feature} index={0} feature />
          {rest.map((card, i) => (
            <PartnerCard key={card.title} card={card} index={i + 1} />
          ))}
        </div>

        {/* gap-px over a line-coloured backdrop draws exact hairlines between
            cells at every breakpoint, without per-cell border exceptions. */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-line bg-line lg:grid-cols-4">
          {partner.stats.map((stat) => (
            <div key={stat.label} className="bg-surface-subtle">
              <StatCounter value={stat.value} label={stat.label} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
