import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { stakeholders } from "../../../data/retailData";

/**
 * Four portrait cards, one per audience the software has to serve. The photo is
 * cut to the basket silhouette and the caption rides on glass over its foot, so
 * the copy stays readable whatever the image behind it is doing.
 */
export default function RetailStakeholders() {
  return (
    <section className="relative overflow-hidden bg-surface-wash py-24 md:py-32">
      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={stakeholders.eyebrow}
          title={
            <>
              {stakeholders.titleLead}{" "}
              <span className="text-gradient">{stakeholders.titleAccent}</span>
            </>
          }
        />

        <Stagger
          as="ul"
          step={0.1}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stakeholders.items.map((item) => (
            <StaggerItem as="li" key={item.label} className="group relative">
              <figure className="clip-basket relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.alt}
                  width={1000}
                  height={1250}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/80 via-inverse/10 to-transparent"
                />
                <figcaption className="on-dark absolute inset-x-4 bottom-4">
                  <span className="liquid-glass block rounded-2xl px-5 py-4">
                    <span className="block font-display text-lg font-semibold tracking-tight text-inverse-fg">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-inverse-fg/75">
                      {item.body}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
