import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import SectionHeading from "../SectionHeading";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { services } from "../../data/agenticAiData";

const ID = "agentic-ai-capabilities";

/**
 * The eight delivery layers, as a stack explorer rather than a wall of eight
 * tall cards: an index rail on the left, one detail panel on the right.
 *
 * Every panel stays in the DOM, stacked into a single grid cell, for three
 * reasons: the copy is the SEO payload of this page, the container settles at
 * the height of the tallest panel so switching layers never shifts the page,
 * and the inactive panels cost nothing but text. Images are the exception,
 * they are only given a `src` once their layer has been opened.
 */
/** Layer targeted by the current URL hash, so deep links open the right panel. */
function indexFromHash() {
  const hash = typeof window === "undefined" ? "" : window.location.hash.slice(1);
  const found = services.items.findIndex((item) => item.id === hash);
  return found < 0 ? 0 : found;
}

export default function AgenticServices() {
  const reduced = useReducedMotion();
  const items = services.items;

  // Starts on the first layer, as the prerendered HTML does; a deep-linked
  // layer is opened after hydration (below), since React would not patch the
  // mismatched attributes.
  const [active, setActive] = useState(0);
  // Only fetch the artwork for layers the visitor has actually opened, so the
  // section costs one image on load instead of eight.
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const panelRef = useRef(null);

  useEffect(() => {
    const index = indexFromHash();
    if (!index) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one render after hydration
    setActive(index);
    setLoaded((seen) => new Set(seen).add(index));
  }, []);

  const select = useCallback(
    (index, { scrollIntoView = false } = {}) => {
      setActive(index);
      setLoaded((seen) => (seen.has(index) ? seen : new Set(seen).add(index)));
      // On small screens the panel sits below the rail, so a tap near the bottom
      // of a long list would otherwise update something off screen.
      if (scrollIntoView && window.matchMedia("(max-width: 1023px)").matches) {
        panelRef.current?.scrollIntoView({
          behavior: reduced ? "auto" : "smooth",
          block: "nearest",
        });
      }
    },
    [reduced]
  );

  // Deep links: /…/agentic-ai-services#rag-as-a-service opens that layer. The
  // first one is handled by the mount effect above; this catches the rest.
  useEffect(() => {
    const onHashChange = () => select(indexFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [select]);

  function handleKeyDown(event) {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
    if (step === undefined && event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    const next =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? items.length - 1
          : (active + step + items.length) % items.length;

    select(next);
    document.getElementById(`${ID}-tab-${next}`)?.focus();
  }

  return (
    <section id={ID} className="relative overflow-hidden bg-surface py-20 md:py-28">
      <div
        className="pointer-events-none absolute -left-40 top-24 h-[34rem] w-[34rem] rounded-full bg-brand/10 blur-[150px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-14 md:mb-16"
          align="left"
          eyebrow={services.eyebrow}
          title={
            <>
              <span className="text-brand">{services.titleAccent}</span> {services.titleLead}
            </>
          }
          subtitle={services.subtitle}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)] lg:gap-14">
          {/* Index rail. Sticky on desktop so the panel can be tall without
              stranding the list above the fold. */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-content-faint">
              {String(items.length).padStart(2, "0")} delivery layers
            </p>

            <Stagger
              as="ol"
              role="tablist"
              aria-label="Agentic AI delivery layers"
              aria-orientation="vertical"
              onKeyDown={handleKeyDown}
              step={0.05}
              className="border-t border-line"
            >
              {items.map((item, i) => {
                const isActive = i === active;
                return (
                  <StaggerItem
                    as="li"
                    key={item.id}
                    from="left"
                    role="presentation"
                    className="border-b border-line"
                  >
                    <button
                      type="button"
                      role="tab"
                      id={`${ID}-tab-${i}`}
                      aria-selected={isActive}
                      aria-controls={`${ID}-panel`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => select(i, { scrollIntoView: true })}
                      className="group relative flex w-full items-center gap-4 py-4 pl-4 pr-3 text-left transition-colors focus-ring hover:bg-surface-subtle"
                    >
                      {isActive &&
                        (reduced ? (
                          <span
                            className="absolute inset-y-0 left-0 w-[3px] bg-cta-gradient"
                            aria-hidden="true"
                          />
                        ) : (
                          <motion.span
                            layoutId={`${ID}-marker`}
                            className="absolute inset-y-0 left-0 w-[3px] bg-cta-gradient"
                            transition={{ type: "spring", stiffness: 320, damping: 30 }}
                            aria-hidden="true"
                          />
                        ))}

                      <span
                        className={`font-mono text-sm tabular-nums transition-colors ${
                          isActive ? "text-brand" : "text-content-faint"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-display text-lg font-semibold leading-snug transition-colors md:text-xl ${
                          isActive ? "text-content" : "text-content-dim group-hover:text-content"
                        }`}
                      >
                        {item.title}
                      </span>
                      <ArrowRight
                        size={17}
                        aria-hidden="true"
                        className={`shrink-0 transition-all duration-300 ${
                          isActive
                            ? "translate-x-0 text-brand opacity-100"
                            : "-translate-x-1 text-content-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        }`}
                      />
                    </button>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>

          {/* Panel stack. All eight live here, one on top of the other. */}
          <Reveal
            from="scale"
            className="relative grid rounded-xl2 bg-cta-gradient p-px"
            id={`${ID}-panel`}
            role="tabpanel"
            aria-labelledby={`${ID}-tab-${active}`}
            ref={panelRef}
          >
            {items.map((item, i) => {
              const isActive = i === active;
              return (
                <motion.article
                  key={item.id}
                  id={item.id}
                  aria-hidden={!isActive}
                  initial={false}
                  animate={
                    reduced
                      ? { opacity: isActive ? 1 : 0 }
                      : { opacity: isActive ? 1 : 0, y: isActive ? 0 : 14 }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`col-start-1 row-start-1 scroll-mt-28 overflow-hidden rounded-[calc(1.25rem-1px)] bg-surface-card ${
                    isActive ? "" : "pointer-events-none invisible"
                  }`}
                >
                  <div className="relative aspect-[16/7] overflow-hidden md:aspect-[16/6]">
                    {loaded.has(i) && (
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    )}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/15 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute left-6 top-5 rounded-full bg-inverse/60 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      Layer {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="p-8 md:p-11">
                    <h3 className="font-display text-2xl font-semibold leading-snug text-content md:text-[2rem]">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-base leading-relaxed text-content-dim md:text-lg">
                      {item.body}
                    </p>

                    <ul className="mt-8 grid grid-cols-1 gap-3 border-t border-line pt-7 sm:grid-cols-2 sm:gap-x-8">
                      {item.bullets.map((bullet, bulletIndex) => (
                        <motion.li
                          key={bullet}
                          initial={false}
                          animate={
                            reduced || !isActive
                              ? { opacity: 1, x: 0 }
                              : { opacity: [0, 1], x: [10, 0] }
                          }
                          transition={{ duration: 0.35, delay: 0.1 + bulletIndex * 0.06 }}
                          className="flex items-start gap-2.5 text-sm text-content-dim md:text-base"
                        >
                          <Check
                            size={16}
                            className="mt-1 shrink-0 text-brand"
                            aria-hidden="true"
                          />
                          {bullet}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
