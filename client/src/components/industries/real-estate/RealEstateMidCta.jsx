import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { midCta } from "../../../data/realEstateData";

/**
 * Full-bleed call to action between the benefits grid and the stakeholder
 * cards. The band is clipped to a keystone so it tapers like an elevation
 * drawing, and its background photo is scrubbed against the scroll for depth.
 */
export default function RealEstateMidCta() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-cta-bg]",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.from("[data-reveal]", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 82%", once: true },
        });
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      data-nav-tone="dark"
      className="clip-keystone relative isolate overflow-hidden bg-inverse py-24 md:py-32"
    >
      <img
        data-cta-bg
        src={midCta.background}
        alt=""
        aria-hidden="true"
        width={1800}
        height={1200}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-[115%] w-full object-cover opacity-45"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-inverse via-inverse/85 to-inverse/40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-80 w-80 rounded-full bg-brand/35 blur-[120px]"
      />

      <div className="mx-auto flex max-w-8xl flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2
            data-reveal
            className="max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-4xl lg:text-5xl"
          >
            {midCta.title}
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-base leading-relaxed text-inverse-fg/75 md:text-lg">
            {midCta.body}
          </p>
        </div>

        <Link
          data-reveal
          to="/contact"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-cta-gradient py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
        >
          {midCta.ctaText}
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
            <ArrowUpRight size={19} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
