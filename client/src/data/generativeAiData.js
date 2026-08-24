/** Every string and image the Generative AI detail page renders lives here. */
import heroContent from "../assets/gen-ai/hero-content-generation.jpg";
import heroCopilot from "../assets/gen-ai/hero-copilot-chat.jpg";
import heroChip from "../assets/gen-ai/hero-model-chip.jpg";
import businessChallenges from "../assets/gen-ai/business-challenges.jpg";
import consultingStrategy from "../assets/gen-ai/gen-ai-consulting-strategy.jpg";
import genAiIntegration from "../assets/gen-ai/gen-ai-integration.jpg";
import customLlm from "../assets/gen-ai/custom-llm-development.jpg";
import appDevelopment from "../assets/gen-ai/gen-ai-app-development.jpg";
import copilotAgents from "../assets/gen-ai/ai-copilot-agents.jpg";
import ragDevelopment from "../assets/gen-ai/rag-development.jpg";
import workflowAutomation from "../assets/gen-ai/workflow-automation.jpg";
import caseManufacturing from "../assets/gen-ai/case-study-manufacturing.jpg";
import caseSupport from "../assets/gen-ai/case-study-support-copilot.jpg";
import caseMarketing from "../assets/gen-ai/case-study-marketing-content.jpg";
import partnership from "../assets/gen-ai/why-axiomra-partnership.jpg";
import roi from "../assets/gen-ai/generative-ai-roi.jpg";
import infrastructure from "../assets/gen-ai/deployment-infrastructure.jpg";
import enterpriseIndustries from "../assets/gen-ai/enterprise-industries.jpg";
import governance from "../assets/gen-ai/ai-governance-security.jpg";
import horizon from "../assets/gen-ai/generative-ai-horizon.jpg";

/** Route this page owns, imported by App.jsx and the navbar so they can't drift. */
export const GENERATIVE_AI_SLUG = "generative-ai-services";

export const hero = {
  eyebrow: "Generative AI Development Company",
  titleLead: "Custom Generative AI",
  titleAccent: "Development Services",
  titleTail: "For Enterprises And Startups",
  body:
    "We build production-ready generative AI systems on GPT-4o, Claude, Llama, Gemini, Mistral, Midjourney, and Stable Diffusion: systems that automate workflows, generate content on brand, and turn your own documents into answers your team can trust. Not a model demo: a system your people use on Monday morning.",
  ctaText: "Request A Free Consultation",
  secondaryCtaText: "See What We Build",
  proof: { rating: "4.8", reviews: "300+ companies", source: "Reviewed on Clutch" },
  stats: [
    { value: "300+", label: "AI projects delivered" },
    { value: "60-70%", label: "Less time on manual tasks" },
    { value: "6-10", label: "Weeks to a working pilot" },
  ],
  images: [
    { src: heroContent, alt: "Robotic hand and human hand exchanging generated content, video, email and ad assets" },
    { src: heroCopilot, alt: "Hands typing on a laptop while an AI copilot answers in chat bubbles" },
    { src: heroChip, alt: "Glowing AI chip at the centre of a circuit board" },
  ],
};

/** Foundation models we build on, a wordmark ticker under the hero. */
export const modelMarquee = [
  "GPT-4o",
  "Claude 3.5 Sonnet",
  "Llama 3",
  "Gemini 1.5 Pro",
  "Mistral Large",
  "Stable Diffusion",
  "DALL·E 3",
  "Whisper",
  "Midjourney",
  "Mixtral 8x7B",
  "Groq",
  "DeepSeek",
];

export const challenges = {
  eyebrow: "Where generative AI actually pays for itself",
  titleAccent: "Overcome Business Challenges",
  titleLead: "With Generative AI Solutions",
  body:
    "Most teams are not short on ideas: they are short on hours. Repetitive writing, slow first drafts, support queues, and knowledge buried in PDFs quietly cost you a headcount or two every year. We build generative AI that removes that work instead of adding another tool nobody opens.",
  image: businessChallenges,
  imageAlt: "Business lead and a humanoid robot reviewing live analytics dashboards together at a desk",
  /** Small overlapping photo pulled over the main one, replaces the old stat badge. */
  accentImage: workflowAutomation,
  accentImageAlt: "Automated workflow steps running end to end on a screen",
  items: [
    {
      title: "Reduce operational bottlenecks",
      body: "Automate the repetitive drafting, tagging, and summarising that eats your team's week, and hand the hours back to work that needs judgement.",
    },
    {
      title: "Answer customers instantly",
      body: "AI-generated replies grounded in your own policies and product data: personal, consistent, and available at 2am without a night shift.",
    },
    {
      title: "Ship products faster",
      body: "Launch AI-powered features with a team that has already trained, evaluated, and deployed them, instead of learning on your budget.",
    },
    {
      title: "Scale without disruption",
      body: "Systems that fit your existing CRM, ERP, and data stack, no rip-and-replace, no six-month migration before value shows up.",
    },
  ],
};

export const services = {
  eyebrow: "What generative AI services do we provide?",
  titleAccent: "What We Build With",
  titleLead: "Generative AI Development Services",
  subtitle:
    "End-to-end generative AI services for businesses that want to build, deploy, and scale AI systems: strategy, model development, integration, automation, and post-deployment support.",
  items: [
    {
      id: "generative-ai-consulting",
      title: "Generative AI Consulting And Strategy",
      body:
        "Most businesses know they need generative AI but not where it belongs. We assess your workflows, identify the use cases that actually pay back, and hand you a costed roadmap with the numbers each initiative has to hit.",
      bullets: [
        "AI readiness assessment and feasibility study",
        "Business-specific use case identification",
        "Custom AI strategy and implementation roadmap",
        "KPI definition and performance benchmarks",
      ],
      image: consultingStrategy,
      imageAlt: "Hand presenting an AI strategy board of planning, forecasting and evaluation panels",
    },
    {
      id: "generative-ai-integration",
      title: "Generative AI Integration",
      body:
        "Adding AI to systems already carrying your business is where most projects stall. We integrate generative AI into your CRM, ERP, SaaS platforms, and internal tools with minimal disruption and a clear path to ROI.",
      bullets: [
        "Integration into the systems you already run",
        "LLMOps setup for continuous model monitoring",
        "Scalable deployment on AWS, Azure, or GCP",
        "Ongoing performance and cost optimisation",
      ],
      image: genAiIntegration,
      imageAlt: "Hands typing on a laptop while an AI brain connects out to surrounding API endpoints",
    },
    {
      id: "custom-llm-development",
      title: "Custom LLM Development Services",
      body:
        "Off-the-shelf language models do not know your industry, your data, or your voice. We design custom large language models trained on your corpus and fine-tune Llama 3, Mistral, and GPT-4o to match how your business actually writes and decides.",
      bullets: [
        "Custom LLM design and development",
        "Model fine-tuning and optimisation",
        "Domain-specific LLM training",
        "Evaluation harness and quality benchmarks",
      ],
      image: customLlm,
      imageAlt: "Phone held in an open palm showing a generative AI console for text, image, voice, video and code",
    },
    {
      id: "generative-ai-app-development",
      title: "Generative AI App Development",
      body:
        "Businesses need AI-powered products but rarely have the team to build them from scratch. We build generative AI applications for web and mobile, writing tools, image generation platforms, AI search, and intelligent SaaS products.",
      bullets: [
        "End-to-end generative AI app development",
        "AI-powered web and mobile applications",
        "Custom AI product development for SaaS",
        "API-first architecture for easy scaling",
      ],
      image: appDevelopment,
      imageAlt: "Hands using a laptop showing a prompt console beside a generated application layout",
    },
    {
      id: "ai-copilots-and-agents",
      title: "AI Copilot And Agent Development",
      body:
        "Teams spend too much time on tasks AI can handle end to end. We build copilots and autonomous agents that work inside your existing tools, assist your teams, and complete multi-step tasks without manual babysitting.",
      bullets: [
        "Custom AI copilot development for internal tools",
        "Autonomous agent design and deployment",
        "Multi-agent workflow orchestration",
        "Integration with Slack, CRM, ERP and more",
      ],
      image: copilotAgents,
      imageAlt: "Developer working with an AI chat assistant docked beside their code editor",
    },
    {
      id: "rag-development",
      title: "Custom RAG Development Services",
      body:
        "Generic models give confident wrong answers because they have never seen your data. We build Retrieval-Augmented Generation systems that connect models to your documents, databases, and knowledge bases and cite where every answer came from.",
      bullets: [
        "RAG architecture design and setup",
        "Knowledge base and document integration",
        "Context-aware search and Q&A systems",
        "Source-cited AI response generation",
      ],
      image: ragDevelopment,
      imageAlt: "Laptop feeding charts, records and documents into a central AI profile that returns one answer",
    },
    {
      id: "generative-ai-workflow-automation",
      title: "Generative AI Workflow Automation",
      body:
        "Manual workflows slow down operations and quietly raise costs in every department. We design and deploy generative AI automation that handles the repetitive work across customer service, marketing, HR, and operations.",
      bullets: [
        "End-to-end workflow automation with generative AI",
        "AI-powered customer service and support systems",
        "Automated reporting, summarisation and data processing",
        "Integration with existing business tools and platforms",
      ],
      image: workflowAutomation,
      imageAlt: "Business user triggering an automated AI workflow across a chain of connected task cards",
    },
  ],
};

export const modelTypes = {
  eyebrow: "What generative AI systems do we design and deploy?",
  titleAccent: "Transform Your Operations",
  titleLead: "With Production Generative AI",
  subtitle:
    "Six families of generative systems, each tuned to your data and your quality bar before a single user sees an output.",
  items: [
    {
      icon: "text",
      name: "Text Generation Models",
      body:
        "Models trained on your terminology, tone, and writing style. They draft product descriptions, reports, customer emails, and documentation with consistent quality, straight inside your CMS, CRM, or internal workflow.",
      tags: ["GPT-4o", "Claude", "Llama 3", "Mistral"],
    },
    {
      icon: "image",
      name: "Image Generation Models",
      body:
        "Image systems built on DALL·E, Stable Diffusion, and similar models, fine-tuned on your brand guidelines. On-demand mockups, marketing assets, and design variations, tuned to your visual identity before deployment.",
      tags: ["Stable Diffusion", "DALL·E 3", "Midjourney", "LoRA"],
    },
    {
      icon: "audio",
      name: "Audio And Speech Models",
      body:
        "Speech systems that generate and understand audio for service bots, audiobook narration, podcasts, and music. Each system is trained to sound human and to understand context, not just read text aloud.",
      tags: ["Whisper", "ElevenLabs", "TTS", "Diarisation"],
    },
    {
      icon: "video",
      name: "Video Generation Models",
      body:
        "Video systems that combine visual, audio, and text input to generate and edit content without manual production overhead, marketing videos, training content, and personalised video messages at scale.",
      tags: ["Sora-class", "Runway", "Editing", "Dubbing"],
    },
    {
      icon: "code",
      name: "Code Generation Models",
      body:
        "Coding assistants trained on your standards that write boilerplate, suggest implementations, and convert code between languages, reviewed and debugged against your own quality gates, not the public internet's.",
      tags: ["Codex-class", "Refactoring", "Tests", "Migration"],
    },
    {
      icon: "multimodal",
      name: "Multimodal Models",
      body:
        "Systems that process text, images, audio, and video together so nothing is lost in translation between formats. One system that answers questions about visual content with full context, instead of four stitched-together tools.",
      tags: ["Vision + Text", "Doc AI", "Search", "Summaries"],
    },
  ],
};

export const caseStudies = {
  eyebrow: "What have we delivered to businesses?",
  titleLead: "Real Generative AI Projects.",
  titleAccent: "Real Business Results.",
  subtitle: "A look at what we have built for clients across industries.",
  items: [
    {
      name: "Ladle",
      title: "AI Kitchen Assistant With RAG Validation",
      problem:
        "The existing AI recipe generator produced inaccurate results that missed dietary restrictions and food safety requirements, making it unreliable for real users.",
      solution:
        "We built a custom AI kitchen assistant using RAG, GPT-4o, and a dual-layer validation system. Every recipe is checked for dietary compliance, food safety, and cooking accuracy before delivery.",
      results: [
        { value: "90%", label: "Recipe accuracy rate" },
        { value: "40X", label: "Faster recipe customisation" },
        { value: "30s", label: "Delivery time per recipe" },
      ],
      image: caseMarketing,
      imageAlt: "Generated recipe content being reviewed on a laptop dashboard",
    },
    {
      name: "FormOlé",
      title: "Support Copilot Grounded In Product Docs",
      problem:
        "Support agents answered the same product questions daily by searching four disconnected systems, and first-response time kept slipping past SLA.",
      solution:
        "We shipped a support copilot with a cited RAG layer over their documentation, ticket history, and policy base, drafting replies in the agent's own tone with the source attached.",
      results: [
        { value: "68%", label: "Tickets auto-drafted" },
        { value: "3.4X", label: "Faster first response" },
        { value: "24/7", label: "Coverage without night shift" },
      ],
      image: caseSupport,
      imageAlt: "Support agent reviewing an AI-drafted reply with cited product documentation",
    },
    {
      name: "Voltox",
      title: "Generative Reporting For Plant Operations",
      problem:
        "Plant supervisors spent the first two hours of every shift assembling handover reports by hand from sensor exports and shift notes.",
      solution:
        "We deployed a multimodal generation pipeline that reads machine telemetry, images, and shift notes, then writes the handover report and flags anomalies for a human to sign off.",
      results: [
        { value: "2 hrs", label: "Saved per shift" },
        { value: "97%", label: "Report accuracy at sign-off" },
        { value: "5 sites", label: "Rolled out in one quarter" },
      ],
      image: caseManufacturing,
      imageAlt: "Operations team reviewing AI-generated plant reports on a wall of control-room screens",
    },
  ],
};

export const useCases = {
  eyebrow: "Where does it land inside your business?",
  titleAccent: "Generative AI Use Cases",
  titleLead: "By Business Function",
  subtitle:
    "Generative AI rarely transforms a whole company at once. It lands in one function, proves itself, and spreads. These are the six places it lands first.",
  items: [
    {
      icon: "marketing",
      name: "Marketing And Content",
      body: "On-brand copy, campaign variants, and creative assets generated in minutes and reviewed by your team, not written from a blank page.",
      bullets: ["Campaign and ad copy at scale", "SEO briefs and long-form drafts", "Brand-tuned image generation"],
    },
    {
      icon: "support",
      name: "Customer Support",
      body: "Cited answers drafted from your own policies, so agents approve rather than research, and customers stop waiting on a queue.",
      bullets: ["Cited reply drafting", "Deflection with grounded chat", "Auto-summarised ticket handover"],
    },
    {
      icon: "sales",
      name: "Sales And Revenue",
      body: "Research, outreach, and proposal drafts assembled from your CRM and product data instead of a rep's spare thirty minutes.",
      bullets: ["Account research summaries", "Personalised outreach at scale", "Proposal and RFP first drafts"],
    },
    {
      icon: "ops",
      name: "Operations",
      body: "The reporting, tagging, and summarising layer of your operation, handled by a system that never skips a shift.",
      bullets: ["Automated shift and status reports", "Document processing pipelines", "Anomaly flagging for review"],
    },
    {
      icon: "hr",
      name: "HR And Enablement",
      body: "Job descriptions, onboarding material, and an internal assistant that answers policy questions from the actual handbook.",
      bullets: ["Role and JD generation", "Onboarding content packs", "Internal policy assistant"],
    },
    {
      icon: "legal",
      name: "Legal And Finance",
      body: "Contract and invoice review that surfaces the clauses and numbers a human needs to look at, with the source cited every time.",
      bullets: ["Contract clause extraction", "Invoice and expense parsing", "Compliance-ready audit trails"],
    },
  ],
};

export const techStack = {
  eyebrow: "Which technologies do we use to build generative AI?",
  titleAccent: "Supercharge Your Business",
  titleLead: "With Our Generative AI Tech Stack",
  subtitle:
    "We work with the most reliable and widely adopted generative AI technologies available today, and select tools per use case, infrastructure, and performance requirement, never the other way round.",
  image: infrastructure,
  imageAlt: "Data streaming through an illuminated data centre aisle",
  groups: [
    { name: "Large Language Models", tools: ["GPT-4o", "Claude 3.5 Sonnet", "Llama 3", "Gemini 1.5 Pro", "Mistral Large", "Mixtral 8x7B", "DeepSeek"] },
    { name: "Image, Audio And Video", tools: ["Stable Diffusion", "DALL·E 3", "Midjourney", "Whisper", "ElevenLabs", "Runway"] },
    { name: "Frameworks And Orchestration", tools: ["LangChain", "LlamaIndex", "LangGraph", "Haystack", "DSPy", "Semantic Kernel"] },
    { name: "Vector Stores And Retrieval", tools: ["Pinecone", "Weaviate", "Qdrant", "pgvector", "Elasticsearch", "FAISS"] },
    { name: "Training And Fine-Tuning", tools: ["PyTorch", "Hugging Face", "LoRA / QLoRA", "DeepSpeed", "Ray", "Weights & Biases"] },
    { name: "Cloud, Serving And Guardrails", tools: ["AWS Bedrock", "Azure OpenAI", "Vertex AI", "vLLM", "Groq", "Guardrails AI"] },
  ],
};

export const process = {
  eyebrow: "How do we build and deploy generative AI?",
  titleAccent: "Our Step-By-Step Approach",
  titleLead: "To Generative AI Delivery",
  body:
    "Six stages, each with a defined output, so you always know what is being built, why, and what comes next. No stage closes until you have something you can look at.",
  ctaText: "Contact Us Now",
  steps: [
    { title: "Discovery And Use Case Selection", body: "We map your workflows, data, and constraints, then rank candidate use cases by payback and risk. Output: a scoped use case with success metrics agreed in writing." },
    { title: "Data Readiness And Architecture", body: "We audit the documents, records, and systems the model will rely on, then design the retrieval, prompting, and serving architecture around them. Output: an architecture your engineers can review." },
    { title: "Model Selection And Prototyping", body: "We benchmark candidate models on your data (quality, latency, and cost per task) and build a working prototype. Output: a prototype you can put in front of real users." },
    { title: "Fine-Tuning And Grounding", body: "We fine-tune or ground the chosen model on your corpus, add guardrails, and shape outputs to your tone and format rules. Output: a system that sounds like your business." },
    { title: "Testing And Validation", body: "We test for accuracy, reliability, and performance under real-world load, including bias checks and user acceptance testing with your team. Output: a quality report and full sign-off before go-live." },
    { title: "Deployment And Continuous Improvement", body: "We deploy into your environment, monitor quality and cost in production, and keep improving the system for 60 days at no extra cost. Output: a system your team owns." },
  ],
};

export const outcomes = {
  eyebrow: "What can your business achieve with generative AI?",
  titleAccent: "Stay Ahead Of The Competition",
  titleLead: "With Generative AI Built For Production",
  image: roi,
  imageAlt: "Robotic hand above rising stacks of coins and a growth curve",
  items: [
    { value: "60-70%", title: "Increased Automation", body: "Generative AI handles repetitive content, data, and communication work so your team can focus on what drives growth. Businesses typically see a 60 to 70% reduction in time spent on manual, repeatable tasks after deployment." },
    { value: "40%", title: "Improved Productivity", body: "AI-assisted workflows speed up decision-making, cut bottlenecks, and give your team faster access to the information they need. Teams report completing projects up to 40% faster than before." },
    { value: "40%", title: "Significant Cost Reduction", body: "Automating tasks and reducing errors can cut operational costs by up to 40%. For most businesses, the ROI on generative AI development becomes visible inside the first six months." },
    { value: "10X", title: "Faster Output Generation", body: "Generative AI produces content, reports, code, and data summaries in a fraction of the time a human team needs. You increase output speed without increasing headcount." },
    { value: "24/7", title: "Better Decision Making", body: "Generative systems process large volumes of data and surface clear insights faster than any manual process, so leadership decisions are based on evidence rather than assumption." },
    { value: "Compounding", title: "Stronger Competitive Position", body: "Companies deploying generative AI today are building a structural advantage over competitors still evaluating it. Faster output, lower costs, and smarter decisions compound into a lead that is difficult to close." },
  ],
};

export const whyUs = {
  eyebrow: "Why choose us?",
  titleAccent: "What Makes Us Different",
  titleLead: "From Other Generative AI Companies",
  body:
    "Most generative AI companies hand you a finished product and disappear. We stay involved from the first conversation to post-deployment, making sure your AI system actually works for your business, and keeps working as your data changes.",
  image: partnership,
  imageAlt: "Human hand and robotic hand shaking against a network of connected nodes",
  governanceImage: governance,
  governanceImageAlt: "Hand holding an AI security shield surrounded by compliance and access icons",
  ctaText: "Request A Free Consultation",
  stats: [
    { value: "300+", label: "AI and machine learning projects" },
    { value: "50+", label: "Engineers and data scientists" },
    { value: "20+", label: "Global markets served" },
    { value: "4+", label: "Years building production AI" },
  ],
  reasons: [
    { title: "Clear And Consistent Communication", body: "You get a dedicated project manager from day one. No chasing updates, no unclear timelines. You always know what is being built, what stage it is at, and what is coming next." },
    { title: "Results You Can Measure", body: "We define success metrics before we write a line of code. Every solution is tied to a business outcome, whether that is cost reduction, faster output, or improved accuracy." },
    { title: "Flexible Engagement Models", body: "Fixed-price projects, dedicated teams, and time-and-materials engagements, so you can work with us the way that fits your situation, not ours." },
    { title: "End-To-End Ownership", body: "We handle everything from strategy and model selection through development, integration, deployment, and monitoring. One partner, full accountability." },
    { title: "60 Days Of Post-Deployment Support", body: "After your solution goes live, we stay on for 60 days at no extra cost. We monitor performance, fix issues, and make adjustments based on real-world usage from day one." },
    { title: "Team Coaching And Handover", body: "We do not just build and leave. Our team trains your staff on how to use, manage, and get the most out of your new AI system, so your team walks away confident, not dependent." },
  ],
};

export const industriesBand = {
  eyebrow: "Which industries do we serve?",
  titleAccent: "Generative AI Built For",
  titleLead: "The Way Your Industry Works",
  body:
    "We have shipped generative AI for healthcare, finance, retail, education, logistics, legal, real estate, and manufacturing teams. Every one came with its own compliance rules, data shape, and tolerance for error, and the system was built around them.",
  image: enterpriseIndustries,
  imageAlt: "Holographic AI presenter walking a boardroom through live dashboards on a secure data wall",
  horizonImage: horizon,
  horizonImageAlt: "Robotic hand reaching towards a city skyline with an AI chip above the water",
  names: [
    "Healthcare",
    "Finance And Fintech",
    "Retail And E-Commerce",
    "Education",
    "Manufacturing",
    "Logistics",
    "Legal",
    "Real Estate",
    "Insurance",
    "Marketing",
    "Travel",
    "Media",
  ],
};

export const faqs = [
  {
    q: "What are generative AI development services?",
    a: "Generative AI development services cover everything needed to take a model from idea to production: use case selection, data preparation, model selection or fine-tuning, retrieval and grounding, application development, integration with your systems, and monitoring after launch.",
  },
  {
    q: "What generative AI services does Axiomra offer?",
    a: "Consulting and strategy, custom LLM development, generative AI integration, AI app development, copilots and autonomous agents, custom RAG systems, and generative AI workflow automation, plus 60 days of post-deployment support on every build.",
  },
  {
    q: "How much does it cost to build a generative AI solution?",
    a: "A focused pilot on an existing model typically lands well below a custom fine-tuned platform with multiple integrations. Cost is driven by data readiness, integration count, and inference volume. Book a free session and we will give you an itemised estimate rather than a range.",
  },
  {
    q: "How long does generative AI development take?",
    a: "Most projects reach a working pilot in 6 to 10 weeks. Full production rollout depends on integration complexity, security review, and how ready your data is on day one.",
  },
  {
    q: "What is the difference between fine-tuning and RAG?",
    a: "Fine-tuning changes how a model writes and reasons by training it further on your examples: good for tone, format, and domain language. RAG leaves the model alone and retrieves your documents at question time, good for facts that change and answers that must cite a source. Most production systems use both.",
  },
  {
    q: "Can you integrate generative AI with our existing systems?",
    a: "Yes. We build secure APIs and connectors into your CRM, ERP, data warehouse, ticketing, and internal tools. Integration is designed so nothing existing has to be replaced to get value.",
  },
  {
    q: "What data is needed to build a custom generative AI solution?",
    a: "Usually less than teams expect. For RAG, your existing documents, tickets, and knowledge bases are often enough. For fine-tuning, a few thousand good examples of the output you want beats a warehouse of unlabelled data.",
  },
  {
    q: "How do you handle hallucinations and output quality?",
    a: "Grounding with retrieval, source citation on every answer, guardrails on prompts and outputs, and an evaluation harness that scores quality against a fixed test set before each release. You get the quality report before go-live, not after complaints.",
  },
  {
    q: "What security and compliance standards do you follow?",
    a: "We work within your compliance boundary: private deployments, VPC and on-premise serving, no training on your data by default, role-based access, full audit trails, and NDAs signed before any data moves.",
  },
  {
    q: "Which AI models do you work with?",
    a: "GPT-4o, Claude, Llama 3, Gemini, Mistral, Mixtral, DeepSeek, Stable Diffusion, DALL·E, Whisper and more. We benchmark candidates on your data for quality, latency, and cost per task rather than defaulting to one vendor.",
  },
  {
    q: "Which industries do you serve with generative AI?",
    a: "Healthcare, finance, retail and e-commerce, education, manufacturing, logistics, legal, real estate, insurance, marketing, travel, and media, with compliance and data constraints handled per industry.",
  },
  {
    q: "Do you offer post-deployment support?",
    a: "Yes. Every engagement includes 60 days of post-deployment support at no extra cost, and optional ongoing LLMOps: monitoring quality drift, cost per request, and model upgrades as new versions ship.",
  },
];
