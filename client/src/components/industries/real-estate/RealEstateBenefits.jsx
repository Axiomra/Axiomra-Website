import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { benefits, build } from "../../../data/realEstateData";

/**
 * Six numbered benefit cards on the blueprint ground. The concrete texture sits
 * far back so the section reads as a drawing board without competing with the
 * photographic band above it.
 */
export default function RealEstateBenefits() {
  return (
    <section className="re-texture relative isolate overflow-hidden py-24 md:py-32">
      <img
        src={build.texture}
        alt=""
        aria-hidden="true"
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.22] mix-blend-multiply dark:opacity-[0.12] dark:mix-blend-screen"
      />
      <div aria-hidden="true" className="re-blueprint-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={benefits.eyebrow}
          title={
            <>
              {benefits.titleLead} <span className="text-gradient">{benefits.titleAccent}</span>
            </>
          }
        />

        <Stagger as="ul" step={0.08} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="clip-plot group relative flex flex-col border border-line bg-surface-card/85 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-brand/40 md:p-9"
            >
              <span className="font-display text-4xl font-semibold tracking-tight text-brand/25 transition-colors duration-500 group-hover:text-brand/45">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-content md:text-2xl">
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
