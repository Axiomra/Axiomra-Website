import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { midCta } from "../../../data/fashionData";

/** Photo-backed call to action between the benefits and the stakeholder cards. */
export default function FashionMidCta() {
  const scope = useGsapReveal({ y: 26 });

  return (
    <section ref={scope} className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="relative grid grid-cols-1 overflow-hidden rounded-[2rem] border border-inverse-fg/12 bg-inverse lg:grid-cols-12"
        >
          {/* Runway backdrop across the whole card, the way the hero is built:
              photo first, then a scrim heavy enough to keep the copy legible. */}
          <img
            src={midCta.background}
            alt=""
            aria-hidden="true"
            width={1800}
            height={1200}
            loading="lazy"
            decoding="async"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse via-inverse/80 to-inverse/40" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-brand/30 blur-[120px]"
          />
          <div className="relative z-10 flex flex-col justify-center p-8 md:p-12 lg:col-span-7 lg:p-16">
            <h2 className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-inverse-fg md:text-4xl lg:text-5xl">
              {midCta.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-inverse-fg/75 md:text-lg">
              {midCta.body}
            </p>
            <div className="mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-grad-sky py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
              >
                {midCta.ctaText}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>

          <figure className="relative min-h-[18rem] lg:col-span-5">
            <img
              src={midCta.image}
              alt={midCta.alt}
              width={1200}
              height={1441}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover object-top"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse via-inverse/20 to-transparent" />
          </figure>
        </div>
      </div>
    </section>
  );
}
