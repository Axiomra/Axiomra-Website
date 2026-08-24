import { useEffect } from "react";

import NlpHero from "../components/nlp/NlpHero";
import NlpIntro from "../components/nlp/NlpIntro";
import NlpStats from "../components/nlp/NlpStats";
import NlpTechBar from "../components/nlp/NlpTechBar";
import NlpPotential from "../components/nlp/NlpPotential";
import NlpServices from "../components/nlp/NlpServices";
import NlpSolutions from "../components/nlp/NlpSolutions";
import NlpCaseStudies from "../components/nlp/NlpCaseStudies";
import NlpIndustries from "../components/nlp/NlpIndustries";
import NlpStack from "../components/nlp/NlpStack";
import NlpProcess from "../components/nlp/NlpProcess";
import NlpOutcomes from "../components/nlp/NlpOutcomes";
import NlpWhyUs from "../components/nlp/NlpWhyUs";

import GradientCTA from "../components/GradientCTA";
import FAQ from "../sections/FAQ";

import { faqs } from "../data/nlpData";

const META_DESCRIPTION =
  "Axiomra's natural language processing services: NLP consulting, custom model " +
  "development, speech-to-text, semantic analytics, document processing, and " +
  "intelligent search, all built, integrated, and supported in production.";

export default function NlpPage() {
  useEffect(() => {
    document.title = "Natural Language Processing Services | Axiomra";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", META_DESCRIPTION);
  }, []);

  return (
    <div>
      <NlpHero />
      <NlpIntro />
      <NlpStats />
      <NlpTechBar />
      <NlpPotential />
      <NlpServices />
      <NlpSolutions />

      <GradientCTA
        title={
          <>
            Not Sure Which Capability
            <br />
            Your Problem Needs?
          </>
        }
        subtitle="Most teams know they are drowning in text. Far fewer know whether the answer is classification, retrieval, extraction, or a fine-tuned model. Book a free 30-minute call. We will look at your actual documents and tell you which one it is, and what it would cost. No sales pitch, no commitment."
        buttonText="Book A Free Strategy Call"
      />

      <NlpCaseStudies />
      <NlpIndustries />
      <NlpStack />
      <NlpProcess />

      <GradientCTA
        dark
        title={
          <>
            Your Language Is Not
            <br />
            English Only?
          </>
        }
        subtitle="We deliver in 40+ languages, and we will tell you before the contract is signed which of yours are well covered by pretrained models and which need labelled data first. Code-switched text gets tested explicitly, because that is how real customers actually write."
        buttonText="Talk To An NLP Engineer"
      />

      <NlpOutcomes />
      <NlpWhyUs />

      <GradientCTA
        three
        dark
        title={
          <>
            Show Us Your Text.
            <br />
            We Will Show You The Numbers.
          </>
        }
        subtitle="We do not ask you to take our word for it. Book a free consultation and we will run a scoped assessment on a sample of your own documents: real accuracy on your data, real timelines, and an honest answer if NLP is the wrong tool for the job."
        buttonText="Get A Free Project Assessment"
      />

      <FAQ id="nlp-faq" eyebrow="NLP, answered" items={faqs} />
    </div>
  );
}
