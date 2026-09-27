
import GenAiHero from "../components/gen-ai/GenAiHero";
import GenAiModelBar from "../components/gen-ai/GenAiModelBar";
import GenAiChallenges from "../components/gen-ai/GenAiChallenges";
import GenAiServices from "../components/gen-ai/GenAiServices";
import GenAiModelTypes from "../components/gen-ai/GenAiModelTypes";
import GenAiCaseStudies from "../components/gen-ai/GenAiCaseStudies";
import GenAiUseCases from "../components/gen-ai/GenAiUseCases";
import GenAiIndustries from "../components/gen-ai/GenAiIndustries";
import GenAiStack from "../components/gen-ai/GenAiStack";
import GenAiProcess from "../components/gen-ai/GenAiProcess";
import GenAiOutcomes from "../components/gen-ai/GenAiOutcomes";
import GenAiWhyUs from "../components/gen-ai/GenAiWhyUs";

import GradientCTA from "../components/GradientCTA";
import FAQ from "../sections/FAQ";

import { faqs } from "../data/generativeAiData";
import Seo from "../seo/Seo";
import { serviceSchema } from "../seo/schema";
import { SERVICES_BASE_PATH } from "../data/servicesData";

const META_DESCRIPTION =
  "Axiomra's generative AI development services: LLM strategy, custom model development, " +
  "RAG systems, AI copilots and agents, and workflow automation, all built, deployed, and supported.";

export default function GenerativeAiPage() {
  return (
    <div>
      <Seo
        title="Generative AI Development Services For Enterprises | Axiomra"
        description={META_DESCRIPTION}
        breadcrumbs={[{ name: "Services", path: SERVICES_BASE_PATH }, { name: "Generative AI" }]}
        jsonLd={serviceSchema({ name: "Generative AI", description: META_DESCRIPTION, path: `${SERVICES_BASE_PATH}/generative-ai-services` })}
      />
      <GenAiHero />
      <GenAiModelBar />
      <GenAiChallenges />
      <GenAiServices />
      <GenAiModelTypes />

      <GradientCTA
        title="Find the Right Generative AI Approach"
        subtitle="Share the workflow you want to improve. We will assess suitable approaches, discuss estimated running costs, and help you decide whether generative AI fits your needs."
        buttonText="Discuss Your Use Case"
      />

      <GenAiCaseStudies />
      <GenAiUseCases />
      <GenAiIndustries />

      <GradientCTA
        dark
        title={
          <>
            Your Industry Has Rules.
            <br />
            We Build Around Them.
          </>
        }
        subtitle="Regulated data, legacy systems, and low tolerance for wrong answers are normal constraints on our projects, not exceptions. Tell us yours and we will show you what a compliant generative AI system looks like in your environment."
        buttonText="Talk To A Generative AI Engineer"
      />

      <GenAiStack />
      <GenAiProcess />
      <GenAiOutcomes />
      <GenAiWhyUs />

      <GradientCTA
        dark
        three
        title={
          <>
            Generative AI That Ships.
            <br />
            Not Another Pilot.
          </>
        }
        subtitle="Most generative AI projects stall between demo and production. We scope for deployment from the first call and stay on for 60 days after go-live. Start with a free strategy session, no commitment, no generic pitch."
        buttonText="Claim Your Free Strategy Session"
      />

      <FAQ id="generative-ai-faq" eyebrow="Generative AI, answered" items={faqs} />
    </div>
  );
}
