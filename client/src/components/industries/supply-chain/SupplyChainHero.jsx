import { Suspense, lazy, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { hero } from "../../../data/supplyChainData";

// three.js stays behind a dynamic import so it never blocks first paint.
const NetworkBackground = lazy(() => import("../../NetworkBackground"));

/**
 * Dark hero. Copy on the left, the WebGL lane network behind everything, with a
 * photographic base coat so the block is never flat colour while the canvas
 * chunk downloads. GSAP owns the entrance so it shares a clock with the rest of
 * the page's scroll work.
 */
export default function SupplyChainHero() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero]", { autoAlpha: 0, y: 30, duration: 0.9, stagger: 0.12 }, 0.1)
          .from(
            "[data-hero-img]",
            { autoAlpha: 0, scale: 1.07, duration: 1.6, ease: "power2.out" },
            0
          )
          // The lane ticks slide in under the copy like a manifest printing out.
          .from("[data-hero-tick]", { autoAlpha: 0, x: -18, duration: 0.6, stagger: 0.08 }, 0.7);
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      data-nav-tone="dark"
      className="relative flex min-h-[92svh] items-center overflow-hidden bg-inverse pb-28 pt-28"
    >
      <img
        data-hero-img
        src={hero.image}
        alt=""
        aria-hidden="true"
        width={1800}
        height={1200}
        // React 18 only forwards the lowercase spelling; camelCase lands in React 19.
        // eslint-disable-next-line react/no-unknown-property
        fetchpriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-65"
      />

      <Suspense fallback={null}>
        <NetworkBackground variant="supply-chain" className="opacity-90" />
      </Suspense>

      {/* Directional scrims: readable text on the left, photo and lanes visible on the right. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse via-inverse/82 to-inverse/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse/75 via-transparent to-inverse" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-52 top-4 h-[38rem] w-[38rem] rounded-full bg-brand/25 blur-[160px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-8xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <p
            data-hero
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 font-mono text-sm uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm"
          >
            {hero.eyebrow}
          </p>

          <h1
            data-hero
            className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-inverse-fg sm:text-5xl lg:text-[3.4rem] xl:text-[4rem]"
          >
            {hero.titleLead} <span className="text-gradient">{hero.titleAccent}</span>{" "}
            {hero.titleTail}
          </h1>

          <p
            data-hero
            className="mt-8 max-w-2xl text-lg leading-relaxed text-inverse-fg/70 md:text-xl"
          >
            {hero.body}
          </p>

          {/* The three links in the chain, stated plainly. */}
          <ul data-hero className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
            {["Plan", "Source", "Move", "Deliver"].map((step) => (
              <li
                key={step}
                data-hero-tick
                className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-inverse-fg/60"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-vivid" />
                {step}
              </li>
            ))}
          </ul>

          <div data-hero className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-grad-sky py-2 pl-7 pr-2 text-lg font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] focus-ring"
            >
              {hero.ctaText}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-105">
                <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </Link>

            <div className="flex items-center gap-3 text-inverse-fg/80">
              <span
                className="flex text-gold"
                role="img"
                aria-label={`${hero.reviews.rating} out of 5 stars on ${hero.reviews.platform}`}
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} strokeWidth={0} fill="currentColor" />
                ))}
              </span>
              <span className="text-sm">
                <span className="font-semibold text-inverse-fg">{hero.reviews.rating}.0</span> on{" "}
                {hero.reviews.platform} · {hero.reviews.count} reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
