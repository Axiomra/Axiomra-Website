import { useLayoutEffect, useRef } from "react";
import { Check } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { services } from "../../../data/retailData";

/**
 * Six product families, image and copy swapping sides, each with the modules
 * that sit inside it. The photographs are cut to the price-tag polygon and
 * scrubbed a little against the scroll, so the column has depth without any
 * pinning.
 */
export default function RetailServices() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray("[data-parallax]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -7 },
            {
              yPercent: 7,
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
    <section ref={scope} className="bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={
            <>
              <span className="text-gradient">{services.titleLead}</span> {services.titleAccent}
            </>
          }
          subtitle={services.body}
        />

        <div className="mt-16 space-y-16 md:space-y-24">
          {services.items.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={item.title}
                data-row
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14"
              >
                <figure
                  data-row-item
                  className={`relative overflow-hidden md:col-span-6 ${flipped ? "md:order-2" : ""} ${
                    flipped ? "clip-tag-alt" : "clip-tag"
                  }`}
                >
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
                  {/* Tinted wash so six different stock photos still read as one set. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand/35 via-brand/10 to-transparent mix-blend-multiply"
                  />
                </figure>

                <div className={`md:col-span-6 ${flipped ? "md:order-1" : ""}`}>
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

                  <ul data-row-item className="mt-7 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                    {item.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-base text-content">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand"
                        >
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
