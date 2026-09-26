/**
 * Long-form case studies, keyed by slug. The detail page renders whatever is
 * here, so a new study is a new entry, not a new component.
 *
 * Copy is taken from the source case-study documents. Figures that have not
 * been measured in production carry `target: true` on their row, and the page
 * badges them as targets. Never flip that flag without real analytics behind it.
 *
 * @typedef {{ src: string, width: number }} ImageSource
 * @typedef {{ photographer: string, site: string, url: string }} ImageCredit
 * @typedef {{ sources: ImageSource[], width: number, height: number, alt: string, imageCredit?: ImageCredit, logoBaked?: boolean }} CaseImage
 * `logoBaked` marks legacy files with the Axiomra mark already in the pixels,
 * so <BrandedImage> skips its overlay. Never set it on a new image.
 * Entries come in two kinds. "client" studies describe delivered work.
 * "blueprint" studies are representative solution designs: they carry a
 * visible badge, use `highlights` instead of `stats`, and put any outcome
 * figure in `targetOutcome`, which the page styles as a goal, never a result.
 * A highlight `value` may only state a fact of the design (hours, systems).
 * Every section below `hero` is optional unless marked otherwise; the page
 * skips what an entry leaves out.
 *
 * @typedef {{ lead?: string, text: string }} LeadItem
 * @typedef {{ metric: string, traditional: string, agent: string, target?: boolean }} OutcomeRow
 *
 * @typedef {Object} CaseStudy
 * @property {string} slug
 * @property {"client" | "blueprint"} type
 * @property {string} accent              Hex hue, used only as light tints. Unique per study.
 * @property {string} title
 * @property {string} eyebrow             Category, shown in the hero badge.
 * @property {string} subtitle
 * @property {string} seoTitle
 * @property {string} seoDescription
 * @property {string} ogImage              Path under /public.
 * @property {CaseImage} hero
 * @property {{ value: string, label: string, target?: boolean }[]} [stats]   `target` adds a not-yet-measured note.
 * @property {{ value?: string, title: string, text: string }[]} [highlights]   Stat cards for blueprints. A `value` is a design figure, never a result, and is noted as such.
 * @property {{ summary?: string, challenge: string, solution: string, technologies: string }} keyDetails
 * @property {string[]} [executiveSummary]
 * @property {string[]} [context]
 * @property {CaseImage} [contextImage]
 * @property {{ intro?: string, items: LeadItem[] }} [challenge]
 * @property {string} [insight]
 * @property {string} [insightLabel]
 * @property {string[]} [solution]
 * @property {boolean} [solutionAsList]    Render `solution` as bullets instead of prose.
 * @property {{ capability: string, value: string }[]} [capabilities]
 * @property {{ title: string, text: string, checkpoint?: boolean }[]} [flow]   `checkpoint` marks a human step.
 * @property {CaseImage} [flowImage]
 * @property {string[]} [phases]
 * @property {{ layer: string, tool: string, purpose?: string }[]} [stack]
 * @property {{ intro: string, rows: OutcomeRow[] }} [outcome]
 * @property {string} [impactIntro]
 * @property {LeadItem[]} [impact]
 * @property {string} [targetOutcome]
 * @property {{ title: string, text: string }[]} [principles]
 * @property {string} [whyItMatters]
 * @property {string[]} [nextSteps]
 * @property {string[]} [tags]
 * @property {Partial<Record<string, string>>} [labels]   Section title overrides.
 * @property {{ title: string, subtitle: string, buttonText: string }} [cta]
 */

import hero800 from "../assets/case-studies/axiomra-ai-sales-agent/hero-800.webp";
import hero1400 from "../assets/case-studies/axiomra-ai-sales-agent/hero-1400.webp";
import hero2200 from "../assets/case-studies/axiomra-ai-sales-agent/hero-2200.webp";
import team800 from "../assets/case-studies/axiomra-ai-sales-agent/team-800.webp";
import team1400 from "../assets/case-studies/axiomra-ai-sales-agent/team-1400.webp";
import team2200 from "../assets/case-studies/axiomra-ai-sales-agent/team-2200.webp";
import handoff800 from "../assets/case-studies/axiomra-ai-sales-agent/handoff-800.webp";
import handoff1400 from "../assets/case-studies/axiomra-ai-sales-agent/handoff-1400.webp";
import handoff2200 from "../assets/case-studies/axiomra-ai-sales-agent/handoff-2200.webp";
import intakeHero800 from "../assets/case-studies/healthcare-patient-intake-triage-ai-agent/hero-800.webp";
import intakeHero1400 from "../assets/case-studies/healthcare-patient-intake-triage-ai-agent/hero-1400.webp";
import intakeHero2200 from "../assets/case-studies/healthcare-patient-intake-triage-ai-agent/hero-2200.webp";
import intakeScenario800 from "../assets/case-studies/healthcare-patient-intake-triage-ai-agent/scenario-800.webp";
import intakeScenario1400 from "../assets/case-studies/healthcare-patient-intake-triage-ai-agent/scenario-1400.webp";
import intakeScenario2200 from "../assets/case-studies/healthcare-patient-intake-triage-ai-agent/scenario-2200.webp";
import chatHero800 from "../assets/case-studies/healthcare-chatbot-virtual-assistant/hero-800.webp";
import chatHero1400 from "../assets/case-studies/healthcare-chatbot-virtual-assistant/hero-1400.webp";
import chatHero2200 from "../assets/case-studies/healthcare-chatbot-virtual-assistant/hero-2200.webp";
import chatStaff800 from "../assets/case-studies/healthcare-chatbot-virtual-assistant/staff-800.webp";
import chatStaff1400 from "../assets/case-studies/healthcare-chatbot-virtual-assistant/staff-1400.webp";
import chatStaff2200 from "../assets/case-studies/healthcare-chatbot-virtual-assistant/staff-2200.webp";
import chatAnswers800 from "../assets/case-studies/healthcare-chatbot-virtual-assistant/answers-800.webp";
import chatAnswers1400 from "../assets/case-studies/healthcare-chatbot-virtual-assistant/answers-1400.webp";
import chatAnswers2200 from "../assets/case-studies/healthcare-chatbot-virtual-assistant/answers-2200.webp";
import advisorHero800 from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/hero-800.webp";
import advisorHero1400 from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/hero-1400.webp";
import advisorHero2200 from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/hero-2200.webp";
import advisorMeeting800 from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/advisor-800.webp";
import advisorMeeting1400 from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/advisor-1400.webp";
import advisorMeeting2200 from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/advisor-2200.webp";
import advisorReview800 from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/review-800.webp";
import advisorReview1400 from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/review-1400.webp";
import advisorReview2200 from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/review-2200.webp";
import readmitHero800 from "../assets/case-studies/healthcare-readmission-risk-prediction/hero-800.webp";
import readmitHero1400 from "../assets/case-studies/healthcare-readmission-risk-prediction/hero-1400.webp";
import readmitHero2200 from "../assets/case-studies/healthcare-readmission-risk-prediction/hero-2200.webp";
import readmitDischarge800 from "../assets/case-studies/healthcare-readmission-risk-prediction/discharge-800.webp";
import readmitDischarge1400 from "../assets/case-studies/healthcare-readmission-risk-prediction/discharge-1400.webp";
import readmitDischarge2200 from "../assets/case-studies/healthcare-readmission-risk-prediction/discharge-2200.webp";
import readmitFollowup800 from "../assets/case-studies/healthcare-readmission-risk-prediction/followup-800.webp";
import readmitFollowup1400 from "../assets/case-studies/healthcare-readmission-risk-prediction/followup-1400.webp";
import readmitFollowup2200 from "../assets/case-studies/healthcare-readmission-risk-prediction/followup-2200.webp";
import imagingHero800 from "../assets/case-studies/healthcare-medical-imaging-disease-identification/hero-800.webp";
import imagingHero1400 from "../assets/case-studies/healthcare-medical-imaging-disease-identification/hero-1400.webp";
import imagingHero2200 from "../assets/case-studies/healthcare-medical-imaging-disease-identification/hero-2200.webp";
import imagingLightbox800 from "../assets/case-studies/healthcare-medical-imaging-disease-identification/lightbox-800.webp";
import imagingLightbox1400 from "../assets/case-studies/healthcare-medical-imaging-disease-identification/lightbox-1400.webp";
import imagingLightbox2200 from "../assets/case-studies/healthcare-medical-imaging-disease-identification/lightbox-2200.webp";
import imagingReview800 from "../assets/case-studies/healthcare-medical-imaging-disease-identification/review-800.webp";
import imagingReview1400 from "../assets/case-studies/healthcare-medical-imaging-disease-identification/review-1400.webp";
import imagingReview2200 from "../assets/case-studies/healthcare-medical-imaging-disease-identification/review-2200.webp";
import ptHero800 from "../assets/case-studies/ai-physical-therapy-pose-estimation/hero-800.webp";
import ptHero1400 from "../assets/case-studies/ai-physical-therapy-pose-estimation/hero-1400.webp";
import ptHero2200 from "../assets/case-studies/ai-physical-therapy-pose-estimation/hero-2200.webp";
import ptTherapist800 from "../assets/case-studies/ai-physical-therapy-pose-estimation/therapist-800.webp";
import ptTherapist1400 from "../assets/case-studies/ai-physical-therapy-pose-estimation/therapist-1400.webp";
import ptTherapist2200 from "../assets/case-studies/ai-physical-therapy-pose-estimation/therapist-2200.webp";
import ptSession800 from "../assets/case-studies/ai-physical-therapy-pose-estimation/session-800.webp";
import ptSession1400 from "../assets/case-studies/ai-physical-therapy-pose-estimation/session-1400.webp";
import ptSession2200 from "../assets/case-studies/ai-physical-therapy-pose-estimation/session-2200.webp";
import stockHero800 from "../assets/case-studies/retail-ai-inventory-demand-forecasting/hero-800.webp";
import stockHero1400 from "../assets/case-studies/retail-ai-inventory-demand-forecasting/hero-1400.webp";
import stockHero2200 from "../assets/case-studies/retail-ai-inventory-demand-forecasting/hero-2200.webp";
import stockShelves800 from "../assets/case-studies/retail-ai-inventory-demand-forecasting/shelves-800.webp";
import stockShelves1400 from "../assets/case-studies/retail-ai-inventory-demand-forecasting/shelves-1400.webp";
import stockShelves2200 from "../assets/case-studies/retail-ai-inventory-demand-forecasting/shelves-2200.webp";
import stockPlanner800 from "../assets/case-studies/retail-ai-inventory-demand-forecasting/planner-800.webp";
import stockPlanner1400 from "../assets/case-studies/retail-ai-inventory-demand-forecasting/planner-1400.webp";
import stockPlanner2200 from "../assets/case-studies/retail-ai-inventory-demand-forecasting/planner-2200.webp";
import creditHero800 from "../assets/case-studies/fintech-machine-learning-credit-scoring/hero-800.webp";
import creditHero1400 from "../assets/case-studies/fintech-machine-learning-credit-scoring/hero-1400.webp";
import creditHero2200 from "../assets/case-studies/fintech-machine-learning-credit-scoring/hero-2200.webp";
import creditApplicant800 from "../assets/case-studies/fintech-machine-learning-credit-scoring/applicant-800.webp";
import creditApplicant1400 from "../assets/case-studies/fintech-machine-learning-credit-scoring/applicant-1400.webp";
import creditApplicant2200 from "../assets/case-studies/fintech-machine-learning-credit-scoring/applicant-2200.webp";
import creditReview800 from "../assets/case-studies/fintech-machine-learning-credit-scoring/review-800.webp";
import creditReview1400 from "../assets/case-studies/fintech-machine-learning-credit-scoring/review-1400.webp";
import creditReview2200 from "../assets/case-studies/fintech-machine-learning-credit-scoring/review-2200.webp";
import retailHero800 from "../assets/case-studies/retail-ai-personalized-marketing/hero-800.webp";
import retailHero1400 from "../assets/case-studies/retail-ai-personalized-marketing/hero-1400.webp";
import retailHero2200 from "../assets/case-studies/retail-ai-personalized-marketing/hero-2200.webp";
import retailTeam800 from "../assets/case-studies/retail-ai-personalized-marketing/team-800.webp";
import retailTeam1400 from "../assets/case-studies/retail-ai-personalized-marketing/team-1400.webp";
import retailTeam2200 from "../assets/case-studies/retail-ai-personalized-marketing/team-2200.webp";
import retailShopper800 from "../assets/case-studies/retail-ai-personalized-marketing/shopper-800.webp";
import retailShopper1400 from "../assets/case-studies/retail-ai-personalized-marketing/shopper-1400.webp";
import retailShopper2200 from "../assets/case-studies/retail-ai-personalized-marketing/shopper-2200.webp";
import regHero800 from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/hero-800.webp";
import regHero1400 from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/hero-1400.webp";
import regHero2200 from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/hero-2200.webp";
import regBinders800 from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/binders-800.webp";
import regBinders1400 from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/binders-1400.webp";
import regBinders2200 from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/binders-2200.webp";
import regReview800 from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/review-800.webp";
import regReview1400 from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/review-1400.webp";
import regReview2200 from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/review-2200.webp";
import shopHero800 from "../assets/case-studies/retail-in-store-ai-shopping-assistant/hero-800.webp";
import shopHero1400 from "../assets/case-studies/retail-in-store-ai-shopping-assistant/hero-1400.webp";
import shopHero2200 from "../assets/case-studies/retail-in-store-ai-shopping-assistant/hero-2200.webp";
import shopAisle800 from "../assets/case-studies/retail-in-store-ai-shopping-assistant/aisle-800.webp";
import shopAisle1400 from "../assets/case-studies/retail-in-store-ai-shopping-assistant/aisle-1400.webp";
import shopAisle2200 from "../assets/case-studies/retail-in-store-ai-shopping-assistant/aisle-2200.webp";
import shopHandoff800 from "../assets/case-studies/retail-in-store-ai-shopping-assistant/handoff-800.webp";
import shopHandoff1400 from "../assets/case-studies/retail-in-store-ai-shopping-assistant/handoff-1400.webp";
import shopHandoff2200 from "../assets/case-studies/retail-in-store-ai-shopping-assistant/handoff-2200.webp";
import kycHero800 from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/hero-800.webp";
import kycHero1400 from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/hero-1400.webp";
import kycHero2200 from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/hero-2200.webp";
import kycManual800 from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/manual-800.webp";
import kycManual1400 from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/manual-1400.webp";
import kycManual2200 from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/manual-2200.webp";
import kycReview800 from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/review-800.webp";
import kycReview1400 from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/review-1400.webp";
import kycReview2200 from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/review-2200.webp";
import fraudHero800 from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/hero-800.webp";
import fraudHero1400 from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/hero-1400.webp";
import fraudHero2200 from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/hero-2200.webp";
import fraudCheckout800 from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/checkout-800.webp";
import fraudCheckout1400 from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/checkout-1400.webp";
import fraudCheckout2200 from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/checkout-2200.webp";
import fraudReview800 from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/review-800.webp";
import fraudReview1400 from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/review-1400.webp";
import fraudReview2200 from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/review-2200.webp";

import pricingHero800 from "../assets/case-studies/retail-dynamic-pricing-optimization/hero-800.webp";
import pricingHero1400 from "../assets/case-studies/retail-dynamic-pricing-optimization/hero-1400.webp";
import pricingHero2200 from "../assets/case-studies/retail-dynamic-pricing-optimization/hero-2200.webp";
import pricingAisle800 from "../assets/case-studies/retail-dynamic-pricing-optimization/aisle-800.webp";
import pricingAisle1400 from "../assets/case-studies/retail-dynamic-pricing-optimization/aisle-1400.webp";
import pricingAisle2200 from "../assets/case-studies/retail-dynamic-pricing-optimization/aisle-2200.webp";
import pricingReview800 from "../assets/case-studies/retail-dynamic-pricing-optimization/review-800.webp";
import pricingReview1400 from "../assets/case-studies/retail-dynamic-pricing-optimization/review-1400.webp";
import pricingReview2200 from "../assets/case-studies/retail-dynamic-pricing-optimization/review-2200.webp";

export const CASE_STUDIES_PATH = "/case-studies";

export const caseStudyPath = (slug) => `${CASE_STUDIES_PATH}/${slug}`;

/** @type {Record<string, CaseStudy>} */
export const caseStudies = {
  "axiomra-ai-sales-agent": {
    slug: "axiomra-ai-sales-agent",
    type: "client",
    accent: "#3B4FBF",
    eyebrow: "AI Agent",
    title: "Virtual Sales & Customer Support Assistant",
    subtitle:
      "A team of AI assistants that answers visitors, spots serious buyers, fills the CRM and books sales calls. Your sales team starts with context instead of cold research.",
    seoTitle: "AI Sales Agent Case Study: Virtual Sales & Support Assistant | Axiomra",
    seoDescription:
      "How Axiomra built a multi-agent GPT-4 assistant that engages website visitors 24/7, qualifies leads, creates Pipedrive opportunities and books sales calls.",
    ogImage: "/og/axiomra-ai-sales-agent.jpg",

    hero: {
      sources: [
        { src: hero800, width: 800 },
        { src: hero1400, width: 1400 },
        { src: hero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "A salesperson at a laptop in an open office, talking through a qualified inquiry",
      logoBaked: true,
    },

    stats: [
      { value: "24/7", label: "Replies to website visitors" },
      { value: "< 2 min", label: "Target time to first reply", target: true },
      { value: "60–70%", label: "Lower cost per serious lead", target: true },
      { value: "+27%", label: "More chats turned into booked calls", target: true },
    ],

    keyDetails: {
      summary: "An AI assistant that handles the first step of the sales conversation.",
      challenge:
        "Give every website visitor personal help, day and night. At the same time, lower sales costs and turn more visitors into customers.",
      solution:
        "A team of AI assistants that answers sales and support questions. It uses the company's own knowledge and connects to the CRM and call booking.",
      technologies:
        "AI that understands and writes natural language, a search over the company's own documents, cloud hosting, and a direct link to the CRM. Full details are in the technical section below.",
    },

    context: [
      "Axiomra wanted a better way to respond to website visitors, without relying only on when salespeople are free. Serious buyers can arrive outside business hours. Meanwhile, the sales team spent hours researching companies, answering the same questions and typing details into the CRM.",
      "The goal was an assistant that could handle the first step of a buyer conversation, all in one website visit.",
      "It would learn Axiomra's services and the visitor's business. It would check whether the visitor is a good fit. Then it would guide good-fit buyers toward a sales call.",
    ],
    contextImage: {
      sources: [
        { src: team800, width: 800 },
        { src: team1400, width: 1400 },
        { src: team2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "Support staff on headsets at their desks handling first responses by hand",
      logoBaked: true,
    },

    challenge: {
      intro: "The project tackled three sales problems that kept coming up:",
      items: [
        {
          lead: "Leads lost to slow replies.",
          text: "When questions arrive after hours, or the first reply is slow, visitors can leave before anyone from sales responds.",
        },
        {
          lead: "Sales time spent on poor-fit visitors.",
          text: "Researching and screening each visitor by hand makes every good lead more expensive. It also slows the flow of new deals.",
        },
        {
          lead: "Mixed first impressions.",
          text: "Different team members handle early conversations differently, so customers get an uneven experience.",
        },
      ],
    },

    insight:
      "Reply to every visitor right away, and cut the time from a first question to a sales follow-up with a serious buyer.",
    insightLabel: "Main goal",

    solution: [
      "We built an AI assistant that understands and writes natural language, and answers from Axiomra's own company knowledge. Behind the chat sits a team of AI assistants, each handling one job.",
      "Together they answer questions, look up basic facts about the visitor's company and spot serious buyers. They also add the lead to the sales system automatically, suggest relevant success stories and set up the next sales step.",
      "Before each reply, the assistant searches Axiomra's own documents for the most relevant information. This keeps answers based on real company content, for simple questions and detailed ones about services and use cases.",
    ],

    capabilities: [
      {
        capability: "Answers questions about services, day and night",
        value: "Fewer leads lost after hours. Visitors get a reply right away.",
      },
      {
        capability: "Looks up basic facts about the visitor's company",
        value: "Makes replies more personal, without hours of manual research.",
      },
      {
        capability: "Spots serious buyers by industry, company type and needs",
        value: "Your sales reps can focus on the leads that fit best.",
      },
      {
        capability: "Adds each lead to the sales system automatically",
        value: "Less typing into the CRM, and more consistent records.",
      },
      {
        capability: "Suggests relevant case studies and service pages",
        value: "Shows visitors proof that matches their needs.",
      },
      {
        capability: "Books calls based on each sales rep's availability and location",
        value: "Gets visitors from a first question to a booked call faster.",
      },
    ],

    flow: [
      { title: "A visitor starts a chat", text: "They ask a question, describe a business problem or share company details." },
      { title: "The assistant works out what they need", text: "The AI reads the request and decides which information or task is needed." },
      { title: "It finds the right answer", text: "It searches Axiomra's own documents for the most relevant information." },
      { title: "It learns about the visitor's company", text: "It uses the company name and details to look up basic facts. These help personalize replies and sort the lead." },
      { title: "It checks for a good fit", text: "It compares the visitor against fit criteria: industry, company type, use case and service needs." },
      { title: "It updates the CRM and shares useful content", text: "Serious buyers' details go into the CRM automatically. The visitor also sees matching pages and success stories." },
      { title: "It hands off to sales", text: "When it's a good fit, the visitor books a call with the right sales rep, based on availability and location." },
    ],
    flowImage: {
      sources: [
        { src: handoff800, width: 800 },
        { src: handoff1400, width: 1400 },
        { src: handoff2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "Two people in a meeting room talking across a laptop, the kind of sales call the flow ends with",
      logoBaked: true,
    },

    phases: [
      "Analyze the sales journey, visitor intents, qualification rules and agentic AI use cases.",
      "Configure the application environment, supporting libraries and serverless architecture.",
      "Engineer GPT-4 prompts and conversation flows for Axiomra-specific sales interactions.",
      "Configure specialized agents for research, lead scoring, CRM creation and content recommendation.",
      "Prepare and vectorize Axiomra documents for semantic retrieval and grounded responses.",
      "Integrate external business services, including email workflows and Pipedrive CRM.",
      "Establish CI/CD using AWS SAM and deploy to an AWS serverless environment.",
    ],

    stack: [
      { layer: "Generative AI", tool: "OpenAI GPT-4", purpose: "Conversation, reasoning, response generation and task orchestration." },
      { layer: "Embeddings", tool: "OpenAI Embeddings", purpose: "Semantic representation of Axiomra knowledge and user queries." },
      { layer: "Vector search", tool: "PostgreSQL + pgvector", purpose: "Stores embeddings and runs similarity search across company content." },
      { layer: "Compute", tool: "AWS Lambda", purpose: "Serverless execution of AI and integration workflows." },
      { layer: "Storage", tool: "Amazon S3", purpose: "Document and application asset storage." },
      { layer: "Database", tool: "Amazon RDS", purpose: "Structured application and workflow data." },
      { layer: "Infrastructure", tool: "AWS SAM", purpose: "Serverless application definition, packaging and deployment." },
      { layer: "Delivery", tool: "CI/CD", purpose: "Automated build, testing and deployment workflow." },
      { layer: "CRM integration", tool: "Pipedrive API", purpose: "Lead and opportunity creation, structured sales handoff." },
    ],

    outcome: {
      intro:
        "The assistant turns your website from a page people read into one that actively sells. It handles the repetitive first step. Your sales team keeps discovery, advice, negotiation and relationships.",
      rows: [
        { metric: "How fast leads get a reply", traditional: "Often only during business hours", agent: "Under 2 minutes, 24/7", target: true },
        { metric: "Sorting leads", traditional: "Sales team reviews each one by hand", agent: "AI helps score each lead automatically" },
        { metric: "Entering leads into the CRM", traditional: "Done by hand", agent: "Done automatically, in a consistent format" },
        {
          metric: "Cost per serious lead",
          traditional: "Higher, because of research and screening time",
          agent: "60–70% lower cost per serious lead",
          target: true,
        },
        {
          metric: "Chats that turn into booked calls",
          traditional: "Current rate",
          agent: "+27% more chats turned into booked calls",
          target: true,
        },
      ],
    },

    impact: [
      { lead: "Better leads:", text: "your sales team gets richer lead details, already organized and checked for fit." },
      { lead: "Less screening work:", text: "the AI assistants take over routine screening, research and data entry." },
      { lead: "Faster first sales call:", text: "a serious buyer can go from first question to a booked call in one visit." },
      { lead: "Coverage in every time zone:", text: "questions are captured at any hour, not just during business hours." },
      { lead: "Cleaner CRM records:", text: "leads flow straight into the CRM, so there is less retyping and fewer mistakes." },
      { lead: "One consistent message:", text: "answers come from approved Axiomra content, so first conversations always sound the same." },
    ],

    whyItMatters:
      "For an AI company, this assistant does two jobs. It helps Axiomra sell better, and it shows Axiomra running AI agents in a real sales setting. The same setup can extend to onboarding, account support, proposals, chats in other languages and quotes.",

    nextSteps: [
      "Sales chats in more languages, sent to the right team for each market.",
      "Calendar links that show each sales rep's availability in real time.",
      "Automatic meeting summaries and CRM follow-up tasks.",
      "Follow-up messages triggered by each lead's interest and fit score.",
      "A dashboard showing chats, what visitors ask about most, and how many become calls.",
      "Controls so your staff make the final call on high-value or sensitive deals.",
    ],

    tags: ["AI Agents", "Sales Automation", "AI Chatbot", "CRM Integration", "Lead Qualification", "24/7 Support"],

    labels: {
      context: "The situation",
      challenge: "The problem",
      solution: "What we built",
      capabilities: "What the assistant does",
      flow: "How it works, step by step",
      outcome: "Before and after",
      impact: "What changes for your team",
      why: "Why this matters",
      next: "What comes next",
    },
  },
  "healthcare-patient-intake-triage-ai-agent": {
    slug: "healthcare-patient-intake-triage-ai-agent",
    type: "blueprint",
    accent: "#0F766E",
    eyebrow: "Healthcare",
    title: "Patient Intake & Triage AI Agent",
    subtitle:
      "An AI assistant that collects patient details and sends each case to the right team. Your staff review every case and make the decisions.",
    seoTitle: "Patient Intake & Triage AI Agent: Healthcare Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for an AI intake agent that structures patient information, routes cases with configurable rules and escalates red flags to staff.",
    ogImage: "/og/healthcare-patient-intake-triage-ai-agent.jpg",

    hero: {
      sources: [
        { src: intakeHero800, width: 800 },
        { src: intakeHero1400, width: 1400 },
        { src: intakeHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "Hands typing on a laptop beside a stethoscope on a clinic desk",
    },

    highlights: [
      { value: "24/7", title: "Intake at any hour", text: "Patients can start intake on the web, in an app or through the patient portal, day or night." },
      {
        value: "100%",
        title: "Staff make the final call",
        text: "Every clinical decision is made by staff. Serious and unclear cases go straight to a staff member.",
      },
      { value: "2 systems", title: "Works with your systems", text: "It connects with your existing patient records system and scheduling. Staff get an organized summary where they already work." },
    ],

    keyDetails: {
      summary: "A guided intake assistant that organizes patient details and sends them to staff for review.",
      challenge: "Patient intake is slow and scattered across forms, calls, portals and free-text messages.",
      solution: "An AI chatbot for patient intake. It flags how urgent each case looks, using rules you set, and passes serious cases to staff.",
      technologies: "AI that understands and writes natural language, a secure patient-data store, and links to your patient records and scheduling systems. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed an AI-assisted process for patient intake. It collects symptoms and organizes patient details. Using rules you set, it flags urgency and sends each case to the right care team, where a clinician reviews it.",
    ],

    context: [
      "A healthcare provider with several locations. It faces long intake queues, scattered patient information and admin work before appointments that could be avoided.",
    ],
    contextImage: {
      sources: [
        { src: intakeScenario800, width: 800 },
        { src: intakeScenario1400, width: 1400 },
        { src: intakeScenario2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "An empty clinic corridor with waiting benches outside consultation rooms",
    },

    challenge: {
      items: [
        {
          lead: "Information arrives in pieces.",
          text: "Patient details come in through forms, calls, portals and free-text messages. Each one is organized differently.",
        },
        {
          lead: "Retyping and sorting by hand.",
          text: "Clinical and admin teams spend a lot of time retyping data. They also have to work out the right department and how urgent each case is.",
        },
        {
          lead: "Busy-hour bottlenecks.",
          text: "When demand spikes, patients face delays and repeated questions. The intake experience also differs from one location to the next.",
        },
        {
          lead: "Automation with clear limits.",
          text: "The provider wants automation, but it cannot let an AI system make clinical decisions on its own.",
        },
      ],
    },

    insight: "Automate the paperwork. Keep medical judgment with licensed staff.",
    insightLabel: "Design principle",

    solution: [
      "An AI chatbot guides each patient through intake, step by step. It collects personal details, symptoms, medications, the reason for the visit and relevant history.",
      "It turns each patient's answers into organized information. Then it checks that nothing required is missing.",
      "Rules your team sets flag how urgent each case looks and send it to the right queue for staff review. For serious warning signs you define, staff are alerted right away.",
      "It connects with your existing patient records system and scheduling. Staff get a short, organized summary instead of the full chat history.",
      "Medical judgment stays with licensed staff, who always make the final call. The AI takes over the repetitive admin steps.",
    ],
    solutionAsList: true,

    flow: [
      { title: "Patient starts intake", text: "On the website, in a mobile app or through the patient portal." },
      { title: "Guided conversation", text: "The AI assistant asks for the required information and clears up unclear answers." },
      { title: "Organizing and checking answers", text: "Answers are turned into organized information, and the AI checks that nothing required is missing." },
      { title: "Sorting by urgency", text: "Rules your team sets, plus warning signs, give each case a first, provisional urgency level and destination." },
      {
        title: "Handoff to staff",
        text: "Serious or unclear cases go straight to a staff member instead of continuing automatically.",
        checkpoint: true,
      },
      { title: "Summary for staff review", text: "An organized summary goes to your clinical team's system for staff to review." },
    ],

    stack: [
      { layer: "LLM / NLP", tool: "GPT-class language model, structured prompting, medical terminology layer" },
      { layer: "Backend", tool: "Python, FastAPI, REST APIs" },
      { layer: "Data", tool: "PostgreSQL / secure patient-data store" },
      { layer: "Integrations", tool: "EHR/EMR, scheduling and messaging APIs" },
      { layer: "Security", tool: "Role-based access, audit logging, encryption, consent controls" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Shorter intake queues, and less retyping for clinical and front-desk teams." },
      { text: "Patient details captured more consistently across online channels." },
      { text: "Patients reach the right care team faster, and serious cases reach staff sooner." },
      { text: "Intake open 24/7 without hiring more admin staff." },
    ],

    targetOutcome:
      "Cut intake time from a slow, multi-step manual process to a near-real-time digital one. Staff keep oversight of all clinical decisions.",

    principles: [
      {
        title: "People stay in charge",
        text: "Staff make the final call on high-impact, regulated or unclear decisions, and whenever the AI is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and data is locked and protected. Privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We track how accurate the AI is and how well the process runs. The goal is a better process, not just a smarter AI.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the system is monitored and feedback is collected. Careful, controlled updates keep it working well as data and patterns change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working solution. It fits your existing systems and the way your team makes decisions.",

    tags: ["Healthcare", "AI Agents", "Patient Intake", "Staff Review", "Patient Records Integration"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Planning a patient intake process like this?",
      subtitle:
        "Tell us how patients reach you today and which systems their details pass through. We will show which admin steps an AI assistant can take over, and where staff stay in charge.",
      buttonText: "Talk to our team",
    },
  },
  "healthcare-chatbot-virtual-assistant": {
    slug: "healthcare-chatbot-virtual-assistant",
    type: "blueprint",
    accent: "#D97706",
    eyebrow: "Healthcare",
    title: "Healthcare Chatbot & Virtual Assistant",
    subtitle:
      "A virtual assistant that answers patients' everyday questions at any hour, using only your approved content. Anything medical or sensitive goes to your staff.",
    seoTitle: "Healthcare Chatbot & Virtual Assistant: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for a healthcare virtual assistant that answers patient questions from approved content, guides patients to services and hands sensitive questions to staff.",
    ogImage: "/og/healthcare-chatbot-virtual-assistant.jpg",

    hero: {
      sources: [
        { src: chatHero800, width: 800 },
        { src: chatHero1400, width: 1400 },
        { src: chatHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "A smartphone on a table with a stethoscope resting on its screen",
      imageCredit: {
        photographer: "Bermix Studio",
        site: "Unsplash",
        url: "https://unsplash.com/photos/SJwYvNVW1qY",
      },
    },

    highlights: [
      { value: "24/7", title: "Answers at any hour", text: "Patients get trusted answers on the website, in the app or in the patient portal, day or night." },
      { value: "100%", title: "Only your approved content", text: "Every answer comes from information your organization has checked and approved." },
      { value: "0", title: "Diagnoses made by the assistant", text: "Medical or worrying questions are passed to a person instead of being answered by the assistant." },
    ],

    keyDetails: {
      summary: "A virtual assistant that answers common patient questions and guides patients to the right service.",
      challenge: "Staff answer the same questions all day, and patients struggle to find trusted answers after hours.",
      solution: "An assistant that answers only from your approved content, helps with appointments and hands sensitive questions to staff.",
      technologies: "AI that understands and writes natural language, a search over your approved documents, and links to your web chat, app and patient portal. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed a virtual assistant for healthcare. It answers patient questions, helps patients book appointments and find services, and explains approved care information. Every answer comes from a library of content your organization has approved.",
    ],

    context: [
      "A healthcare network gets a large number of repeated questions every day. Patients ask about appointments, how to prepare for a visit, which services are offered, policies and what to do after a visit.",
    ],
    contextImage: {
      sources: [
        { src: chatStaff800, width: 800 },
        { src: chatStaff1400, width: 1400 },
        { src: chatStaff2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A doctor at her desk on the phone while typing on a laptop",
      imageCredit: {
        photographer: "Vitaly Gariev",
        site: "Unsplash",
        url: "https://unsplash.com/photos/egCFrNJ6Djw",
      },
    },

    challenge: {
      items: [
        {
          lead: "The same questions, over and over.",
          text: "Call-center and clinic staff spend much of their day answering the same practical questions again and again.",
        },
        {
          lead: "No trusted answers after hours.",
          text: "When the clinic is closed, patients have a hard time finding answers they can rely on.",
        },
        {
          lead: "Ordinary chatbots can't be trusted.",
          text: "A general-purpose chatbot can give different answers to the same question, and its answers are not based on the organization's own approved information.",
        },
        {
          lead: "Knowing when to hand over.",
          text: "The assistant has to tell the difference between a simple information question and a situation that needs a clinician.",
        },
      ],
    },

    insight: "Answer the everyday questions instantly. Send anything medical to a person.",
    insightLabel: "Design principle",

    solution: [
      "Before it answers, the assistant looks up the most relevant pages in your approved content, and it only uses that content. It never makes up its own medical advice.",
      "It answers common questions, explains how to prepare for a visit and what to do afterwards, and guides patients to the right service. When needed, it passes the patient to appointment booking or the contact team.",
      "Built-in safety rules stop it from diagnosing. Sensitive or high-risk questions are passed straight to staff.",
      "Reports show which questions went unanswered, so your team can see what content is missing and add it.",
      "Patients and staff can each see their own set of content, when you need them kept separate.",
    ],
    solutionAsList: true,

    flow: [
      { title: "A patient asks a question", text: "About a health service, an appointment or a practical matter, on the web, in the app or in the portal." },
      { title: "The assistant works out the question and how sensitive it is", text: "It understands what the patient needs and checks whether the question is risky." },
      { title: "It finds your approved information", text: "It looks up the pages in your approved content that best match the question." },
      { title: "It writes a clear answer", text: "The answer is based only on that content and follows the rules your team has set." },
      {
        title: "Sensitive questions go to staff",
        text: "Medical, worrying or unclear questions are handed to a staff member instead of being answered automatically.",
        checkpoint: true,
      },
      { title: "Gaps are recorded", text: "Questions the assistant could not answer are logged, so your team knows which content to add next." },
    ],
    flowImage: {
      sources: [
        { src: chatAnswers800, width: 800 },
        { src: chatAnswers1400, width: 1400 },
        { src: chatAnswers2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "An older couple on a sofa reading an answer on a smartphone together",
      imageCredit: {
        photographer: "Vitaly Gariev",
        site: "Unsplash",
        url: "https://unsplash.com/photos/F0Fk1ERlhtU",
      },
    },

    stack: [
      { layer: "AI that writes answers", tool: "GPT-class language model or a private company AI service" },
      { layer: "Finding the right content", tool: "A searchable library of your approved documents" },
      { layer: "Behind the scenes", tool: "Python, FastAPI or cloud functions" },
      { layer: "Where patients use it", tool: "Web chat, mobile app, patient portal" },
      { layer: "Safety and control", tool: "Answer rules, approved sources only, activity records, feedback from staff" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Support around the clock for common patient questions and finding the right service." },
      { text: "Fewer repeated calls and questions for reception and clinical support staff." },
      { text: "More consistent answers, based on approved healthcare content." },
      { text: "Patients find information faster, before and after their visits." },
    ],

    targetOutcome:
      "For this kind of solution, a well-connected assistant can save a care team or support team several hours of repeated question-handling every day.",

    principles: [
      {
        title: "People stay in charge",
        text: "Staff make the final call on high-impact, regulated or unclear questions, and whenever the assistant is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how good the answers are and how much work they save. The goal is a better service, not just a smarter AI.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the assistant is monitored and feedback is collected. Careful updates keep it accurate as questions and content change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working assistant that fits your existing systems and the way your team works.",

    tags: ["Healthcare", "AI Chatbot", "Virtual Assistant", "Patient Support", "Staff Review"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Getting the same patient questions every day?",
      subtitle:
        "Tell us which questions your team answers most and where your approved content lives. We will show what an assistant can answer on its own, and what should always go to your staff.",
      buttonText: "Talk to our team",
    },
  },
  "healthcare-medical-imaging-disease-identification": {
    slug: "healthcare-medical-imaging-disease-identification",
    type: "blueprint",
    accent: "#7C3AED",
    eyebrow: "Healthcare",
    title: "Medical Imaging & Disease Identification",
    subtitle:
      "AI that looks at every new scan, marks the areas that may need attention and moves likely problems up the list. Your specialists still read every scan and make every diagnosis.",
    seoTitle: "Medical Imaging & Disease Identification: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for imaging AI that checks every scan, highlights areas that may need attention and moves urgent cases to the front of the queue for specialist review.",
    ogImage: "/og/healthcare-medical-imaging-disease-identification.jpg",

    hero: {
      sources: [
        { src: imagingHero800, width: 800 },
        { src: imagingHero1400, width: 1400 },
        { src: imagingHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "Two doctors reviewing a knee X-ray on a laptop, one pointing at the screen with a pen",
      imageCredit: {
        photographer: "Antoni Shkraba",
        site: "Pexels",
        url: "https://www.pexels.com/photo/doctors-examining-an-x-ray-image-on-a-laptop-5214994/",
      },
    },

    highlights: [
      { value: "100%", title: "Of new scans checked", text: "Each new scan is looked at by the AI as soon as it arrives, so nothing waits unseen in the queue." },
      { value: "1st", title: "Likely problems read first", text: "Scans that may show a problem move to the front of the list, ahead of routine ones." },
      { value: "0", title: "Diagnoses made by the AI", text: "The AI only flags and sorts. A qualified specialist reads every scan and writes every report." },
    ],

    keyDetails: {
      summary: "AI that checks medical scans, points out areas that may need a closer look and puts likely problems first.",
      challenge: "More scans arrive every day than specialists can review, and urgent cases wait in the same line as routine ones.",
      solution: "AI that flags scans that may show a problem, shows where it looked and how sure it is, and moves those scans up the list for a specialist.",
      technologies: "AI trained to recognize signs of disease in medical images, secure image handling, and links to the systems your imaging team already uses. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed an AI tool that helps imaging teams decide which scans to look at first. It checks each new scan, highlights areas that may need attention and moves likely problems up the list.",
      "The AI never makes a diagnosis. Qualified specialists read every scan and write every report.",
    ],

    context: [
      "A diagnostic provider handles a growing number of scans every week. The team wanted a faster way to spot the scans most likely to show a problem, so those patients are seen sooner.",
    ],
    contextImage: {
      sources: [
        { src: imagingLightbox800, width: 800 },
        { src: imagingLightbox1400, width: 1400 },
        { src: imagingLightbox2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "Two doctors in masks studying a hip X-ray on a lit viewing screen",
      imageCredit: {
        photographer: "Maryam Kamavova",
        site: "Pexels",
        url: "https://www.pexels.com/photo/doctors-examining-an-x-ray-12149118/",
      },
    },

    challenge: {
      items: [
        {
          lead: "More scans than specialists.",
          text: "The number of scans was growing faster than the team's time to review them.",
        },
        {
          lead: "Urgent cases waited in line.",
          text: "A scan with a serious problem could sit in the same queue as routine checks.",
        },
        {
          lead: "Hours of repeat screening.",
          text: "Specialists spent a lot of time on a first look at every image before the detailed reading.",
        },
        {
          lead: "Trust had to be earned.",
          text: "Any AI help had to show its reasons and how sure it was. A specialist had to check its results.",
        },
      ],
    },

    insight: "Let the AI sort the pile. Let the specialist make the call.",
    insightLabel: "Design principle",

    solution: [
      "We gathered example scans, checked their quality and had them labeled. Then we trained the AI to spot signs of the chosen conditions on that type of scan.",
      "For each scan, the AI gives a flag, a score for how sure it is and a highlight showing where it looked.",
      "Flagged scans move up the review list, based on limits your team sets. The AI never diagnoses a patient on its own.",
      "After launch, we keep watching how accurate it is. That includes missed problems, false alarms and changes between machines or sites.",
    ],
    solutionAsList: true,

    flow: [
      { title: "Scans arrive safely", text: "New scans and their basic details are received in a secure way." },
      { title: "Every scan is prepared the same way", text: "Images are put into one standard format, so the AI sees them all in the same way." },
      { title: "The AI checks the scan", text: "It looks for signs of the conditions it was trained to find." },
      { title: "It shows what it found", text: "It gives a score, marks the area of concern and says how sure it is." },
      {
        title: "A specialist reviews it first",
        text: "Flagged scans move to the top of the list. A specialist reads them and makes the diagnosis.",
        checkpoint: true,
      },
      { title: "Feedback keeps it accurate", text: "Specialists' decisions are recorded, so the AI can be checked and improved over time." },
    ],
    flowImage: {
      sources: [
        { src: imagingReview800, width: 800 },
        { src: imagingReview1400, width: 1400 },
        { src: imagingReview2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A doctor holding up a chest X-ray to the light and studying it closely",
      imageCredit: {
        photographer: "cottonbro studio",
        site: "Pexels",
        url: "https://www.pexels.com/photo/doctor-looking-at-an-x-ray-result-7579828/",
      },
    },

    phases: [
      "Secure ingestion of medical images and DICOM metadata",
      "Image standardization and preprocessing",
      "Computer-vision model inference",
      "Probability, localization and confidence outputs",
      "Threshold-based prioritization of flagged studies in the specialist worklist",
      "Clinician feedback capture for monitoring and retraining",
    ],
    stack: [
      { layer: "Computer vision", tool: "PyTorch / TensorFlow, CNN or vision-transformer models" },
      { layer: "Imaging", tool: "DICOM processing, OpenCV / MONAI" },
      { layer: "Deployment", tool: "GPU inference endpoint, Docker, cloud or on-prem deployment" },
      { layer: "Integration", tool: "PACS / RIS / clinical worklist APIs" },
      { layer: "MLOps", tool: "Model registry, performance monitoring, audit logging" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Scans that may show a problem are reviewed sooner." },
      { text: "Less repeat screening work for your specialists." },
      { text: "A steady second pair of eyes, with a clear record of what the AI found and how sure it was." },
      { text: "A clearer view of the review queue and how the AI is performing." },
    ],

    targetOutcome:
      "Well-integrated imaging AI can cut the time to diagnosis by about 40% in suitable, high-volume settings. This is a general industry benchmark, not a measured result from this design.",

    principles: [
      {
        title: "People stay in charge",
        text: "Specialists make the final call on every diagnosis, and always when the AI is unsure or the case is unclear.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see scans, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the AI is and how much faster your team works. The goal is quicker care, not just a smarter AI.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the AI is monitored and specialist feedback is collected. Careful updates keep it accurate as scans and machines change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working tool that fits your existing imaging systems and the way your specialists work.",

    tags: ["Healthcare", "Medical Imaging", "Computer Vision", "Scan Prioritization", "Specialist Review"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      phases: "Technical steps",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Is your imaging team falling behind the queue?",
      subtitle:
        "Tell us which scans you handle and how your team reviews them today. We will show where AI can help sort the queue, and where your specialists stay in charge.",
      buttonText: "Talk to our team",
    },
  },
  "ai-physical-therapy-pose-estimation": {
    slug: "ai-physical-therapy-pose-estimation",
    type: "blueprint",
    accent: "#E11D48",
    eyebrow: "Healthcare",
    title: "AI Physical Therapy Coach",
    subtitle:
      "An exercise coach that uses the camera on a phone or tablet. It watches patients do their home exercises, counts each one and helps them fix their form as they go.",
    seoTitle: "AI Physical Therapy with Pose Estimation: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for a camera-based physical therapy assistant that counts repetitions, corrects exercise form in real time and sends session summaries to therapists.",
    ogImage: "/og/ai-physical-therapy-pose-estimation.jpg",

    hero: {
      sources: [
        { src: ptHero800, width: 800 },
        { src: ptHero1400, width: 1400 },
        { src: ptHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "A woman on an exercise mat at home, with a phone on a tripod recording her movements",
      imageCredit: {
        photographer: "Vitaly Gariev",
        site: "Unsplash",
        url: "https://unsplash.com/photos/AqfGvZw56X8",
      },
    },

    highlights: [
      { value: "Every rep", title: "Counted and checked", text: "Each repetition is counted and compared with the rules for that exercise." },
      { value: "Instant", title: "Tips while you move", text: "Spoken or on-screen tips help patients fix their form during the exercise." },
      { value: "Therapist", title: "Reviews every session", text: "A summary of each session goes to the care team to check." },
    ],

    keyDetails: {
      summary: "A camera-based assistant that guides patients through home exercises and reports back to their therapist.",
      challenge: "Patients often do home exercises the wrong way, and therapists can't see what happens between visits.",
      solution: "The camera follows how the body moves, counts each repetition, corrects form on the spot and sends a summary to the care team.",
      technologies: "AI that recognizes body positions from a camera, exercise rules your therapists set, a phone or tablet app, and secure storage for progress reports. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed an exercise assistant for physical therapy at home. It uses the camera on a phone or tablet to follow the patient's body as they move.",
      "It checks how well each movement is done, counts repetitions and gives instant tips to correct form. Therapists get a clear summary of every session.",
    ],

    context: [
      "A rehabilitation and digital health provider wanted to take its therapist-led exercise programs into patients' homes. The aim was to support patients between visits, without a therapist watching every session live.",
    ],
    contextImage: {
      sources: [
        { src: ptTherapist800, width: 800 },
        { src: ptTherapist1400, width: 1400 },
        { src: ptTherapist2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A physiotherapist guiding a patient's arm as she lifts a small dumbbell",
      imageCredit: {
        photographer: "Sincerely Media",
        site: "Unsplash",
        url: "https://unsplash.com/photos/inoZpsBQRqk",
      },
    },

    challenge: {
      items: [
        {
          lead: "Wrong form at home.",
          text: "Patients often did their exercises with poor form, or lost count of their repetitions.",
        },
        {
          lead: "No view between visits.",
          text: "Therapists had little idea what patients actually did between appointments.",
        },
        {
          lead: "Wearables miss the full picture.",
          text: "Devices worn on the wrist or body could not reliably judge full-body posture or how well a movement was done.",
        },
        {
          lead: "Everyday phones, private homes.",
          text: "It had to work on ordinary phones and tablets, and keep patients' privacy safe.",
        },
      ],
    },

    insight: "Let the camera coach every repetition at home. Save the therapist's time for the decisions that need them.",
    insightLabel: "Design principle",

    solution: [
      "The app finds key points on the body, such as shoulders, hips, knees and ankles. From these it measures joint angles, how far the patient can move, the speed of each movement and each full repetition.",
      "Each exercise has its own rules, plus small AI checks that spot common mistakes. The patient hears or sees a correction right away.",
      "After each session, a summary shows what was completed, how well it was done, whether the patient kept to the plan and which repetitions need a closer look. The therapist reviews it.",
      "Where possible, the video is processed on the phone itself. Feedback stays fast, and raw video doesn't need to leave the device.",
    ],
    solutionAsList: true,

    flow: [
      { title: "The patient picks an exercise", text: "They choose one of the exercises their therapist has prescribed." },
      { title: "The camera finds the body", text: "It picks out key points like shoulders, hips and knees as the patient moves." },
      { title: "The app measures the movement", text: "It works out joint angles and which part of the exercise the patient is in." },
      { title: "Each repetition is counted and checked", text: "Every repetition is counted and compared with the rules for that exercise." },
      { title: "Instant tips fix the form", text: "Spoken or on-screen tips help the patient correct the movement straight away." },
      {
        title: "The therapist reviews the session",
        text: "A summary goes to the care team, so the therapist can follow progress and adjust the plan.",
        checkpoint: true,
      },
    ],
    flowImage: {
      sources: [
        { src: ptSession800, width: 800 },
        { src: ptSession1400, width: 1400 },
        { src: ptSession2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A woman doing a leg exercise on a mat at home, with a laptop open in front of her",
      imageCredit: {
        photographer: "Vitaly Gariev",
        site: "Unsplash",
        url: "https://unsplash.com/photos/-2ezVIyGgc0",
      },
    },

    stack: [
      { layer: "Seeing body movement", tool: "MediaPipe or a custom pose model, OpenCV" },
      { layer: "AI models", tool: "PyTorch, TensorFlow Lite or Core ML (running on the phone)" },
      { layer: "The app", tool: "iOS and Android, native or cross-platform" },
      { layer: "Behind the scenes", tool: "Python APIs, secure store for patient progress data" },
      { layer: "Reports", tool: "Dashboards for adherence, range of motion, repetitions and movement quality" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Patients get form corrections in real time during home exercise sessions." },
      { text: "Therapists get clearer, more objective progress information between appointments." },
      { text: "Less counting of repetitions by hand, and a clear view of whether patients keep up their exercises." },
      { text: "A way to extend therapist-led care to more patients, without adding live sessions." },
    ],

    targetOutcome:
      "Make home exercise without supervision more consistent and better done, so therapists can spend live time on the decisions that need their expertise.",

    principles: [
      {
        title: "People stay in charge",
        text: "Therapists make the final call on high-impact, regulated or unclear cases, and whenever the system is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the system is and how much it helps patients and therapists. The goal is better care, not just a smarter AI.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the system is monitored and feedback is collected. Careful updates keep it accurate as patients and exercises change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working tool that fits your existing systems and the way your team works.",

    tags: ["Healthcare", "Physical Therapy", "Computer Vision", "Home Rehabilitation", "Therapist Review"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want your patients' home exercises done right?",
      subtitle:
        "Tell us which exercises you prescribe and how you follow up with patients today. We will show what a camera-based coach can check at home, and where your therapists stay in charge.",
      buttonText: "Talk to our team",
    },
  },
  "healthcare-readmission-risk-prediction": {
    slug: "healthcare-readmission-risk-prediction",
    type: "blueprint",
    accent: "#0284C7",
    eyebrow: "Healthcare",
    title: "Readmission Risk Prediction",
    subtitle:
      "A system that shows your care team which patients are most likely to come back to hospital after they go home, and why. Staff then decide who gets extra support first.",
    seoTitle: "Hospital Readmission Risk Prediction: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for a system that flags patients likely to return to hospital after discharge, explains the reasons behind each flag and helps care teams plan follow-up.",
    ogImage: "/og/healthcare-readmission-risk-prediction.jpg",

    hero: {
      sources: [
        { src: readmitHero800, width: 800 },
        { src: readmitHero1400, width: 1400 },
        { src: readmitHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "Two doctors in white coats reviewing information on a tablet together",
      imageCredit: {
        photographer: "Vitaly Gariev",
        site: "Unsplash",
        url: "https://unsplash.com/photos/2kopEHjST-g",
      },
    },

    highlights: [
      {
        value: "Every patient",
        title: "Checked before going home",
        text: "Each patient gets a risk check before discharge, so no one depends on a busy staff member remembering to look.",
      },
      {
        value: "Top reasons",
        title: "Shown with every flag",
        text: "Staff see why a patient was flagged, not just a number, so they know what kind of help to offer.",
      },
      {
        value: "Staff",
        title: "Decide what happens next",
        text: "The system suggests who needs attention. Your care team makes every care decision.",
      },
    ],

    keyDetails: {
      summary: "A system that spots patients likely to return to hospital soon after going home.",
      challenge: "Staff can't review every patient in depth, and the warning signs are spread across many records.",
      solution: "A risk check for every patient, with the reasons shown, sent straight into your follow-up process.",
      technologies:
        "A system that learns patterns from your past patient records, a simple dashboard for your care team, and links to your existing hospital systems. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed a system that spots patients who are likely to come back to hospital soon after going home. For each patient, it shows the main reasons behind the flag.",
      "Your care team can then plan discharge and follow-up for the patients who need it most.",
    ],

    context: [
      "A hospital group wants fewer patients coming back after they go home. It also wants its case managers to spend their limited time where it helps most.",
      "Today, deciding who needs extra support depends on a quick review during a busy discharge day.",
    ],
    contextImage: {
      sources: [
        { src: readmitDischarge800, width: 800 },
        { src: readmitDischarge1400, width: 1400 },
        { src: readmitDischarge2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A doctor at her desk talking with an older man about his care",
      imageCredit: {
        photographer: "Vitaly Gariev",
        site: "Unsplash",
        url: "https://unsplash.com/photos/Ey-IxmbZ5TQ",
      },
    },

    challenge: {
      items: [
        {
          lead: "Not enough time.",
          text: "Care teams cannot check every patient in depth before they go home.",
        },
        {
          lead: "Warning signs are scattered.",
          text: "Past hospital stays, health conditions, medicines, test results and home situation all sit in different places.",
        },
        {
          lead: "Simple rules miss too much.",
          text: "Fixed checklists flag too many people, or the wrong ones. They don't keep up as patients change.",
        },
        {
          lead: "A score alone isn't enough.",
          text: "Staff need to understand why a patient is at risk, so they can act on it during discharge planning.",
        },
      ],
    },

    insight: "Find the patients who need help most, and show your team why.",
    insightLabel: "Design principle",

    solution: [
      "We bring each patient's history together in one place: past hospital stays, health conditions, medicines, length of stay and where they go after leaving.",
      "The system learns from past patients which patterns come before a return to hospital. It is tuned to catch the patients who matter, without flooding staff with false alarms.",
      "Every flag comes with its top reasons, such as several recent stays or a complex set of medicines.",
      "High-risk patients appear on a simple dashboard and in your team's task list. Staff can then plan follow-up calls, early appointments, a medicine review or home-care visits.",
    ],
    solutionAsList: true,

    flow: [
      { title: "Patient records come in", text: "Past and current hospital visits are collected from your existing systems." },
      { title: "The information is tidied up", text: "Records are cleaned and organized, and the warning signs that matter are picked out." },
      { title: "Each patient gets a risk check", text: "The system compares the patient with patterns it learned from past patients." },
      { title: "The reasons are shown", text: "Staff see a risk level and the main reasons behind it, in plain words." },
      {
        title: "Your team decides who gets support",
        text: "High-risk patients rise to the top of the dashboard. Case managers choose the right follow-up for each one.",
        checkpoint: true,
      },
      { title: "Results are tracked", text: "The system records what support was given and who came back, so it stays accurate over time." },
    ],
    flowImage: {
      sources: [
        { src: readmitFollowup800, width: 800 },
        { src: readmitFollowup1400, width: 1400 },
        { src: readmitFollowup2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A smiling nurse in green scrubs leaning in to talk with an older woman",
      imageCredit: {
        photographer: "Age Cymru",
        site: "Unsplash",
        url: "https://unsplash.com/photos/qW3DLnehg9w",
      },
    },

    stack: [
      { layer: "Data engineering", tool: "Python, SQL, ETL/ELT pipelines" },
      { layer: "Machine learning", tool: "XGBoost, LightGBM, scikit-learn; calibrated classifiers with per-patient explainability" },
      { layer: "Data platform", tool: "Cloud data warehouse or lakehouse" },
      { layer: "Visualization", tool: "Power BI, Looker or Tableau, plus an API into case-management workflows" },
      { layer: "MLOps", tool: "Model monitoring, drift checks, scheduled retraining" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Patients who need extra help before going home are found earlier." },
      { text: "Case managers and follow-up time go to the patients who need them most." },
      { text: "Risk is judged the same way for every patient, using more information than a quick review can." },
      { text: "Your team can see which follow-up actions worked, and the system keeps learning from them." },
    ],

    targetOutcome:
      "Programs like this can help cut avoidable returns to hospital by up to about 20%, when paired with good follow-up care.",

    principles: [
      {
        title: "People stay in charge",
        text: "Staff make the final call on high-impact, regulated or unclear cases, and whenever the system is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the predictions are and how well the follow-up process runs. The goal is fewer returns, not just a smarter system.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the system is monitored and feedback is collected. Careful updates keep it accurate as patients and care patterns change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working tool that fits your existing systems and the way your care team makes decisions.",

    tags: ["Healthcare", "Predictive Analytics", "Discharge Planning", "Staff Review", "Patient Records Integration"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want to know which patients need help before they go home?",
      subtitle:
        "Tell us how your team plans discharge today and where patient records live. We will show what a risk check could flag, and where your staff stay in charge.",
      buttonText: "Talk to our team",
    },
  },

  "fintech-autonomous-financial-advisor-ai-agent": {
    slug: "fintech-autonomous-financial-advisor-ai-agent",
    type: "blueprint",
    accent: "#16A34A",
    eyebrow: "FinTech",
    title: "AI Financial Advisor Assistant",
    subtitle:
      "An AI assistant that learns each customer's money goals and prepares personal suggestions. Your advisors check and approve them before anything happens.",
    seoTitle: "AI Financial Advisor Assistant: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for an AI financial advisor assistant that learns customer goals, checks your product rules and prepares personal suggestions for advisor approval.",
    ogImage: "/og/fintech-autonomous-financial-advisor-ai-agent.jpg",

    hero: {
      sources: [
        { src: advisorHero800, width: 800 },
        { src: advisorHero1400, width: 1400 },
        { src: advisorHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "An older couple at a kitchen table going through their finances with papers and a phone",
      imageCredit: {
        photographer: "Kampus Production",
        site: "Pexels",
        url: "https://www.pexels.com/photo/elderly-couple-sitting-at-the-table-with-documents-and-using-a-smartphone-7477702/",
      },
    },

    highlights: [
      { value: "24/7", title: "Guidance at any hour", text: "Customers get help with everyday money questions, day or night." },
      { value: "100%", title: "Checked against your rules", text: "Every suggestion is checked against your product and customer rules before anyone sees it." },
      { value: "0", title: "Money moved without permission", text: "Advisors sign off on suggestions, and no money moves without clear permission and extra checks." },
    ],

    keyDetails: {
      summary: "An AI assistant that prepares personal money suggestions for your customers and advisors.",
      challenge: "Advisors spend hours gathering facts and comparing products before they can give any advice.",
      solution: "An assistant that does the fact-finding and comparing, follows your rules, and hands a clear summary to an advisor.",
      technologies: "AI that understands and writes natural language, a set of rules your team controls, and links to your customer and product systems. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed an AI assistant for financial services. It talks with customers to learn their goals. It looks at their profile and savings. Then it finds suitable products from your approved list.",
      "It prepares a personal suggestion. An advisor or the customer reviews it before anything is decided.",
    ],

    context: [
      "A digital financial services company wanted to give every customer personal guidance. But it could not hire advisors fast enough to keep up.",
      "The goal was to help more customers without piling more work onto each advisor.",
    ],
    contextImage: {
      sources: [
        { src: advisorMeeting800, width: 800 },
        { src: advisorMeeting1400, width: 1400 },
        { src: advisorMeeting2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A financial advisor showing a printed plan to an older couple in a living room",
      imageCredit: {
        photographer: "Kampus Production",
        site: "Pexels",
        url: "https://www.pexels.com/photo/an-agent-showing-documents-to-an-elderly-man-8441811/",
      },
    },

    challenge: {
      items: [
        {
          lead: "Customers want fast, personal help.",
          text: "They expect quick answers about products and their own money goals, not a general brochure.",
        },
        {
          lead: "Advisors lose time on groundwork.",
          text: "Much of their day goes on gathering facts, comparing products and writing routine suggestions.",
        },
        {
          lead: "Every suggestion must follow the rules.",
          text: "Advice has to fit the customer, match who can buy each product, and include the notices the law requires.",
        },
        {
          lead: "Answers must be explainable.",
          text: "The company needed to show why each suggestion was made. A chatbot that can't explain itself was not enough.",
        },
      ],
    },

    insight: "Let the assistant do the groundwork. Let your advisors make the call.",
    insightLabel: "Design principle",

    solution: [
      "The assistant has a friendly, guided chat with the customer. It learns their goals, how much risk they are comfortable with, how long they plan to invest and how soon they may need the money.",
      "Before it suggests anything, a set of rules your team controls checks which products fit this customer and which they are allowed to buy.",
      "It then writes a clear summary. The summary shows the suggestion, the reasons behind it, other options and the notices the customer must see.",
      "When you choose, the summary goes to an advisor for approval first.",
      "Every conversation is recorded for review. Actions like moving money always need clear permission and extra security checks.",
    ],
    solutionAsList: true,

    flow: [
      { title: "Learn the customer's goals", text: "The assistant asks simple questions about what the customer wants and looks at their profile." },
      { title: "Check who they are and what fits", text: "It confirms the customer's identity and checks which products suit their situation and comfort with risk." },
      { title: "Find the right information", text: "It pulls up your approved product details and the customer's current savings and investments." },
      { title: "Prepare personal options", text: "It suggests a few options and explains the reasons behind each one in plain words." },
      { title: "Check the rules", text: "It runs your rule checks and adds the notices the customer must see." },
      {
        title: "A person approves",
        text: "The customer or a licensed advisor reviews the suggestion and makes the final decision.",
        checkpoint: true,
      },
    ],
    flowImage: {
      sources: [
        { src: advisorReview800, width: 800 },
        { src: advisorReview1400, width: 1400 },
        { src: advisorReview2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A man at his desk reviewing financial papers next to a tablet",
      imageCredit: {
        photographer: "Tima Miroshnichenko",
        site: "Pexels",
        url: "https://www.pexels.com/photo/businessman-man-woman-desk-6694475/",
      },
    },

    stack: [
      { layer: "AI assistant", tool: "GPT-class language model, tool calling, step-by-step process control" },
      { layer: "Rules and compliance", tool: "Suitability rules engine, policy checks" },
      { layer: "Data", tool: "Customer profile, portfolio and product APIs" },
      { layer: "Behind the scenes", tool: "Python, FastAPI, event-driven services" },
      { layer: "Safety and control", tool: "Audit trails, approval steps, access permissions" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Personal financial guidance is prepared much faster." },
      { text: "Advisors have more time for complex cases and for building client relationships." },
      { text: "Your product and notice rules are applied the same way every time." },
      { text: "Customers get help with everyday money questions around the clock." },
    ],

    targetOutcome:
      "Automate much of the research, comparing and preparation work. Important decisions and any movement of money stay behind approval steps you set.",

    principles: [
      {
        title: "People stay in charge",
        text: "Advisors make the final call on important, regulated or unclear cases, and whenever the assistant is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how good the suggestions are and how much work they save. The goal is a better service, not just a smarter AI.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the assistant is monitored and feedback is collected. Careful updates keep it accurate as customers and products change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working assistant that fits your existing systems and the way your advisors work.",

    tags: ["FinTech", "AI Agents", "Financial Advice", "Wealth Management", "Advisor Approval"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want your advisors to help more customers?",
      subtitle:
        "Tell us how your advisors prepare suggestions today and which rules they follow. We will show which parts an assistant can take on, and which should always stay with your team.",
      buttonText: "Talk to our team",
    },
  },

  "fintech-ai-fraud-detection-anomalous-transactions": {
    slug: "fintech-ai-fraud-detection-anomalous-transactions",
    type: "blueprint",
    accent: "#65A30D",
    eyebrow: "FinTech",
    title: "AI Fraud Detection for Payments",
    subtitle:
      "A system that checks every payment the moment it happens and spots the ones that look wrong. Honest customers pay without delay, and your team only reviews the cases that need a person.",
    seoTitle: "AI Fraud Detection for Payments: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for a real-time fraud check that scores every payment, stops suspicious ones for an extra check and sends only the unclear cases to your fraud team.",
    ogImage: "/og/fintech-ai-fraud-detection-anomalous-transactions.jpg",

    hero: {
      sources: [
        { src: fraudHero800, width: 800 },
        { src: fraudHero1400, width: 1400 },
        { src: fraudHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "A hand holding a bank card over a card machine on an orange table",
      imageCredit: {
        photographer: "Towfiqu barbhuiya",
        site: "Pexels",
        url: "https://www.pexels.com/photo/contactless-payment-with-credit-card-9122014/",
      },
    },

    highlights: [
      {
        value: "Every payment",
        title: "Checked in the moment",
        text: "Each payment gets a risk check as it happens, not hours later in a report.",
      },
      {
        value: "Less friction",
        title: "For honest customers",
        text: "Normal payments go through as usual. Only unusual ones get an extra check, like a text code.",
      },
      {
        value: "Your team",
        title: "Decides the unclear cases",
        text: "The system handles the obvious ones. Your fraud team reviews the rest and has the final say.",
      },
    ],

    keyDetails: {
      summary: "A system that spots suspicious payments the moment they happen.",
      challenge: "Fixed fraud rules block too many honest customers and still miss new tricks.",
      solution: "A risk check on every payment, with the right next step for each one, from allow to hold for review.",
      technologies:
        "A system that learns what normal and suspicious payments look like from your past data, rules your team sets, and links to your payment systems. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed a system that checks every payment as it happens. It looks at the amount, the customer's usual habits, the device, the location and the shop.",
      "Payments that look unusual get an extra check or go to your fraud team. Everything else goes through as normal.",
    ],

    context: [
      "A digital payments company is growing fast, and so is the number of payments it handles every day.",
      "Its fraud checks depend on fixed rules written by hand. The rules can't keep up, and the review team is falling behind.",
    ],
    contextImage: {
      sources: [
        { src: fraudCheckout800, width: 800 },
        { src: fraudCheckout1400, width: 1400 },
        { src: fraudCheckout2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A woman on a sofa holding a bank card while paying on her laptop",
      imageCredit: {
        photographer: "Pavel Danilyuk",
        site: "Pexels",
        url: "https://www.pexels.com/photo/woman-holding-a-credit-card-and-a-laptop-computer-7191166/",
      },
    },

    challenge: {
      items: [
        {
          lead: "Too many false alarms.",
          text: "Fixed rules flag lots of honest payments. Meanwhile, fraudsters change their tricks faster than the rules change.",
        },
        {
          lead: "The review list keeps growing.",
          text: "Every extra payment adds more cases for staff to check by hand.",
        },
        {
          lead: "Warning signs are scattered.",
          text: "Customer history, device, location, shop and how fast payments come in all sit in different places.",
        },
        {
          lead: "Checks can't slow people down.",
          text: "The business needs a decision in the moment, without annoying honest customers at checkout.",
        },
      ],
    },

    insight: "Stop the payments that look wrong. Let the honest ones through.",
    insightLabel: "Design principle",

    solution: [
      "We bring the warning signs together for every payment: the amount, how often the customer pays, the shop, the device, sudden changes in location and the account's history.",
      "The system also compares each customer with similar customers, so odd behaviour stands out.",
      "It learns from past fraud cases to catch known tricks. It also flags anything that looks unlike normal activity, to catch new ones.",
      "Each payment gets a risk level. Rules your team sets then pick the next step: allow it, ask for an extra check, hold it for a short time, or send it to a staff member.",
      "What your team finds in each review is fed back, so the system gets sharper over time.",
    ],
    solutionAsList: true,

    flow: [
      { title: "A payment comes in", text: "The system sees each payment and the customer's recent activity as it happens." },
      { title: "Warning signs are gathered", text: "It picks out what matters, such as an unusual amount, a new device or a sudden change in location." },
      { title: "The payment gets a risk level", text: "It judges how likely the payment is to be fraud, and how unusual it looks." },
      { title: "Your rules pick the next step", text: "Low risk goes through. Higher risk gets an extra check or a short hold." },
      {
        title: "Your team reviews unclear cases",
        text: "Staff look at the flagged payments, contact the customer if needed, and make the final call.",
        checkpoint: true,
      },
      { title: "The system learns from each result", text: "Confirmed fraud and false alarms are fed back, so the checks stay accurate." },
    ],
    flowImage: {
      sources: [
        { src: fraudReview800, width: 800 },
        { src: fraudReview1400, width: 1400 },
        { src: fraudReview2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A man on a phone call at his desk, looking at charts on two computer screens",
      imageCredit: {
        photographer: "Kampus Production",
        site: "Pexels",
        url: "https://www.pexels.com/photo/man-in-black-sitting-behind-a-desk-using-cellphone-8353777/",
      },
    },

    stack: [
      { layer: "Streaming", tool: "Kafka, Kinesis or an event bus" },
      { layer: "Machine learning", tool: "XGBoost, LightGBM, isolation forest and other anomaly models" },
      { layer: "Feature platform", tool: "Real-time feature store, SQL, Python" },
      { layer: "Decisioning", tool: "Rules engine, risk API" },
      { layer: "MLOps", tool: "Drift monitoring, threshold tuning, retraining" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Suspicious payments and new fraud tricks are spotted earlier." },
      { text: "Fewer cases land on your review team, and the riskiest ones come first." },
      { text: "Fewer honest customers are blocked than with fixed rules alone." },
      { text: "Decisions happen in the moment, so your team responds faster." },
    ],

    targetOutcome:
      "Checks like these can help cut fraud losses by up to about 60%, when paired with good extra checks and case handling.",

    principles: [
      {
        title: "People stay in charge",
        text: "Staff make the final call on high-impact, regulated or unclear cases, and whenever the system is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the checks are and how well your review process runs. The goal is less fraud, not just a smarter system.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the system is monitored and feedback is collected. Careful updates keep it accurate as customers and fraud tricks change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working tool that fits your existing payment systems and the way your fraud team makes decisions.",

    tags: ["FinTech", "Fraud Detection", "Predictive Analytics", "Payments", "Staff Review"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want to stop fraud without blocking honest customers?",
      subtitle:
        "Tell us how your team checks payments today and where the review list gets stuck. We will show what a real-time check could catch, and where your staff stay in charge.",
      buttonText: "Talk to our team",
    },
  },

  "fintech-kyc-document-processing-onboarding-automation": {
    slug: "fintech-kyc-document-processing-onboarding-automation",
    type: "blueprint",
    accent: "#C026D3",
    eyebrow: "FinTech",
    title: "Customer ID Checks & Onboarding Automation",
    subtitle:
      "AI that reads new customers' ID and company papers, checks that nothing is missing and flags anything unusual. Your compliance team only handles the cases that need a person.",
    seoTitle: "KYC Document Processing & Onboarding Automation: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for AI that reads customer ID and company documents, checks them against each other and your rules, and sends only unusual cases to your compliance team.",
    ogImage: "/og/fintech-kyc-document-processing-onboarding-automation.jpg",

    hero: {
      sources: [
        { src: kycHero800, width: 800 },
        { src: kycHero1400, width: 1400 },
        { src: kycHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "A woman holding a bank card while typing on a laptop at home",
      imageCredit: {
        photographer: "Darina Belonogova",
        site: "Pexels",
        url: "https://www.pexels.com/photo/woman-holding-a-bank-card-and-using-laptop-8788646/",
      },
    },

    highlights: [
      { value: "Every file", title: "Read and sorted", text: "Each uploaded document is recognised and the key details are pulled out automatically." },
      { value: "Cross-checked", title: "Details compared", text: "Names, dates and addresses are compared across every document and trusted outside sources." },
      { value: "Analyst", title: "Handles the unusual cases", text: "Anything unclear or risky goes to your compliance team, with the evidence already highlighted." },
    ],

    keyDetails: {
      summary: "AI that does the reading, typing and checking when new customers sign up.",
      challenge: "Compliance staff check piles of mixed documents by hand, which is slow and leads to mistakes.",
      solution: "A system that reads each document, checks the details, runs your rules and passes only the tricky cases to a person.",
      technologies: "AI that reads documents and understands language, a set of rules your team controls, and links to trusted checking services. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed a system that handles the paperwork when a new customer signs up. It reads ID cards, proof of address and company records. It pulls out the details that matter.",
      "It checks that nothing is missing and that the details match. Then it sends any problems to your compliance team to decide.",
    ],

    context: [
      "A financial company signs up many new customers every day. Each one sends ID papers, proof of address and, for businesses, company records.",
      "Staff checked all of this by hand. Customers waited, and the team was always behind.",
    ],
    contextImage: {
      sources: [
        { src: kycManual800, width: 800 },
        { src: kycManual1400, width: 1400 },
        { src: kycManual2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A young office worker carrying a tall stack of folders and binders",
      imageCredit: {
        photographer: "cottonbro studio",
        site: "Pexels",
        url: "https://www.pexels.com/photo/man-holding-pile-of-documents-8468119/",
      },
    },

    challenge: {
      items: [
        {
          lead: "Too many documents to check by hand.",
          text: "Compliance staff read large piles of papers that all look different.",
        },
        {
          lead: "Typing mistakes slowed things down.",
          text: "Wrong or missing details meant going back to customers again and again.",
        },
        {
          lead: "Every document looks different.",
          text: "Papers come in many layouts and languages. Simple fixed rules kept breaking.",
        },
        {
          lead: "Every step must be traceable.",
          text: "The company needed automation it could explain to auditors, with a clear path for problem cases.",
        },
      ],
    },

    insight: "Let the AI do the reading and checking. Let your team handle the cases that need judgment.",
    insightLabel: "Design principle",

    solution: [
      "The system recognises each uploaded file, such as a passport, a utility bill or a company record.",
      "It pulls out the key details: names, dates, ID numbers, addresses, owners and registration numbers.",
      "AI that understands language compares the details across all documents. It checks that everything your process needs is there.",
      "Rules your team sets, plus trusted outside services, check the person's identity, sanctions and watch lists, and the business registry where needed.",
      "When the system is unsure, or a rule is broken, the case goes to an analyst. The relevant evidence is already highlighted.",
    ],
    solutionAsList: true,

    flow: [
      { title: "The customer uploads documents", text: "ID, proof of address and any company papers are sent in one place." },
      { title: "Each document is recognised and read", text: "The system works out what each file is and reads the text on it." },
      { title: "Key details are pulled out", text: "Names, dates, numbers and addresses are turned into tidy, organized information." },
      { title: "Details are cross-checked", text: "They are compared across documents and against trusted outside sources." },
      { title: "Your rules are applied", text: "Compliance and risk checks run the same way for every customer." },
      {
        title: "Approve or hand to a person",
        text: "Clear cases can be approved automatically. Anything unusual goes to your compliance team to decide.",
        checkpoint: true,
      },
    ],
    flowImage: {
      sources: [
        { src: kycReview800, width: 800 },
        { src: kycReview1400, width: 1400 },
        { src: kycReview2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A woman at an office desk reviewing papers in a yellow folder",
      imageCredit: {
        photographer: "Andrea Piacquadio",
        site: "Pexels",
        url: "https://www.pexels.com/photo/thoughtful-female-office-worker-with-folder-in-workplace-3790811/",
      },
    },

    stack: [
      { layer: "Document AI", tool: "OCR, layout parsing, document classification" },
      { layer: "LLM / NLP", tool: "Entity extraction, validation, multilingual normalization" },
      { layer: "Backend", tool: "Python, FastAPI, workflow engine" },
      { layer: "Integrations", tool: "Identity verification, sanctions/PEP, registry APIs" },
      { layer: "Storage & audit", tool: "Encrypted document store, immutable processing logs" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "New customers are signed up faster, with much less typing by hand." },
      { text: "Checks are done the same way for every document type and sign-up channel." },
      { text: "Fewer requests go back to customers for missing or mismatched details." },
      { text: "Your compliance team spends its time on unusual and higher-risk cases." },
    ],

    targetOutcome:
      "Industry reference: automating document and customer ID checks can cut manual processing time by about 60–80% when sign-up volumes are high. Your own results would be measured after launch.",

    principles: [
      {
        title: "People stay in charge",
        text: "Your team makes the final call on important, regulated or unclear cases, and whenever the system is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the system is and how much work it saves. The goal is a better process, not just a smarter AI.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the system is monitored and feedback is collected. Careful updates keep it accurate as documents and customers change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working system that fits your existing tools and the way your compliance team works.",

    tags: ["FinTech", "Document AI", "Customer Onboarding", "ID Checks", "Compliance"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want new customers signed up faster?",
      subtitle:
        "Tell us which documents you check today and where the delays happen. We will show which checks AI can take on, and which should always stay with your team.",
      buttonText: "Talk to our team",
    },
  },
  "retail-in-store-ai-shopping-assistant": {
    slug: "retail-in-store-ai-shopping-assistant",
    type: "blueprint",
    accent: "#EA580C",
    eyebrow: "Retail",
    title: "In-Store AI Shopping Assistant",
    subtitle:
      "An AI helper that answers shoppers' questions in your stores, checks what is in stock and suggests other options. Your staff step in only when a person is really needed.",
    seoTitle: "In-Store AI Shopping Assistant: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for an in-store AI shopping assistant that answers product questions, checks stock, suggests alternatives and calls staff for complex requests.",
    ogImage: "/og/retail-in-store-ai-shopping-assistant.jpg",

    hero: {
      sources: [
        { src: shopHero800, width: 800 },
        { src: shopHero1400, width: 1400 },
        { src: shopHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "A shopper checking her phone next to a full trolley in a supermarket aisle",
      imageCredit: {
        photographer: "Gustavo Fring",
        site: "Pexels",
        url: "https://www.pexels.com/photo/a-woman-with-a-shopping-cart-4971954/",
      },
    },

    highlights: [
      { title: "Answers on the spot", text: "Shoppers ask in their own words and get a quick answer, even when the store is busy." },
      { title: "Always up to date", text: "Answers come from your live product list, stock levels and current offers." },
      { title: "Staff when it counts", text: "Tricky or high-value requests go straight to a member of your team." },
    ],

    keyDetails: {
      summary: "An AI shopping helper for your stores that answers questions and checks stock.",
      challenge: "At busy times, shoppers wait for help and staff repeat the same answers all day.",
      solution: "A helper on kiosks, phones and chat that finds products, compares them and calls staff when needed.",
      technologies: "AI that understands everyday questions, linked to your product list, stock and offers. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed an AI shopping assistant for use inside stores. It answers questions about products. It checks what is in stock and suggests other options when something is missing.",
      "When a shopper needs a person, it calls a member of staff. Everything else it can handle on its own.",
    ],

    context: [
      "A retailer with many stores wanted every shopper to get the same good service, even at the busiest times.",
      "It did not want to add floor staff every time the stores got busier.",
    ],
    contextImage: {
      sources: [
        { src: shopAisle800, width: 800 },
        { src: shopAisle1400, width: 1400 },
        { src: shopAisle2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A busy supermarket aisle with shoppers pushing trolleys between full shelves",
      imageCredit: {
        photographer: "Tang Jingao",
        site: "Pexels",
        url: "https://www.pexels.com/photo/people-in-a-grocery-store-5380919/",
      },
    },

    challenge: {
      items: [
        {
          lead: "Shoppers often need help.",
          text: "They want to find a product, compare two options or check if something is in stock.",
        },
        {
          lead: "Busy times mean long waits.",
          text: "When the store is full, shoppers queue to ask a member of staff a simple question.",
        },
        {
          lead: "Staff repeat the same answers.",
          text: "Time spent on routine questions is time taken away from selling and real service.",
        },
        {
          lead: "Information changes fast.",
          text: "Products, stock and offers change too often for a fixed screen or printed sign to keep up.",
        },
      ],
    },

    insight: "Let the assistant answer the everyday questions. Let your staff handle the moments that matter.",
    insightLabel: "Design principle",

    solution: [
      "The assistant is linked to your live product list, stock in each store, current offers and product details you approve.",
      "Shoppers can reach it on a store kiosk, their own phone, a QR code on the shelf or a chat app. They simply type or ask in their own words.",
      "It can compare products, suggest a good replacement, and tell shoppers which aisle or store has the item.",
      "For complex requests, it calls a member of staff to help in person.",
      "Your team gets a clear view of what shoppers ask for, what they can't find and what confuses them.",
    ],
    solutionAsList: true,

    flow: [
      { title: "The shopper asks a question", text: "They ask about a product or the store, on a kiosk, their phone or a chat app." },
      { title: "The assistant understands the need", text: "It works out what the shopper is looking for and what they are trying to do." },
      { title: "It checks live information", text: "It looks up your current product list and the stock in that store." },
      { title: "It helps the shopper", text: "It suggests, compares or points to where the product is." },
      {
        title: "Staff take over when needed",
        text: "Complex or high-value requests are passed to a store team member.",
        checkpoint: true,
      },
      { title: "Your team learns from every question", text: "What shoppers ask feeds into better stock choices and better service." },
    ],
    flowImage: {
      sources: [
        { src: shopHandoff800, width: 800 },
        { src: shopHandoff1400, width: 1400 },
        { src: shopHandoff2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A shop assistant in an apron helping an older woman look at a product in a grocery store",
      imageCredit: {
        photographer: "Kampus Production",
        site: "Pexels",
        url: "https://www.pexels.com/photo/a-store-clerk-helping-a-woman-8422717/",
      },
    },

    stack: [
      { layer: "AI agent", tool: "LLM, tool calling, workflow orchestration" },
      { layer: "Retail data", tool: "Product information management, inventory APIs, promotions" },
      { layer: "Channels", tool: "Kiosk, web app, mobile, QR chat" },
      { layer: "Backend", tool: "Python / Node APIs, caching" },
      { layer: "Analytics", tool: "Intent, conversion-assist and stock-request dashboards" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Shoppers get faster answers to common questions in store." },
      { text: "Service stays the same across every store and every shift." },
      { text: "Staff spend less time on repeat product and stock checks." },
      { text: "You learn what shoppers can't find or don't understand in store." },
    ],

    targetOutcome:
      "Handle everyday product and stock questions on its own. Pass high-value or complex requests to your staff.",

    principles: [
      {
        title: "People stay in charge",
        text: "Staff make the call on important, unclear or sensitive cases, and whenever the assistant is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how good the answers are and how much they help your stores. The goal is better service, not just a smarter AI.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the assistant is monitored and feedback is collected. Careful updates keep it accurate as products and shoppers change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working assistant that fits your existing systems and the way your stores run.",

    tags: ["Retail", "AI Agents", "In-Store Experience", "Customer Service", "Stock Checks"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want shoppers to get help the moment they need it?",
      subtitle:
        "Tell us how questions are handled in your stores today. We will show which ones an assistant can answer, and which should always go to your team.",
      buttonText: "Talk to our team",
    },
  },
  "fintech-regulatory-document-analysis-compliance-nlp": {
    slug: "fintech-regulatory-document-analysis-compliance-nlp",
    type: "blueprint",
    accent: "#0891B2",
    eyebrow: "FinTech",
    title: "Regulatory Document Analysis for Compliance Teams",
    subtitle:
      "AI that reads new rules from regulators, spots what changed and shows who in your company needs to act. Every answer links back to the original text.",
    seoTitle: "Regulatory Document Analysis AI: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for AI that reads regulatory documents, finds new duties and changes, answers questions with links to the source, and sends updates to the right owners.",
    ogImage: "/og/fintech-regulatory-document-analysis-compliance-nlp.jpg",

    hero: {
      sources: [
        { src: regHero800, width: 800 },
        { src: regHero1400, width: 1400 },
        { src: regHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "A man in glasses reading a printed document closely at his office desk",
      imageCredit: {
        photographer: "Karola G",
        site: "Pexels",
        url: "https://www.pexels.com/photo/a-man-looking-at-documents-7877114/",
      },
    },

    highlights: [
      { title: "Every new rule read", text: "New documents from regulators are read, sorted and summed up as soon as they arrive." },
      { title: "Answers with proof", text: "Each answer links to the exact passage it came from, so anyone can check it." },
      { title: "Changes reach the right people", text: "Important updates go to the owners of the policies they affect." },
    ],

    keyDetails: {
      summary: "An AI helper that reads regulatory documents and turns them into clear, trackable to-dos.",
      challenge: "Compliance teams spend days reading long rulebooks just to find what changed and who it affects.",
      solution: "A system that reads each new document, pulls out the duties and dates, and answers questions only from approved sources.",
      technologies: "AI that understands and writes natural language, search across your approved documents, and links to your policy records. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed a system that helps compliance teams keep up with new rules. It reads documents from regulators. It finds new duties and changes to existing rules.",
      "Your team can ask it questions in plain words. It answers only from approved sources and shows where each answer came from. It also shows which of your own policies and checks each rule affects.",
    ],

    context: [
      "A regulated financial company follows several regulators in more than one country. Each of them publishes updates often.",
      "The compliance team had to read every one of them by hand. The goal was to spend less time searching and more time acting.",
    ],
    contextImage: {
      sources: [
        { src: regBinders800, width: 800 },
        { src: regBinders1400, width: 1400 },
        { src: regBinders2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A stack of black ring binders full of papers on a dark desk",
      imageCredit: {
        photographer: "Sora Shimazaki",
        site: "Pexels",
        url: "https://www.pexels.com/photo/set-of-various-folders-for-documents-5668485/",
      },
    },

    challenge: {
      items: [
        {
          lead: "Too much to read.",
          text: "Staff read long rules, draft proposals, notices and guidance papers by hand.",
        },
        {
          lead: "Hard to track who must do what.",
          text: "Duties were hard to follow across different teams and different countries.",
        },
        {
          lead: "Updates arrived late.",
          text: "Policy changes could slip because people spent so long finding and understanding each change.",
        },
        {
          lead: "Every answer needs proof.",
          text: "The company needed answers it could trace back to the original wording of each rule.",
        },
      ],
    },

    insight: "Let the AI do the reading. Let your experts decide what it means for the business.",
    insightLabel: "Design principle",

    solution: [
      "Each new document is sorted by type. The system pulls out its sections, dates, the organisations it names, the duties it sets and when they start.",
      "Everything is stored so your team can search it by meaning, not just by exact words.",
      "An assistant answers questions only from approved regulatory content. Every answer links to the passage that supports it.",
      "When a rule is updated, the system compares the new version with the old one. It flags important changes for review.",
      "It then matches each rule to your internal policies, procedures and checks, and shows who owns them.",
    ],
    solutionAsList: true,

    flow: [
      { title: "Collect new documents", text: "New publications from each regulator are gathered in one place as they come out." },
      { title: "Read and sort", text: "Each document is read, sorted by type and split into clear sections." },
      { title: "Pull out duties and dates", text: "The system lists what the rule asks you to do and when each duty starts." },
      { title: "Make it searchable", text: "The content is stored so your team can search it and ask questions in plain words." },
      { title: "Spot changes and link them", text: "New versions are compared with old ones, and each change is linked to your affected policies and checks." },
      {
        title: "The right owner reviews",
        text: "Important updates go to the compliance owner, who decides what the business needs to do.",
        checkpoint: true,
      },
    ],
    flowImage: {
      sources: [
        { src: regReview800, width: 800 },
        { src: regReview1400, width: 1400 },
        { src: regReview2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "Four colleagues gathered around a laptop in a meeting room, reviewing something together",
      imageCredit: {
        photographer: "Thirdman",
        site: "Pexels",
        url: "https://www.pexels.com/photo/business-people-looking-at-the-laptop-7652054/",
      },
    },

    stack: [
      { layer: "Language AI", tool: "Enterprise LLM, embeddings, retrieval-augmented generation (RAG)" },
      { layer: "Document processing", tool: "OCR and document parsing, metadata extraction" },
      { layer: "Search", tool: "Vector database plus keyword search" },
      { layer: "Behind the scenes", tool: "Python, FastAPI, workflow automation" },
      { layer: "Governance", tool: "Source citations, access control, review logs" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "New regulatory material is reviewed faster." },
      { text: "Less time goes on searching documents and writing summaries by hand." },
      { text: "Every answer can be traced back to the official source text." },
      { text: "Policies and checks affected by a change are found earlier." },
    ],

    targetOutcome:
      "Cut 60–80% of the manual effort on repetitive reading and searching tasks. This is an industry reference figure for this kind of system, not a measured result.",

    principles: [
      {
        title: "People stay in charge",
        text: "Your experts make the final call on important, regulated or unclear cases, and whenever the AI is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the AI is and how much work it saves. The goal is a better process, not just a smarter AI.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the system is monitored and feedback is collected. Careful updates keep it accurate as rules and documents change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working tool that fits your existing systems and the way your compliance team makes decisions.",

    tags: ["FinTech", "Compliance", "Document AI", "Regulatory Change", "Source-Linked Answers"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want your compliance team to keep up with every new rule?",
      subtitle:
        "Tell us which regulators you follow and how your team tracks changes today. We will show which parts AI can take on, and which should always stay with your experts.",
      buttonText: "Talk to our team",
    },
  },
  "retail-ai-personalized-marketing": {
    slug: "retail-ai-personalized-marketing",
    type: "blueprint",
    accent: "#DB2777",
    eyebrow: "Retail",
    title: "AI-Powered Personalized Marketing",
    subtitle:
      "AI that learns what each group of shoppers likes and prepares the right offer and message for them. Your marketing team sets the rules and stays in control.",
    seoTitle: "AI-Powered Personalized Marketing for Retail: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for retail AI that groups shoppers by what they buy, picks relevant offers and writes on-brand messages, within the consent, timing and brand rules your team sets.",
    ogImage: "/og/retail-ai-personalized-marketing.jpg",

    hero: {
      sources: [
        { src: retailHero800, width: 800 },
        { src: retailHero1400, width: 1400 },
        { src: retailHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "A shopper checking her phone while pushing a trolley of fresh food through a supermarket aisle",
      imageCredit: {
        photographer: "Gustavo Fring",
        site: "Pexels",
        url: "https://www.pexels.com/photo/a-woman-with-a-shopping-cart-4971954/",
      },
    },

    highlights: [
      { value: "Per group", title: "Offers that fit", text: "Each group of shoppers sees products and offers that match what they actually buy." },
      { value: "On brand", title: "Messages in your voice", text: "Every message is written from templates and tone rules your team approves." },
      { value: "Opt-in", title: "Respects every choice", text: "Messages go only to shoppers who agreed to hear from you, and never too often." },
    ],

    keyDetails: {
      summary: "AI that prepares the right offer and message for each group of shoppers.",
      challenge: "The same promotion went to everyone. Few people responded, and discounts were given away where they weren't needed.",
      solution: "A system that sorts shoppers into groups, picks offers that fit each one and writes on-brand messages for every channel.",
      technologies: "AI that spots patterns in shopping history, AI that writes messages within your brand rules, and links to your customer and messaging systems. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed a system that helps retailers send offers people actually want. It looks at what customers buy, what they browse and how they responded to past campaigns.",
      "It then picks the right products and offers for each group of shoppers. It writes the message too, in your brand's voice.",
    ],

    context: [
      "A retailer that sells in stores and online had a large loyalty program. But its campaigns treated most customers the same way.",
      "The team wanted each shopper to get more relevant offers, without building every audience and message by hand.",
    ],
    contextImage: {
      sources: [
        { src: retailTeam800, width: 800 },
        { src: retailTeam1400, width: 1400 },
        { src: retailTeam2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A marketing team seen from above, working around a table covered in charts, notes and laptops",
      imageCredit: {
        photographer: "Kindel Media",
        site: "Pexels",
        url: "https://www.pexels.com/photo/people-in-the-office-discussing-a-project-7688336/",
      },
    },

    challenge: {
      items: [
        {
          lead: "One offer for everyone.",
          text: "General promotions got little response. Discounts often went to people who would have bought anyway.",
        },
        {
          lead: "Every shopper is different.",
          text: "People differ in where they shop, what they buy, how price-conscious they are and how recently they bought.",
        },
        {
          lead: "Too much manual work.",
          text: "Marketers spent hours building customer lists and writing many versions of each message.",
        },
        {
          lead: "Rules still had to be followed.",
          text: "Messages had to respect each shopper's consent, avoid sending too often and stay true to the brand.",
        },
      ],
    },

    insight: "Send fewer, better offers. The right message to the right shopper beats a bigger discount for everyone.",
    insightLabel: "Design principle",

    solution: [
      "The system brings together shopping history, website visits, loyalty activity and past campaign results.",
      "It sorts customers into groups that shop in similar ways. It also estimates how likely each person is to respond to an offer.",
      "For each group, it picks the products, categories and offers that fit best.",
      "AI then writes a few versions of the message for email, text and app alerts. It uses templates and tone rules your team approves.",
      "Campaign results flow back in, so each new campaign gets better aimed than the last.",
    ],
    solutionAsList: true,

    flow: [
      { title: "Bring the data together", text: "Shopping, browsing, loyalty and past campaign data are joined into one view of each customer." },
      { title: "Group similar shoppers", text: "Customers who shop in similar ways are grouped, and each person gets a likely-to-respond score." },
      { title: "Pick the best offer", text: "The system chooses the products or offers each group is most likely to want." },
      { title: "Write the messages", text: "AI prepares versions for email, text and app alerts, in your brand's voice." },
      {
        title: "Check your rules",
        text: "Consent, how often each person hears from you and brand rules are checked. Your team approves before anything is sent.",
        checkpoint: true,
      },
      { title: "Learn from results", text: "Responses are measured and fed back, so the next campaign is better aimed." },
    ],
    flowImage: {
      sources: [
        { src: retailShopper800, width: 800 },
        { src: retailShopper1400, width: 1400 },
        { src: retailShopper2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A delighted woman holding shopping bags and looking at her phone against a bright yellow wall",
      imageCredit: {
        photographer: "Kindel Media",
        site: "Pexels",
        url: "https://www.pexels.com/photo/a-woman-holding-a-smartphone-and-shopping-bags-6994316/",
      },
    },

    stack: [
      { layer: "Data science", tool: "Python, SQL, clustering, propensity models" },
      { layer: "Generative AI", tool: "LLM-based copy generation with templates and guardrails" },
      { layer: "Recommendations", tool: "Collaborative and content-based recommender" },
      { layer: "Marketing systems", tool: "CRM, CDP, email, SMS and push notification APIs" },
      { layer: "Analytics", tool: "Campaign lift, repeat purchase and conversion dashboards" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Shoppers get offers and product ideas that match what they actually buy." },
      { text: "Your team spends far less time building lists and writing message versions." },
      { text: "Better timing and more personal messages bring customers back more often." },
      { text: "You can see which customer habits really drive responses to your campaigns." },
    ],

    targetOutcome:
      "Industry reference, not a measured result: when shopper data and AI-written messages are set up well, suitable programs have raised repeat purchases by about 18%. Your results would be measured after launch.",

    principles: [
      {
        title: "People stay in charge",
        text: "Your team makes the final call on important, sensitive or unclear cases, and whenever the system is unsure.",
      },
      {
        title: "Privacy built in from day one",
        text: "Only the right people can see customer data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the system is and how much it helps sales. The goal is a better business, not just a smarter AI.",
      },
      {
        title: "Watched after launch",
        text: "Once live, results are tracked and feedback is collected. Careful updates keep it accurate as shoppers and products change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working system that fits your existing tools and the way your marketing team works.",

    tags: ["Retail", "Generative AI", "Personalization", "Customer Loyalty", "Marketing Automation"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want every campaign to feel personal?",
      subtitle:
        "Tell us how you plan campaigns today and what customer data you have. We will show where AI can help, and which choices should stay with your team.",
      buttonText: "Talk to our team",
    },
  },

  "fintech-machine-learning-credit-scoring": {
    slug: "fintech-machine-learning-credit-scoring",
    type: "blueprint",
    accent: "#4F46E5",
    eyebrow: "FinTech",
    title: "AI Credit Scoring for Lenders",
    subtitle:
      "A system that helps your lending team decide on loan applications faster and more fairly. Each applicant gets a clear risk level with the reasons shown, and your rules still make the final decision.",
    seoTitle: "AI Credit Scoring for Lenders: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for an AI credit scoring system that sorts loan applicants into low, medium and high risk, explains each result and keeps lending rules in your team's hands.",
    ogImage: "/og/fintech-machine-learning-credit-scoring.jpg",

    hero: {
      sources: [
        { src: creditHero800, width: 800 },
        { src: creditHero1400, width: 1400 },
        { src: creditHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "A loan advisor at his desk shaking hands with a couple sitting across from him",
      imageCredit: {
        photographer: "RDNE Stock project",
        site: "Pexels",
        url: "https://www.pexels.com/photo/a-client-in-agreement-with-a-mortgage-broker-8292854/",
      },
    },

    highlights: [
      {
        value: "3 levels",
        title: "Low, medium or high risk",
        text: "Every applicant lands in a clear risk group, so your team knows at a glance who is a safe bet.",
      },
      {
        value: "Top reasons",
        title: "Shown with every result",
        text: "Staff and reviewers see why an applicant got their risk level, not just a number.",
      },
      {
        value: "Your rules",
        title: "Make the final decision",
        text: "Your team sets the approval limits and checks. Borderline cases go to a person to review.",
      },
    ],

    keyDetails: {
      summary: "A system that tells your lending team how likely each applicant is to repay, and why.",
      challenge: "Reviewing applications by hand is slow, and similar applicants can get different answers.",
      solution: "A clear risk level with its reasons for every applicant, and lending rules your team controls.",
      technologies:
        "A system that learns from your past loans and repayments, a set of lending rules your team controls, and links to your existing loan systems. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed a credit scoring system for lenders. It looks at the usual facts in a loan application. It also looks at how the applicant manages their accounts and pays their bills.",
      "The result is a faster and more consistent view of each applicant's risk. Your team still decides who gets a loan.",
    ],

    context: [
      "A digital lender wants to decide on loan applications faster. It also wants to tell safe and risky applicants apart more clearly.",
      "It must still be able to explain every decision, and keep full control of its own lending rules.",
    ],
    contextImage: {
      sources: [
        { src: creditApplicant800, width: 800 },
        { src: creditApplicant1400, width: 1400 },
        { src: creditApplicant2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A woman holding a bank card while typing on a laptop at home",
      imageCredit: {
        photographer: "Darina Belonogova",
        site: "Pexels",
        url: "https://www.pexels.com/photo/woman-holding-a-bank-card-and-using-laptop-8788646/",
      },
    },

    challenge: {
      items: [
        {
          lead: "Decisions take too long.",
          text: "Staff review applications by hand. Similar cases can be handled in different ways.",
        },
        {
          lead: "Old scorecards see too little.",
          text: "Traditional credit scores miss much of how a person actually manages their money.",
        },
        {
          lead: "Better sorting can't mean less clarity.",
          text: "The lender wants to sort applicants more sharply, without a black box no one can explain.",
        },
        {
          lead: "Fairness and control are a must.",
          text: "Lending rules, fair treatment, clear reasons and ongoing checks were all required from day one.",
        },
      ],
    },

    insight: "Let the system measure the risk. Let your rules and your people make the decision.",
    insightLabel: "Design principle",

    solution: [
      "We bring together the facts from each application, credit reports, past repayments, account history and everyday spending.",
      "We test several ways of scoring applicants side by side, and compare each one with the lender's current scorecard.",
      "The chosen system estimates how likely each applicant is to fall behind on repayments. It puts them in a risk level and lists the main reasons.",
      "Your lending rules sit apart from the scoring. Your team can change approval limits, affordability checks and review triggers without rebuilding anything.",
    ],
    solutionAsList: true,

    flow: [
      { title: "The application comes in", text: "The applicant's details and past credit history are collected from your existing systems." },
      { title: "The information is tidied up", text: "Records are cleaned and organized, and the signs that matter for repayment are picked out." },
      { title: "The risk is measured", text: "The system estimates how likely the applicant is to fall behind on repayments." },
      { title: "A risk level and reasons are shown", text: "Staff see low, medium or high risk, with the main reasons in plain words." },
      {
        title: "Your lending rules decide",
        text: "Your approval limits and checks are applied. Borderline cases go to a staff member to review.",
        checkpoint: true,
      },
      { title: "Results are watched over time", text: "Loan results are tracked, so the system stays accurate as customers and the economy change." },
    ],
    flowImage: {
      sources: [
        { src: creditReview800, width: 800 },
        { src: creditReview1400, width: 1400 },
        { src: creditReview2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "Two colleagues at an office desk going through a printed finance report next to a laptop",
      imageCredit: {
        photographer: "Jack Sparrow",
        site: "Pexels",
        url: "https://www.pexels.com/photo/colleagues-looking-at-a-document-5918192/",
      },
    },

    stack: [
      { layer: "Machine learning", tool: "LightGBM, XGBoost, logistic regression; probability-of-default scoring and risk bands" },
      { layer: "Explainability", tool: "SHAP, reason-code mapping" },
      { layer: "Data", tool: "Python, SQL, cloud data warehouse" },
      { layer: "Decisioning", tool: "Credit-policy rules engine, scoring API" },
      { layer: "MLOps", tool: "Validation, bias checks, drift and performance monitoring" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Loan decisions are made faster, and similar applicants are treated the same way." },
      { text: "Low, medium and high risk applicants are told apart more clearly." },
      { text: "Clear reasons behind every result help compliance teams and reviewers." },
      { text: "Your team can try new lending rules without rebuilding the scoring system." },
    ],

    targetOutcome:
      "Faster loan decisions and sharper risk sorting, while every result stays explainable, your team owns the lending rules, and people review the borderline cases.",

    principles: [
      {
        title: "People stay in charge",
        text: "Staff make the final call on high-impact, regulated or unclear cases, and whenever the system is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the scores are and how well the lending process runs. The goal is better lending, not just a smarter system.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the system is monitored and feedback is collected. Careful updates keep it accurate as customers and markets change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working tool that fits your existing systems and the way your lending team makes decisions.",

    tags: ["FinTech", "Predictive Analytics", "Credit Risk", "Lending", "Staff Review"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want faster, clearer loan decisions?",
      subtitle:
        "Tell us how your team reviews applications today and what data you hold. We will show where a scoring system can help, and where your people stay in charge.",
      buttonText: "Talk to our team",
    },
  },

  "retail-ai-inventory-demand-forecasting": {
    slug: "retail-ai-inventory-demand-forecasting",
    type: "blueprint",
    accent: "#059669",
    eyebrow: "Retail",
    title: "AI Inventory & Demand Forecasting",
    subtitle:
      "A system that predicts how much of each product every store will sell, and tells your team what to order. Best-sellers stay on the shelf, and slow items stop piling up.",
    seoTitle: "AI Inventory Management & Demand Forecasting: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for a retail system that predicts demand for every product in every store, suggests how much to order and warns planners about empty shelves or excess stock early.",
    ogImage: "/og/retail-ai-inventory-demand-forecasting.jpg",

    hero: {
      sources: [
        { src: stockHero800, width: 800 },
        { src: stockHero1400, width: 1400 },
        { src: stockHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "Long rows of tall warehouse shelves stacked with cardboard boxes",
      imageCredit: {
        photographer: "Russ Murray",
        site: "Unsplash",
        url: "https://unsplash.com/photos/M7G_m5XJ-go",
      },
    },

    highlights: [
      {
        value: "Every product",
        title: "Forecast for every store",
        text: "Each item gets its own sales forecast at each location, updated as new sales come in.",
      },
      {
        value: "Order advice",
        title: "Ready before you reorder",
        text: "The system suggests how much to order, based on delivery times and how much backup stock you want.",
      },
      {
        value: "Planners",
        title: "Approve every order",
        text: "Your team sees the suggestion and the reasons, then decides. Most of their time goes to the risky items.",
      },
    ],

    keyDetails: {
      summary: "A system that predicts demand for every product in every store and suggests what to order.",
      challenge: "Ordering relies on past averages and manual guesses, so some shelves run empty while other stock piles up.",
      solution: "Rolling sales forecasts, suggested order amounts and early warnings, all in one place for your planners.",
      technologies:
        "A system that learns sales patterns from your own history, ordering rules your team sets, and simple dashboards linked to your existing systems. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed a system that predicts how much of each product every store will sell. It then suggests how much to reorder.",
      "It also warns your team early about items likely to run out, or likely to sit unsold. That happens before it costs you sales or ties up cash.",
    ],

    context: [
      "A retailer sells thousands of products across many stores. Demand changes with the seasons, and stock is often in the wrong place.",
      "Popular items run out, while slower ones fill the back room.",
    ],
    contextImage: {
      sources: [
        { src: stockShelves800, width: 800 },
        { src: stockShelves1400, width: 1400 },
        { src: stockShelves2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A bakery section of a grocery store with rows of empty shelves",
      imageCredit: {
        photographer: "Richard Burlton",
        site: "Unsplash",
        url: "https://unsplash.com/photos/BYSLKyql9xA",
      },
    },

    challenge: {
      items: [
        {
          lead: "Ordering is mostly guesswork.",
          text: "Orders depend on past averages and manual changes by planners.",
        },
        {
          lead: "Wrong stock in the wrong place.",
          text: "Fast sellers run out, while slow products take up space and money.",
        },
        {
          lead: "Too many things affect sales.",
          text: "Promotions, holidays, weather, local events and a product's age are hard to plan for the same way every time.",
        },
        {
          lead: "Reports don't tell you what to do.",
          text: "The business needs clear advice it can act on, not static reports.",
        },
      ],
    },

    insight: "Know what will sell, where, and how much to order, before the shelf is empty.",
    insightLabel: "Design principle",

    solution: [
      "We bring your sales, stock, promotions, prices, calendar, store and supplier information together in one place. Outside factors like weather and local events are added too.",
      "The system predicts sales for every product in every store, and keeps updating those predictions. It also shows how sure it is about each one.",
      "It then suggests how much to order. It takes into account delivery times, backup stock, how often you want items in stock and minimum order sizes.",
      "Simple dashboards show your planners the products and stores most at risk, so they can act on those first.",
    ],
    solutionAsList: true,

    flow: [
      { title: "Your data comes in", text: "Sales, stock, promotions and supplier information are collected from your existing systems." },
      { title: "Sales patterns are picked out", text: "The system finds the seasons, busy days and other patterns that shape what people buy." },
      { title: "Sales are predicted", text: "Each product gets a sales forecast for each store." },
      { title: "An order is suggested", text: "The system works out when to reorder and how much." },
      {
        title: "Risks are flagged for your team",
        text: "Items likely to run out or pile up are shown first. Planners review them and approve or change the order.",
        checkpoint: true,
      },
      { title: "Results are tracked", text: "The system checks how close its predictions were and records planner changes, so it keeps improving." },
    ],
    flowImage: {
      sources: [
        { src: stockPlanner800, width: 800 },
        { src: stockPlanner1400, width: 1400 },
        { src: stockPlanner2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A person at a desk reviewing charts and graphs on a laptop",
      imageCredit: {
        photographer: "Apex Virtual Education",
        site: "Unsplash",
        url: "https://unsplash.com/photos/KNQUEQwTCY4",
      },
    },

    stack: [
      { layer: "Forecasting", tool: "LightGBM, XGBoost and time-series models" },
      { layer: "Data engineering", tool: "Python, SQL, cloud data warehouse" },
      { layer: "Optimization", tool: "Reorder-point and safety-stock logic" },
      { layer: "BI", tool: "Looker, Power BI or Tableau" },
      { layer: "MLOps", tool: "Forecast monitoring and retraining" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Fewer empty shelves on your best-selling products." },
      { text: "Less extra stock sitting unsold, so more of your cash stays free." },
      { text: "Ordering decisions made the same way across every store." },
      { text: "Planners focus on the items that need attention, not every product." },
    ],

    targetOutcome:
      "In the right retail settings, smarter stock planning can cut the cost of holding stock by roughly 20–30%.",

    principles: [
      {
        title: "People stay in charge",
        text: "Staff make the final call on high-impact or unclear decisions, and whenever the system is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the forecasts are and how well ordering runs. The goal is a better-run business, not just a smarter system.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the system is monitored and feedback is collected. Careful updates keep it accurate as shopping habits change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working tool that fits your existing systems and the way your team decides what to order.",

    tags: ["Retail", "Predictive Analytics", "Demand Forecasting", "Stock Planning", "Planner Review"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want the right stock on the right shelf?",
      subtitle:
        "Tell us how your team decides what to order today and where your sales data lives. We will show what a forecast could flag, and where your planners stay in charge.",
      buttonText: "Talk to our team",
    },
  },

  "retail-dynamic-pricing-optimization": {
    slug: "retail-dynamic-pricing-optimization",
    type: "blueprint",
    accent: "#CA8A04",
    eyebrow: "Retail",
    title: "Smart Pricing for Retail",
    subtitle:
      "A system that suggests the right price for each product, in each store, as demand and competitors change. Your pricing team approves the changes that matter.",
    seoTitle: "Retail Dynamic Pricing Optimization: Solution Blueprint | Axiomra",
    seoDescription:
      "Solution blueprint for a retail pricing system that weighs demand, stock, competitor prices and your margin rules, then suggests price changes for your team to approve.",
    ogImage: "/og/retail-dynamic-pricing-optimization.jpg",

    hero: {
      sources: [
        { src: pricingHero800, width: 800 },
        { src: pricingHero1400, width: 1400 },
        { src: pricingHero2200, width: 2200 },
      ],
      width: 1400,
      height: 1050,
      alt: "Supermarket shelves full of oranges, apples, lemons and limes, with price labels along each shelf",
      imageCredit: {
        photographer: "Gemma C",
        site: "Unsplash",
        url: "https://unsplash.com/photos/stpjHJGqZyw",
      },
    },

    highlights: [
      {
        value: "Every store",
        title: "Prices that fit local demand",
        text: "Each product can get its own price in each store, instead of one rule for everywhere.",
      },
      {
        value: "Your rules",
        title: "Always respected",
        text: "No suggestion goes below your minimum profit or breaks your pricing policies.",
      },
      {
        value: "Your team",
        title: "Approves what matters",
        text: "Pricing managers approve, change or reject suggestions. Only small, low-risk changes can run on their own.",
      },
    ],

    keyDetails: {
      summary: "A system that suggests better prices for each product and store, within your rules.",
      challenge: "Prices were reviewed by hand, too slowly, and blanket discounts gave away profit.",
      solution: "Price suggestions based on demand, stock and competitor prices, each with its expected result, for your team to approve.",
      technologies:
        "A system that learns from your past sales and prices, a rule checker your team controls, and links to your till, online store and pricing systems. Full details are in the technical section below.",
    },

    executiveSummary: [
      "Axiomra designed a pricing system for retailers. It looks at demand, stock levels, competitor prices and how new or old each product is.",
      "It then suggests price changes for each product, or for each store. Every suggestion stays within your profit and pricing rules.",
    ],

    context: [
      "A retailer sells products where prices, demand and stock levels change often. Competitors change their prices often too.",
      "Its pricing team could not keep up by hand, and wanted a faster and more consistent way to set prices.",
    ],
    contextImage: {
      sources: [
        { src: pricingAisle800, width: 800 },
        { src: pricingAisle1400, width: 1400 },
        { src: pricingAisle2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "A long, brightly lit supermarket aisle with packed shelves on both sides",
      imageCredit: {
        photographer: "Jack Lee",
        site: "Unsplash",
        url: "https://unsplash.com/photos/IH65r4HEQWQ",
      },
    },

    challenge: {
      items: [
        {
          lead: "Price reviews took too long.",
          text: "Checking prices by hand was too slow for products whose demand changes quickly.",
        },
        {
          lead: "Blanket discounts cost money.",
          text: "One discount rule for every store cut profit. It ignored local demand and how much stock was left.",
        },
        {
          lead: "No consistent way to decide.",
          text: "The team had no reliable way to see how shoppers react to a price change, or what competitors were doing.",
        },
        {
          lead: "Rules must never be broken.",
          text: "Every price had to follow the company's own pricing rules and the law.",
        },
      ],
    },

    insight: "Suggest the right price for each product and store. Let your team decide.",
    insightLabel: "Design principle",

    solution: [
      "The system learns from your past prices, promotions, sales and stock. It works out how much each price change moves sales.",
      "For each product, it tests possible prices against your minimum profit, your pricing policies, competitor prices, how long stock has been sitting and how fast you need to sell it.",
      "Each suggestion shows its expected result and how sure the system is. Pricing managers can approve it, change it, or let small, low-risk changes happen on their own.",
      "Controlled tests compare stores or products with and without the new prices. That shows the real gain in profit, sales and stock sold.",
    ],
    solutionAsList: true,

    flow: [
      { title: "Collect the facts", text: "Sales, prices, stock levels and competitor prices are gathered from your systems." },
      { title: "Understand demand", text: "The system works out how shoppers react to price changes, and where each product is in its life." },
      { title: "List the allowed prices", text: "Only prices that follow your rules are considered." },
      { title: "Pick the best price", text: "It chooses the price that best balances profit and clearing stock." },
      {
        title: "Your team approves",
        text: "The suggestion goes to a pricing manager, or updates on its own if it is small and low-risk.",
        checkpoint: true,
      },
      { title: "Measure and improve", text: "Real results are measured, and the system adjusts so it keeps getting better." },
    ],
    flowImage: {
      sources: [
        { src: pricingReview800, width: 800 },
        { src: pricingReview1400, width: 1400 },
        { src: pricingReview2200, width: 2200 },
      ],
      width: 1400,
      height: 788,
      alt: "Two colleagues at a counter going through figures together on a laptop",
      imageCredit: {
        photographer: "LinkedIn Sales Solutions",
        site: "Unsplash",
        url: "https://unsplash.com/photos/YDVdprpgHv4",
      },
    },

    stack: [
      { layer: "Machine learning", tool: "Price elasticity models, gradient boosting, causal testing" },
      { layer: "Optimization", tool: "Constraint-based price optimizer" },
      { layer: "Data", tool: "Python, SQL, retail data warehouse" },
      { layer: "Integrations", tool: "POS, e-commerce, pricing and competitor-data APIs" },
      { layer: "Analytics", tool: "Revenue, margin, sell-through and A/B test dashboards" },
    ],

    impactIntro: "What this setup is designed to change:",
    impact: [
      { text: "Your prices react faster when demand or competitor prices change." },
      { text: "A better balance between selling stock, total sales and profit." },
      { text: "Targeted discounts where they help, instead of broad price cuts everywhere." },
      { text: "Every price suggestion is recorded and follows your rules, so it can be checked later." },
    ],

    targetOutcome:
      "Respond to market changes faster and protect profit, with less manual price checking and fewer unnecessary discounts.",

    principles: [
      {
        title: "People stay in charge",
        text: "Your team makes the final call on big, regulated or unclear price changes, and whenever the system is unsure.",
      },
      {
        title: "Security built in from day one",
        text: "Only the right people can see data, every action is recorded, and privacy is planned in from the start, not added after launch.",
      },
      {
        title: "Judged on real results",
        text: "We measure how accurate the system is and how it changes profit and sales. The goal is a better business, not just a smarter system.",
      },
      {
        title: "Watched after launch",
        text: "Once live, the system is monitored and feedback is collected. Careful updates keep it accurate as shoppers and markets change.",
      },
    ],

    whyItMatters:
      "Axiomra brings together AI, data, systems integration and ongoing oversight. That turns this idea into a working tool that fits your existing systems and the way your pricing team makes decisions.",

    tags: ["Retail", "Predictive Analytics", "Pricing", "Smarter Discounts", "Team Approval"],

    labels: {
      summary: "In short",
      context: "A typical situation",
      challenge: "The problem",
      solution: "What we built",
      flow: "How it works, step by step",
      stack: "Tools & technology",
      impact: "What changes for your team",
      principles: "How we keep it safe and reliable",
      why: "Why Axiomra",
    },

    cta: {
      title: "Want prices that keep up with your market?",
      subtitle:
        "Tell us how your team sets prices and discounts today. We will show where smarter pricing can help, and where your team stays in charge.",
      buttonText: "Talk to our team",
    },
  },
};
