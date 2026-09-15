import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { benefits } from "../../../data/healthcareData";

/** Six numbered benefit cards. Quiet on purpose: it follows the dark marquee. */
export default function HealthcareBenefits() {
  return (
    <section className="bg-surface py-24 md:py-32">
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
              className="clip-capsule group relative flex flex-col border border-line bg-surface-card p-8 transition-colors duration-500 hover:border-brand/40 md:p-9"
            >
              {/* The numeral sits on the cross, the motif the page opens with. */}
              <span className="clip-cross flex h-14 w-14 items-center justify-center bg-brand/10 font-display text-lg font-semibold tracking-tight text-brand/70 transition-colors duration-500 group-hover:bg-brand/20 group-hover:text-brand">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold leading-snug tracking-tight text-content md:text-2xl">
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
