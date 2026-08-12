import { motion } from "framer-motion";
import { Play, Star } from "lucide-react";

const cards = [
  { video: true, name: "Faisal Huq", role: "CEO & Founder, FormOle", quote: "Strong software development skills and knowledge of industry tools, and AI Video. Their willingness to take any problem, break it down, and get through it is impressive." },
  { video: false, name: "Pablo Sanchez", role: "CEO of AI Project Management Tool", quote: "Excellent service! The team planned the project really well, keeping me in the loop throughout with fluid, professional conversation." },
  { video: true, name: "Shefket Robellie", role: "CEO & Founder, Voltox", quote: "" },
  { video: false, name: "Shefket Robellie", role: "CEO & Founder, Voltox", quote: "I love their teamwork and communication. Always friendly and motivated, which has given us a great journey. They're experts in what we need." },
];

export default function VideoTestimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-6">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">When we say we deliver ROI, we mean it</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          See What Leaders <span className="text-periwinkle">With 10+ Years Of Experience</span> Have To Say
        </h2>
        <div className="mt-5 flex items-center justify-center gap-2 text-sm">
          <span className="flex text-gold">{[...Array(5)].map((_, i) => <Star key={i} size={14} strokeWidth={0} fill="currentColor" />)}</span>
          <span className="text-ink-dim">4.8/5 from 300+ companies</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {c.video ? (
              <div className="aspect-[4/3] rounded-xl2 bg-gradient-to-br from-navy to-periwinkle-dark relative flex items-center justify-center group cursor-pointer overflow-hidden">
                <motion.div whileHover={{ scale: 1.1 }} className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={20} className="text-navy ml-0.5" fill="currentColor" />
                </motion.div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white font-medium text-sm">{c.name}</p>
                  <p className="text-white/70 text-xs">{c.role}</p>
                </div>
              </div>
            ) : (
              <div className="h-full bg-mist-50 border border-mist rounded-xl2 p-6 flex flex-col justify-between min-h-[220px]">
                <p className="text-sm text-ink-dim leading-relaxed">"{c.quote}"</p>
                <div className="mt-4">
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-ink-faint">{c.role}</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
