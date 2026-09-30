import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../../lib/gsap";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { impact } from "../../../data/supplyChainData";

/**
 * One large figure counted up on first entry. The real value is in the DOM from
 * the first render, and the split keeps any currency prefix in place while the
 * digits run.
 */
function BigNumber({ value }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const match = /^(\D*)(\d+)(.*)$/.exec(value);
    if (!match) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const [, prefix, digits, suffix] = match;
    const target = Number(digits);
    const counter = { n: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        n: target,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        onUpdate: () => {
          ref.current.textContent = `${prefix}${Math.round(counter.n)}${suffix}`;
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [value]);

  return (
    <p
      ref={ref}
      className="font-display text-6xl font-semibold tracking-tight text-[#1E3A8A] md:text-7xl"
    >
      {value}
    </p>
  );
}

/** Three sourced statistics on teal waybill cards, matching the reference. */
export default function SupplyChainImpact() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          title={
            <>
              {impact.titleLead} <span className="text-gradient">{impact.titleAccent}</span>
            </>
          }
          subtitle={impact.body}
        />

        <Stagger step={0.12} className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {impact.stats.map((stat) => (
            <StaggerItem
              as="article"
              key={stat.value + stat.source}
              className="clip-waybill relative flex flex-col overflow-hidden bg-[#DBEAFE] p-8 shadow-card md:p-10"
            >
              <span className="relative">
                <BigNumber value={stat.value} />
              </span>
              <p className="relative mt-5 text-base leading-relaxed text-[#1E3A8A]/85 md:text-lg">
                {stat.label}
              </p>
              <p className="relative mt-auto pt-6 font-mono text-xs uppercase tracking-[0.16em] text-[#1E3A8A]/60">
                {stat.source}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
