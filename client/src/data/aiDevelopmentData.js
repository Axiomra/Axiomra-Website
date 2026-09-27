/** Every string rendered by the AI Development detail page lives here. */
import heroAiTeam from "../assets/ai-dev/hero-ai-team.jpg";
import enterpriseAiStrategy from "../assets/ai-dev/enterprise-ai-strategy.jpg";
import aiSoftwareDevelopment from "../assets/ai-dev/ai-software-development.jpg";
import aiConsulting from "../assets/ai-dev/ai-consulting.jpg";
import enterpriseAiDevelopment from "../assets/ai-dev/enterprise-ai-development.jpg";
import aiPocMvp from "../assets/ai-dev/ai-poc-mvp.jpg";
import aiAsAService from "../assets/ai-dev/ai-as-a-service.jpg";
import aiIntegration from "../assets/ai-dev/ai-integration.jpg";
import aiProductDevelopment from "../assets/ai-dev/ai-product-development.jpg";
import aiops from "../assets/ai-dev/aiops.jpg";
import { INDUSTRY_IMAGES } from "../lib/media";

export const hero = {
  eyebrow: "AI Development Company",
  titleLead: "Custom AI Development",
  titleAccent: "Services for Your Business",
  body:
    "Axiomra designs, builds, and integrates AI systems around your goals, workflows, and data. We help you automate routine operations, uncover useful insights, and develop AI capabilities your team can use and manage. From discovery to deployment, we focus on practical adoption and measurable outcomes.",
  ctaText: "Request A Free Consultation",
  proof: { rating: "5.0", reviews: "11 reviews", source: "Reviewed on Clutch" },
  image: heroAiTeam,
  imageAlt:
    "Team reviewing generative AI, automation and analytics dashboards above a connected city skyline",
};

/** Wordmarks for the client strip under the hero, text only, no logo assets needed. */
export const clientLogos = [
  "Picture Perfect",
  "BULL",
  "Deep Duck",
  "Fashionnet",
  "Fluent Talk AI",
  "FormOlé",
  "Front Office",
  "GPT Tune",
];

export const intro = {
  titleAccent: "Stay Ahead In Tech With",
  titleLead: "Our AI Development Company",
  paragraphs: [
    "Axiomra is an AI development company that helps enterprises and startups build custom AI software, AI agents, LLM applications, generative AI systems, and workflow automation solutions. We design, build, and scale production-ready AI products that improve efficiency, reduce manual work, and create measurable business ROI.",
    "We work with businesses across industries including healthcare, finance, retail, education, logistics, real estate, insurance, and marketing. Our team specializes in machine learning, natural language processing, computer vision, predictive analytics, GPT integration, RAG implementation, chatbot development, and enterprise AI consulting.",
  ],
  capabilitiesTitle: "Core AI capabilities",
  capabilities: [
    "Custom AI software development",
    "AI agent development",
    "LLM fine-tuning and integration",
    "Generative AI application development",
    "AI automation",
    "Computer vision solutions",
    "Predictive analytics",
    "RAG implementation",
    "AI chatbot development",
    "Enterprise AI consulting",
  ],
  closing:
    "If you need an AI partner that can move from strategy to production, Axiomra builds systems that are scalable, reliable, and aligned with real business goals. You get a senior team that owns the full path (data engineering, modelling, integration, and MLOps) so nothing is handed off half-finished between vendors.",
  ctaText: "Request A Free Consultation",
  image: enterpriseAiStrategy,
  imageAlt:
    "Connected data network projected across a boardroom table while a leadership team meets",
};

export const whatWeDo = {
  eyebrow: "What we do",
  titleAccent: "Custom AI Development Services",
  titleLead: "For Enterprises",
  subtitle:
    "We build, integrate, and scale AI systems for businesses across industries. Whether you need a full AI product, a smarter workflow, or an AI system connected to your existing tools, our team delivers production-ready results.",
};

/** The eight sub-services, rendered as alternating image/copy rows. */
export const subServices = [
  {
    id: "ai-software-development",
    title: "AI Software Development",
    description:
      "We build custom AI software that solves real business problems. From predictive analytics tools and recommendation engines to intelligent automation systems, our AI software development services are built to integrate with your existing systems and scale as your business grows. We work with GPT-4, Llama, Gemini, Claude, LangChain, HuggingFace, AWS Bedrock, and Azure AI. Each build ships with its own evaluation suite, so you can see exactly how the system performs on your data before it ever touches a customer, and a monitored pipeline that catches accuracy drift long before your users do.",
    image: aiSoftwareDevelopment,
    imageAlt:
      "Developer typing while an AI circuit hub connects cloud, analytics and data service icons",
  },
  {
    id: "ai-consulting",
    title: "AI Consulting",
    description:
      "Not sure where to start with AI? We assess your current operations, identify the highest-value AI opportunities, and build a clear roadmap for implementation. Our AI consulting services cover data strategy, architecture planning, model selection, and AI readiness assessment so your investment goes in the right direction from day one. You leave with a prioritised backlog, a cost and ROI model for each use case, and an honest view of which ideas are not worth building yet. The recommendation is the deliverable, whether or not we build it for you.",
    image: aiConsulting,
    imageAlt:
      "Two consultants reviewing a laptop in front of a large glowing neural network display",
    ctaText: "Learn more",
  },
  {
    id: "enterprise-ai-development",
    title: "Enterprise AI Development",
    description:
      "We design and build AI systems made for enterprise scale. From large-scale data pipelines to multi-model AI architectures, we help enterprises automate complex operations, improve decision-making, and reduce costs across departments. Our enterprise AI development services are built for security, compliance, and long-term performance. Role-based access, audit trails, data residency, and PII handling are designed in from the first sprint rather than bolted on before a security review, and every model decision stays traceable back to the data that produced it.",
    image: enterpriseAiDevelopment,
    imageAlt:
      "Wide operations floor where teams monitor enterprise AI dashboards across a connected data estate",
  },
  {
    id: "ai-poc-and-mvp",
    title: "AI PoC And MVP Development",
    description:
      "Want to test an AI idea before committing to full development? We build fast, focused AI proof-of-concept and MVP solutions that validate your idea with real data and real users. This helps you reduce risk, get internal buy-in, and move to full production with confidence. A typical PoC runs three to five weeks against a success metric we agree before we start, and closes with a working demo, a measured result, and a straight answer on whether the full build is worth funding. Nothing is throwaway. The pipeline and evaluation harness carry straight into production.",
    image: aiPocMvp,
    imageAlt:
      "Streams of coloured binary data converging under a pointing finger, as an idea is tested against real data",
  },
  {
    id: "ai-as-a-service",
    title: "AI As A Service",
    description:
      "Get access to production-ready AI capabilities without building an in-house team. Our AI as a Service model gives your business on-demand access to AI models, infrastructure, and expertise. Scale up or down based on your needs with predictable costs and zero overhead. You get managed hosting, versioned model endpoints, usage and spend dashboards, and an engineering team on call for the failures that matter. All on a monthly agreement instead of a hiring cycle. When you are ready to bring it in-house, we hand over the code, the pipelines, and the documentation.",
    image: aiAsAService,
    imageAlt:
      "Analysts monitoring a managed AI control room as robotic assembly lines and live model dashboards run on the wall displays",
    ctaText: "Learn more",
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description:
      "We connect AI systems directly into your existing business tools including ERP, CRM, HRM, and third-party platforms. Our AI integration services cover OpenAI, private LLMs, Azure AI, AWS Bedrock, and custom model integration so your teams get the benefits of AI without changing how they work. Where a legacy system has no API, we integrate at the database or file-exchange layer instead. Every integration ships with rate limiting, retry and fallback logic, and a cost ceiling, so one runaway prompt loop can never take down a workflow your business depends on.",
    image: aiIntegration,
    imageAlt:
      "Executive touching an AI automation node wired into a branching digital workflow diagram",
    ctaText: "Learn more",
  },
  {
    id: "ai-product-development",
    title: "AI Product Development",
    description:
      "We help businesses build AI-powered products from the ground up. From initial concept and consulting to design, development, and launch, we build smart products packed with AI features that are easy to use and built to scale. Anomaly detection, intelligent recommendations, and adaptive AI features are built in from the start. We also design the parts most AI products get wrong: how the interface behaves while a model is thinking, what the user sees when confidence is low, and how feedback from real usage flows back into the next training round.",
    image: aiProductDevelopment,
    imageAlt:
      "Product planning desk with a laptop and hand-drawn roadmap, strategy charts and forecast sketches",
  },
  {
    id: "aiops",
    title: "AIOps",
    description:
      "Enhance application performance, reduce IT expenses, and optimize operations with our tailored AIOps solutions. Using AI-driven monitoring, predictive analytics, and automated incident resolution, our AI development services for businesses keep the user experience solid and tighter IT workflows. We correlate logs, metrics, and traces into a single signal so your on-call engineer sees one root cause instead of two hundred alerts, then automate the runbook steps that never needed a human in the first place, cutting mean time to resolution and the alert fatigue that comes with it.",
    image: aiops,
    imageAlt: "Hands holding a glowing AI operations dashboard of live charts and system metrics",
  },
];

export const capabilities = {
  eyebrow: "Our AI capabilities",
  titleAccent: "AI Solutions Built",
  titleLead: "For Real Business Problems",
  subtitle:
    "From generative AI and computer vision to intelligent agents and NLP systems, we develop AI solutions that are production-ready, industry-tested, and built around your specific business goals.",
  items: [
    {
      name: "Generative AI",
      body: "We build generative AI systems using GPT-4, GPT-3.5, Llama, Gemini, Claude, Midjourney, and DALL·E. Our generative AI development services cover content generation, image synthesis, business intelligence, brand recognition, and large language model integration. We also offer LLM fine-tuning to train models on your specific business data for more accurate, relevant outputs.",
    },
    {
      name: "Computer Vision",
      body: "Our computer vision team builds object detection, facial recognition, OCR, and video analytics systems using YOLO, MediaPipe, OpenCV, and custom deep learning architectures. We ship models that hold their accuracy on your real footage, not just on a benchmark dataset. That means training on your lighting, your camera angles, and your edge cases, then optimising the model to run where you need it, whether that is a GPU cluster or an edge device on the factory floor with no reliable network.",
    },
    {
      name: "Machine Learning",
      body: "We design supervised, unsupervised, and reinforcement learning systems for forecasting, scoring, segmentation, and anomaly detection. Every model ships with a monitored pipeline, retraining schedule, and a clear evaluation baseline so performance never silently drifts. We start with the simplest model that can meet your metric and only add complexity when the numbers justify it, a well-tuned gradient boosting model that your team can explain to a regulator often beats a deep network nobody can defend.",
    },
    {
      name: "Natural Language Processing",
      body: "We build NLP systems for document understanding, semantic search, summarization, sentiment analysis, and entity extraction. RAG pipelines are grounded in your own knowledge base, so answers stay traceable to a source your team can audit. Chunking, embedding choice, and reranking are tuned against your actual documents rather than a default template, and every response carries its citations: if the system cannot find support for an answer, it says so instead of inventing one.",
    },
    {
      name: "AI Chatbot Development",
      body: "We develop AI chatbots and voice assistants that handle support, onboarding, sales qualification, and internal knowledge lookup. Each bot is connected to your live systems, guarded against hallucination, and handed to a human the moment confidence drops. Conversations are logged, scored, and reviewable, so you can see which questions the assistant resolves on its own, which ones it escalates, and exactly how much support volume it removed from your team each month.",
    },
    {
      name: "Recommendation Systems",
      body: "We build recommendation engines that lift conversion and retention using collaborative filtering, content-based ranking, and hybrid deep learning models, tuned against your catalogue, your traffic, and your margins rather than a generic template. Cold-start users, sparse categories, and stock constraints are handled explicitly, and every ranking change is proven through A/B testing against revenue per session, not offline accuracy scores that never reach the balance sheet.",
    },
  ],
};

export const industries = {
  eyebrow: "Industries we serve",
  titleAccent: "AI Development",
  titleLead: "Tailored to Your Industry",
  subtitle:
    "We design AI solutions around your industry's workflows, data, and business priorities. Each engagement considers the operational requirements and constraints that shape successful adoption.",
  ctaText: "Explore Industries",
  items: [
    {
      name: "Healthcare",
      image: INDUSTRY_IMAGES["Healthcare"],
      title: "AI For Healthcare",
      body: "AI is reducing diagnostic errors by up to 30% and cutting administrative workload across hospitals and clinics. We build AI systems that help healthcare providers work faster, reduce costs, and improve patient outcomes. Every deployment is designed around HIPAA and patient-data handling from the start, and clinical models keep a clinician in the decision loop rather than replacing their judgement.",
      bullets: [
        "Patient risk prediction and early diagnosis",
        "Medical image analysis and radiology automation",
        "Clinical documentation and NLP-based report generation",
        "AI-powered virtual health assistants",
      ],
    },
    {
      name: "Education",
      image: INDUSTRY_IMAGES["Education"],
      title: "AI For Education",
      body: "Adaptive learning turns a fixed syllabus into a path that fits each student. We build AI that personalizes content, automates grading, and gives educators an early warning before a learner falls behind. Teachers keep the final say on every intervention, and the systems we ship report on why a student was flagged, not just that they were.",
      bullets: [
        "Adaptive learning paths and content recommendation",
        "Automated grading and feedback generation",
        "Dropout-risk prediction and intervention alerts",
        "AI tutors trained on your own curriculum",
      ],
    },
    {
      name: "Fashion",
      image: INDUSTRY_IMAGES["Fashion"],
      title: "AI For Fashion",
      body: "From design to catalogue, AI compresses the cycle. We build generative design pipelines, visual search, and demand forecasting that keep collections aligned with what customers actually buy. Faster sampling and sharper size prediction cut two of the most expensive lines in fashion retail: unsold stock and returns.",
      bullets: [
        "Generative design and virtual try-on",
        "Visual search and automated catalogue tagging",
        "Trend forecasting and demand planning",
        "Size and fit recommendation engines",
      ],
    },
    {
      name: "Retail and E-Commerce",
      image: INDUSTRY_IMAGES["Retail"],
      title: "AI For Retail And E-Commerce",
      body: "Personalization and inventory accuracy decide margin. We build recommendation engines, dynamic pricing, and demand forecasts that raise basket size while cutting dead stock. Pricing models respect the floors your commercial team sets, and every ranking change is proven through live A/B testing against revenue rather than an offline score.",
      bullets: [
        "Personalized product recommendations",
        "Dynamic pricing and promotion optimization",
        "Demand forecasting and inventory planning",
        "AI support agents for pre- and post-purchase queries",
      ],
    },
    {
      name: "Finance and Fintech",
      image: INDUSTRY_IMAGES["Finance"],
      title: "AI For Finance And Fintech",
      body: "Risk, fraud, and compliance all run on pattern recognition. We build auditable models that flag anomalies in real time and stand up to regulatory review. Explainability is a requirement, not an extra: every score comes with the factors that drove it, so your risk team can defend a decision to a customer or a regulator.",
      bullets: [
        "Real-time fraud and anomaly detection",
        "Credit scoring and risk modelling",
        "KYC/AML document automation",
        "Financial forecasting and portfolio analytics",
      ],
    },
    {
      name: "Real Estate",
      image: INDUSTRY_IMAGES["Real Estate"],
      title: "AI For Real Estate",
      body: "Valuation and lead quality move the numbers. We build pricing models, document automation, and AI search that shorten the path from listing to closed deal. Agents stop losing hours to paperwork and unqualified enquiries, and valuation models are retrained as local market conditions move rather than left to age.",
      bullets: [
        "Automated property valuation models",
        "Lead scoring and buyer intent prediction",
        "Contract and document data extraction",
        "Conversational property search assistants",
      ],
    },
    {
      name: "Transportation and Logistics",
      image: INDUSTRY_IMAGES["Transportation"],
      title: "AI For Transportation And Logistics",
      body: "Route efficiency and downtime are where margin leaks. We build routing, forecasting, and predictive maintenance systems that keep fleets and freight moving. Models account for the constraints dispatchers actually work under (driver hours, load types, depot capacity) so the recommended plan is one your operations team can run, not a theoretical optimum.",
      bullets: [
        "Route optimization and ETA prediction",
        "Predictive fleet maintenance",
        "Warehouse demand and capacity forecasting",
        "Automated shipment document processing",
      ],
    },
    {
      name: "Insurance",
      image: INDUSTRY_IMAGES["Insurance"],
      title: "AI For Insurance",
      body: "Claims handling is a document problem before it is a decision problem. We automate intake, detect fraud patterns, and speed up settlement without loosening controls. Straightforward claims clear automatically while anything unusual is routed to an assessor with the evidence already extracted and summarised, so faster settlement never means weaker scrutiny.",
      bullets: [
        "Automated claims intake and triage",
        "Fraudulent claim detection",
        "Risk assessment and underwriting support",
        "Policy document understanding and Q&A",
      ],
    },
    {
      name: "Marketing",
      image: INDUSTRY_IMAGES["Marketing"],
      title: "AI For Marketing",
      body: "Creative volume and attribution both scale badly by hand. We build generative content pipelines and predictive models that raise output while keeping spend accountable. Brand voice and approval steps are built into the pipeline, so more output does not turn into more off-brand output that someone has to clean up later.",
      bullets: [
        "Generative content and creative variation at scale",
        "Audience segmentation and churn prediction",
        "Campaign performance forecasting",
        "AI-assisted SEO and content research",
      ],
    },
    {
      name: "Legal Business",
      image: INDUSTRY_IMAGES["Legal Business"],
      title: "AI For Legal Businesses",
      body: "Review time is the billable bottleneck. We build retrieval and extraction systems that surface the clause, the precedent, and the risk, with the source always attached. Nothing is returned without a citation your team can open and verify, because in legal work an unsourced answer is worse than no answer at all.",
      bullets: [
        "Contract review and clause extraction",
        "Legal research with cited retrieval",
        "Case outcome and risk prediction",
        "Automated compliance monitoring",
      ],
    },
  ],
};

export const process = {
  eyebrow: "How we work",
  titleLead: "Our",
  titleAccent: "AI Development",
  titleTail: "Process",
  body:
    "A structured approach takes your project from discovery to deployment, with clear decision points, testing, and team handover.",
  ctaText: "Discuss Your Requirements",
  steps: [
    {
      title: "Discovery and Use Case Definition",
      body: "We map your workflow, understand the business problem, and establish success measures. We assess whether AI is suitable and agree on a practical scope before development begins.",
    },
    {
      title: "Data Assessment and Preparation",
      body: "We assess data availability, quality, labelling, and access, then prepare the pipelines needed for development. Where gaps exist, we agree on a collection or preparation plan. Data handling, access permissions, and governance requirements are defined at this stage.",
    },
    {
      title: "Model Selection and Evaluation",
      body: "We select an approach suited to your use case, data, and performance requirements. Where appropriate, we train or fine-tune models and evaluate them using task-specific benchmarks. Testing covers output quality, errors, and the conditions in which human review is needed.",
    },
    {
      title: "System Architecture and Integration",
      body: "We connect the AI capability to your ERP, CRM, and internal tools through a suitable application architecture. We plan authentication, expected usage, running costs, and fallback behaviour so the system fits your operational environment.",
    },
    {
      title: "Deployment and MLOps",
      body: "We deploy to the agreed environment using controlled release processes, version management, and rollback procedures. We document model and configuration changes to support maintenance, troubleshooting, and traceability.",
    },
    {
      title: "Monitoring and Continuous Improvement",
      body: "We monitor agreed measures such as response time, cost, output quality, and data drift. Usage insights and team feedback guide improvements, with model updates or retraining introduced when evaluation shows they are needed.",
    },
    {
      title: "Handover and Team Enablement",
      body: "We provide system documentation, operational guidance, and practical training for the people who will manage the solution. Post-launch support follows the agreed scope, helping your team resolve issues and operate the system with confidence.",
    },
  ],
};

export const techStack = {
  eyebrow: "Our technology stack",
  titleAccent: "The Technology Behind",
  titleLead: "Your AI Solution",
  subtitle:
    "We select models, frameworks, cloud services, and data tools to fit your use case, existing infrastructure, security requirements, and budget. Explore the technologies that support our development approach.",
  ctaText: "View all tech stack",
  groups: [
    {
      name: "LLMs and Foundation Models",
      blurb:
        "The large language models and foundation models we use to build generative AI, chatbot, NLP, and custom AI software development solutions.",
      tools: ["GPT-4o", "Claude", "GPT-3.5", "Phi-3", "Groq", "DALL·E", "PaLM", "Gemini", "Whisper", "Llama 3", "Midjourney", "MistralAI", "Stable Diffusion", "OpenAI Embeddings"],
    },
    {
      name: "AI and ML Frameworks",
      blurb: "The training and serving frameworks behind every model we ship to production.",
      tools: ["PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "HuggingFace", "scikit-learn", "Keras", "OpenCV", "YOLO", "MediaPipe"],
    },
    {
      name: "Cloud and Infrastructure",
      blurb: "Where your AI runs, scales, and stays observable.",
      tools: ["AWS", "AWS Bedrock", "Azure AI", "GCP", "Vertex AI", "Docker", "Kubernetes", "Nginx", "Terraform"],
    },
    {
      name: "Databases",
      blurb: "Operational stores and vector indexes for retrieval-heavy AI systems.",
      tools: ["PostgreSQL", "MongoDB", "Redis", "Pinecone", "ChromaDB", "Weaviate", "Qdrant", "Elasticsearch"],
    },
    {
      name: "Data Engineering",
      blurb: "The pipelines that turn raw business data into training-ready features.",
      tools: ["Apache Airflow", "Spark", "Kafka", "dbt", "Pandas", "Polars", "Celery"],
    },
    {
      name: "NLP Techniques",
      blurb: "The methods we combine for document understanding, search, and conversation.",
      tools: ["RAG", "Fine-tuning", "Named Entity Recognition", "Semantic Search", "Summarization", "Sentiment Analysis", "Topic Modelling", "Speech-to-Text"],
    },
    {
      name: "Computer Vision",
      blurb: "Detection, recognition, and inspection stacks tested on real footage.",
      tools: ["Object Detection", "Facial Recognition", "OCR", "Pose Estimation", "Image Segmentation", "Video Analytics", "Defect Detection"],
    },
  ],
};

export const benefits = {
  eyebrow: "Why work with Axiomra",
  title: "Practical Support From Strategy to Adoption",
  items: [
    {
      titleAccent: "Hands-on",
      titleRest: "Team Training",
      body: "Help your team understand model capabilities, evaluate outputs, and use the solution effectively in everyday work.",
    },
    {
      titleAccent: "Free AI",
      titleRest: "Strategy Session",
      body: "Explore your goals and prioritise potential use cases with a practical discussion of feasibility, effort, and value.",
    },
    {
      titleAccent: "60 Days of",
      titleRest: "Post-launch Support",
      body: "Receive help with early usage issues, performance tuning, and operational questions within the agreed support scope.",
    },
  ],
  stats: [
    { value: "300+", label: "Projects delivered" },
    { value: "25+", label: "In-house experts" },
    { value: "20+", label: "Countries served" },
    { value: "12+", label: "Industries covered" },
  ],
};

export const faqs = [
  {
    q: "What do your AI development services include?",
    a: "End-to-end delivery: AI consulting and roadmapping, data preparation, model design and training, integration into your existing systems, deployment with MLOps, and post-launch monitoring and support. You can engage us for the whole path or a single stage.",
  },
  {
    q: "How much does AI development cost?",
    a: "Cost tracks scope, data readiness, and integration depth. A focused PoC typically lands in the low five figures, while a production enterprise system with pipelines and integrations costs considerably more. Book a free session and we'll give you an itemized estimate rather than a range.",
  },
  {
    q: "How long does it take to build an AI solution?",
    a: "A validated PoC usually takes 3-5 weeks. Most production AI systems move from discovery to a working pilot in 6-10 weeks, with full rollout depending on how many systems the AI has to connect to.",
  },
  {
    q: "What data do I need to get started with AI?",
    a: "Less than most teams assume. We start by auditing what you already hold: transaction logs, documents, images, support tickets. Where data is thin, we plan labelling, augmentation, or synthetic generation, or begin with a pretrained model that needs far less of your own data.",
  },
  {
    q: "Can AI integrate with my existing systems and legacy software?",
    a: "In almost every case, yes. We build secure APIs and connectors for ERP, CRM, HRM, data warehouses, and internal tools. Where a legacy system has no API, we integrate at the database or file-exchange layer instead.",
  },
  {
    q: "How do you ensure AI model accuracy and reliability?",
    a: "Every model is benchmarked on held-out data using precision, recall, F1, and task-specific metrics before release. In production we monitor drift, latency, and cost, and retrain on a defined schedule so accuracy doesn't silently decay.",
  },
  {
    q: "What is the difference between AI consulting and AI development?",
    a: "Consulting answers what to build and whether it's worth building: opportunity assessment, data strategy, architecture, and ROI modelling. Development builds and ships it. Most clients start with consulting so the build begins with a validated target.",
  },
  {
    q: "How do I choose the right AI development company?",
    a: "Ask for production references, not demos. Check whether the team owns the full stack (data engineering, modelling, and deployment) and whether they can explain how a model will be monitored after launch. A partner who talks about drift and rollback has shipped before.",
  },
  {
    q: "Do you offer AI staff augmentation or dedicated AI teams?",
    a: "Yes. You can add individual ML engineers, data engineers, or MLOps specialists to your team, or engage a dedicated pod that reports into your existing process.",
  },
  {
    q: "What industries do you specialize in?",
    a: "Healthcare, finance and fintech, retail and e-commerce, education, fashion, real estate, transportation and logistics, insurance, marketing, and legal, 12+ verticals with delivered projects in each.",
  },
];
