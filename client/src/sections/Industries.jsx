import { companyStats } from "../data/companyStats.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  HeartPulse,
  GraduationCap,
  Shirt,
  Building2,
  Trophy,
  ShoppingBag,
  Truck,
  Boxes,
  Landmark,
  ShieldCheck,
  Scale,
  Megaphone,
} from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ConnectingDots from "../components/ConnectingDots";
import { INDUSTRY_IMAGES } from "../lib/media";
import { industryPath } from "../routes.constants";

// `blurb` is the flip side of each tile: four or five short lines, so the card
// reads as an answer to "what do you actually build for us" and still fits the
// tile without scrolling on the smallest grid column.
const industries = [
  {
    name: "Healthcare",
    slug: "healthcare",
    icon: HeartPulse,
    blurb:
      "Clinical notes transcribed and coded automatically. Imaging models that flag what a tired eye misses. Triage and scheduling that clear the waiting list. Patient data handled to HIPAA rules end to end.",
  },
  {
    name: "Education",
    slug: "education",
    icon: GraduationCap,
    blurb:
      "Learning paths that adapt to each student's pace. Grading and feedback returned in minutes, not weekends. Dropout risk flagged while there is still time to act. Admin work pulled off teachers' desks.",
  },
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
    blurb:
      "AI sizing and virtual try-ons that cut returns. Trend forecasting before the season commits. Recommendations tuned to each shopper, not the catalogue. Inventory that neither sells out nor sits.",
  },
  {
    name: "Real Estate",
    slug: "real-estate",
    icon: Building2,
    blurb:
      "Automated valuations from live market data. Lead scoring so agents chase the buyers who close. Listings, photos and copy generated at scale. Document review and due diligence in hours.",
  },
  {
    name: "Sports",
    slug: "sports",
    icon: Trophy,
    blurb:
      "Computer vision that tracks every player and possession. Injury risk modelled from load and movement data. Tactical insight from footage the same night. Fan experiences built on live match data.",
  },
  {
    name: "Retail",
    slug: "retail",
    icon: ShoppingBag,
    blurb:
      "Demand forecasting per store and per SKU. Dynamic pricing that protects the margin. Personalised search and recommendations online. Checkout, stock and support agents that run themselves.",
  },
  {
    name: "Transportation",
    slug: "transportation",
    icon: Truck,
    blurb:
      "Route optimisation that cuts fuel and idle hours. Predictive maintenance before a vehicle strands a job. Fleet telematics turned into decisions, not dashboards. ETAs your customers can actually trust.",
  },
  {
    name: "Supply Chain",
    slug: "supply-chain",
    icon: Boxes,
    blurb:
      "Demand and lead-time forecasting across the network. Supplier risk scored before it becomes a delay. Warehouse and inventory planning automated. Full traceability from raw material to doorstep.",
  },
  {
    name: "Finance",
    slug: "finance",
    icon: Landmark,
    blurb:
      "Fraud detection that scores a transaction in real time. Credit and risk models built on your own book. KYC, AML and reporting automated end to end. Document processing that clears the back office.",
  },
  {
    name: "Insurance",
    slug: "insurance",
    icon: ShieldCheck,
    blurb:
      "Claims triaged and settled without the paperwork loop. Damage assessed from photos in seconds. Underwriting priced on richer, cleaner signals. Fraud patterns caught across the whole portfolio.",
  },
  {
    name: "Legal Business",
    slug: "legal",
    icon: Scale,
    blurb:
      "Contract review and clause extraction at volume. Case law research answered with citations. Discovery sorted before the billable hours burn. Drafting assistants trained on your own precedents.",
  },
  {
    name: "Marketing",
    slug: "marketing",
    icon: Megaphone,
    blurb:
      "Campaign copy and creative generated on brand. Audience segments built from behaviour, not guesses. Spend reallocated to what is converting today. Attribution and reporting without the spreadsheet week.",
  },
];

export default function Industries({ showHeading = true, showStats = true }) {
  // Hovering a tile floods the whole panel with that industry's photo.
  const [active, setActive] = useState(industries[0].name);
  const navigate = useNavigate();

  return (
    <section id="industries" className="py-24">
      {showHeading && (
        <div className="mx-auto mb-16 max-w-8xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Industries we serve"
            title={
              <>
                <span className="text-brand">AI Solutions</span> Built Around Your Industry
              </>
            }
            subtitle="From healthcare workflows to supply chain forecasting, we design AI to fit your processes, data, and operational requirements."
          />
        </div>
      )}

      <div className="relative mx-auto max-w-none px-0 sm:px-0">
        {/* The grid panel is a brand surface, dark in both themes. */}
        <div className="relative overflow-hidden rounded-none bg-inverse sm:rounded-xl2">
          <AnimatePresence>
            <motion.img
              key={active}
              src={INDUSTRY_IMAGES[active]}
              alt=""
              aria-hidden="true"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          {/* Scrim kept light: the tile labels sit on their own gradient, so the
              photo stays sharp and reads as the subject of the panel. */}
          <div className="absolute inset-0 bg-inverse/35" />
          <div className="absolute inset-0 bg-inverse/15" />

          {/* The network field: drifting dots wired to their neighbours. */}
          <ConnectingDots className="pointer-events-none" />

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
                  onClick={() => navigate(industryPath(ind.slug))}
                  className={`group relative min-h-[280px] cursor-pointer border border-inverse-fg/10 text-center transition-colors duration-300 [perspective:1200px] focus-ring sm:min-h-[360px] lg:min-h-[420px] ${
                    isActive ? "bg-accent-vivid/15" : "hover:bg-accent-vivid/10"
                  }`}
                >
                  {/* Flip container. Hover and keyboard focus turn the card over. */}
                  <span className="absolute inset-0 block transition-transform duration-500 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)] motion-reduce:transition-none motion-reduce:group-hover:[transform:none] motion-reduce:group-focus-visible:[transform:none]">
                    {/* Front */}
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 [backface-visibility:hidden] motion-reduce:group-hover:opacity-0">
                      <span
                        className={`flex h-20 w-20 items-center justify-center rounded-full border transition-all duration-300 ${
                          isActive
                            ? "scale-110 border-accent-vivid bg-accent-vivid/25"
                            : "border-accent-vivid/40"
                        }`}
                      >
                        <ind.icon size={34} className="text-accent-vivid" strokeWidth={1.6} />
                      </span>
                      <span className="text-xl font-medium text-inverse-fg">{ind.name}</span>
                    </span>

                    {/* Back: the four-line answer, on its own scrim so it reads
                        over any photo behind the panel. */}
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-inverse/85 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] motion-reduce:[transform:none] motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100 sm:p-7">
                      <span className="flex items-center gap-2 text-base font-medium text-accent-vivid">
                        <ind.icon size={20} strokeWidth={1.8} />
                        {ind.name}
                      </span>
                      <span className="text-sm leading-relaxed text-inverse-fg/85 sm:text-[15px]">
                        {ind.blurb}
                      </span>
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Proof strip, standalone from the image panel so the numbers read as their own statement. */}
      {showStats && (
        <div className="relative mx-auto mt-16 max-w-none border-y border-line bg-surface-card px-4 py-12 backdrop-blur-sm sm:px-6">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 text-center sm:grid-cols-3">
            {[
              { value: `${companyStats.industries}+`, label: "Verticals served end to end" },
              { value: `${companyStats.projects}+`, label: "Production deployments shipped" },
              { value: `${companyStats.countries}+`, label: "Countries with live systems" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-5xl font-semibold text-brand md:text-6xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-base text-ink-dim md:text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
