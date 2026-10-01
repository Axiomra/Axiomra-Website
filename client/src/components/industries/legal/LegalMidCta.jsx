import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { midCta } from "../../../data/legalData";

/**
 * Full-bleed call to action between the service grid and the delivery models.
 * The band's bottom edge tilts like a balance beam, so it cuts across the page
 * instead of sitting in another rounded card.
 */
export default function LegalMidCta() {
  const scope = useGsapReveal({ y: 26 });

  return (
    <section
      ref={scope}
      className="clip-balance-bottom relative isolate overflow-hidden bg-inverse py-24 md:py-32"
    >
      <img
        src={midCta.background}
        alt=""
        aria-hidden="true"
        width={1800}
        height={1000}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-inverse via-inverse/85 to-inverse/45" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 -z-10 h-80 w-80 rounded-full bg-accent-vivid/35 blur-[120px]"
      />

      <div className="mx-auto flex max-w-8xl flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p
            data-reveal
            className="lg lg-dark lg-soft lg-sheen mb-5 inline-block rounded-full px-5 py-2 font-mono text-sm uppercase tracking-[0.18em] text-accent-vivid"
          >
            {midCta.eyebrow}
          </p>
          <h2
            data-reveal
            className="max-w-2xl font-display text-3xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-4xl lg:text-5xl"
          >
            {midCta.title}
          </h2>
          <p
            data-reveal
            className="mt-5 max-w-xl text-base leading-relaxed text-inverse-fg/75 md:text-lg"
          >
            {midCta.body}
          </p>
        </div>

        <Link
          data-reveal
          to="/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-grad-sky py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
        >
          {midCta.ctaText}
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
            <ArrowUpRight size={19} aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  );
}
