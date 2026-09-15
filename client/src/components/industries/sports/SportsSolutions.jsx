import { useLayoutEffect, useRef } from "react";
import { Check } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { solutions } from "../../../data/sportsData";

/**
 * Five service rows, image and copy swapping sides. The photo sits in a framed
 * tray (outer border, inner rounded plate) so the picture reads as an inset
 * rather than a full-bleed block, and is scrubbed a little against the scroll
 * so the column has depth without any pinning.
 */
export default function SportsSolutions() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        gsap.utils.toArray("[data-row]").forEach((row) => {
          gsap.from(row.querySelectorAll("[data-row-item]"), {
            autoAlpha: 0,
            y: 32,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          });
        });
      }, scope);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={scope} className="bg-surface-subtle py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={solutions.eyebrow}
          title={
            <>
              <span className="text-gradient">{solutions.titleLead}</span> {solutions.titleAccent}
            </>
          }
          subtitle={solutions.body}
        />

        <div className="mt-16 space-y-16 md:space-y-24">
          {solutions.items.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={item.title}
                data-row
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14"
              >
                {/* Outer tray, inner plate: the photo sits in a frame instead of
                    being pasted onto the section. */}
                <figure
                  data-row-item
                  className={`rounded-[2rem] border border-line bg-surface-card p-2 shadow-sm md:col-span-5 ${
                    flipped ? "md:order-2" : ""
                  }`}
                >
                  <div className="overflow-hidden rounded-[calc(2rem-0.5rem)]">
                    <img
                      data-parallax
                      src={item.image}
                      alt={item.alt}
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full scale-[1.12] object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                    />
                  </div>
                </figure>

                <div className={`md:col-span-7 ${flipped ? "md:order-1" : ""}`}>
                  <span data-row-item className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    data-row-item
                    className="mt-3 font-display text-2xl font-semibold leading-[1.15] tracking-tight text-content md:text-3xl lg:text-4xl"
                  >
                    {item.title}
                  </h3>
                  <p
                    data-row-item
                    className="mt-5 max-w-[62ch] text-base leading-relaxed text-content-dim md:text-lg"
                  >
                    {item.body}
                  </p>
                  {item.extra && (
                    <p
                      data-row-item
                      className="mt-4 max-w-[62ch] text-base leading-relaxed text-content-dim md:text-lg"
                    >
                      {item.extra}
                    </p>
                  )}

                  {item.points?.length > 0 && (
                    <ul data-row-item className="mt-7 space-y-3">
                      {item.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 rounded-xl border border-line bg-surface-card px-4 py-3"
                        >
                          <Check
                            size={16}
                            strokeWidth={2.4}
                            aria-hidden="true"
                            className="mt-1 shrink-0 text-accent-vivid"
                          />
                          <span className="text-base leading-relaxed text-content">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
