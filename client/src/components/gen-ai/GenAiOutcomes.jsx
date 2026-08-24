import { motion } from "framer-motion";
import { outcomes } from "../../data/generativeAiData";

/** The payoff band: six outcomes, each led by the number, on dark. */
export default function GenAiOutcomes() {
  return (
    <section id="generative-ai-outcomes" className="relative overflow-hidden bg-inverse py-20 md:py-28">
      <img
        src={outcomes.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute right-0 top-0 h-full w-full object-cover opacity-[0.13] md:w-2/3"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--inverse))_25%,rgb(var(--inverse)/0.55)_70%,rgb(var(--inverse)/0.85))]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-8xl px-6">
        <div className="max-w-3xl">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-inverse-fg/55">
            {outcomes.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.15] text-inverse-fg sm:text-4xl md:text-5xl">
            <span className="text-gradient">{outcomes.titleAccent}</span> {outcomes.titleLead}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {outcomes.items.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-xl2 border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors hover:border-white/25 md:p-8"
            >
              <span
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="relative font-display text-4xl font-semibold text-gradient md:text-5xl">
                {item.value}
              </span>
              <h3 className="relative mt-4 font-display text-xl font-semibold text-inverse-fg md:text-2xl">
                {item.title}
              </h3>
              <p className="relative mt-3 text-base leading-relaxed text-inverse-fg/70">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
