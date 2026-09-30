import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import FashionHero from "../components/industries/fashion/FashionHero";
import FashionIntro from "../components/industries/fashion/FashionIntro";
import FashionImpact from "../components/industries/fashion/FashionImpact";
import FashionServices from "../components/industries/fashion/FashionServices";
import FashionSolutions from "../components/industries/fashion/FashionSolutions";
import FashionTechnologies from "../components/industries/fashion/FashionTechnologies";
import FashionStreamline from "../components/industries/fashion/FashionStreamline";
import FashionMidCta from "../components/industries/fashion/FashionMidCta";
import FashionStakeholders from "../components/industries/fashion/FashionStakeholders";
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
} from "../data/fashionData";
import Seo from "../seo/Seo";
import { INDUSTRIES_PATH } from "../routes.constants";

const TITLE = "Custom Fashion App Development Services | Axiomra";
const DESCRIPTION =
  "AI-powered fashion software development: virtual fitting rooms, demand forecasting, fashion analytics, e-commerce personalisation and design tools that cut returns and lift margins.";

export default function FashionPage() {
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
        breadcrumbs={[{ name: "Industries", path: INDUSTRIES_PATH }, { name: "AI for Fashion" }]}
      />
      <FashionHero />
      <FashionIntro />
      <FashionImpact />
      <FashionServices />
      <FashionSolutions />
      <FashionTechnologies />
      <IndustriesTechStrip data={techStrip} />
      <FashionStreamline />
      <FashionMidCta />
      <FashionStakeholders />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPortfolio data={showcase} />
      <IndustriesPartner data={partner} />
      <FAQ id="fashion-faq" eyebrow="Fashion questions" items={faqs} />
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
