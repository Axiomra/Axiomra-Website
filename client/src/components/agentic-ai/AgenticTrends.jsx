import { motion } from "framer-motion";
import { trends } from "../../data/agenticAiData";

/** Three forward-looking shifts, as oversized numbered rows beside a sticky image. */
export default function AgenticTrends() {
  return (
    <section id="agentic-ai-trends" className="bg-surface-subtle py-20 md:py-28">
      <div className="mx-auto grid max-w-8xl grid-cols-1 gap-14 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-content-faint">
            {trends.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-[1.14] text-content sm:text-4xl md:text-5xl">
            <span className="text-brand">{trends.titleAccent}</span> {trends.titleLead}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-content-dim md:text-lg">
            {trends.body}
          </p>
          <motion.img
            src={trends.image}
            alt={trends.imageAlt}
            loading="lazy"
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="mt-10 h-60 w-full rounded-xl2 border border-line object-cover shadow-card md:h-72"
          />
        </div>

        <ol className="space-y-10 md:space-y-14">
          {trends.items.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-xl2 border border-line bg-surface-card p-8 md:p-10"
            >
              <span
                className="pointer-events-none absolute right-6 top-4 select-none font-display text-6xl font-semibold leading-none text-brand/10 md:text-8xl"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="relative max-w-md font-display text-2xl font-semibold leading-snug text-content md:text-3xl">
                {item.title}
              </h3>
              <p className="relative mt-5 text-base leading-relaxed text-content-dim md:text-lg">
                {item.body}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
