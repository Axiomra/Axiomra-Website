import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { challenges } from "../../data/agenticAiData";

/** The problem statement, framed as four named failure modes. */
export default function AgenticChallenges() {
  return (
    <section id="agentic-ai-challenges" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.18em] text-accent">
            <AlertTriangle size={15} aria-hidden="true" />
            {challenges.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.14] text-content sm:text-4xl md:text-5xl">
            <span className="text-brand">{challenges.titleAccent}</span>{" "}
            {challenges.titleLead}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-content-dim md:text-lg">
            {challenges.body}
          </p>

          <motion.img
            src={challenges.image}
            alt={challenges.imageAlt}
            loading="lazy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mt-10 h-64 w-full rounded-xl2 border border-line object-cover shadow-card md:h-80"
          />
        </div>

        <ol className="divide-y divide-line border-y border-line">
          {challenges.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex gap-6 py-8 md:gap-8 md:py-10"
            >
              <span className="shrink-0 font-mono text-sm text-brand/70 md:text-base">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold leading-snug text-content md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-content-dim md:text-lg">
                  {item.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
