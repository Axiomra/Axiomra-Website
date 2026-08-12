import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const posts = [
  { title: "MVP vs. Full-Scale Custom AI Development", tag: "Strategy" },
  { title: "Custom AI Development Timeline — 2026 Benchmarks", tag: "Process" },
  { title: "Why AI Projects Fail: 10 Root Causes", tag: "Insights" },
];

export default function Resources() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">Resources</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          Know What's <span className="text-periwinkle">Trending In AI</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {posts.map((p, i) => (
          <motion.a
            href="#"
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group rounded-xl2 overflow-hidden border border-mist shadow-card"
          >
            <div className="aspect-[16/10] bg-navy relative flex items-end p-5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-teal bg-teal/10 border border-teal/30 px-2.5 py-1 rounded-full">{p.tag}</span>
            </div>
            <div className="p-5 bg-white">
              <h3 className="font-display text-base leading-snug group-hover:text-periwinkle transition-colors">{p.title}</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-xs text-ink-faint">Read More <ArrowUpRight size={13} /></span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
