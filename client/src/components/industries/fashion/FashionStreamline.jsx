import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { streamline } from "../../../data/fashionData";

/**
 * Six benefit cards on a rigid three-across grid. Every card is the same width
 * and the same height: the grid rows are equal-height and each card stretches
 * to fill its cell, so the block reads as one even slab.
 */
export default function FashionStreamline() {
  return (
    <section className="border-t border-line bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow={streamline.eyebrow}
          title={
            <>
              {streamline.titleLead} <span className="text-gradient">{streamline.titleAccent}</span>
            </>
          }
        />

        <Stagger as="ul" step={0.08} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {streamline.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="group h-full rounded-[1.5rem] border border-line bg-surface-card p-6 shadow-card transition-colors duration-300 hover:border-brand md:p-7"
            >
              <div className="flex items-start gap-4">
                <span
                  className="shrink-0 font-display text-3xl font-semibold tabular-nums text-accent transition-colors duration-300 group-hover:text-brand"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-content md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-base leading-relaxed text-content-dim">{item.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
