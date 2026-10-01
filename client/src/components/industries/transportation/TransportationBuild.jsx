import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { build } from "../../../data/transportationData";

/**
 * The closing build-with-us band. Its ground is the dark texture plate with
 * painted lane markings over it, so the block reads as road surface rather than
 * as another photographic slab. The top edge nests under the section above.
 */
export default function TransportationBuild() {
  const scope = useGsapReveal({ y: 28 });

  return (
    <section
      ref={scope}
      data-nav-tone="dark"
      className="clip-lane-top relative isolate -mt-8 overflow-hidden bg-inverse py-28 md:py-36"
    >
      <img
        src={build.texture}
        alt=""
        aria-hidden="true"
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
      />
      <div
        aria-hidden="true"
        className="tr-lane-markings pointer-events-none absolute inset-0 -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand/25 blur-[150px]"
      />

      {/* Loose leaned shards, echoing the card rail above. */}
      <span
        aria-hidden="true"
        // `.clip-trailer` sets `--lean` itself and is declared after the utility
        // layer, so a `[--lean:…]` class loses to it; the shards are narrow
        // enough that the default 2.25rem lean folds them into a triangle.
        style={{ "--lean": "0.7rem" }}
        className="clip-trailer pointer-events-none absolute -left-6 top-24 hidden h-28 w-24 bg-accent-vivid/25 md:block"
      />
      <span
        aria-hidden="true"
        style={{ "--lean": "0.6rem" }}
        className="clip-trailer pointer-events-none absolute bottom-24 left-14 hidden h-20 w-20 bg-brand/25 lg:block"
      />

      <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6">
          <h2
            data-reveal
            className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-4xl lg:text-5xl"
          >
            {build.title}
          </h2>
          <p
            data-reveal
            className="mt-6 max-w-xl text-base leading-relaxed text-inverse-fg/75 md:text-lg"
          >
            {build.body}
          </p>
          <div data-reveal className="mt-9">
            <Link
              to="/contact"
              target="_blank"
              rel="noopener noreferrer"
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
          <div aria-hidden="true" className="clip-trailer absolute -inset-3 bg-[#BFDBFE]" />
          <img
            src={build.image}
            alt={build.alt}
            width={1200}
            height={1500}
            loading="lazy"
            decoding="async"
            className="clip-trailer relative aspect-[4/3] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
