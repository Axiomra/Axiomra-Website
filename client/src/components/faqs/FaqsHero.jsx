import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Search, ArrowUpRight } from "lucide-react";
import { hero } from "../../data/faqsData";
import heroImage from "../../assets/faqs-hero.webp";

// The canvas is decorative, so it must never delay the headline.
const NetworkBackground = lazy(() => import("../NetworkBackground"));

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.08 * i },
  }),
};

/**
 * Editorial split: the claim on the left, the tool on the right.
 *
 * The search field lives in the hero rather than above the list because the
 * fastest path through 28 questions is typing, not scanning.
 */
export default function FaqsHero({ query, onQueryChange, onSubmit }) {
  return (
    <section
      data-nav-tone="dark"
      className="relative flex min-h-[80svh] items-center overflow-hidden bg-inverse pb-20 pt-32 md:pb-28"
    >
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      />

      <Suspense fallback={null}>
        <NetworkBackground count={90} className="opacity-60" />
      </Suspense>
      {/* Directional scrim: heaviest under the copy column, clearing toward the right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-inverse via-inverse/80 to-inverse/40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-inverse to-transparent"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-8xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
        <div className="lg:col-span-6 xl:col-span-7">
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="font-mono text-sm uppercase tracking-[0.2em] text-accent-vivid md:text-base"
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-inverse-fg sm:text-5xl lg:text-[3.25rem] xl:text-6xl"
          >
            {hero.titleLead}{" "}
            <span className="text-gradient">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-7 max-w-[58ch] text-lg leading-relaxed text-inverse-fg/70 md:text-xl"
          >
            {hero.body}
          </motion.p>
        </div>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="lg:col-span-6 xl:col-span-5"
        >
          {/* Outer shell and inner core, radii kept concentric. */}
          <div className="rounded-[2rem] border border-inverse-fg/12 bg-inverse-fg/5 p-2 backdrop-blur-xl">
            <div className="rounded-[calc(2rem-0.5rem)] bg-inverse-card/80 p-6 shadow-[inset_0_1px_0_rgb(255,255,255,0.08)] md:p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit?.();
                }}
              >
                <label
                  htmlFor="faq-search"
                  className="font-mono text-xs uppercase tracking-[0.18em] text-inverse-fg/50"
                >
                  {hero.searchLabel}
                </label>
                <div className="mt-3 flex items-center gap-3 rounded-full border border-inverse-fg/15 bg-inverse/60 px-5 py-3 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-within:border-accent-vivid/60">
                  <Search size={18} strokeWidth={1.75} className="shrink-0 text-inverse-fg/45" aria-hidden="true" />
                  <input
                    id="faq-search"
                    type="search"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    placeholder={hero.searchPlaceholder}
                    className="w-full bg-transparent text-base text-inverse-fg placeholder:text-inverse-fg/35 focus:outline-none"
                  />
                </div>
              </form>

              <p className="mt-7 font-mono text-xs uppercase tracking-[0.18em] text-inverse-fg/40">
                Most asked
              </p>
              <ul className="mt-3 space-y-1">
                {hero.popular.map((question) => (
                  <li key={question}>
                    <button
                      type="button"
                      onClick={() => {
                        onQueryChange(question);
                        onSubmit?.();
                      }}
                      className="group flex w-full items-center justify-between gap-4 rounded-xl px-3 py-3 text-left text-base text-inverse-fg/75 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-inverse-fg/5 hover:text-inverse-fg focus-ring"
                    >
                      {question}
                      <ArrowUpRight
                        size={17}
                        strokeWidth={1.75}
                        aria-hidden="true"
                        className="shrink-0 text-inverse-fg/35 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-[1px] group-hover:text-accent-vivid"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
