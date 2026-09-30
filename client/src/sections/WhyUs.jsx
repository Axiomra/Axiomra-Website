import { companyStats } from "../data/companyStats.js";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Cpu, TrendingUp, Users, ShieldCheck } from "lucide-react";
import SectionHeading from "../components/SectionHeading";

const points = [
  {
    icon: Cpu,
    title: "Production-Grade Engineering",
    desc: "We build AI systems that hold up against real-world data at scale: reliable, secure, enterprise-ready.",
  },
  {
    icon: TrendingUp,
    title: "Result-Driven Methodology",
    desc: "Every solution is designed to deliver a proven ROI within the first two quarters.",
  },
  {
    icon: Users,
    title: "100% In-House Expertise",
    desc: `Our dedicated team of ${companyStats.experts}+ AI specialists works directly with you from strategy to launch.`,
  },
  {
    icon: ShieldCheck,
    title: "Ethical & Secure AI",
    desc: "Advanced security protocols protect your proprietary data and ensure compliance.",
  },
];

const stats = [
  { label: "Projects Delivered", value: companyStats.projects, suffix: "+" },
  { label: "Partnerships", value: companyStats.partnerships, suffix: "+" },
  { label: "Countries Served", value: companyStats.countries, suffix: "+" },
  { label: "Tech Experts", value: companyStats.experts, suffix: "+" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    // The final value is what matters to assistive tech; the count-up is decoration.
    <span ref={ref} className="font-display text-4xl font-semibold text-content md:text-5xl">
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}

export default function WhyUs() {
  return (
    <section className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <SectionHeading
        className="mb-16"
        eyebrow="Why choose us for your next big project?"
        title={
          <>
            Partnering With Us Is A <span className="text-brand">Strategic Move For Future</span>
          </>
        }
        subtitle="Production engineering, an in-house team, and a bias toward numbers you can audit."
      />

      <div className="mb-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -8 }}
            className="group flex flex-col items-center rounded-xl2 border border-line bg-surface-card p-8 text-center shadow-card transition-[border-color,background-color,box-shadow] duration-300 [perspective:900px] hover:border-brand hover:bg-brand/5 hover:shadow-glow"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DBEAFE] shadow-card transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(20deg)_rotateY(-20deg)_translateZ(16px)]">
              <p.icon size={28} className="text-[#2563EB]" strokeWidth={1.8} />
            </div>
            <h3 className="mb-2 font-display text-xl text-content transition-colors duration-300 group-hover:text-brand">
              {p.title}
            </h3>
            <p className="text-base leading-relaxed text-content-dim transition-colors duration-300 group-hover:text-content">
              {p.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label}>
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-base text-content-dim">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
