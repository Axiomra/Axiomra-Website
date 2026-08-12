import { motion } from "framer-motion";
import { Brain, LineChart, Bot, Workflow, MessageSquare, Eye, BarChart3, Sparkles, ArrowUpRight } from "lucide-react";

const services = [
  { icon: Brain, title: "AI Development", desc: "We design and build custom AI products from concept to deployment. Expect a clear roadmap, staged delivery, and measurable ROI." },
  { icon: LineChart, title: "Machine Learning", desc: "Predictive models that turn historical data into reliable forecasts for inventory, churn, and pricing." },
  { icon: Bot, title: "AI Agents & Agentic AI", desc: "Autonomous agents that plan, act, and coordinate multi-step tasks with minimal human oversight." },
  { icon: Workflow, title: "Business Process Automation", desc: "We combine AI with automation to remove repetitive tasks across operations and back-office functions." },
  { icon: MessageSquare, title: "Natural Language Processing", desc: "Systems that read, understand, and generate human language for search, classification, and summarization." },
  { icon: Eye, title: "Computer Vision", desc: "Systems that analyze images and video to automate inspections, detect anomalies, and extract visual signals." },
  { icon: BarChart3, title: "Business Intelligence", desc: "We convert raw data into dashboards and reports that managers can act on immediately." },
  { icon: Sparkles, title: "Generative AI", desc: "We apply LLMs like GPT-4o, DALL·E, and MidJourney to automate content and personalize customer messages." },
];

export default function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-24">
      <div className="max-w-2xl mb-14">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">What services does Axiomra provide?</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          <span className="text-periwinkle">Reinvent Your Operations</span> With Result-Driven AI Development Services
        </h2>
        <p className="mt-4 text-ink-dim">
          We deliver a comprehensive suite of AI services designed to automate manual work,
          predict future trends, and scale your business.
        </p>
        <a href="#contact" className="mt-6 inline-flex items-center gap-2 border border-ink/15 rounded-full px-5 py-2.5 text-sm font-medium hover:bg-mist-50 transition-colors focus-ring">
          View all services <ArrowUpRight size={15} />
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-xl2 overflow-hidden border border-mist shadow-card group"
          >
            <div className="relative aspect-[16/9] bg-gradient-to-br from-navy to-periwinkle-dark flex items-center justify-center overflow-hidden">
              <s.icon size={64} strokeWidth={1} className="text-teal/70 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, rgba(20,216,196,0.25), transparent 55%)" }} />
            </div>
            <div className="p-6 bg-white">
              <h3 className="font-display font-medium text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-ink-dim leading-relaxed mb-4">{s.desc}</p>
              <div className="flex gap-3">
                <a href="#contact" className="text-xs font-medium border border-ink/15 rounded-full px-4 py-2 hover:bg-mist-50 transition-colors focus-ring">View service details</a>
                <a href="#contact" className="text-xs font-medium bg-navy text-white rounded-full px-4 py-2 hover:bg-navy-soft transition-colors focus-ring">Buy our service</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
