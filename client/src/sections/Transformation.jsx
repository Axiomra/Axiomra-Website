import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Transformation() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="aspect-[4/3] rounded-xl2 bg-gradient-to-br from-navy to-periwinkle-dark overflow-hidden relative flex items-center justify-center">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, #14D8C4 0, transparent 45%)" }} />
          <span className="font-display text-white/80 text-sm relative z-10">Team collaborating on AI systems</span>
        </div>
        <motion.div
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-8 -right-8 w-40 h-40 rounded-xl2 bg-white shadow-card border border-mist hidden md:flex items-center justify-center"
        >
          <span className="font-display font-semibold text-2xl text-periwinkle">3.2X</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">Leading the Way</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl leading-tight">
          <span className="text-periwinkle">Leading The Way In</span> AI-Powered Transformation
        </h2>
        <p className="mt-4 text-ink-dim">We don't just follow trends; we set the standard for how businesses apply AI to create impact.</p>
        <p className="mt-4 text-ink-dim text-sm leading-relaxed">
          Axiomra is powered by a dedicated team of 25+ AI engineers, data scientists, and solution
          architects who have been building production-grade systems since 2021. We provide an elite,
          in-house engine that specializes in converting complex business challenges into scalable AI products.
        </p>
        <p className="mt-4 text-ink-dim text-sm leading-relaxed">
          We focus on one metric: your ROI. By automating manual workflows and deploying intelligent
          predictive systems, we help businesses reduce operational overhead by up to 70% and accelerate
          decision-making by 3.2X.
        </p>
        <a href="#contact" className="mt-7 inline-flex items-center gap-2 bg-navy text-white font-medium px-6 py-3 rounded-full hover:bg-navy-soft transition-colors focus-ring">
          Hire our AI developers <ArrowUpRight size={16} />
        </a>
      </motion.div>
    </section>
  );
}
