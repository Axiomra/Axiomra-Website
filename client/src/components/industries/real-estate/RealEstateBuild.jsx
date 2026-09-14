import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { build } from "../../../data/realEstateData";

/**
 * The closing consultation band. Its ground is the textured wallpaper from the
 * reference: the concrete photo supplies the grain, a brand-tinted wash sits
 * over it, and a measured grid on top makes it read as a drawing board rather
 * than a stock background. The band is clipped to a skyline at the top so it
 * nests into the section above.
 */
export default function RealEstateBuild() {
  const scope = useGsapReveal({ y: 28 });

  return (
    <section
      ref={scope}
      className="clip-skyline-top re-texture relative isolate -mt-px overflow-hidden py-28 md:py-36"
    >
      {/* multiply reads the grain on the light ground; over the dark ground it
          would flatten to black, so the dark theme screens a fainter pass instead. */}
      <img
        src={build.texture}
        alt=""
        aria-hidden="true"
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-40 mix-blend-multiply dark:opacity-[0.18] dark:mix-blend-screen"
      />
      <div aria-hidden="true" className="re-blueprint-grid pointer-events-none absolute inset-0 -z-10" />

      {/* Loose towers, echoing the clipped edges that bracket the page. */}
      <span
        aria-hidden="true"
        className="clip-tower pointer-events-none absolute -left-4 top-28 hidden h-24 w-16 bg-accent-vivid/25 md:block"
      />
      <span
        aria-hidden="true"
        className="clip-tower pointer-events-none absolute bottom-24 left-20 hidden h-16 w-12 bg-brand/25 lg:block"
      />
      <span
        aria-hidden="true"
        className="clip-tower pointer-events-none absolute right-10 top-36 hidden h-28 w-20 bg-brand/20 md:block"
      />

      <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6">
          <h2
            data-reveal
            className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-content md:text-4xl lg:text-5xl"
          >
            {build.title}
          </h2>
          <p data-reveal className="mt-6 max-w-xl text-base leading-relaxed text-content-dim md:text-lg">
            {build.body}
          </p>

          <ul className="mt-9 space-y-5">
            {build.points.map((point, i) => (
              <li
                key={point.title}
                data-reveal
                data-reveal-group="build-points"
                className="flex gap-5"
              >
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-content">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 max-w-lg text-base leading-relaxed text-content-dim">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-cta-gradient py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
            >
              {build.ctaText}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <figure data-reveal className="relative lg:col-span-6">
          <div
            aria-hidden="true"
            className="clip-plot absolute -inset-3 bg-gradient-to-br from-brand/30 to-accent-vivid/30"
          />
          <img
            src={build.image}
            alt={build.alt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="clip-plot relative aspect-[4/3] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
