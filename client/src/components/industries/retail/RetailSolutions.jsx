import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { solutions } from "../../../data/retailData";

/**
 * Six outcomes a retail build is bought for. Glass cards over a faint texture
 * so the panel edges stay visible without a border fighting the photograph.
 */
export default function RetailSolutions() {
  return (
    <section className="relative overflow-hidden bg-surface-wash py-24 md:py-32">
      <img
        src={solutions.texture}
        alt=""
        aria-hidden="true"
        width={1600}
        height={1000}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.14]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-surface-wash via-transparent to-surface-wash" />

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={solutions.eyebrow}
          title={
            <>
              {solutions.titleLead} <span className="text-gradient">{solutions.titleAccent}</span>
            </>
          }
        />

        <Stagger
          as="ol"
          step={0.08}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {solutions.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className="liquid-glass liquid-glass-hover flex h-full flex-col rounded-3xl p-8"
            >
              <span className="font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-content">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-content-dim">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
