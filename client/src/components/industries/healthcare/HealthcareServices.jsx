import { Link } from "react-router-dom";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { services } from "../../../data/healthcareData";

/**
 * Ten product categories in a two-column grid. The capsule is mirrored per
 * row so the repetition does not read as a stamped sheet.
 */
export default function HealthcareServices() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={
            <>
              <span className="text-gradient">{services.titleLead}</span> {services.titleAccent}
            </>
          }
          subtitle={services.body}
        />

        <Stagger as="ul" step={0.06} className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {services.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className={`group grid grid-cols-1 overflow-hidden border border-line bg-surface-card shadow-card transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 sm:grid-cols-5 ${
                i % 2 === 0 ? "clip-capsule-alt" : "clip-capsule"
              }`}
            >
              <div className={`relative sm:col-span-2 ${i % 2 === 0 ? "" : "sm:order-2"}`}>
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="h-52 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05] sm:h-full"
                />
                {/* Tinted wash so ten different stock photos still read as one set. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/40 via-brand/10 to-transparent mix-blend-multiply"
                />
              </div>

              <div className="p-7 sm:col-span-3 md:p-8">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-content md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-content-dim">{item.body}</p>
                {item.caseStudy && (
                  <Link
                    to={item.caseStudy.to}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand underline-offset-4 hover:underline focus-ring"
                  >
                    {item.caseStudy.text}
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
