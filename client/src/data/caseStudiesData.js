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
};
