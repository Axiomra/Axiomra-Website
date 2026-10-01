import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const tabs = {
  "Artificial Intelligence": [
    "GPT-4o",
    "Claude",
    "Gemini",
    "Llama 3",
    "MistralAI",
    "Whisper",
    "Stable Diffusion",
    "VertexAI",
    "Groq",
    "Guardrails",
  ],
  "Backend & Database": [
    "Node.js",
    "Express.js",
    "FastAPI",
    "Django",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "ChromaDB",
    "Celery",
    "NestJS",
  ],
  Frontend: ["React", "Next.js", "Vue.js", "TypeScript", "HTML5", "CSS3"],
  Cloud: ["AWS", "GCP", "Azure", "Docker", "Digital Ocean", "Nginx", "EC2"],
  DevOps: ["GitHub", "GitLab", "CI/CD", "Docker", "Gunicorn"],
  SQA: ["Cypress", "Postman", "Selenium", "Playwright", "JMeter", "Burpsuite"],
};

export default function TechStack() {
  const [active, setActive] = useState("Artificial Intelligence");

  return (
    <section className="relative overflow-hidden border-y border-line bg-surface-wash py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[720px]">
        <div className="tech-grid absolute inset-0 opacity-[0.18]" />
        <div className="tech-sweep absolute inset-x-0 top-0 h-px" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-surface-subtle" />
      </div>

      <div className="relative mx-auto mb-16 w-full max-w-[110rem] px-4 py-10 sm:px-10 lg:px-16 lg:py-16">
        <SectionHeading
          eyebrow="Our tech stack"
          titleClassName="!text-5xl md:!text-6xl lg:!text-7xl xl:!text-[5rem]"
          subtitleClassName="!max-w-5xl text-justify !text-xl !leading-[1.8] md:!text-2xl md:!leading-[1.85]"
          title={
            <>
              Expertise In <span className="text-brand">Advanced Development Technologies</span>
            </>
          }
          subtitle="The models, frameworks, and infrastructure we reach for, chosen per project, never by fashion. Every stack decision is made against your data, your integrations, and the load you actually expect in production, so what ships stays maintainable long after launch."
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="mb-8 flex flex-wrap justify-center gap-2"
          role="tablist"
          aria-label="Technology categories"
        >
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active === tab}
              aria-controls="techstack-panel"
              onClick={() => setActive(tab)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring ${
                active === tab
                  ? "bg-inverse text-inverse-fg"
                  : "border border-line bg-surface-card text-content-dim hover:border-brand/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id="techstack-panel"
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-3 rounded-xl2 border border-line bg-surface-card p-8"
          >
            {tabs[active].map((t) => (
              <span
                key={t}
                className="rounded-full border border-line bg-surface-inset px-4 py-2 text-sm text-content-dim"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
