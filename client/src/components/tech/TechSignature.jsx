import BrandIcon from "./BrandIcon";
import { signatureLogos } from "../../data/techStackData";

/**
 * The logo wall.
 *
 * Two copies of the same list scroll as one track, so the loop has no visible join at
 * exactly -50%. Marks keep their brand colours on white plates rather than
 * being flattened to a single tint, which is what the row is for.
 */
export default function TechSignature() {
  const track = [...signatureLogos, ...signatureLogos];

  return (
    <section className="border-y border-line bg-surface-subtle py-12 md:py-14">
      <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.2em] text-content-faint md:text-sm">
        Tools we build with every week
      </p>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        {/* Spacing lives on the items, not the track: with a container gap the
            -50% loop lands half a gap out of phase and the seam visibly jumps. */}
        <ul className="flex w-max animate-marquee items-center motion-reduce:animate-none">
          {track.map((logo, i) => (
            <li
              key={`${logo.slug}-${i}`}
              className="group/logo mr-4 flex items-center gap-3 rounded-full border border-line bg-surface-card py-2.5 pl-2.5 pr-5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5"
              aria-hidden={i >= signatureLogos.length ? "true" : undefined}
            >
              <BrandIcon name={logo.name} slug={logo.slug} size={22} tile />
              <span className="whitespace-nowrap text-sm font-medium text-content-dim transition-colors duration-500 group-hover/logo:text-content">
                {logo.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
