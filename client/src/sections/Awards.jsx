import { motion } from "framer-motion";
import { Award, Trophy, ShieldCheck, Medal, Star } from "lucide-react";

const badges = [
  { icon: Trophy, label: "Top Robotics\nCompanies 2024" },
  { icon: Award, label: "Tech Behemoths\nAwards Winner" },
  { icon: ShieldCheck, label: "Top ML Company\nPakistan 2024" },
  { icon: Medal, label: "Top Web Dev\nCompanies 2024" },
  { icon: Star, label: "Top AI\nCompany" },
];

export default function Awards() {
  return (
    <section className="py-16 border-y border-mist bg-mist-50">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-10">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            className="flex flex-col items-center gap-2 w-28 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-white shadow-card border border-mist flex items-center justify-center">
              <b.icon size={26} className="text-periwinkle" strokeWidth={1.5} />
            </div>
            <span className="text-[11px] text-ink-faint whitespace-pre-line leading-tight">{b.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
