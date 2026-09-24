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
import { caseStudyPath } from "./caseStudiesData";

export const PORTFOLIO_PATH = "/portfolio";

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
    { value: "3", label: "Detailed case studies" },
    { value: "12+", label: "Industries served" },
    { value: "300+", label: "AI projects delivered" },
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
