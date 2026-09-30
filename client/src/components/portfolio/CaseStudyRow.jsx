import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import logoLight from "../../assets/logo-light.webp";

/**
 * One case study, rendered as a full-bleed alternating row.
 *
 * Two skins share this component:
 *  - "band" rows paint the client's own brand colour edge to edge. The mockup
 *    was exported on that exact colour, so the image has no visible boundary,
 *    it simply floats in the section.
 *  - neutral rows sit on the page surface and put the mockup on a white stage,
 *    which is what keeps those white-background exports readable in dark mode.
 *
 * GSAP drives both the entrance and a scrubbed parallax on the mockup. The
 * parallax translates the image rather than scaling inside a clipped frame,
 * because cropping a product screenshot loses the very thing it is showing.
 */
export default function CaseStudyRow({ study, index }) {
  const scope = useRef(null);
  const banded = Boolean(study.band);
  // Even rows keep the copy on the left; odd rows flip, so the page zigzags.
  const imageFirst = index % 2 === 1;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(MOTION_OK, () => {
        // fromTo everywhere: a remount that reverts a half-played from-tween
        // would otherwise strand the row at partial opacity.
        gsap.fromTo(
          scope.current.querySelectorAll("[data-row-reveal]"),
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 80%", once: true },
          }
        );

        gsap.fromTo(
          scope.current.querySelectorAll("[data-row-stat]"),
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: scope.current, start: "top 62%", once: true },
          }
        );

        const media = scope.current.querySelector("[data-row-media]");
        gsap.fromTo(
          media,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );

        // The ghost index drifts further than the mockup, which is what sells
        // the depth between the two layers.
        gsap.fromTo(
          scope.current.querySelector("[data-row-ghost]"),
          { yPercent: -22 },
          {
            yPercent: 22,
            ease: "none",
            scrollTrigger: {
              trigger: scope.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, []);

  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={scope}
      data-nav-tone={banded ? "dark" : undefined}
      className={`relative overflow-hidden py-20 md:py-28 ${
        banded ? "" : index % 4 === 3 ? "bg-surface-subtle" : "bg-surface"
      }`}
      style={banded ? { backgroundColor: study.band } : undefined}
    >
      {/* A single accent bloom keeps flat brand colours from reading as slabs. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full blur-[150px] ${
          imageFirst ? "-left-40" : "-right-40"
        }`}
        style={{ backgroundColor: study.accent, opacity: banded ? 0.18 : 0.1 }}
      />

      <div className="relative mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className={`lg:col-span-5 ${imageFirst ? "lg:order-2" : ""}`}>
          <div data-row-reveal className="mb-5 flex flex-wrap items-center gap-3">
            <span
              className={`font-mono text-sm tracking-[0.2em] ${
                banded ? "text-white/45" : "text-content-faint"
              }`}
            >
              {number}
            </span>
            <span
              className="rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-[0.14em]"
              style={{
                color: study.accent,
                borderColor: `${study.accent}55`,
                backgroundColor: `${study.accent}14`,
              }}
            >
              {study.tag}
            </span>
          </div>

          <h2
            data-row-reveal
            className={`font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl ${
              banded ? "text-white" : "text-content"
            }`}
          >
            {study.name}
          </h2>

          <p
            data-row-reveal
            className={`mt-3 text-lg font-medium md:text-xl ${
              banded ? "text-white/70" : "text-content-dim"
            }`}
            style={!banded ? { color: study.accent } : undefined}
          >
            {study.title}
          </p>

          <p
            data-row-reveal
            className={`mt-6 text-base leading-relaxed md:text-lg ${
              banded ? "text-white/65" : "text-content-dim"
            }`}
          >
            {study.description}
          </p>

          <p
            data-row-reveal
            className={`mt-10 font-mono text-xs uppercase tracking-[0.22em] ${
              banded ? "text-white/40" : "text-content-faint"
            }`}
          >
            {study.statsLabel ?? "The results?"}
          </p>

          <dl
            className={`mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-xl2 border sm:grid-cols-3 ${
              banded ? "border-white/12 bg-white/12" : "border-line bg-line"
            }`}
          >
            {study.stats.map((stat) => (
              <div
                key={stat.label}
                data-row-stat
                className={`px-5 py-6 ${banded ? "bg-black/20" : "bg-surface-card"}`}
              >
                <dt
                  className="font-display text-2xl font-semibold md:text-3xl"
                  style={{ color: study.accent }}
                >
                  {stat.value}
                </dt>
                <dd
                  className={`mt-2 text-sm leading-snug ${
                    banded ? "text-white/60" : "text-content-dim"
                  }`}
                >
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>

          <div data-row-reveal className="mt-9">
            <Link
              to={study.caseStudy ?? "/contact"}
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-3 rounded-full border py-2 pl-6 pr-2 text-base font-semibold transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] focus-ring ${
                banded
                  ? "border-white/20 bg-white/10 text-white"
                  : "border-line bg-surface-card text-content"
              }`}
            >
              Read case study
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px]"
                style={{ backgroundColor: study.accent, color: banded ? "#0A1428" : "#FFFFFF" }}
              >
                <ArrowUpRight size={18} strokeWidth={1.9} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <div className={`relative lg:col-span-7 ${imageFirst ? "lg:order-1" : ""}`}>
          <span
            data-row-ghost
            aria-hidden="true"
            className={`pointer-events-none absolute -top-10 select-none font-display text-[9rem] font-semibold leading-none md:text-[13rem] ${
              imageFirst ? "-left-4" : "-right-4"
            } ${banded ? "text-white/[0.06]" : "text-content/[0.05]"}`}
          >
            {number}
          </span>

          <div
            data-row-media
            className={
              banded
                ? "relative"
                : // Neutral mockups were exported on white, so they need a stage
                  // of their own to survive the dark theme.
                  "relative overflow-hidden rounded-xl2 bg-white shadow-card ring-1 ring-black/5"
            }
          >
            {/* Intrinsic dimensions are mandatory here: without them 22 lazy
                images grow the page as they land, and every ScrollTrigger
                below the fold ends up anchored to a stale scroll offset. */}
            <img
              src={study.image}
              alt={`${study.name}: ${study.title}`}
              width={study.width}
              height={study.height}
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
            {/* Transparent brand mark; the shadow keeps the white wordmark
                legible over light photos without adding a backdrop. */}
            <img
              src={logoLight}
              alt=""
              aria-hidden="true"
              width={500}
              height={91}
              className="pointer-events-none absolute right-4 top-4 h-auto w-24 drop-shadow-[0_1px_3px_rgba(0,0,0,0.55)] md:right-5 md:top-5 md:w-32"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
