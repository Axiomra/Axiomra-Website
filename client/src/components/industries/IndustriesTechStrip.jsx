import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { techStrip } from "../../data/industriesData";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Tabbed stack strip. Text pills only, on purpose: a row of borrowed brand
 * marks reads as a sponsor wall, and the point here is breadth, not logos.
 */
export default function IndustriesTechStrip({ data = techStrip }) {
  const [activeId, setActiveId] = useState(data.tabs[0].id);
  const tabRefs = useRef([]);
  const reduced = useReducedMotion();

  const active = data.tabs.find((t) => t.id === activeId);
  // A marquee needs the row twice so the -50% loop lands on an identical frame.
  const pills = reduced ? active.items : [...active.items, ...active.items];

  const onKeyDown = (e, index) => {
    const last = data.tabs.length - 1;
    let next = null;
    if (e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActiveId(data.tabs[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="border-t border-line bg-surface-subtle py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow={data.eyebrow}
          title={
            <>
              {data.titleLead} <span className="text-gradient">{data.titleAccent}</span>
            </>
          }
          subtitle={data.body}
        />

        <div
          role="tablist"
          aria-label="Technology layer"
          className="scrollbar-hide mt-12 flex gap-2 overflow-x-auto border-b border-line pb-px"
        >
          {data.tabs.map((tab, i) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                ref={(el) => (tabRefs.current[i] = el)}
                id={`tech-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`tech-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative whitespace-nowrap px-4 py-4 text-base transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-ring md:px-5 md:text-lg ${
                  isActive ? "text-content" : "text-content-faint hover:text-content-dim"
                }`}
              >
                {tab.label}
                {isActive && (
                  // layoutId slides the marker between tabs instead of cross-fading it.
                  <motion.span
                    layoutId="tech-tab-underline"
                    className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-grad-sky to-grad-blue"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          id={`tech-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`tech-tab-${active.id}`}
          className={`relative mt-10 ${
            reduced ? "scrollbar-hide overflow-x-auto" : "overflow-hidden"
          }`}
        >
          {!reduced && (
            <>
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-subtle to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-subtle to-transparent" />
            </>
          )}
          <ul
            key={active.id}
            className={`flex w-max gap-3 ${
              reduced
                ? ""
                : "animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
            }`}
          >
            {pills.map((item, i) => (
              <li
                key={`${item}-${i}`}
                aria-hidden={i >= active.items.length ? "true" : undefined}
                className="whitespace-nowrap rounded-full border border-line bg-surface-card px-5 py-2.5 text-base text-content-dim transition-colors duration-300 hover:border-brand/45 hover:text-content"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {active.note ? (
          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-content-dim">
            {active.note}
          </p>
        ) : null}
      </div>
    </section>
  );
}
