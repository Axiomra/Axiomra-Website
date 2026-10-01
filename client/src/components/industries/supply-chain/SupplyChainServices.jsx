import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { services } from "../../../data/supplyChainData";

/**
 * Twelve product categories, image over copy in a two-column grid as in the
 * reference. Alternating clip shapes keep the repetition from reading as a
 * stamped sheet.
 */
export default function SupplyChainServices() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={
            <>
              {services.titleLead} <span className="text-gradient">{services.titleAccent}</span>
            </>
          }
          subtitle={services.body}
        />

        <Stagger as="ul" step={0.06} className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {services.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className={`group flex flex-col overflow-hidden border border-line bg-surface-card shadow-card transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 ${
                i % 2 === 0 ? "clip-docket" : "clip-notch"
              }`}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1200}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
                />
                {/* Tinted wash so twelve different stock photos still read as one set. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-grad-blue/40 via-grad-blue/10 to-transparent mix-blend-multiply"
                />
                <span className="absolute left-6 top-6 rounded-full bg-inverse/70 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-inverse-fg backdrop-blur-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-7 md:p-8">
                <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-content md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-content-dim">{item.body}</p>

                <Link
                  to="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-6 text-sm font-medium text-brand transition-colors duration-300 hover:text-accent focus-ring"
                >
                  Contact us
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
