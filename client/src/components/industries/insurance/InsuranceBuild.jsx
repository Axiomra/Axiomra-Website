import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { build } from "../../../data/insuranceData";

/**
 * The closing consultation band, and the page's shape-outside float.
 *
 * The shield floats right carrying a photograph, and the copy wraps along its
 * exact silhouette: `.ins-shape-shield` sets `shape-outside` and `clip-path` to
 * the same polygon, which is the whole trick — the painted edge and the wrap
 * boundary are literally the same coordinates, so the text follows the shape
 * rather than its bounding box, with `shape-margin` holding them apart.
 *
 * It floats only from `lg` up. Below that the shield returns to a plain block
 * above the copy, because a wrapped measure this narrow is unreadable and the
 * ragged edge moves at every breakpoint.
 *
 * The ground is the policy-paper wallpaper: a stucco photograph for grain, a
 * brand-tinted wash over it, and a faint actuarial rule on top.
 */
export default function InsuranceBuild() {
  const scope = useGsapReveal({ y: 28 });

  return (
    <section ref={scope} className="ins-texture relative isolate overflow-hidden py-28 md:py-36">
      {/* multiply reads the stucco grain on the light ground; over the dark ground it
          would flatten to black, so the dark theme screens a fainter pass instead. */}
      <img
        src={build.texture}
        alt=""
        aria-hidden="true"
        width={960}
        height={542}
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-40 mix-blend-multiply dark:opacity-[0.18] dark:mix-blend-screen"
      />
      <div aria-hidden="true" className="ins-grid-lines pointer-events-none absolute inset-0 -z-10" />

      {/* Loose crests, echoing the motif in the reference artwork. */}
      <span
        aria-hidden="true"
        className="clip-crest lg lg-sheen pointer-events-none absolute -left-8 top-20 hidden h-24 w-24 md:block"
      />
      <span
        aria-hidden="true"
        className="clip-crest lg lg-sheen pointer-events-none absolute bottom-24 left-20 hidden h-14 w-14 lg:block"
      />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <p
          data-reveal
          className="mb-5 font-mono text-sm uppercase tracking-[0.18em] text-accent"
        >
          {build.eyebrow}
        </p>

        {/* The float has to precede the text it shapes and share its block
            formatting context, so figure and copy are siblings here. */}
        <figure data-reveal className="ins-shape-shield relative mb-8 lg:mb-0">
          <img
            src={build.image}
            alt={build.alt}
            width={1000}
            height={1500}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-brand/15 to-brand/45"
          />
        </figure>

        <h2
          data-reveal
          className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-content md:text-4xl lg:text-5xl"
        >
          {build.title}
        </h2>
        {build.paragraphs.map((text) => (
          <p
            key={text}
            data-reveal
            className="mt-6 text-base leading-relaxed text-content-dim md:text-lg"
          >
            {text}
          </p>
        ))}

        <div data-reveal className="mt-9">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-cta-gradient py-2 pl-7 pr-2 text-base font-semibold text-inverse transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 focus-ring md:text-lg"
          >
            {build.ctaText}
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-inverse/15 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
              <ArrowUpRight size={19} aria-hidden="true" />
            </span>
          </Link>
        </div>

        {/* Ends the float's influence so the section's bottom padding is real. */}
        <div className="clear-both" />
      </div>
    </section>
  );
}
