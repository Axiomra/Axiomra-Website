import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import RetailHero from "../components/industries/retail/RetailHero";
import RetailIntro from "../components/industries/retail/RetailIntro";
import RetailImpact from "../components/industries/retail/RetailImpact";
import RetailChallenges from "../components/industries/retail/RetailChallenges";
import RetailServices from "../components/industries/retail/RetailServices";
import RetailAppTypes from "../components/industries/retail/RetailAppTypes";
import RetailTechnologies from "../components/industries/retail/RetailTechnologies";
import RetailSolutions from "../components/industries/retail/RetailSolutions";
import RetailMidCta from "../components/industries/retail/RetailMidCta";
import RetailStakeholders from "../components/industries/retail/RetailStakeholders";
import RetailBlogs from "../components/industries/retail/RetailBlogs";
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
} from "../data/retailData";
import Seo from "../seo/Seo";

const TITLE = "Retail Software Development Services | AI for Retail | Axiomra";
const DESCRIPTION =
  "AI-powered retail software development: order management, POS, retail CRM, demand forecasting and computer vision for retailers, brands and marketplaces.";

export default function RetailPage() {
  // Lazy photos land after the triggers were measured; once the page has
  // fully loaded, remeasure so nothing reveals early or late.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    return () => window.removeEventListener("load", refresh);
  }, []);

  // `retail-page` carries the glass kit's tint/alpha variables: every
  // `.liquid-glass` below reads them, so the wrapper is not optional.
  return (
    <div className="retail-page">
      <Seo title={TITLE} description={DESCRIPTION} />
      <RetailHero />
      <RetailIntro />
      <RetailImpact />
      <RetailChallenges />
      <RetailServices />
      <RetailAppTypes />
      <RetailTechnologies />
      <RetailSolutions />
      <RetailMidCta />
      <RetailStakeholders />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <RetailBlogs />
      <FAQ id="retail-faq" eyebrow="Retail questions" items={faqs} />
      <GradientCTA
        dark
        image={finalCta.background}
        title={finalCta.title}
        subtitle={finalCta.subtitle}
        buttonText={finalCta.buttonText}
      />
    </div>
  );
}
