import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartPulse, GraduationCap, Shirt, Building2, Trophy, ShoppingBag, Truck, Boxes, Landmark, ShieldCheck, Scale, Megaphone } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { INDUSTRY_IMAGES } from "../lib/media";

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

export default function Industries({ showHeading = true, showStats = true }) {
  // Hovering a tile floods the whole panel with that industry's photo.
  // The first tile is active by default so the panel is never bare.
  const [active, setActive] = useState(industries[0].name);

  return (
    <section id="industries" className="py-24">
      {showHeading && (
        <div className="mx-auto mb-16 max-w-8xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="What industries does Axiomra serve?"
            title={
              <>
                <span className="text-brand">Tailored AI Solutions</span> For Every Industry Vertical
              </>
            }
            subtitle="From clinical workflows to supply-chain forecasting, we ship AI that fits how your industry actually operates."
          />
        </div>
      )}

      <div className="relative mx-auto max-w-none px-0 sm:px-0">
        {/* The grid panel is a brand surface — dark in both themes. */}
        <div className="relative overflow-hidden rounded-none bg-inverse sm:rounded-xl2">
          {/* Default (not `wait`) mode so the outgoing photo stays put while the
              new one fades over it — `wait` leaves a bare panel between tiles. */}
          <AnimatePresence>
            <motion.img
              key={active}
              src={INDUSTRY_IMAGES[active]}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          {/* Just enough scrim to keep the tile labels legible — the photo
              still has to read as the subject of the panel. */}
          {/* Heavier than it used to be: the taller tiles expose more of the
              photo, and the white labels need the extra scrim to stay AA. */}
          <div className="absolute inset-0 bg-inverse/60" />
          <div className="absolute inset-0 bg-gradient-to-br from-inverse/70 via-inverse/20 to-brand-strong/50" />
          <div className="absolute inset-0 opacity-25" style={{
            backgroundImage: "linear-gradient(rgba(20,216,196,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(20,216,196,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {industries.map((ind, i) => {
              const isActive = active === ind.name;
              return (
                <motion.button
                  type="button"
                  key={ind.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.05 }}
                  onMouseEnter={() => setActive(ind.name)}
                  onFocus={() => setActive(ind.name)}
                  aria-pressed={isActive}
                  className={`group flex min-h-[280px] cursor-pointer flex-col items-center justify-center gap-4 border border-inverse-fg/10 p-10 text-center transition-colors duration-300 focus-ring sm:min-h-[360px] lg:min-h-[420px] ${
                    isActive ? "bg-accent-vivid/15" : "hover:bg-accent-vivid/10"
                  }`}
                >
                  <div
                    className={`flex h-20 w-20 items-center justify-center rounded-full border transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-accent-vivid bg-accent-vivid/25"
                        : "border-accent-vivid/40 group-hover:bg-accent-vivid/20"
                    }`}
                  >
                    <ind.icon size={34} className="text-accent-vivid" strokeWidth={1.6} />
                  </div>
                  <span className="text-xl font-medium text-inverse-fg">{ind.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Proof strip — standalone from the image panel so the numbers read as
          their own statement. */}
      {showStats && (
        <div className="relative mx-auto mt-16 max-w-none border-y border-line bg-surface-card px-4 py-12 backdrop-blur-sm sm:px-6">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 text-center sm:grid-cols-3">
            {[
              { value: "12+", label: "Verticals served end to end" },
              { value: "300+", label: "Production deployments shipped" },
              { value: "24", label: "Countries with live systems" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-5xl font-semibold text-brand md:text-6xl">{stat.value}</p>
                <p className="mt-2 text-base text-ink-dim md:text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
