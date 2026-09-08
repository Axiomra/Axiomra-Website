import { lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { milestones } from "../../data/aboutData";
import img2021 from "../../assets/about/milestone-2021.webp";
import img2022 from "../../assets/about/milestone-2022.webp";
import img2023 from "../../assets/about/milestone-2023.webp";
import img2024 from "../../assets/about/milestone-2024.webp";
import img2025 from "../../assets/about/milestone-2025.webp";

/* One photo per year, so the frame tracks whatever the year rail is showing. */
const YEAR_MEDIA = {
  2021: { src: img2021, alt: "Two founders shipping the first production model from a single shared room" },
  2022: { src: img2022, alt: "The first full-time hires working through an early client build" },
  2023: { src: img2023, alt: "A larger studio, with the NLP and vision practices running side by side" },
  2024: { src: img2024, alt: "Clinicians using the first healthcare retrieval system we delivered" },
  2025: { src: img2025, alt: "Production infrastructure running multi-agent systems at scale" },
};

const NetworkBackground = lazy(() => import("../NetworkBackground"));

const QUARTERS = ["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"];

export default function AboutMilestones() {
  const [yearIndex, setYearIndex] = useState(0);
  const [quarter, setQuarter] = useState(0);

  const year = milestones.years[yearIndex];
  const items = year.quarters[quarter] ?? [];
  const media = YEAR_MEDIA[year.year] ?? YEAR_MEDIA[2025];

  const selectYear = (i) => {
    setYearIndex(i);
    // A year change resets to Q1: quarter 4 of the previous year rarely maps to
    // anything meaningful in the next one.
    setQuarter(0);
  };

  return (
    <section
      id="milestones"
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse py-20 md:py-28"
    >
      <Suspense fallback={null}>
        <NetworkBackground className="opacity-40" count={90} />
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-inverse via-inverse/70 to-inverse" />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <SectionHeading
          onInverse
          eyebrow={milestones.eyebrow}
          title={
            <>
              <span className="text-gradient">{milestones.titleAccent}</span> {milestones.titleLead}
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,180px)_minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-10">
          {/* Year rail */}
          <div
            role="tablist"
            aria-label="Milestone years"
            className="flex gap-2 overflow-x-auto scrollbar-hide lg:flex-col lg:overflow-visible"
          >
            {milestones.years.map((y, i) => {
              const active = i === yearIndex;
              return (
                <button
                  key={y.year}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls="milestone-panel"
                  onClick={() => selectYear(i)}
                  className={`shrink-0 rounded-xl px-7 py-3.5 text-lg font-semibold transition-all focus-ring lg:w-full ${
                    active
                      ? "bg-cta-gradient text-inverse"
                      : "bg-white/5 text-inverse-fg/60 hover:bg-white/10 hover:text-inverse-fg"
                  }`}
                >
                  {y.year}
                </button>
              );
            })}
          </div>

          {/* Photo, framed the way the reference dashes its timeline card. */}
          <div className="relative rounded-xl2 border border-dashed border-accent-vivid/40 p-3">
            <AnimatePresence mode="wait">
              <motion.img
                key={year.year}
                src={media.src}
                alt={media.alt}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="h-56 w-full rounded-xl object-cover sm:h-72 lg:h-full"
              />
            </AnimatePresence>
          </div>

          {/* Quarter tabs + bullets */}
          <div id="milestone-panel">
            <div className="flex flex-wrap gap-2">
              {QUARTERS.map((q, i) => {
                const active = i === quarter;
                return (
                  <button
                    key={q}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setQuarter(i)}
                    className={`rounded-lg border px-5 py-2.5 text-base font-medium transition-all focus-ring ${
                      active
                        ? "border-transparent bg-accent-vivid text-inverse"
                        : "border-white/15 text-inverse-fg/65 hover:border-accent-vivid/50 hover:text-inverse-fg"
                    }`}
                  >
                    {q}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={`${year.year}-${quarter}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="mt-7 space-y-4"
              >
                {items.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-relaxed text-inverse-fg/75">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-accent-vivid"
                    />
                    {item}
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
