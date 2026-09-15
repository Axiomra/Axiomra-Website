import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { solutions } from "../../../data/transportationData";

/**
 * Eight product categories in a two-column grid. Alternating chevrons point the
 * row through the page, and the copy sits on a glass pane so the photograph
 * carries through behind it instead of stopping at a card edge.
 */
export default function TransportationSolutions() {
  return (
    <section className="relative isolate overflow-hidden bg-surface py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[32rem] w-[32rem] rounded-full bg-brand/10 blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent-vivid/10 blur-[150px]"
      />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={solutions.eyebrow}
          title={
            <>
              <span className="text-gradient">{solutions.titleLead}</span> {solutions.titleAccent}
            </>
          }
          subtitle={solutions.body}
        />

        <Stagger as="ul" step={0.06} className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {solutions.items.map((item, i) => {
            const clip = i % 2 === 0 ? "clip-chevron" : "clip-chevron-alt";
            return (
              <StaggerItem
                as="li"
                key={item.title}
                className={`lg-hover group relative overflow-hidden bg-surface-card shadow-card [--nose:1.5rem] ${clip}`}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="h-64 w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05] sm:h-72"
                />
                {/* Tinted wash so eight different photos still read as one set. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-brand/40 to-transparent mix-blend-multiply sm:h-72"
                />

                <div className="lg lg-strong lg-sheen relative -mt-16 px-8 py-7 md:px-9 md:py-8">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-content md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-content-dim">{item.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
