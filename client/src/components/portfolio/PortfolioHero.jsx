import { Suspense, lazy, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { hero } from "../../data/portfolioData";
import heroImage from "../../assets/portfolio/hero.webp";

const NetworkBackground = lazy(() => import("../NetworkBackground"));

/**
 * Portfolio hero. Centred rather than split, because the WebGL carousel behind
 * it is a ring: pushing the copy to one side would cut the ring in half.
 *
 * The intro is GSAP rather than framer-motion so the headline can be revealed
 * per line from behind a mask, which variants can't express cleanly.
 */
export default function PortfolioHero() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // fromTo rather than from: React remounts the effect in development,
        // and a half-finished from-tween leaves the hero stuck at whatever
        // opacity it had reached when the first context was reverted.
        tl.fromTo(
          "[data-hero-eyebrow]",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.6 }
        )
          // Masked line reveal: each line rides up out of its own clipped row.
          .fromTo(
            "[data-hero-line] > span",
            { yPercent: 115 },
            { yPercent: 0, duration: 1.05, stagger: 0.12 },
            "-=0.35"
          )
          .fromTo(
            "[data-hero-body]",
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            "-=0.6"
          )
          .fromTo(
            "[data-hero-cta]",
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.6 },
            "-=0.45"
          )
          .fromTo(
            "[data-hero-stat]",
            { autoAlpha: 0, y: 26 },
            { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.09 },
            "-=0.4"
          );

        return () => tl.kill();
      });

      // Reduced motion still gets the content, just without the choreography.
      mm.add(`(prefers-reduced-motion: reduce)`, () => {
        gsap.set("[data-hero-line] > span", { yPercent: 0 });
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={scope}
      data-nav-tone="dark"
      className="relative flex min-h-[94svh] items-center overflow-hidden bg-inverse pb-24 pt-32"
    >
      {/* Photographic base coat, then the WebGL ring over it. The still image
          paints immediately, so the hero is never a flat block of colour while
          the canvas chunk downloads (or on devices that never get one). */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        // React 18 does not know the camelCase fetchPriority prop and warns on
        // it; the lowercase attribute is passed through to the DOM as-is.
        // eslint-disable-next-line react/no-unknown-property
        fetchpriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
      />

      <Suspense fallback={null}>
        <NetworkBackground variant="portfolio" className="opacity-90" />
      </Suspense>

      {/* Vignette rather than a flat scrim: the ring stays visible at the edges
          of the frame where there is no text to protect. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(var(--inverse)/0.55)_55%,rgb(var(--inverse)/0.95)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-inverse to-transparent" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-brand/20 blur-[170px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-8xl px-4 text-center sm:px-6 lg:px-8">
        <p
          data-hero-eyebrow
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 font-mono text-sm uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm"
        >
          {hero.eyebrow}
        </p>

        <h1 className="mx-auto max-w-5xl font-display text-4xl font-semibold leading-[1.08] tracking-tight text-inverse-fg sm:text-5xl lg:text-[3.6rem] xl:text-[4.1rem]">
          {/* Each line is its own overflow-hidden row so the mask has an edge. */}
          <span data-hero-line className="block overflow-hidden pb-1">
            <span className="block">{hero.titleLead}</span>
          </span>
          <span data-hero-line className="block overflow-hidden pb-2">
            <span className="block text-gradient">{hero.titleAccent}</span>
          </span>
        </h1>

        <p
          data-hero-body
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-inverse-fg/70 md:text-xl"
        >
          {hero.body}
        </p>

        <div data-hero-cta className="mt-10 flex justify-center">
          <a
            href="#case-studies"
            className="group inline-flex items-center gap-3 rounded-full bg-grad-sky py-2 pl-7 pr-2 text-lg font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] focus-ring"
          >
            {hero.ctaText}
            {/* Button-in-button: the arrow gets its own well so the pill reads
                as a machined control rather than a text link with an icon. */}
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-105">
              <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
            </span>
          </a>
        </div>

        <dl className="mx-auto mt-20 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-white/10 bg-white/10 backdrop-blur-sm md:grid-cols-4">
          {hero.stats.map((s) => (
            <div key={s.label} data-hero-stat className="bg-inverse/70 px-5 py-7">
              <dt className="font-display text-3xl font-semibold text-inverse-fg md:text-4xl">
                {s.value}
              </dt>
              <dd className="mt-2 text-sm leading-snug text-inverse-fg/60">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
