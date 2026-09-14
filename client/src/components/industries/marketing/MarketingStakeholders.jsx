import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { stakeholders } from "../../../data/marketingData";

/** Three photo cards with the caption laid over the image, as in the reference. */
export default function MarketingStakeholders() {
  return (
    <section className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={stakeholders.eyebrow}
          title={
            <>
              <span className="text-gradient">{stakeholders.titleLead}</span> {stakeholders.titleAccent}
            </>
          }
        />

        <Stagger as="ul" step={0.1} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {stakeholders.items.map((item) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="clip-notch group relative overflow-hidden bg-inverse"
            >
              <img
                src={item.image}
                alt={item.alt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.05]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse via-inverse/45 to-transparent"
              />
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-inverse-fg md:text-2xl">
                  {item.title}
                </h3>
                {/* Held back until hover so the card reads as a caption at rest. */}
                <p className="mt-2 max-h-0 overflow-hidden text-base leading-relaxed text-inverse-fg/75 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:max-h-40 group-hover:opacity-100 group-focus-within:max-h-40 group-focus-within:opacity-100">
                  {item.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
