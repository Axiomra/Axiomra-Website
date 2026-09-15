import { useLayoutEffect, useRef } from "react";
import { gsap } from "../../../lib/gsap";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { impact } from "../../../data/retailData";

/** One large figure counted up on first entry. The real value is in the DOM from the first render. */
function BigNumber({ value }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    // Handles both "89%" and "$14B": any prefix, the digits, any suffix.
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
    <p ref={ref} className="font-display text-6xl font-semibold tracking-tight text-inverse-fg md:text-7xl">
      {value}
    </p>
  );
}

/**
 * Three sourced statistics on a dark band. The band's lower edge is torn like a
 * receipt, so it hands off to the section below along a retail form rather than
 * a ruler, and the cards themselves are glass over the bloom behind them.
 */
export default function RetailImpact() {
  return (
    <section
      data-nav-tone="dark"
      className="on-dark clip-receipt-bottom relative overflow-hidden bg-inverse py-24 md:py-32"
    >
      <div aria-hidden="true" className="retail-bloom opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[34rem] w-[34rem] rounded-full bg-brand/20 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          onInverse
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
              className="liquid-glass clip-docket relative flex flex-col p-8 md:p-10"
            >
              <BigNumber value={stat.value} />
              <p className="mt-5 text-base leading-relaxed text-inverse-fg/85 md:text-lg">{stat.label}</p>
              <p className="mt-auto pt-6 font-mono text-xs uppercase tracking-[0.16em] text-inverse-fg/55">
                {stat.source}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
