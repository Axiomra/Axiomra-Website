import { ShoppingBag } from "lucide-react";
import useGsapReveal from "../../../hooks/useGsapReveal";
import { intro } from "../../../data/retailData";

/**
 * The standfirst. Copy on the left, photograph on the right under the price-tag
 * clip, with a frosted figure caption lifted over its lower corner.
 *
 * The decorative disc in the first paragraph is a float with
 * `shape-outside: circle(50%)`, so the text curves around it rather than
 * clearing a rectangle. It is confined to this one lead-in block: wrapped copy
 * is expensive to keep readable, and below 768px the float is switched off in
 * CSS and the disc simply centres above the text.
 */
export default function RetailIntro() {
  const scope = useGsapReveal({ y: 28 });

  return (
    <section ref={scope} className="relative overflow-hidden bg-surface py-24 md:py-32">
      <div aria-hidden="true" className="retail-bloom opacity-40" />

      <div className="relative mx-auto grid max-w-8xl grid-cols-1 items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-6">
          <h2
            data-reveal
            className="font-display text-3xl font-semibold leading-[1.1] tracking-tight text-content md:text-4xl lg:text-5xl"
          >
            {intro.titleLead} <span className="text-gradient">{intro.titleAccent}</span>
          </h2>

          <div data-reveal className="mt-8">
            {/* Decorative float: the wrap contour and the painted disc are the
                same circle, so the gap you see is exactly `shape-margin`. */}
            <span
              aria-hidden="true"
              className="shape-orb flex items-center justify-center bg-cta-gradient text-inverse shadow-glow"
            >
              <ShoppingBag size={64} strokeWidth={1} />
            </span>
            <p className="text-base leading-relaxed text-content-dim md:text-lg">{intro.paragraphs[0]}</p>
          </div>

          <p data-reveal className="mt-6 text-base leading-relaxed text-content-dim md:text-lg">
            {intro.paragraphs[1]}
          </p>

          <dl data-reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {intro.highlights.map((item) => (
              <div key={item.label} className="liquid-glass rounded-2xl px-6 py-5">
                <dt className="font-display text-2xl font-semibold tracking-tight text-content">
                  {item.value}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed text-content-dim">{item.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <figure data-reveal className="relative lg:col-span-6">
          <img
            src={intro.image}
            alt={intro.alt}
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            className="clip-tag-alt aspect-[4/3] w-full object-cover"
          />
          <figcaption className="liquid-glass absolute bottom-6 left-6 max-w-xs rounded-2xl px-5 py-4 text-sm leading-relaxed text-content">
            One inventory truth behind e-commerce, marketplace, POS and fulfilment.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
