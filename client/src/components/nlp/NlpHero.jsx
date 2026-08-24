import { useLayoutEffect, useRef } from "react";

import NlpVideoBackdrop from "./NlpVideoBackdrop";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { hero, heroVideo } from "../../data/nlpData";

/** Full-bleed video hero. */
export default function NlpHero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero-line]", { autoAlpha: 0, y: 34, duration: 1, stagger: 0.14 }, 0.25)
          .from("[data-hero-cue]", { autoAlpha: 0, y: -12, duration: 0.7 }, "-=0.5");

        gsap.to("[data-hero-video]", {
          yPercent: 12,
          scale: 1.06,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-heading]", {
          y: -50,
          autoAlpha: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }, root);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-nav-tone="dark"
      className="relative flex h-[100svh] min-h-[34rem] items-end overflow-hidden bg-inverse pb-16 md:pb-24"
    >
      {/* The video, uncropped and unaltered */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div data-hero-video className="absolute inset-0">
          <NlpVideoBackdrop
            src={heroVideo.src}
            poster={heroVideo.poster}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Legibility only. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-inverse/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-inverse via-inverse/75 to-transparent" />
        {/* A short horizontal wedge under the heading only. */}
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-inverse/55 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-8xl px-6">
        <h1
          data-hero-heading
          className="max-w-5xl font-display text-[2.1rem] font-light leading-[1.12] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.2rem]"
        >
          <span data-hero-line className="block">
            {hero.titleLead} <span className="text-gradient font-medium">{hero.titleAccent}</span>
          </span>
          <span data-hero-line className="mt-1 block text-white/85">
            {hero.titleTail}
          </span>
        </h1>

        <span
          data-hero-cue
          aria-hidden="true"
          className="mt-10 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/50 md:text-sm"
        >
          <span className="h-px w-12 bg-white/35" />
          Scroll
        </span>
      </div>
    </section>
  );
}
