import { motion } from "framer-motion";
import { Star, ArrowUpRight } from "lucide-react";

const items = [
  { name: "Randel Griff", role: "CEO & Founder, Doozoo", stars: 4.5, quote: "Their advanced understanding and experience in AI and Machine Learning technology and understanding current trends and capabilities. All deliveries were on time and accurate." },
  { name: "Suleman Niazi", role: "CEO & Founder, Konnect", stars: 5, quote: "We've been impressed with the team. Working with them does not feel like we're dealing with a business; it feels like we're dealing with a group of people who want us to be successful." },
  { name: "David Milward", role: "Chairman of Metadataworks", stars: 5, quote: "Very knowledgeable, and the team did what they promised — no bullshit, just good solid working through the requirements and suggesting good solutions." },
];

export default function FoundersSay() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          <span className="text-periwinkle">What Founders Say</span> About Our AI Development Company
        </h2>
        <p className="mt-4 text-ink-dim">
          We specialize in breaking down complex problems and building robust AI systems.
          These stories highlight how we've reinvented business operations for our global partners.
        </p>
        <a href="#portfolio" className="mt-6 inline-flex items-center gap-2 border border-ink/15 rounded-full px-5 py-2.5 text-sm font-medium hover:bg-mist-50 transition-colors focus-ring">
          Get these results <ArrowUpRight size={15} />
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white border border-mist rounded-xl2 p-7 shadow-card"
          >
            <p className="text-ink-dim text-sm leading-relaxed mb-6">"{t.quote}"</p>
            <p className="font-display font-medium">{t.name}</p>
            <p className="text-xs text-ink-faint mb-3">{t.role}</p>
            <div className="flex text-gold">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} size={14} strokeWidth={0} fill="currentColor" opacity={idx < Math.floor(t.stars) ? 1 : 0.25} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
