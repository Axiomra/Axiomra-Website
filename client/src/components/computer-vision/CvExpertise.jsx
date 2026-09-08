import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import CvMotif from "./CvMotif";
import { expertise } from "../../data/computerVisionData";

/** The seven capabilities, alternating left/right. */
export default function CvExpertise() {
  return (
    <section id="computer-vision-expertise" className="scroll-mt-24 bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          className="mb-16"
          align="left"
          eyebrow={expertise.eyebrow}
          title={
            <>
              <span className="text-brand">{expertise.titleAccent}</span> {expertise.titleLead}
            </>
          }
          subtitle={expertise.subtitle}
        />

        <div className="space-y-16 md:space-y-24">
          {expertise.items.map((item, i) => {
            const flipped = i % 2 === 1;
            return (
              <motion.article
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6 }}
                className="grid scroll-mt-28 grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative overflow-hidden rounded-xl2 border border-line bg-surface-inset lg:sticky lg:top-28 ${
                    flipped ? "lg:order-2" : ""
                  }`}
                >
                  {/* Hybrid frame: the photo grounds the capability in a real
                      scene, the wireframe on top shows what the model actually
                      returns. Rows without a photo fall back to the wireframe
                      on its own blueprint grid. */}
                  <div className="relative aspect-[400/280]">
                    {item.image && (
                      <>
                        <img
                          src={item.image}
                          alt={item.imageAlt ?? ""}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* Scrim: without it the thin brand strokes disappear
                            over bright or busy areas of the photo. */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-br from-inverse/70 via-inverse/45 to-inverse/70"
                        />
                      </>
                    )}
                    <div className="absolute inset-0">
                      <CvMotif variant={item.motif} showGrid={!item.image} />
                    </div>
                  </div>
                  <span className="absolute left-5 top-4 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-content-faint">
                    output · {item.motif}
                  </span>
                </div>

                <div className={flipped ? "lg:order-1" : ""}>
                  <span className="font-mono text-sm text-brand md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-3 font-display text-2xl font-semibold text-content md:text-[2rem]">
                    {item.title}
                  </h3>

                  <p className="mt-5 text-justify text-base leading-relaxed text-content-dim md:text-lg">
                    {item.body}
                  </p>

                  <ul className="mt-7 grid grid-cols-1 gap-2.5 border-t border-line pt-6 sm:grid-cols-2">
                    {item.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-sm text-content-dim md:text-base"
                      >
                        <ArrowRight
                          size={15}
                          className="mt-1.5 shrink-0 text-brand"
                          aria-hidden="true"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
