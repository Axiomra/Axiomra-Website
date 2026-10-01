import clutchAi2023 from "../assets/certificates/clutch-ai-uae-2023.webp";
import clutchAi2024 from "../assets/certificates/clutch-ai-uae-2024.webp";
import clutchAi2025 from "../assets/certificates/clutch-ai-uae-2025.webp";
import clutchMl2025 from "../assets/certificates/clutch-ml-uae-2025.webp";
import corporateVision from "../assets/certificates/corporate-vision-2024.webp";
import globee from "../assets/certificates/globee-bronze-2024.webp";
import marfest from "../assets/certificates/marfest-nlp-uae.webp";
import techBehemoths from "../assets/certificates/tech-behemoths.webp";
import topfirms from "../assets/certificates/topfirms-web-dev.webp";
import truefirms from "../assets/certificates/truefirms-ai-uae-2023.webp";
import vendorland from "../assets/certificates/vendorland-ai-consulting-2025.webp";
import clutchAi2023256 from "../assets/certificates/clutch-ai-uae-2023-256.webp";
import clutchAi2024256 from "../assets/certificates/clutch-ai-uae-2024-256.webp";
import clutchAi2025256 from "../assets/certificates/clutch-ai-uae-2025-256.webp";
import clutchMl2025256 from "../assets/certificates/clutch-ml-uae-2025-256.webp";
import corporateVision256 from "../assets/certificates/corporate-vision-2024-256.webp";
import globee256 from "../assets/certificates/globee-bronze-2024-256.webp";
import marfest256 from "../assets/certificates/marfest-nlp-uae-256.webp";
import topfirms256 from "../assets/certificates/topfirms-web-dev-256.webp";
import truefirms256 from "../assets/certificates/truefirms-ai-uae-2023-256.webp";
import vendorland256 from "../assets/certificates/vendorland-ai-consulting-2025-256.webp";

// Every export is 320px tall with a transparent background, so the badges sit
// straight on the section. `ink` marks a plain black wordmark that is inverted
// in dark mode to stay readable. `w` is its natural width at that height, so each
// <img> reserves its exact box and the track never shifts as images decode.
// Ordered so the four near-identical Clutch hexagons never sit side by side.
// `src256` is the same badge at 256px tall: enough for the 144px mobile row
// at 1.75x and the 192px desktop row at 1x; denser screens still get the
// 320px original through srcset. Tech Behemoths has none (it saves nothing).
const CERTIFICATES = [
  {
    src: clutchAi2025,
    src256: clutchAi2025256,
    w: 295,
    alt: "Clutch Top Artificial Intelligence Company, UAE 2025",
  },
  { src: globee, src256: globee256, w: 319, alt: "Globee Awards 2024 Bronze Winner, Technology" },
  { src: vendorland, src256: vendorland256, w: 288, alt: "Vendorland 2025 AI Consulting" },
  {
    src: clutchMl2025,
    src256: clutchMl2025256,
    w: 295,
    alt: "Clutch Top Machine Learning Company, UAE 2025",
  },
  {
    src: corporateVision,
    src256: corporateVision256,
    w: 316,
    alt: "Corporate Vision Technology Awards 2024",
  },
  { src: techBehemoths, w: 469, alt: "Axiomra as seen on Tech Behemoths", ink: true },
  {
    src: clutchAi2024,
    src256: clutchAi2024256,
    w: 297,
    alt: "Clutch Top Artificial Intelligence Company, UAE 2024",
  },
  { src: marfest, src256: marfest256, w: 218, alt: "The Marfest Most Reviewed NLP Company, UAE" },
  {
    src: clutchAi2023,
    src256: clutchAi2023256,
    w: 298,
    alt: "Clutch Top Artificial Intelligence Company, UAE 2023",
  },
  { src: topfirms, src256: topfirms256, w: 424, alt: "Top Firms Top Web Development Company" },
  { src: truefirms, src256: truefirms256, w: 366, alt: "TrueFirms Top AI Companies, UAE 2023" },
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
                    srcSet={
                      c.src256
                        ? `${c.src256} ${Math.round((c.w * 256) / 320)}w, ${c.src} ${c.w}w`
                        : undefined
                    }
                    sizes={`(min-width: 768px) ${Math.round((c.w * 192) / 320)}px, ${Math.round((c.w * 144) / 320)}px`}
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
