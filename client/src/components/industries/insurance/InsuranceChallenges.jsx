import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../../SectionHeading";
import { Reveal } from "../../motion/Reveal";
import { challenges } from "../../../data/insuranceData";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Vertical tab rail: the barriers stack down the left, the selected one opens
 * as a numbered panel on the right. On phones the rail becomes a horizontal
 * scroller so the panel keeps its full width.
 */
export default function InsuranceChallenges() {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const items = challenges.items;
  const active = items[index];

  const onKeyDown = (e) => {
    const last = items.length - 1;
    let next = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setIndex(next);
  };

  return (
    <section className="border-t border-line bg-surface-subtle py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow={challenges.eyebrow}
          title={
            <>
              <span className="text-gradient">{challenges.titleLead}</span> {challenges.titleAccent}
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal
            as="div"
            from="right"
            role="tablist"
            aria-label="Insurance challenges"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="scrollbar-hide -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:col-span-5 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0"
          >
            {items.map((item, i) => {
              const isActive = i === index;
              return (
                <button
                  key={item.title}
                  id={`ins-challenge-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="ins-challenge-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setIndex(i)}
                  className={`relative shrink-0 whitespace-nowrap rounded-full border px-5 py-3 text-left text-sm transition-colors duration-300 focus-ring lg:w-full lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-l-2 lg:px-6 lg:py-5 lg:text-lg ${
                    isActive
                      ? "border-brand bg-brand/10 font-semibold text-content lg:bg-transparent"
                      : "border-line text-content-dim hover:border-brand/50 hover:text-content"
                  }`}
                >
                  <span className="mr-3 font-mono text-xs text-accent lg:text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.title}
                </button>
              );
            })}
          </Reveal>

          <Reveal
            as="div"
            from="left"
            id="ins-challenge-panel"
            role="tabpanel"
            aria-labelledby={`ins-challenge-tab-${index}`}
            className="clip-policy relative bg-inverse p-8 md:p-12 lg:col-span-7"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-brand/25 blur-[110px]"
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.title}
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="relative"
              >
                <span className="font-display text-5xl font-semibold tracking-tight text-accent-vivid/40 md:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-[1.15] tracking-tight text-inverse-fg md:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-inverse-fg/70 md:text-lg">
                  {active.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <Link
              to="/contact"
              className="relative mt-9 inline-flex items-center gap-3 rounded-full border border-inverse-fg/20 py-2 pl-6 pr-2 text-base font-medium text-inverse-fg transition-colors duration-300 hover:border-accent-vivid focus-ring"
            >
              Solve this with us
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-vivid/15 text-accent-vivid">
                <ArrowUpRight size={17} aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
