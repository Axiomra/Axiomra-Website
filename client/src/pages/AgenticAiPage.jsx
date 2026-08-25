import { useEffect } from "react";

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

const META_DESCRIPTION =
  "Axiomra's agentic AI development services: autonomous AI agents, multi-agent " +
  "orchestration, RAG, adaptive workflow automation, and agent governance, built, " +
  "deployed, and supported in production.";

export default function AgenticAiPage() {
  useEffect(() => {
    document.title = "Agentic AI Development Services For Enterprises | Axiomra";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", META_DESCRIPTION);
  }, []);

  return (
    <div>
      <AgenticHero />
      <AgenticFrameworkBar />
      <AgenticChallenges />
      <AgenticServices />
      <AgenticWorkflow />
      <AgenticAgentTypes />
      <AgenticReasonLoop />

      <GradientCTA
        title={
          <>
            Not Sure Which Workflow
            <br />
            Should Go Autonomous First?
          </>
        }
        subtitle="Bring us the process you want off your team's desk. We will tell you which agent class fits, what it costs to run at your volume, and whether an agent is even the right answer, before you spend anything."
        buttonText="Book A Free Agentic AI Consultation"
      />

      <AgenticCaseStudies />
      <AgenticUseCases />
      <AgenticIndustries />
      <AgenticTrends />

      <AgenticSecurity />

      <GradientCTA
        title={
          <>
            Autonomy Your Security
            <br />
            Team Will Actually Approve.
          </>
        }
        subtitle="Scoped permissions, approval gates on high-stakes actions, and a replayable audit trail behind every decision. Show us your review checklist and we will show you the agent architecture that clears it."
        buttonText="Talk To An Agent Engineer"
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
        subtitle="Most agent projects stall between demo and production. Ours do not, because we scope for deployment from the first call and stay on for 60 days after go-live. Start with a free strategy session, no commitment, no generic pitch."
        buttonText="Claim Your Free Strategy Session"
      />

      <FAQ id="agentic-ai-faq" eyebrow="Agentic AI, answered" items={faqs} />
    </div>
  );
}
