/**
 * Elements the GSAP entrances start from hidden (`gsap.from(..., { autoAlpha: 0 })`
 * and friends), which those tweens set in a layout effect once React has
 * hydrated. On a prerendered page they would otherwise paint fully visible,
 * vanish at hydration, then animate back in. scripts/prerender.mjs turns this
 * list into a `visibility: hidden` rule that holds until <html> gets the
 * `hydrated` class (see HydratedMark in App.jsx), which is what the
 * client-rendered SPA showed before: nothing, then the entrance.
 *
 * perf/flash-check.mjs catches a selector missing from this list.
 *
 * Only list entrance targets. A `gsap.to(el, { autoAlpha })` reads its start
 * from the live style, and GSAP treats a `visibility: hidden` element as alpha
 * 0, so gating one records 0 as its resting state. (NlpHero's scroll fade on
 * `[data-hero-heading]` did exactly that: the headline vanished after
 * scrolling back to the top.)
 */
export const GATED_SELECTORS = [
  "[data-hero]",
  "[data-hero-img]",
  "[data-hero-tick]",
  "[data-hero-line]",
  "[data-hero-panel]",
  "[data-hero-video]",
  "[data-hero-stat]",
  "[data-hero-slab]",
  "[data-hero-scan]",
  "[data-hero-metric]",
  "[data-hero-eyebrow]",
  "[data-hero-cue]",
  "[data-hero-cta]",
  "[data-hero-cross]",
  "[data-hero-chip]",
  "[data-hero-body]",
  "[data-hero-badge]",
  "[data-intro-proof]",
  "[data-intro-heading]",
  "[data-intro-cta]",
  "[data-intro-body]",
  "[data-reveal]",
  "[data-row-item]",
  "[data-rule]",
  "[data-pain]",
  "[data-step]",
  "[data-step-card]",
  "[data-step-dot]",
  "[data-stat-row]",
  "[data-sol-reveal]",
  "[data-pred-row]",
  "[data-pred-bar]",
  "[data-pill]",
  "[data-industry]",
  "[data-apps]",
  "[data-token]",
  "[data-count]",
  "[data-figure]",
  "[data-copy]",
  "[data-sport-card]",
  "[data-mode-card]",
  "[data-signal-item]",
  "[data-flow-item]",
  "[data-doctrine-item]",
  ".stack-group",
];

export function gateCss() {
  const list = GATED_SELECTORS.join(",");
  return {
    style: `<style id="prerender-gate">html:not(.hydrated) :is(${list}){visibility:hidden}</style>`,
    noscript: `<noscript><style>:is(${list}){visibility:visible!important}</style></noscript>`,
  };
}
