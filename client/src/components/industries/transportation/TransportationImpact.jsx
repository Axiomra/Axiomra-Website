import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../../lib/gsap";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { impact } from "../../../data/transportationData";

/** One large figure counted up on first entry. The real value is in the DOM from the first render. */
function BigNumber({ value }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    // Values here carry a leading symbol ($1.5T) as well as a trailing one (78%).
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

/** Three sourced statistics on waybill-cut glass over a brand gradient. */
export default function TransportationImpact() {
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
              className="clip-waybill relative overflow-hidden bg-[#DBEAFE] p-1 shadow-card"
            >
              <div className="clip-waybill relative flex h-full flex-col p-7 md:p-9">
                <BigNumber value={stat.value} />
                <p className="mt-5 text-base leading-relaxed text-[#1E3A8A]/90 md:text-lg">
                  {stat.label}
                </p>
                <p className="mt-auto pt-6 font-mono text-xs uppercase tracking-[0.16em] text-[#1E3A8A]/65">
                  {stat.source}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
