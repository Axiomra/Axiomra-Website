import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../../lib/gsap";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { impact } from "../../../data/healthcareData";

/** One large figure counted up on first entry. The real value is in the DOM from the first render. */
function BigNumber({ value }) {
  const ref = useRef(null);

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
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        onUpdate: () => {
          ref.current.textContent = `${Math.round(counter.n)}${suffix}`;
        },
      });
    }, ref);
    return () => ctx.revert();
  }, [value]);

  return (
    <p ref={ref} className="font-display text-6xl font-semibold tracking-tight text-inverse-fg md:text-7xl">
      {value}
    </p>
  );
}

/** Three sourced statistics on capsule-clipped gradient cards. */
export default function HealthcareImpact() {
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
              className="clip-capsule lg-sheen relative flex flex-col overflow-hidden bg-gradient-to-br from-accent-vivid via-brand to-brand-strong p-9 shadow-card md:p-10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-accent-vivid/25 blur-3xl"
              />
              <span className="relative">
                <BigNumber value={stat.value} />
              </span>
              <p className="relative mt-5 text-base leading-relaxed text-inverse-fg/85 md:text-lg">
                {stat.label}
              </p>
              <p className="relative mt-auto pt-6 font-mono text-xs uppercase tracking-[0.16em] text-inverse-fg/60">
                {stat.source}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
