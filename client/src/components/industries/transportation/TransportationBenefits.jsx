import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { benefits } from "../../../data/transportationData";

/**
 * Six numbered benefit cards on chevron-cut glass. The section carries its own
 * tinted ground, because a glass pane over flat surface colour has nothing to
 * refract and collapses into a plain box.
 */
export default function TransportationBenefits() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-surface via-brand/[0.07] to-surface py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/3 top-1/4 -z-10 h-[34rem] w-[34rem] rounded-full bg-accent-vivid/12 blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 bottom-10 -z-10 h-[26rem] w-[26rem] rounded-full bg-brand/12 blur-[140px]"
      />

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
            <StaggerItem as="li" key={item.title} className="lg-hover [--nose:1.5rem]">
              <div className="lg-rim clip-chevron h-full">
                <div className="lg lg-strong lg-sheen clip-chevron group flex h-full flex-col px-9 py-8 md:px-10 md:py-9">
                  <span className="font-display text-4xl font-semibold tracking-tight text-brand/30 transition-colors duration-500 group-hover:text-brand/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-content md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-content-dim">{item.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
