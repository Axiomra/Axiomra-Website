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

export const hero = {
  eyebrow: "Generative AI Development Company",
  titleLead: "Custom Generative AI",
  titleAccent: "Development Services",
  titleTail: "For Enterprises And Startups",
  body: "We build generative AI solutions that help your team create content, find information, and automate routine work. By combining suitable models with your business data and existing tools, we develop applications designed for daily use, with evaluation and review controls matched to your needs.",
  ctaText: "Book a Free Consultation",
  secondaryCtaText: "Explore Our Solutions",
  proof: { rating: "4.8", reviews: "300+ companies", source: "Reviewed on Clutch" },
  /**
   * The PDF review asked for verified figures with context, or these non-numeric
   * labels where evidence is not available. Items with no `value` render as a
   * single capability label instead of a statistic.
   */
  stats: [
    { label: "Custom AI Solutions" },
    { label: "Workflow Automation" },
    { label: "Pilot Development" },
  ],
  images: [
    {
      src: heroContent,
      alt: "Robotic hand and human hand exchanging generated content, video, email and ad assets",
    },
    {
      src: heroCopilot,
      alt: "Hands typing on a laptop while an AI copilot answers in chat bubbles",
    },
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
  eyebrow: "Put generative AI to work",
  titleAccent: "Give Your Team More Time",
  titleLead: "for High Value Work",
  body: "Routine writing, growing support queues, and information spread across documents can slow your team down. Our generative AI solutions help create drafts, retrieve relevant knowledge, and shorten repetitive tasks within the tools your people already use.",
  image: businessChallenges,
  imageAlt:
    "Business lead and a humanoid robot reviewing live analytics dashboards together at a desk",
  /** Small overlapping photo pulled over the main one, replaces the old stat badge. */
  accentImage: workflowAutomation,
  accentImageAlt: "Automated workflow steps running end to end on a screen",
  items: [
    {
      title: "Reduce Routine Work",
      body: "Automate drafting, tagging, and summarisation so your team can focus on work that needs judgement.",
    },
    {
      title: "Support Faster Customer Responses",
      body: "Generate draft replies using your approved policies and product information, with escalation where needed.",
    },
    {
      title: "Build AI Features With a Clear Plan",
      body: "Move from a defined use case to an evaluated application with development and integration support.",
    },
    {
      title: "Extend Your Existing Systems",
      body: "Connect AI to your CRM, ERP, and data tools through a phased implementation approach.",
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
      title: "Generative AI Strategy and Consulting",
      body: "Identify where generative AI can support your business. We assess readiness, compare potential use cases, and develop a roadmap with estimated costs, dependencies, and success measures.",
      bullets: [
        "AI readiness and feasibility assessment",
        "Prioritised business use cases",
        "Implementation roadmap",
        "KPIs and evaluation criteria",
      ],
      ctaText: "Explore AI Consulting",
      image: consultingStrategy,
      imageAlt:
        "Hand presenting an AI strategy board of planning, forecasting and evaluation panels",
    },
    {
      id: "generative-ai-integration",
      title: "Generative AI Integration",
      body: "Bring generative AI into the systems your team already uses. We plan and implement integrations with your CRM, ERP, SaaS platforms, and internal tools, with attention to access, reliability, and operating costs.",
      bullets: [
        "Business system integrations",
        "Deployment to your agreed cloud environment",
        "Model monitoring setup",
        "Performance and cost optimisation",
      ],
      ctaText: "Explore AI Integration",
      image: genAiIntegration,
      imageAlt:
        "Hands typing on a laptop while an AI brain connects out to surrounding API endpoints",
    },
    {
      id: "custom-llm-development",
      title: "Custom LLM Solutions and Fine-tuning",
      body: "Adapt language models to your domain, terminology, and output requirements. We evaluate whether prompting, retrieval, or fine-tuning best suits your goals before selecting an approach.",
      bullets: [
        "Model selection and solution design",
        "Domain data preparation",
        "Fine-tuning where appropriate",
        "Quality evaluation and benchmarks",
      ],
      ctaText: "Explore Custom LLM Solutions",
      image: customLlm,
      imageAlt:
        "Phone held in an open palm showing a generative AI console for text, image, voice, video and code",
    },
    {
      id: "generative-ai-app-development",
      title: "Generative AI Application Development",
      body: "Turn your idea into a usable AI application for web or mobile. We develop writing assistants, AI search tools, content generation applications, and AI features for SaaS products.",
      bullets: [
        "Application design and development",
        "Web and mobile integration",
        "Custom AI product capabilities",
        "APIs designed for growth and maintenance",
      ],
      ctaText: "Explore AI App Development",
      image: appDevelopment,
      imageAlt:
        "Hands using a laptop showing a prompt console beside a generated application layout",
    },
    {
      id: "ai-copilots-and-agents",
      title: "AI Copilot and Agent Development",
      body: "Help your team complete routine work with copilots and agents connected to existing tools. We define permissions, approval points, and exception handling to match the level of autonomy your workflow needs.",
      bullets: [
        "Internal AI copilots",
        "Task-focused AI agents",
        "Workflow orchestration",
        "Integration with collaboration and business tools",
      ],
      ctaText: "Explore AI Agents",
      image: copilotAgents,
      imageAlt: "Developer working with an AI chat assistant docked beside their code editor",
    },
    {
      id: "rag-development",
      title: "Retrieval Augmented Generation Development",
      body: "Make your business knowledge easier to access. We connect language models to approved documents and data sources so users can retrieve relevant information and review supporting references.",
      bullets: [
        "RAG architecture and setup",
        "Document and knowledge base integration",
        "Context-aware search and Q&A",
        "Source references and answer-quality evaluation",
      ],
      ctaText: "Explore RAG Solutions",
      image: ragDevelopment,
      imageAlt:
        "Laptop feeding charts, records and documents into a central AI profile that returns one answer",
    },
    {
      id: "generative-ai-workflow-automation",
      title: "Generative AI Workflow Automation",
      body: "Cut repetitive work across customer service, marketing, HR, and operations. We connect generative AI to your existing processes, with review steps for outputs and actions that need human judgement.",
      bullets: [
        "Workflow assessment and automation",
        "Reporting and summarisation",
        "Customer support assistance",
        "Integration with business tools",
      ],
      ctaText: "Explore Workflow Automation",
      image: workflowAutomation,
      imageAlt:
        "Business user triggering an automated AI workflow across a chain of connected task cards",
    },
  ],
};

export const modelTypes = {
  eyebrow: "What generative AI systems do we design and deploy?",
  titleAccent: "Generative AI Capabilities",
  titleLead: "for Your Business",
  subtitle:
    "Explore the types of AI systems we can combine to support your workflows, with evaluation tailored to each use case.",
  items: [
    {
      icon: "text",
      name: "Text Generation",
      body: "Create drafts of reports, emails, product descriptions, and documentation using your terminology and style guidance, with review before publication.",
      tags: ["GPT-4o", "Claude", "Llama 3", "Mistral"],
    },
    {
      icon: "image",
      name: "Image Generation",
      body: "Generate concepts, marketing visuals, and variations using selected tools and reference assets, subject to brand review and usage requirements.",
      tags: ["Stable Diffusion", "DALL·E 3", "Midjourney", "LoRA"],
    },
    {
      icon: "audio",
      name: "Audio and Speech",
      body: "Build transcription, speech generation, and audio workflows for customer support, narration, and content production.",
      tags: ["Whisper", "ElevenLabs", "TTS", "Diarisation"],
    },
    {
      icon: "video",
      name: "Video Generation",
      body: "Support the creation and editing of marketing videos, training content, and personalised messages. Combine appropriate AI tools with human review for quality and brand consistency.",
      tags: ["Sora-class", "Runway", "Editing", "Dubbing"],
    },
    {
      icon: "code",
      name: "Code Assistance",
      body: "Help developers draft code, suggest implementations, refactor existing work, and create tests. Outputs are reviewed against your engineering standards before release.",
      tags: ["Codex-class", "Refactoring", "Tests", "Migration"],
    },
    {
      icon: "multimodal",
      name: "Multimodal AI",
      body: "Work across text, images, audio, and video within a connected workflow. Build applications that extract information, answer questions, and summarise supported content formats.",
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
      imageAlt:
        "Operations team reviewing AI-generated plant reports on a wall of control-room screens",
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
      bullets: [
        "Campaign and ad copy at scale",
        "SEO briefs and long-form drafts",
        "Brand-tuned image generation",
      ],
    },
    {
      icon: "support",
      name: "Customer Support",
      body: "Cited answers drafted from your own policies, so agents approve rather than research, and customers stop waiting on a queue.",
      bullets: [
        "Cited reply drafting",
        "Deflection with grounded chat",
        "Auto-summarised ticket handover",
      ],
    },
    {
      icon: "sales",
      name: "Sales And Revenue",
      body: "Research, outreach, and proposal drafts assembled from your CRM and product data instead of a rep's spare thirty minutes.",
      bullets: [
        "Account research summaries",
        "Personalised outreach at scale",
        "Proposal and RFP first drafts",
      ],
    },
    {
      icon: "ops",
      name: "Operations",
      body: "The reporting, tagging, and summarising layer of your operation, handled by a system that never skips a shift.",
      bullets: [
        "Automated shift and status reports",
        "Document processing pipelines",
        "Anomaly flagging for review",
      ],
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
      bullets: [
        "Contract clause extraction",
        "Invoice and expense parsing",
        "Compliance-ready audit trails",
      ],
    },
  ],
};

export const techStack = {
  eyebrow: "Which technologies do we use to build generative AI?",
  titleAccent: "Put Generative AI To Work",
  titleLead: "With Our Generative AI Tech Stack",
  subtitle:
    "We work with the most reliable and widely adopted generative AI technologies available today, and select tools per use case, infrastructure, and performance requirement, never the other way round.",
  image: infrastructure,
  imageAlt: "Data streaming through an illuminated data centre aisle",
  groups: [
    {
      name: "Large Language Models",
      tools: [
        "GPT-4o",
        "Claude 3.5 Sonnet",
        "Llama 3",
        "Gemini 1.5 Pro",
        "Mistral Large",
        "Mixtral 8x7B",
        "DeepSeek",
      ],
    },
    {
      name: "Image, Audio And Video",
      tools: ["Stable Diffusion", "DALL·E 3", "Midjourney", "Whisper", "ElevenLabs", "Runway"],
    },
    {
      name: "Frameworks And Orchestration",
      tools: ["LangChain", "LlamaIndex", "LangGraph", "Haystack", "DSPy", "Semantic Kernel"],
    },
    {
      name: "Vector Stores And Retrieval",
      tools: ["Pinecone", "Weaviate", "Qdrant", "pgvector", "Elasticsearch", "FAISS"],
    },
    {
      name: "Training And Fine-Tuning",
      tools: ["PyTorch", "Hugging Face", "LoRA / QLoRA", "DeepSpeed", "Ray", "Weights & Biases"],
    },
    {
      name: "Cloud, Serving And Guardrails",
      tools: ["AWS Bedrock", "Azure OpenAI", "Vertex AI", "vLLM", "Groq", "Guardrails AI"],
    },
  ],
};

export const process = {
  eyebrow: "How do we build and deploy generative AI?",
  titleAccent: "Our Step-By-Step Approach",
  titleLead: "To Generative AI Delivery",
  body: "Six stages, each with a defined output, so you always know what is being built, why, and what comes next. No stage closes until you have something you can look at.",
  ctaText: "Contact Us Now",
  steps: [
    {
      title: "Discovery And Use Case Selection",
      body: "We map your workflows, data, and constraints, then rank candidate use cases by payback and risk. Output: a scoped use case with success metrics agreed in writing.",
    },
    {
      title: "Data Readiness And Architecture",
      body: "We audit the documents, records, and systems the model will rely on, then design the retrieval, prompting, and serving architecture around them. Output: an architecture your engineers can review.",
    },
    {
      title: "Model Selection And Prototyping",
      body: "We benchmark candidate models on your data (quality, latency, and cost per task) and build a working prototype. Output: a prototype you can put in front of real users.",
    },
    {
      title: "Fine-Tuning And Grounding",
      body: "We fine-tune or ground the chosen model on your corpus, add guardrails, and shape outputs to your tone and format rules. Output: a system that sounds like your business.",
    },
    {
      title: "Testing And Validation",
      body: "We test for accuracy, reliability, and performance under real-world load, including bias checks and user acceptance testing with your team. Output: a quality report and full sign-off before go-live.",
    },
    {
      title: "Deployment And Continuous Improvement",
      body: "We deploy into your environment, monitor quality and cost in production, and keep improving the system for 60 days within the agreed support scope. Output: a system your team owns.",
    },
  ],
};

export const outcomes = {
  eyebrow: "What can your business achieve with generative AI?",
  titleAccent: "Stay Ahead Of The Competition",
  titleLead: "With Generative AI Built For Production",
  image: roi,
  imageAlt: "Robotic hand above rising stacks of coins and a growth curve",
  items: [
    {
      value: "60-70%",
      title: "Increased Automation",
      body: "Generative AI handles repetitive content, data, and communication work so your team can focus on what drives growth. Businesses typically see a 60 to 70% reduction in time spent on manual, repeatable tasks after deployment.",
    },
    {
      value: "40%",
      title: "Improved Productivity",
      body: "AI-assisted workflows speed up decision-making, cut bottlenecks, and give your team faster access to the information they need. Teams report completing projects up to 40% faster than before.",
    },
    {
      value: "40%",
      title: "Significant Cost Reduction",
      body: "Automating tasks and reducing errors can cut operational costs by up to 40%. For most businesses, the ROI on generative AI development becomes visible inside the first six months.",
    },
    {
      value: "10X",
      title: "Faster Output Generation",
      body: "Generative AI produces content, reports, code, and data summaries in a fraction of the time a human team needs. You increase output speed without increasing headcount.",
    },
    {
      value: "24/7",
      title: "Better Decision Making",
      body: "Generative systems process large volumes of data and surface clear insights faster than any manual process, so leadership decisions are based on evidence rather than assumption.",
    },
    {
      value: "Compounding",
      title: "Stronger Competitive Position",
      body: "Companies deploying generative AI today are building a structural advantage over competitors still evaluating it. Faster output, lower costs, and smarter decisions compound into a lead that is difficult to close.",
    },
  ],
};

export const whyUs = {
  eyebrow: "Why choose us?",
  titleAccent: "Why Build Generative AI",
  titleLead: "With Axiomra",
  body: "Work with a team that connects strategy, development, and adoption. We help you define success, integrate the solution, and support your team through launch and the agreed post-deployment period.",
  image: partnership,
  imageAlt: "Human hand and robotic hand shaking against a network of connected nodes",
  governanceImage: governance,
  governanceImageAlt:
    "Hand holding an AI security shield surrounded by compliance and access icons",
  ctaText: "Book a Free Consultation",
  stats: [
    { value: "500+", label: "AI and machine learning projects" },
    { value: "50+", label: "Engineers and data scientists" },
    { value: "20+", label: "Global markets served" },
    { value: "4+", label: "Years building production AI" },
  ],
  reasons: [
    {
      title: "Clear Project Communication",
      body: "Follow progress through regular updates, clear milestones, and an identified point of contact.",
    },
    {
      title: "Agreed Success Measures",
      body: "Track outcomes against measures defined before development, such as turnaround time, output quality, or operating cost.",
    },
    {
      title: "Flexible Ways to Work Together",
      body: "Choose a fixed scope, a dedicated team, or time-based delivery to suit your project.",
    },
    {
      title: "One Partner Across Delivery",
      body: "Coordinate strategy, development, integration, and deployment through a single delivery team.",
    },
    {
      title: "60 Days of Post-deployment Support",
      body: "Address early usage issues and performance adjustments within the agreed support scope.",
    },
    {
      title: "Practical Training and Handover",
      body: "Give your team the documentation and training needed to use and manage the solution.",
    },
  ],
};

export const industriesBand = {
  eyebrow: "Which industries do we serve?",
  titleAccent: "Generative AI Tailored",
  titleLead: "to Your Industry",
  body: "Every industry has different workflows, data requirements, and expectations for accuracy. We design generative AI around these needs, with appropriate review, access controls, and evaluation for your use case.",
  image: enterpriseIndustries,
  imageAlt:
    "Holographic AI presenter walking a boardroom through live dashboards on a secure data wall",
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
    a: "Yes. Every engagement includes 60 days of post-deployment support within the agreed scope, and optional ongoing LLMOps: monitoring quality drift, cost per request, and model upgrades as new versions ship.",
  },
];
