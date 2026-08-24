import { frameworkMarquee } from "../../data/agenticAiData";

/** Framework ticker under the hero. */
export default function AgenticFrameworkBar() {
  return (
    <section
      className="border-b border-line bg-surface py-6"
      aria-label="Agent frameworks and runtimes we build on"
    >
      <div className="mx-auto flex max-w-8xl flex-col gap-4 px-6 md:flex-row md:items-center md:gap-10">
        <p className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-content-faint md:text-sm">
          Frameworks &amp; runtimes
        </p>

        <div
          className="group flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee-rev items-center gap-8 group-hover:[animation-play-state:paused]">
            {[...frameworkMarquee, ...frameworkMarquee].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="flex items-center gap-8 whitespace-nowrap font-display text-lg font-medium text-content-dim md:text-xl"
              >
                {name}
                <span className="h-1.5 w-1.5 rounded-full bg-brand/50" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
