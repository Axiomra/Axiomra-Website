import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { technologies } from "../../../data/retailData";
import { SERVICES_BASE_PATH } from "../../../routes.constants";

/**
 * The five technology families, numbered 01-05 over a photographic base coat.
 * Numbered glass cards rather than icons: these are disciplines, not products,
 * and a number reads as a list where an icon would over-promise a feature.
 */
export default function RetailTechnologies() {
  return (
    <section
      data-nav-tone="dark"
      className="on-dark clip-receipt-top relative overflow-hidden bg-inverse py-24 md:py-32"
    >
      <img
        src={technologies.background}
        alt=""
        aria-hidden="true"
        width={1800}
        height={1200}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-inverse via-inverse/85 to-inverse/70" />
      <div aria-hidden="true" className="retail-bloom opacity-50" />

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              onInverse
              eyebrow={technologies.eyebrow}
              title={
                <>
                  {technologies.titleLead}{" "}
                  <span className="text-gradient">{technologies.titleAccent}</span>
                </>
              }
              subtitle={technologies.body}
            />

            <Link
              to={SERVICES_BASE_PATH}
              className="group mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-6 py-3 text-base font-medium text-inverse-fg transition-colors duration-300 hover:bg-white/10 focus-ring"
            >
              {technologies.ctaText}
              <ArrowUpRight
                size={18}
                strokeWidth={1.75}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>

          <Stagger as="ol" step={0.1} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {technologies.items.map((item, i) => (
              <StaggerItem
                as="li"
                key={item.title}
                className={`liquid-glass liquid-glass-hover rounded-3xl p-7 ${
                  i === technologies.items.length - 1 ? "sm:col-span-2" : ""
                }`}
              >
                <span className="font-mono text-sm text-accent-vivid">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-inverse-fg">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-inverse-fg/70">{item.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
