import {
  AudioLines,
  Bot,
  FileText,
  Gauge,
  PenLine,
  ScanText,
  Search,
  Sparkles,
  Tags,
} from "lucide-react";

import SectionHeading from "../SectionHeading";
import useGsapReveal from "../../hooks/useGsapReveal";
import { solutions } from "../../data/nlpData";

/** The nine applied capabilities, as a card grid under a full-bleed banner. */
const ICONS = {
  assistant: Bot,
  sentiment: Gauge,
  document: FileText,
  categorize: Tags,
  search: Search,
  recommend: Sparkles,
  generate: PenLine,
  entity: ScanText,
  speech: AudioLines,
};

export default function NlpSolutions() {
  const scope = useGsapReveal({ stagger: 0.07 });

  return (
    <section
      id="nlp-solutions"
      ref={scope}
      className="scroll-mt-24 bg-surface py-20 md:py-28"
    >
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-12"
          align="left"
          eyebrow={solutions.eyebrow}
          title={
            <>
              {solutions.titleAccent} <span className="text-brand">{solutions.titleLead}</span>
            </>
          }
          subtitle={solutions.subtitle}
        />

        <div
          data-reveal
          className="relative mb-12 overflow-hidden rounded-xl2 border border-line shadow-card"
        >
          <img
            src={solutions.image}
            alt={solutions.imageAlt}
            loading="lazy"
            className="h-44 w-full object-cover object-center md:h-64"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse/90 via-inverse/45 to-transparent"
            aria-hidden="true"
          />
          <p className="absolute inset-y-0 left-0 flex max-w-lg items-center px-8 font-display text-xl font-semibold leading-snug text-white md:px-12 md:text-3xl">
            {solutions.imageCaption}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {solutions.items.map((item, i) => {
            const Icon = ICONS[item.icon] ?? Sparkles;
            return (
              <article
                key={item.title}
                data-reveal
                data-reveal-group="nlp-solutions"
                className="group relative flex flex-col overflow-hidden rounded-xl2 border border-line bg-surface-card p-8 transition-colors hover:border-brand/45"
              >
                {/* The index is a quiet wayfinder for a nine-card grid, it tells a reader who scrolled past how far in they are. */}
                <span
                  className="pointer-events-none absolute right-6 top-5 font-display text-5xl font-semibold text-content-faint/25 transition-colors group-hover:text-brand/25"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white"
                  aria-hidden="true"
                >
                  <Icon size={22} />
                </span>

                <h3 className="mt-6 font-display text-xl font-semibold text-content md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
