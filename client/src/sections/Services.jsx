import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import logoLight from "../assets/logo-light.webp";
import aiDevImg from "../assets/services/ai-development-services.jpg";
import botImg from "../assets/services/bot-automation-services.jpg";
import nlpImg from "../assets/services/natural-language-processing-services.jpg";
import cvImg from "../assets/services/computer-vision-services.jpg";
import genaiBoxImg from "../assets/box/generative ai.jpg";
import mlBoxImg from "../assets/box/machinelearning.jpg";
import automationBoxImg from "../assets/box/business-process-automation.webp";
import biBoxImg from "../assets/box/finances.jpeg";

const services = [
  {
    title: "AI Development",
    desc: "We design and build custom AI products from concept to deployment. Expect a clear roadmap, staged delivery, and measurable ROI.",
    image: aiDevImg,
  },
  {
    title: "Machine Learning",
    desc: "Predictive models that turn historical data into reliable forecasts for inventory, churn, and pricing.",
    image: mlBoxImg,
  },
  {
    title: "AI Agents & Agentic AI",
    desc: "Autonomous agents that plan, act, and coordinate multi-step tasks with minimal human oversight.",
    image: botImg,
  },
  {
    title: "Business Process Automation",
    desc: "We combine AI with automation to remove repetitive tasks across operations and back-office functions.",
    image: automationBoxImg,
  },
  {
    title: "Natural Language Processing",
    desc: "Systems that read, understand, and generate human language for search, classification, and summarization.",
    image: nlpImg,
  },
  {
    title: "Computer Vision",
    desc: "Systems that analyze images and video to automate inspections, detect anomalies, and extract visual signals.",
    image: cvImg,
  },
  {
    title: "Business Intelligence",
    desc: "We convert raw data into dashboards and reports that managers can act on immediately.",
    image: biBoxImg,
  },
  {
    title: "Generative AI",
    desc: "We apply LLMs like GPT-4o, DALL·E, and MidJourney to automate content and personalize customer messages.",
    image: genaiBoxImg,
  },
];

export default function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto mb-16 max-w-none text-center">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-vivid/40 bg-accent-vivid/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          What services does Axiomra provide?
        </p>
        <h2 className="font-display text-4xl font-semibold text-brand md:text-5xl lg:text-6xl">
          Reinvent Your Operations With Result-Driven AI Development Services
        </h2>
        <p className="mt-6 text-lg text-content-dim md:text-xl">
          We deliver a full range of AI services built to automate manual work, predict future
          trends, and scale your business.
        </p>
        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-sm font-medium text-content transition-colors hover:border-accent-vivid hover:bg-accent-vivid/10 focus-ring"
        >
          View all services <ArrowUpRight size={15} />
        </a>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        {services.map((s, i) => (
          <motion.article
            key={s.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.1, ease: "easeOut" }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-line bg-surface-card shadow-card transition-[border-color,box-shadow] duration-500 hover:border-accent-vivid/70 hover:shadow-[0_35px_70px_-30px_rgba(20,216,196,0.55)]"
          >
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
              {/* Dark floor so the title reads on any photo. */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1428]/90 via-[#0A1428]/20 to-transparent" />

              <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-[#0A1428]/45 px-3 py-1 font-mono text-xs font-semibold tracking-[0.2em] text-[#14D8C4] backdrop-blur-md">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={logoLight}
                alt=""
                aria-hidden="true"
                width={500}
                height={91}
                loading="lazy"
                className="absolute right-5 top-5 h-5 w-auto opacity-95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] md:h-6"
              />

              <h3 className="absolute inset-x-6 bottom-5 font-display text-2xl font-semibold text-white md:text-3xl">
                {s.title}
              </h3>
            </div>

            <div className="relative flex flex-1 flex-col p-7">
              <span className="mb-5 block h-0.5 w-12 rounded-full bg-accent-vivid transition-all duration-500 group-hover:w-24" />
              <p className="mb-7 flex-1 text-base leading-relaxed text-content-dim">{s.desc}</p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent-vivid px-5 py-2.5 text-sm font-semibold text-on-accent transition-all hover:bg-accent-vivid-hover hover:shadow-glow focus-ring"
                >
                  Buy our service <ArrowUpRight size={15} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-content transition-colors hover:border-accent-vivid focus-ring"
                >
                  View service details
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>

            {/* Teal rule that wipes in along the bottom edge on hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-accent-vivid transition-transform duration-500 group-hover:scale-x-100"
            />
          </motion.article>
        ))}
      </div>
    </section>
  );
}
