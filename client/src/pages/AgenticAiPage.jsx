
import AgenticHero from "../components/agentic-ai/AgenticHero";
import AgenticFrameworkBar from "../components/agentic-ai/AgenticFrameworkBar";
import AgenticChallenges from "../components/agentic-ai/AgenticChallenges";
import AgenticServices from "../components/agentic-ai/AgenticServices";
import AgenticWorkflow from "../components/agentic-ai/AgenticWorkflow";
import AgenticAgentTypes from "../components/agentic-ai/AgenticAgentTypes";
import AgenticReasonLoop from "../components/agentic-ai/AgenticReasonLoop";
import AgenticCaseStudies from "../components/agentic-ai/AgenticCaseStudies";
import AgenticUseCases from "../components/agentic-ai/AgenticUseCases";
import AgenticIndustries from "../components/agentic-ai/AgenticIndustries";
import AgenticTrends from "../components/agentic-ai/AgenticTrends";
import AgenticSecurity from "../components/agentic-ai/AgenticSecurity";
import AgenticStack from "../components/agentic-ai/AgenticStack";
import AgenticProcess from "../components/agentic-ai/AgenticProcess";
import AgenticOutcomes from "../components/agentic-ai/AgenticOutcomes";
import AgenticWhyUs from "../components/agentic-ai/AgenticWhyUs";

import GradientCTA from "../components/GradientCTA";
import FAQ from "../sections/FAQ";

import { faqs } from "../data/agenticAiData";
import Seo from "../seo/Seo";
import { serviceSchema } from "../seo/schema";
import { SERVICES_BASE_PATH } from "../data/servicesData";

const META_DESCRIPTION =
  "Axiomra's agentic AI development services: autonomous AI agents, multi-agent " +
  "orchestration, RAG, adaptive workflow automation, and agent governance, built, " +
  "deployed, and supported in production.";

export default function AgenticAiPage() {
  return (
    <div>
      <Seo
        title="Agentic AI Development Services For Enterprises | Axiomra"
        description={META_DESCRIPTION}
        breadcrumbs={[{ name: "Services", path: SERVICES_BASE_PATH }, { name: "Agentic AI" }]}
        jsonLd={serviceSchema({ name: "Agentic AI", description: META_DESCRIPTION, path: `${SERVICES_BASE_PATH}/agentic-ai-services` })}
      />
      <AgenticHero />
      <AgenticFrameworkBar />
      <AgenticChallenges />
      <AgenticServices />
      <AgenticWorkflow />
      <AgenticAgentTypes />
      <AgenticReasonLoop />

      <GradientCTA
        title="Identify Your First AI Agent Use Case"
        subtitle="Share a process your team wants to improve. We will assess its suitability for an AI agent, discuss the required controls, and estimate the effort and running costs."
        buttonText="Book a Free Agentic AI Consultation"
      />

      <AgenticCaseStudies />
      <AgenticUseCases />
      <AgenticIndustries />
      <AgenticTrends />

      <AgenticSecurity />

      <GradientCTA
        title="AI Agents Designed for Oversight and Control"
        subtitle="Define what your agents can access, which actions require approval, and how activity is recorded. We work with your security team to assess the architecture against your review requirements."
        buttonText="Talk to an AI Agent Engineer"
      />

      <AgenticStack />
      <AgenticProcess />
      <AgenticOutcomes />
      <AgenticWhyUs />

      <GradientCTA
        dark
        three
        title={
          <>
            Agents That Finish The Work.
            <br />
            Not Another Pilot.
          </>
        }
        subtitle="Most agent projects stall between demo and production. We scope for deployment from the first call and stay on for 60 days after go-live. Start with a free strategy session, no commitment, no generic pitch."
        buttonText="Claim Your Free Strategy Session"
      />

      <FAQ id="agentic-ai-faq" eyebrow="Agentic AI, answered" items={faqs} />
    </div>
  );
}
