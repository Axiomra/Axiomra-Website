import { useEffect } from "react";
import GradientCTA from "../components/GradientCTA";

import Hero from "../sections/Hero";
import FoundersSay from "../sections/FoundersSay";
import Transformation from "../sections/Transformation";
import VideoTestimonials from "../sections/VideoTestimonials";
import Services from "../sections/Services";
import Industries from "../sections/Industries";
import Portfolio from "../sections/Portfolio";
import Process from "../sections/Process";
import TestimonialWall from "../sections/TestimonialWall";
import TechStack from "../sections/TechStack";
import WhyUs from "../sections/WhyUs";
import Certifications from "../sections/Certifications";
import RoiCalculator from "../sections/RoiCalculator";
import ProvenResults from "../sections/ProvenResults";
import Awards from "../sections/Awards";
import Resources from "../sections/Resources";
import FAQ from "../sections/FAQ";
import Contact from "../sections/Contact";

export default function HomePage() {
  useEffect(() => {
    document.title = "Axiomra: Result-Driven AI Development Company";
  }, []);

  return (
    <>
      <Hero />
      <FoundersSay />
      <Transformation />
      <VideoTestimonials />
      <GradientCTA
        title="Want These Results For Your Business?"
        subtitle="We've done it for 300+ clients. Book a discovery call today, and our AI development partner team will map out a custom AI roadmap to eliminate manual overhead and boost your bottom line."
      />
      <Services />
      <GradientCTA
        title="Get A Custom AI Roadmap Built For Your Specific Needs"
        subtitle="In one strategic session, we will evaluate your goals, recommend the most impactful services, and provide a step-by-step plan."
        buttonText="Get Your Custom AI Roadmap"
        dark
        three
      />
      <Industries />
      <TestimonialWall />
      <Portfolio />
      <GradientCTA
        title="Turn Our Case Studies Into Your Next Win"
        subtitle="We'll map the right AI services to your goals and deliver a clear plan to production."
        buttonText="Claim Your Free Consultation"
        dark
        three
      />
      <Process />
      <TechStack />
      <WhyUs />
      <Certifications />
      <RoiCalculator />
      <ProvenResults />
      <Awards />
      <Resources />
      <FAQ />
      <Contact />
      <GradientCTA
        title="Find the Right AI Opportunity for Your Business"
        subtitle="Book a free AI strategy session to discuss your goals, assess relevant use cases, and identify a practical next step."
        buttonText="Book Your Free AI Strategy Session"
      />
    </>
  );
}
