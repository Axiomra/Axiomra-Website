import { ArrowUpRight } from "lucide-react";

import SectionHeading from "../SectionHeading";
import useGsapReveal from "../../hooks/useGsapReveal";
import { whyUs } from "../../data/nlpData";
import { BOOKING_URL } from "../../lib/booking";

/** Differentiation: the stat block, then six numbered reasons. */
export default function NlpWhyUs() {
  const scope = useGsapReveal({ stagger: 0.06 });

  return (
    <section id="nlp-why-us" ref={scope} className="scroll-mt-24 bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              eyebrow={whyUs.eyebrow}
              title={
                <>
                  <span className="text-brand">{whyUs.titleAccent}</span> {whyUs.titleLead}
                </>
              }
              subtitle={whyUs.subtitle}
            />

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-base font-medium text-content transition-colors hover:border-brand hover:text-brand focus-ring md:text-lg"
            >
              {whyUs.ctaText}
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>

          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl2 border border-line bg-line">
            {whyUs.stats.map((s) => (
              <div
                key={s.label}
                data-reveal
                data-reveal-group="nlp-why-stats"
                className="bg-surface-card px-6 py-9 text-center"
              >
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-semibold text-brand md:text-4xl">
                    {s.value}
                  </span>
                  <span className="mt-2 block text-sm text-content-dim md:text-base">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.reasons.map((r, i) => (
            <article
              key={r.title}
              data-reveal
              data-reveal-group="nlp-why-reasons"
              className="flex flex-col rounded-xl2 border border-line bg-surface-card p-8 transition-colors hover:border-brand/45"
            >
              <span className="font-mono text-sm text-brand md:text-base">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-content md:text-2xl">
                {r.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">{r.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
