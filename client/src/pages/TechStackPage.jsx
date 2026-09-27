import TechHero from "../components/tech/TechHero";
import TechSignature from "../components/tech/TechSignature";
import TechExplorer from "../components/tech/TechExplorer";
import TechBusinesses from "../components/tech/TechBusinesses";
import TechPartner from "../components/tech/TechPartner";

import GradientCTA from "../components/GradientCTA";
import FAQ from "../sections/FAQ";

import { faqs } from "../data/techStackData";
import Seo from "../seo/Seo";

const META_DESCRIPTION =
  "The AI tech stack behind every Axiomra build: generative AI, machine learning, " +
  "computer vision, NLP, backend, cloud and the quality tooling that ships with them.";

export default function TechStackPage() {
  return (
    <div>
      <Seo
        title="Tech Stack | The Tools Behind Every Axiomra Build"
        description={META_DESCRIPTION}
        breadcrumbs={[{ name: "Tech Stack" }]}
      />
      <TechHero />
      <TechSignature />
      <TechExplorer />
      <TechBusinesses />
      <TechPartner />

      {/* Eyebrow suppressed: this page already spends its eyebrow budget above. */}
      <FAQ id="tech-faq" eyebrow={null} items={faqs} />

      <GradientCTA
        dark
        three
        title="Tell us what you are building"
        subtitle="Bring the problem and the constraints. We will come back with the stack, the timeline and the number it has to hit."
        buttonText="Talk to our engineers"
      />
    </div>
  );
}
