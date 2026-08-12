import { motion } from "framer-motion";

const steps = [
  { title: "Discovery & AI Strategy", desc: "We analyze your data to identify high-impact use cases that solve specific business inefficiencies." },
  { title: "Data Engineering & Prototyping", desc: "We prepare your data for high-accuracy model training and build a functional prototype (MVP)." },
  { title: "Custom AI Engineering", desc: "Our in-house team develops the full system, integrating advanced models into your existing infrastructure." },
  { title: "Testing & Optimization", desc: "We conduct rigorous stress tests to ensure 99.9% reliability and performance across all environments." },
  { title: "Deployment & Continuous Growth", desc: "We launch your AI solution into production and provide ongoing support as your business scales." },
];

export default function Process() {
  return (
    <section id="process" className="max-w-5xl mx-auto px-6 py-24">
      <div className="max-w-xl mb-16">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">How do we build?</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          A <span className="text-periwinkle">Transparent Approach</span> To Complex AI Development
        </h2>
      </div>

      <div className="space-y-5">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex items-start gap-6 bg-mist-50 border border-mist rounded-xl2 p-7"
          >
            <div className="flex-1">
              <h3 className="font-display text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-ink-dim leading-relaxed max-w-2xl">{s.desc}</p>
            </div>
            <span className="font-display font-semibold text-3xl text-periwinkle/40 shrink-0">
              0{i + 1}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
