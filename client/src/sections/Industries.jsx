import { motion } from "framer-motion";
import { HeartPulse, GraduationCap, Shirt, Building2, Trophy, ShoppingBag, Truck, Boxes, Landmark, ShieldCheck, Scale, Megaphone } from "lucide-react";

const industries = [
  { name: "Healthcare", icon: HeartPulse },
  { name: "Education", icon: GraduationCap },
  { name: "Fashion", icon: Shirt },
  { name: "Real Estate", icon: Building2 },
  { name: "Sports", icon: Trophy },
  { name: "Retail", icon: ShoppingBag },
  { name: "Transportation", icon: Truck },
  { name: "Supply Chain", icon: Boxes },
  { name: "Finance", icon: Landmark },
  { name: "Insurance", icon: ShieldCheck },
  { name: "Legal Business", icon: Scale },
  { name: "Marketing", icon: Megaphone },
];

export default function Industries() {
  return (
    <section id="industries" className="py-24">
      <div className="max-w-2xl mx-auto text-center px-6 mb-14">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">What industries does Axiomra serve?</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          <span className="text-periwinkle">Tailored AI Solutions</span> For Every Industry Vertical
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="relative rounded-xl2 overflow-hidden bg-navy">
          <div className="absolute inset-0 opacity-40" style={{
            backgroundImage: "linear-gradient(rgba(20,216,196,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(20,216,196,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                whileHover={{ backgroundColor: "rgba(120,139,227,0.15)" }}
                className="border border-white/10 p-8 flex flex-col items-center justify-center text-center gap-3 min-h-[150px] cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-full border border-teal/40 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
                  <ind.icon size={20} className="text-teal" strokeWidth={1.6} />
                </div>
                <span className="text-white font-medium text-sm">{ind.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
