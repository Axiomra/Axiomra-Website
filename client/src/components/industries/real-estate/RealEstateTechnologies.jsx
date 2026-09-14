import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { SERVICES_BASE_PATH } from "../../../data/servicesData";
import { technologies } from "../../../data/realEstateData";

/** The four capabilities that carry a property platform, as numbered cards. */
export default function RealEstateTechnologies() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            align="left"
            className="lg:max-w-3xl"
            eyebrow={technologies.eyebrow}
            title={
              <>
                <span className="text-gradient">{technologies.titleLead}</span> {technologies.titleAccent}
              </>
            }
            subtitle={technologies.body}
          />

          <Link
            to={SERVICES_BASE_PATH}
            className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-line px-7 py-3 text-base font-semibold text-content transition-colors duration-500 hover:border-brand hover:text-brand focus-ring"
          >
            {technologies.ctaText}
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]"
            />
          </Link>
        </div>

        <Stagger as="ul" step={0.1} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {technologies.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="clip-plot-alt group flex flex-col border border-line bg-surface-card p-8 transition-colors duration-500 hover:border-brand/40"
            >
              <span className="font-display text-4xl font-semibold tracking-tight text-brand/25 transition-colors duration-500 group-hover:text-brand/45">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-content">
                {item.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-content-dim">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
