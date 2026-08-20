import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { challenges } from "../../data/generativeAiData";

/**
 * Problem framing: photo left, four numbered pain points right.
 *
 * The four points are a numbered ladder rather than a card grid — they are read
 * in order (bottleneck → customers → speed → scale), and a grid would suggest
 * they are interchangeable.
 */
export default function GenAiChallenges() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto grid max-w-8xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="relative order-2 lg:order-1"
        >
          <div
            className="absolute -left-10 -top-10 h-44 w-44 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-xl2 border border-line shadow-card">
            <img
              src={challenges.image}
              alt={challenges.imageAlt}
              loading="lazy"
              className="h-80 w-full object-cover md:h-[32rem]"
            />
          </div>

          {/* Pulled out of the photo so the section carries one hard number. */}
          <div className="absolute -bottom-8 right-4 rounded-xl2 border border-line bg-surface-card px-6 py-5 shadow-card md:right-10">
            <span className="block font-display text-3xl font-semibold text-brand md:text-4xl">
              6–10 weeks
            </span>
            <span className="text-sm text-content-dim md:text-base">
              From first call to working pilot
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="order-1 lg:order-2"
        >
          <p className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
            {challenges.eyebrow}
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight md:text-5xl lg:text-[3.5rem]">
            <span className="text-brand">{challenges.titleAccent}</span>{" "}
            <span className="text-content">{challenges.titleLead}</span>
          </h2>
          <p className="copy-justify mt-6 text-lg leading-relaxed text-content-dim md:text-xl">
            {challenges.body}
          </p>

          <ol className="mt-10 space-y-6">
            {challenges.items.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex gap-5 border-l-2 border-line pl-6 transition-colors hover:border-brand"
              >
                <span
                  className="font-mono text-base font-semibold tabular-nums text-accent"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-content md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-content-dim md:text-lg">
                    {item.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <Link
            to="/contact"
            className="group mt-10 inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-4 text-base font-semibold transition-colors hover:border-brand/50 hover:text-brand focus-ring md:text-lg"
          >
            Request A Free Consultation
            <ArrowUpRight
              size={19}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
