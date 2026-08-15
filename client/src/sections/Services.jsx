import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { SERVICE_IMAGES } from "../lib/media";

const services = [
  { title: "AI Development", desc: "We design and build custom AI products from concept to deployment. Expect a clear roadmap, staged delivery, and measurable ROI." },
  { title: "Machine Learning", desc: "Predictive models that turn historical data into reliable forecasts for inventory, churn, and pricing." },
  { title: "AI Agents & Agentic AI", desc: "Autonomous agents that plan, act, and coordinate multi-step tasks with minimal human oversight." },
  { title: "Business Process Automation", desc: "We combine AI with automation to remove repetitive tasks across operations and back-office functions." },
  { title: "Natural Language Processing", desc: "Systems that read, understand, and generate human language for search, classification, and summarization." },
  { title: "Computer Vision", desc: "Systems that analyze images and video to automate inspections, detect anomalies, and extract visual signals." },
  { title: "Business Intelligence", desc: "We convert raw data into dashboards and reports that managers can act on immediately." },
  { title: "Generative AI", desc: "We apply LLMs like GPT-4o, DALL·E, and MidJourney to automate content and personalize customer messages." },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-8xl px-4 py-24 sm:px-6">
      <SectionHeading
        className="mb-16"
        eyebrow="What services does Axiomra provide?"
        // vw-sized from lg up so the sentence holds one line at every desktop
        // width instead of breaking mid-phrase.
        titleClassName="lg:whitespace-nowrap lg:text-[2.55vw]"
        title={
          <>
            <span className="text-brand">Reinvent Your Operations</span> With Result-Driven AI Development Services
          </>
        }
        subtitle="We deliver a comprehensive suite of AI services designed to automate manual work, predict future trends, and scale your business."
      >
        <a
          href="#contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-base font-medium text-content transition-colors hover:bg-surface-subtle focus-ring"
        >
          View all services <ArrowUpRight size={17} />
        </a>
      </SectionHeading>

      <div className="grid gap-6 sm:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
            whileHover={{ y: -8 }}
            className="group overflow-hidden rounded-xl2 border border-line bg-surface-card shadow-card transition-[border-color,box-shadow] duration-300 hover:border-brand/50 hover:shadow-glow"
          >
            {/* Photo only — no icon overlay and no gradient scrim, so the
                image reads at full strength with a clean edge into the card. */}
            <div className="relative aspect-[16/10] overflow-hidden bg-inverse">
              <img
                src={SERVICE_IMAGES[s.title]}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative bg-surface-card px-8 pb-8 pt-7">
              <h3 className="mb-3 font-display text-2xl font-semibold text-content transition-colors duration-300 group-hover:text-brand md:text-3xl">{s.title}</h3>
              <p className="mb-7 text-lg leading-relaxed text-content-dim">{s.desc}</p>
              <div className="flex flex-wrap gap-4">
                <a href="#contact" className="rounded-full border border-line-strong px-5 py-2.5 text-base font-medium text-content transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-surface-subtle focus-ring">View service details</a>
                <a href="#contact" className="ml-1 rounded-full bg-brand px-5 py-2.5 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-glow focus-ring">Buy our service</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
