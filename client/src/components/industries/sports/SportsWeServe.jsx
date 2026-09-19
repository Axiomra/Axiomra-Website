import { useLayoutEffect, useRef } from "react";
import SectionHeading from "../../SectionHeading";
import { Reveal } from "../../motion/Reveal";
import { gsap, ScrollTrigger, MOTION_OK } from "../../../lib/gsap";
import { sportsWeServe } from "../../../data/sportsData";

/**
 * The sports rail. Twelve sheared cards on a track that drifts sideways as the
 * section passes through the viewport; the reference scrolls this rail rather
 * than looping it, so the motion is scrubbed to scroll position instead of a
 * timer.
 *
 * The track is a real overflow-x scroller underneath, so without GSAP (reduced
 * motion, narrow viewports, a failed measure) it stays a plain swipeable rail
 * and nothing is unreachable.
 */
export default function SportsWeServe() {
  const scope = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    // Below lg the rail is narrow enough that swiping beats scrubbing.
    mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
      const ctx = gsap.context(() => {
        const track = trackRef.current;
        const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
        if (!distance()) return;

        const tween = gsap.fromTo(
          track,
          { scrollLeft: 0 },
          {
            scrollLeft: distance,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top 75%",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );

        // Cards lift in on first entry, independently of the horizontal scrub.
        gsap.from(track.querySelectorAll("[data-sport-card]"), {
          autoAlpha: 0,
          y: 34,
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: { trigger: scope.current, start: "top 78%", once: true },
        });

        return () => tween.kill();
      }, scope);

      ScrollTrigger.refresh();
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={scope}
      data-nav-tone="dark"
      className="relative overflow-hidden border-y border-inverse-fg/10 bg-inverse py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/4 h-[34rem] w-[34rem] rounded-full bg-brand/20 blur-[150px]"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          onInverse
          eyebrow={sportsWeServe.eyebrow}
          title={
            <>
              <span className="text-gradient">{sportsWeServe.titleLead}</span> {sportsWeServe.titleAccent}
            </>
          }
          subtitle={sportsWeServe.body}
        />
      </div>

      {/* Full-bleed on purpose: the track has to run past the viewport edge for
          the sideways drift to read. */}
      <Reveal>
        <div className="relative z-10 mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-inverse to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-inverse to-transparent sm:w-24" />

          <ul
            ref={trackRef}
            aria-label="Sports we build software for"
            className="scrollbar-hide flex gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8"
          >
            {sportsWeServe.items.map((item, i) => (
              <li
                key={item.label}
                data-sport-card
                className="w-[70vw] shrink-0 sm:w-[19rem] lg:w-[21rem]"
              >
                <article
                  tabIndex={0}
                  className={`group relative block h-full overflow-hidden bg-inverse-card outline-none ring-accent-vivid/60 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 focus-visible:ring-2 ${
                    i % 2 === 0 ? "clip-blade" : "clip-blade-alt"
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    width={900}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.06]"
                  />

                  {/* Two scrims: the base keeps the label legible at rest, the
                      second deepens on hover so the detail copy has ground. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse via-inverse/35 to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-inverse/75 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6 pl-9">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent-vivid">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-inverse-fg">
                      {item.label}
                    </h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-inverse-fg/75 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:max-h-40 group-hover:opacity-100 group-focus-visible:max-h-40 group-focus-visible:opacity-100">
                      {item.body}
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
