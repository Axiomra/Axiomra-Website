import { motion } from "framer-motion";
import {
  Brain,
  LineChart,
  Bot,
  Workflow,
  MessageSquare,
  Eye,
  BarChart3,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import aiDevImg from "../assets/services/ai-development-services.jpg";
import botImg from "../assets/services/bot-automation-services.jpg";
import nlpImg from "../assets/services/natural-language-processing-services.jpg";
import cvImg from "../assets/services/computer-vision-services.jpg";
import genaiBoxImg from "../assets/box/generative ai.jpg";
import mlBoxImg from "../assets/box/machinelearning.jpg";
import automationBoxImg from "../assets/box/Business process automation.jpg";
import biBoxImg from "../assets/box/finances.jpeg";

const services = [
  {
    icon: Brain,
    title: "AI Development",
    desc: "We design and build custom AI products from concept to deployment. Expect a clear roadmap, staged delivery, and measurable ROI.",
    image: aiDevImg,
  },
  {
    icon: LineChart,
    title: "Machine Learning",
    desc: "Predictive models that turn historical data into reliable forecasts for inventory, churn, and pricing.",
    image: mlBoxImg,
  },
  {
    icon: Bot,
    title: "AI Agents & Agentic AI",
    desc: "Autonomous agents that plan, act, and coordinate multi-step tasks with minimal human oversight.",
    image: botImg,
  },
  {
    icon: Workflow,
    title: "Business Process Automation",
    desc: "We combine AI with automation to remove repetitive tasks across operations and back-office functions.",
    image: automationBoxImg,
  },
  {
    icon: MessageSquare,
    title: "Natural Language Processing",
    desc: "Systems that read, understand, and generate human language for search, classification, and summarization.",
    image: nlpImg,
  },
  {
    icon: Eye,
    title: "Computer Vision",
    desc: "Systems that analyze images and video to automate inspections, detect anomalies, and extract visual signals.",
    image: cvImg,
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    desc: "We convert raw data into dashboards and reports that managers can act on immediately.",
    image: biBoxImg,
  },
  {
    icon: Sparkles,
    title: "Generative AI",
    desc: "We apply LLMs like GPT-4o, DALL·E, and MidJourney to automate content and personalize customer messages.",
    image: genaiBoxImg,
  },
];

export default function Services() {
  return (
    <section id="services" className="max-w-7xl mx-auto px-6 py-24">
      <div className="mx-auto mb-14 max-w-none text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">
          What services does Axiomra provide?
        </p>
        <h2 className="font-display font-semibold text-4xl text-brand md:text-5xl lg:text-6xl">
          Reinvent Your Operations With Result-Driven AI Development Services
        </h2>
        <p className="mt-6 text-lg text-ink-dim md:text-xl">
          We deliver a comprehensive suite of AI services designed to automate
          manual work, predict future trends, and scale your business.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 border border-ink/15 rounded-full px-5 py-2.5 text-sm font-medium hover:bg-mist-50 transition-colors focus-ring"
        >
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
            <div className="relative aspect-[16/9] flex items-center justify-center overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <s.icon
                size={64}
                strokeWidth={1}
                className="relative z-10 text-white drop-shadow-[0_2px_6px_rgba(10,20,40,0.6)] group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6 bg-card">
              <h3 className="font-display font-medium text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-ink-dim leading-relaxed mb-4">
                {s.desc}
              </p>
              <div className="flex gap-3">
                <a
                  href="#contact"
                  className="text-xs font-medium border border-ink/15 rounded-full px-4 py-2 hover:bg-mist-50 transition-colors focus-ring"
                >
                  View service details
                </a>
                <a
                  href="#contact"
                  className="text-xs font-medium bg-navy text-white rounded-full px-4 py-2 hover:bg-navy-soft transition-colors focus-ring"
                >
                  Buy our service
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
