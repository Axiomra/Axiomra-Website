import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import RealEstateHero from "../components/industries/real-estate/RealEstateHero";
import RealEstateIntro from "../components/industries/real-estate/RealEstateIntro";
import RealEstateImpact from "../components/industries/real-estate/RealEstateImpact";
import RealEstateSolutions from "../components/industries/real-estate/RealEstateSolutions";
import RealEstateApps from "../components/industries/real-estate/RealEstateApps";
import RealEstateTechnologies from "../components/industries/real-estate/RealEstateTechnologies";
import RealEstateBenefits from "../components/industries/real-estate/RealEstateBenefits";
import RealEstateMidCta from "../components/industries/real-estate/RealEstateMidCta";
import RealEstateStakeholders from "../components/industries/real-estate/RealEstateStakeholders";
import RealEstateBuild from "../components/industries/real-estate/RealEstateBuild";
import RealEstateBlogs from "../components/industries/real-estate/RealEstateBlogs";
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
} from "../data/realEstateData";

const TITLE = "Custom Real Estate App Development Services | Axiomra";
const DESCRIPTION =
  "AI real estate software development: property valuation, listing platforms, CRM, transaction and property management systems that close deals faster and run a portfolio from one place.";

export default function RealEstatePage() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = TITLE;

    const meta = document.querySelector('meta[name="description"]');
    const prevDescription = meta?.getAttribute("content");
    meta?.setAttribute("content", DESCRIPTION);

    return () => {
      document.title = prevTitle;
      if (meta && prevDescription != null) meta.setAttribute("content", prevDescription);
    };
  }, []);

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
      <RealEstateHero />
      <RealEstateIntro />
      <RealEstateImpact />
      <RealEstateSolutions />
      <RealEstateApps />
      <RealEstateTechnologies />
      <IndustriesTechStrip data={techStrip} />
      <RealEstateBenefits />
      <RealEstateMidCta />
      <IndustriesBusinessTypes data={businessTypes} />
      <RealEstateStakeholders />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPortfolio data={showcase} />
      <RealEstateBuild />
      <IndustriesPartner data={partner} />
      <RealEstateBlogs />
      <FAQ id="real-estate-faq" eyebrow="Real estate questions" items={faqs} />
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
