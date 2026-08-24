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
    <section className="border-y border-line bg-surface-subtle py-20">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-12 px-4 sm:px-6">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group flex w-44 flex-col items-center gap-4 text-center"
          >
            {/* The badge lights up on hover: brand fill, brand ring and a soft glow behind it. */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-line bg-surface-card shadow-card transition-all duration-300 group-hover:scale-105 group-hover:border-brand group-hover:bg-brand/10 group-hover:shadow-glow">
              <b.icon
                size={42}
                className="text-brand transition-colors duration-300 group-hover:text-accent"
                strokeWidth={1.5}
              />
            </div>
            <span className="whitespace-pre-line text-base font-medium leading-snug text-content-dim transition-colors duration-300 group-hover:text-brand">
              {b.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
