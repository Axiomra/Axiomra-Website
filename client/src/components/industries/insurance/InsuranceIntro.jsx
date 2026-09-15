import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { intro } from "../../../data/insuranceData";

/**
 * The positioning statement. Its top edge is the matching half of the hero's
 * canopy, so the two sections read as one arc rather than two blocks — which
 * costs a little height at the shoulders, hence the extra top padding.
 */
export default function InsuranceIntro() {
  const scope = useGsapReveal({ y: 30 });

  return (
    <section
      ref={scope}
      className="clip-canopy-top relative -mt-24 bg-gradient-to-b from-brand/16 via-brand/8 to-accent-vivid/14 pb-24 pt-40 md:pb-32 md:pt-48"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-24 h-[30rem] w-[30rem] rounded-full bg-accent-vivid/12 blur-[130px]"
      />

      <div className="relative mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <h2
            data-reveal
            className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-content md:text-5xl"
          >
            {intro.titleLead} <span className="text-gradient">{intro.titleAccent}</span>
          </h2>

          {intro.paragraphs.map((p) => (
            <p
              key={p.slice(0, 40)}
              data-reveal
              data-reveal-group="intro-copy"
              className="mt-6 max-w-[68ch] text-base leading-relaxed text-content-dim md:text-lg"
            >
              {p}
            </p>
          ))}

          <div data-reveal className="mt-9">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-cta-gradient py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
            >
              {intro.ctaText}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        {/* The photo takes the policy-document silhouette used across the page
            rather than sitting in another rounded rectangle. */}
        <figure data-reveal className="relative lg:col-span-5">
          <div
            aria-hidden="true"
            className="clip-policy absolute -inset-3 bg-gradient-to-br from-brand/35 to-accent-vivid/35"
          />
          <img
            src={intro.image}
            alt={intro.alt}
            width={1400}
            height={1050}
            loading="lazy"
            decoding="async"
            className="clip-policy relative aspect-[4/3] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
