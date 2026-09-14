import SectionHeading from "../../SectionHeading";
import { Stagger, StaggerItem } from "../../motion/Reveal";
import { streamline } from "../../../data/educationData";

/**
 * Six optimisation cards. Their ground is the ruled-paper wallpaper from the
 * reference: the chalk photo supplies the grain, a brand-tinted wash sits over
 * it, and faint ruled lines with a margin rule on top make it read as a worked
 * page rather than a stock background.
 */
export default function EducationStreamline() {
  return (
    <section className="edu-texture relative isolate overflow-hidden py-28 md:py-36">
      {/* multiply reads the chalk grain on the light ground; over the dark ground it
          would flatten to black, so the dark theme screens a fainter pass instead. */}
      <img
        src={streamline.texture}
        alt=""
        aria-hidden="true"
        width={1600}
        height={900}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-40 mix-blend-multiply dark:opacity-[0.18] dark:mix-blend-screen"
      />
      <div aria-hidden="true" className="edu-ruled-lines pointer-events-none absolute inset-0 -z-10" />

      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={streamline.eyebrow}
          title={
            <>
              {streamline.titleLead} <span className="text-gradient">{streamline.titleAccent}</span>
            </>
          }
        />

        <Stagger as="ul" step={0.08} className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {streamline.items.map((item, i) => (
            <StaggerItem
              as="li"
              key={item.title}
              className={`group relative flex flex-col border border-line bg-surface-card/85 p-8 backdrop-blur-sm transition-colors duration-500 hover:border-brand/40 md:p-9 ${
                i % 2 === 0 ? "clip-page" : "clip-page-alt"
              }`}
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
