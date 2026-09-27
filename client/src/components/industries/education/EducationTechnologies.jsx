import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { technologies } from "../../../data/educationData";
import { SERVICES_BASE_PATH } from "../../../data/servicesData";

/** Four numbered technology cards on a photographic ground, as in the reference. */
export default function EducationTechnologies() {
  return (
    <section
      data-nav-tone="dark"
      className="relative isolate overflow-hidden border-y border-inverse-fg/10 bg-inverse py-24 md:py-32"
    >
      <img
        src={technologies.background}
        alt=""
        aria-hidden="true"
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-inverse via-inverse/85 to-inverse/60" />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
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

        <Stagger as="ul" step={0.09} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {technologies.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="clip-page group flex flex-col border border-inverse-fg/10 bg-inverse-card/70 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-accent-vivid/40"
            >
              <span className="font-display text-4xl font-semibold tracking-tight text-accent-vivid/35 transition-colors duration-500 group-hover:text-accent-vivid/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-inverse-fg md:text-2xl">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-inverse-fg/70">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-12">
          <Link
            to={SERVICES_BASE_PATH}
            className="group inline-flex items-center gap-3 rounded-full border border-inverse-fg/20 py-2 pl-7 pr-2 text-base font-medium text-inverse-fg transition-colors duration-300 hover:border-accent-vivid focus-ring md:text-lg"
          >
            {technologies.ctaText}
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-vivid/15 text-accent-vivid transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
              <ArrowUpRight size={19} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
