import { motion } from "framer-motion";
import { BrainCircuit, Handshake, ShieldCheck } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { coreValues } from "../../data/aboutData";

import growthImg from "../../assets/about/value-growth.webp";
import trustImg from "../../assets/about/value-trust.webp";
import ownershipImg from "../../assets/about/value-ownership.webp";

const ICONS = { brain: BrainCircuit, handshake: Handshake, ownership: ShieldCheck };

/* Each value gets a photo that carries the same idea as its copy. */
const MEDIA = {
  brain: { src: growthImg, alt: "A climber pushing for the summit at first light" },
  handshake: { src: trustImg, alt: "Two partners closing an agreement with a handshake" },
  ownership: { src: ownershipImg, alt: "A team owning a plan end to end at the board" },
};

export default function AboutValues() {
  return (
    <section id="values" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          align="left"
          eyebrow={coreValues.eyebrow}
          title={
            <>
              <span className="text-brand">{coreValues.titleAccent}</span> {coreValues.titleLead}
            </>
          }
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {coreValues.items.map((v, i) => {
            const Icon = ICONS[v.icon] ?? BrainCircuit;
            const media = MEDIA[v.icon] ?? MEDIA.brain;
            return (
              <motion.article
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="group overflow-hidden rounded-xl2 border border-line bg-surface-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-card"
              >
                <div className="overflow-hidden">
                  <img
                    src={media.src}
                    alt={media.alt}
                    loading="lazy"
                    width={900}
                    height={600}
                    className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-48"
                  />
                </div>

                <div className="p-8">
                  <span className="-mt-16 mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-surface-card text-brand shadow-card transition-colors group-hover:bg-brand group-hover:text-inverse-fg">
                    <Icon size={26} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-2xl font-semibold text-content">{v.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-content-dim">{v.body}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
