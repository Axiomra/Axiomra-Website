import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { build } from "../../../data/marketingData";

/**
 * The closing build-with-us band. Its ground is the textured wallpaper from
 * the reference: the photo supplies the grain, a brand-tinted wash sits over
 * it, and a faint hex lattice on top makes it read as a designed surface
 * rather than a stock background. The band is clipped to a shallow arc at the
 * top so it scoops away from the section above.
 */
export default function MarketingBuild() {
  const scope = useGsapReveal({ y: 28 });

  return (
    <section
      ref={scope}
      className="clip-curve-top mk-texture relative isolate overflow-hidden py-28 md:py-36"
    >
      {/* multiply reads the plaster grain on the light ground; over the dark ground it
          would flatten to black, so the dark theme screens a fainter pass instead. */}
      <img
        src={build.texture}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-40 mix-blend-multiply dark:opacity-[0.18] dark:mix-blend-screen"
      />
      <div
        aria-hidden="true"
        className="mk-hex-lattice pointer-events-none absolute inset-0 -z-10"
      />

      {/* Loose hexagons, echoing the motif in the reference artwork. */}
      <span
        aria-hidden="true"
        className="clip-hex pointer-events-none absolute -left-10 top-16 hidden h-24 w-20 bg-accent-vivid/25 md:block"
      />
      <span
        aria-hidden="true"
        className="clip-hex pointer-events-none absolute bottom-20 left-16 hidden h-16 w-14 bg-brand/25 lg:block"
      />
      <span
        aria-hidden="true"
        className="clip-hex pointer-events-none absolute right-10 top-24 hidden h-28 w-24 bg-brand/20 md:block"
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
          <div aria-hidden="true" className="clip-notch absolute -inset-3 bg-[#BFDBFE]" />
          <img
            src={build.image}
            alt={build.alt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="clip-notch relative aspect-[4/3] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
