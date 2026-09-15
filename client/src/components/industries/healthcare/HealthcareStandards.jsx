import { useLayoutEffect, useRef } from "react";
import SectionHeading from "../../SectionHeading";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { standards } from "../../../data/healthcareData";

/**
 * The decorative standards band, and the only section on the page where copy
 * is flowed around shapes instead of set in a straight column.
 *
 * Three flows, each a liquid-glass pane whose `shape-outside` is the same
 * polygon as its `clip-path`, so the text wraps the outline the reader can
 * actually see:
 *
 *   orb   — a circle float, the capsule motif reduced to one figure;
 *   vial  — a phial the copy tucks against on the opposite side;
 *   rails — mirrored tapers left and right, leaving a channel down the middle
 *           that narrows as it falls.
 *
 * The copy here is short on purpose. A wrapped measure is hard to read at
 * length and hard to keep honest across breakpoints, so the page's real body
 * text stays in ordinary columns and the effect is confined to this band.
 * Every shape unfloats below its breakpoint (see index.css) and the panes
 * stack, so nothing depends on the flow surviving a narrow viewport.
 *
 * GSAP drives the entrance, and the scroll-scrubbed drift is kept on the
 * background blooms rather than the panes: a transform moves a float without
 * moving the flow the browser computed from its shape, so a drifting pane
 * would pull away from the text still wrapping its old outline.
 */
export default function HealthcareStandards() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray("[data-flow-block]").forEach((block) => {
          gsap.from(block.querySelectorAll("[data-flow-item]"), {
            autoAlpha: 0,
            y: 26,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 82%", once: true },
          });
        });

        // Drift is confined to the background blooms. A transform on a float
        // moves the pane but not the flow the browser already computed from
        // its shape, so the copy would wrap an outline that is no longer
        // there; the panes stay exactly where they were laid out.
        gsap.utils.toArray("[data-flow-drift]").forEach((el, i) => {
          gsap.fromTo(
            el,
            { yPercent: i % 2 === 0 ? -12 : 12 },
            {
              yPercent: i % 2 === 0 ? 12 : -12,
              ease: "none",
              scrollTrigger: {
                trigger: scope.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
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
      className="relative isolate overflow-hidden bg-inverse py-24 md:py-32"
    >
      {/* Ground for the glass. Panes need something with structure behind them
          or the refraction has nothing to bend. */}
      <div aria-hidden="true" className="med-ecg-paper pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        data-flow-drift
        className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-[34rem] w-[34rem] rounded-full bg-brand/35 blur-[150px]"
      />
      <div
        aria-hidden="true"
        data-flow-drift
        className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent-vivid/25 blur-[150px]"
      />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          onInverse
          eyebrow={standards.eyebrow}
          title={
            <>
              {standards.titleLead} <span className="text-gradient">{standards.titleAccent}</span>
            </>
          }
        />

        {/* ── Flow one: circle float and vial float around the lead ───────── */}
        <div data-flow-block className="mx-auto mt-14 max-w-5xl">
          {/* The orb. `lg-sheen` puts the travelling specular on the pane, and
              `lg-rim` is skipped here because a circle keeps its inset rim. */}
          <div
            data-flow-item
            className="med-flow-orb lg lg-dark lg-sheen flex flex-col items-center justify-center text-center"
          >
            <p className="font-display text-3xl font-semibold tracking-tight text-inverse-fg xl:text-4xl">
              {standards.orb.value}
            </p>
            <p className="mt-2 max-w-[10rem] px-4 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-inverse-fg/70 xl:text-[0.68rem]">
              {standards.orb.caption}
            </p>
          </div>

          {/* The vial. Its rim comes from `lg-rim`: an inset shadow would be
              sliced off at the shoulder, so the edge is painted as a 1px
              gradient under a pane clipped to the same polygon. */}
          <div data-flow-item className="med-flow-vial lg-rim">
            <div className="med-clip-poly lg lg-dark lg-sheen flex h-full w-full flex-col items-center justify-center text-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-accent-vivid">
                {standards.vial.value}
              </p>
              <p className="mt-2 max-w-[9rem] font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-inverse-fg/70">
                {standards.vial.caption}
              </p>
            </div>
          </div>

          <p
            data-flow-item
            className="text-lg leading-relaxed text-inverse-fg/80 md:text-xl md:leading-relaxed"
          >
            {standards.lead}
          </p>
          <p data-flow-item className="mt-5 text-lg leading-relaxed text-inverse-fg/70 md:text-xl md:leading-relaxed">
            {standards.aside}
          </p>

          {/* Floats are taken out of flow, so without this the section's next
              block would ride up beside a pane it has nothing to do with. */}
          <div className="clear-both" />
        </div>

        {/* ── Flow two: mirrored rails with the copy in the channel ───────── */}
        <div data-flow-block className="mt-16 md:mt-24">
          <div data-flow-item className="med-flow-rail-l lg-rim mb-6 lg:mb-0">
            <div className="med-clip-poly lg lg-dark lg-sheen flex h-full w-full flex-col justify-end p-6 lg:p-8">
              <p className="font-display text-2xl font-semibold tracking-tight text-inverse-fg lg:text-3xl">
                {standards.rails[0].value}
              </p>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-inverse-fg/65">
                {standards.rails[0].caption}
              </p>
            </div>
          </div>

          <div data-flow-item className="med-flow-rail-r lg-rim mb-6 lg:mb-0">
            <div className="med-clip-poly lg lg-dark lg-sheen flex h-full w-full flex-col justify-end p-6 text-right lg:p-8">
              <p className="font-display text-2xl font-semibold tracking-tight text-accent-vivid lg:text-3xl">
                {standards.rails[1].value}
              </p>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-inverse-fg/65">
                {standards.rails[1].caption}
              </p>
            </div>
          </div>

          <p
            data-flow-item
            className="text-center font-display text-2xl font-medium leading-[1.35] tracking-tight text-inverse-fg/90 lg:text-[1.75rem] lg:leading-[1.4]"
          >
            {standards.manifesto}
          </p>

          <div className="clear-both" />
        </div>
      </div>
    </section>
  );
}
