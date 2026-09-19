import useGsapReveal from "../../../hooks/useGsapReveal";
import { pledge } from "../../../data/insuranceData";

/**
 * The pledge band, and the page's first shape-outside composition.
 *
 * Two mirrored wings float to either side of one short block of display copy,
 * each carrying a `shape-outside` polygon that pinches toward the middle. The
 * lines between them take the shape of a lens rather than a rectangle: the
 * shape-inside effect, built out of two shape-outside floats because
 * `shape-inside` still has no browser support worth shipping.
 *
 * Three deliberate limits, because an irregular measure is the fastest way to
 * make text unreadable:
 *   - the copy here is three display-scale statements, never body text;
 *   - the whole composition is gated behind `lg` in CSS, so below 1024px the
 *     floats are `display: none` and the copy returns to a plain column;
 *   - the wings are `aria-hidden`, since they carry no meaning to read.
 */
export default function InsurancePledge() {
  const scope = useGsapReveal({ y: 26 });

  return (
    <section
      ref={scope}
      data-nav-tone="dark"
      className="relative isolate overflow-hidden border-y border-inverse-fg/10 bg-inverse py-24 md:py-32"
    >
      <div aria-hidden="true" className="ins-liquid pointer-events-none absolute inset-0 -z-10 opacity-60" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-inverse via-inverse/70 to-inverse"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p
          data-reveal
          className="lg lg-dark lg-soft lg-sheen mx-auto mb-12 block w-fit rounded-full px-5 py-2 text-center font-mono text-sm uppercase tracking-[0.18em] text-accent-vivid"
        >
          {pledge.eyebrow}
        </p>

        {/* The floats must precede the text they shape, and must live in the
            same block formatting context, hence both wings before the copy. */}
        <div
          aria-hidden="true"
          className="ins-wing ins-wing-left lg lg-dark lg-sheen"
        />
        <div
          aria-hidden="true"
          className="ins-wing ins-wing-right lg lg-dark lg-sheen"
        />

        <div data-reveal className="text-center lg:text-balance">
          {pledge.lines.map((line) => (
            <p
              key={line.slice(0, 32)}
              className="mb-6 font-display text-2xl font-semibold leading-[1.3] tracking-tight text-inverse-fg last:mb-0 md:text-3xl"
            >
              {line}
            </p>
          ))}

          <p className="clear-both pt-14 font-mono text-sm uppercase tracking-[0.18em] text-inverse-fg/50">
            {pledge.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
