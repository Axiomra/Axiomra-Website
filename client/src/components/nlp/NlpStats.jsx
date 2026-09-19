import { useLayoutEffect, useRef } from "react";

import { gsap, MOTION_OK } from "../../lib/gsap";
import { hero } from "../../data/nlpData";

/**
 * Numbers band.
 *
 * A drenched teal ground and a ledger of full-width rows, not a card grid:
 * the intro above is light and the tech bar below is light, so this is the
 * dark beat that breaks the run, and the figures get the whole line width.
 */
export default function NlpStats() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.from("[data-stat-row]", {
          autoAlpha: 0,
          y: 26,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });

        // The rules draw themselves in, so each row reads as a measure being taken.
        gsap.fromTo(
          "[data-stat-rule]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
          },
        );

        gsap.utils.toArray("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const suffix = el.dataset.suffix ?? "";
          const proxy = { n: 0 };

          gsap.to(proxy, {
            n: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => {
              el.textContent = `${Math.round(proxy.n)}${suffix}`;
            },
          });
        });
      }, root);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-nav-tone="dark"
      aria-label="NLP delivery numbers"
      className="relative overflow-hidden bg-inverse py-20 md:py-28"
    >
      {/* Teal-dominant drench, so this band is unmistakably not the navy hero. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(85% 110% at 6% 0%, rgba(20,216,196,0.32), transparent 66%), radial-gradient(75% 95% at 100% 100%, rgba(120,139,227,0.28), transparent 70%)",
        }}
      />

      {/* Horizontal rule texture: a printed ledger, and distinct from the diagonal weave elsewhere. */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.9) 0px, rgba(255,255,255,0.9) 1px, transparent 1px, transparent 7px)",
          maskImage: "linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-8xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.7fr)] lg:gap-16">
          <h2 className="text-balance font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-white lg:sticky lg:top-28 lg:self-start">
            Where we are today
          </h2>

          <dl className="lg:-mt-3">
            {hero.stats.map((s) => {
              const match = s.value ? s.value.match(/^(\d+)(.*)$/) : null;
              return (
                <div
                  key={s.label}
                  data-stat-row
                  className="group relative py-8 first:pt-0 md:py-10 md:first:pt-0"
                >
                  <div className="grid grid-cols-1 gap-y-3 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:items-baseline sm:gap-x-10">
                    <dt className="order-2 text-base leading-snug text-white/75 sm:order-none sm:col-start-2 sm:text-xl md:text-2xl">
                      {s.label}
                    </dt>
                    <dd className="order-1 font-display text-[clamp(3rem,7vw,5rem)] font-semibold leading-[0.85] tracking-[-0.035em] text-white transition-colors duration-300 group-hover:text-accent-vivid sm:order-none sm:col-start-1">
                      {match ? (
                        <span data-count={match[1]} data-suffix={match[2]}>
                          {s.value}
                        </span>
                      ) : (
                        s.value
                      )}
                    </dd>
                  </div>

                  <span
                    data-stat-rule
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 block h-px origin-left bg-white/20 transition-colors duration-300 group-hover:bg-accent-vivid/60"
                  />
                </div>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
