import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import TransportationHero from "../components/industries/transportation/TransportationHero";
import TransportationIntro from "../components/industries/transportation/TransportationIntro";
import TransportationImpact from "../components/industries/transportation/TransportationImpact";
import TransportationChallenges from "../components/industries/transportation/TransportationChallenges";
import TransportationSolutions from "../components/industries/transportation/TransportationSolutions";
import TransportationMidCta from "../components/industries/transportation/TransportationMidCta";
import TransportationServices from "../components/industries/transportation/TransportationServices";
import TransportationModes from "../components/industries/transportation/TransportationModes";
import TransportationBenefits from "../components/industries/transportation/TransportationBenefits";
import TransportationBuild from "../components/industries/transportation/TransportationBuild";
import TransportationBlogs from "../components/industries/transportation/TransportationBlogs";
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
} from "../data/transportationData";
import Seo from "../seo/Seo";
import { INDUSTRIES_PATH } from "../routes.constants";

const TITLE = "Custom Transportation & Logistics Software Development | Axiomra";
const DESCRIPTION =
  "Transportation software development: TMS platforms, fleet telematics, route optimisation, freight visibility, asset tracking, transit and mobility apps built for live operations.";

export default function TransportationPage() {
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
        breadcrumbs={[{ name: "Industries", path: INDUSTRIES_PATH }, { name: "AI for Transportation" }]}
      />
      <TransportationHero />
      <TransportationIntro />
      <TransportationImpact />
      <TransportationChallenges />
      <TransportationSolutions />
      <TransportationMidCta />
      <TransportationServices />
      <TransportationModes />
      <TransportationBenefits />
      <TransportationBuild />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <TransportationBlogs />
      <FAQ id="transportation-faq" eyebrow="Transportation questions" items={faqs} />
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
