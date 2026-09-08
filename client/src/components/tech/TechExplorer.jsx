import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../SectionHeading";
import BrandIcon from "./BrandIcon";
import { explorer, stackGroups } from "../../data/techStackData";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Scroll target id for a group. Kept in one place so the rail and the list agree. */
const anchorId = (id) => `stack-${id}`;

/**
 * The stack inventory, presented as a sticky index beside a long scrolling list.
 *
 * The motion here earns its place by doing wayfinding: nine dense groups is
 * enough content to get lost in, so the rail marks which layer you are reading
 * and how far through the section you are. GSAP owns every animation in this
 * subtree, deliberately, so nothing fights it for the same frames.
 */
export default function TechExplorer() {
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const progressRef = useRef(null);
  const [active, setActive] = useState(stackGroups[0].id);

  useLayoutEffect(() => {
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      // Wayfinding runs in both motion modes: it reports position, it does not animate.
      stackGroups.forEach((group) => {
        ScrollTrigger.create({
          trigger: `#${anchorId(group.id)}`,
          start: "top 45%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActive(group.id);
          },
        });
      });

      if (reduce) return;

      // Progress rail, scrubbed rather than tweened so it tracks the scrollbar exactly.
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 45%",
            end: "bottom 55%",
            scrub: 0.4,
          },
        }
      );

      // Set the from-state inside the layout effect so a no-JS or reduced-motion
      // render never leaves the list invisible.
      const groups = gsap.utils.toArray(".stack-group");
      gsap.set(groups, { opacity: 0, y: 40 });
      ScrollTrigger.batch(groups, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.09,
            ease: "power3.out",
          }),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const jumpTo = (id) => {
    const el = document.getElementById(anchorId(id));
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section ref={rootRef} id="stack" className="relative bg-surface py-24 md:py-32">
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          align="left"
          eyebrow={explorer.eyebrow}
          title={
            <>
              {explorer.titleLead} <span className="text-gradient">{explorer.titleAccent}</span>
            </>
          }
          subtitle={explorer.body}
        />

        {/* Mobile index: the sticky rail has nowhere to live below lg, so the
            same wayfinding becomes a scroll-snap strip under the navbar. */}
        <div className="sticky top-16 z-30 -mx-4 mt-12 border-y border-line bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
          <ul className="scrollbar-hide flex snap-x snap-mandatory gap-2 overflow-x-auto">
            {stackGroups.map((group) => (
              <li key={group.id} className="snap-start">
                <button
                  type="button"
                  onClick={() => jumpTo(group.id)}
                  aria-current={active === group.id ? "true" : undefined}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-colors duration-300 focus-ring ${
                    active === group.id
                      ? "border-transparent bg-inverse text-inverse-fg"
                      : "border-line bg-surface-card text-content-dim"
                  }`}
                >
                  {group.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Stack layers" className="sticky top-28">
              <div className="relative pl-6">
                {/* Track plus the scrubbed fill. Only transform animates. */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px bg-line"
                />
                <span
                  ref={progressRef}
                  aria-hidden="true"
                  className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-gradient-to-b from-accent-vivid to-brand"
                />
                <ul className="space-y-1">
                  {stackGroups.map((group) => {
                    const isActive = active === group.id;
                    return (
                      <li key={group.id}>
                        <button
                          type="button"
                          onClick={() => jumpTo(group.id)}
                          aria-current={isActive ? "true" : undefined}
                          className={`block w-full rounded-lg px-3 py-2 text-left text-base transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] focus-ring ${
                            isActive
                              ? "translate-x-1 font-medium text-content"
                              : "text-content-faint hover:translate-x-1 hover:text-content-dim"
                          }`}
                        >
                          {group.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>

          <div ref={listRef} className="space-y-8 lg:col-span-9">
            {stackGroups.map((group) => (
              <article
                key={group.id}
                id={anchorId(group.id)}
                className="stack-group scroll-mt-32 rounded-[2rem] border border-line bg-surface-subtle p-2"
              >
                {/* Inner core radius = outer radius minus the shell padding, so the
                    two curves stay concentric. */}
                <div className="rounded-[calc(2rem-0.5rem)] bg-surface-card p-7 shadow-[inset_0_1px_0_rgb(var(--on-inverse)/0.06)] md:p-10">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-content md:text-3xl">
                    {group.title}
                  </h3>
                  <p className="mt-3 max-w-[65ch] text-base leading-relaxed text-content-dim md:text-lg">
                    {group.description}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center gap-2.5 rounded-full border border-line bg-surface-inset py-1.5 pl-1.5 pr-4 text-sm text-content-dim transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-brand/45 hover:text-content"
                      >
                        <BrandIcon name={item.name} slug={item.slug} size={18} tile />
                        {item.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
