import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import MarketingHero from "../components/industries/marketing/MarketingHero";
import MarketingIntro from "../components/industries/marketing/MarketingIntro";
import MarketingImpact from "../components/industries/marketing/MarketingImpact";
import MarketingChallenges from "../components/industries/marketing/MarketingChallenges";
import MarketingServices from "../components/industries/marketing/MarketingServices";
import MarketingMidCta from "../components/industries/marketing/MarketingMidCta";
import MarketingSolutions from "../components/industries/marketing/MarketingSolutions";
import MarketingStakeholders from "../components/industries/marketing/MarketingStakeholders";
import MarketingSubIndustries from "../components/industries/marketing/MarketingSubIndustries";
import MarketingBenefits from "../components/industries/marketing/MarketingBenefits";
import MarketingBuild from "../components/industries/marketing/MarketingBuild";
import MarketingBlogs from "../components/industries/marketing/MarketingBlogs";
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
} from "../data/marketingData";
import Seo from "../seo/Seo";
import { INDUSTRIES_PATH } from "../routes.constants";

const TITLE = "Custom AI Marketing Software Development Services | Axiomra";
const DESCRIPTION =
  "AI marketing software development: campaign automation, marketing analytics, RTB, CRM and personalisation platforms that cut manual work and prove marketing ROI.";

export default function MarketingPage() {
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
        breadcrumbs={[{ name: "Industries", path: INDUSTRIES_PATH }, { name: "AI for Marketing" }]}
      />
      <MarketingHero />
      <MarketingIntro />
      <MarketingImpact />
      <MarketingChallenges />
      <MarketingServices />
      <MarketingMidCta />
      <MarketingSolutions />
      <MarketingStakeholders />
      <MarketingSubIndustries />
      <MarketingBenefits />
      <MarketingBuild />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <MarketingBlogs />
      <FAQ id="marketing-faq" eyebrow="Marketing questions" items={faqs} />
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
