/**
 * Copy and imagery for the Industries overview page.
 *
 * Every industry block on the page is generated from `industries` below, so
 * adding a vertical is a data change, not a layout change. `slug` doubles as
 * the child route (`/industries/<slug>`) that the detail pages will occupy.
 */

import heroImg from "../assets/industries/hero.webp";
import fashionImg from "../assets/industries/fashion.webp";
import sportsImg from "../assets/industries/sports.webp";
import educationImg from "../assets/industries/education.webp";
import healthcareImg from "../assets/industries/healthcare.webp";
import realEstateImg from "../assets/industries/real-estate.webp";
import retailImg from "../assets/industries/retail.webp";
import marketingImg from "../assets/industries/marketing.webp";
import supplyChainImg from "../assets/industries/supply-chain.webp";
import insuranceImg from "../assets/industries/insurance.webp";
import financeImg from "../assets/industries/finance.webp";
import legalImg from "../assets/industries/legal.webp";
import transportationImg from "../assets/industries/transportation.webp";

export const INDUSTRIES_PATH = "/industries";

/** Route for one industry's detail page. */
export const industryPath = (slug) => `${INDUSTRIES_PATH}/${slug}`;

export const hero = {
  eyebrow: "Where we work",
  titleLead: "Advanced",
  titleAccent: "AI Solutions",
  titleTail: "for Industries",
  body:
    "Every sector carries its own bottlenecks, its own data and its own rules. We build AI that fits how your industry actually operates, from the first workflow we automate to the system your whole team runs on.",
  ctaText: "Request a Proposal",
  image: heroImg,
};

/**
 * Pain points are written as "problem → solution" pairs. The component renders
 * the arrow, so keep both halves short and free of trailing punctuation.
 */
export const industries = [
  {
    slug: "fashion",
    name: "Fashion",
    titleLead: "AI for",
    titleAccent: "Fashion",
    description:
      "Fashion runs on taste and timing, and both are measurable now. We build the sizing, forecasting and personalisation systems that cut returns, clear stock and keep every customer feeling like the drop was made for them.",
    image: fashionImg,
    alt: "Rows of garments hanging on a rack inside a fashion boutique",
    pains: [
      { problem: "Wrong sizes driving returns", solution: "AI sizing and virtual try-ons" },
      { problem: "Stock that sells out or sits", solution: "Predictive inventory analytics" },
      { problem: "One catalogue for every shopper", solution: "AI product recommendations" },
      { problem: "Guessing next season's demand", solution: "Trend forecasting models" },
      { problem: "E-commerce ops sprawl", solution: "Unified store management tools" },
    ],
  },
  {
    slug: "sports",
    name: "Sports",
    titleLead: "AI for",
    titleAccent: "Sports",
    description:
      "From grassroots clubs to professional leagues, the admin and the analysis both pile up. We ship the tooling that runs the organisation and the models that make every athlete's data useful.",
    image: sportsImg,
    alt: "A sprinter crouched in the starting blocks on a red running track",
    pains: [
      { problem: "Player records in spreadsheets", solution: "Registration and roster tools" },
      { problem: "Ticketing that breaks on match day", solution: "Event ticketing systems" },
      { problem: "Performance data nobody reads", solution: "Sports analysis software" },
      { problem: "Training sessions organised by hand", solution: "Coaching management platforms" },
      { problem: "Video reviewed once, then lost", solution: "AI sports coach and video insight" },
    ],
  },
  {
    slug: "education",
    name: "Education",
    titleLead: "AI for",
    titleAccent: "Education",
    description:
      "Teachers spend their evenings on grading and admin instead of teaching. We build the EdTech that hands that time back and gives every learner a path that adapts to them.",
    image: educationImg,
    alt: "Tall library shelves filled with books, lit warmly from above",
    pains: [
      { problem: "Students disengaging mid-course", solution: "Personalised learning apps" },
      { problem: "Grading eating teaching hours", solution: "AI assessment tools" },
      { problem: "Attendance taken on paper", solution: "Smart attendance systems" },
      { problem: "Courses that take weeks to build", solution: "E-learning authoring tools" },
      { problem: "Parents kept in the dark", solution: "Parent communication portals" },
      { problem: "Collaboration limited to the classroom", solution: "Virtual classrooms" },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    titleLead: "AI for",
    titleAccent: "Healthcare",
    description:
      "Clinical teams are stretched, systems do not talk to each other and every shortcut has a compliance cost. We build healthcare AI that takes the administrative load off clinicians without taking any risk with patient data.",
    image: healthcareImg,
    alt: "A doctor in a white coat with a stethoscope checking a smartphone",
    pains: [
      { problem: "Staffing gaps on every rota", solution: "AI workforce planning tools" },
      { problem: "Clinician burnout from admin", solution: "Task and documentation automation" },
      { problem: "Patients waiting too long", solution: "Smart scheduling systems" },
      { problem: "EHR and lab systems in silos", solution: "AI integration layers" },
      { problem: "Costs rising faster than budgets", solution: "Predictive cost analytics" },
      { problem: "Sensitive data under constant threat", solution: "AI-driven security monitoring" },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    titleLead: "AI for",
    titleAccent: "Real Estate",
    description:
      "Property moves on information, and most of it arrives too late. We build the market intelligence, transaction and listing systems that let agencies and developers act before the market does.",
    image: realEstateImg,
    alt: "Glass skyscrapers seen from street level, rising into a grey sky",
    pains: [
      { problem: "Affordability shifting under buyers", solution: "Market insight tools" },
      { problem: "Transactions stalled on paperwork", solution: "Transaction management software" },
      { problem: "Portfolios run from inboxes", solution: "Property management systems" },
      { problem: "Listings that sit for months", solution: "Predictive sales insights" },
      { problem: "Good properties nobody sees", solution: "AI-optimised listing platforms" },
    ],
  },
  {
    slug: "retail",
    name: "Retail",
    titleLead: "AI for",
    titleAccent: "Retail",
    description:
      "Margins in retail are won at the shelf and at the till. We build the inventory, recommendation and payment systems that keep stock right, baskets bigger and checkout fast.",
    image: retailImg,
    alt: "A modern retail store interior with folded garments on wooden shelving",
    pains: [
      { problem: "Stock-outs and overstock in the same week", solution: "Inventory management software" },
      { problem: "Shoppers browsing without buying", solution: "Recommendation engines" },
      { problem: "Errors in every transaction batch", solution: "Reliable payment software" },
      { problem: "Expenses reconciled by hand", solution: "Expense report automation" },
      { problem: "Queues at the checkout", solution: "AI-assisted POS systems" },
    ],
  },
  {
    slug: "marketing",
    name: "Marketing",
    titleLead: "AI for",
    titleAccent: "Marketing",
    description:
      "Marketing teams drown in reporting and still cannot tell which campaign moved the number. We build the analytics, content and optimisation systems that make every channel accountable.",
    image: marketingImg,
    alt: "A laptop on a desk showing marketing analytics dashboards",
    pains: [
      { problem: "Reports assembled by hand every Monday", solution: "AI analytics tools" },
      { problem: "Campaigns judged after the budget is gone", solution: "Predictive performance models" },
      { problem: "Content volume outrunning quality", solution: "AI content generation with review" },
      { problem: "Personalisation that stops at first names", solution: "Smart audience segmentation" },
      { problem: "Ad spend leaking to the wrong channels", solution: "AI budget optimisation" },
    ],
  },
  {
    slug: "supply-chain",
    name: "Supply Chain",
    titleLead: "AI for",
    titleAccent: "Supply Chain",
    description:
      "One late supplier and the whole plan slips. We build the forecasting, risk and routing systems that give operations teams the visibility to absorb disruption instead of chasing it.",
    image: supplyChainImg,
    alt: "A fulfilment warehouse floor stacked with parcels between tall racking",
    pains: [
      { problem: "Demand forecasts that miss by a mile", solution: "AI demand analytics" },
      { problem: "Supplier disruptions found too late", solution: "Smart risk monitoring" },
      { problem: "Inventory piled in the wrong depot", solution: "Intelligent stock management" },
      { problem: "Freight costs climbing every quarter", solution: "AI route optimisation" },
      { problem: "Shipments invisible between scans", solution: "Real-time shipment monitoring" },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    titleLead: "AI for",
    titleAccent: "Insurance",
    description:
      "Claims are slow, fraud is expensive and underwriting still queues behind a human. We build the automation and risk models that let insurers settle faster and price with confidence.",
    image: insuranceImg,
    alt: "Hands working through insurance paperwork beside a laptop and calculator",
    pains: [
      { problem: "Claims taking weeks to settle", solution: "AI claims automation" },
      { problem: "Fraud slipping through review", solution: "Intelligent fraud detection" },
      { problem: "Premiums set on stale tables", solution: "Predictive risk models" },
      { problem: "Policyholders waiting on hold", solution: "AI chatbots and service agents" },
      { problem: "Underwriting bottlenecks", solution: "Smart underwriting workflows" },
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    titleLead: "AI for",
    titleAccent: "Finance",
    description:
      "Finance teams carry the compliance burden, the legacy stack and the fraud risk at the same time. We build the systems that automate the controls and surface the exceptions, with an audit trail for every decision.",
    image: financeImg,
    alt: "Stock market charts displayed on a laptop screen",
    pains: [
      { problem: "Compliance consuming the team", solution: "AI compliance tooling" },
      { problem: "Legacy systems nobody dares touch", solution: "AI integration layers" },
      { problem: "Reconciliation running days late", solution: "Intelligent automation" },
      { problem: "Data quality nobody trusts", solution: "AI data management" },
      { problem: "Fraud and security exposure", solution: "AI risk detection" },
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    titleLead: "AI for",
    titleAccent: "Legal",
    description:
      "Legal work is document work, and most of it is repeatable. We build the processing, tracking and client systems that free lawyers for the judgement calls only they can make.",
    image: legalImg,
    alt: "A bronze statue of Lady Justice holding her scales",
    pains: [
      { problem: "Documents reviewed line by line", solution: "AI document processing" },
      { problem: "Billable hours leaking untracked", solution: "Smart time tracking" },
      { problem: "Clients chasing for updates", solution: "AI client portals" },
      { problem: "Compliance deadlines tracked by memory", solution: "Intelligent compliance monitoring" },
      { problem: "Overheads eating the margin", solution: "Workflow automation" },
    ],
  },
  {
    slug: "transportation",
    name: "Transportation",
    titleLead: "AI for",
    titleAccent: "Transportation & Logistics",
    description:
      "Fleets run on tight margins and tighter schedules. We build the planning, routing and maintenance systems that keep vehicles moving, drivers scheduled and deliveries on time.",
    image: transportationImg,
    alt: "Container cranes and stacked shipping containers at a busy cargo port",
    pains: [
      { problem: "Driver shortages on every route", solution: "AI workforce planning" },
      { problem: "Fuel costs eating the margin", solution: "Smart route analytics" },
      { problem: "Vehicles failing without warning", solution: "Predictive maintenance" },
      { problem: "Deliveries late and customers guessing", solution: "Real-time tracking" },
      { problem: "Dispatch still run on paper", solution: "Intelligent process automation" },
    ],
  },
];

export const techStrip = {
  eyebrow: "What we build with",
  titleLead: "One Stack,",
  titleAccent: "Every Vertical",
  body:
    "The same production-grade toolchain sits under every industry solution we ship. Pick a layer to see what it is made of.",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "Stable Diffusion", "Flux", "Whisper",
        "LangChain", "LlamaIndex", "Hugging Face", "PyTorch", "TensorFlow", "Scikit-learn",
        "OpenCV", "YOLO", "spaCy", "RAG", "Vector Search", "Fine-tuning",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "Express", "FastAPI", "Django", "GraphQL", "PostgreSQL", "MongoDB",
        "Redis", "Elasticsearch", "Qdrant", "Pinecone", "Kafka", "Airflow", "WebSockets",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js",
        "React Native", "Vite", "Radix UI", "TanStack Query", "Storybook",
      ],
    },
    {
      id: "cloud",
      label: "Cloud",
      items: ["AWS", "Google Cloud", "Azure", "Vercel", "Cloudflare", "Firebase", "Supabase", "DigitalOcean"],
    },
    {
      id: "devops",
      label: "DevOps",
      items: [
        "Docker", "Kubernetes", "Terraform", "GitHub Actions", "GitLab CI", "Nginx", "Prometheus",
        "Grafana", "Sentry", "ArgoCD",
      ],
    },
    {
      id: "sqa",
      label: "SQA",
      items: ["Playwright", "Cypress", "Vitest", "Jest", "Pytest", "Postman", "k6", "Burp Suite", "OWASP ZAP"],
    },
    {
      id: "design",
      label: "UI / UX",
      items: ["Figma", "Design Tokens", "Prototyping", "WCAG 2.2 Audits", "Usability Testing", "Design Systems"],
    },
  ],
};

export const showcase = {
  eyebrow: "Proof of work",
  titleLead: "Built for",
  titleAccent: "Real Industries",
  body:
    "A slice of the systems we have shipped. Each one started as a bottleneck in someone's business.",
  ctaText: "Check Out Our Full Portfolio",
};

export const businessTypes = {
  eyebrow: "Who we work with",
  titleLead: "Every Stage of",
  titleAccent: "the Business",
  rows: [
    {
      label: "Startups",
      body: "A scoped MVP, a model proven on real data and a demo you can put in front of investors without a rehearsal.",
    },
    {
      label: "Scale-ups",
      body: "We find what is breaking under load, move it onto infrastructure that holds and add the observability your team is missing.",
    },
    {
      label: "SMBs",
      body: "Practical automation of the work nobody wants to do: documents, reporting, scheduling and the spreadsheets that run the business.",
    },
    {
      label: "Enterprises",
      body: "Governance, audit trails, private deployment and the documentation your risk and procurement teams will ask for.",
    },
  ],
};

export const partner = {
  eyebrow: "Why partner with us",
  titleLead: "Industry Depth,",
  titleAccent: "Engineering Rigour",
  cards: [
    {
      icon: "Layers",
      title: "Vertical expertise, not a template",
      body: "We have shipped in twelve industries. The patterns transfer, the data does not, so every build starts from your workflow and your constraints.",
    },
    {
      icon: "ShieldCheck",
      title: "Production-grade from sprint one",
      body: "Security, compliance and monitoring are built in from the first commit, not bolted on before launch. What we hand over is what your team runs.",
    },
    {
      icon: "Target",
      title: "Judged on your metric",
      body: "We agree the number that defines success before we start, and we report against it every week. Model accuracy is our problem, not your KPI.",
    },
  ],
  stats: [
    { value: "5+", label: "Partnerships" },
    { value: "200+", label: "Projects" },
    { value: "20+", label: "Countries Served" },
    { value: "25+", label: "Tech Experts" },
  ],
};

export const testimonials = {
  eyebrow: "What clients say",
  titleLead: "Trusted Across",
  titleAccent: "Industries",
  items: [
    {
      name: "Adam Gawron",
      role: "Founder, Upstar",
      quote:
        "They communicated with me and we developed trust over the years. Project management is great: the willingness to take any problem and get through it is impressive.",
      rating: 5,
    },
    {
      name: "Abdullah",
      role: "CEO & Founder, Navex",
      quote:
        "Commendable work. They collaborated and communicated in a highly professional manner and delivered exactly what was asked in the desired time frame.",
      rating: 5,
    },
    {
      name: "Susana Raj",
      role: "CEO & Founder, Minmini",
      quote:
        "Impressed with their dedication, exceeding expectations on scope. They prioritised quality, delivered on time and communicated professionally throughout.",
      rating: 5,
    },
    {
      name: "Andreas Remy",
      role: "CEO & Founder, NEONMONKI",
      quote:
        "Extremely impressed with the AI and automation expertise in automating our tagging system. Efficient communication made the experience exceptional.",
      rating: 5,
    },
  ],
};

export const faqs = [
  {
    q: "Which industries does Axiomra serve?",
    a: "Fashion, sports, education, healthcare, real estate, retail, marketing, supply chain, insurance, finance, legal and transportation. If your sector is not on that list, the underlying patterns usually still apply, and we will tell you honestly if they do not.",
  },
  {
    q: "What AI services do you offer for these industries?",
    a: "Custom AI development, generative AI and LLM integration, agentic workflows, computer vision, NLP and the data engineering underneath all of it. Every industry page above maps a specific bottleneck to the service that fixes it.",
  },
  {
    q: "What does the implementation process look like?",
    a: "Discovery to understand the workflow and the data, a scoped pilot that proves the model on your numbers, then production build with weekly demos. You see working software every week, and you own the code and the infrastructure from day one.",
  },
  {
    q: "How much does an industry AI solution cost?",
    a: "It depends on the complexity of the workflow, the state of your data and the integrations required. A scoped pilot is the fastest way to a real number. Book a free session and we will size it honestly, including what we would not build.",
  },
  {
    q: "Can you integrate with the systems we already run?",
    a: "Yes, and that is most of our work. We build against your existing APIs, databases and auth rather than asking you to migrate. Where no API exists we add a thin service layer instead of touching the legacy system directly.",
  },
  {
    q: "What is Vertical AI?",
    a: "AI built for one industry's specific workflows, data and regulations rather than a general-purpose tool adapted after the fact. A clinical scheduling model and a freight routing model share the maths, not the constraints. Vertical AI starts from the constraints.",
  },
  {
    q: "What benefits can we expect?",
    a: "Less manual work, faster decisions and fewer errors in the processes we touch, measured against a metric we agree before we start. Typical engagements target a payback inside two quarters.",
  },
  {
    q: "How do we choose the right solution for our business?",
    a: "Start with the bottleneck that costs you the most, not the technology that sounds most exciting. We will help you rank the candidates by impact and effort, and we will say so if the best answer is not an AI project at all.",
  },
  {
    q: "Is this accessible for small and mid-sized businesses?",
    a: "Yes. SMBs are a large share of our work. A well-scoped automation of one painful process often pays for itself faster than an enterprise programme, and we scope for that.",
  },
];

export const finalCta = {
  title: "Start Your Journey To Success With The Trustworthy Partner",
  subtitle:
    "Tell us the bottleneck. We will come back with the system, the timeline and the number it has to hit.",
  buttonText: "Get Your Project Done",
};
