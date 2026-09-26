/** Every string and image the Natural Language Processing detail page renders lives here. */
import languageMind from "../assets/nlp/nlp-language-mind.webp";
import caseStudyTeam from "../assets/nlp/nlp-case-study-team.jpg";
import industriesWorldMap from "../assets/nlp/nlp-industries-world-map.jpg";
import stackBuildingBlocks from "../assets/nlp/nlp-stack-building-blocks.jpg";
import solutionsMobile from "../assets/nlp/nlp-solutions-mobile.jpg";
import processWorkstation from "../assets/nlp/nlp-process-workstation.jpg";
import outcomesCircuit from "../assets/nlp/nlp-outcomes-circuit.jpg";
import serviceConsulting from "../assets/nlp/nlp-consulting.jpg";
import serviceCustomDev from "../assets/nlp/nlp-custom-development.jpg";
import serviceSpeechToText from "../assets/nlp/nlp-speech-to-text.jpg";
import serviceDataAcquisition from "../assets/nlp/nlp-data-acquisition.jpg";
import serviceSemanticAnalytics from "../assets/nlp/nlp-semantic-analytics.jpg";
import serviceIntegration from "../assets/nlp/nlp-integration.jpg";
import { caseStudyPath } from "./caseStudiesData";

/** The hero wallpaper. */
export const heroVideo = {
  src: "/media/nlp-hero.mp4",
  poster: "/media/nlp-hero-poster.webp",
};

/** Route this page owns, imported by App.jsx and the navbar so they can't drift. */
export const NLP_SLUG = "natural-language-processing-services";

/* Hero */

export const hero = {
  eyebrow: "Make Business Language Easier to Understand and Use",
  titleLead: "Natural Language Processing",
  titleAccent: "Solutions",
  titleTail: "That Turn Language Into Insight",
  body:
    "Axiomra develops NLP solutions that analyse documents, support tickets, and transcribed conversations. Extract key information, identify intent and sentiment, and route requests more efficiently so your team can act on relevant insights.",
  ctaText: "Book a Free NLP Consultation",
  secondaryCtaText: "Explore NLP Solutions",
  proof: { rating: "4.9", reviews: "300+ companies", source: "Reviewed on Clutch" },
  stats: [
    { value: "120+", label: "NLP models in production" },
    { value: "40+", label: "Languages supported" },
    { value: "94%", label: "Median intent accuracy" },
  ],
  /** The raw text the hero's WebGL stream feeds into the model. */
  inputTokens: [
    "the",
    "invoice",
    "was",
    "late",
    "again",
    "so",
    "we",
    "escalated",
    "the",
    "ticket",
  ],
  /** What comes out the other side. */
  outputTokens: [
    { label: "Sentiment", value: "NEGATIVE", confidence: "0.962" },
    { label: "Intent", value: "ESCALATION", confidence: "0.948" },
    { label: "Entity", value: "INVOICE", confidence: "0.981" },
    { label: "Routing", value: "BILLING · P1", confidence: "0.935" },
  ],
};

/* Framework / tooling bar */

export const frameworkBar = {
  label: "Tools and frameworks we work with",
  items: [
    "Hugging Face",
    "LangChain",
    "LlamaIndex",
    "OpenAI",
    "Anthropic",
    "Mistral AI",
    "spaCy",
    "AWS Bedrock",
    "Cohere",
    "NLTK",
  ],
};

/* Potential / challenges */

export const potential = {
  eyebrow: "Why text data goes unread",
  titleAccent: "Getting Real Value From",
  titleLead: "Natural Language Processing",
  intro:
    "Your organisation does not need more data. It needs clarity, speed, and smarter decisions from the text it already generates: emails, contracts, tickets, reviews, call transcripts, and internal documents nobody has time to open.",
  listTitle: "What changes once language becomes machine-readable:",
  benefits: [
    {
      title: "Unstructured data made useful",
      body: "Text, voice, and documents become business intelligence you can query, chart, and act on.",
    },
    {
      title: "Smarter customer interactions",
      body: "Support automated with conversational AI that understands intent, not just keywords.",
    },
    {
      title: "Global scalability",
      body: "Language barriers removed with accurate translation and locale-aware localisation.",
    },
    {
      title: "Faster decisions",
      body: "Patterns and trends extracted from thousands of documents in seconds, not weeks.",
    },
  ],
  outro:
    "Our NLP development services are tailored to your industry, integrated into the systems you already run, and measured against ROI you agreed up front. You move past traditional analytics into automation, efficiency, and innovation at scale.",
  ctaText: "Request A Free Consultation",
  image: languageMind,
  imageAlt:
    "Brain silhouette built entirely from words such as memory, thought, meaning, and belief",
  imageCaption: "Language is the data. Most of it has never been read once.",
  metrics: [
    { value: "80%", label: "Less manual reading" },
    { value: "40+", label: "Languages handled" },
    { value: "24/7", label: "Always-on analysis" },
  ],
};

/* Service layers (numbered picker) */

export const services = {
  eyebrow: "Which NLP services can we provide?",
  titleAccent: "The NLP Services",
  titleLead: "We Actually Deliver",
  subtitle:
    "End-to-end NLP development built around your business need. From strategy to deployment, every service solves a real problem, removes manual work, and gives your team a clear advantage with language AI.",
  items: [
    {
      id: "nlp-consulting",
      motif: "roadmap",
      image: serviceConsulting,
      imageAlt:
        "Two consultants reviewing printed reports beside a laptop during a planning session",
      title: "Natural Language Processing Consulting",
      body:
        "Not sure where to start with NLP? Our consultants cut through the noise. We sit with your team, map where language work actually costs you time and money, and audit the text you already hold: tickets, contracts, emails, call transcripts, product reviews. Each candidate use case is scored on business value, data readiness, and effort, so the weak ones are killed early instead of six months in. You get a build vs. buy recommendation for every one that survives, a realistic accuracy expectation based on your own samples rather than a vendor benchmark, and a costed roadmap with phases, team shape, and integration points. Built for CTOs, COOs, and product teams who want a practical plan and an honest answer, including a straight no when NLP is the wrong tool, before committing budget to development.",
      deliverables: [
        "Use-case scoring",
        "Text data readiness audit",
        "Build vs. buy call",
        "Costed roadmap",
      ],
    },
    {
      id: "custom-nlp-development",
      motif: "transformer",
      image: serviceCustomDev,
      imageAlt:
        "Developer writing model training code in an editor on a laptop",
      title: "Custom NLP Solutions Development",
      body:
        "Off-the-shelf language tools are built for everyone, which means they are built for no one in particular. We design and develop custom NLP solutions from the ground up, trained on your data, tuned to your industry, and fitted to your existing stack. We work with GPT-class models, BERT, Hugging Face, PyTorch, and TensorFlow to build document classifiers, language models, and full NLP pipelines.",
      deliverables: [
        "Fine-tuned domain models",
        "Document classifiers",
        "Retrieval-augmented pipelines",
        "Evaluation harnesses",
      ],
    },
    {
      id: "speech-to-text",
      motif: "waveform",
      image: serviceSpeechToText,
      imageAlt:
        "Audio waveform open in an editor on a laptop with studio headphones beside it",
      title: "Speech-To-Text Integration",
      body:
        "We use Google Speech-to-Text, Whisper, and Deepgram to convert spoken language into structured, searchable text. From real-time transcription and voice-driven search to multilingual speech processing and automated call analysis, we wire voice capabilities directly into your existing systems and remove manual transcription effort at scale.",
      deliverables: [
        "Real-time transcription",
        "Speaker diarisation",
        "Multilingual audio",
        "Call analytics hooks",
      ],
    },
    {
      id: "data-acquisition",
      motif: "corpus",
      image: serviceDataAcquisition,
      imageAlt:
        "Analyst inspecting a printed data report through a magnifying glass",
      title: "Data Acquisition Solutions",
      body:
        "Bad data leads to bad AI. Before any NLP model can work, it needs clean, relevant, well-structured language data. We collect, label, and prepare the right datasets from your internal systems, third-party sources, or public repositories using Python, spaCy, Hugging Face, and custom data pipelines, with QA sampling on every batch.",
      deliverables: [
        "Corpus collection",
        "Annotation to a written spec",
        "PII redaction",
        "Dataset versioning",
      ],
    },
    {
      id: "semantic-analytics",
      motif: "attention",
      image: serviceSemanticAnalytics,
      imageAlt:
        "Analytics dashboard showing a clustered bubble chart and a price chart",
      title: "Semantic Analytics Systems",
      body:
        "Your business generates text every day: emails, reports, tickets, reviews, contracts. Semantic analytics goes beyond keyword matching to understand the actual meaning behind that text. Using BERT, transformer models, TensorFlow, and PyTorch, we build systems that read context, detect intent, and surface insights your team can act on immediately.",
      deliverables: [
        "Embedding + vector search",
        "Intent and topic detection",
        "Context-aware scoring",
        "Insight dashboards",
      ],
    },
    {
      id: "nlp-integration",
      motif: "pipeline",
      image: serviceIntegration,
      imageAlt:
        "Rendered rows of server panels linked by data pathways",
      title: "NLP Integration And Maintenance",
      body:
        "Building an NLP model is only half the job. We integrate your solution into your existing platforms, CRMs, ERPs, or internal tools using REST APIs, Docker, Kubernetes, AWS, Azure, and GCP. Our team handles system integration, performance monitoring, and ongoing model updates so your solution stays accurate as your language data evolves.",
      deliverables: [
        "REST + streaming APIs",
        "CRM / ERP integration",
        "Drift monitoring",
        "Scheduled retraining",
      ],
    },
  ],
};

/* Applied solutions (numbered grid) */

export const solutions = {
  eyebrow: "Real-world applications of NLP",
  titleAccent: "Put NLP To Work Across",
  titleLead: "Your Day-To-Day Operations",
  subtitle:
    "NLP is not a single tool. It is a set of capabilities applied across your business to automate tasks, improve decisions, and create better experiences for your customers and your teams. Here is what we build and deploy.",
  image: solutionsMobile,
  imageAlt:
    "A hand holding a phone with an NLP interface projected above it, surrounded by icons for chat, search, analytics, and translation",
  imageCaption: "Nine capabilities. One pipeline underneath all of them.",
  items: [
    {
      icon: "assistant",
      title: "Smart Assistants",
      body: "Give your customers and employees an AI assistant that actually understands what they are asking. We build assistants powered by conversational AI that handle queries, guide users, and complete tasks without human intervention: customer support, internal helpdesks, and HR automation, far beyond what a basic chatbot can do.",
    },
    {
      icon: "sentiment",
      title: "Sentiment Analysis",
      body: "Know exactly how your customers feel about your brand, products, or services. Our sentiment solutions process reviews, social posts, support tickets, and survey responses in real time, used for brand monitoring, product feedback analysis, and customer experience management, so teams act before small issues become big ones.",
    },
    {
      icon: "document",
      title: "Automated Document Processing",
      body: "Stop paying people to read and sort documents by hand. Our document processing solutions combine NLP and OCR to extract, classify, and route information from contracts, invoices, forms, and reports. Widely used in legal, finance, insurance, and healthcare where volume is high and accuracy is non-negotiable.",
    },
    {
      icon: "categorize",
      title: "Text Analytics And Categorisation",
      body: "Large volumes of unstructured text become manageable once the right system is in place. We build text classification and analytics tools that sort, tag, and organise content automatically, used for ticket routing, compliance monitoring, and content management so teams always know what they are looking at.",
    },
    {
      icon: "search",
      title: "Intelligent Search",
      body: "Standard keyword search misses too much. Our intelligent search solutions use semantic analysis to understand what users are really looking for, even when they do not use the exact right words. Companies use this for internal knowledge bases, e-commerce search, and document retrieval to raise satisfaction and cut support load.",
    },
    {
      icon: "recommend",
      title: "Personalised Recommendations",
      body: "Customers expect experiences built for them. Our NLP-powered recommendation systems analyse behaviour, preferences, and language patterns to deliver content, products, or services that match what each user actually wants. Built for e-commerce platforms, media companies, and SaaS products chasing engagement and revenue.",
    },
    {
      icon: "generate",
      title: "Content Generation",
      body: "Speed up content production without sacrificing quality. We build NLP-powered generation tools that draft reports, product descriptions, summaries, and responses grounded in your data and brand guidelines. Marketing, e-commerce, and operations teams use this to handle high-volume content without growing headcount.",
    },
    {
      icon: "entity",
      title: "Named Entity Recognition (NER)",
      body: "Pull out the information that matters from large volumes of text. Our NER solutions automatically identify and extract names, organisations, locations, dates, and other key entities from unstructured data, used in legal for document review, finance for data extraction, and sales for CRM enrichment.",
    },
    {
      icon: "speech",
      title: "Speech Recognition",
      body: "Turn spoken language into structured, searchable text. Our speech recognition solutions transcribe calls, meetings, and audio files with high accuracy. Call centres use it for compliance recording, healthcare teams for clinical documentation, and product teams for voice-command interfaces and accessibility features.",
    },
  ],
};

/* Case studies */

export const caseStudies = {
  eyebrow: "What innovations have we delivered?",
  titleLead: "Showcasing Our",
  titleAccent: "NLP Development Projects",
  subtitle:
    "The best way to understand what NLP can do for your business is to see what we have already built. Here are real projects where we applied language AI to a specific business problem and delivered a measurable outcome.",
  image: caseStudyTeam,
  imageAlt: "Team reviewing analytics dashboards together over a laptop at a desk",
  bannerCaption: "Every number below came out of a system that is still running.",
  items: [
    {
      name: "StudyLab AI",
      tagline: "Personalised Learning Platform",
      problem:
        "Large class sizes and heavy teacher workloads made personalised student support impossible. Feedback was slow, grading was inconsistent, and student engagement was dropping.",
      solution:
        "We built a conversational AI teaching assistant on GPT-class models, RAG over the school's own curriculum, and Google Speech-to-Text. The system adapts lessons by skill level, runs AI-based student assessments, and delivers real-time feedback across multiple subjects.",
      results: [
        { value: "80%", label: "Tutor time saved on repetitive tasks" },
        { value: "85%", label: "Accuracy in student response analysis" },
        { value: "3x", label: "Faster feedback delivery" },
      ],
    },
    {
      name: "Northgate Claims",
      tagline: "Automated Document Processing For Insurance",
      problem:
        "Claims handlers were reading every submitted PDF by hand (policy schedules, invoices, medical letters) so first-response time was measured in days and the backlog grew every quarter.",
      solution:
        "An OCR plus NER pipeline that classifies each document, extracts the fields the claim system needs, and flags only the low-confidence cases for a human. Every extraction links back to the exact page region it came from, so an auditor can check the model's work.",
      results: [
        { value: "72%", label: "Of claims documents auto-processed" },
        { value: "4 hrs", label: "First-response time, down from 3 days" },
        { value: "0", label: "Unaudited automatic decisions" },
      ],
    },
    {
      name: "Helio Retail",
      tagline: "Semantic Search And Review Intelligence",
      problem:
        "Keyword search on a 90,000-SKU catalogue returned nothing for the way customers actually type, and 400,000 product reviews sat unread with no way to spot a quality problem early.",
      solution:
        "Embedding-based semantic search over the catalogue, plus an aspect-level sentiment model that scores every incoming review by product attribute and alerts merchandising when a score moves.",
      results: [
        { value: "31%", label: "Lift in search conversion" },
        { value: "18%", label: "Fewer zero-result searches" },
        { value: "6 wk", label: "Earlier defect detection" },
      ],
    },
  ],
};

/* Industries */

export const industries = {
  eyebrow: "Which industries do we serve?",
  titleAccent: "Industries We Serve",
  titleLead: "With NLP Solutions",
  subtitle:
    "NLP is not limited to one type of business. We have worked with companies across multiple industries to solve real problems with language AI. Below are the sectors where our NLP development services deliver the most impact.",
  image: industriesWorldMap,
  imageAlt:
    "The letters NLP lit above a dotted world map, ringed by icons for speech, chat, and neural networks",
  imageCaption:
    "Same models, different vocabulary, and the vocabulary is where NLP projects fail.",
  items: [
    {
      name: "Healthcare",
      body: "Reduce administrative burden, improve patient care, and give clinical teams faster access to the information they need.",
      bullets: [
        "Clinical note analysis and structuring",
        "Electronic health record data processing and extraction",
        "Medical document summarisation for faster diagnosis",
        "Patient feedback and sentiment analysis",
        "Medical billing fraud detection",
        "Clinical trial document analysis",
      ],
      note: "Data handling, hosting, and retention for healthcare builds are agreed with your compliance team before deployment.",
    },
    {
      name: "Finance And Fintech",
      body: "Read the filings, contracts, and customer messages your analysts never get through.",
      bullets: [
        "KYC and onboarding document extraction",
        "Contract and covenant review",
        "Earnings call and filing summarisation",
        "Transaction narrative classification",
        "Complaint routing and regulatory reporting",
      ],
      note: "Can be deployed inside your own VPC where financial text must stay on your network.",
      // Long-form write-up of this industry use, linked under the note.
      caseStudy: {
        text: "Read the regulatory document analysis blueprint",
        to: caseStudyPath("fintech-regulatory-document-analysis-compliance-nlp"),
      },
    },
    {
      name: "Legal",
      body: "Cut discovery and review time without cutting the audit trail.",
      bullets: [
        "Contract clause extraction and comparison",
        "E-discovery triage across large document sets",
        "Case law search with semantic retrieval",
        "Obligation and deadline tracking",
        "Redaction and privilege detection",
      ],
    },
    {
      name: "Retail And E-Commerce",
      body: "Understand what customers ask for and what they say afterwards.",
      bullets: [
        "Semantic product search and query understanding",
        "Automatic catalogue tagging and enrichment",
        "Aspect-level review and sentiment analysis",
        "Conversational shopping assistants",
        "Support ticket routing and deflection",
      ],
    },
    {
      name: "Education",
      body: "Personalise learning and give teachers their evenings back.",
      bullets: [
        "AI teaching assistants and Q&A over course material",
        "Automated assessment and written feedback",
        "Curriculum content generation and summarisation",
        "Plagiarism and originality analysis",
        "Multilingual learning support",
      ],
    },
    {
      name: "Transportation And Logistics",
      body: "Turn shipping documents and driver comms into structured operational data.",
      bullets: [
        "Bill of lading and customs document extraction",
        "Exception and delay note classification",
        "Multilingual driver and carrier messaging",
        "Voice-driven warehouse commands",
        "Contract and SLA compliance monitoring",
      ],
    },
  ],
};

/* Technology stack */

export const stack = {
  eyebrow: "Which technologies do we use?",
  titleAccent: "The Tools Behind",
  titleLead: "Every NLP System We Ship",
  subtitle:
    "Proven, production-tested tools across every layer of our NLP process. Here is what we use, and more usefully, what each layer actually decides.",
  image: stackBuildingBlocks,
  imageAlt:
    "Wooden blocks spelling NLP, stacked under blocks for chat and documents with an AI chip placed on top",
  groups: [
    {
      name: "NLP Frameworks And Libraries",
      why: "Where preprocessing quality is decided. Tokenisation, lemmatisation, and entity rules are unglamorous and they set the ceiling on everything downstream.",
      items: [
        "Python",
        "spaCy",
        "NLTK",
        "Hugging Face Transformers",
        "Gensim",
        "Stanza",
        "SentencePiece",
        "Tesseract OCR",
      ],
    },
    {
      name: "Machine Learning And Deep Learning",
      why: "Where accuracy is won or lost. We stay on mainstream frameworks so your system is still supportable in three years.",
      items: [
        "PyTorch",
        "TensorFlow",
        "Keras",
        "scikit-learn",
        "BERT / RoBERTa",
        "T5",
        "Whisper",
        "PEFT / LoRA",
      ],
    },
    {
      name: "AI APIs And Model Gateways",
      why: "Where per-token cost and vendor risk live. We route through a gateway so a model swap is a config change, not a rewrite.",
      items: [
        "Claude",
        "OpenAI GPT",
        "Mistral",
        "Cohere",
        "AWS Bedrock",
        "Azure OpenAI",
        "Google Vertex AI",
        "LangChain / LlamaIndex",
      ],
    },
    {
      name: "Retrieval And Vector Search",
      why: "Where hallucination is contained. Retrieval quality, not model size, is what makes a grounded answer grounded.",
      items: ["pgvector", "Pinecone", "Weaviate", "Qdrant", "Elasticsearch", "FAISS", "Redis"],
    },
    {
      name: "Cloud And Infrastructure",
      why: "Where privacy and unit economics are settled. Text that cannot leave your network gets inferred inside it.",
      items: [
        "Docker",
        "Kubernetes",
        "AWS",
        "Azure",
        "Google Cloud",
        "vLLM",
        "MLflow",
        "Airflow",
      ],
    },
  ],
};

/* Process */

export const process = {
  eyebrow: "What steps do we take in our process?",
  titleLead: "Our Process For Providing",
  titleAccent: "NLP Services",
  subtitle:
    "Every NLP project we take on follows a clear, structured process. You always know what is happening, what comes next, and what you will get at each stage. Here is exactly how we work.",
  ctaText: "Discuss Your Requirements",
  image: processWorkstation,
  imageAlt:
    "An engineer at a laptop with an NLP panel projected above the keyboard, showing a wireframe brain and a signal waveform",
  steps: [
    {
      title: "Discovery And Use-Case Definition",
      body: "We start with your business problem, not the model. We define what a correct output means for your team, what an acceptable error rate is, and what the system must do when it is not sure.",
    },
    {
      title: "Text Data Audit",
      body: "We look at the language data you already hold: volume, quality, formats, languages, domain jargon, and how much of it carries PII. You get an honest report on whether it is enough to train on.",
    },
    {
      title: "Data Collection And Annotation",
      body: "We collect, clean, de-duplicate, and label your corpus against a written annotation spec, with QA sampling on every batch and PII redacted before anything reaches a training run.",
    },
    {
      title: "Model Selection And Baseline",
      body: "Fine-tuned open model, hosted API, or retrieval over a general model. We benchmark the candidates on your data and your metric before committing, because the cheapest option that clears the bar wins.",
    },
    {
      title: "Development And Fine-Tuning",
      body: "Prompt engineering, fine-tuning, and retrieval design, run as tracked experiments. Every result is reproducible from the repo, and every prompt is versioned like code.",
    },
    {
      title: "Evaluation And Hardening",
      body: "We test against held-out data and deliberately hostile input: slang, code-switching, typos, adversarial prompts, and out-of-domain text. Failure modes get documented, not hidden.",
    },
    {
      title: "Integration And Deployment",
      body: "We integrate the solution into your existing systems (CRM, ERP, web app, or internal tool) and deploy to your preferred cloud in containerised environments with monitoring dashboards from day one.",
    },
    {
      title: "Monitoring, Retraining, And Support",
      body: "Language drifts as your products, customers, and vocabulary change. We monitor live accuracy against sampled ground truth, alert on drift, and retrain on an agreed schedule, with a post-launch support period included in the engagement.",
    },
  ],
};

/* Outcomes */

export const outcomes = {
  eyebrow: "What can you optimise with NLP?",
  image: outcomesCircuit,
  imageAlt:
    "A robotic finger touching a glowing NLP dial rendered over a circuit board",
  titleAccent: "What Changes Once",
  titleLead: "Your NLP System Goes Live",
  subtitle:
    "NLP is not a science project. Once a model is in production, the change shows up in "
    + "numbers your team already tracks: handling time, error rates, backlog, cost per document. "
    + "These are the four shifts our clients report most consistently after go-live.",
  items: [
    {
      title: "Accuracy",
      body:
        "Our NLP development services apply advanced algorithms and machine learning models to analyse "
        + "text with high precision, reducing human error, improving decision-making, and uncovering "
        + "patterns traditional methods miss. Every model ships with a measured baseline on your own data, "
        + "not a public benchmark, and a confidence threshold that routes uncertain cases to a human instead "
        + "of guessing. Accuracy is monitored after launch too, so drift is caught in a dashboard rather than "
        + "in a customer complaint.",
      metric: "94%+",
      metricLabel: "typical production accuracy",
    },
    {
      title: "Customisation",
      body:
        "Every solution is designed to match your business. From selecting the right model and techniques "
        + "to supporting multiple languages, we make sure your NLP fits your workflow and your industry's "
        + "vocabulary. Domain terms, product codes, abbreviations, and the way your customers actually write, "
        + "including code-switched and misspelled text, are trained in rather than filtered out. The result "
        + "reads like it was built inside your company, because it was.",
      metric: "40+",
      metricLabel: "languages supported",
    },
    {
      title: "Efficiency",
      body:
        "Processing large volumes of text manually is slow and expensive. Our NLP solutions automate the "
        + "analysis, shorten repetitive tasks, and deliver insight faster, so teams focus on strategy "
        + "instead of data handling. Work that took an analyst a full day, reading, tagging, routing, and "
        + "summarising, runs in seconds and scales with volume instead of headcount. Your people stay on the "
        + "judgement calls that actually need them.",
      metric: "70%",
      metricLabel: "less manual text handling",
    },
    {
      title: "Integration",
      body:
        "Our NLP solutions integrate smoothly with the tools you already run (chatbots, CRMs, and virtual "
        + "assistants), improving customer experience and internal operations through workflow automation "
        + "and system-wide connectivity. We deliver documented APIs, event hooks, and rollback paths, and we "
        + "test against your staging environment before anything touches production. Nothing gets ripped out "
        + "and replaced; the model slots into the workflow your team already knows.",
      metric: "0",
      metricLabel: "systems you have to replace",
    },
  ],
};

/* Why us */

export const whyUs = {
  eyebrow: "Why choose us?",
  titleAccent: "Why Choose Axiomra",
  titleLead: "for NLP Development",
  subtitle:
    "What clients tell us matters when they choose an NLP partner, and what we commit to on every engagement.",
  ctaText: "Book a Free Consultation",
  stats: [
    { value: "300+", label: "AI and machine learning projects" },
    { value: "25+", label: "Engineers and data scientists" },
    { value: "25+", label: "Global markets" },
    { value: "4+", label: "Years building production AI" },
  ],
  reasons: [
    {
      title: "Delivery Experience Across Sectors",
      body: "We have delivered AI and NLP projects across healthcare, finance, legal, retail, and education. Each build starts from your own text and your own definition of a correct answer, not a reference implementation from another client.",
    },
    {
      title: "End-To-End NLP Delivery",
      body: "From data collection and model training to deployment and ongoing maintenance, we handle the full NLP lifecycle in-house. No handoffs, no gaps, no third-party dependencies. One team owns your project from day one to go-live.",
    },
    {
      title: "Data Handling Agreed Up Front",
      body: "Hosting, access, retention, and redaction are agreed with your team before development starts, and the privacy requirements that apply to your data are assessed with you rather than assumed. We sign an NDA before any project begins and apply access controls throughout development and deployment.",
    },
    {
      title: "Transparent Communication Throughout",
      body: "You get a dedicated project manager from day one. Weekly progress updates, milestone reviews, and direct access to your development team are standard on every engagement. No black boxes, no surprises.",
    },
    {
      title: "Post-launch Engineering Support",
      body: "A support period is included after delivery, covering fixes, adjustments, and questions from the people using the system. The length and scope are set out in the engagement before work begins.",
    },
    {
      title: "Team Coaching And Handover",
      body: "Once your NLP solution is live, we run walkthroughs and hands-on sessions on how it works, how to read its outputs, and how to raise an issue early, so your team can operate and question the system without depending on us.",
    },
  ],
};

/* FAQ */

export const faqs = [
  {
    q: "What are natural language processing services?",
    a: "NLP services cover everything needed to make software understand human language: consulting on the right use case, collecting and labelling text or audio data, training and tuning models, integrating them with your existing systems, and running them in production. In practice it means turning documents, tickets, calls, and conversations into decisions your business can act on automatically.",
  },
  {
    q: "How do NLP services help businesses?",
    a: "They remove the manual reading. Instead of people sorting tickets, extracting fields from PDFs, or skimming reviews, a model does it in seconds and escalates only the cases it is unsure about. The measurable wins are usually lower cost per document, faster response times, and insight from text nobody previously had capacity to analyse.",
  },
  {
    q: "How much do NLP development services cost?",
    a: "Cost depends on volume, language coverage, the accuracy target, whether you need on-premise deployment, and how much labelled data already exists. We quote a costed range after the data audit rather than a figure before it, so the estimate reflects your text rather than an average.",
  },
  {
    q: "How long does it take to build an NLP solution?",
    a: "Timelines are set during scoping and depend mainly on the state of your data. Data preparation is the stage that varies most; where clean, labelled text in a single language already exists, the build moves considerably faster. We give an estimated schedule with the proposal.",
  },
  {
    q: "What is the difference between NLP and NLU?",
    a: "NLP is the umbrella: everything a machine does with human language, including tokenising, translating, summarising, and generating. NLU is the subset concerned with comprehension, working out intent, entities, and meaning from an utterance. In a support bot, NLU decides what the customer wants; the wider NLP pipeline handles the transcription, retrieval, and reply.",
  },
  {
    q: "What languages do your NLP models support?",
    a: "We regularly deliver in 40+ languages. English, Spanish, French, German, Arabic, Urdu, Hindi, and Mandarin are well covered by pretrained models; lower-resource languages usually need additional labelled data, and we will say so in the audit rather than after the contract is signed. Code-switched text is tested explicitly because real customers write that way.",
  },
  {
    q: "Can NLP be integrated with our existing CRM or ERP?",
    a: "Yes, and that is usually the larger half of the work. We integrate with Salesforce, HubSpot, Zendesk, Dynamics, SAP, and custom internal tools via REST APIs, webhooks, and event streams, so a classification or extraction becomes a ticket, a field, or a record inside the system your team already uses.",
  },
  {
    q: "How is our data handled during an NLP project?",
    a: "We sign an NDA before the project starts, agree handling and retention with your team, and redact personal information before any training run. Where your text cannot leave your network, as is common in healthcare, finance, and legal work, we deploy inside your VPC or on-premise with open models so nothing is sent to a third-party API. The privacy rules that apply to your data are assessed with your compliance team.",
  },
  {
    q: "How do you ensure NLP model accuracy over time?",
    a: "Language drifts: new products, new slang, new customer segments. We sample live traffic against ground truth, track accuracy on a dashboard, alert when it moves outside the agreed band, and retrain on a schedule set with you. Drift shows up in monitoring rather than in a complaint.",
  },
  {
    q: "What is the difference between NLP consulting and NLP development services?",
    a: "Consulting answers what to build and whether it is worth building: use-case scoring, data readiness, a costed roadmap, and an honest go/no-go. Development is the build itself: data pipelines, models, APIs, integration, and deployment. Many clients start with a short consulting engagement so the build has a defined target before anyone writes code.",
  },
  {
    q: "Can you build AI agents with NLP capabilities?",
    a: "Yes. Language understanding is the front door of most agents. The agent has to read the request before it can act on it. We build agents that combine NLP with tool use, retrieval over your knowledge base, and human-in-the-loop approval for any action with a real-world consequence.",
  },
  {
    q: "What industries do your NLP solutions cover?",
    a: "Healthcare, finance and fintech, legal, retail and e-commerce, education, insurance, and transportation and logistics are where we have delivered most. The models transfer across industries; the vocabulary, the compliance regime, and the definition of a correct answer do not, which is why every build starts with your data, not a template.",
  },
  {
    q: "How do I choose the right NLP service provider?",
    a: "Ask three questions. Will they show you accuracy numbers on your data before you commit? Do they own deployment and maintenance, or do they hand over a notebook? And can they tell you when NLP is the wrong answer? A provider who has never talked a client out of a use case has not been paying attention.",
  },
];
