import { clientLogos } from "../../data/aiDevelopmentData";

/** Wordmark strip under the hero. */
export default function ClientLogoStrip() {
  return (
    <section className="border-y border-line bg-surface-subtle py-10" aria-label="Clients we have built for">
      <div className="mx-auto flex max-w-8xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6">
        {clientLogos.map((name) => (
          <span
            key={name}
            className="font-display text-xl font-semibold tracking-tight text-content-faint transition-colors hover:text-content-dim md:text-2xl"
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}
