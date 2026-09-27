/**
 * Every indexable URL on the site, with the source files whose last commit
 * date becomes its <lastmod>. Read at build time only by
 * scripts/generate-sitemap.mjs; nothing in the app imports it.
 *
 * Excluded on purpose: /admin/*, and the "coming soon" service placeholders
 * (they render with noindex). A service joins the sitemap once it has its own
 * page, which means adding its slug to BUILT_SERVICE_PAGES below.
 */
import { SERVICES_BASE_PATH } from "../data/servicesData";
import { ABOUT_PATH } from "../data/aboutData";
import { TECH_PATH } from "../data/techStackData";
import { FAQS_PATH } from "../data/faqsData";
import { PORTFOLIO_PATH } from "../data/portfolioData";
import { CASE_STUDIES_PATH, caseStudies } from "../data/caseStudiesData";
import { INDUSTRIES_PATH, industries } from "../data/industriesData";
import { AI_DEVELOPMENT_SLUG } from "../data/aiDevelopmentData";
import { GENERATIVE_AI_SLUG } from "../data/generativeAiData";
import { AGENTIC_AI_SLUG } from "../data/agenticAiData";
import { COMPUTER_VISION_SLUG } from "../data/computerVisionData";
import { NLP_SLUG } from "../data/nlpData";

const BUILT_SERVICE_PAGES = {
  [AI_DEVELOPMENT_SLUG]: "src/pages/AiDevelopmentPage.jsx",
  [GENERATIVE_AI_SLUG]: "src/pages/GenerativeAiPage.jsx",
  [AGENTIC_AI_SLUG]: "src/pages/AgenticAiPage.jsx",
  [COMPUTER_VISION_SLUG]: "src/pages/ComputerVisionPage.jsx",
  [NLP_SLUG]: "src/pages/NlpPage.jsx",
};

// "real-estate" -> "RealEstatePage.jsx", matching the page file names.
const industryPageFile = (slug) =>
  "src/pages/" +
  slug.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase()) +
  "Page.jsx";

export default function sitemapRoutes() {
  return [
    { path: "/", sources: ["src/pages/HomePage.jsx", "src/sections"] },
    { path: ABOUT_PATH, sources: ["src/pages/AboutPage.jsx", "src/data/aboutData.js"] },
    { path: TECH_PATH, sources: ["src/pages/TechStackPage.jsx", "src/data/techStackData.js"] },
    { path: FAQS_PATH, sources: ["src/pages/FaqsPage.jsx", "src/data/faqsData.js"] },
    { path: "/contact", sources: ["src/pages/ContactPage.jsx"] },
    { path: PORTFOLIO_PATH, sources: ["src/pages/PortfolioPage.jsx", "src/data/portfolioData.js"] },
    { path: SERVICES_BASE_PATH, sources: ["src/pages/ServicesPage.jsx", "src/data/servicesData.js"] },
    ...Object.entries(BUILT_SERVICE_PAGES).map(([slug, file]) => ({
      path: `${SERVICES_BASE_PATH}/${slug}`,
      sources: [file],
    })),
    { path: INDUSTRIES_PATH, sources: ["src/pages/IndustriesPage.jsx", "src/data/industriesData.js"] },
    ...industries.map(({ slug }) => ({
      path: `${INDUSTRIES_PATH}/${slug}`,
      sources: [industryPageFile(slug)],
    })),
    ...Object.keys(caseStudies).map((slug) => ({
      path: `${CASE_STUDIES_PATH}/${slug}`,
      sources: ["src/data/caseStudiesData.js"],
    })),
  ];
}
