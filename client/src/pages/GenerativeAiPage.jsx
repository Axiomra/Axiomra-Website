import { useEffect } from "react";

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

const META_DESCRIPTION =
  "Axiomra's generative AI development services: LLM strategy, custom model development, " +
  "RAG systems, AI copilots and agents, and workflow automation — built, deployed, and supported.";

export default function GenerativeAiPage() {
  useEffect(() => {
    document.title = "Generative AI Development Services For Enterprises — Axiomra";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", META_DESCRIPTION);
  }, []);

  return (
    // Bands alternate light and inverse down the page, so each CTA below is
    // given the variant that contrasts with the section it follows.
    <div>
      <GenAiHero />
      <GenAiModelBar />
      <GenAiChallenges />
      <GenAiServices />
      <GenAiModelTypes />

      <GradientCTA
        title={
          <>
            Not Sure Which Model
            <br />
            Fits Your Use Case?
          </>
        }
        subtitle="Bring us the workflow you want to automate. We will tell you which model class fits, what it costs to run at your volume, and whether generative AI is even the right answer — before you spend anything."
        buttonText="Book A Free Generative AI Consultation"
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
        subtitle="Most generative AI projects stall between demo and production. Ours do not, because we scope for deployment from the first call and stay on for 60 days after go-live. Start with a free strategy session — no commitment, no generic pitch."
        buttonText="Claim Your Free Strategy Session"
      />

      <FAQ id="generative-ai-faq" eyebrow="Generative AI, answered" items={faqs} />
    </div>
  );
}
