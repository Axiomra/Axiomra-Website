import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { gsap, ScrollTrigger, MOTION_OK } from "../../lib/gsap";
import { process } from "../../data/nlpData";

/** The eight delivery stages, as a scroll-driven timeline. */
export default function NlpProcess() {
  const root = useRef(null);
  const counter = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        const steps = gsap.utils.toArray("[data-step]");

        // The rail fills from the first step's dot to the last one's.
        gsap.fromTo(
          "[data-rail-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: "[data-steps]",
              start: "top 60%",
              end: "bottom 75%",
              scrub: 0.4,
            },
          },
        );

        steps.forEach((step, i) => {
          const dot = step.querySelector("[data-step-dot]");
          const card = step.querySelector("[data-step-card]");

          // Entrance, once.
          gsap.from(card, {
            autoAlpha: 0,
            x: 34,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 85%", once: true },
          });

          gsap.set(dot, { scale: 1 });

          ScrollTrigger.create({
            trigger: step,
            start: "top 62%",
            end: "bottom 62%",
            onEnter: () => setStep(i),
            onEnterBack: () => setStep(i),
          });
        });

        /** Colour is swapped by class, not tweened. */
        function setStep(index) {
          if (counter.current) {
            counter.current.textContent = String(index + 1).padStart(2, "0");
          }

          steps.forEach((s, j) => {
            const d = s.querySelector("[data-step-dot]");
            const c = s.querySelector("[data-step-card]");
            const passed = j <= index;

            d.classList.toggle("bg-brand", passed);
            d.classList.toggle("bg-line", !passed);
            c.classList.toggle("border-brand/45", j === index);
            c.classList.toggle("border-line", j !== index);

            gsap.to(d, { scale: j === index ? 1.4 : 1, duration: 0.3, ease: "power2.out" });
          });
        }
      }, root);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  const total = process.steps.length;

  return (
    <section
      id="nlp-process"
      ref={root}
      className="scroll-mt-24 bg-surface-subtle py-20 md:py-28"
    >
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Sticky side: what the section is, and where you are in it */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-content-faint md:text-base">
              {process.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-content sm:text-4xl md:text-5xl">
              {process.titleLead} <span className="text-brand">{process.titleAccent}</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-content-dim md:text-lg">
              {process.subtitle}
            </p>

            <div className="mt-10 overflow-hidden rounded-xl2 border border-line shadow-card">
              <img
                src={process.image}
                alt={process.imageAlt}
                loading="lazy"
                className="h-56 w-full object-cover md:h-72"
              />
            </div>

            <p
              className="mt-8 flex items-baseline gap-3 font-mono text-sm uppercase tracking-[0.18em] text-content-faint md:text-base"
              aria-hidden="true"
            >
              <span
                ref={counter}
                className="font-display text-4xl font-semibold tracking-tight text-brand md:text-5xl"
              >
                01
              </span>
              / {String(total).padStart(2, "0")}
            </p>

            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-base font-medium text-content transition-colors hover:border-brand hover:text-brand focus-ring md:text-lg"
            >
              {process.ctaText}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          {/* Scrolling side: the eight stages */}
          <ol data-steps className="relative pl-10 md:pl-14">
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[7px] top-6 w-px bg-line"
            />
            <span
              data-rail-fill
              aria-hidden="true"
              className="absolute bottom-6 left-[7px] top-6 w-px origin-top bg-brand"
            />

            {process.steps.map((s, i) => (
              <li key={s.title} data-step className="relative pb-8 last:pb-0">
                <span
                  data-step-dot
                  aria-hidden="true"
                  className="absolute left-[-2.5rem] top-8 h-[15px] w-[15px] rounded-full bg-line ring-4 ring-surface-subtle md:left-[-3.5rem]"
                />

                <article
                  data-step-card
                  className="rounded-xl2 border border-line bg-surface-card p-7 md:p-9"
                >
                  <span className="font-mono text-sm text-brand md:text-base">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-content md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                    {s.body}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
