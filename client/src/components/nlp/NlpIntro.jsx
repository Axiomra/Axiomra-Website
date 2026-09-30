import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Star } from "lucide-react";

import { gsap, MOTION_OK } from "../../lib/gsap";
import { hero } from "../../data/nlpData";

/**
 * The band under the video hero: the actual pitch.
 *
 * Ground is deliberately light. The hero above is a dark navy video and the
 * stats band below is a drenched navy, so this beat is the quiet one between
 * them; the inference panel stays dark and becomes the single focal object.
 */
export default function NlpIntro() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        /* Entrance */
        // Scroll-triggered, not on load: this band starts below the fold now.
        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
        });

        intro
          .from("[data-intro-heading]", { autoAlpha: 0, y: 18, duration: 0.6 })
          .from("[data-intro-body]", { autoAlpha: 0, y: 22, duration: 0.7 }, "-=0.35")
          .from("[data-intro-cta]", { autoAlpha: 0, y: 20, duration: 0.6, stagger: 0.1 }, "-=0.45")
          .from("[data-intro-proof]", { autoAlpha: 0, duration: 0.6 }, "-=0.35")
          .from("[data-hero-panel]", { autoAlpha: 0, y: 40, scale: 0.96, duration: 0.9 }, "-=0.8");

        /* The loop: one sentence going through the model, forever */
        const tokens = gsap.utils.toArray("[data-token]");
        const rows = gsap.utils.toArray("[data-pred-row]");
        const bars = gsap.utils.toArray("[data-pred-bar]");

        const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.1 });

        tokens.forEach((token, i) => {
          loop
            .to(
              token,
              {
                backgroundColor: "rgba(20,216,196,0.16)",
                borderColor: "rgba(20,216,196,0.55)",
                color: "rgb(226,255,251)",
                duration: 0.22,
                ease: "none",
              },
              i * 0.16
            )
            .to(
              token,
              {
                backgroundColor: "rgba(255,255,255,0.04)",
                borderColor: "rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.62)",
                duration: 0.5,
                ease: "none",
              },
              i * 0.16 + 0.45
            );
        });

        const readEnd = tokens.length * 0.16 + 0.4;

        // Predictions land one at a time, after the sentence has been read.
        rows.forEach((row, i) => {
          loop.fromTo(
            row,
            { autoAlpha: 0.25, x: -10 },
            { autoAlpha: 1, x: 0, duration: 0.4, ease: "power2.out" },
            readEnd + i * 0.28
          );
          loop.fromTo(
            bars[i],
            { scaleX: 0 },
            {
              scaleX: Number(row.dataset.confidence),
              duration: 0.7,
              ease: "power2.out",
              transformOrigin: "left center",
            },
            readEnd + i * 0.28
          );
        });

        // Reset so the next repeat starts from an empty panel rather than a full one snapping back.
        loop.to(rows, { autoAlpha: 0.25, duration: 0.35 }, "+=1.4");
        loop.to(bars, { scaleX: 0, duration: 0.35, transformOrigin: "left center" }, "<");

        // The scan line sweeping the panel, independent of the read cadence.
        gsap.to("[data-hero-scan]", {
          y: () => root.current?.querySelector("[data-hero-panel]")?.offsetHeight ?? 0,
          duration: 3.4,
          ease: "none",
          repeat: -1,
          repeatRefresh: true,
        });
      }, root);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-nav-tone="light"
      className="relative overflow-hidden bg-surface py-20 md:py-28"
    >
      {/* Two faint washes in the brand hues, enough to keep the ground from reading as flat paper. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(55% 60% at 100% 8%, rgba(96,165,250,0.14), transparent 68%), radial-gradient(50% 60% at 0% 100%, rgba(37,99,235,0.10), transparent 70%)",
        }}
      />

      {/* Ruled paper, masked to the centre so the edges stay clean. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgb(var(--brand) / 0.09) 0px, rgb(var(--brand) / 0.09) 1px, transparent 1px, transparent 11px)",
          maskImage: "radial-gradient(75% 70% at 50% 50%, #000, transparent)",
          WebkitMaskImage: "radial-gradient(75% 70% at 50% 50%, #000, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-8xl px-6">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.85fr)] lg:gap-12">
          {/* Copy column */}
          <div>
            {/* This band had no heading of its own; the SEO phrase does the job. */}
            <h2
              data-intro-heading
              className="max-w-[16ch] text-balance font-display text-[clamp(2rem,4.4vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-content"
            >
              {hero.eyebrow}
            </h2>

            <p
              data-intro-body
              className="mt-7 max-w-[68ch] text-pretty text-lg leading-relaxed text-content-dim md:text-xl md:leading-relaxed"
            >
              {hero.body}
            </p>

            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Link
                data-intro-cta
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-grad-sky px-8 py-4 text-base font-semibold text-inverse transition-transform hover:scale-[1.02] focus-ring md:text-lg"
              >
                {hero.ctaText}
                <ArrowUpRight
                  size={19}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                data-intro-cta
                href="#nlp-services"
                className="inline-flex items-center gap-2 rounded-full border border-line-strong px-8 py-4 text-base font-medium text-content transition-colors hover:border-brand hover:text-brand focus-ring md:text-lg"
              >
                {hero.secondaryCtaText}
              </a>
            </div>

            <div data-intro-proof className="mt-9 flex flex-col gap-2">
              <span className="flex items-center gap-2">
                <span className="flex" aria-label={`${hero.proof.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} className="fill-gold text-gold" aria-hidden="true" />
                  ))}
                </span>
                <span className="text-sm text-content-dim md:text-base">
                  {hero.proof.rating} from {hero.proof.reviews}
                </span>
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-content-faint">
                {hero.proof.source}
              </span>
            </div>
          </div>

          {/* Inference panel The hero's claim, demonstrated: one real sentence goes in, four predictions come out. */}
          <div
            data-hero-panel
            className="relative overflow-hidden rounded-xl2 border border-white/10 bg-inverse p-6 shadow-glow md:p-7"
          >
            {/* Scan line, decorative, and the only thing in the panel that is not also a piece of information. */}
            <span
              data-hero-scan
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-grad-sky/70 to-transparent"
            />

            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/45">
                Live inference
              </span>
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-vivid/70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-vivid" />
                </span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/70">
                  ~18 ms
                </span>
              </span>
            </div>

            <p className="mt-5 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/40">
              Input
            </p>
            <p className="mt-3 flex flex-wrap gap-1.5">
              {hero.inputTokens.map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  data-token
                  className="rounded-md border border-white/12 bg-white/[0.04] px-2 py-1 font-mono text-xs text-white/60 md:text-sm"
                >
                  {t}
                </span>
              ))}
            </p>

            <p className="mt-7 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/40">
              Output
            </p>
            <dl className="mt-3 space-y-3">
              {hero.outputTokens.map((o) => (
                <div
                  key={o.label}
                  data-pred-row
                  data-confidence={o.confidence}
                  className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <dt className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-white/45">
                      {o.label}
                    </dt>
                    <dd className="font-mono text-xs text-accent-vivid md:text-sm">
                      {o.confidence}
                    </dd>
                  </div>
                  <dd className="mt-1.5 font-display text-sm font-semibold tracking-tight text-white md:text-base">
                    {o.value}
                  </dd>
                  {/* The confidence bar is the same number again, drawn. */}
                  <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                    <span
                      data-pred-bar
                      aria-hidden="true"
                      className="block h-full w-full origin-left rounded-full bg-cta-gradient"
                      style={{ transform: `scaleX(${o.confidence})` }}
                    />
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
