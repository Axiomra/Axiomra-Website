import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { intro } from "../../../data/sportsData";
import { BOOKING_URL } from "../../../lib/booking";

/**
 * The positioning statement, on a tinted band that picks up the hero's shear
 * at its top edge and hands a mirrored one to the section below.
 */
export default function SportsIntro() {
  const scope = useGsapReveal({ y: 30 });

  return (
    <section
      ref={scope}
      className="clip-visor-top relative -mt-10 bg-surface-wash pb-24 pt-28 md:pb-32 md:pt-36"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-16 h-[30rem] w-[30rem] rounded-full bg-accent-vivid/12 blur-[130px]"
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
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-grad-sky py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
            >
              {intro.ctaText}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>

        {/* Sheared rather than rounded, so the photo belongs to the same family
            as the sport rail further down. */}
        <figure data-reveal className="relative lg:col-span-5">
          <div aria-hidden="true" className="clip-blade absolute -inset-3 bg-[#BFDBFE]" />
          <img
            src={intro.image}
            alt={intro.alt}
            width={1400}
            height={1050}
            loading="lazy"
            decoding="async"
            className="clip-blade relative aspect-[4/3] w-full object-cover"
          />
        </figure>
      </div>
    </section>
  );
}
