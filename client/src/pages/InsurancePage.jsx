import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import InsuranceHero from "../components/industries/insurance/InsuranceHero";
import InsuranceIntro from "../components/industries/insurance/InsuranceIntro";
import InsuranceImpact from "../components/industries/insurance/InsuranceImpact";
import InsurancePledge from "../components/industries/insurance/InsurancePledge";
import InsuranceChallenges from "../components/industries/insurance/InsuranceChallenges";
import InsuranceValueChain from "../components/industries/insurance/InsuranceValueChain";
import InsuranceMidCta from "../components/industries/insurance/InsuranceMidCta";
import InsuranceSolutions from "../components/industries/insurance/InsuranceSolutions";
import InsuranceStakeholders from "../components/industries/insurance/InsuranceStakeholders";
import InsuranceLines from "../components/industries/insurance/InsuranceLines";
import InsuranceBenefits from "../components/industries/insurance/InsuranceBenefits";
import InsuranceBuild from "../components/industries/insurance/InsuranceBuild";
import InsuranceBlogs from "../components/industries/insurance/InsuranceBlogs";
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
} from "../data/insuranceData";
import Seo from "../seo/Seo";
import { INDUSTRIES_PATH } from "../routes.constants";

const TITLE = "Custom AI Insurance Software Development Services | Axiomra";
const DESCRIPTION =
  "AI insurance software development: claims automation, underwriting intelligence, fraud detection and policy administration built to stay explainable and auditable.";

export default function InsurancePage() {
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
        breadcrumbs={[{ name: "Industries", path: INDUSTRIES_PATH }, { name: "AI for Insurance" }]}
      />
      <InsuranceHero />
      <InsuranceIntro />
      <InsuranceImpact />
      <InsurancePledge />
      <InsuranceChallenges />
      <InsuranceValueChain />
      <InsuranceMidCta />
      <InsuranceSolutions />
      <InsuranceStakeholders />
      <InsuranceLines />
      <InsuranceBenefits />
      <InsuranceBuild />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <InsuranceBlogs />
      <FAQ id="insurance-faq" eyebrow="Insurance questions" items={faqs} />
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
