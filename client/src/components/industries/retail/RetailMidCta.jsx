import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../../motion/Reveal";
import { midCta } from "../../../data/retailData";

/**
 * Mid-page conversion band on a photographic base coat.
 *
 * The two angled panels either side of the copy are floats carrying
 * `shape-outside` polygons, so the paragraph fills the aisle between them and
 * takes their slant rather than sitting in a rectangle. Decorative only: they
 * are hidden below 1024px, where the column cannot hold three things across,
 * and the paragraph reflows to full width untouched.
 */
export default function RetailMidCta() {
  return (
    <section
      data-nav-tone="dark"
      className="on-dark relative overflow-hidden bg-inverse py-24 md:py-32"
    >
      <img
        src={midCta.background}
        alt=""
        aria-hidden="true"
        width={1800}
        height={1200}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-40"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse via-inverse/75 to-inverse" />
      <div aria-hidden="true" className="retail-bloom opacity-70" />

      <Reveal>
        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-5xl">
            {midCta.title}
          </h2>

          {/* Floats first: a float only pushes the text that follows it. */}
          <div className="mt-8">
            <span
              aria-hidden="true"
              className="shape-aisle-left liquid-glass"
            />
            <span
              aria-hidden="true"
              className="shape-aisle-right liquid-glass"
            />
            <p className="text-lg leading-relaxed text-inverse-fg/75 md:text-xl">{midCta.body}</p>

            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-3 rounded-full bg-cta-gradient py-2 pl-7 pr-2 text-lg font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98] focus-ring"
            >
              {midCta.buttonText}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:scale-105">
                <ArrowUpRight size={20} strokeWidth={1.75} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
