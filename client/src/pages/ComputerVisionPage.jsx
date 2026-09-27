
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
import Seo from "../seo/Seo";

const META_DESCRIPTION =
  "Axiomra builds computer vision systems for business operations: object " +
  "detection, facial recognition, pose estimation, image and video analytics, " +
  "OCR, and image generation, built, integrated, and supported in production.";

export default function ComputerVisionPage() {
  return (
    <div>
      <Seo title="Computer Vision Development Services | Axiomra" description={META_DESCRIPTION} />
      <CvHero />
      <CvTechBar />
      <CvChallenges />
      <CvServices />
      <CvExpertise />

      <GradientCTA
        title="Not Sure Which Service Fits Your Problem?"
        subtitle="If you know you have a visual data problem but not which approach solves it, book a free consultation. We will review your use case, set out what is technically possible with the data and cameras you have, and recommend a practical next step."
        buttonText="Book a Free Consultation"
      />

      <CvCaseStudies />
      <CvIndustries />
      <CvStack />
      <CvProcess />

      <GradientCTA
        title="Your Industry Is Not On the List?"
        subtitle="The industries above are examples, not limits. Bring us your use case and we will assess what is achievable with the visual data and equipment you already have, and where the gaps are."
        buttonText="Discuss Your Use Case"
      />

      <CvOutcomes />
      <CvWhyUs />

      <GradientCTA
        dark
        three
        title="Your Next Computer Vision Project Starts With a Clear Plan"
        subtitle="Book a free consultation to talk through your use case, the data you hold, and the outcome you need. You will leave with a view on feasibility, an indicative scope, and an honest answer on whether computer vision is the right approach."
        buttonText="Book a Free Consultation"
      />

      <FAQ id="computer-vision-faq" eyebrow="Computer vision questions" items={faqs} />
    </div>
  );
}
