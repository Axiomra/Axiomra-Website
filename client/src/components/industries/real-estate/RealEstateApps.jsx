import { useLayoutEffect, useRef } from "react";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { apps } from "../../../data/realEstateData";

/**
 * Full-bleed photographic band listing the product shapes we build. The image
 * runs behind the whole section at low opacity with a dark scrim over it, and
 * the band is clipped to a skyline on both edges so it reads as a plate cut
 * into the page rather than another card.
 */
export default function RealEstateApps() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-apps-bg]",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
        gsap.from("[data-apps]", {
          autoAlpha: 0,
          y: 26,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
        });
        gsap.from("[data-pill]", {
          autoAlpha: 0,
          y: 18,
          duration: 0.55,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 72%", once: true },
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
      className="clip-keystone relative isolate overflow-hidden bg-inverse py-28 md:py-36"
    >
      <img
        data-apps-bg
        src={apps.background}
        alt={apps.alt}
        width={1800}
        height={1000}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-[115%] w-full object-cover opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-inverse via-inverse/80 to-inverse" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 -z-10 h-80 w-80 rounded-full bg-accent-vivid/25 blur-[130px]"
      />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <p data-apps className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent-vivid md:text-base">
          {apps.eyebrow}
        </p>
        <h2
          data-apps
          className="max-w-5xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-4xl lg:text-5xl"
        >
          <span className="text-gradient">{apps.titleLead}</span> {apps.titleAccent}
        </h2>
        <p data-apps className="mt-6 max-w-3xl text-base leading-relaxed text-inverse-fg/75 md:text-lg">
          {apps.body}
        </p>

        <ul className="mt-12 flex flex-wrap gap-3 md:gap-4">
          {apps.items.map((label) => (
            <li
              key={label}
              data-pill
              className="clip-plot border border-white/15 bg-white/5 px-6 py-4 text-base font-medium text-inverse-fg/85 backdrop-blur-sm transition-colors duration-500 hover:border-accent-vivid/50 hover:text-inverse-fg md:text-lg"
              style={{ "--cut": "1.15rem" }}
            >
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
