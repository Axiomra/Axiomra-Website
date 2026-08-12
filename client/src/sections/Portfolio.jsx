import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

const cases = [
  { name: "Konnect", tag: "AI-Based Recommendation Engine", stats: [["50X", "Match accuracy"], ["30%", "Filters automated"], ["1M+", "Users connected"]] },
  { name: "Doozoo", tag: "AI Graphic Design Automation", stats: [["90%", "Recipe accuracy"], ["40X", "Faster customization"], ["30s", "Delivery time"]] },
  { name: "FluentTalk AI", tag: "AI Language Tutor", stats: [["87%", "Learning automated"], ["80%", "Time saved"], ["21+", "Languages"]] },
  { name: "FN-AD", tag: "AI Fashion Brand Matching", stats: [["47%", "Productivity lift"], ["50%", "Lead conversion"], ["5.0", "Quality rating"]] },
  { name: "Pitchmark", tag: "AI Marketing Pitch Automation", stats: [["10X", "Report generation"], ["70%", "Fewer review edits"], ["10-15", "Pitches / day"]] },
];

export default function Portfolio() {
  const ref = useRef(null);
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 380, behavior: "smooth" });

  return (
    <section id="portfolio" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
        <div className="max-w-xl">
          <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">What have we built for businesses?</p>
          <h2 className="font-display font-semibold text-3xl md:text-4xl">
            Proven Results: <span className="text-periwinkle">How We Solve Complex Business Challenges</span>
          </h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll(-1)} className="p-2.5 rounded-full border border-ink/15 hover:bg-mist-50 focus-ring" aria-label="Previous"><ChevronLeft size={18} /></button>
          <button onClick={() => scroll(1)} className="p-2.5 rounded-full border border-ink/15 hover:bg-mist-50 focus-ring" aria-label="Next"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div ref={ref} className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x">
        {cases.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="min-w-[360px] snap-start bg-white border border-mist rounded-xl2 shadow-card p-7 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-display font-semibold text-xl">{c.name}</h3>
              <p className="text-sm text-ink-dim mb-6">{c.tag}</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {c.stats.map(([num, label]) => (
                  <div key={label} className="bg-mist-50 rounded-lg p-3 text-center">
                    <p className="font-display font-semibold text-periwinkle text-lg">{num}</p>
                    <p className="text-[11px] text-ink-faint mt-1 leading-tight">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <a href="#contact" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy hover:text-periwinkle transition-colors">
              Read Full Case Study <ArrowUpRight size={15} />
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
