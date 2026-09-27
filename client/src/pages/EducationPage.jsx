import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import EducationHero from "../components/industries/education/EducationHero";
import EducationIntro from "../components/industries/education/EducationIntro";
import EducationImpact from "../components/industries/education/EducationImpact";
import EducationChallenges from "../components/industries/education/EducationChallenges";
import EducationServices from "../components/industries/education/EducationServices";
import EducationSpecialisms from "../components/industries/education/EducationSpecialisms";
import EducationTechnologies from "../components/industries/education/EducationTechnologies";
import EducationStreamline from "../components/industries/education/EducationStreamline";
import EducationStakeholders from "../components/industries/education/EducationStakeholders";
import EducationMidCta from "../components/industries/education/EducationMidCta";
import EducationBlogs from "../components/industries/education/EducationBlogs";
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
} from "../data/educationData";
import Seo from "../seo/Seo";

const TITLE = "Education Software Development Services | AI EdTech | Axiomra";
const DESCRIPTION =
  "AI-powered education software development: LMS and SIS platforms, adaptive learning, automated assessment and analytics for schools, universities and EdTech founders.";

export default function EducationPage() {
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
      <EducationHero />
      <EducationIntro />
      <EducationImpact />
      <EducationChallenges />
      <EducationServices />
      <EducationSpecialisms />
      <EducationTechnologies />
      <EducationStreamline />
      <EducationStakeholders />
      <EducationMidCta />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <EducationBlogs />
      <FAQ id="education-faq" eyebrow="Education questions" items={faqs} />
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
