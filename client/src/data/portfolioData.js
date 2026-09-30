/**
 * Copy and imagery for the Portfolio page.
 *
 * Every case study carries its own palette because the page is a run of
 * full-bleed bands: the brand colour IS the section background, and the
 * mockup was exported on that exact colour. `band` and the image therefore
 * have to stay in sync; change one and the seam becomes visible.
 *
 * Rows without a `band` are "neutral": they sit on the page surface and the
 * mockup gets a white stage of its own, so the row still works in dark mode.
 * `accent` is the hue those rows borrow for numbers, pills and glows.
 */

import salesAgentImg from "../assets/case-studies/axiomra-ai-sales-agent/card.webp";
import intakeAgentImg from "../assets/case-studies/healthcare-patient-intake-triage-ai-agent/card.webp";
import chatbotImg from "../assets/case-studies/healthcare-chatbot-virtual-assistant/card.webp";
import advisorImg from "../assets/case-studies/fintech-autonomous-financial-advisor-ai-agent/card.webp";
import imagingImg from "../assets/case-studies/healthcare-medical-imaging-disease-identification/card.webp";
import physioImg from "../assets/case-studies/ai-physical-therapy-pose-estimation/card.webp";
import readmissionImg from "../assets/case-studies/healthcare-readmission-risk-prediction/card.webp";
import regulatoryImg from "../assets/case-studies/fintech-regulatory-document-analysis-compliance-nlp/card.webp";
import kycImg from "../assets/case-studies/fintech-kyc-document-processing-onboarding-automation/card.webp";
import fraudImg from "../assets/case-studies/fintech-ai-fraud-detection-anomalous-transactions/card.webp";
import shopAssistantImg from "../assets/case-studies/retail-in-store-ai-shopping-assistant/card.webp";
import personalizedMarketingImg from "../assets/case-studies/retail-ai-personalized-marketing/card.webp";
import creditScoringImg from "../assets/case-studies/fintech-machine-learning-credit-scoring/card.webp";
import inventoryForecastImg from "../assets/case-studies/retail-ai-inventory-demand-forecasting/card.webp";
import dynamicPricingImg from "../assets/case-studies/retail-dynamic-pricing-optimization/card.webp";
import { caseStudies as caseStudyPages } from "./caseStudiesData";
import { caseStudyPath } from "../routes.constants";

export const hero = {
  eyebrow: "Selected work",
  titleLead: "Explore the impact of our",
  titleAccent: "AI case studies.",
  body:
    "Browse our portfolio of proven AI-powered solutions built for businesses across the globe. " +
    "Each case study shows how we turn complex challenges into scalable, intelligent systems, " +
    "backed by data and driven by results.",
  ctaText: "Read case study",
  stats: [
    // Counted from the data, so it stays right as studies are added.
    { value: String(Object.keys(caseStudyPages).length), label: "Detailed case studies" },
    { value: "12+", label: "Industries served" },
    { value: "500+", label: "AI projects delivered" },
    { value: "4.9/5", label: "Average client rating" },
  ],
};

export const caseStudies = [
  {
    slug: "axiomra-ai-sales-agent",
    name: "Axiomra Sales Agent",
    tag: "Sales & Agentic AI",
    title: "Virtual Sales & Customer Support Assistant",
    description:
      "Our own multi-agent assistant for the Axiomra website. It answers visitors around the clock, qualifies leads, creates Pipedrive opportunities and books calls with the right sales rep, so the team starts every conversation with context.",
    stats: [
      { value: "24/7", label: "Visitor engagement" },
      { value: "< 2 min", label: "Target response time" },
      { value: "CRM", label: "Leads qualified and logged automatically" },
    ],
    // These are capabilities and targets, not measured results.
    statsLabel: "What it does",
    image: salesAgentImg,
    width: 1574,
    height: 976,
    accent: "#3B4FBF",
    // Rows with a long-form write-up link to it instead of the contact page.
    caseStudy: caseStudyPath("axiomra-ai-sales-agent"),
  },
  {
    slug: "healthcare-patient-intake-triage-ai-agent",
    name: "Healthcare Intake Agent",
    tag: "Healthcare & Agentic AI",
    title: "Patient Intake & Triage AI Agent",
    description:
      "A solution blueprint for a conversational intake agent that collects patient details, structures them, routes each case with configurable rules and escalates red-flag cases to staff, so clinicians start from a structured summary.",
    // A representative design, not a deployment: no figures, only what it does.
    stats: [
      { value: "24/7", label: "Patient intake through web, mobile or portal" },
      { value: "Staff", label: "Review for high-risk and ambiguous cases" },
      { value: "EHR", label: "Structured summaries into existing workflows" },
    ],
    statsLabel: "Solution blueprint",
    image: intakeAgentImg,
    width: 1574,
    height: 976,
    accent: "#0F766E",
    caseStudy: caseStudyPath("healthcare-patient-intake-triage-ai-agent"),
  },
  {
    slug: "healthcare-chatbot-virtual-assistant",
    name: "Healthcare Assistant",
    tag: "Healthcare & Generative AI",
    title: "Healthcare Chatbot & Virtual Assistant",
    description:
      "A solution blueprint for a virtual assistant that answers patients' everyday questions at any hour from approved content only, helps with appointments and services, and passes medical or sensitive questions to staff.",
    stats: [
      { value: "24/7", label: "Answers on web chat, app or patient portal" },
      { value: "Approved", label: "Every answer comes from checked content" },
      { value: "Staff", label: "Handle medical and sensitive questions" },
    ],
    statsLabel: "Solution blueprint",
    image: chatbotImg,
    width: 1574,
    height: 976,
    accent: "#D97706",
    caseStudy: caseStudyPath("healthcare-chatbot-virtual-assistant"),
  },
  {
    slug: "fintech-autonomous-financial-advisor-ai-agent",
    name: "Financial Advisor Assistant",
    tag: "FinTech & Agentic AI",
    title: "AI Financial Advisor Assistant",
    description:
      "A solution blueprint for an AI assistant that learns each customer's money goals, checks your product rules and prepares personal suggestions, with advisors approving them before anything happens.",
    stats: [
      { value: "24/7", label: "Guidance for everyday money questions" },
      { value: "Rules", label: "Every suggestion checked against your policies" },
      { value: "Advisor", label: "Approves suggestions before any action" },
    ],
    statsLabel: "Solution blueprint",
    image: advisorImg,
    width: 1574,
    height: 976,
    accent: "#16A34A",
    caseStudy: caseStudyPath("fintech-autonomous-financial-advisor-ai-agent"),
  },
  {
    slug: "healthcare-medical-imaging-disease-identification",
    name: "Imaging Triage",
    tag: "Healthcare & Computer Vision",
    title: "Medical Imaging & Disease Identification",
    description:
      "A solution blueprint for AI that checks every new scan, marks areas that may need attention and moves likely problems to the front of the review list. Specialists still read every scan and make every diagnosis.",
    stats: [
      { value: "Every scan", label: "Checked by the AI as it arrives" },
      { value: "Urgent", label: "Scans move to the front of the list" },
      { value: "Specialists", label: "Read every scan and make every diagnosis" },
    ],
    statsLabel: "Solution blueprint",
    image: imagingImg,
    width: 1574,
    height: 976,
    accent: "#7C3AED",
    caseStudy: caseStudyPath("healthcare-medical-imaging-disease-identification"),
  },
  {
    slug: "ai-physical-therapy-pose-estimation",
    name: "Physio Coach",
    tag: "Healthcare & Computer Vision",
    title: "AI Physical Therapy Coach",
    description:
      "A solution blueprint for a phone camera coach that watches patients do their home exercises, counts every repetition, corrects their form on the spot and sends each session summary to their therapist.",
    stats: [
      { value: "Every rep", label: "Counted and checked against the exercise" },
      { value: "Instant", label: "Spoken or on-screen form tips" },
      { value: "Therapist", label: "Reviews every session summary" },
    ],
    statsLabel: "Solution blueprint",
    image: physioImg,
    width: 1574,
    height: 976,
    accent: "#E11D48",
    caseStudy: caseStudyPath("ai-physical-therapy-pose-estimation"),
  },
  {
    slug: "healthcare-readmission-risk-prediction",
    name: "Readmission Risk",
    tag: "Healthcare & Predictive Analytics",
    title: "Readmission Risk Prediction",
    description:
      "A solution blueprint for a system that checks every patient before they go home, flags those likely to come back to hospital and shows the reasons. Care teams then decide who gets follow-up calls, early appointments or home-care visits.",
    stats: [
      { value: "Every patient", label: "Checked for risk before discharge" },
      { value: "Reasons", label: "Shown with every flag, in plain words" },
      { value: "Staff", label: "Decide who gets extra support" },
    ],
    statsLabel: "Solution blueprint",
    image: readmissionImg,
    width: 1574,
    height: 976,
    accent: "#0284C7",
    caseStudy: caseStudyPath("healthcare-readmission-risk-prediction"),
  },
  {
    slug: "fintech-regulatory-document-analysis-compliance-nlp",
    name: "Compliance Document",
    tag: "FinTech & Language AI",
    title: "Regulatory Document Analysis",
    description:
      "A solution blueprint for AI that reads new rules from regulators, spots what changed and sends each update to the people who own the affected policies. Every answer links back to the original text.",
    stats: [
      { value: "Every rule", label: "Read and summed up as it arrives" },
      { value: "Sources", label: "Linked to every answer" },
      { value: "Owners", label: "Review every important change" },
    ],
    statsLabel: "Solution blueprint",
    image: regulatoryImg,
    width: 1574,
    height: 976,
    accent: "#0891B2",
    caseStudy: caseStudyPath("fintech-regulatory-document-analysis-compliance-nlp"),
  },
  {
    slug: "fintech-kyc-document-processing-onboarding-automation",
    name: "Onboarding ID Checks",
    tag: "FinTech & Document AI",
    title: "Customer ID Checks & Onboarding Automation",
    description:
      "A solution blueprint for AI that reads new customers' ID and company papers, checks the details against each other and your rules, and sends only the unusual cases to your compliance team.",
    stats: [
      { value: "Every file", label: "Read and sorted automatically" },
      { value: "Cross-checked", label: "Details compared across documents" },
      { value: "Analyst", label: "Decides every unusual case" },
    ],
    statsLabel: "Solution blueprint",
    image: kycImg,
    width: 1574,
    height: 976,
    accent: "#C026D3",
    caseStudy: caseStudyPath("fintech-kyc-document-processing-onboarding-automation"),
  },
  {
    slug: "retail-in-store-ai-shopping-assistant",
    name: "In-Store Shopping Assistant",
    tag: "Retail & AI Agents",
    title: "In-Store AI Shopping Assistant",
    description:
      "A solution blueprint for an AI helper that answers shoppers' questions in store, checks live stock and suggests other options. Staff are called in for tricky or high-value requests.",
    stats: [
      { value: "Live", label: "Answers from current products, stock and offers" },
      { value: "Any screen", label: "Kiosk, phone, QR code or chat" },
      { value: "Staff", label: "Called in for complex requests" },
    ],
    statsLabel: "Solution blueprint",
    image: shopAssistantImg,
    width: 1574,
    height: 976,
    accent: "#EA580C",
    caseStudy: caseStudyPath("retail-in-store-ai-shopping-assistant"),
  },
  {
    slug: "fintech-ai-fraud-detection-anomalous-transactions",
    name: "Fraud Detection",
    tag: "FinTech & Predictive Analytics",
    title: "AI Fraud Detection for Payments",
    description:
      "A solution blueprint for a system that checks every payment the moment it happens, asks for an extra check when something looks wrong and sends only the unclear cases to your fraud team.",
    stats: [
      { value: "Every payment", label: "Checked for risk as it happens" },
      { value: "Fewer", label: "Honest customers blocked by mistake" },
      { value: "Your team", label: "Makes the call on unclear cases" },
    ],
    statsLabel: "Solution blueprint",
    image: fraudImg,
    width: 1574,
    height: 976,
    accent: "#65A30D",
    caseStudy: caseStudyPath("fintech-ai-fraud-detection-anomalous-transactions"),
  },
  {
    slug: "retail-ai-personalized-marketing",
    name: "Personalized Marketing",
    tag: "Retail & Generative AI",
    title: "AI-Powered Personalized Marketing",
    description:
      "A solution blueprint for AI that groups shoppers by how they buy, picks the offers each group is likely to want and writes on-brand messages, within the consent and brand rules your team sets.",
    stats: [
      { value: "Per group", label: "Offers matched to how shoppers buy" },
      { value: "On brand", label: "Messages written from your templates" },
      { value: "Opt-in", label: "Only shoppers who agreed, never too often" },
    ],
    statsLabel: "Solution blueprint",
    image: personalizedMarketingImg,
    width: 1452,
    height: 900,
    accent: "#DB2777",
    caseStudy: caseStudyPath("retail-ai-personalized-marketing"),
  },
  {
    slug: "fintech-machine-learning-credit-scoring",
    name: "Credit Scoring",
    tag: "FinTech & Predictive Analytics",
    title: "AI Credit Scoring for Lenders",
    description:
      "A solution blueprint for a system that gives every loan applicant a clear risk level with the reasons shown. Your lending rules and your team still make the final decision.",
    stats: [
      { value: "3 levels", label: "Low, medium or high risk for every applicant" },
      { value: "Reasons", label: "Shown with every result, in plain words" },
      { value: "Your rules", label: "Decide approvals; people review borderline cases" },
    ],
    statsLabel: "Solution blueprint",
    image: creditScoringImg,
    width: 1574,
    height: 976,
    accent: "#4F46E5",
    caseStudy: caseStudyPath("fintech-machine-learning-credit-scoring"),
  },
  {
    slug: "retail-ai-inventory-demand-forecasting",
    name: "Inventory Forecasting",
    tag: "Retail & Predictive Analytics",
    title: "AI Inventory & Demand Forecasting",
    description:
      "A solution blueprint for a system that predicts how much of each product every store will sell, suggests what to order and warns planners early about empty shelves or excess stock.",
    stats: [
      { value: "Every product", label: "Sales forecast for every store" },
      { value: "Early", label: "Warnings before shelves run empty" },
      { value: "Planners", label: "Approve every suggested order" },
    ],
    statsLabel: "Solution blueprint",
    image: inventoryForecastImg,
    width: 1574,
    height: 976,
    accent: "#059669",
    caseStudy: caseStudyPath("retail-ai-inventory-demand-forecasting"),
  },
  {
    slug: "retail-dynamic-pricing-optimization",
    name: "Smart Pricing",
    tag: "Retail & Predictive Analytics",
    title: "Smart Pricing for Retail",
    description:
      "A solution blueprint for a system that suggests the right price for each product in each store, based on demand, stock and competitor prices. It never breaks your profit rules, and your pricing team approves the changes that matter.",
    stats: [
      { value: "Every store", label: "Prices that fit local demand" },
      { value: "Your rules", label: "Minimum profit never broken" },
      { value: "Your team", label: "Approves important price changes" },
    ],
    statsLabel: "Solution blueprint",
    image: dynamicPricingImg,
    width: 1574,
    height: 976,
    accent: "#CA8A04",
    caseStudy: caseStudyPath("retail-dynamic-pricing-optimization"),
  },
];

/** Desks shown at the foot of the page, mirroring the contact page routing. */
export const desks = [
  {
    title: "Info Queries",
    body: "Questions about our services, projects or a new idea you want to explore.",
    email: "info@axiomra.co",
  },
  {
    title: "Careers",
    body: "Want to join the team? Send us your portfolio and we will be in touch.",
    email: "career@axiomra.co",
  },
  {
    title: "Sales",
    body: "Ready to start or scale an AI project? Let's talk scope, pricing and timelines.",
    email: "sales@axiomra.co",
  },
];

export const faqs = [
  {
    q: "What types of AI projects have you worked on?",
    a: "We have shipped AI solutions across healthcare, sports, fintech, fashion, retail and more, spanning predictive analytics, NLP, computer vision, recommendation systems and agentic AI. Each case study solves a real business challenge.",
  },
  {
    q: "Can I see detailed case studies of your past AI projects?",
    a: "Yes. Every project on this page has a longer write-up covering the problem, the architecture, the models we chose and the numbers after launch. Ask for the ones closest to your industry and we will send them across, under NDA where the client requires it.",
  },
  {
    q: "What technologies do you use in your AI projects?",
    a: "Large language models from Anthropic, Google and OpenAI, PyTorch and TensorFlow for custom models, OpenCV for vision, and Python, FastAPI, Node.js, React, PostgreSQL and Docker around them. The stack is chosen against your data and your load, never by fashion.",
  },
  {
    q: "Can you integrate AI with our existing business systems?",
    a: "That is the normal case rather than the exception. We integrate with CRMs, ERPs, data warehouses, spreadsheets and internal APIs, and several projects here ship as plugins inside tools the team already uses, such as Excel and Telegram.",
  },
  {
    q: "Do you offer AI consulting before development?",
    a: "Yes. We start with a free strategy session to pressure-test the idea, then scope the smallest version that proves value. If AI is the wrong tool for the problem, we will say so on that call rather than after an invoice.",
  },
  {
    q: "What is the typical timeline for an AI project?",
    a: "A focused assistant or automation reaches live deployment in about four to six weeks. Platforms with multiple roles, dashboards and integrations run three to six months, delivered in two-week sprints with working software at the end of each one.",
  },
  {
    q: "Can I get a case study relevant to my industry?",
    a: "Tell us the industry and the workflow you want to automate and we will send the closest two or three, including what did not work first time. If we have not shipped in your sector yet, we will say that too.",
  },
];
