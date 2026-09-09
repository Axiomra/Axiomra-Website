import { Mail } from "lucide-react";
import SectionHeading from "../SectionHeading";
import useGsapReveal from "../../hooks/useGsapReveal";
import { desks } from "../../data/portfolioData";

/**
 * The routing cards that close the portfolio: three desks, three addresses.
 * Deliberately plain after 22 loud brand bands, so the page lands quietly.
 */
export default function PortfolioDesks() {
  const scope = useGsapReveal({ y: 30, stagger: 0.1 });

  return (
    <section ref={scope} className="mx-auto max-w-8xl px-4 py-24 sm:px-6 lg:px-8">
      <SectionHeading
        className="mb-14"
        eyebrow="Connect with us"
        title="Talk to the right desk"
        subtitle="Tell us which case study caught your eye and we will send the full write-up, along with what it would take to build something like it for you."
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {desks.map((desk) => (
          <div
            key={desk.title}
            data-reveal-group="desks"
            className="group rounded-xl2 border border-line bg-surface-card p-8 transition-colors duration-300 hover:border-brand/40"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Mail size={19} strokeWidth={1.6} aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-display text-xl font-semibold text-content">{desk.title}</h3>
            <p className="mt-3 text-base leading-relaxed text-content-dim">{desk.body}</p>
            <a
              href={`mailto:${desk.email}`}
              className="mt-6 inline-block text-base font-medium text-brand underline-offset-4 hover:underline focus-ring"
            >
              {desk.email}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
