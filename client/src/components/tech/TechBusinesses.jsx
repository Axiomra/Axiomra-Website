import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { businesses } from "../../data/techStackData";

import startupsImg from "../../assets/biz-startups.webp";
import scaleupsImg from "../../assets/biz-scaleups.webp";
import midMarketImg from "../../assets/biz-midmarket.webp";
import enterpriseImg from "../../assets/biz-enterprise.webp";

/* Kept beside the component rather than in the data file: these are art
   direction for this layout, not copy that another page could reuse. */
const SEGMENT_IMAGES = {
  startups: {
    src: startupsImg,
    alt: "Two founders reviewing early product notes at a shared desk",
  },
  "scale-ups": {
    src: scaleupsImg,
    alt: "Engineers working across several screens in an open studio",
  },
  "mid-market": {
    src: midMarketImg,
    alt: "A product team reviewing documents around a meeting table",
  },
  enterprise: {
    src: enterpriseImg,
    alt: "Two colleagues presenting at a whiteboard in a corporate office",
  },
};

const EASE = [0.16, 1, 0.3, 1];

/**
 * Segment switcher on a dark band.
 *
 * The dark material is deliberate: it breaks the long light stretch between the
 * stack list and the closing sections, so the page reads as chapters rather
 * than one endless scroll.
 */
export default function TechBusinesses() {
  const [activeId, setActiveId] = useState(businesses.segments[0].id);
  const active = businesses.segments.find((s) => s.id === activeId);

  return (
    <section className="relative overflow-hidden bg-inverse py-24 md:py-32">
      {/* Single soft light source, tinted to the accent rather than pure white. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 h-[32rem] w-[32rem] rounded-full bg-accent-vivid/10 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          onInverse
          title={
            <>
              {businesses.titleLead} <span className="text-gradient">{businesses.titleAccent}</span>
            </>
          }
          subtitle={businesses.body}
        />

        <div
          role="tablist"
          aria-label="Company stage"
          className="scrollbar-hide mt-12 flex gap-2 overflow-x-auto border-b border-inverse-fg/10 pb-px"
        >
          {businesses.segments.map((segment) => {
            const isActive = segment.id === activeId;
            return (
              <button
                key={segment.id}
                id={`seg-tab-${segment.id}`}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`seg-panel-${segment.id}`}
                onClick={() => setActiveId(segment.id)}
                className={`relative whitespace-nowrap px-5 py-4 text-base transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-ring md:text-lg ${
                  isActive ? "text-inverse-fg" : "text-inverse-fg/50 hover:text-inverse-fg/80"
                }`}
              >
                {segment.label}
                {isActive && (
                  // layoutId slides the marker between tabs instead of cross-fading it.
                  <motion.span
                    layoutId="segment-underline"
                    className="absolute inset-x-3 -bottom-px h-[2px] rounded-full bg-gradient-to-r from-grad-sky to-grad-blue"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id={`seg-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`seg-tab-${active.id}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
          >
            <div className="lg:col-span-6">
              <h3 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-inverse-fg md:text-4xl">
                {active.headline}
              </h3>
              <p className="mt-6 max-w-[58ch] text-lg leading-relaxed text-inverse-fg/70 md:text-xl">
                {active.body}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {active.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-inverse-fg/15 bg-inverse-fg/5 px-4 py-2 text-sm text-inverse-fg/75"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            {/* Outer tray, inner plate: the photo sits in the frame rather than
                being pasted onto the section. */}
            <figure className="rounded-[2rem] border border-inverse-fg/12 bg-inverse-fg/5 p-2 lg:col-span-6">
              <div className="overflow-hidden rounded-[calc(2rem-0.5rem)]">
                <img
                  src={SEGMENT_IMAGES[active.id].src}
                  alt={SEGMENT_IMAGES[active.id].alt}
                  width={1100}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[11/8] w-full object-cover"
                />
              </div>
            </figure>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
