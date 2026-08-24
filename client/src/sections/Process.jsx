import { motion } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const steps = [
  { title: "Discovery & AI Strategy", desc: "We analyze your data to identify high-impact use cases that solve specific business inefficiencies." },
  { title: "Data Engineering & Prototyping", desc: "We prepare your data for high-accuracy model training and build a functional prototype (MVP)." },
  { title: "Custom AI Engineering", desc: "Our in-house team develops the full system, integrating advanced models into your existing infrastructure." },
  { title: "Testing & Optimization", desc: "We conduct rigorous stress tests to ensure 99.9% reliability and performance across all environments." },
  { title: "Deployment & Continuous Growth", desc: "We launch your AI solution into production and provide ongoing support as your business scales." },
];

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <SectionHeading
        className="mb-16"
        eyebrow="How do we build?"
        title={
          <>
            A <span className="text-brand">Transparent Approach</span> To Complex AI Development
          </>
        }
        subtitle="Five stages, no black boxes. You see the plan, the data work, and the numbers at every step."
      />

      <div className="mx-auto max-w-5xl space-y-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ x: 6 }}
            className="group flex items-start gap-6 rounded-xl2 border border-line bg-surface-subtle p-8 transition-colors duration-300 hover:border-brand hover:bg-brand/5 hover:shadow-glow"
          >
            <div className="flex-1">
              <h3 className="mb-2 font-display text-xl text-content transition-colors duration-300 group-hover:text-brand">{s.title}</h3>
              <p className="max-w-3xl text-base leading-relaxed text-content-dim transition-colors duration-300 group-hover:text-content md:text-lg">{s.desc}</p>
            </div>
            <span
              className="shrink-0 font-display text-4xl font-semibold text-brand/40 transition-all duration-300 group-hover:scale-110 group-hover:text-accent"
              aria-hidden="true"
            >
              0{i + 1}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
