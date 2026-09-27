import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import HealthcareHero from "../components/industries/healthcare/HealthcareHero";
import HealthcareIntro from "../components/industries/healthcare/HealthcareIntro";
import HealthcareStandards from "../components/industries/healthcare/HealthcareStandards";
import HealthcareImpact from "../components/industries/healthcare/HealthcareImpact";
import HealthcareChallenges from "../components/industries/healthcare/HealthcareChallenges";
import HealthcareServices from "../components/industries/healthcare/HealthcareServices";
import HealthcareMidCta from "../components/industries/healthcare/HealthcareMidCta";
import HealthcareSolutions from "../components/industries/healthcare/HealthcareSolutions";
import HealthcareStakeholders from "../components/industries/healthcare/HealthcareStakeholders";
import HealthcareSubIndustries from "../components/industries/healthcare/HealthcareSubIndustries";
import HealthcareBenefits from "../components/industries/healthcare/HealthcareBenefits";
import HealthcareBuild from "../components/industries/healthcare/HealthcareBuild";
import HealthcareBlogs from "../components/industries/healthcare/HealthcareBlogs";
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
} from "../data/healthcareData";
import Seo from "../seo/Seo";
import { INDUSTRIES_PATH } from "../routes.constants";

const TITLE = "Custom AI Healthcare Software Development Services | Axiomra";
const DESCRIPTION =
  "AI healthcare software development: EHR, telemedicine, medical imaging, clinical decision support, RCM and remote monitoring platforms built HIPAA-ready and FHIR-native.";

export default function HealthcarePage() {
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
        breadcrumbs={[{ name: "Industries", path: INDUSTRIES_PATH }, { name: "AI for Healthcare" }]}
      />
      <HealthcareHero />
      <HealthcareIntro />
      <HealthcareImpact />
      <HealthcareStandards />
      <HealthcareChallenges />
      <HealthcareServices />
      <HealthcareMidCta />
      <HealthcareSolutions />
      <HealthcareStakeholders />
      <HealthcareSubIndustries />
      <HealthcareBenefits />
      <HealthcareBuild />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <HealthcareBlogs />
      <FAQ id="healthcare-faq" eyebrow="Healthcare questions" items={faqs} />
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
