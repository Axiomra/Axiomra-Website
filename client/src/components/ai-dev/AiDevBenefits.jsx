import { motion } from "framer-motion";
import { Users, Sparkles, LifeBuoy } from "lucide-react";
import { benefits } from "../../data/aiDevelopmentData";

const icons = [Users, Sparkles, LifeBuoy];

/** Three engagement perks plus the delivery numbers that back them. */
export default function AiDevBenefits() {
  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="mx-auto max-w-8xl px-6">
        <p className="mb-4 text-center font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
          {benefits.eyebrow}
        </p>
        <h2 className="text-center font-display text-4xl font-semibold leading-[1.12] tracking-tight text-brand md:text-5xl lg:text-6xl">
          {benefits.title}
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {benefits.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.div
                key={item.titleRest}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-xl2 bg-assistant text-assistant-ink-soft">
                  <Icon size={28} aria-hidden="true" />
                </span>
                <h3 className="mt-7 font-display text-2xl font-semibold md:text-3xl">
                  <span className="text-brand">{item.titleAccent}</span>{" "}
                  <span className="text-content">{item.titleRest}</span>
                </h3>
                <div className="my-5 h-px bg-line" aria-hidden="true" />
                <p className="copy-justify text-lg leading-relaxed text-content-dim">{item.body}</p>
              </motion.div>
            );
          })}
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-10 border-t border-line pt-12 md:grid-cols-4">
          {benefits.stats.map((s) => (
            <div key={s.label} className="text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-5xl font-semibold text-content md:text-6xl">
                  {s.value}
                </span>
                <span className="mt-2 block text-lg text-content-dim">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
