import { clientLogos } from "../../data/aiDevelopmentData";

/**
 * Wordmark strip under the hero. Rendered as type rather than image assets so
 * it stays crisp in both themes and adds nothing to the bundle; swap each entry
 * for an <img> once real client logos are cleared for use.
 */
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
