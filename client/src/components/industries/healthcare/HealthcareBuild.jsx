import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { build } from "../../../data/healthcareData";

/**
 * The closing consultation band. Its ground is the textured wallpaper from the
 * reference: the photo supplies the grain, a brand-tinted wash sits over it,
 * and ECG graph paper on top makes it read as a designed surface rather than
 * a stock background. The band's top edge carries the same beat used on the
 * full-bleed sections above.
 */
export default function HealthcareBuild() {
  const scope = useGsapReveal({ y: 28 });

  return (
    <section
      ref={scope}
      className="clip-pulse-top med-texture relative isolate overflow-hidden py-28 md:py-36"
    >
      {/* multiply reads the texture on the light ground; over the dark ground it
          would flatten to black, so the dark theme screens a fainter pass instead. */}
      <img
        src={build.texture}
        alt=""
        aria-hidden="true"
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.26] mix-blend-multiply dark:opacity-[0.14] dark:mix-blend-screen"
      />
      <div
        aria-hidden="true"
        className="med-ecg-paper pointer-events-none absolute inset-0 -z-10"
      />
      {/* The texture still carries too much detail under body copy, so a
          left-weighted wash returns the text column to a quiet ground while
          the figure side keeps the grain. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-surface via-surface/80 to-transparent"
      />

      {/* Loose crosses, echoing the motif the hero opens with. */}
      <span
        aria-hidden="true"
        className="clip-cross lg lg-sheen pointer-events-none absolute -left-6 top-24 hidden h-24 w-24 md:block"
      />
      <span
        aria-hidden="true"
        className="clip-cross lg lg-sheen pointer-events-none absolute bottom-24 left-20 hidden h-14 w-14 lg:block"
      />
      <span
        aria-hidden="true"
        className="clip-cross lg lg-sheen pointer-events-none absolute right-10 top-32 hidden h-28 w-28 md:block"
      />

      <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6">
          <h2
            data-reveal
            className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-content md:text-4xl lg:text-5xl"
          >
            {build.title}
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-content-dim md:text-lg"
          >
            {build.body}
          </p>
          <div data-reveal className="mt-9">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-grad-sky py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
            >
              {build.ctaText}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <figure data-reveal className="relative lg:col-span-6">
          <div aria-hidden="true" className="clip-capsule absolute -inset-3 bg-[#BFDBFE]" />
          <img
            src={build.image}
            alt={build.alt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="clip-capsule relative aspect-[4/3] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
