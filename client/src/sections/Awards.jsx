import clutchAi2023 from "../assets/certificates/clutch-ai-uae-2023.webp";
import clutchAi2024 from "../assets/certificates/clutch-ai-uae-2024.webp";
import clutchAi2025 from "../assets/certificates/clutch-ai-uae-2025.webp";
import clutchMl2025 from "../assets/certificates/clutch-ml-uae-2025.webp";
import corporateVision from "../assets/certificates/corporate-vision-2024.webp";
import globee from "../assets/certificates/globee-bronze-2024.webp";
import goodfirms from "../assets/certificates/goodfirms-mobile-app.webp";
import marfest from "../assets/certificates/marfest-nlp-uae.webp";
import techBehemoths from "../assets/certificates/tech-behemoths.webp";
import topfirms from "../assets/certificates/topfirms-web-dev.webp";
import truefirms from "../assets/certificates/truefirms-ai-uae-2023.webp";
import vendorland from "../assets/certificates/vendorland-ai-consulting-2025.webp";

// Every export is 320px tall with a transparent background, so the badges sit
// straight on the section. `ink` marks a plain black wordmark that is inverted
// in dark mode to stay readable. `w` is its natural width at that height, so each
// <img> reserves its exact box and the track never shifts as images decode.
// Ordered so the four near-identical Clutch hexagons never sit side by side.
const CERTIFICATES = [
  { src: clutchAi2025, w: 295, alt: "Clutch Top Artificial Intelligence Company, UAE 2025" },
  { src: globee, w: 319, alt: "Globee Awards 2024 Bronze Winner, Technology" },
  { src: vendorland, w: 288, alt: "Vendorland 2025 AI Consulting" },
  { src: clutchMl2025, w: 295, alt: "Clutch Top Machine Learning Company, UAE 2025" },
  { src: corporateVision, w: 316, alt: "Corporate Vision Technology Awards 2024" },
  { src: techBehemoths, w: 469, alt: "Axiomra as seen on Tech Behemoths", ink: true },
  { src: clutchAi2024, w: 297, alt: "Clutch Top Artificial Intelligence Company, UAE 2024" },
  { src: goodfirms, w: 355, alt: "GoodFirms Top Mobile App Development Company" },
  { src: marfest, w: 218, alt: "The Marfest Most Reviewed NLP Company, UAE" },
  { src: clutchAi2023, w: 298, alt: "Clutch Top Artificial Intelligence Company, UAE 2023" },
  { src: topfirms, w: 424, alt: "Top Firms Top Web Development Company" },
  { src: truefirms, w: 366, alt: "TrueFirms Top AI Companies, UAE 2023" },
];

/*
 * Certificates on an endless marquee. The track holds the list twice and
 * slides by exactly half its width, so the loop seam is invisible. Spacing is
 * padding on each item, never flex `gap`: a gap would leave the two halves one
 * gap apart and the loop would jump by that much every cycle.
 */
export default function Awards() {
  return (
    <section className="border-y border-line bg-surface-subtle py-14 md:py-16">
      <p className="mb-8 text-center font-mono text-sm uppercase tracking-[0.3em] text-content-dim">
        Recognised &amp; certified
      </p>

      <div
        className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <ul className="cert-marquee flex w-max">
          {[0, 1].map((copy) =>
            CERTIFICATES.map((c) => (
              <li
                key={`${copy}-${c.alt}`}
                aria-hidden={copy === 1}
                className="shrink-0 pr-8 md:pr-12"
              >
                <div className="flex h-36 items-center md:h-48">
                  <img
                    src={c.src}
                    alt={copy === 1 ? "" : c.alt}
                    width={c.w}
                    height={320}
                    decoding="async"
                    // eslint-disable-next-line react/no-unknown-property
                    fetchpriority="low"
                    draggable={false}
                    className={`h-full w-auto select-none drop-shadow-sm ${c.ink ? "dark:invert" : ""}`}
                  />
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
}
