/**
 * Every indexable URL on the site, with the source files whose last commit
 * date becomes its <lastmod>. Read at build time only by
 * scripts/generate-sitemap.mjs; nothing in the app imports it.
 *
 * Excluded on purpose: /admin/*, and the "coming soon" service placeholders
 * (they render with noindex). A service joins the sitemap once it has its own
 * page, which means adding its slug to BUILT_SERVICE_PAGES below.
 */
import {
  SERVICES_BASE_PATH,
  ABOUT_PATH,
  TECH_PATH,
  FAQS_PATH,
  PORTFOLIO_PATH,
  CASE_STUDIES_PATH,
  INDUSTRIES_PATH,
  AI_DEVELOPMENT_SLUG,
  GENERATIVE_AI_SLUG,
  AGENTIC_AI_SLUG,
  COMPUTER_VISION_SLUG,
  NLP_SLUG,
} from "../routes.constants";
import { caseStudies } from "../data/caseStudiesData";
import { industries } from "../data/industriesData";

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
