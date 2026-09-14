import { useLayoutEffect } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import useGsapReveal from "../../../hooks/useGsapReveal";
import SectionHeading from "../../SectionHeading";
import { services } from "../../../data/fashionData";

/**
 * Six alternating rows, photo on one side and copy on the other. Rows sit
 * close together on purpose: the reference page left a screen of white space
 * between each pair and it read as broken, not spacious.
 */
export default function FashionServices() {
  const scope = useGsapReveal({ y: 30, stagger: 0.08 });

  // Scrubbed parallax on each photo, on top of the one-shot reveals from the hook.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray("[data-parallax]").forEach((img) => {
          gsap.fromTo(
            img,
            { yPercent: -7 },
            {
              yPercent: 7,
              ease: "none",
              scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, [scope]);

  return (
    <section ref={scope} id="fashion-services" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow={services.eyebrow}
          title={
            <>
              {services.titleLead} <span className="text-gradient">{services.titleAccent}</span>
            </>
          }
        />

        <div className="mt-14 space-y-14 md:space-y-20">
          {services.items.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <article
                key={item.title}
                className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14"
              >
                <figure
                  data-reveal
                  className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}
                >
                  <div className="overflow-hidden rounded-[2rem] border border-line bg-surface-subtle p-2">
                    <div className="overflow-hidden rounded-[calc(2rem-0.5rem)]">
                      <img
                        data-parallax
                        src={item.image}
                        alt={item.alt}
                        width={1200}
                        height={900}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] w-full scale-[1.16] object-cover"
                      />
                    </div>
                  </div>
                </figure>

                <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                  <span data-reveal-group={`svc-${i}`} className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    data-reveal-group={`svc-${i}`}
                    className="mt-3 font-display text-2xl font-semibold leading-[1.15] tracking-tight text-content md:text-3xl"
                  >
                    {item.title}
                  </h3>
                  <p
                    data-reveal-group={`svc-${i}`}
                    className="copy-justify mt-4 text-base leading-relaxed text-content-dim md:text-lg"
                  >
                    {item.body}
                  </p>

                  <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {item.points.map((pt) => (
                      <li
                        key={pt.name}
                        data-reveal-group={`svc-${i}`}
                        className="group rounded-xl2 border border-line bg-surface-subtle px-4 py-3.5 transition-colors duration-300 hover:border-brand/45"
                      >
                        <span className="flex items-center gap-2 font-medium text-content">
                          <ArrowRight
                            size={15}
                            aria-hidden="true"
                            className="shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5"
                          />
                          {pt.name}
                        </span>
                        <span className="mt-1 block text-sm leading-snug text-content-dim">{pt.outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
