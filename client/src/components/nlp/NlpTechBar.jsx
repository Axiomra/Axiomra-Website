import { frameworkBar } from "../../data/nlpData";

/** The trust strip directly under the hero. */
export default function NlpTechBar() {
  // Rendered twice so the -50% keyframe loops seamlessly.
  const track = [...frameworkBar.items, ...frameworkBar.items];

  return (
    <section className="border-y border-line bg-surface-subtle py-8 md:py-10">
      <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-content-faint md:text-sm">
        {frameworkBar.label}
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
        }}
      >
        <ul className="flex w-max animate-marquee items-center gap-14 pr-14 motion-reduce:animate-none">
          {track.map((name, i) => (
            <li
              key={`${name}-${i}`}
              aria-hidden={i >= frameworkBar.items.length}
              className="whitespace-nowrap font-display text-xl font-semibold text-content-dim md:text-2xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
