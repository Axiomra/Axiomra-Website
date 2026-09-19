/**
 * Copy and imagery for the Real Estate industry page (/industries/real-estate).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/real-estate/hero.webp";
import introImg from "../assets/industries/real-estate/intro.webp";

import solOperationsImg from "../assets/industries/real-estate/sol-operations.webp";
import solSalesImg from "../assets/industries/real-estate/sol-sales.webp";
import solTransactionsImg from "../assets/industries/real-estate/sol-transactions.webp";
import solCollaborationImg from "../assets/industries/real-estate/sol-collaboration.webp";
import solSearchImg from "../assets/industries/real-estate/sol-search.webp";
import solComplianceImg from "../assets/industries/real-estate/sol-compliance.webp";
import solRiskImg from "../assets/industries/real-estate/sol-risk.webp";

import appsBgImg from "../assets/industries/real-estate/apps-bg.webp";
import midCtaBgImg from "../assets/industries/real-estate/midcta-bg.webp";

import stkManagementImg from "../assets/industries/real-estate/stk-management.webp";
import stkAgentsImg from "../assets/industries/real-estate/stk-agents.webp";
import stkDecisionImg from "../assets/industries/real-estate/stk-decision.webp";

import textureBgImg from "../assets/industries/real-estate/texture-bg.webp";
import buildVisualImg from "../assets/industries/real-estate/build-visual.webp";

import blog1Img from "../assets/industries/real-estate/blog-1.webp";
import blog2Img from "../assets/industries/real-estate/blog-2.webp";
import blog3Img from "../assets/industries/real-estate/blog-3.webp";
import finalCtaBgImg from "../assets/industries/real-estate/final-cta.webp";

export const REAL_ESTATE_SLUG = "real-estate";

export const hero = {
  eyebrow: "AI for the real estate industry",
  titleLead: "Rebuild Your Business With",
  titleAccent: "Custom Real Estate App Development",
  titleTail: "Services",
  body:
    "We build AI-powered real estate software that values property accurately, qualifies leads automatically and moves a transaction from first enquiry to signed contract without the paperwork bottleneck. Agencies, developers and property managers run their portfolio on one system instead of six.",
  ctaText: "Book a proposal",
  image: heroImg,
  alt: "Blue glass towers rising above a city street, seen from below",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "Simple AI Real Estate Software Development",
  titleAccent: "Services For Faster, Fair Deals",
  paragraphs: [
    "Axiomra is a real estate software development company that builds listing platforms, CRM, transaction and property management systems around the way your business already works. We remove the parts that slow a deal down (valuations argued from stale comps, leads sitting unanswered, contracts re-keyed between three systems) and replace them with tooling your agents and managers open every morning.",
    "The result is a portfolio you can see in one place: live market movement, pipeline by agent, maintenance due, compliance dates, cash position. Our models are chosen for the job rather than the brochure: gradient boosting for valuation, time-series for market trend, computer vision for condition assessment, LLMs for document extraction. Every one of them is validated against your own historical deals before it reaches a user.",
  ],
  ctaText: "Get a Demo",
  image: introImg,
  alt: "A city skyline at dusk with construction cranes over new towers",
};

export const impact = {
  titleLead: "How AI Is Reshaping",
  titleAccent: "Real Estate Operations Today",
  body:
    "AI has moved from a pitch-deck slide to the thing that decides which agency wins the listing. Valuation, lead qualification, tenant screening and market forecasting all run faster and closer to the truth when the data behind them is unified and the models are tuned on real transactions.",
  stats: [
    {
      value: "68%",
      label: "of realtors report using AI tools in their day-to-day work in 2025.",
      source: "NAR 2025 Technology Survey, via HousingWire",
    },
    {
      value: "$301.6B",
      label: "global market size for AI in real estate in 2025, and still compounding.",
      source: "The Business Research Company, 2025",
    },
    {
      value: "2.1M sqm",
      label: "of U.S. real estate footprint occupied by AI companies as of May 2025.",
      source: "JLL Research, 2025",
    },
  ],
};

/**
 * The core service rail. Each group pairs the operational problem a real
 * estate business actually reports with the system we build to remove it:
 * the structure the reference page uses to make scope legible at a glance.
 */
export const solutions = {
  eyebrow: "What types of real estate solutions are we experts in?",
  titleLead: "End-To-End AI-Powered",
  titleAccent: "Real Estate App Development Services",
  body:
    "Seven build areas cover the whole operating surface of a property business, from the analytics your leadership reads to the app your on-site team carries. Each one starts from a problem you can name and ends in software your team runs on.",
  items: [
    {
      title: "Real Estate Operations and Analytics Solutions",
      body:
        "Portfolio data stops living in exports. We unify listings, tenancies, maintenance and financials into one model, then put the analysis on top of it: occupancy, yield, arrears and market movement in a view leadership trusts enough to make decisions from.",
      image: solOperationsImg,
      alt: "A laptop showing property performance charts on a desk",
      pains: [
        { problem: "Manual data tracking", solution: "Property Management Systems" },
        { problem: "No insight you can act on", solution: "Data Analytics & BI Tools" },
        { problem: "Unpredictable market performance", solution: "Predictive Analytics Solutions" },
        { problem: "Difficulty managing portfolios", solution: "Portfolio Management Tools" },
        { problem: "Market trend uncertainty", solution: "AI-Powered Market Trends Dashboard" },
      ],
    },
    {
      title: "Client and Sales Management Systems",
      body:
        "A lead that waits four hours is usually a lead someone else closed. We build CRM and lead tooling that scores enquiries on intent, routes them to the right agent instantly and keeps the follow-up running without anyone remembering to send it.",
      image: solSalesImg,
      alt: "An agent walking a couple through property options at a table",
      pains: [
        { problem: "Inefficient lead tracking", solution: "Lead Management Software" },
        { problem: "Poor client engagement", solution: "Real Estate CRM Systems" },
        { problem: "Limited marketing reach", solution: "Real Estate Marketing Tools" },
        { problem: "Difficulty showcasing properties", solution: "Listing Platforms With Search & Filter" },
        { problem: "High client churn", solution: "AI-Driven Client Retention Tools" },
      ],
    },
    {
      title: "Transaction and Financial Management Tools",
      body:
        "Deals stall in the paperwork, not the negotiation. We automate contract generation, document extraction, milestone tracking and the financial reporting behind it, so a transaction moves on its own schedule instead of an inbox's.",
      image: solTransactionsImg,
      alt: "A model house, keys and a signed contract on a desk",
      pains: [
        { problem: "Lengthy, error-prone transactions", solution: "Transaction Management Software" },
        { problem: "Financial reporting inaccuracies", solution: "Financial Management Tools" },
        { problem: "Complex mortgage and cost maths", solution: "Cost & Mortgage Calculators" },
        { problem: "Investment analysis challenges", solution: "Investment Analysis Software" },
        { problem: "Risk assessment gaps", solution: "AI-Powered Risk Assessment Tools" },
      ],
    },
    {
      title: "Communication and Collaboration Platforms",
      body:
        "Agents, site teams, contractors and legal all touch the same deal from different places. We give them one thread per property with the documents, photos and approvals attached, available on the phone they actually carry to a viewing.",
      image: solCollaborationImg,
      alt: "Two hard-hatted colleagues reviewing plans on a tablet on site",
      pains: [
        { problem: "Poor team communication", solution: "Unified Communication Platforms" },
        { problem: "Collaborative projects hard to manage", solution: "Project Collaboration Tools" },
        { problem: "Limited access on the go", solution: "Mobile Real Estate Apps" },
        { problem: "Remote coordination challenges", solution: "Remote Collaboration Tools" },
      ],
    },
    {
      title: "Property Search and Optimisation Solutions",
      body:
        "Buyers abandon a portal that makes them work. We build search that understands intent rather than checkboxes, ranks results on what a given buyer has actually engaged with, and prices each listing against live comparables instead of last quarter's.",
      image: solSearchImg,
      alt: "An agent holding a SOLD sign outside a property",
      pains: [
        { problem: "Time-consuming property search", solution: "Property Listing Platforms" },
        { problem: "Difficulty filtering properties", solution: "Search & Filter Solutions" },
        { problem: "Coordination issues between parties", solution: "Remote Collaboration Tools" },
        { problem: "Uncertain property valuations", solution: "AI Valuation & Recommendation Engine" },
      ],
    },
    {
      title: "Regulatory and Compliance Solutions",
      body:
        "Rules change faster than a manual checklist survives. We track the obligations that apply to each property and jurisdiction, watch the dates, prepare the filing and tell the responsible person before a deadline becomes a penalty.",
      image: solComplianceImg,
      alt: "An architect's desk with blueprints, ruler and drawing tools",
      pains: [
        { problem: "Changing regulations and compliance cost", solution: "AI Regulatory Compliance Tools" },
        { problem: "Manual permit tracking", solution: "Automated Permit Management Software" },
      ],
    },
    {
      title: "Tenant and Property Risk Management Tools",
      body:
        "Arrears and emergency repairs are both predictable if you read the signals early. We score tenant risk on payment history and verified affordability, and forecast maintenance from asset age, sensor data and work-order history before the failure happens.",
      image: solRiskImg,
      alt: "An apartment facade with rows of balconies",
      pains: [
        { problem: "Non-payment or evictions", solution: "AI Tenant Screening & Risk Scoring" },
        { problem: "Maintenance emergencies", solution: "Predictive Maintenance & Alert Systems" },
      ],
    },
  ],
};

export const apps = {
  eyebrow: "What real estate apps do we specialise in?",
  titleLead: "We Develop Custom AI-Powered Real Estate",
  titleAccent: "Software Built On Proven Technology",
  body:
    "Five product shapes cover most of what a property business asks us to build. Each is delivered as your own codebase, integrated with the portals, accounting and identity systems you already run.",
  background: appsBgImg,
  alt: "A team reviewing a property strategy at a whiteboard session",
  items: [
    "Real estate CRM software",
    "Property listing and management software",
    "Lease management software",
    "Construction management software",
    "3D virtual property tour software",
  ],
};

export const technologies = {
  eyebrow: "Which technologies do we use for real estate solutions?",
  titleLead: "Modern Technologies For Building",
  titleAccent: "Dependable Real Estate Tools",
  body:
    "Four capabilities carry most of the value in a property platform. We pick between them on evidence. The cheapest model that clears your accuracy bar wins.",
  ctaText: "View all services",
  items: [
    {
      title: "Artificial Intelligence",
      body:
        "Valuation, lead scoring, tenant screening and document understanding run as services behind your product, with confidence scores exposed so an agent knows when to trust the number and when to check it.",
    },
    {
      title: "Data Analytics",
      body:
        "Listings, tenancies, transactions and market feeds land in one warehouse with a defined model, so occupancy, yield and pipeline mean the same thing in every report your leadership reads.",
    },
    {
      title: "Generative AI",
      body:
        "Listing copy, brochure text, contract drafts and buyer follow-ups generated from your own property data and tone, with a review step before anything reaches a client.",
    },
    {
      title: "Machine Learning",
      body:
        "Price forecasting, days-on-market prediction, churn and maintenance failure models trained on your transaction history and retrained on a schedule as the market moves.",
    },
  ],
};

export const midCta = {
  title: "Craft Your Ideal Real Estate Software Solution",
  body:
    "Bring us the part of the portfolio that costs you the most time (valuation, lead follow-up, transactions, maintenance) and we will map the fastest route to a working system, the integrations it needs and what it should return.",
  ctaText: "Get In Touch Now!",
  background: midCtaBgImg,
};

export const benefits = {
  eyebrow: "Benefits of custom real estate software solutions",
  titleLead: "Discover How AI Can",
  titleAccent: "Simplify Your Real Estate Operations",
  items: [
    {
      title: "Better Property Valuation",
      body:
        "Models read live comparables, condition, location signals and market movement together, so a valuation holds up in a negotiation instead of being argued down from a stale comp.",
    },
    {
      title: "Enhanced Customer Experience",
      body:
        "Buyers get search that understands what they are actually looking for, instant answers out of hours and viewing slots they can book themselves, which is usually the difference between an enquiry and a viewing.",
    },
    {
      title: "Improved Decision Making",
      body:
        "One dashboard carries occupancy, yield, arrears, pipeline and market trend on the same definitions, so investment and disposal calls are made on evidence rather than on whichever spreadsheet is newest.",
    },
    {
      title: "Efficient Lead Generation",
      body:
        "Enquiries are scored on intent and routed to the right agent in seconds, follow-up runs itself, and marketing spend moves toward the channels that produced completions rather than clicks.",
    },
    {
      title: "Automated Property Management",
      body:
        "Rent collection, renewals, inspections, work orders and compliance dates run on schedule with exceptions surfaced to a person, so a manager handles twice the doors without twice the hours.",
    },
    {
      title: "Insightful Market Analysis",
      body:
        "Price movement, absorption rate and supply pipeline are tracked per micro-market, so you know which streets are turning before the quarterly report says so.",
    },
  ],
};

export const stakeholders = {
  eyebrow: "Who this serves",
  titleLead: "Every Role",
  titleAccent: "In Real Estate",
  items: [
    {
      title: "Property Management Teams",
      body:
        "Tenancies, rent, inspections, work orders and compliance in one system with the routine chased automatically, so managers spend their day on exceptions rather than on reminders.",
      image: stkManagementImg,
      alt: "A property management team working together at a table",
    },
    {
      title: "Real Estate Agents",
      body:
        "Scored leads, instant valuations, generated listing copy and a mobile pipeline that is current at the viewing, not after it. The admin that eats a selling day is handled before the day starts.",
      image: stkAgentsImg,
      alt: "A real estate agent in a blue suit outside a property",
    },
    {
      title: "Management and Decision-Makers",
      body:
        "Portfolio performance, market exposure and forecast cash on one set of definitions, with the scenario tools to test an acquisition or disposal before it goes to the board.",
      image: stkDecisionImg,
      alt: "A leadership team reviewing portfolio figures around a laptop",
    },
  ],
};

export const build = {
  title: "Working With Us Is An Investment In Your Future",
  body:
    "We hold a deep bench across AI, data and property systems, deliver in increments your teams use from the first sprint, and keep communication direct: one team, your timezone overlap, no account layer between you and the engineers.",
  ctaText: "Request a free consultation",
  texture: textureBgImg,
  image: buildVisualImg,
  alt: "A modern house facade lit from within at dusk",
  points: [
    {
      title: "Maintain Large Inventory",
      body:
        "Our platforms are built to hold tens of thousands of units without search, reporting or media handling degrading as the portfolio grows.",
    },
    {
      title: "Efficiency",
      body:
        "Every build targets a number you already track (days on market, cost per lead, arrears rate) and is measured against it after go-live on the same definition.",
    },
    {
      title: "Smooth Communication",
      body:
        "A named team, working sessions in your hours and demo-able progress every sprint, so you are never waiting on a status report to know where the project stands.",
    },
  ],
};

export const techStrip = {
  eyebrow: "Our tech stack",
  titleLead: "Expertise In Advanced",
  titleAccent: "Development Technologies",
  body:
    "The same production-grade toolchain sits under every real estate platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "PyTorch", "TensorFlow", "scikit-learn",
        "XGBoost", "LightGBM", "Prophet", "SHAP", "YOLO", "Segment Anything", "Tesseract OCR",
        "LangChain", "LlamaIndex", "Pinecone", "Vertex AI", "MLflow",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "FastAPI", "Django", "GraphQL", "PostgreSQL", "PostGIS", "MongoDB",
        "Redis", "Elasticsearch", "Kafka", "Airflow", "dbt", "Snowflake", "BigQuery",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "React Three Fiber",
        "Mapbox GL", "Deck.gl", "D3.js", "React Native", "Flutter", "Vite",
      ],
    },
    {
      id: "cloud",
      label: "Cloud",
      items: ["AWS", "Google Cloud", "Azure", "Cloudflare", "Vercel", "Private cloud", "Hybrid"],
    },
    {
      id: "devops",
      label: "DevOps",
      items: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "GitLab CI", "Nginx", "Prometheus", "Grafana", "Sentry"],
    },
    {
      id: "proptech",
      label: "PropTech & Integrations",
      items: ["MLS / RESO Web API", "Zillow", "Rightmove", "Yardi", "MRI", "DocuSign", "Stripe", "Plaid", "Matterport", "Twilio"],
    },
    {
      id: "sqa",
      label: "SQA",
      items: ["Playwright", "Cypress", "Vitest", "Jest", "pytest", "k6", "Lighthouse CI", "Axe"],
    },
    {
      id: "uiux",
      label: "UI / UX",
      items: ["Figma", "Design tokens", "WCAG 2.2 AA", "Storybook", "Maze", "Hotjar"],
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who benefits from our expertise?",
  titleLead: "Explore The Range Of",
  titleAccent: "Real Estate Businesses We Can Work With",
  body:
    "We build custom AI-powered real estate software that drives measurable results, whether you are launching a first listing product or running a multi-country portfolio on legacy systems.",
  rows: [
    {
      label: "Startups",
      body: "We help proptech founders get a first product live fast: a working listing or CRM core, the MLS and payment integrations that win a pilot customer, and the metrics that prove the model before the next raise.",
    },
    {
      label: "Scale-ups",
      body: "Growth exposes every manual step. We automate valuation, lead routing and transaction admin, unify reporting across branches, and replace the spreadsheet workarounds with systems that hold at ten times the deal volume.",
    },
    {
      label: "Small and medium-sized businesses",
      body: "Independent agencies and regional managers carry enterprise complexity on a fraction of the headcount. Our CRM, listing and property management tooling closes that gap without an enterprise budget or a year-long rollout.",
    },
    {
      label: "Enterprises",
      body: "We partner with national agencies, developers and REITs on governed data layers, multi-entity portfolio systems and AI that satisfies security, compliance and procurement before it ever reaches production.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Why Property Teams",
  titleAccent: "Keep Coming Back",
  items: [
    {
      name: "Abdullah",
      role: "CEO, Navex",
      quote:
        "They understood the property side of the problem before writing a line of code. The valuation model went live tuned on our own transactions, and our agents stopped arguing with it in the first month.",
      rating: 5,
    },
    {
      name: "Charles Glah",
      role: "Owner, FrontOffice",
      quote:
        "Communication was the difference. Working demos every sprint, direct access to the engineers, and no surprises at the end. The platform does what we scoped and it shipped on the date we agreed.",
      rating: 5,
    },
    {
      name: "Jawad Bhati",
      role: "CEO, Voltox",
      quote:
        "We came with a portfolio spread across four systems and left with one. Reporting that used to take a week of exports is now a page our board reads on a Monday morning.",
      rating: 5,
    },
  ],
};

export const showcase = {
  eyebrow: "What innovations have we delivered to businesses?",
  titleLead: "Showcasing Our",
  titleAccent: "AI Development Projects",
  body:
    "Explore the portfolio behind our real estate work: platforms that value, list, transact and manage property at scale for agencies, developers and investors.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Why Axiomra For Custom",
  titleAccent: "Real Estate Software Development",
  cards: [
    {
      icon: "Target",
      title: "Built For You, No Vendor Lock-In",
      body:
        "You own the codebase, the data and the models. The platform runs where your policies require and integrates with the portals and accounting you already use, so nothing holds your portfolio hostage to a licence.",
    },
    {
      icon: "Layers",
      title: "Integration That Fits",
      body:
        "MLS and RESO feeds, Yardi and MRI, DocuSign, payments, identity and accounting connect through APIs against a hardened property data model, which removes the re-keying that creates most listing and ledger errors.",
    },
    {
      icon: "ShieldCheck",
      title: "60-Day Support And Enablement",
      body:
        "We stay engaged for 60 days after launch to monitor performance, resolve issues and tune the models on live data, with role-based training for agents, managers and leadership so adoption does not stall after week one.",
    },
  ],
  stats: [
    { value: "200+", label: "Projects Delivered" },
    { value: "5+", label: "Valuable Partnerships" },
    { value: "20+", label: "Countries Served" },
    { value: "25+", label: "Tech Experts" },
  ],
};

export const blogs = {
  eyebrow: "What can our expertise teach you?",
  title: "Our Blogs",
  body:
    "Practical writing on where AI actually earns its place in a property business: agentic chatbots, automated CMA, investor reporting and the governance that keeps all three defensible.",
  posts: [
    {
      title: "A Complete Guide To Agentic AI Chatbot Development For Real Estate",
      tag: "Agentic AI",
      image: blog1Img,
      alt: "A robotic hand reaching toward a human hand",
    },
    {
      title: "How AI Automates CMA For Real Estate Agents",
      tag: "Valuation",
      image: blog2Img,
      alt: "A calculator resting on printed financial documents",
    },
    {
      title: "How Effective Is AI Investor Reporting? All You Need To Know",
      tag: "Reporting",
      image: blog3Img,
      alt: "Printed line and bar charts spread across a desk",
    },
  ],
};

export const faqs = [
  {
    q: "Why do I need AI in my real estate software?",
    a: "Because the work that decides your margin is judgement work done at volume: pricing a property, deciding which enquiry to call first, screening a tenant, spotting a maintenance failure early. AI does that consistently at a scale a team cannot, and it shows its reasoning so an agent can override it. Without it you are competing against agencies whose valuation lands the same day yours needs a week.",
  },
  {
    q: "What is custom real estate software development?",
    a: "It is building the listing, CRM, transaction or property management system around your process instead of reshaping your business around a packaged product. You own the code and the data, the integrations match the portals and accounting you already run, and features get built in the order your revenue needs them rather than a vendor's roadmap.",
  },
  {
    q: "What technologies are commonly used by a real estate app development company?",
    a: "React and React Native or Flutter on the front, Node or Python services behind, PostgreSQL with PostGIS for spatial queries, Elasticsearch for listing search, and Mapbox or Deck.gl for map work. On the AI side, gradient-boosted models for valuation and lead scoring, time-series models for market forecasting, computer vision for condition and floorplan work, and LLMs for document extraction and listing copy.",
  },
  {
    q: "How accurate are AI property valuations?",
    a: "On a portfolio with clean transaction history, we typically land within single-digit percentage error on median-priced stock, and wider on unusual or thinly traded properties. That is why every valuation ships with a confidence band and the comparables behind it. The model is a fast first opinion for an agent, not a replacement for one.",
  },
  {
    q: "Can you integrate with our MLS, portals and accounting systems?",
    a: "Yes. MLS and RESO Web API feeds, Rightmove and Zillow-style portals, Yardi and MRI, DocuSign, payment and identity providers all connect through APIs against a hardened property data model. Integrations are built and reconciled in a parallel environment and cut over one flow at a time, so live listings never go dark during the switch.",
  },
  {
    q: "How long does a real estate platform take to build?",
    a: "A scoped MVP around one capability (a listing portal, a CRM core, a valuation service) typically runs eight to twelve weeks to a live pilot. A full platform covering listings, CRM, transactions and property management runs four to nine months, delivered in increments your team uses from the first sprint rather than at the end.",
  },
  {
    q: "What does it cost, and how do you price it?",
    a: "We price by scope and team shape after a discovery session, not by a headline rate. You get a written estimate with the assumptions visible, and where scope is genuinely uncertain we phase it so you can stop or re-sequence between increments without stranding what is already built.",
  },
  {
    q: "Who owns the data and the models you train?",
    a: "You do: the codebase, the data and any model trained on your transactions. Deployment runs where your policies require, including private cloud or on-premise, and we do not train shared models on your portfolio.",
  },
  {
    q: "Why choose Axiomra as your real estate software development partner?",
    a: "Because we build for operators rather than demos. Our teams work inside your actual constraints (MLS rules, jurisdiction-specific compliance, legacy ledgers, the way your agents really work), validate every model against your own history before launch, and stay engaged for 60 days afterward to tune it and train the people who use it daily.",
  },
];

export const finalCta = {
  title: "Create Your Success Story With Our Expertise",
  subtitle:
    "Tell us about your portfolio, your systems and the part of the process that costs you the most. We will come back with a scope, a timeline and a clear view of what the platform should return.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
