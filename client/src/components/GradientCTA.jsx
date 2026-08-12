import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function GradientCTA({ title, subtitle, buttonText = "Book My Strategy Call", dark = false }) {
  return (
    <section className={`relative overflow-hidden py-20 px-6 ${dark ? "bg-navy" : "bg-cta-gradient"}`}>
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-2xl mx-auto text-center"
      >
        <h2 className="font-display font-semibold text-3xl md:text-4xl text-white">{title}</h2>
        {subtitle && <p className="mt-4 text-white/80">{subtitle}</p>}
        <a href="#contact" className="mt-8 inline-flex items-center gap-2 bg-white text-navy font-medium px-7 py-3.5 rounded-full hover:shadow-glow transition-all focus-ring">
          {buttonText} <ArrowUpRight size={18} />
        </a>
      </motion.div>
    </section>
  );
}
