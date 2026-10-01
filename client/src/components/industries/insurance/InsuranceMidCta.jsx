import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { midCta } from "../../../data/insuranceData";

/**
 * Full-bleed call to action, and the page's inverted clip-path.
 *
 * The frosted panel is clipped to the *leftover* of a rectangle with a shield
 * removed, so the shield reads as a hole punched through the glass rather than
 * a shape laid on top of it. What shows through the hole is the photographic
 * band behind, which is why the two are stacked rather than composited.
 *
 * `polygon()` has no second subpath, so the hole is cut with a zero-width slit
 * running from the top-left corner to the shield and back: one continuous
 * outline, wound so the inner loop subtracts. The CSS drops the clip entirely
 * below 1024px, where a hole that size would eat the copy.
 */
export default function InsuranceMidCta() {
  const scope = useGsapReveal({ y: 26 });

  return (
    <section
      ref={scope}
      data-nav-tone="dark"
      className="relative isolate overflow-hidden bg-inverse py-24 md:py-32"
    >
      <img
        src={midCta.background}
        alt=""
        aria-hidden="true"
        width={1800}
        height={1000}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-55"
      />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-br from-grad-blue/45 via-inverse/70 to-grad-sky/35" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-20 h-80 w-80 rounded-full bg-brand/35 blur-[120px]"
      />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* The pane. `lg-flat` is not a thing; what matters is that the
              frosted ground is the element being clipped, so the hole is cut
              out of the glass itself and not out of a wrapper around it. */}
          <div className="lg lg-dark lg-strong ins-cutout relative overflow-hidden px-8 py-14 md:px-14 md:py-20 lg:min-h-[30rem]">
            <div className="max-w-xl lg:max-w-[52%]">
              <p
                data-reveal
                className="mb-5 inline-block font-mono text-sm uppercase tracking-[0.18em] text-accent-vivid"
              >
                {midCta.eyebrow}
              </p>
              <h2
                data-reveal
                className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-4xl lg:text-5xl"
              >
                {midCta.title}
              </h2>
              <p
                data-reveal
                className="mt-5 text-base leading-relaxed text-inverse-fg/75 md:text-lg"
              >
                {midCta.body}
              </p>

              <Link
                data-reveal
                to="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-grad-sky py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
              >
                {midCta.ctaText}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                  <ArrowUpRight size={19} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>

          {/* What the hole looks onto. Sitting it behind the pane rather than
              inside it is what makes the shield read as a window: the picture
              is at full strength here and knocked back everywhere else.
              Coordinates match the polygon in `.ins-cutout` exactly; change
              one and the other has to move with it. Hidden below lg, where the
              panel is not clipped at all. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 hidden lg:block"
            style={{ left: "58%", right: "10%", top: "14%", bottom: "12%" }}
          >
            <img
              src={midCta.background}
              alt=""
              width={1800}
              height={1000}
              loading="lazy"
              decoding="async"
              className="clip-shield h-full w-full object-cover"
            />
            {/* Ties the picture to the band. Kept as a plain alpha wash: a
                blend mode here composites against the pane in front of it, not
                the photo behind, and turns the window black in dark theme. */}
            <span className="clip-shield absolute inset-0 bg-gradient-to-b from-grad-sky/20 via-transparent to-grad-blue/45" />
          </span>
        </div>
      </div>
    </section>
  );
}
