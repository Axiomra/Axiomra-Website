import { useEffect } from "react";

import CvHero from "../components/computer-vision/CvHero";
import CvTechBar from "../components/computer-vision/CvTechBar";
import CvChallenges from "../components/computer-vision/CvChallenges";
import CvServices from "../components/computer-vision/CvServices";
import CvExpertise from "../components/computer-vision/CvExpertise";
import CvCaseStudies from "../components/computer-vision/CvCaseStudies";
import CvIndustries from "../components/computer-vision/CvIndustries";
import CvStack from "../components/computer-vision/CvStack";
import CvProcess from "../components/computer-vision/CvProcess";
import CvOutcomes from "../components/computer-vision/CvOutcomes";
import CvWhyUs from "../components/computer-vision/CvWhyUs";

import GradientCTA from "../components/GradientCTA";
import FAQ from "../sections/FAQ";

import { faqs } from "../data/computerVisionData";

const META_DESCRIPTION =
  "Axiomra's computer vision development services: object detection, facial " +
  "recognition, pose estimation, image and video analytics, OCR, and GAN-based " +
  "image generation, all built, deployed, and supported in production.";

export default function ComputerVisionPage() {
  useEffect(() => {
    document.title = "Custom Computer Vision Development Services | Axiomra";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", META_DESCRIPTION);
  }, []);

  return (
    <div>
      <CvHero />
      <CvTechBar />
      <CvChallenges />
      <CvServices />
      <CvExpertise />

      <GradientCTA
        title={
          <>
            Not Sure Which Service
            <br />
            Fits Your Problem?
          </>
        }
        subtitle="Most businesses know they have a visual data problem. They just do not know which computer vision service solves it. Book a free 30-minute call with our team. We will review your use case, tell you what is technically possible, and give you a clear path forward. No sales pitch, no commitment."
        buttonText="Book A Free Strategy Call"
      />

      <CvCaseStudies />
      <CvIndustries />
      <CvStack />
      <CvProcess />

      <GradientCTA
        title={
          <>
            Your Industry Is
            <br />
            Not On The List?
          </>
        }
        subtitle="We have built computer vision solutions for 15+ industries. If yours is not listed, that does not mean we cannot help. Bring us your use case and we will tell you honestly what is possible with the data and cameras you already have."
        buttonText="Talk To A Computer Vision Expert"
      />

      <CvOutcomes />
      <CvWhyUs />

      <GradientCTA
        dark
        three
        title={
          <>
            See The Difference
            <br />
            For Yourself.
          </>
        }
        subtitle="We do not ask you to take our word for it. Book a free consultation and we will walk you through real projects, real timelines, and real outcomes from clients in your industry, then tell you whether computer vision is the right answer for yours."
        buttonText="Get A Free Project Assessment"
      />

      <FAQ id="computer-vision-faq" eyebrow="Computer vision, answered" items={faqs} />
    </div>
  );
}
