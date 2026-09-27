import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import FinanceHero from "../components/industries/finance/FinanceHero";
import FinanceIntro from "../components/industries/finance/FinanceIntro";
import FinanceSignal from "../components/industries/finance/FinanceSignal";
import FinanceImpact from "../components/industries/finance/FinanceImpact";
import FinanceChallenges from "../components/industries/finance/FinanceChallenges";
import FinanceServices from "../components/industries/finance/FinanceServices";
import FinanceMidCta from "../components/industries/finance/FinanceMidCta";
import FinanceSolutions from "../components/industries/finance/FinanceSolutions";
import FinanceStakeholders from "../components/industries/finance/FinanceStakeholders";
import FinanceSubIndustries from "../components/industries/finance/FinanceSubIndustries";
import FinanceBenefits from "../components/industries/finance/FinanceBenefits";
import FinanceBuild from "../components/industries/finance/FinanceBuild";
import FinanceBlogs from "../components/industries/finance/FinanceBlogs";
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
} from "../data/financeData";
import Seo from "../seo/Seo";
import { INDUSTRIES_PATH } from "../data/industriesData";

const TITLE = "Custom AI Financial Software Development Services | Axiomra";
const DESCRIPTION =
  "AI financial software development: fraud detection, risk modelling, payments, lending, wealth and reconciliation platforms built for compliance and scale.";

export default function FinancePage() {
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
        breadcrumbs={[{ name: "Industries", path: INDUSTRIES_PATH }, { name: "AI for Finance" }]}
      />
      <FinanceHero />
      <FinanceIntro />
      <FinanceImpact />
      <FinanceSignal />
      <FinanceChallenges />
      <FinanceServices />
      <FinanceMidCta />
      <FinanceSolutions />
      <FinanceStakeholders />
      <FinanceSubIndustries />
      <FinanceBenefits />
      <FinanceBuild />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <FinanceBlogs />
      <FAQ id="finance-faq" eyebrow="Finance questions" items={faqs} />
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
