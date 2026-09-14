import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { Reveal } from "../motion/Reveal";
import { caseStudies, PORTFOLIO_PATH } from "../../data/portfolioData";
import { showcase } from "../../data/industriesData";

/**
 * Case studies running as a continuous marquee. The list is rendered twice so
 * the -50% loop lands on an identical frame, and the animation pauses on hover
 * or keyboard focus so a card can actually be clicked. Under
 * prefers-reduced-motion it falls back to a plain scrollable rail.
 */
export default function IndustriesPortfolio({ data = showcase }) {
  const reduced = useReducedMotion();
  const studies = reduced ? caseStudies : [...caseStudies, ...caseStudies];

  return (
    <section className="overflow-hidden border-t border-line bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={
            <>
              {data.titleLead} <span className="text-gradient">{data.titleAccent}</span>
            </>
          }
          subtitle={data.body}
        />
      </div>

      {/* Full-bleed on purpose: the track has to be wider than the viewport for
          the loop to read as continuous. */}
      <Reveal>
        <div className={`relative mt-12 ${reduced ? "scrollbar-hide overflow-x-auto" : "overflow-hidden"}`}>
          {!reduced && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-surface to-transparent sm:w-32" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-surface to-transparent sm:w-32" />
            </>
          )}

          <ul
            aria-label="Selected projects"
            // The default 30s marquee is tuned for short pills; this track is
            // roughly ten times wider, so it needs its own slower duration.
            style={reduced ? undefined : { animationDuration: "90s" }}
            className={`flex w-max gap-5 px-4 pb-4 sm:px-6 lg:px-8 ${
              reduced
                ? ""
                : "animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
            }`}
          >
            {studies.map((study, i) => (
              <li
                key={`${study.slug}-${i}`}
                aria-hidden={i >= caseStudies.length ? "true" : undefined}
                className="w-[82vw] shrink-0 sm:w-[24rem] lg:w-[26rem]"
              >
                <Link
                  to={`${PORTFOLIO_PATH}/${study.slug}`}
                  tabIndex={i >= caseStudies.length ? -1 : undefined}
                  className="group block h-full rounded-[2rem] border border-line bg-surface-subtle p-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-card focus-ring"
                >
                  <div
                    className="overflow-hidden rounded-[calc(2rem-0.5rem)]"
                    style={{ backgroundColor: study.band ?? study.accent }}
                  >
                    <img
                      src={study.image}
                      alt={`${study.name} project preview`}
                      width={study.width}
                      height={study.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 px-4 pb-4 pt-5">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                        {study.tag}
                      </span>
                      <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-content">
                        {study.name}
                      </h3>
                      <p className="mt-1 text-sm text-content-dim">{study.title}</p>
                    </div>
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-content-faint transition-all duration-300 group-hover:border-brand group-hover:text-brand">
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-8xl justify-center px-4 sm:px-6 lg:px-8">
        <Link
          to={PORTFOLIO_PATH}
          className="group inline-flex items-center gap-3 rounded-full bg-inverse py-2 pl-7 pr-2 text-base font-medium text-inverse-fg transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring"
        >
          {data.ctaText}
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-inverse-fg/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
