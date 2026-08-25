import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Brain, Check, Pause, Play, Radar, RefreshCw, Zap } from "lucide-react";

import FlowTimeline from "../motion/FlowTimeline";
import { Reveal, Stagger, StaggerItem } from "../motion/Reveal";
import { workflow } from "../../data/agenticAiData";

const STAGE_ICONS = { perceive: Radar, reason: Brain, act: Zap, learn: RefreshCw };

const ADVANCE_MS = 5200;
const ID = "agentic-workflow";

/**
 * The agent loop as a flow diagram: an auto-advancing rail with a detail panel
 * underneath. Autoplay is a convenience, never the only way in, so the rail is
 * a real tablist and the panel is reachable by keyboard alone. It pauses on
 * hover, on focus, when the tab is hidden, and permanently once the visitor
 * takes control, so it never fights someone who is reading.
 */
export default function AgenticWorkflow() {
  const reduced = useReducedMotion();
  const stages = workflow.stages;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Autoplay is opt-out for everyone and off from the start under reduced motion.
  const [playing, setPlaying] = useState(!reduced);
  const shellRef = useRef(null);

  const select = useCallback((index) => {
    setActive(index);
    setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || paused || reduced) return;

    const id = window.setInterval(
      () => setActive((i) => (i + 1) % stages.length),
      ADVANCE_MS
    );
    return () => window.clearInterval(id);
  }, [playing, paused, reduced, stages.length]);

  // A timer that keeps ticking in a background tab wastes work and lands the
  // visitor on a stage they never watched advance.
  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  const stage = stages[active];
  const steps = stages.map((s) => ({ ...s, Icon: STAGE_ICONS[s.key] ?? Brain }));

  return (
    <section
      id={ID}
      data-nav-tone="dark"
      className="relative overflow-hidden bg-inverse py-20 md:py-28"
    >
      {/* CSS-only backdrop: this band sits between two WebGL sections already,
          and a third render loop is not worth the frame budget. */}
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.35]" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 tech-aurora opacity-40" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent-vivid md:text-base">
              {workflow.eyebrow}
            </p>
            <h2 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white md:text-5xl lg:text-[3.4rem]">
              <span className="text-gradient">{workflow.titleAccent}</span>{" "}
              {workflow.titleLead}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
              {workflow.body}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white/60 md:text-sm">
              {workflow.scenario}
            </p>
          </Reveal>

          <Reveal from="scale" delay={0.1} className="relative">
            <figure className="relative overflow-hidden rounded-xl2 border border-white/12 bg-inverse-card shadow-card">
              <img
                src={workflow.image}
                alt={workflow.imageAlt}
                loading="lazy"
                decoding="async"
                width={460}
                height={400}
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/80 via-transparent to-transparent"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 px-6 py-4 font-mono text-xs uppercase tracking-[0.16em] text-accent-vivid">
                {workflow.imageCaption}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div
          ref={shellRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!shellRef.current?.contains(e.relatedTarget)) setPaused(false);
          }}
          className="mt-16 md:mt-20"
        >
          <Reveal>
            <FlowTimeline
              steps={steps}
              activeIndex={active}
              onSelect={select}
              idPrefix={ID}
              panelId={`${ID}-panel`}
              tone="dark"
              label="Stages of the agent loop"
              loopBackLabel={workflow.loopBackLabel}
              className="lg:mt-14"
            />
          </Reveal>

          <div
            id={`${ID}-panel`}
            role="tabpanel"
            aria-labelledby={`${ID}-tab-${active}`}
            className="relative mt-12 overflow-hidden rounded-xl2 border border-white/12 bg-white/[0.04] p-8 backdrop-blur-sm md:mt-14 md:p-12"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={stage.key}
                initial={reduced ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14"
              >
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white md:text-3xl">
                    {stage.title}
                    <span className="ml-3 font-body text-base font-normal text-accent-vivid md:text-lg">
                      {stage.caption}
                    </span>
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                    {stage.body}
                  </p>

                  <Stagger as="ul" className="mt-8 grid grid-cols-1 gap-3" margin="0px">
                    {stage.points.map((point) => (
                      <StaggerItem
                        as="li"
                        key={point}
                        className="flex items-start gap-3 text-sm text-white/70 md:text-base"
                      >
                        <Check size={16} className="mt-1 shrink-0 text-accent-vivid" aria-hidden="true" />
                        {point}
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>

                {/* The trace panel: the same evidence trail the audit story rests on. */}
                <div className="overflow-hidden rounded-xl2 border border-white/10 bg-inverse/70">
                  <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/20" aria-hidden="true" />
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-vivid/60" aria-hidden="true" />
                    <span className="ml-2 font-mono text-xs uppercase tracking-[0.16em] text-white/45">
                      agent trace
                    </span>
                  </div>
                  <div className="overflow-x-auto px-5 py-6">
                    <pre className="font-mono text-xs leading-relaxed text-white/75 md:text-sm">
                      {stage.trace.map((line) => (
                        <span key={line} className="block whitespace-pre">
                          <span className="text-accent-vivid">› </span>
                          {line}
                        </span>
                      ))}
                    </pre>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {!reduced && (
            <div className="mt-6 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-ring"
              >
                {playing ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
                {playing ? "Pause walkthrough" : "Play walkthrough"}
              </button>
            </div>
          )}
        </div>

        <Reveal
          as="p"
          delay={0.1}
          className="mx-auto mt-14 max-w-4xl text-center text-base leading-relaxed text-white/60 md:text-lg"
        >
          {workflow.footnote}
        </Reveal>
      </div>
    </section>
  );
}
