import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, SearchX } from "lucide-react";
import { faqCategories, faqItems } from "../../data/faqsData";

const EASE = [0.16, 1, 0.3, 1];
const ALL = "All questions";

/** Case-insensitive match across the question and its answer. */
function matches(item, needle) {
  if (!needle) return true;
  const q = needle.toLowerCase();
  return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
}

function QuestionCard({ item, isOpen, onToggle, index }) {
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="h-max rounded-xl2 border border-line bg-surface-card transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-line-strong"
    >
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-5 px-6 py-5 text-left focus-ring"
      >
        <span>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            {item.category}
          </span>
          <span className="mt-2 block text-base font-medium text-content md:text-lg">
            {item.q}
          </span>
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="mt-1 shrink-0 text-brand"
          aria-hidden="true"
        >
          <Plus size={20} strokeWidth={1.75} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-base leading-relaxed text-content-dim">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * The searchable question set.
 *
 * Filtering happens on both the category pill and the hero's search field, so
 * the two controls have to share one derived list rather than each owning a
 * slice of the data.
 */
export default function FaqsBrowser({ query, onQueryChange }) {
  const [category, setCategory] = useState(ALL);
  const [openKey, setOpenKey] = useState(null);

  const visible = useMemo(
    () =>
      faqItems.filter(
        (item) => (category === ALL || item.category === category) && matches(item, query)
      ),
    [category, query]
  );

  const resetFilters = () => {
    setCategory(ALL);
    onQueryChange("");
  };

  return (
    <section id="faq-browser" className="scroll-mt-24 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-line pb-8 lg:flex-row lg:items-end lg:justify-between">
          <ul className="scrollbar-hide flex gap-2 overflow-x-auto">
            {[ALL, ...faqCategories].map((name) => {
              const isActive = category === name;
              return (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => setCategory(name)}
                    aria-pressed={isActive}
                    className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-ring ${
                      isActive
                        ? "border-transparent bg-inverse text-inverse-fg"
                        : "border-line bg-surface-card text-content-dim hover:-translate-y-0.5 hover:text-content"
                    }`}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </ul>

          <p aria-live="polite" className="shrink-0 font-mono text-sm text-content-faint">
            {visible.length} of {faqItems.length} questions
          </p>
        </div>

        {visible.length > 0 ? (
          <motion.div layout className="mt-8 grid grid-cols-1 items-start gap-4 lg:grid-cols-2 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((item, i) => (
                <QuestionCard
                  key={item.q}
                  item={item}
                  index={i}
                  isOpen={openKey === item.q}
                  onToggle={() => setOpenKey(openKey === item.q ? null : item.q)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-8 rounded-[2rem] border border-line bg-surface-subtle p-2">
            <div className="flex flex-col items-center rounded-[calc(2rem-0.5rem)] bg-surface-card px-6 py-20 text-center">
              <SearchX size={30} strokeWidth={1.5} className="text-content-faint" aria-hidden="true" />
              <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-content">
                Nothing matches that yet
              </p>
              <p className="mt-3 max-w-[46ch] text-base leading-relaxed text-content-dim">
                Try a shorter phrase, or clear the filters to see all {faqItems.length} questions.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-7 rounded-full border border-line bg-surface-inset px-6 py-3 text-base text-content transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-brand/45 active:scale-[0.98] focus-ring"
              >
                Clear filters
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
