import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Brain,
  Building2,
  Eye,
  GraduationCap,
  HeartPulse,
  Landmark,
  LineChart,
  MessageSquare,
  Scale,
  ShoppingBag,
  Sparkles,
  Truck,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";
import iconTeal from "../assets/icon-teal.png";
import { INDUSTRIES_PATH } from "../routes.constants";

const SERVICES = [
  { label: "AI Development", Icon: Brain },
  { label: "Machine Learning", Icon: LineChart },
  { label: "AI Agents", Icon: Bot },
  { label: "Process Automation", Icon: Workflow },
  { label: "NLP", Icon: MessageSquare },
  { label: "Computer Vision", Icon: Eye },
  { label: "Business Intelligence", Icon: BarChart3 },
  { label: "Generative AI", Icon: Sparkles },
];

const INDUSTRIES = [
  { label: "Healthcare", Icon: HeartPulse },
  { label: "Finance", Icon: Landmark },
  { label: "Retail", Icon: ShoppingBag },
  { label: "Real Estate", Icon: Building2 },
  { label: "Education", Icon: GraduationCap },
  { label: "Legal", Icon: Scale },
  { label: "Supply Chain", Icon: Truck },
];

/** Where the i-th of n items sits on its ring, as percentages of the ring box. */
const place = (i, n, offset = 0) => {
  const a = ((360 / n) * i + offset - 90) * (Math.PI / 180);
  return { left: `${50 + 50 * Math.cos(a)}%`, top: `${50 + 50 * Math.sin(a)}%` };
};

/*
 * A ring spins as one element; each chip on it runs the same spin backwards so
 * its label stays upright. Hovering the orbit pauses both (see .orbit-* in
 * index.css), and reduced-motion users get the static layout.
 */
function Ring({ items, inset, duration, reverse = false, offset = 0, variant }) {
  const style = { animationDuration: `${duration}s` };
  return (
    <div
      className={`orbit-ring absolute rounded-full border border-dashed border-line-strong ${
        reverse ? "orbit-spin-rev" : "orbit-spin"
      }`}
      style={{ inset, ...style }}
    >
      {items.map(({ label, Icon }, i) => (
        <div
          key={label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={place(i, items.length, offset)}
        >
          <div
            className={`orbit-item flex flex-col items-center gap-1.5 ${
              reverse ? "orbit-spin" : "orbit-spin-rev"
            }`}
            style={style}
          >
            <span
              className={`flex items-center justify-center rounded-full border shadow-card transition-transform duration-300 hover:scale-110 ${
                variant === "service"
                  ? "h-11 w-11 border-accent-vivid/40 bg-surface-card text-accent md:h-16 md:w-16"
                  : "h-9 w-9 border-brand/30 bg-surface-card text-brand md:h-12 md:w-12"
              }`}
            >
              <Icon className="h-1/2 w-1/2" strokeWidth={1.6} aria-hidden="true" />
            </span>
            <span
              className={`max-w-[5.5rem] text-center font-medium leading-tight text-content md:max-w-[8rem] ${
                variant === "service" ? "text-[10px] md:text-sm" : "text-[9px] text-content-dim md:text-xs"
              }`}
            >
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ExpertiseOrbit() {
  return (
    <section className="relative overflow-hidden bg-surface px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-vivid/40 bg-accent-vivid/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            One team, every layer of AI
          </p>
          <h2 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-content md:text-5xl lg:text-6xl">
            Our AI Expertise Across <span className="text-brand">Services &amp; Industries</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-content-dim md:text-xl">
            Eight core AI capabilities, applied inside the industries we know best. Everything
            revolves around one delivery team.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="orbit relative mx-auto mt-14 aspect-square w-full max-w-[760px]"
          role="img"
          aria-label={`Axiomra at the centre, surrounded by its services (${SERVICES.map(
            (s) => s.label,
          ).join(", ")}) and industries (${INDUSTRIES.map((s) => s.label).join(", ")}).`}
        >
          {/* Soft teal halo behind the core. */}
          <div className="absolute inset-[30%] rounded-full bg-accent-vivid/10 blur-2xl" />

          {/* Inner ring: just travelling dots. */}
          <div
            className="orbit-ring orbit-spin absolute inset-[29%] rounded-full border border-line"
            style={{ animationDuration: "18s" }}
          >
            <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-vivid shadow-[0_0_12px_rgba(20,216,196,0.9)]" />
            <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand" />
          </div>

          <Ring items={INDUSTRIES} inset="16%" duration={70} reverse offset={20} variant="industry" />
          <Ring items={SERVICES} inset="3%" duration={90} variant="service" />

          {/* The core. */}
          <div className="absolute left-1/2 top-1/2 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0A1428] shadow-[0_0_0_10px_rgba(20,216,196,0.12),0_25px_60px_-15px_rgba(10,20,40,0.6)]">
            <span className="orbit-pulse absolute inset-0 rounded-full border-2 border-accent-vivid/60" />
            <img
              src={iconTeal}
              alt=""
              width={83}
              height={91}
              loading="lazy"
              className="h-1/2 w-auto"
            />
          </div>
        </motion.div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-content-dim">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-accent-vivid bg-accent-vivid/20" /> AI services
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-brand bg-brand/20" /> Industries
          </span>
          <Link
            to={INDUSTRIES_PATH}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent-vivid px-5 py-2.5 font-semibold text-[#0A1428] transition-all hover:shadow-glow focus-ring"
          >
            Explore industries <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
