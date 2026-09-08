import { motion } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { journey } from "../../data/aboutData";

import teamImg from "../../assets/about/journey-team.webp";
import buildImg from "../../assets/about/journey-build.webp";
import researchImg from "../../assets/about/journey-data.webp";
import shipImg from "../../assets/about/journey-architecture.webp";

/* The mosaic stands in for the reference's team photo wall. */
const TILES = [
  { src: buildImg, alt: "Axiomra engineers pairing on a machine learning build" },
  { src: researchImg, alt: "Analytics dashboard from a data science review" },
  { src: shipImg, alt: "Architecture mapped out on a glass wall during planning" },
];

export default function AboutJourney() {
  return (
    <section id="journey" className="bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-8xl grid-cols-1 items-start gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow={journey.eyebrow}
            title={
              <>
                {journey.titleLead} <span className="text-brand">{journey.titleAccent}</span>
              </>
            }
          />

          <div className="mt-8 space-y-5">
            {journey.paragraphs.map((p, i) => (
              <motion.p
                key={p.slice(0, 32)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
                className="copy-justify text-lg leading-relaxed text-content-dim"
              >
                {p}
              </motion.p>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative lg:sticky lg:top-28"
        >
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-3 overflow-hidden rounded-xl2 border border-line shadow-card">
              <img
                src={teamImg}
                alt="The Axiomra team working together in the studio"
                loading="lazy"
                width={1400}
                height={900}
                className="h-64 w-full object-cover transition-transform duration-700 hover:scale-[1.03] sm:h-80"
              />
            </div>
            {TILES.map((t) => (
              <div key={t.src} className="overflow-hidden rounded-xl2 border border-line shadow-card">
                <img
                  src={t.src}
                  alt={t.alt}
                  loading="lazy"
                  className="h-28 w-full object-cover transition-transform duration-700 hover:scale-[1.05] sm:h-36"
                />
              </div>
            ))}
          </div>

          {/* Floating marker, the same trick the service heroes use. */}
          <div className="absolute -bottom-6 -left-4 hidden rounded-xl2 border border-line bg-surface-card px-5 py-4 shadow-card sm:block">
            <span className="block font-display text-2xl font-semibold text-brand">2021</span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-content-faint">
              Bootstrapped, still is
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
