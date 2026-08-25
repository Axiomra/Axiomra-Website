import { motion, useReducedMotion } from "framer-motion";

/**
 * An animated process rail: horizontal on large screens, vertical on small.
 *
 * It renders one DOM tree for both orientations (the rails swap by media
 * query) so the steps are never duplicated in the markup for crawlers or
 * screen readers. The component is presentational: the parent owns
 * `activeIndex`, which lets the same rail drive an auto-playing loop, a
 * hash-linked deep link, or a plain click.
 */

const TONES = {
  dark: {
    rail: "bg-white/12",
    node: "border-white/15 bg-white/[0.06] text-white/70 group-hover:border-white/35",
    nodeActive: "border-accent-vivid/70 bg-accent-vivid/15 text-accent-vivid",
    index: "text-white/40",
    indexActive: "text-accent-vivid",
    title: "text-white/70",
    titleActive: "text-white",
    caption: "text-white/50",
    loop: "border-white/20 text-white/55",
    loopChip: "bg-inverse",
  },
  light: {
    rail: "bg-line",
    node: "border-line bg-surface-card text-content-faint group-hover:border-brand/60",
    nodeActive: "border-brand bg-brand/10 text-brand",
    index: "text-content-faint",
    indexActive: "text-brand",
    title: "text-content-dim",
    titleActive: "text-content",
    caption: "text-content-faint",
    loop: "border-line text-content-faint",
    loopChip: "bg-surface-subtle",
  },
};

export default function FlowTimeline({
  steps,
  activeIndex = 0,
  onSelect,
  idPrefix,
  panelId,
  tone = "dark",
  label = "Process steps",
  loopBackLabel,
  className = "",
}) {
  const reduced = useReducedMotion();
  const t = TONES[tone] ?? TONES.dark;
  const count = steps.length;
  // The rail must start and end at the centre of the first and last node,
  // which for an evenly split grid sits half a column in from each edge.
  const inset = `${50 / count}%`;
  const progress = count > 1 ? activeIndex / (count - 1) : 1;

  function handleKeyDown(event) {
    const next = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key];
    if (next === undefined && event.key !== "Home" && event.key !== "End") return;

    event.preventDefault();
    if (event.key === "Home") return onSelect?.(0);
    if (event.key === "End") return onSelect?.(count - 1);

    const target = (activeIndex + next + count) % count;
    onSelect?.(target);
    document.getElementById(`${idPrefix}-tab-${target}`)?.focus();
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loop-back arc: the point of the whole diagram is that it does not end. */}
      {loopBackLabel && (
        <div
          className="pointer-events-none absolute -top-10 hidden h-10 lg:block"
          style={{ left: inset, right: inset }}
          aria-hidden="true"
        >
          <div className={`h-full rounded-t-[2.5rem] border-x border-t border-dashed ${t.loop}`} />
          <span
            className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-dashed px-3 py-0.5 font-mono text-[0.7rem] uppercase tracking-[0.18em] ${t.loop} ${t.loopChip}`}
          >
            {loopBackLabel}
          </span>
        </div>
      )}

      {/* Horizontal rail, large screens. */}
      <div
        className={`absolute top-7 hidden h-px lg:block ${t.rail}`}
        style={{ left: inset, right: inset }}
        aria-hidden="true"
      >
        <motion.div
          className="h-full w-full origin-left bg-cta-gradient"
          initial={false}
          animate={{ scaleX: progress }}
          transition={{ duration: reduced ? 0 : 0.6, ease: "easeInOut" }}
        />
        {!reduced && (
          <motion.span
            className="absolute inset-0 block"
            animate={{ x: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.9, 1] }}
          >
            <span className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-vivid shadow-[0_0_12px_2px_rgba(20,216,196,0.7)]" />
          </motion.span>
        )}
      </div>

      <ol
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className="relative grid grid-cols-1 gap-8 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none lg:gap-0"
      >
        {steps.map((step, i) => {
          const active = i === activeIndex;
          const Icon = step.Icon;
          return (
            <li key={step.key} role="presentation" className="relative lg:px-3">
              {/* Connector, small screens: one segment per gap, so it always
                  ends on the next node rather than guessing at list height. */}
              {i < count - 1 && (
                <span
                  className={`absolute left-7 top-14 -bottom-8 w-px lg:hidden ${
                    i < activeIndex ? "bg-cta-gradient" : t.rail
                  }`}
                  aria-hidden="true"
                />
              )}

              <button
                type="button"
                role="tab"
                id={`${idPrefix}-tab-${i}`}
                aria-selected={active}
                aria-controls={panelId}
                tabIndex={active ? 0 : -1}
                onClick={() => onSelect?.(i)}
                className="group flex w-full items-start gap-5 text-left focus-ring lg:flex-col lg:items-center lg:gap-4 lg:text-center"
              >
                <span
                  className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                    active ? t.nodeActive : t.node
                  }`}
                >
                  {active && !reduced && (
                    <motion.span
                      layoutId={`${idPrefix}-halo`}
                      className="absolute -inset-[3px] rounded-full border border-accent-vivid/70"
                      transition={{ type: "spring", stiffness: 260, damping: 26 }}
                    />
                  )}
                  {active && !reduced && (
                    <motion.span
                      className="absolute -inset-[3px] rounded-full border border-accent-vivid/40"
                      animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                      aria-hidden="true"
                    />
                  )}
                  {Icon ? <Icon size={22} aria-hidden="true" /> : null}
                </span>

                <span className="min-w-0">
                  <span
                    className={`block font-mono text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${
                      active ? t.indexActive : t.index
                    }`}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`mt-1.5 block font-display text-xl font-semibold transition-colors md:text-2xl ${
                      active ? t.titleActive : t.title
                    }`}
                  >
                    {step.title}
                  </span>
                  {step.caption && (
                    <span className={`mt-1 block text-sm md:text-base ${t.caption}`}>{step.caption}</span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
