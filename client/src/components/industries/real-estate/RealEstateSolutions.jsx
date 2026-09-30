import { useLayoutEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { gsap, MOTION_OK } from "../../../lib/gsap";
import { solutions } from "../../../data/realEstateData";

/**
 * The page's core rail: seven build areas, image and copy swapping sides as in
 * the reference. Each row states the problem a property business reports and
 * the system that removes it, so scope is readable without opening anything.
 *
 * The photos scrub a little against the scroll and each pair slides in from the
 * problem side, which makes the arrow read as a direction rather than a bullet.
 */
export default function RealEstateSolutions() {
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
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 82%", once: true },
          });

          gsap.from(row.querySelectorAll("[data-pain]"), {
            autoAlpha: 0,
            x: -22,
            duration: 0.6,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 78%", once: true },
          });

          gsap.from(row.querySelector("[data-rule]"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.9,
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

        <div className="mt-16 space-y-20 md:space-y-28">
          {solutions.items.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <div
                key={item.title}
                data-row
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-14"
              >
                <figure
                  data-row-item
                  className={`relative overflow-hidden md:col-span-5 ${
                    flipped ? "md:order-1 clip-plot-alt" : "md:order-2 clip-plot"
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
                </figure>

                <div className={`md:col-span-7 ${flipped ? "md:order-2" : "md:order-1"}`}>
                  <span data-row-item className="font-mono text-sm text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    data-row-item
                    className="mt-3 font-display text-2xl font-semibold leading-[1.15] tracking-tight text-content md:text-3xl lg:text-[2.5rem]"
                  >
                    {item.title}
                  </h3>
                  {/* The reference rules each heading off before the body copy. */}
                  <span
                    data-rule
                    aria-hidden="true"
                    className="mt-5 block h-px w-full max-w-md bg-gradient-to-r from-grad-blue via-grad-sky to-transparent"
                  />
                  <p
                    data-row-item
                    className="mt-5 max-w-[62ch] text-base leading-relaxed text-content-dim md:text-lg"
                  >
                    {item.body}
                  </p>

                  {/* Problem on the left, what we build on the right. The arrow
                      carries the meaning, so it is hidden from assistive tech
                      and the relationship is stated in the markup instead. */}
                  <dl className="mt-8 space-y-3">
                    {item.pains.map((pain) => (
                      <div
                        key={pain.problem}
                        data-pain
                        className="clip-plot flex flex-col gap-2 border border-line bg-surface-card/80 p-4 transition-colors duration-500 hover:border-brand/40 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
                      >
                        <dt className="flex-1 text-sm leading-snug text-content-dim md:text-base">
                          {pain.problem}
                        </dt>
                        <ArrowRight
                          size={17}
                          aria-hidden="true"
                          className="hidden shrink-0 text-accent sm:block"
                        />
                        <dd className="flex-1 text-sm font-semibold leading-snug text-content md:text-base">
                          {pain.solution}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
