/** Remote imagery used across the marketing sections. */
// The industry panel is full-bleed, so it pulls the 1920px industry photos
// rather than the small /box thumbnails, which visibly smeared when stretched.
import healthaiImg from "../assets/industries/healthcare.webp";
import eductionaiImg from "../assets/industries/education.webp";
import fashionImg from "../assets/industries/fashion.webp";
import realestateImg from "../assets/industries/real-estate.webp";
import sportImg from "../assets/industries/sports.webp";
import retailImg from "../assets/industries/retail.webp";
import transportationImg from "../assets/industries/transportation.webp";
import supplyChainImg from "../assets/industries/supply-chain.webp";
import financeImg from "../assets/industries/finance.webp";
import insuranceImg from "../assets/industries/insurance.webp";
import legalImg from "../assets/industries/legal.webp";
import marketingImg from "../assets/industries/marketing.webp";

const unsplash = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const INDUSTRY_IMAGES = {
  Healthcare: healthaiImg,
  Education: eductionaiImg,
  Fashion: fashionImg,
  "Real Estate": realestateImg,
  Sports: sportImg,
  Retail: retailImg,
  Transportation: transportationImg,
  "Supply Chain": supplyChainImg,
  Finance: financeImg,
  Insurance: insuranceImg,
  "Legal Business": legalImg,
  Marketing: marketingImg,
};

/** Blog / resource cards. */
export const RESOURCE_IMAGES = {
  "MVP vs. Full-Scale Custom AI Development": unsplash("1531403009284-440f080d1e12"),
  "Custom AI Development Timeline: 2026 Benchmarks": unsplash("1518186285589-2f7649de83e0"),
  "Why AI Projects Fail: 10 Root Causes": unsplash("1454165804606-c3d57bc86b40"),
};

/** Misc one-offs. */
export const METRIC_IMAGE = unsplash("1516321318423-f06f85e504b3", 600);

/** Intro video shown beside the contact form (privacy-friendly host). */
export const INTRO_VIDEO = {
  id: "2ePf9rue1Ao",
  title: "What is Artificial Intelligence? In 5 minutes",
  poster: "https://i.ytimg.com/vi/2ePf9rue1Ao/maxresdefault.jpg",
  embed: "https://www.youtube-nocookie.com/embed/2ePf9rue1Ao?autoplay=1&rel=0",
};
