import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { vision, mission } from "../../data/aboutData";

import visionImg from "../../assets/about/vision-explainable.webp";
import missionImg from "../../assets/about/mission-automation.webp";

/**
 * Vision and mission, mirrored left/right like the reference.
 *
 * These panels used to run a three.js canvas each. Two extra WebGL contexts on a
 * page that already has one in the hero cost more than they gave, so each block
 * now carries a photo of the thing the copy is actually about, on the same dark
 * plate with the label kept.
 */
function PhotoPanel({ src, alt, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="group relative aspect-square w-full overflow-hidden rounded-[2rem] border border-line bg-inverse shadow-card"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={1100}
        height={1100}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-inverse/85 via-inverse/10 to-transparent" />
      <span className="pointer-events-none absolute bottom-5 left-6 font-mono text-xs uppercase tracking-[0.2em] text-inverse-fg/70">
        {label}
      </span>
    </motion.div>
  );
}

function Copy({ block, cta, outline = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
        {block.eyebrow}
      </p>
      <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-content md:text-5xl">
        {outline ? (
          <>
            <span className="text-brand">{block.titleLead}</span> {block.titleAccent}
          </>
        ) : (
          <>
            {block.titleLead} <span className="text-brand">{block.titleAccent}</span>
          </>
        )}
      </h2>
      <p className="copy-justify mt-6 max-w-2xl text-lg leading-relaxed text-content-dim">
        {block.body}
      </p>

      <Link
        to="/contact"
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-9 inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-base font-medium text-content transition-colors hover:border-brand hover:text-brand focus-ring"
      >
        {cta}
        <ArrowUpRight
          size={18}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </motion.div>
  );
}

export default function AboutVisionMission() {
  return (
    <section id="vision" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto flex max-w-8xl flex-col gap-20 px-6 md:gap-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Copy block={vision} cta={vision.ctaText} />
          <PhotoPanel
            src={visionImg}
            alt="Two people auditing the numbers behind a model's output"
            label="Explainable by design"
          />
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <PhotoPanel
            src={missionImg}
            alt="A robotic arm running an automated production line"
            label="Automation at scale"
          />
          <Copy block={mission} cta={mission.ctaText} outline />
        </div>
      </div>
    </section>
  );
}
