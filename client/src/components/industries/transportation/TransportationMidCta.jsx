import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { midCta } from "../../../data/transportationData";

/**
 * Full-bleed call to action between the solution grid and the delivery models.
 * The band itself is uncut; the glass pane floating on the photograph is what
 * carries the shape, so this reads as a pause rather than another sheared slab.
 */
export default function TransportationMidCta() {
  const scope = useGsapReveal({ y: 26 });

  return (
    <section ref={scope} className="relative isolate overflow-hidden bg-inverse py-24 md:py-32">
      <img
        src={midCta.background}
        alt=""
        aria-hidden="true"
        width={1920}
        height={720}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-60"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-inverse via-inverse/70 to-inverse/40" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-80 w-80 rounded-full bg-brand/35 blur-[120px]"
      />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div data-reveal className="lg-rim lg-dark clip-waybill">
          <div className="lg lg-dark lg-soft lg-sheen clip-waybill flex flex-col items-start gap-8 p-9 md:p-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-4xl lg:text-5xl">
                {midCta.title}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-inverse-fg/80 md:text-lg">
                {midCta.body}
              </p>
            </div>

            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-cta-gradient py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
            >
              {midCta.ctaText}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight size={19} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
