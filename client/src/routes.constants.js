/**
 * Route paths and slugs, kept free of page data.
 *
 * The data files re-export these, but anything that only needs a path (the
 * router, navbar, footer, cross-links inside other data files) should import
 * from here: importing a path from a data file pulls that whole file, images
 * and all, into the importer's chunk. App.jsx importing CASE_STUDIES_PATH from
 * caseStudiesData.js used to put every case study into the entry bundle.
 */

export const SERVICES_BASE_PATH = "/ai-services-and-solutions";
export const ABOUT_PATH = "/about";
export const TECH_PATH = "/tech";
export const FAQS_PATH = "/faqs";
export const PORTFOLIO_PATH = "/portfolio";
export const INDUSTRIES_PATH = "/industries";
export const CASE_STUDIES_PATH = "/case-studies";

/** Route for one industry's detail page. */
export const industryPath = (slug) => `${INDUSTRIES_PATH}/${slug}`;

export const caseStudyPath = (slug) => `${CASE_STUDIES_PATH}/${slug}`;

// Service detail slugs, under SERVICES_BASE_PATH.
export const AI_DEVELOPMENT_SLUG = "ai-development-services";
export const GENERATIVE_AI_SLUG = "generative-ai-services";
export const AGENTIC_AI_SLUG = "agentic-ai-services";
export const COMPUTER_VISION_SLUG = "computer-vision-services";
export const NLP_SLUG = "natural-language-processing-services";

export const BLOG_PATH = "/blogs";
export const blogPostPath = (slug) => `${BLOG_PATH}/${slug}`;
