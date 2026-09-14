import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap, MOTION_OK } from "../../lib/gsap";
import { industries, industryPath } from "../../data/industriesData";

/** One industry chapter: photo on one side, the pitch on the other. */
function IndustrySection({ industry, index }) {
  // Odd rows flip, so the eye zigzags down the page instead of tracking one column.
  const flip = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const headingId = `industry-${industry.slug}-title`;

  return (
    <article
      id={industry.slug}
      data-industry={flip ? "flip" : "plain"}
      aria-labelledby={headingId}
      className="scroll-mt-24 border-t border-line py-16 first:border-t-0 md:py-24"
    >
      <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        {/* Outer tray, inner plate: the photo sits in a frame rather than being
            pasted onto the section. */}
        <figure
          data-figure
          className={`rounded-[2rem] border border-line bg-surface-subtle p-2 lg:col-span-6 ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <div className="overflow-hidden rounded-[calc(2rem-0.5rem)]">
            <img
              src={industry.image}
              alt={industry.alt}
              width={1920}
              height={1280}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.03]"
            />
          </div>
        </figure>

        <div data-copy className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
          <span className="font-mono text-sm uppercase tracking-[0.2em] text-accent">
            {number}
          </span>
          <h2
            id={headingId}
            className="mt-4 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-content md:text-4xl lg:text-5xl"
          >
            {industry.titleLead} <span className="text-gradient">{industry.titleAccent}</span>
          </h2>
          <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-content-dim md:text-lg">
            {industry.description}
          </p>

          <ul className="mt-8 space-y-3">
            {industry.pains.map((pain) => (
              <li
                key={pain.problem}
                data-pain
                className="flex flex-col gap-1 rounded-xl border border-line bg-surface-card px-4 py-3 sm:flex-row sm:items-center sm:gap-3"
              >
                <span className="text-base text-content-dim">{pain.problem}?</span>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="hidden shrink-0 text-accent-vivid sm:block"
                />
                <span className="text-base font-medium text-content">{pain.solution}.</span>
              </li>
            ))}
          </ul>

          <Link
            to={industryPath(industry.slug)}
            className="group mt-9 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-base font-medium text-content transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:text-brand focus-ring"
          >
            Explore Industry Solutions
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * The twelve industry chapters, revealed as they scroll in.
 *
 * GSAP owns every animation in this subtree: the photo slides in from its
 * side, the copy from the other, then the pain points arrive one after another.
 * All of it is skipped under reduced motion, where the content is simply there.
 */
export default function IndustryList() {
  const scope = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray("[data-industry]").forEach((article) => {
          const flip = article.dataset.industry === "flip";
          const figure = article.querySelector("[data-figure]");
          const copy = article.querySelector("[data-copy]");
          const pains = article.querySelectorAll("[data-pain]");

          gsap
            .timeline({
              scrollTrigger: { trigger: article, start: "top 78%", once: true },
            })
            .from(figure, { autoAlpha: 0, x: flip ? 48 : -48, duration: 0.9, ease: "power3.out" })
            .from(copy, { autoAlpha: 0, x: flip ? -40 : 40, duration: 0.9, ease: "power3.out" }, "<0.1")
            .from(pains, { autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.08, ease: "power2.out" }, "<0.35");
        });
      }, scope);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={scope} aria-label="Industries we serve" className="bg-surface">
      {industries.map((industry, i) => (
        <IndustrySection key={industry.slug} industry={industry} index={i} />
      ))}
    </section>
  );
}
