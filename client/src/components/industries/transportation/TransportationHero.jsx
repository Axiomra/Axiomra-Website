import { Suspense, lazy, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Route, Star } from "lucide-react";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { hero } from "../../../data/transportationData";

// three.js stays behind a dynamic import so it never blocks first paint.
const NetworkBackground = lazy(() => import("../../NetworkBackground"));

/** Capability chips, not results: nothing here is a claimed client number. */
const CAPABILITIES = ["Live tracking", "Route optimisation", "Predictive ETA", "ePOD", "Telematics", "Fleet health"];

/**
 * Dark hero. Copy on the left, a glass capability pane on the right, and the
 * WebGL traffic corridor running underneath both, with a photographic base coat
 * so the block is never flat colour while the canvas chunk downloads. The
 * bottom edge is cut to a lane chevron, which is the shape language the rest of
 * the page works in.
 */
export default function TransportationHero() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from("[data-hero]", { autoAlpha: 0, y: 30, duration: 0.9, stagger: 0.11 }, 0.1)
          .from("[data-hero-img]", { autoAlpha: 0, scale: 1.08, duration: 1.7, ease: "power2.out" }, 0)
          .from("[data-hero-chip]", { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.06 }, 0.75);
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      data-nav-tone="dark"
      className="clip-lane-bottom relative flex min-h-[92svh] items-center overflow-hidden bg-inverse pb-32 pt-28"
    >
      <img
        data-hero-img
        src={hero.image}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1280}
        // React 18 only forwards the lowercase spelling; camelCase lands in React 19.
        // eslint-disable-next-line react/no-unknown-property
        fetchpriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-[0.5]"
      />

      <Suspense fallback={null}>
        <NetworkBackground variant="transportation" className="opacity-90" />
      </Suspense>

      {/* Directional scrims: readable text on the left, the corridor still visible on the right. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse via-inverse/85 to-inverse/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse/70 via-transparent to-inverse" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-[36rem] w-[36rem] rounded-full bg-brand/25 blur-[160px]"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-8xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <p
            data-hero
            className="lg lg-dark lg-soft mb-7 inline-flex items-center gap-2 rounded-full px-5 py-2 font-mono text-sm uppercase tracking-[0.18em] text-white/80"
          >
            <Route size={15} strokeWidth={1.5} className="text-accent-vivid" aria-hidden="true" />
            {hero.eyebrow}
          </p>

          <h1
            data-hero
            className="font-display text-4xl font-semibold leading-[1.06] tracking-tight text-inverse-fg sm:text-5xl lg:text-[3.4rem] xl:text-[4rem]"
          >
            {hero.titleLead} <span className="text-gradient">{hero.titleAccent}</span> {hero.titleTail}
          </h1>

          <p data-hero className="mt-8 max-w-2xl text-lg leading-relaxed text-inverse-fg/70 md:text-xl">
            {hero.body}
          </p>

          <div data-hero className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-cta-gradient py-2 pl-7 pr-2 text-lg font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] focus-ring"
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

        {/* The rim wrapper and the pane carry the same clip, which is the only
            way a clipped glass pane keeps a real edge. */}
        <div data-hero className="hidden lg:col-span-5 lg:block">
          <div className="lg-rim lg-dark clip-waybill">
            <div className="lg lg-dark lg-soft lg-sheen clip-waybill p-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-vivid">
                What we build into the stack
              </p>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {CAPABILITIES.map((capability) => (
                  <li
                    key={capability}
                    data-hero-chip
                    className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-sm text-inverse-fg/85"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-sm leading-relaxed text-inverse-fg/65">
                One data layer under dispatch, drivers and customers, so the answer to
                &ldquo;where is it?&rdquo; comes from the same record everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
