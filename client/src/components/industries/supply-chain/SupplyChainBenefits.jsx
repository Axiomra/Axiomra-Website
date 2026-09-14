import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { benefits, build } from "../../../data/supplyChainData";

/**
 * Six numbered benefit cards on the lane-grid ground. The texture photo sits
 * far back so the section reads as a planning surface without competing with
 * the dark marquee above it.
 */
export default function SupplyChainBenefits() {
  return (
    <section className="sc-texture relative isolate overflow-hidden py-24 md:py-32">
      <img
        src={build.texture}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1080}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.22] mix-blend-multiply dark:opacity-[0.12] dark:mix-blend-screen"
      />
      <div aria-hidden="true" className="sc-lane-grid pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={benefits.eyebrow}
          title={
            <>
              <span className="text-gradient">{benefits.titleLead}</span> {benefits.titleAccent}
            </>
          }
        />

        <Stagger as="ul" step={0.08} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="clip-docket group relative flex flex-col border border-line bg-surface-card/85 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-brand/40 md:p-9"
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
