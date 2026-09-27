import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import SupplyChainHero from "../components/industries/supply-chain/SupplyChainHero";
import SupplyChainIntro from "../components/industries/supply-chain/SupplyChainIntro";
import SupplyChainImpact from "../components/industries/supply-chain/SupplyChainImpact";
import SupplyChainChallenges from "../components/industries/supply-chain/SupplyChainChallenges";
import SupplyChainServices from "../components/industries/supply-chain/SupplyChainServices";
import SupplyChainMidCta from "../components/industries/supply-chain/SupplyChainMidCta";
import SupplyChainSolutions from "../components/industries/supply-chain/SupplyChainSolutions";
import SupplyChainStakeholders from "../components/industries/supply-chain/SupplyChainStakeholders";
import SupplyChainSubIndustries from "../components/industries/supply-chain/SupplyChainSubIndustries";
import SupplyChainBenefits from "../components/industries/supply-chain/SupplyChainBenefits";
import SupplyChainBuild from "../components/industries/supply-chain/SupplyChainBuild";
import SupplyChainBlogs from "../components/industries/supply-chain/SupplyChainBlogs";
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
} from "../data/supplyChainData";
import Seo from "../seo/Seo";

const TITLE = "Custom AI Supply Chain Software Development Services | Axiomra";
const DESCRIPTION =
  "AI supply chain software development: ERP, MRP, WMS, TMS and OMS platforms, demand forecasting, control-tower visibility and logistics optimisation built around your data.";

export default function SupplyChainPage() {
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
      <Seo title={TITLE} description={DESCRIPTION} />
      <SupplyChainHero />
      <SupplyChainIntro />
      <SupplyChainImpact />
      <SupplyChainChallenges />
      <SupplyChainServices />
      <SupplyChainMidCta />
      <SupplyChainSolutions />
      <SupplyChainStakeholders />
      <SupplyChainSubIndustries />
      <SupplyChainBenefits />
      <SupplyChainBuild />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <SupplyChainBlogs />
      <FAQ id="supply-chain-faq" eyebrow="Supply chain questions" items={faqs} />
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
