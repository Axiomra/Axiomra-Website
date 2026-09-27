import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import LegalHero from "../components/industries/legal/LegalHero";
import LegalIntro from "../components/industries/legal/LegalIntro";
import LegalImpact from "../components/industries/legal/LegalImpact";
import LegalDoctrine from "../components/industries/legal/LegalDoctrine";
import LegalChallenges from "../components/industries/legal/LegalChallenges";
import LegalServices from "../components/industries/legal/LegalServices";
import LegalMidCta from "../components/industries/legal/LegalMidCta";
import LegalSolutions from "../components/industries/legal/LegalSolutions";
import LegalStakeholders from "../components/industries/legal/LegalStakeholders";
import LegalSectors from "../components/industries/legal/LegalSectors";
import LegalBenefits from "../components/industries/legal/LegalBenefits";
import LegalBuild from "../components/industries/legal/LegalBuild";
import LegalBlogs from "../components/industries/legal/LegalBlogs";
import IndustriesTechStrip from "../components/industries/IndustriesTechStrip";
import IndustriesBusinessTypes from "../components/industries/IndustriesBusinessTypes";
import IndustriesTestimonials from "../components/industries/IndustriesTestimonials";
import IndustriesPortfolio from "../components/industries/IndustriesPortfolio";
import IndustriesPartner from "../components/industries/IndustriesPartner";
import FAQ from "../sections/FAQ";
import GradientCTA from "../components/GradientCTA";
import {
  techStrip,
  businessTypes,
  testimonials,
  showcase,
  partner,
  faqs,
  finalCta,
} from "../data/legalData";
import Seo from "../seo/Seo";
import { INDUSTRIES_PATH } from "../data/industriesData";

const TITLE = "Custom AI Legal Software Development Services | Axiomra";
const DESCRIPTION =
  "AI legal software development: contract lifecycle management, matter and case systems, document automation, eDiscovery and compliance platforms built for privilege and scale.";

export default function LegalPage() {
  // Lazy photos land after the triggers were measured; once the page has
  // fully loaded, remeasure so nothing reveals early or late.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        breadcrumbs={[{ name: "Industries", path: INDUSTRIES_PATH }, { name: "AI for Legal" }]}
      />
      <LegalHero />
      <LegalIntro />
      <LegalImpact />
      <LegalDoctrine />
      <LegalChallenges />
      <LegalServices />
      <LegalMidCta />
      <LegalSolutions />
      <LegalStakeholders />
      <LegalSectors />
      <LegalBenefits />
      <LegalBuild />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <LegalBlogs />
      <FAQ id="legal-faq" eyebrow="Legal questions" items={faqs} />
      <GradientCTA
        dark
        image={finalCta.background}
        title={finalCta.title}
        subtitle={finalCta.subtitle}
        buttonText={finalCta.buttonText}
      />
    </>
  );
}
