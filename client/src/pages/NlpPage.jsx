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
        title="Not Sure Which Capability Your Problem Needs?"
        subtitle="Classification, retrieval, extraction, or a fine-tuned model each suit different problems. Book a free consultation and we will look at your actual documents, say which approach fits, and set out what it would take to build."
        buttonText="Book a Free NLP Consultation"
      />

      <NlpCaseStudies />
      <NlpIndustries />
      <NlpStack />
      <NlpProcess />

      <GradientCTA
        dark
        title="Your Language Is Not English Only?"
        subtitle="We work across a wide range of languages and will tell you during scoping which of yours are well covered by pretrained models and which need labelled data first. Code-switched text is tested explicitly, because that is how many customers write."
        buttonText="Discuss Your Use Case"
      />

      <NlpOutcomes />
      <NlpWhyUs />

      <GradientCTA
        three
        dark
        title="Your Next NLP Project Starts With a Clear Plan"
        subtitle="Book a free consultation and we will run a scoped assessment on a sample of your own documents: measured accuracy on your data, an indicative timeline, and an honest answer if NLP is the wrong tool for the job."
        buttonText="Book a Free NLP Consultation"
      />

      <FAQ id="nlp-faq" eyebrow="NLP questions" items={faqs} />
    </div>
  );
}
