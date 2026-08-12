import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = {
  "Artificial Intelligence": ["GPT-4o", "Claude", "Gemini", "Llama 3", "MistralAI", "Whisper", "Stable Diffusion", "VertexAI", "Groq", "Guardrails"],
  "Backend & Database": ["Node.js", "Express.js", "FastAPI", "Django", "MongoDB", "PostgreSQL", "Redis", "ChromaDB", "Celery", "NestJS"],
  "Frontend": ["React", "Next.js", "Vue.js", "TypeScript", "React Native", "HTML5", "CSS3"],
  "Cloud": ["AWS", "GCP", "Azure", "Docker", "Digital Ocean", "Nginx", "EC2"],
  "DevOps": ["GitHub", "GitLab", "CI/CD", "Docker", "Gunicorn"],
  "SQA": ["Cypress", "Postman", "Selenium", "Playwright", "JMeter", "Burpsuite"],
  "UI/UX": ["Figma", "Canva", "Photoshop", "After Effects", "Illustrator"],
};

export default function TechStack() {
  const [active, setActive] = useState("Artificial Intelligence");

  return (
    <section className="py-24 bg-mist-50 border-y border-mist">
      <div className="max-w-4xl mx-auto text-center px-6 mb-10">
        <p className="text-xs font-mono uppercase tracking-widest text-teal-dark mb-3">Our tech stack</p>
        <h2 className="font-display font-semibold text-3xl md:text-4xl">
          Expertise In <span className="text-periwinkle">Advanced Development Technologies</span>
        </h2>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {Object.keys(tabs).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-ring ${
                active === tab ? "bg-navy text-white" : "bg-white text-ink-dim border border-mist hover:border-periwinkle/40"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap justify-center gap-3 bg-white border border-mist rounded-xl2 p-8"
          >
            {tabs[active].map((t) => (
              <span key={t} className="px-4 py-2 rounded-full bg-mist-50 border border-mist text-sm text-ink-dim">
                {t}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
