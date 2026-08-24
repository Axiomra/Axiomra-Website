/** Remote imagery used across the marketing sections. */
import healthaiImg from "../assets/box/healthai.webp";
import eductionaiImg from "../assets/box/eductionai.webp";
import fashionImg from "../assets/box/fashion.jpeg";
import realestateImg from "../assets/box/realestate.jpeg";
import sportImg from "../assets/box/sport ai.jpeg";
import retailImg from "../assets/box/retail.jpeg";
import transportationImg from "../assets/box/transportation-and-AI.webp";
import supplyChainImg from "../assets/box/supply chain.jpeg";
import financeImg from "../assets/box/finance.jpeg";
import insuranceImg from "../assets/box/insurance.jpeg";
import legalImg from "../assets/box/legal .jpeg";
import marketingImg from "../assets/box/marketing ai.jpeg";

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
