import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { intro } from "../../../data/fashionData";

/** Text left, photo right, tight. The first light section after the dark hero. */
export default function FashionIntro() {
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

        <figure data-reveal className="lg:col-span-5">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-surface-subtle p-2 shadow-card">
            <img
              src={intro.image}
              alt={intro.alt}
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full rounded-[calc(2rem-0.5rem)] object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
