import { motion } from "framer-motion";
import { industriesBand } from "../../data/generativeAiData";

/**
 * Industry coverage as a single scannable band.
 *
 * The AI Development page already carries an industry tab panel; repeating it
 * here would cost a click for information that fits in one glance.
 */
export default function GenAiIndustries() {
  return (
    <section id="generative-ai-industries" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto max-w-8xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-content-faint">
              {industriesBand.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.15] text-content sm:text-4xl md:text-5xl">
              <span className="text-brand">{industriesBand.titleAccent}</span>{" "}
              {industriesBand.titleLead}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-content-dim md:text-lg">
              {industriesBand.body}
            </p>

            <ul className="mt-9 flex flex-wrap gap-3">
              {industriesBand.names.map((name, i) => (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="rounded-full border border-line bg-surface-card px-5 py-2.5 text-base text-content-dim transition-colors hover:border-brand/50 hover:text-brand"
                >
                  {name}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
            <motion.img
              src={industriesBand.image}
              alt={industriesBand.imageAlt}
              loading="lazy"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5 }}
              className="h-64 w-full rounded-xl2 object-cover shadow-card sm:h-[22rem]"
            />
            <motion.img
              src={industriesBand.horizonImage}
              alt={industriesBand.horizonImageAlt}
              loading="lazy"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="h-64 w-full rounded-xl2 object-cover shadow-card sm:mt-12 sm:h-[22rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
