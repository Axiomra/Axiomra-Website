import { useEffect } from "react";

import AiDevHero from "../components/ai-dev/AiDevHero";
import ClientLogoStrip from "../components/ai-dev/ClientLogoStrip";
import AiDevIntro from "../components/ai-dev/AiDevIntro";
import AiDevCapabilities from "../components/ai-dev/AiDevCapabilities";
import AiDevIndustries from "../components/ai-dev/AiDevIndustries";
import AiDevProcess from "../components/ai-dev/AiDevProcess";
import AiDevTechStack from "../components/ai-dev/AiDevTechStack";
import AiDevBenefits from "../components/ai-dev/AiDevBenefits";

import SectionHeading from "../components/SectionHeading";
import ServiceRow from "../components/ServiceRow";
import GradientCTA from "../components/GradientCTA";
import Portfolio from "../sections/Portfolio";
import TestimonialWall from "../sections/TestimonialWall";
import Awards from "../sections/Awards";
import FAQ from "../sections/FAQ";

import { whatWeDo, subServices, faqs } from "../data/aiDevelopmentData";

const META_DESCRIPTION =
  "Axiomra's AI development services: custom AI software, AI agents, LLM integration, " +
  "enterprise AI, PoC and MVP builds, AI integration, and AIOps — shipped to production.";

export default function AiDevelopmentPage() {
  useEffect(() => {
    document.title = "AI Development Services Built For Business Results — Axiomra";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", META_DESCRIPTION);
  }, []);

  return (
    // `ai-dev-page` does two things, both defined in index.css: it hosts the
    // fixed animated backdrop below, and it drops the opacity of this page's
    // `bg-surface` bands just enough for that backdrop to read through them.
    <div className="ai-dev-page">
      <div className="ai-dev-bg" aria-hidden="true" />

      <AiDevHero />
      <ClientLogoStrip />
      <AiDevIntro />

      <section id="what-we-do" className="bg-surface pt-20 md:pt-28">
        <div className="mx-auto max-w-8xl px-6">
          <SectionHeading
            eyebrow={whatWeDo.eyebrow}
            title={
              <>
                <span className="text-brand">{whatWeDo.titleAccent}</span> {whatWeDo.titleLead}
              </>
            }
            subtitle={whatWeDo.subtitle}
          />
        </div>
      </section>

      {/* Rows alternate side and surface via `index`; row 0 resolves to `surface`,
          so the heading above it carries the same surface and the two read as one band. */}
      <div>
        {subServices.map((s, i) => (
          <ServiceRow
            key={s.id}
            id={s.id}
            index={i}
            compact
            title={s.title}
            description={s.description}
            image={s.image}
            imageAlt={s.imageAlt}
            ctaHref={s.ctaText ? "/#contact" : undefined}
            ctaText={s.ctaText}
          />
        ))}
      </div>

      <AiDevCapabilities />

      <GradientCTA
        title={
          <>
            Have A Use Case In Mind?
            <br />
            Let&rsquo;s Build It.
          </>
        }
        subtitle="Whether you need a generative AI system, a computer vision tool, or an AI agent that runs complex workflows, we have built it before. Share your idea and we will tell you exactly how to build it."
        buttonText="Book A Free Strategy Session"
      />

      <section className="bg-surface pt-20 md:pt-28">
        <div className="mx-auto max-w-8xl px-6">
          <SectionHeading
            eyebrow="Real AI systems we have built"
            title={
              <>
                AI Development Projects{" "}
                <span className="text-brand">That Delivered Measurable Results</span>
              </>
            }
          />
        </div>
      </section>
      <Portfolio showHeading={false} />

      <section className="bg-surface pt-20 md:pt-28">
        <div className="mx-auto max-w-8xl px-6">
          <SectionHeading
            eyebrow="When we say we deliver ROI, we mean it"
            title={
              <>
                See What Leaders{" "}
                <span className="text-brand">With 10+ Years Of Experience</span> Have To Say
              </>
            }
            subtitle="These aren't just testimonials — they are real-world results from companies that chose Axiomra for production-grade AI, not prototypes."
          />
        </div>
      </section>
      <TestimonialWall showHeading={false} />

      <AiDevIndustries />

      <GradientCTA
        title={
          <>
            We Know Your Industry.
            <br />
            Now Let&rsquo;s Solve Your Problem.
          </>
        }
        subtitle="We have delivered AI systems across 12+ industries. From healthcare and finance to retail and supply chain, our teams understand your data, your compliance requirements, and your goals."
        buttonText="Book A Free Industry AI Consultation"
      />

      <AiDevProcess />
      <AiDevTechStack />

      <GradientCTA
        dark
        title={
          <>
            The Right Tools. The Right Team.
            <br />
            Built For Your Stack.
          </>
        }
        subtitle="We work with the most advanced AI frameworks, LLMs, and MLOps tools available. More importantly, we know how to combine them into systems that work in production. Tell us what you want to build and we will map out the right architecture."
        buttonText="Book A Free Technical Discovery Call"
      />

      <AiDevBenefits />
      <Awards />

      <GradientCTA
        dark
        three
        title={
          <>
            300+ AI Projects Delivered.
            <br />
            Yours Could Be Next.
          </>
        }
        subtitle="We offer a free AI strategy session to every new client. No commitment. No generic pitch. Just a clear plan for what AI can do for your business, built by engineers who have done it across 20+ countries."
        buttonText="Claim Your Free AI Strategy Session"
      />

      <FAQ id="ai-development-faq" eyebrow="AI development, answered" items={faqs} />
    </div>
  );
}
