import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SectionHeading from "../SectionHeading";
import { paths } from "../../data/aboutData";

import automationImg from "../../assets/about/path-automation.webp";
import productImg from "../../assets/about/path-product.webp";

const IMAGES = [
  { src: automationImg, alt: "Operations staff moving through a warehouse that AI keeps in sync" },
  { src: productImg, alt: "A founder working on the dashboard of an AI SaaS product" },
];

export default function AboutPaths() {
  return (
    <section id="offer" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <SectionHeading
          align="left"
          eyebrow={paths.eyebrow}
          title={
            <>
              <span className="text-brand">{paths.titleAccent}</span> {paths.titleLead}
            </>
          }
          subtitle={paths.subtitle}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {paths.items.map((p, i) => {
            const brand = p.tone === "brand";
            return (
              <motion.article
                key={p.titleLead}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.12 }}
                className={`group flex flex-col overflow-hidden rounded-[2rem] ${
                  brand ? "bg-cta-gradient" : "bg-inverse"
                }`}
              >
                <div className="p-8 md:p-10">
                  <h3 className="font-display text-3xl font-semibold leading-tight text-inverse-fg md:text-4xl">
                    <span className={brand ? "text-inverse-fg" : "text-accent-vivid"}>
                      {p.titleAccent}
                    </span>{" "}
                    {p.titleLead}
                  </h3>
                  <p className="copy-justify mt-5 text-base leading-relaxed text-inverse-fg/80 md:text-lg">
                    {p.body}
                  </p>
                  <Link
                    to="/contact"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-inverse-fg px-7 py-3.5 text-base font-medium text-inverse transition-all hover:shadow-glow focus-ring"
                  >
                    {p.ctaText}
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>

                <div className="mt-auto overflow-hidden">
                  <img
                    src={IMAGES[i].src}
                    alt={IMAGES[i].alt}
                    loading="lazy"
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.04] md:h-64"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
