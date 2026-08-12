import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { TrendingUp, ShieldCheck, Users, Lock } from "lucide-react";

const points = [
  { icon: TrendingUp, title: "Production-Grade Engineering", desc: "We build robust AI systems that handle real-world data at scale — reliable, secure, enterprise-ready." },
  { icon: ShieldCheck, title: "Result-Driven Methodology", desc: "Every solution is designed to deliver a proven ROI within the first two quarters." },
  { icon: Users, title: "100% In-House Expertise", desc: "Our dedicated team of 25+ AI specialists works directly with you from strategy to launch." },
  { icon: Lock, title: "Ethical & Secure AI", desc: "Advanced security protocols protect your proprietary data and ensure compliance." },
];

const stats = [
  { label: "Projects Delivered", value: 300, suffix: "+" },
  { label: "Partnerships", value: 120, suffix: "+" },
  { label: "Countries Served", value: 24, suffix: "+" },
  { label: "Tech Experts", value: 25, suffix: "+" },
];

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, { duration: 1.8, ease: "easeOut", onUpdate: (v) => setDisplay(Math.floor(v)) });
    return () => controls.stop();
  }, [inView, value]);
  return <span ref={ref} className="font-display font-semibold text-4xl md:text-5xl text-navy">{display}{suffix}</span>;
}

export default function WhyUs() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">Why choose us for your next big project?</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          Partnering With Us Is A <span className="text-periwinkle">Strategic Move For Future</span>
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-white border border-mist rounded-xl2 p-6 shadow-card"
          >
            <div className="w-11 h-11 rounded-full bg-periwinkle/10 flex items-center justify-center mb-4">
              <p.icon size={20} className="text-periwinkle" strokeWidth={1.6} />
            </div>
            <h3 className="font-display text-base mb-2">{p.title}</h3>
            <p className="text-sm text-ink-dim leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-2 text-sm text-ink-dim">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
