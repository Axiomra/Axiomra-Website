import { useReducedMotion } from "framer-motion";
import { clientLogos } from "../../data/aiDevelopmentData";

/**
 * Wordmark strip under the hero, running as a continuous marquee. The list is
 * rendered twice so the -50% loop lands on an identical frame; under
 * prefers-reduced-motion it collapses to a single static, wrapping row.
 */
export default function ClientLogoStrip() {
  const reduced = useReducedMotion();
  const names = reduced ? clientLogos : [...clientLogos, ...clientLogos];

  return (
    <section className="border-y border-line bg-surface-subtle py-10" aria-label="Clients we have built for">
      <div className={`relative ${reduced ? "" : "overflow-hidden"}`}>
        {!reduced && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-surface-subtle to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-surface-subtle to-transparent" />
          </>
        )}

        <ul
          className={
            reduced
              ? "mx-auto flex max-w-8xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6"
              : "flex w-max items-center gap-x-12 animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]"
          }
        >
          {names.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= clientLogos.length ? "true" : undefined}
              className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-content-faint transition-colors hover:text-content-dim md:text-2xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
