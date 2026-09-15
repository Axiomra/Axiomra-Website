import { useLayoutEffect, useRef } from "react";
import SectionHeading from "../../SectionHeading";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { doctrine } from "../../../data/legalData";

/**
 * The decorative doctrine band, and the only section on the page where copy is
 * flowed around shapes instead of set in a straight column.
 *
 * Three flows, each a liquid-glass pane whose `shape-outside` is the same
 * polygon as its `clip-path`, so the text wraps the outline the reader can
 * actually see:
 *
 *   seal     — a circle float carrying the portrait, the notary motif the
 *              page's numerals are struck on;
 *   gavel    — a struck block the copy tucks against on the opposite side;
 *   pillars  — two mirrored columns left and right, leaving a nave down the
 *              middle for the statement.
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
export default function LegalDoctrine() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray("[data-doctrine-flow]").forEach((block) => {
          gsap.from(block.querySelectorAll("[data-doctrine-item]"), {
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
        gsap.utils.toArray("[data-doctrine-drift]").forEach((el, i) => {
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
      <div
        aria-hidden="true"
        className="legal-rule-lines pointer-events-none absolute inset-0 -z-10 opacity-60"
      />
      <div
        aria-hidden="true"
        data-doctrine-drift
        className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent-vivid/30 blur-[150px]"
      />
      <div
        aria-hidden="true"
        data-doctrine-drift
        className="pointer-events-none absolute -right-20 bottom-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand/30 blur-[150px]"
      />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          onInverse
          eyebrow={doctrine.eyebrow}
          title={
            <>
              {doctrine.titleLead} <span className="text-gradient">{doctrine.titleAccent}</span>
            </>
          }
        />

        {/* ── Flow one: circle float and gavel float around the lead ──────── */}
        <div data-doctrine-flow className="mx-auto mt-14 max-w-5xl">
          {/* The seal. `lg-rim` is skipped here because a circle keeps its
              inset rim — the pane is rounded, not clipped. */}
          <div
            data-doctrine-item
            className="legal-flow-seal lg lg-dark lg-sheen relative overflow-hidden"
          >
            <img
              src={doctrine.portrait}
              alt={doctrine.portraitAlt}
              width={600}
              height={600}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-45"
            />
            {/* Scrim, so the caption holds contrast over whichever part of the
                portrait lands behind it. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-inverse/85 via-inverse/40 to-transparent"
            />
            <div className="relative flex h-full flex-col items-center justify-end pb-7 text-center">
              <p className="font-display text-2xl font-semibold tracking-tight text-inverse-fg xl:text-3xl">
                {doctrine.seal.value}
              </p>
              <p className="mt-1.5 max-w-[10rem] px-4 font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-inverse-fg/75 xl:text-[0.66rem]">
                {doctrine.seal.caption}
              </p>
            </div>
          </div>

          {/* The gavel head. Its rim comes from `lg-rim`: an inset shadow would
              be sliced off at the chamfer, so the edge is painted as a 1px
              gradient under a pane clipped to the same polygon. */}
          <div data-doctrine-item className="legal-flow-gavel lg-rim">
            <div className="legal-clip-poly lg lg-dark lg-sheen flex h-full w-full flex-col items-center justify-center text-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-accent-vivid">
                {doctrine.gavel.value}
              </p>
              <p className="mt-2 max-w-[9rem] font-mono text-[0.6rem] uppercase leading-relaxed tracking-[0.14em] text-inverse-fg/70">
                {doctrine.gavel.caption}
              </p>
            </div>
          </div>

          <p
            data-doctrine-item
            className="text-lg leading-relaxed text-inverse-fg/80 md:text-xl md:leading-relaxed"
          >
            {doctrine.lead}
          </p>
          <p
            data-doctrine-item
            className="mt-5 text-lg leading-relaxed text-inverse-fg/70 md:text-xl md:leading-relaxed"
          >
            {doctrine.aside}
          </p>

          {/* Floats are taken out of flow, so without this the section's next
              block would ride up beside a pane it has nothing to do with. */}
          <div className="clear-both" />
        </div>

        {/* ── Flow two: the colonnade, with the statement in the nave ─────── */}
        <div data-doctrine-flow className="mt-16 md:mt-24">
          <div data-doctrine-item className="legal-flow-pillar-l lg-rim mb-6 lg:mb-0">
            <div className="legal-clip-poly lg lg-dark lg-sheen flex h-full w-full flex-col justify-end p-6 lg:p-8">
              <p className="font-display text-2xl font-semibold tracking-tight text-inverse-fg lg:text-3xl">
                {doctrine.pillars[0].value}
              </p>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-inverse-fg/65">
                {doctrine.pillars[0].caption}
              </p>
            </div>
          </div>

          <div data-doctrine-item className="legal-flow-pillar-r lg-rim mb-6 lg:mb-0">
            <div className="legal-clip-poly lg lg-dark lg-sheen flex h-full w-full flex-col justify-end p-6 text-right lg:p-8">
              <p className="font-display text-2xl font-semibold tracking-tight text-accent-vivid lg:text-3xl">
                {doctrine.pillars[1].value}
              </p>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-inverse-fg/65">
                {doctrine.pillars[1].caption}
              </p>
            </div>
          </div>

          <p
            data-doctrine-item
            className="text-center font-display text-2xl font-medium leading-[1.35] tracking-tight text-inverse-fg/90 lg:text-[1.75rem] lg:leading-[1.4]"
          >
            {doctrine.manifesto}
          </p>

          <div className="clear-both" />
        </div>
      </div>
    </section>
  );
}
