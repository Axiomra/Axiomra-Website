import { motion } from "framer-motion";
import { Star } from "lucide-react";

const wall = [
  { name: "Adam Gawron", role: "Founder of Upstar", quote: "They communicated with me and we developed trust over the years. Project management is great — willingness to take any problem and get through it is impressive." },
  { name: "Abdullah", role: "CEO & Founder, Navex", quote: "Commendable work! Collaborated and communicated in a highly professional manner and delivered exactly what was asked in the desired time frame." },
  { name: "Susana Raj", role: "CEO & Founder, Minmini", quote: "Impressed with their dedication, exceeding expectations on scope. Prioritized quality, delivered on time, and communicated professionally throughout." },
  { name: "Andreas Remy", role: "CEO & Founder, NEONMONKI", quote: "Extremely impressed with the AI and automation expertise in automating our tagging system. Efficient communication made the experience exceptional." },
];

export default function TestimonialWall() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">Simply the best AI development partner</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          We Went From <span className="text-periwinkle">Operational Chaos To A Growth Machine</span> In Weeks
        </h2>
        <div className="mt-5 flex items-center justify-center gap-2 text-sm">
          <span className="flex text-gold">{[...Array(5)].map((_, i) => <Star key={i} size={14} strokeWidth={0} fill="currentColor" />)}</span>
          <span className="text-ink-dim">4.8/5 from 300+ companies</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {wall.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`rounded-xl2 p-7 border ${i % 3 === 2 ? "bg-navy text-white border-navy" : "bg-mist-50 border-mist"}`}
          >
            <p className={`text-sm leading-relaxed mb-6 ${i % 3 === 2 ? "text-white/80" : "text-ink-dim"}`}>"{t.quote}"</p>
            <p className="font-medium text-sm">{t.name}</p>
            <p className={`text-xs ${i % 3 === 2 ? "text-white/50" : "text-ink-faint"}`}>{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
