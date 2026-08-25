import SectionHeading from "../SectionHeading";
import { outcomes } from "../../data/nlpData";

/**
 * Sticky intro on the left. On the right each card pins one header-height lower
 * than the last, so scrolling folds the read cards into a single stacked pile
 * with only the live card open.
 */
const TOP_BASE_REM = 5.5; // clears the fixed navbar
const HEADER_REM = 4; // visible height of a folded card

function OutcomeCard({ item, index }) {
  return (
    <div
      className="sticky"
      style={{ top: `${TOP_BASE_REM + index * HEADER_REM}rem` }}
    >
      <article className="group overflow-hidden rounded-[1.5rem] border border-line bg-surface-card shadow-card transition-colors duration-300 hover:border-brand">
        <div
          className="flex items-center justify-between gap-6 px-6 md:px-9"
          style={{ height: `${HEADER_REM}rem` }}
        >
          <h3 className="font-display text-xl font-semibold leading-snug text-content transition-colors duration-300 group-hover:text-brand md:text-2xl">
            {item.title}
          </h3>
          <span
            className="shrink-0 font-display text-3xl font-semibold tabular-nums text-accent md:text-4xl"
            aria-hidden="true"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="border-t border-line/70 px-6 pb-6 pt-5 md:px-9 md:pb-8">
          <p className="copy-justify text-base leading-relaxed text-content-dim md:text-lg">
            {item.body}
          </p>

          {item.metric && (
            <div className="mt-5 flex items-baseline gap-3 border-t border-line pt-4">
              <span className="font-display text-3xl font-semibold text-brand md:text-4xl">
                {item.metric}
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-content-faint md:text-sm">
                {item.metricLabel}
              </span>
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default function NlpOutcomes() {
  return (
    <section
      id="nlp-outcomes"
      className="relative isolate scroll-mt-24 bg-surface py-16 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src={outcomes.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover opacity-[0.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/70 to-surface" />
      </div>

      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              align="left"
              eyebrow={outcomes.eyebrow}
              title={
                <>
                  <span className="text-brand">{outcomes.titleAccent}</span>{" "}
                  {outcomes.titleLead}
                </>
              }
              subtitle={outcomes.subtitle}
            />
          </div>

          <div className="space-y-4">
            {outcomes.items.map((item, i) => (
              <OutcomeCard key={item.title} item={item} index={i} />
            ))}
            <div aria-hidden="true" className="h-[14vh]" />
          </div>
        </div>
      </div>
    </section>
  );
}
