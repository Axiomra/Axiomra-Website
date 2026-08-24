import { modelMarquee } from "../../data/generativeAiData";

/** Foundation-model ticker under the hero. */
export default function GenAiModelBar() {
  return (
    <section
      className="border-y border-line bg-surface-subtle py-6"
      aria-label="Foundation models we build on"
    >
      <div className="mx-auto flex max-w-8xl flex-col gap-4 px-6 md:flex-row md:items-center md:gap-10">
        <p className="shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-content-faint md:text-sm">
          Models we build on
        </p>

        <div
          className="group flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max animate-marquee items-center gap-4 group-hover:[animation-play-state:paused]">
            {[...modelMarquee, ...modelMarquee].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap rounded-full border border-line bg-surface-card px-5 py-2 font-mono text-sm text-content-dim md:text-base"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
