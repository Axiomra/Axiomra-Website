import { motion } from "framer-motion";
import { ArrowUpRight, Star, Link, Rabbit, ClipboardList, Zap, Megaphone, MessageCircle, Music, Compass, Users } from "lucide-react";
import NetworkBackground from "../components/NetworkBackground";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" } }),
};

const clients = [
  { name: "Konnect", Icon: Link },
  { name: "Doozoo", Icon: Rabbit },
  { name: "FormOle", Icon: ClipboardList },
  { name: "Voltox", Icon: Zap },
  { name: "FN-AD", Icon: Megaphone },
  { name: "FluentTalk", Icon: MessageCircle },
  { name: "TuneGPT", Icon: Music },
  { name: "Navex", Icon: Compass },
  { name: "Peersuma", Icon: Users },
];

export default function Hero() {
  return (
    <section id="home" className="relative bg-navy overflow-hidden pt-36 pb-0">
      <NetworkBackground className="opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/40 to-navy" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pb-24">
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="text-white/70 text-sm font-medium mb-5">
          Stop Guessing. Start Growing with AI That Actually Works
        </motion.p>

        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="font-display font-semibold text-4xl md:text-7xl text-white leading-[1.08] tracking-tight">
          The Result-Driven AI Development Company That Acts As Your{" "}
          <span className="text-gradient">Growth Engine</span>
        </motion.h1>

        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="mt-6 text-white/70 max-w-3xl mx-auto leading-relaxed">
          Since before ChatGPT existed, we've been building production-grade AI systems
          for businesses that need results, not buzzwords. With 300+ delivered projects,
          we automate processes and develop customized end-to-end AI solutions that reduce
          costs, accelerate decision-making, and deliver proven ROI.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9">
          <a href="#contact" className="group inline-flex items-center gap-2 bg-white text-navy font-medium px-7 py-3.5 rounded-full hover:shadow-glow transition-all focus-ring">
            Book Your FREE AI Strategy Session (Worth $1000)
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
          className="mt-8 flex items-center justify-center gap-2 text-white/70 text-sm">
          <span>Reviewed on</span>
          <span className="font-semibold text-white">Clutch</span>
          <span className="flex text-gold">
            {[...Array(5)].map((_, i) => <Star key={i} size={13} fill="currentColor" strokeWidth={0} />)}
          </span>
          <span className="text-white/50">12 reviews</span>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-white/10 py-6 overflow-hidden bg-navy/60 backdrop-blur-sm">
        <div className="flex w-max animate-marquee gap-16">
          {[...clients, ...clients].map(({ name, Icon }, i) => (
            <span key={i} className="flex items-center gap-3.5 text-white/50 font-mono text-xl uppercase tracking-[0.2em] whitespace-nowrap">
              <Icon size={24} className="text-teal" />
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
