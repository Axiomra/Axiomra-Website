import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { intro } from "../../../data/educationData";

/**
 * Text left, photo right. The reference lays a translucent clipped shape over
 * the photo, so the picture reads as part of the page rather than a pasted-in
 * rectangle; the arch and the offset page fold behind it do that work here.
 */
export default function EducationIntro() {
  const scope = useGsapReveal({ y: 30 });

  return (
    <section ref={scope} className="bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-7">
          <h2
            data-reveal
            className="font-display text-3xl font-semibold leading-[1.12] tracking-tight text-content md:text-4xl lg:text-[2.75rem]"
          >
            {intro.titleLead} <span className="text-gradient">{intro.titleAccent}</span>
          </h2>

          {intro.paragraphs.map((p) => (
            <p
              key={p.slice(0, 24)}
              data-reveal
              className="copy-justify mt-6 text-base leading-relaxed text-content-dim md:text-lg"
            >
              {p}
            </p>
          ))}

          <div data-reveal className="mt-9">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-3 rounded-full bg-inverse py-2 pl-7 pr-2 text-base font-medium text-inverse-fg transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring"
            >
              {intro.ctaText}
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-inverse-fg/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <figure data-reveal className="relative lg:col-span-5">
          {/* Offset fold behind the photo, and a translucent arch over it. */}
          <span
            aria-hidden="true"
            className="clip-page pointer-events-none absolute -bottom-5 -right-5 h-full w-full bg-gradient-to-br from-brand/35 to-accent-vivid/35"
          />
          <img
            src={intro.image}
            alt={intro.alt}
            width={1400}
            height={1050}
            loading="lazy"
            decoding="async"
            className="clip-page relative aspect-[4/5] w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="clip-arch pointer-events-none absolute inset-x-8 bottom-0 top-10 bg-accent-vivid/15 backdrop-blur-[1px]"
          />
        </figure>
      </div>
    </section>
  );
}
