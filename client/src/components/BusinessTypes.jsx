import { motion } from "framer-motion";

const types = [
  {
    name: "Startups",
    desc: "We help startups validate ideas and build MVPs that scale. Our team guides founders through the entire journey, enabling faster iteration and confident growth from day one.",
  },
  {
    name: "Scale-ups",
    desc: "Growth creates new opportunities and challenges. As a hands-on AI development partner, we help scale-ups integrate AI and ML to boost efficiency, optimize operations, and expand into new markets.",
  },
  {
    name: "Small & Medium Businesses",
    desc: "SMBs often face outdated systems, architectural bottlenecks, and constant pressure to modernize. Our AI and machine learning services deliver solutions that improve competitiveness and fuel sustainable growth.",
  },
  {
    name: "Enterprises",
    desc: "We partner with enterprises to design and implement enterprise-grade AI-powered solutions. Our comprehensive AI and ML services drive innovation, efficiency, and scalability across departments.",
  },
];

export default function BusinessTypes() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">Who benefits from our expertise?</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          Explore The <span className="text-periwinkle">Range Of Businesses</span> We Can Work With
        </h2>
        <p className="mt-4 text-sm md:text-base text-ink-dim leading-relaxed">
          We specialize in bespoke, advanced technology solutions that drive innovation and efficiency —
          whether you're developing a new prototype or broadening your market presence.
        </p>
      </div>

      <div className="divide-y divide-mist border-t border-b border-mist">
        {types.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="grid sm:grid-cols-[220px_1fr] gap-3 sm:gap-8 py-7"
          >
            <h3 className="font-display text-base md:text-lg">{t.name}</h3>
            <p className="text-sm text-ink-dim leading-relaxed">{t.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
