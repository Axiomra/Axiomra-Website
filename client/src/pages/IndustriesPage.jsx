import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import IndustriesHero from "../components/industries/IndustriesHero";
import IndustryList from "../components/industries/IndustryList";
import IndustriesTechStrip from "../components/industries/IndustriesTechStrip";
import IndustriesPortfolio from "../components/industries/IndustriesPortfolio";
import IndustriesBusinessTypes from "../components/industries/IndustriesBusinessTypes";
import IndustriesPartner from "../components/industries/IndustriesPartner";
import IndustriesTestimonials from "../components/industries/IndustriesTestimonials";
import FAQ from "../sections/FAQ";
import GradientCTA from "../components/GradientCTA";
import { faqs, finalCta } from "../data/industriesData";
import Seo from "../seo/Seo";

const TITLE = "AI Solutions for Industries | Axiomra";
const DESCRIPTION =
  "Advanced AI solutions for fashion, sports, education, healthcare, real estate, retail, marketing, supply chain, insurance, finance, legal and transportation.";

export default function IndustriesPage() {
  // Twelve lazily loaded photos land after the triggers were measured; once
  // the page has fully loaded, remeasure so nothing reveals early or late.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh, { once: true });
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <>
      <Seo title={TITLE} description={DESCRIPTION} breadcrumbs={[{ name: "Industries" }]} />
      <IndustriesHero />
      <IndustryList />
      <IndustriesTechStrip />
      <IndustriesPortfolio />
      <IndustriesBusinessTypes />
      <IndustriesPartner />
      <IndustriesTestimonials />
      <FAQ id="industries-faq" eyebrow="Industry questions" items={faqs} />
      {/* three.js is deliberately left off here; the hero is the only WebGL on the page. */}
      <GradientCTA
        dark
        title={finalCta.title}
        subtitle={finalCta.subtitle}
        buttonText={finalCta.buttonText}
      />
    </>
  );
}
