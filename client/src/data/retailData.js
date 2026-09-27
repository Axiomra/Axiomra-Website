/**
 * Copy and imagery for the Retail industry page (`/industries/retail`).
 *
 * Same contract as the other verticals: every section reads one export from
 * here, so the components stay layout-only and the copy is editable in one
 * place. Statistics carry their source in the object rather than in a comment,
 * because they are rendered on the card.
 */

import { caseStudyPath } from "../routes.constants";
import heroImg from "../assets/industries/retail/hero.webp";
import introImg from "../assets/industries/retail/intro.webp";
import svcOperationsImg from "../assets/industries/retail/svc-operations.webp";
import svcExperienceImg from "../assets/industries/retail/svc-experience.webp";
import svcCommerceImg from "../assets/industries/retail/svc-commerce.webp";
import svcSecurityImg from "../assets/industries/retail/svc-security.webp";
import svcEfficiencyImg from "../assets/industries/retail/svc-efficiency.webp";
import svcForecastImg from "../assets/industries/retail/svc-forecast.webp";
import stkRetailersImg from "../assets/industries/retail/stk-retailers.webp";
import stkOperatorsImg from "../assets/industries/retail/stk-operators.webp";
import stkSuppliersImg from "../assets/industries/retail/stk-suppliers.webp";
import stkShoppersImg from "../assets/industries/retail/stk-shoppers.webp";
import midCtaBgImg from "../assets/industries/retail/midcta-bg.webp";
import techBgImg from "../assets/industries/retail/tech-bg.webp";
import textureBgImg from "../assets/industries/retail/texture-bg.webp";
import blog1Img from "../assets/industries/retail/blog-1.webp";
import blog2Img from "../assets/industries/retail/blog-2.webp";
import blog3Img from "../assets/industries/retail/blog-3.webp";
import finalCtaImg from "../assets/industries/retail/final-cta.webp";

export const RETAIL_SLUG = "retail";

export const hero = {
  eyebrow: "AI for the retail industry",
  titleLead: "Personalised Retail Software for",
  titleAccent: "Resilient, Omnichannel",
  titleTail: "Growth",
  body:
    "We build AI retail platforms that sense demand before it moves, keep the right stock in the right store and make every basket feel picked by hand. Fewer stockouts, less shrink, faster checkout, and margin you can trace to a decision.",
  ctaText: "Request a Proposal",
  image: heroImg,
  alt: "A modern clothing store interior with garments displayed on racks and shelving",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "AI Retail Software Development For",
  titleAccent: "Every Channel You Sell Through",
  paragraphs: [
    "We work as the engineering partner behind data-driven retail operations: a modular, cloud-native platform that fuses demand sensing, inventory optimisation, workforce intelligence and unified commerce. It goes straight at the things that quietly erode loyalty and margin: supply chain disruption, mismanaged inventory, understaffed shifts and channels that never quite agree with each other.",
    "From grocery to fashion, big-box to DTC, we help retailers under real cost pressure automate low-value work, accelerate replenishment and pricing decisions, and modernise without ripping out the systems that already run the business. Accelerators, change management and training come with the build, so the digital transformation lag closes in weeks rather than quarters.",
  ],
  image: introImg,
  alt: "Escalators and shop fronts across several levels of a busy shopping centre",
  highlights: [
    { value: "48h", label: "From data drop to first forecast" },
    { value: "2 quarters", label: "Typical payback window" },
  ],
};

export const impact = {
  titleLead: "AI Retail Software",
  titleAccent: "Driving Measurable Impact",
  body:
    "Merchandising, supply chains and omnichannel journeys are being rebuilt around production-grade AI. The retailers unifying their data first are the ones already turning forecasting, pricing, labour and CX into a compounding advantage.",
  stats: [
    {
      value: "89%",
      label: "of retailers are using or assessing AI across their operations, signalling mainstream adoption.",
      source: "NVIDIA, State of AI in Retail and CPG, 2025",
    },
    {
      value: "$14.2B",
      label: "global AI-in-retail market size in 2025, projected to compound at 23% through 2030.",
      source: "Grand View Research, AI in Retail, 2025-2030",
    },
    {
      value: "51%",
      label: "of global shoppers now use AI for price comparison, reshaping discovery and value shopping.",
      source: "Forbes, How AI Is Reshaping Retail, 2025",
    },
  ],
};

export const challenges = {
  eyebrow: "What retail actually breaks on",
  titleLead: "The Problems We",
  titleAccent: "Engineer Away",
  body:
    "Every retailer we meet is losing money in the same six places. None of them are solved by a dashboard. They are solved by models wired into the systems that already take the decisions.",
  items: [
    {
      icon: "PackageX",
      problem: "Stockouts and overstock in the same week",
      solution:
        "Store-SKU level demand models that read seasonality, promotions, weather and local events, then push replenishment quantities back into your ERP instead of a report nobody opens.",
    },
    {
      icon: "Users",
      problem: "One catalogue served to every shopper",
      solution:
        "Real-time recommendation and search ranking trained on behaviour, not demographics, running the same way on web, app and the associate's tablet.",
    },
    {
      icon: "Tags",
      problem: "Pricing and promotions set on gut feel",
      solution:
        "Elasticity models that price by segment and location, with guardrails so no automated decision ever undercuts a margin floor you did not agree to.",
    },
    {
      icon: "ShieldAlert",
      problem: "Shrink, returns fraud and chargebacks",
      solution:
        "Anomaly detection across POS, refunds and CCTV events that flags the pattern in minutes, with an audit trail your loss prevention team can act on.",
    },
    {
      icon: "Clock",
      problem: "Back-office work eating store hours",
      solution:
        "Workflow automation across ordering, rostering, reconciliation and reporting, so staff hours move from paperwork back onto the shop floor.",
    },
    {
      icon: "Network",
      problem: "Channels that never agree on stock",
      solution:
        "A unified commerce layer with one inventory truth behind e-commerce, marketplace, POS and fulfilment, so ship-from-store stops being a gamble.",
    },
  ],
};

export const services = {
  eyebrow: "What types of retail software are we experts in?",
  titleLead: "Transforming Business Through Advanced",
  titleAccent: "Retail Software Development",
  body:
    "Six product families, each shipped as production software with your data, your integrations and your compliance requirements built in from the first sprint.",
  items: [
    {
      title: "Retail Operations and Analytics",
      body:
        "Simplify operations and take smarter decisions with AI-driven retail platforms. Real-time visibility across inventory, supply and production, so cost, stockouts and idle capital all come down together.",
      image: svcOperationsImg,
      alt: "A long supermarket aisle stocked with packaged goods on both sides",
      points: [
        "Inventory management",
        "Supply chain management",
        "Reporting and analytics",
        "Supplier order software",
        "Expense report software",
        "Logistics software",
      ],
    },
    {
      title: "Customer Experience and Engagement",
      body:
        "Personalise every interaction and automate the service work behind it. Recommendations, loyalty and assisted selling that raise basket size without raising headcount.",
      image: svcExperienceImg,
      alt: "A shop assistant taking a card payment at a tablet point-of-sale counter",
      points: [
        "CRM for retail",
        "Marketing automation",
        "Loyalty programmes",
        "Point of sale (POS)",
        "Chatbots and virtual assistants",
        "Recommendation engines",
      ],
      // Long-form write-up of this service in use, linked under the points.
      caseStudy: {
        text: "Read the in-store shopping assistant blueprint",
        to: caseStudyPath("retail-in-store-ai-shopping-assistant"),
      },
    },
    {
      title: "E-commerce and Digital Retail",
      body:
        "Grow online sales with storefronts built for conversion. Predictive merchandising, faster product discovery and a checkout that holds up on peak trading days.",
      image: svcCommerceImg,
      alt: "A shopper entering card details on a laptop while shopping online",
      points: [
        "E-commerce platforms",
        "Headless storefronts",
        "Mobile retail apps",
        "Product content automation",
        "Visual and semantic search",
        "Marketplace integrations",
      ],
    },
    {
      title: "Security, Loss Prevention and Compliance",
      body:
        "Protect margin and customer data at the same time. Fraud detection across transactions and returns, tax and regulatory reporting that reconciles itself, and access control that survives an audit.",
      image: svcSecurityImg,
      alt: "A cluster of surveillance cameras mounted under a glass roof",
      points: [
        "Fraud and shrink detection",
        "Compliance management",
        "Tax and GST reporting",
        "CCTV and video analytics",
        "Integration platforms",
        "IT and access management",
      ],
    },
    {
      title: "Operational Efficiency and Workforce",
      body:
        "Automate the repeatable work in the back office and on the floor. Fewer manual touches, fewer errors, and rosters that match the footfall you actually get.",
      image: svcEfficiencyImg,
      alt: "Two colleagues reviewing stock on a tablet inside a store stockroom",
      points: [
        "Task management",
        "Workflow automation",
        "Payment and transaction software",
        "Barcoding and scanning",
        "Accounting automation",
        "Pricing optimisation",
      ],
      // Long-form write-up of this service in use, linked under the points.
      caseStudy: {
        text: "Read the smart pricing blueprint",
        to: caseStudyPath("retail-dynamic-pricing-optimization"),
      },
    },
    {
      title: "Demand Forecasting and Replenishment",
      body:
        "Predict demand at store-SKU level and let replenishment follow it. Reduce stockouts, avoid dead stock, and hand planners a number they can defend.",
      image: svcForecastImg,
      alt: "An analytics dashboard showing usage and performance charts on a dark screen",
      points: [
        "Accurate demand forecasting",
        "Balanced inventory",
        "Automated replenishment",
        "Assortment planning",
        "Markdown optimisation",
        "Returns and exchange automation",
      ],
      // Long-form write-up of this service in use, linked under the points.
      caseStudy: {
        text: "Read the inventory forecasting blueprint",
        to: caseStudyPath("retail-ai-inventory-demand-forecasting"),
      },
    },
  ],
};

export const appTypes = {
  eyebrow: "What retail apps do we specialise in?",
  titleLead: "We Develop Custom AI-Powered Retail Software",
  titleAccent: "Using Proven Technology",
  items: [
    {
      id: "order",
      label: "Order management software",
      title: "Order management that never loses a line",
      body:
        "One order record from cart to doorstep, with allocation logic that picks the cheapest fulfilling node and tells the customer the truth about the date.",
      points: ["Distributed order orchestration", "Ship-from-store and BOPIS", "Automated exceptions handling", "Carrier and 3PL integrations"],
    },
    {
      id: "pos",
      label: "POS and payment software",
      title: "A till that keeps trading when the line drops",
      body:
        "Offline-first point of sale with tokenised payments, split tenders and a reconciliation report that matches the bank without a spreadsheet.",
      points: ["Offline-capable POS", "Tokenised and contactless payments", "Automated end-of-day reconciliation", "Queue-busting mobile checkout"],
    },
    {
      id: "crm",
      label: "Retail CRM software",
      title: "Customer data that actually reaches the floor",
      body:
        "A single customer profile across channels, feeding segmentation, loyalty and clienteling tools that associates use in the aisle, not after the shift.",
      points: ["Unified customer profiles", "Segmentation and lifecycle journeys", "Loyalty and rewards engines", "Clienteling for store associates"],
    },
    {
      id: "inventory",
      label: "Inventory management software",
      title: "One stock truth behind every channel",
      body:
        "Live positions across stores, warehouses and in-transit, with safety stock and reorder points recalculated by model rather than by habit.",
      points: ["Real-time multi-location stock", "Automated reorder points", "Cycle counting and shrink tracking", "Supplier lead-time modelling"],
    },
    {
      id: "mobile",
      label: "Retail mobile apps",
      title: "The store in the shopper's pocket",
      body:
        "Native and cross-platform apps with visual search, scan-and-go, personalised offers and push that is timed by behaviour rather than by calendar.",
      points: ["Visual and voice search", "Scan-and-go checkout", "Personalised offers and wallets", "In-app support assistants"],
    },
  ],
};

export const technologies = {
  eyebrow: "Which technologies do we use for retail solutions?",
  titleLead: "Leading Technologies For",
  titleAccent: "Efficient and Secure Retail Tools",
  body:
    "The stack under every retail build, chosen for what it has to survive: peak trading, messy master data and audits.",
  background: techBgImg,
  ctaText: "View all services",
  items: [
    {
      title: "Artificial Intelligence",
      body:
        "AI powers smarter decisioning and tighter operations, optimising inventory, pricing and service quality across the estate rather than one store at a time.",
    },
    {
      title: "Data Analytics",
      body:
        "We turn fragmented POS, e-commerce and supply data into a modelled warehouse, so trend, margin and cohort questions get answered in seconds.",
    },
    {
      title: "Generative AI",
      body:
        "Product content, personalised recommendations and assortment briefs generated at catalogue scale, with human review where brand voice and claims matter.",
    },
    {
      title: "Machine Learning",
      body:
        "Forecasting, elasticity, churn and propensity models trained on your history, retrained on a schedule and monitored for drift in production.",
    },
    {
      title: "Computer Vision",
      body:
        "Shelf monitoring, planogram compliance, queue analytics and checkout automation from the camera estate you already have installed.",
    },
  ],
};

export const solutions = {
  eyebrow: "What can custom retail software optimise for you?",
  titleLead: "Explore AI-Powered Retail Solutions",
  titleAccent: "For Simplifying Retail Operations",
  texture: textureBgImg,
  items: [
    {
      title: "Boosted sales and revenue",
      body:
        "AI reads customer data to deliver personalised product recommendations, upsell opportunities and targeted promotions, lifting conversion and revenue per visit.",
    },
    {
      title: "Optimised inventory management",
      body:
        "Forecast demand, adjust stock levels automatically and prevent stockouts or overstock before they reach the shelf. Less waste, more availability, better working capital.",
    },
    {
      title: "Enhanced customer engagement",
      body:
        "Tailored suggestions, smarter search, responsive assistants and loyalty programmes that adapt. Engagement that keeps shoppers coming back to you, not the marketplace.",
    },
    {
      title: "Mitigated fraud and risk",
      body:
        "Models detect suspicious patterns and anomalies across transactions and returns, protecting margin while keeping legitimate customers out of the friction.",
    },
    {
      title: "A tighter supply chain",
      body:
        "AI refines supplier planning, forecasts delivery timelines and optimises replenishment schedules, cutting cost and preventing the delays customers actually notice.",
    },
    {
      title: "Enhanced operational efficiency",
      body:
        "Repetitive tasks automated, forecasting accuracy improved, and pricing and workforce allocation optimised across every store in the estate.",
    },
  ],
};

export const midCta = {
  title: "Rebuild Your Retail Operation with AI",
  body:
    "Tell us the number that hurts, whether that is shrink, stockouts, return rate or conversion, and we will come back with the system, the timeline and the metric it has to hit.",
  buttonText: "Get in Touch Now",
  background: midCtaBgImg,
};

export const stakeholders = {
  eyebrow: "Who this is built for",
  titleLead: "Every",
  titleAccent: "Stakeholder in Retail",
  items: [
    {
      label: "Retailers and Brands",
      body: "Merchandising, pricing and assortment decisions backed by the same numbers finance uses.",
      image: stkRetailersImg,
      alt: "A retail buyer checking garments against a tablet on the shop floor",
    },
    {
      label: "Store Operators",
      body: "Rosters, tasks and stock counts that fit the shift, on a device staff already carry.",
      image: stkOperatorsImg,
      alt: "A store operator reviewing stock on a tablet in a distribution centre",
    },
    {
      label: "Supply Partners",
      body: "Shared forecasts and lead-time visibility, so nobody is planning off a purchase order alone.",
      image: stkSuppliersImg,
      alt: "A worker standing between tall racks of palletised stock in a warehouse",
    },
    {
      label: "Shoppers",
      body: "Faster checkout, honest availability and recommendations that read like they were picked by a person.",
      image: stkShoppersImg,
      alt: "Three shoppers carrying bags and browsing together in a shopping centre",
    },
  ],
};

export const blogs = {
  eyebrow: "What can our expertise teach you?",
  title: "Insights on AI and Retail Innovation",
  body:
    "What we have learned shipping retail AI into live estates, written for the people who have to run the store on Monday.",
  posts: [
    {
      title: "How to use AI for beauty and cosmetics e-commerce",
      excerpt:
        "Shade matching, virtual try-on and review mining: where AI moves conversion in a category built on trust.",
      image: blog1Img,
      alt: "A laptop showing performance analytics charts on a desk",
      tag: "E-commerce",
      readTime: "8 min read",
    },
    {
      title: "Retail conversational AI: five must-know secrets for amazing CX",
      excerpt:
        "What separates an assistant shoppers use from one they abandon: grounding, escalation and knowing when to stop talking.",
      image: blog2Img,
      alt: "A monitoring screen displaying conversion and quality score metrics",
      tag: "Customer experience",
      readTime: "6 min read",
    },
    {
      title: "Predictive inventory management and forecasting with machine learning",
      excerpt:
        "A step-by-step implementation guide: from a messy sales history to replenishment your planners actually trust.",
      image: blog3Img,
      alt: "A stocked grocery aisle seen from one end of the store",
      tag: "Forecasting",
      readTime: "11 min read",
    },
  ],
};

export const techStrip = {
  eyebrow: "Technologies we work with",
  titleLead: "Expertise in Advanced",
  titleAccent: "Retail Technologies",
  body:
    "The production toolchain behind our retail builds. Pick a layer to see what it is made of.",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "Whisper", "Stable Diffusion",
        "LangChain", "LlamaIndex", "Hugging Face", "PyTorch", "TensorFlow", "Prophet",
        "XGBoost", "Scikit-learn", "OpenCV", "YOLO", "RAG", "Vector Search", "Fine-tuning",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "FastAPI", "Django", "GraphQL", "PostgreSQL", "MongoDB", "Redis",
        "Elasticsearch", "Snowflake", "BigQuery", "Kafka", "Airflow", "dbt", "WebSockets",
      ],
    },
    {
      id: "commerce",
      label: "Commerce",
      items: [
        "Shopify", "Shopify Hydrogen", "Medusa", "commercetools", "Magento", "WooCommerce",
        "Stripe", "Adyen", "Klarna", "Algolia", "Contentful", "Sanity",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js",
        "React Native", "Expo", "Vite", "Radix UI", "TanStack Query",
      ],
    },
    {
      id: "cloud",
      label: "Cloud & DevOps",
      items: [
        "AWS", "Google Cloud", "Azure", "Vercel", "Cloudflare", "Docker", "Kubernetes",
        "Terraform", "GitHub Actions", "Prometheus", "Grafana", "Sentry",
      ],
    },
    {
      id: "sqa",
      label: "SQA",
      items: ["Playwright", "Cypress", "Vitest", "Jest", "Pytest", "k6", "Postman", "OWASP ZAP"],
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who do we work with?",
  titleLead: "Every Format of",
  titleAccent: "Retail Business",
  rows: [
    {
      label: "DTC brands",
      body: "A storefront that converts, a forecast you can order against, and the analytics to know which channel is actually paying for itself.",
    },
    {
      label: "Multi-store retailers",
      body: "One stock truth across the estate, clienteling on the floor and replenishment that stops the top ten SKUs going out on a Saturday.",
    },
    {
      label: "Grocery and convenience",
      body: "Fresh demand forecasting, waste reduction, shelf monitoring and pricing that respects both margin floors and local competition.",
    },
    {
      label: "Enterprise and franchise groups",
      body: "Governed rollouts, per-market configuration, audit trails and the integration work your ERP and procurement teams will ask about first.",
    },
  ],
};

export const testimonials = {
  eyebrow: "What do our clients say about us?",
  titleLead: "Why Retail Teams",
  titleAccent: "Trust Us",
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

export const showcase = {
  eyebrow: "What have we delivered to businesses?",
  titleLead: "Showcasing Our",
  titleAccent: "AI Development Projects",
  body:
    "A slice of the systems we have shipped. Each one started as a bottleneck somebody was working around by hand.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Working With Us Is An",
  titleAccent: "Investment in Your Future",
  cards: [
    {
      icon: "Layers",
      title: "Commerce development",
      body: "End-to-end retail and e-commerce delivery: architecture, UX, back end, front end, QA and the support that follows the launch.",
    },
    {
      icon: "ShieldCheck",
      title: "Agile and scalable solutions",
      body: "Modular architecture that scales with trading peaks and adapts to market changes without disrupting the estate that is already live.",
    },
    {
      icon: "Target",
      title: "Judged on your metric",
      body: "We agree the number that defines success before we start, be it shrink, availability or conversion, and report against it every week.",
    },
  ],
  stats: [
    { value: "200+", label: "Projects Delivered" },
    { value: "5+", label: "Valuable Partnerships" },
    { value: "20+", label: "Countries Served" },
    { value: "25+", label: "Tech Experts" },
  ],
};

export const faqs = [
  {
    q: "How will artificial intelligence affect the future of retailing?",
    a: "It moves the decisions that used to be made weekly in a planning meeting into systems that take them daily, per store and per SKU. Forecasting, pricing, replenishment and personalisation stop being separate exercises and start sharing one view of demand. The retailers that win are not the ones with the most models, they are the ones whose data is clean enough to trust them.",
  },
  {
    q: "How does data affect machine learning in retail?",
    a: "It is the whole game. Two years of clean transaction history with promotions, prices and stock positions attached will beat a more sophisticated model trained on partial data every time. Most of our first phase on a retail engagement is data engineering: joining POS, e-commerce, ERP and supplier feeds into something a model can learn from.",
  },
  {
    q: "What types of data do retailers typically collect, and how can it be used?",
    a: "Transactions, basket composition, loyalty and CRM records, web and app behaviour, stock movements, supplier lead times, labour rosters, footfall and increasingly video. Used together they support demand forecasting, elasticity-based pricing, personalisation, shrink detection and labour planning, with the same data serving several models rather than one report each.",
  },
  {
    q: "What challenges do retailers face in data engineering?",
    a: "Legacy POS exports, inconsistent SKU master data, channel systems that each keep their own truth, and seasonality that breaks naive models. We handle it with an ingestion layer that tolerates messy sources, a modelled warehouse with tested transformations, and monitoring that tells you when a feed changed shape before a forecast goes wrong.",
  },
  {
    q: "Can you integrate with the POS, ERP and e-commerce platform we already run?",
    a: "Yes, and that is most of the work. We build against your existing APIs and databases rather than asking you to migrate. Where a legacy system has no usable API, we add a thin service layer around it instead of modifying it directly.",
  },
  {
    q: "How long before a retail AI project shows a return?",
    a: "A scoped pilot on one category or one region typically produces a defensible number inside eight to twelve weeks, and most engagements target payback within two quarters. If your data is not ready for that timeline, we will tell you at the assessment rather than at the retrospective.",
  },
  {
    q: "How do you handle customer data and compliance?",
    a: "Data minimisation first, then encryption in transit and at rest, role-based access, retention rules and full audit trails. We work to GDPR and PCI DSS requirements, support private and in-region deployment, and keep model decisions explainable where they affect a customer's price or credit.",
  },
];

export const finalCta = {
  title: "Create Your Retail Success Story With Our Expertise",
  subtitle:
    "We accelerate the growth of retail businesses using AI that earns its place on the shop floor.",
  buttonText: "Get Your Project Done",
  background: finalCtaImg,
};
