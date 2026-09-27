/**
 * Copy and stack inventory for the Tech Stack page. Kept out of the components
 * so the technology list can be edited without touching layout or motion code.
 */

export const hero = {
  eyebrow: "What we build with",
  titleLead: "The AI Tech Stack Behind",
  titleAccent: "Every System We Ship",
  body:
    "Models, frameworks and infrastructure chosen against your data and your load, never by fashion.",
  ctaText: "Talk to our engineers",
};

/**
 * Brands recognisable enough to carry credibility on their own. Slugs resolve
 * against cdn.simpleicons.org; anything without a reliable slug belongs in the
 * typographic stack list below instead.
 */
export const signatureLogos = [
  { name: "Anthropic", slug: "anthropic" },
  { name: "Google Gemini", slug: "googlegemini" },
  { name: "Meta AI", slug: "meta" },
  { name: "Hugging Face", slug: "huggingface" },
  { name: "LangChain", slug: "langchain" },
  { name: "PyTorch", slug: "pytorch" },
  { name: "TensorFlow", slug: "tensorflow" },
  { name: "Python", slug: "python" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "MongoDB", slug: "mongodb" },
  { name: "Redis", slug: "redis" },
  { name: "Docker", slug: "docker" },
  { name: "Kubernetes", slug: "kubernetes" },
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "GitHub", slug: "github" },
  { name: "NVIDIA", slug: "nvidia" },
];

export const explorer = {
  eyebrow: "The full inventory",
  titleLead: "Nine Layers, One",
  titleAccent: "Production System",
  body:
    "Every engagement draws from the same nine layers. What changes is which pieces we reach for, and we will tell you why before a line of code is written.",
};

/**
 * The stack itself. `id` doubles as the scroll anchor the sticky rail tracks,
 * so it has to stay unique and URL safe.
 */
export const stackGroups = [
  {
    id: "generative-ai",
    label: "Generative AI",
    title: "Generative AI & LLMs",
    description:
      "Transformer models for text, image and multimodal work, fine-tuned on your data and wrapped in guardrails before anything reaches a customer.",
    items: [
      { name: "GPT-4o" },
      { name: "Claude", slug: "anthropic" },
      { name: "Gemini", slug: "googlegemini" },
      { name: "Llama 3", slug: "meta" },
      { name: "Mistral", slug: "mistralai" },
      { name: "Phi-3" },
      { name: "Whisper" },
      { name: "Stable Diffusion" },
      { name: "Flux" },
      { name: "Embeddings" },
      { name: "RAG" },
      { name: "Guardrails" },
      { name: "Vector Search" },
      { name: "Prompt Evaluation" },
      { name: "Function Calling" },
    ],
  },
  {
    id: "frameworks",
    label: "AI Frameworks",
    title: "AI Frameworks & Libraries",
    description:
      "The tooling that turns a notebook into a service: orchestration, evaluation, experiment tracking and model packaging.",
    items: [
      { name: "LangChain", slug: "langchain" },
      { name: "LlamaIndex" },
      { name: "Hugging Face", slug: "huggingface" },
      { name: "Transformers", slug: "huggingface" },
      { name: "vLLM" },
      { name: "Ollama", slug: "ollama" },
      { name: "MLflow", slug: "mlflow" },
      { name: "Weights & Biases", slug: "weightsandbiases" },
      { name: "ONNX", slug: "onnx" },
      { name: "Ray", slug: "ray" },
      { name: "Streamlit", slug: "streamlit" },
      { name: "Gradio", slug: "gradio" },
      { name: "Pydantic", slug: "pydantic" },
      { name: "Celery", slug: "celery" },
    ],
  },
  {
    id: "machine-learning",
    label: "Machine Learning",
    title: "Machine Learning",
    description:
      "Classical models still win on tabular problems. We pick the smallest model that clears your accuracy bar and keep it explainable.",
    items: [
      { name: "PyTorch", slug: "pytorch" },
      { name: "TensorFlow", slug: "tensorflow" },
      { name: "Keras", slug: "keras" },
      { name: "Scikit-learn", slug: "scikitlearn" },
      { name: "NumPy", slug: "numpy" },
      { name: "pandas", slug: "pandas" },
      { name: "Apache Spark", slug: "apachespark" },
      { name: "Python", slug: "python" },
      { name: "XGBoost" },
      { name: "LightGBM" },
      { name: "CatBoost" },
      { name: "Time Series Forecasting" },
      { name: "Anomaly Detection" },
      { name: "Recommenders" },
      { name: "Feature Stores" },
      { name: "SHAP" },
    ],
  },
  {
    id: "vision-audio",
    label: "Vision & Audio",
    title: "Computer Vision & Audio",
    description:
      "Detection, segmentation, OCR and speech pipelines that run on edge hardware as happily as they run in a data centre.",
    items: [
      { name: "OpenCV", slug: "opencv" },
      { name: "TensorRT", slug: "nvidia" },
      { name: "YOLO" },
      { name: "Detectron2" },
      { name: "SAM" },
      { name: "MediaPipe" },
      { name: "Tesseract OCR" },
      { name: "CNNs" },
      { name: "Vision Transformers" },
      { name: "Librosa" },
      { name: "Whisper ASR" },
      { name: "Speaker Diarisation" },
      { name: "Pose Estimation" },
      { name: "OCR Post-processing" },
    ],
  },
  {
    id: "nlp",
    label: "Language",
    title: "Natural Language Processing",
    description:
      "Search, classification and document understanding for the messy text that real businesses actually store.",
    items: [
      { name: "spaCy", slug: "spacy" },
      { name: "Sentence Transformers", slug: "huggingface" },
      { name: "NLTK" },
      { name: "BERT" },
      { name: "Named Entity Recognition" },
      { name: "Intent Classification" },
      { name: "Semantic Search" },
      { name: "Summarisation" },
      { name: "Topic Modelling" },
      { name: "Sentiment Analysis" },
      { name: "Document Parsing" },
      { name: "Translation" },
    ],
  },
  {
    id: "backend-data",
    label: "Backend & Data",
    title: "Backend & Data",
    description:
      "Services, queues and stores built to survive the traffic you expect on your worst day, not your average one.",
    items: [
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express" },
      { name: "NestJS", slug: "nestjs" },
      { name: "FastAPI", slug: "fastapi" },
      { name: "Django", slug: "django" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Redis", slug: "redis" },
      { name: "Elasticsearch", slug: "elasticsearch" },
      { name: "Qdrant", slug: "qdrant" },
      { name: "Kafka", slug: "apachekafka" },
      { name: "Airflow", slug: "apacheairflow" },
      { name: "GraphQL", slug: "graphql" },
      { name: "WebSockets", slug: "socketdotio" },
      { name: "Pinecone" },
      { name: "dbt" },
    ],
  },
  {
    id: "frontend",
    label: "Front-End",
    title: "Front-End & Interfaces",
    description:
      "The surface your users judge everything by. Accessible, fast on a mid-range phone, and typed end to end.",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Vue", slug: "vuedotjs" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Tailwind CSS", slug: "tailwindcss" },
      { name: "Framer Motion", slug: "framer" },
      { name: "Three.js", slug: "threedotjs" },
      { name: "React Native", slug: "react" },
      { name: "Vite", slug: "vite" },
      { name: "Radix UI", slug: "radixui" },
      { name: "TanStack Query", slug: "reactquery" },
      { name: "Storybook", slug: "storybook" },
    ],
  },
  {
    id: "cloud-devops",
    label: "Cloud & DevOps",
    title: "Cloud & DevOps",
    description:
      "Reproducible environments, one-command deploys and the observability to know something broke before your users tell you.",
    items: [
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "Docker", slug: "docker" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Terraform", slug: "terraform" },
      { name: "GitHub Actions", slug: "githubactions" },
      { name: "GitLab CI", slug: "gitlab" },
      { name: "Nginx", slug: "nginx" },
      { name: "Prometheus", slug: "prometheus" },
      { name: "Grafana", slug: "grafana" },
      { name: "Sentry", slug: "sentry" },
      { name: "Vercel", slug: "vercel" },
      { name: "Cloudflare", slug: "cloudflare" },
      { name: "AWS" },
      { name: "Azure" },
    ],
  },
  {
    id: "quality-design",
    label: "Quality & Design",
    title: "Quality & Product Design",
    description:
      "Test coverage that catches regressions and interface work that starts from the task, not from a template.",
    items: [
      { name: "Cypress", slug: "cypress" },
      { name: "Vitest", slug: "vitest" },
      { name: "Jest", slug: "jest" },
      { name: "Pytest", slug: "pytest" },
      { name: "Postman", slug: "postman" },
      { name: "k6", slug: "k6" },
      { name: "Burp Suite", slug: "burpsuite" },
      { name: "Figma", slug: "figma" },
      { name: "Playwright" },
      { name: "Design Tokens" },
      { name: "WCAG 2.2 Audits" },
      { name: "Usability Testing" },
    ],
  },
];

export const businesses = {
  titleLead: "Who This Stack",
  titleAccent: "Actually Fits",
  body:
    "The same engineering standard applies at every size. What changes is how much of it you need on day one.",
  segments: [
    {
      id: "startups",
      label: "Startups",
      headline: "Prove the idea before the runway runs out",
      body:
        "We help founders find the smallest system that validates the bet: a scoped MVP, a model that clears the bar on real data, and a deployment you can demo to investors without a rehearsal.",
      tags: ["MVP scoping", "Model feasibility", "Investor-ready demos"],
    },
    {
      id: "scale-ups",
      label: "Scale-ups",
      headline: "Take the load without rewriting everything",
      body:
        "Growth exposes the shortcuts. We profile what is breaking, move the hot paths onto infrastructure that holds, and add the observability your team needs to sleep through a launch week.",
      tags: ["Performance work", "Cost control", "Observability"],
    },
    {
      id: "mid-market",
      label: "Mid-market",
      headline: "Automate the work nobody wants to do",
      body:
        "Established teams usually sit on years of unstructured data. We turn that into document pipelines, internal copilots and forecasting that replace spreadsheets people maintain by hand.",
      tags: ["Document AI", "Internal copilots", "Legacy integration"],
    },
    {
      id: "enterprise",
      label: "Enterprise",
      headline: "Ship AI your compliance team will sign off on",
      body:
        "Audit trails, access control, data residency and human review built in from the first sprint, plus the documentation your risk and procurement functions will ask for.",
      tags: ["Governance", "Private deployment", "Audit trails"],
    },
  ],
};

export const partner = {
  eyebrow: "Why teams stay",
  titleLead: "What You Get That",
  titleAccent: "A Vendor Will Not Give You",
  cards: [
    {
      title: "The people who scope it are the people who build it",
      body:
        "No handover from a sales engineer to an offshore pool. The engineer in your kickoff call is the one writing the code, and they stay on the project until it is in production.",
    },
    {
      title: "Weekly demos, not status decks",
      body: "You see working software every week. If a week produced nothing worth showing, we say that instead of dressing it up.",
    },
    {
      title: "Judged on your metric",
      body: "We agree on the number that defines success before we start, and we report against it. Model accuracy is our problem, not your KPI.",
    },
  ],
  stats: [
    { value: "300+", label: "Projects delivered" },
    { value: "25+", label: "In-house experts" },
    { value: "12+", label: "Industries served" },
    { value: "20+", label: "Countries shipped to" },
  ],
};

export const faqs = [
  {
    q: "How do you choose the technologies for a project?",
    a: "We start from your constraints: the data you hold, the systems it has to talk to, the latency your users will tolerate and the budget you have for inference. The stack falls out of those answers. If a smaller open model clears your accuracy bar at a tenth of the cost, we will tell you, even when the larger one is easier to sell.",
  },
  {
    q: "Do you work with open-source models or only commercial APIs?",
    a: "Both, and often together. Commercial APIs get you to a working product fastest. Open models on your own infrastructure win on cost at volume, on data residency, and anywhere a vendor outage would be unacceptable. Most systems we ship route between the two.",
  },
  {
    q: "Can you integrate AI into software we already run?",
    a: "Yes, and that is the majority of our work. We build against your existing APIs, databases and auth rather than asking you to migrate. Where no API exists, we add a thin service layer instead of touching the legacy system directly.",
  },
  {
    q: "What happens to our data during development?",
    a: "It stays under your control. We work in your cloud account where possible, sign whatever data processing agreement your legal team requires, and default to no training on your data. For regulated work we can run the entire pipeline inside your network.",
  },
  {
    q: "How do you keep the stack current without churning our codebase?",
    a: "Model choice is isolated behind an interface, so swapping a provider is a configuration change rather than a rewrite. Framework upgrades happen on a scheduled cadence with the test suite as the gate, not opportunistically mid-feature.",
  },
  {
    q: "Do you hand over the code and infrastructure?",
    a: "Always. You own the repositories, the cloud accounts and the model artefacts from day one. Handover includes runbooks, architecture notes and a working local setup, so another team could pick it up without us.",
  },
];
