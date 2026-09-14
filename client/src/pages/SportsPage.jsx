import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import SportsHero from "../components/industries/sports/SportsHero";
import SportsIntro from "../components/industries/sports/SportsIntro";
import SportsImpact from "../components/industries/sports/SportsImpact";
import SportsChallenges from "../components/industries/sports/SportsChallenges";
import SportsServices from "../components/industries/sports/SportsServices";
import SportsMidCta from "../components/industries/sports/SportsMidCta";
import SportsSolutions from "../components/industries/sports/SportsSolutions";
import SportsStakeholders from "../components/industries/sports/SportsStakeholders";
import SportsWeServe from "../components/industries/sports/SportsWeServe";
import SportsBenefits from "../components/industries/sports/SportsBenefits";
import SportsBuild from "../components/industries/sports/SportsBuild";
import SportsBlogs from "../components/industries/sports/SportsBlogs";
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
} from "../data/sportsData";

const TITLE = "Custom AI Sports Software Development Services | Axiomra";
const DESCRIPTION =
  "AI sports software development: athlete performance analytics, injury prevention, video and computer vision, league management, ticketing and fan engagement platforms.";

export default function SportsPage() {
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
      <SportsHero />
      <SportsIntro />
      <SportsImpact />
      <SportsChallenges />
      <SportsServices />
      <SportsMidCta />
      <SportsSolutions />
      <SportsStakeholders />
      <SportsWeServe />
      <SportsBenefits />
      <SportsBuild />
      <IndustriesPortfolio data={showcase} />
      <IndustriesTechStrip data={techStrip} />
      <IndustriesBusinessTypes data={businessTypes} />
      <IndustriesTestimonials data={testimonials} />
      <IndustriesPartner data={partner} />
      <SportsBlogs />
      <FAQ id="sports-faq" eyebrow="Sports questions" items={faqs} />
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
