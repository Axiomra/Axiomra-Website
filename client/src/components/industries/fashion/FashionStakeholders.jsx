import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { stakeholders } from "../../../data/fashionData";

/** Three photo cards, one per audience. */
export default function FashionStakeholders() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={stakeholders.eyebrow}
          title={
            <>
              {stakeholders.titleLead} <span className="text-gradient">{stakeholders.titleAccent}</span>
            </>
          }
        />

        <Stagger as="ul" step={0.1} className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {stakeholders.items.map((item) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="group overflow-hidden rounded-[2rem] border border-line bg-surface-subtle p-2 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1 hover:shadow-card"
            >
              <div className="overflow-hidden rounded-[calc(2rem-0.5rem)]">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="px-4 pb-4 pt-5">
                <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-content md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-content-dim">{item.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
