/**
 * Long-form case studies, keyed by slug. The detail page renders whatever is
 * here, so a new study is a new entry, not a new component.
 *
 * Copy is taken from the source case-study documents. Figures that have not
 * been measured in production carry `target: true` on their row, and the page
 * badges them as targets. Never flip that flag without real analytics behind it.
 *
 * @typedef {{ src: string, width: number }} ImageSource
 * @typedef {{ sources: ImageSource[], width: number, height: number, alt: string }} CaseImage
 * Entries come in two kinds. "client" studies describe delivered work.
 * "blueprint" studies are representative solution designs: they carry a
 * visible badge, use `highlights` instead of numeric `stats`, and put any
 * figure in `targetOutcome`, which the page styles as a goal, never a result.
 * Every section below `hero` is optional unless marked otherwise; the page
 * skips what an entry leaves out.
 *
 * @typedef {{ lead?: string, text: string }} LeadItem
 * @typedef {{ metric: string, traditional: string, agent: string, target?: boolean }} OutcomeRow
 *
 * @typedef {Object} CaseStudy
 * @property {string} slug
 * @property {"client" | "blueprint"} type
 * @property {string} title
 * @property {string} eyebrow             Category, shown in the hero badge.
 * @property {string} subtitle
 * @property {string} seoTitle
 * @property {string} seoDescription
 * @property {string} ogImage              Path under /public.
 * @property {CaseImage} hero
 * @property {{ value: string, label: string }[]} [stats]
 * @property {{ title: string, text: string }[]} [highlights]   Non-numeric stat cards.
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

export const CASE_STUDIES_PATH = "/case-studies";

export const caseStudyPath = (slug) => `${CASE_STUDIES_PATH}/${slug}`;

/** @type {Record<string, CaseStudy>} */
export const caseStudies = {
  "axiomra-ai-sales-agent": {
    slug: "axiomra-ai-sales-agent",
    type: "client",
    eyebrow: "AI Agent",
    title: "Virtual Sales & Customer Support Assistant",
    subtitle:
      "A multi-agent assistant that answers website visitors, qualifies leads, fills the CRM and books sales calls, so the sales team starts with context instead of cold research.",
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
    },

    stats: [
      { value: "24/7", label: "Visitor engagement" },
      { value: "< 2 min", label: "Target response time" },
      { value: "Automated", label: "Lead qualification & CRM" },
    ],

    keyDetails: {
      summary: "An AI assistant that carries the first stage of the sales conversation.",
      challenge:
        "Deliver personalized 24/7 website support while reducing sales operating cost and improving conversion efficiency.",
      solution:
        "A multi-agent GPT-powered virtual sales and customer support assistant integrated with company knowledge, CRM, and scheduling workflows.",
      technologies:
        "OpenAI embeddings and GPT-4; AWS Lambda, S3, RDS + pgvector; AWS SAM; CI/CD; Pipedrive API.",
    },

    context: [
      "Axiomra needed a smarter way to engage inbound website visitors without depending entirely on human sales availability. High-intent prospects can arrive outside business hours, while sales teams spend a lot of time researching companies, answering repetitive service questions and typing details into the CRM.",
      "The goal was an assistant that could carry the first stage of the buyer conversation: understand Axiomra's services, identify the visitor's business context, qualify the opportunity, and move a good-fit prospect toward a sales call, all within the same website session.",
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
    },

    challenge: {
      intro: "The initiative focused on three recurring commercial problems:",
      items: [
        {
          lead: "Lost leads caused by response delays.",
          text: "After-hours inquiries or slow first responses can mean visitors leave before anyone from sales engages.",
        },
        {
          lead: "Sales bandwidth consumed by unqualified traffic.",
          text: "Manual research and qualification raise the cost of each viable opportunity and slow the pipeline.",
        },
        {
          lead: "Inconsistent first-contact messaging.",
          text: "Early conversations vary between team members, which makes the customer experience uneven.",
        },
      ],
    },

    insight:
      "Answer every visitor immediately, and shrink the time between a first inquiry and a qualified sales follow-up.",

    solution: [
      "The assistant runs on GPT-4 with retrieval over Axiomra's own company knowledge. Specialized task agents sit behind the conversation, so the system can answer questions, enrich company information, score a lead, create an opportunity in Pipedrive, recommend relevant success stories and set up the next sales action.",
      "Axiomra content is vectorized, and the most relevant pieces are retrieved before each reply. That keeps answers grounded, for simple questions and for more nuanced ones about services, capabilities and use cases.",
    ],

    capabilities: [
      {
        capability: "Answers service and capability questions 24/7",
        value: "Reduces after-hours lead loss and gives visitors an immediate first response.",
      },
      {
        capability: "Retrieves firmographic context from company information",
        value: "Enables faster personalization without repetitive manual prospect research.",
      },
      {
        capability: "Scores leads by industry, company profile and need fit",
        value: "Lets sales representatives focus on better-qualified opportunities.",
      },
      {
        capability: "Creates Pipedrive opportunities automatically",
        value: "Reduces manual CRM entry and keeps captured data consistent.",
      },
      {
        capability: "Recommends relevant case studies and service pages",
        value: "Guides prospects toward evidence that matches their needs.",
      },
      {
        capability: "Books calls using representative availability and geography",
        value: "Shortens the path from first inquiry to a scheduled conversation.",
      },
    ],

    flow: [
      { title: "Visitor conversation", text: "The visitor asks a question, describes a business problem or shares company details." },
      { title: "Intent & context analysis", text: "GPT-4 interprets the request while task agents work out which information or workflow is needed." },
      { title: "Knowledge retrieval", text: "Relevant Axiomra content is pulled through embeddings and pgvector semantic search." },
      { title: "Prospect enrichment", text: "Agents use the company name and context to prepare firmographic data for personalization and scoring." },
      { title: "Lead qualification", text: "The opportunity is checked against business-fit criteria: industry, organization profile, use case and service need." },
      { title: "CRM & content actions", text: "Qualified prospect data goes to Pipedrive, and matching Axiomra pages and success stories are recommended." },
      { title: "Sales handoff", text: "When it fits, the visitor books a call with the right representative based on availability and geography." },
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
        "The agent turns the website from a passive information channel into an active sales layer. It handles the repetitive first stage and leaves discovery, consulting, negotiation and relationships to the human sales team.",
      rows: [
        { metric: "Lead response time", traditional: "Often limited to business hours", agent: "Under 2 minutes, 24/7", target: true },
        { metric: "Lead qualification", traditional: "Manual sales-team review", agent: "Automated AI-assisted scoring" },
        { metric: "CRM data entry", traditional: "Manual", agent: "Automated structured creation" },
        {
          metric: "Cost per qualified lead",
          traditional: "Higher, due to research and screening time",
          agent: "60–70% lower cost per qualified lead",
          target: true,
        },
        {
          metric: "Chat-to-call conversion",
          traditional: "Existing baseline",
          agent: "+27% chat-to-call conversion",
          target: true,
        },
      ],
    },

    impact: [
      { lead: "Higher pipeline quality:", text: "sales receives richer, pre-structured and pre-qualified lead information." },
      { lead: "Lower qualification workload:", text: "routine screening, research and data capture move to agents." },
      { lead: "Faster first sales conversation:", text: "qualified visitors can go from inquiry to a booked call in one session." },
      { lead: "Coverage across time zones:", text: "inquiries are captured regardless of business hours." },
      { lead: "Cleaner CRM records:", text: "agent-to-CRM transfer cuts repetitive manual entry and its errors." },
      { lead: "Consistent positioning:", text: "approved Axiomra knowledge keeps first-contact messaging uniform." },
    ],

    whyItMatters:
      "For an AI company, this assistant does two jobs: it improves how Axiomra sells, and it shows Axiomra deploying agentic AI in a real commercial setting. The same architecture extends to onboarding, account support, proposal preparation, multilingual engagement and quotation workflows.",

    nextSteps: [
      "Multilingual sales conversations and market-specific routing.",
      "Calendar integration with real-time representative availability.",
      "Automated meeting summaries and CRM follow-up tasks.",
      "Lead-nurture sequences triggered by intent and qualification score.",
      "Analytics dashboard for conversations, intent trends and conversion.",
      "Human-in-the-loop controls for high-value or sensitive opportunities.",
    ],

    tags: ["Agentic AI", "Sales Automation", "GPT-4", "RAG", "CRM Integration", "AWS Serverless"],
  },
  "healthcare-patient-intake-triage-ai-agent": {
    slug: "healthcare-patient-intake-triage-ai-agent",
    type: "blueprint",
    eyebrow: "Healthcare",
    title: "Patient Intake & Triage AI Agent",
    subtitle: "AI Agents / Clinical Workflow Automation",
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
      { title: "24/7 intake", text: "Patients can start intake through web, mobile or portal at any hour." },
      { title: "Human-in-the-loop", text: "High-risk and ambiguous cases are escalated to staff." },
      { title: "EHR & scheduling integrated", text: "Staff receive a structured summary inside their existing workflow." },
    ],

    keyDetails: {
      summary: "A guided intake agent that structures patient information and routes it for staff review.",
      challenge: "Fragmented, slow patient intake across forms, calls, portals and free-text messages.",
      solution: "A conversational AI intake agent with configurable triage routing and human escalation.",
      technologies: "GPT-class LLM, Python, FastAPI, PostgreSQL, EHR/EMR and scheduling APIs.",
    },

    executiveSummary: [
      "Axiomra designed an AI-assisted patient intake and triage workflow. It captures symptoms, structures patient information, applies configurable triage rules and routes each case to the appropriate care queue, where a clinician reviews it.",
    ],

    context: [
      "A multi-location healthcare provider dealing with long intake queues, fragmented patient information and avoidable administrative work before appointments.",
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
          lead: "Fragmented inputs.",
          text: "Patient information arrives through forms, calls, portals and free-text messages, each with its own structure.",
        },
        {
          lead: "Manual re-entry and sorting.",
          text: "Clinical and administrative teams spend significant time re-entering data and working out the correct department or urgency level.",
        },
        {
          lead: "Peak-hour bottlenecks.",
          text: "Demand spikes create delays, repeated questions and an inconsistent intake experience across locations.",
        },
        {
          lead: "Automation with clear limits.",
          text: "The organization needs automation without letting an AI system make unsupported clinical decisions.",
        },
      ],
    },

    insight: "Automate the administrative steps, keep clinical judgment with licensed staff.",
    insightLabel: "Design principle",

    solution: [
      "A conversational AI intake agent collects demographics, symptoms, medication details, visit reason and relevant history in a guided flow.",
      "Natural-language answers are converted into structured fields and validated against required intake rules.",
      "Configurable triage rules flag urgency and route each case to the correct queue for staff review. Defined red-flag conditions trigger immediate human escalation.",
      "The agent connects to scheduling and EHR workflows, so staff receive a concise, structured intake summary instead of raw conversation history.",
      "Human-in-the-loop controls keep clinical judgment with licensed staff while the repetitive administrative steps are automated.",
    ],
    solutionAsList: true,

    flow: [
      { title: "Patient starts intake", text: "Through the web, a mobile app or the patient portal." },
      { title: "Guided conversation", text: "The AI agent collects and clarifies the required information." },
      { title: "Structuring & completeness check", text: "NLP turns answers into structured data and checks nothing required is missing." },
      { title: "Rule-based routing", text: "Configured rules and risk flags assign a provisional urgency and destination." },
      {
        title: "Escalation to staff",
        text: "High-risk or ambiguous cases go straight to a staff member instead of continuing automatically.",
        checkpoint: true,
      },
      { title: "Summary for clinical review", text: "A structured summary is written to the clinical workflow for staff to review." },
    ],

    stack: [
      { layer: "LLM / NLP", tool: "GPT-class language model, structured prompting, medical terminology layer" },
      { layer: "Backend", tool: "Python, FastAPI, REST APIs" },
      { layer: "Data", tool: "PostgreSQL / secure patient-data store" },
      { layer: "Integrations", tool: "EHR/EMR, scheduling and messaging APIs" },
      { layer: "Security", tool: "Role-based access, audit logging, encryption, consent controls" },
    ],

    impactIntro: "What the workflow is designed to change:",
    impact: [
      { text: "Shorter intake queues and less repetitive data entry for clinical and front-desk teams." },
      { text: "More consistent capture of patient information across digital channels." },
      { text: "Faster routing of patients to the correct care team, and earlier escalation of red-flag cases." },
      { text: "Intake available 24/7 without expanding administrative headcount." },
    ],

    targetOutcome:
      "Reduce intake handling time from a manual, multi-step process to a near-real-time digital workflow, while preserving human clinical oversight.",

    principles: [
      {
        title: "Human oversight",
        text: "Human oversight is retained for high-impact, regulated, ambiguous or low-confidence decisions.",
      },
      {
        title: "Security by design",
        text: "Security, access control, auditability and privacy are designed into the workflow rather than added after deployment.",
      },
      {
        title: "Process KPIs, not only accuracy",
        text: "Model quality is measured together with operational KPIs, so automation improves the business process and not only model accuracy.",
      },
      {
        title: "Monitored in production",
        text: "Production monitoring, feedback capture and controlled retraining keep performance steady as data and behavior change.",
      },
    ],

    whyItMatters:
      "Axiomra combines AI engineering, data science, workflow integration and production governance to turn this use case into an operational solution that fits existing business systems and decision processes.",

    tags: ["Healthcare", "AI Agents", "Clinical Workflow Automation", "Human-in-the-loop", "EHR Integration"],

    labels: {
      context: "Typical scenario",
      challenge: "Business problem",
      solution: "Solution",
      stack: "Tools & technology",
      impact: "Outcome & business impact",
      why: "Axiomra value",
    },

    cta: {
      title: "Planning an intake workflow like this?",
      subtitle:
        "Tell us how patients reach you today and which systems their details pass through. We will map which admin steps an agent can take over, and where staff stay in the loop.",
      buttonText: "Talk to our team",
    },
  },
};
