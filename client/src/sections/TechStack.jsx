import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "../components/SectionHeading";

const tabs = {
  "Artificial Intelligence": ["GPT-4o", "Claude", "Gemini", "Llama 3", "MistralAI", "Whisper", "Stable Diffusion", "VertexAI", "Groq", "Guardrails"],
  "Backend & Database": ["Node.js", "Express.js", "FastAPI", "Django", "MongoDB", "PostgreSQL", "Redis", "ChromaDB", "Celery", "NestJS"],
  Frontend: ["React", "Next.js", "Vue.js", "TypeScript", "React Native", "HTML5", "CSS3"],
  Cloud: ["AWS", "GCP", "Azure", "Docker", "Digital Ocean", "Nginx", "EC2"],
  DevOps: ["GitHub", "GitLab", "CI/CD", "Docker", "Gunicorn"],
  SQA: ["Cypress", "Postman", "Selenium", "Playwright", "JMeter", "Burpsuite"],
  "UI/UX": ["Figma", "Canva", "Photoshop", "After Effects", "Illustrator"],
};

export default function TechStack() {
  const [active, setActive] = useState("Artificial Intelligence");

  return (
    <section className="border-y border-line bg-surface-subtle py-24">
      <div className="mx-auto mb-12 max-w-8xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our tech stack"
          title={
            <>
              Expertise In <span className="text-brand">Advanced Development Technologies</span>
            </>
          }
          subtitle="The models, frameworks, and infrastructure we reach for — chosen per project, never by fashion."
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Technology categories">
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
              <span key={t} className="rounded-full border border-line bg-surface-inset px-4 py-2 text-sm text-content-dim">
                {t}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
