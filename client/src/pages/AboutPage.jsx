
import AboutHero from "../components/about/AboutHero";
import AboutJourney from "../components/about/AboutJourney";
import AboutVisionMission from "../components/about/AboutVisionMission";
import AboutValues from "../components/about/AboutValues";
import AboutBeliefs from "../components/about/AboutBeliefs";
import AboutMilestones from "../components/about/AboutMilestones";
import AboutPaths from "../components/about/AboutPaths";

import GradientCTA from "../components/GradientCTA";
import FAQ from "../sections/FAQ";

import { faqs } from "../data/aboutData";
import Seo from "../seo/Seo";

const META_DESCRIPTION =
  "About Axiomra: an AI development company founded in 2021, with 25+ in-house experts " +
  "and 300+ production AI projects delivered across 12+ industries.";

export default function AboutPage() {
  return (
    <div>
      <Seo title="About Axiomra | AI Expertise Tailored To Your Business" description={META_DESCRIPTION} />
      <AboutHero />
      <AboutJourney />
      <AboutVisionMission />
      <AboutValues />
      <AboutBeliefs />
      <AboutMilestones />
      <AboutPaths />

      <FAQ id="about-faq" eyebrow="About Axiomra, answered" items={faqs} />

      <GradientCTA
        dark
        three
        title={
          <>
            Partner With Our Global
            <br />
            AI Development Company
          </>
        }
        subtitle="Talk to the engineers who would actually build your system. We will tell you what AI can do for your business, what it cannot, and what the first ninety days would look like."
        buttonText="Contact us now"
      />
    </div>
  );
}
