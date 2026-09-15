/**
 * Copy and imagery for the Finance industry page (/industries/finance).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/finance/hero.webp";
import introImg from "../assets/industries/finance/intro.webp";

import svcAccountingImg from "../assets/industries/finance/svc-accounting.webp";
import svcWealthImg from "../assets/industries/finance/svc-wealth.webp";
import svcRiskImg from "../assets/industries/finance/svc-risk.webp";
import svcTaxImg from "../assets/industries/finance/svc-tax.webp";
import svcAutomationImg from "../assets/industries/finance/svc-automation.webp";
import svcPaymentsImg from "../assets/industries/finance/svc-payments.webp";
import svcEmoneyImg from "../assets/industries/finance/svc-emoney.webp";
import svcInvestmentImg from "../assets/industries/finance/svc-investment.webp";
import svcWalletImg from "../assets/industries/finance/svc-wallet.webp";
import svcLendingImg from "../assets/industries/finance/svc-lending.webp";

import midCtaBgImg from "../assets/industries/finance/midcta-bg.webp";

import solConsultingImg from "../assets/industries/finance/sol-consulting.webp";
import solDevelopmentImg from "../assets/industries/finance/sol-development.webp";
import solAnalyticsImg from "../assets/industries/finance/sol-analytics.webp";
import solWorkflowImg from "../assets/industries/finance/sol-workflow.webp";

import stkAssetImg from "../assets/industries/finance/stk-asset.webp";
import stkAdminImg from "../assets/industries/finance/stk-admin.webp";
import stkFoundersImg from "../assets/industries/finance/stk-founders.webp";

import subBankingImg from "../assets/industries/finance/sub-banking.webp";
import subCorporateImg from "../assets/industries/finance/sub-corporate.webp";
import subInsuranceImg from "../assets/industries/finance/sub-insurance.webp";
import subFintechImg from "../assets/industries/finance/sub-fintech.webp";
import subWealthImg from "../assets/industries/finance/sub-wealth.webp";
import subCapitalImg from "../assets/industries/finance/sub-capital.webp";
import subPaymentsImg from "../assets/industries/finance/sub-payments.webp";
import subAccountingImg from "../assets/industries/finance/sub-accounting.webp";
import subLendingImg from "../assets/industries/finance/sub-lending.webp";
import subCryptoImg from "../assets/industries/finance/sub-crypto.webp";

import textureBgImg from "../assets/industries/finance/texture-bg.webp";
import buildVisualImg from "../assets/industries/finance/build-visual.webp";

import blog1Img from "../assets/industries/finance/blog-1.webp";
import blog2Img from "../assets/industries/finance/blog-2.webp";
import blog3Img from "../assets/industries/finance/blog-3.webp";
import finalCtaBgImg from "../assets/industries/finance/final-cta.webp";

export const FINANCE_SLUG = "finance";

export const hero = {
  eyebrow: "AI for the finance industry",
  titleLead: "Custom",
  titleAccent: "AI Financial Software Development",
  titleTail: "Services",
  body:
    "We build secure, scalable financial systems that streamline operations and accelerate performance. Our AI financial software development services help banks, fintechs and financial enterprises overcome inefficiencies, compliance bottlenecks and manual risk processes through intelligent automation and predictive analytics, reducing operational risk, improving accuracy and building lasting trust across every financial transaction.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "A humanoid robot lit in blue against a digital network",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "Empowering Financial Firms With Custom",
  titleAccent: "AI Financial Software Development Services",
  paragraphs: [
    "Axiomra is a custom financial software development company that helps banks, fintechs and financial enterprises transform their operations through intelligent automation and secure AI systems. As a trusted technology partner, we design and build scalable solutions that optimise decision-making, streamline risk management and ensure regulatory compliance.",
    "Our AI financial software development services leverage advanced analytics, automation and predictive modelling to enhance accuracy, prevent fraud and optimise overall performance. Each solution is crafted from the ground up with a consultative approach, so it aligns with your commercial goals, your operational realities and the market conditions you actually trade in.",
  ],
  ctaText: "Book a Free Tech Consultation",
  image: introImg,
  alt: "A finance lead reviewing performance figures on a tablet",
};

/**
 * The signal band: a decorative editorial break between the positioning copy
 * and the sourced statistics. It is the one place on the page where copy is
 * flowed around shapes rather than set in a straight column, so the lines are
 * deliberately short — the effect has to survive a re-flow, and long-form
 * prose in a wrapped measure does not.
 */
export const signal = {
  eyebrow: "Signal over noise",
  titleLead: "A Financial Platform Is Only As Good As The",
  titleAccent: "Signal It Can Act On",
  coin: { value: "<40ms", caption: "Decision budget per transaction" },
  lead:
    "Every payment, claim and trade arrives as a question the platform has milliseconds to answer. Score it, clear it, or hold it for a human. Get that budget wrong and you are choosing between a fraud loss and an abandoned checkout.",
  wedge: { value: "24/7", caption: "Continuous controls" },
  aside:
    "So we build for the answer, not the report. Models score in the request path, controls run continuously rather than at quarter end, and every decision leaves an auditable trail a regulator can follow without a data project.",
  rails: [
    { value: "Ingest", caption: "Streamed, not batched" },
    { value: "Decide", caption: "Scored in the request path" },
  ],
  manifesto:
    "Between the data coming in and the decision going out sits the part nobody sees and everybody depends on: the ledger that balances, the model that explains itself, and the control that holds when volume triples overnight.",
};

export const impact = {
  titleLead: "The Role Of AI In",
  titleAccent: "Modern Financial Operations",
  body:
    "AI financial software development services are redefining how banks, fintechs and financial institutions manage transactions, assess risk and ensure compliance. By automating high-value processes and enabling real-time data intelligence, these solutions drive smarter decisions, faster operations and stronger regulatory alignment across global financial systems.",
  stats: [
    {
      value: "85%",
      label: "of financial services firms were actively applying AI in fraud detection, IT operations and risk modelling in 2025.",
      source: "PwC — Global AI in Finance Report 2025",
    },
    {
      value: "75%",
      label: "of banks with assets over US$100 billion expect to have fully integrated AI strategies in place by 2025.",
      source: "Deloitte — Financial Services AI Outlook 2025",
    },
    {
      value: "51%",
      label: "of financial services firms in 2025 are using AI or machine learning for fraud detection and cybersecurity frameworks.",
      source: "McKinsey — AI in Banking Survey 2025",
    },
  ],
};

/**
 * The challenge rail. Each entry is a barrier finance teams hit, and the
 * platform capability we build to remove it.
 */
export const challenges = {
  eyebrow: "Overcoming key barriers in financial operations",
  titleLead: "Top Challenges In Modern",
  titleAccent: "Financial Operations",
  items: [
    {
      title: "Compliance Complexity and Regulatory Pressure",
      body:
        "Constantly evolving regulation makes it difficult for financial teams to maintain compliance across jurisdictions. Manual checks and reporting often lead to missed updates or audit delays. We build AI-driven monitoring and automated reporting frameworks that hold continuous compliance with GDPR, SOC 2, ISO 27001 and PCI DSS, reducing manual oversight and keeping the regulatory position current rather than reconstructed at quarter end.",
    },
    {
      title: "Fraud and Transaction Risk",
      body:
        "Fraud patterns change faster than rule sets can be rewritten, and a static rules engine either misses novel attacks or drowns the team in false positives. We deploy behavioural models that score transactions in real time, learn from analyst decisions and keep the review queue small enough that the genuine cases actually get investigated.",
    },
    {
      title: "Inefficient Customer Onboarding",
      body:
        "KYC and AML checks spread across disconnected vendors turn a five-minute sign-up into a five-day wait, and most of the drop-off happens before the first deposit. We build orchestrated onboarding that runs identity, sanctions and document verification in parallel, escalating only the cases that genuinely need a human.",
    },
    {
      title: "Legacy System Limitations",
      body:
        "Core systems that predate the API era cannot support real-time products, and a full replacement is rarely fundable. We wrap the core in an event-driven integration layer so new services ship at product speed while the ledger of record keeps running untouched underneath.",
    },
    {
      title: "Data Quality and Fragmentation",
      body:
        "When the same customer exists three times across four systems, every downstream number is a negotiation. We build the governed data layer: entity resolution, lineage, reconciliation controls and quality gates, so risk, finance and regulatory reporting all read from one set of figures.",
    },
    {
      title: "Manual Financial Reconciliation",
      body:
        "Month-end reconciliation consumes senior analyst time on matching rather than explaining. We automate the matching engine and surface only genuine breaks with their supporting evidence attached, moving close from a multi-week exercise to a supervised daily process.",
    },
  ],
};

/**
 * Ten product categories. Each is a card with a photo and a description.
 */
export const services = {
  eyebrow: "What finance solutions do we offer?",
  titleLead: "AI-Based Custom Financial Software Development Solutions",
  titleAccent: "For Modern Finance Challenges",
  body:
    "In today's digital economy, financial organisations need intelligent, secure and scalable systems that do more than just manage transactions. Our custom software development for finance focuses on solving the industry's toughest challenges, from data silos to compliance, with precision-built automation and AI.",
  items: [
    {
      title: "Accounting & Financial Management Software",
      body:
        "Manual bookkeeping, data duplication and reconciliation delays slow down financial operations. Our financial software development solutions automate data entry, reporting and expense tracking using AI-powered algorithms that ensure precision and compliance. The result is faster closing cycles, fewer human errors and more accurate financial forecasting.",
      image: svcAccountingImg,
      alt: "An accountant working through financial statements with a calculator",
    },
    {
      title: "Wealth Management Platform Development",
      body:
        "Managing diverse portfolios requires continuous monitoring and smart analytics. Our AI-based financial software development solutions for wealth management help advisors deliver personalised recommendations, automate client reporting and strengthen long-term relationships through data intelligence.",
      image: svcWealthImg,
      alt: "Hands stacking gold coins into rising columns",
    },
    {
      title: "Risk Management Software Development",
      body:
        "Traditional risk frameworks struggle to keep pace with complex financial data. We build AI-based risk management systems that monitor exposures in real time, flag anomalies and predict potential threats. This proactive approach strengthens fraud prevention and helps financial institutions maintain operational integrity.",
      image: svcRiskImg,
      alt: "Wooden blocks spelling the word risk stacked on a desk",
    },
    {
      title: "Tax Management Software Development",
      body:
        "Tax computation errors and delayed submissions lead to costly penalties. We develop AI-driven tax management platforms that automate calculations, detect inconsistencies and align with evolving tax regulation. This means accuracy, faster processing and reduced compliance risk.",
      image: svcTaxImg,
      alt: "A hand completing a tax return form beside a calculator",
    },
    {
      title: "Process Automation for Financial Workflows",
      body:
        "Manual workflows consume valuable time and increase the risk of human oversight. Through AI-based automation, we optimise processes like reconciliation, loan approvals and compliance checks. Our systems improve speed, scalability and operational resilience across financial functions.",
      image: svcAutomationImg,
      alt: "A trading desk of monitors showing live market charts",
    },
    {
      title: "Payment Processing System Development",
      body:
        "Inconsistent payment systems often cause transaction delays and customer dissatisfaction. We create custom payment processing platforms with secure gateways and AI-based fraud prevention tools that ensure faster, safer and more reliable payment experiences.",
      image: svcPaymentsImg,
      alt: "A contactless card payment being taken on a terminal",
    },
    {
      title: "eMoney Solutions",
      body:
        "As digital currencies and e-payments continue to grow, institutions need secure digital money management tools. Our financial software development solutions support multi-currency transactions, compliance tracking and real-time reporting for both enterprises and fintech start-ups.",
      image: svcEmoneyImg,
      alt: "A digital wallet interface open on a smartphone",
    },
    {
      title: "Investment Software Development",
      body:
        "Investment platforms often struggle to deliver real-time analytics or personalised insights. Our AI-powered investment software solutions use machine learning to surface trends, automate portfolio management and help investors make data-driven decisions with confidence.",
      image: svcInvestmentImg,
      alt: "An investor comparing charts across a tablet and laptop",
    },
    {
      title: "Digital Wallet & eWallet Development",
      body:
        "Security and scalability remain critical for e-wallet systems. We design digital wallet solutions that combine multi-layer encryption, biometric authentication and AI-driven fraud monitoring, so users get a secure, seamless and consistent experience across every device.",
      image: svcWalletImg,
      alt: "A smartphone wallet app beside a payment card",
    },
    {
      title: "Lending Platform Development",
      body:
        "Traditional lending systems are slow and prone to bias. We build AI-driven lending platforms that automate credit scoring, risk assessment and loan approvals using transparent algorithms. This improves decision accuracy and accelerates customer onboarding.",
      image: svcLendingImg,
      alt: "A lending adviser reviewing a loan application with a client",
    },
  ],
};

export const midCta = {
  eyebrow: "Ready to level up?",
  title: "Transform Your Financial Operations With AI-Powered Precision",
  body:
    "Partner with us to build secure, scalable and compliant systems that drive efficiency and growth. Schedule a consultation with our experts to explore custom financial software development solutions built around your ledger, not a template.",
  ctaText: "Get in Touch",
  background: midCtaBgImg,
};

/**
 * The "comprehensive services" fold: four alternating photo/copy rows.
 */
export const solutions = {
  eyebrow: "What types of finance apps are we experts in?",
  titleLead: "Our Custom Financial Software Development Services",
  titleAccent: "Designed For Modern Finance",
  body:
    "We provide end-to-end software development financial solutions that combine deep industry expertise with AI-driven innovation. Our approach helps financial enterprises enhance operational efficiency, reduce risk and drive smarter decision-making through scalable, secure and intelligent systems, tailored to banks, fintechs, insurers and corporate finance teams.",
  items: [
    {
      title: "AI Consulting & Strategy for Finance",
      body:
        "We work closely with stakeholders to identify automation opportunities, optimise workflows and design AI strategies aligned with business objectives. By leveraging AI insights, we help organisations improve decision-making and unlock operational efficiencies, and we will tell you plainly which processes are not worth automating yet.",
      image: solConsultingImg,
      alt: "An adviser walking clients through a financial plan",
    },
    {
      title: "AI Custom Financial Software Development",
      body:
        "Our team builds bespoke financial software solutions from scratch, addressing legacy system limitations, fragmented datasets and regulatory challenges. We ensure secure, scalable and compliant platforms for modern finance operations, delivered in increments you can put in front of a regulator.",
      image: solDevelopmentImg,
      alt: "An engineer working on platform code beside server racks",
    },
    {
      title: "Data Analytics & Business Intelligence",
      body:
        "We deliver financial software development solutions that turn complex financial data into actionable insights. Real-time dashboards, predictive analytics and reporting frameworks empower better investment, risk and operational decisions, all reading from one governed set of figures.",
      image: solAnalyticsImg,
      alt: "A laptop showing a financial analytics dashboard",
    },
    {
      title: "Intelligent Automation & Workflow Optimisation",
      body:
        "Through AI-powered automation, we streamline repetitive processes like reconciliation, approvals and reporting. This reduces errors, accelerates workflows and improves overall productivity across financial operations, with a full audit trail behind every automated decision.",
      image: solWorkflowImg,
      alt: "A robotic hand reaching into a connected data network",
    },
  ],
};

export const stakeholders = {
  eyebrow: "Whom do we build custom financial solutions for?",
  titleLead: "We Build Advanced Financial Software Solutions",
  titleAccent: "For The Following Clients",
  items: [
    {
      title: "Asset Managers and Investment Consultants",
      body:
        "Portfolio analytics, client reporting and rebalancing signals in one platform, so advice is built on live positions rather than last month's extract.",
      image: stkAssetImg,
      alt: "An asset manager reviewing positions on a tablet",
    },
    {
      title: "Financial Service Administrators and Custodians",
      body:
        "Reconciliation, corporate actions and regulatory reporting automated end to end, with exceptions routed to the person who can actually clear them.",
      image: stkAdminImg,
      alt: "Administrators reviewing custody documentation together",
    },
    {
      title: "Founders and Executives",
      body:
        "A single view of revenue, runway and risk that stands up in a board pack, refreshed continuously instead of assembled the night before.",
      image: stkFoundersImg,
      alt: "A senior executive in a modern office",
    },
  ],
};

/**
 * The marquee rail. Each sub-industry card shows its photo and label at rest,
 * and reveals the detail copy and capability list on hover or focus.
 */
export const subIndustries = {
  eyebrow: "Which finance sector do we serve?",
  titleLead: "AI Financial Software Solutions Across",
  titleAccent: "Key Finance Sub-Industries",
  body:
    "Every part of finance carries its own regulator, its own data model and its own definition of an acceptable failure. Hover any card to see what we build for it.",
  items: [
    {
      label: "Banking",
      body: "Core-adjacent platforms, real-time payments and branch-to-digital journeys, built to sit alongside a ledger you are not going to replace this year.",
      points: ["Core integration layer", "Real-time payment rails", "Digital onboarding"],
      image: subBankingImg,
      alt: "The facade of a historic bank building",
    },
    {
      label: "Corporate Finance",
      body: "Treasury visibility, cash forecasting and intercompany reconciliation joined up, so group positions are known daily rather than monthly.",
      points: ["Cash flow forecasting", "Treasury dashboards", "Intercompany matching"],
      image: subCorporateImg,
      alt: "Corporate finance towers in a city business district",
    },
    {
      label: "Insurance",
      body: "Claims triage, underwriting models and fraud scoring, with the decision rationale recorded in a form a regulator will accept.",
      points: ["Automated claims triage", "Underwriting models", "Explainable decisioning"],
      image: subInsuranceImg,
      alt: "An insurance adviser presenting a policy document",
    },
    {
      label: "Fintech",
      body: "Product-speed engineering on regulated rails: embedded finance, ledgering and the compliance surface that lets you launch without a pause.",
      points: ["Embedded finance", "Double-entry ledgering", "Regulatory reporting"],
      image: subFintechImg,
      alt: "A customer completing a payment on a smartphone",
    },
    {
      label: "Wealth Management",
      body: "Goal-based planning, portfolio analytics and personalised client reporting, generated per household rather than per template.",
      points: ["Goal-based planning", "Portfolio analytics", "Automated client reporting"],
      image: subWealthImg,
      alt: "Gold bars stacked on currency notes",
    },
    {
      label: "Capital Markets",
      body: "Low-latency market data, execution analytics and post-trade surveillance built for desks where a second of staleness is a loss.",
      points: ["Market data pipelines", "Execution analytics", "Trade surveillance"],
      image: subCapitalImg,
      alt: "A digital trading and analysis interface",
    },
    {
      label: "Payments",
      body: "Gateway orchestration, routing optimisation and chargeback automation, tuned on your own authorisation data rather than a vendor benchmark.",
      points: ["Gateway orchestration", "Smart routing", "Chargeback automation"],
      image: subPaymentsImg,
      alt: "A card payment being completed at a retail checkout",
    },
    {
      label: "Accounting & Audit",
      body: "Automated matching, anomaly detection and evidence collection, so the close is a supervised process instead of a fortnight of spreadsheets.",
      points: ["Automated matching", "Anomaly detection", "Audit evidence trails"],
      image: subAccountingImg,
      alt: "Two accountants reviewing figures on a laptop",
    },
    {
      label: "Lending & Credit",
      body: "Credit decisioning with transparent features, affordability modelling and collections prioritisation that survives a fairness review.",
      points: ["Transparent credit scoring", "Affordability modelling", "Collections prioritisation"],
      image: subLendingImg,
      alt: "A calculator and keys resting on lending paperwork",
    },
    {
      label: "Digital Assets",
      body: "Custody integrations, on-chain analytics and travel-rule compliance for institutions moving into tokenised and crypto products.",
      points: ["Custody integrations", "On-chain analytics", "Travel-rule compliance"],
      image: subCryptoImg,
      alt: "A gold bitcoin among a pile of mixed coins",
    },
  ],
};

export const benefits = {
  eyebrow: "What can you optimise with our AI-powered fintech applications?",
  titleLead: "Key Benefits Of AI-Based",
  titleAccent: "Financial Software Development Solutions",
  items: [
    {
      title: "Risk Assessment",
      body:
        "AI helps financial institutions analyse large datasets to identify potential risks faster and more accurately. This reduces human error and supports better decision-making in lending and investment.",
    },
    {
      title: "Fraud Detection",
      body:
        "AI systems track transaction patterns in real time to detect suspicious activity. This helps prevent fraud before it affects customers or the wider business.",
    },
    {
      title: "Process Automation",
      body:
        "AI automates repetitive financial tasks like data entry, reporting and reconciliation. This saves time, lowers costs and improves accuracy across workflows.",
    },
    {
      title: "Customer Insights",
      body:
        "By analysing spending habits and preferences, AI provides personalised financial advice and product recommendations. This improves customer engagement and satisfaction.",
    },
    {
      title: "Predictive Analytics",
      body:
        "AI models forecast market trends and asset performance using past and real-time data. This helps investors and institutions make informed financial decisions.",
    },
    {
      title: "Regulatory Compliance",
      body:
        "AI tools monitor compliance with changing financial regulation. They simplify reporting and reduce the risk of penalties due to human oversight.",
    },
  ],
};

export const build = {
  title: "Schedule a Consultation Call",
  body:
    "Discover how AI financial software development services can transform your operations and accelerate growth. Speak with our experts to explore tailored solutions for your business.",
  ctaText: "Hire financial software developers",
  texture: textureBgImg,
  image: buildVisualImg,
  alt: "A golden piggy bank resting on financial statements",
};

export const techStrip = {
  eyebrow: "Technologies we work with",
  titleLead: "Expertise In Advanced",
  titleAccent: "Development Technologies",
  body:
    "The same production-grade toolchain sits under every financial platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "Groq", "PaLM", "XGBoost", "LightGBM",
        "scikit-learn", "PyTorch", "TensorFlow", "SHAP", "Guardrails", "Vertex AI",
        "OpenAI Embeddings", "LangChain", "Prophet",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "FastAPI", "Django", "Go", "Java Spring", "GraphQL", "PostgreSQL",
        "MongoDB", "Redis", "Kafka", "Airflow", "dbt", "Snowflake", "ClickHouse", "TimescaleDB",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "D3.js", "TradingView Charts",
        "React Native", "Flutter", "Vite", "Radix UI",
      ],
    },
    {
      id: "cloud",
      label: "Cloud",
      items: ["AWS", "Google Cloud", "Azure", "Kubernetes", "Cloudflare", "Vault", "Terraform", "Snowflake"],
    },
    {
      id: "fintech",
      label: "Fintech & Data",
      items: ["Plaid", "Stripe", "Adyen", "Marqeta", "Modulr", "Open Banking APIs", "SWIFT", "ISO 20022", "FIX Protocol", "Bloomberg API"],
    },
    {
      id: "security",
      label: "Security & Compliance",
      items: ["PCI DSS", "SOC 2", "ISO 27001", "GDPR", "KYC / AML orchestration", "HSM & key management", "Zero-trust networking", "Penetration testing"],
    },
    {
      id: "design",
      label: "UI / UX",
      items: ["Figma", "Design Tokens", "Prototyping", "WCAG 2.2 Audits", "Usability Testing"],
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who do we work with?",
  titleLead: "Explore The Range Of",
  titleAccent: "Finance Businesses We Support",
  body:
    "We excel in custom AI-powered financial software development that stands up to a regulator, an auditor and a trading day. Whether you are launching a licensed product or modernising a core that predates the API era, we turn it into a platform your team can actually run.",
  rows: [
    {
      label: "Start-ups",
      body: "We help fintech founders get a licensed product live: a compliant ledger, an onboarding flow that converts, and the reporting a regulator will ask for on day one rather than after the first inspection.",
    },
    {
      label: "Scale-ups",
      body: "Growth exposes every manual control. We help scale-ups automate reconciliation, risk monitoring and compliance reporting, moving from spreadsheet operations to a platform that survives the next order of magnitude.",
    },
    {
      label: "Small and medium-sized businesses",
      body: "Finance teams in SMBs carry enterprise obligations with a fraction of the headcount. Our automation and analytics tooling closes that gap without an enterprise budget or a year-long rollout.",
    },
    {
      label: "Enterprises",
      body: "We partner with banks, insurers and asset managers on governed data layers, core integration and AI systems that satisfy security, model risk and procurement before they ever reach production.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Our Clients Trust Us For Top-Notch Financial Solutions",
  titleAccent: "And Exceptional Results",
  items: [
    {
      name: "Abdullah",
      role: "CEO, Navex",
      quote:
        "Commendable work by the team. They collaborated and communicated in a highly professional manner and delivered exactly what was asked in the desired time frame. Their project management and communication skills are highly appreciable.",
      rating: 5,
    },
    {
      name: "Charles Glah",
      role: "Owner, FrontOffice",
      quote:
        "They have been a trusted development partner for several months with their fully developed team and focus on AI. They helped us move forward and achieve our goal.",
      rating: 5,
    },
    {
      name: "Jawad Bhati",
      role: "CEO, Voltox",
      quote:
        "Great work was done within the required time frame and communication was really good as well. I had to follow up on questions after the project was done. These were satisfactory and in a timely manner. Highly recommend them.",
      rating: 5,
    },
  ],
};

export const showcase = {
  eyebrow: "What innovations have we delivered to businesses?",
  titleLead: "Showcasing Our",
  titleAccent: "AI Development Projects",
  body:
    "Discover our portfolio showcasing our expertise as an AI development company, delivering state-of-the-art solutions to address complex financial challenges.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why choose Axiomra?",
  titleLead: "Why Partner With Axiomra For",
  titleAccent: "Intelligent Financial Software Development",
  cards: [
    {
      icon: "Target",
      title: "We Solve Problems, Not Ship Features",
      body:
        "We do not build tools for the sake of building them. Every solution is designed to solve a specific challenge, delivering tangible results and long-term value for your business rather than another dashboard nobody opens.",
    },
    {
      icon: "Layers",
      title: "Tailored To Your Workflows And Systems",
      body:
        "Our software is built around your workflows, your controls and your core systems. By creating custom AI financial software development solutions, we ensure seamless integration and operational efficiency rather than a migration nobody asked for.",
    },
    {
      icon: "ShieldCheck",
      title: "Support That Does Not End At Delivery",
      body:
        "Our commitment does not end at delivery. We provide 60 days of technical support and team training to ensure smooth adoption of new solutions, with experience across banking, fintech, insurance, corporate finance and asset management.",
    },
  ],
  stats: [
    { value: "205+", label: "Projects Delivered" },
    { value: "5+", label: "Valuable Partnerships" },
    { value: "20+", label: "Countries Served" },
    { value: "20+", label: "Tech Experts" },
  ],
};

export const blogs = {
  eyebrow: "What can our expertise teach you?",
  title: "Explore Insights On AI And Financial Innovation",
  body:
    "Explore our knowledge hub to stay updated on the latest financial technology innovations, AI adoption and best practices in software development for finance.",
  posts: [
    {
      title: "AI In Banking And Finance: Where It Actually Pays Back",
      tag: "Banking",
      image: blog1Img,
      alt: "Glowing blue digital code filling a dark screen",
    },
    {
      title: "Top 13 Financial Software Development Companies In 2026",
      tag: "Market",
      image: blog2Img,
      alt: "An abstract blue and teal circuit pattern",
    },
    {
      title: "Legacy Modernisation In Banking: An Eight-Pillar Playbook For CTOs",
      tag: "Architecture",
      image: blog3Img,
      alt: "A futuristic metallic hexagonal lattice",
    },
  ],
};

export const faqs = [
  {
    q: "How can AI financial software development services improve banking and fintech operations?",
    a: "By moving the slow parts of the operation off human hands: transaction monitoring, reconciliation, document verification and regulatory reporting. The gain is not only speed. When a control runs continuously rather than at month end, the exception surfaces while it is still cheap to fix.",
  },
  {
    q: "Can a finance software development company help reduce fraud and chargebacks?",
    a: "Yes. Behavioural scoring on live transaction data catches patterns a static rule set misses, and feeding analyst decisions back into the model keeps the false-positive rate from swallowing the review team. On chargebacks, the win is usually evidence automation: assembling the response pack automatically rather than reconstructing it by hand.",
  },
  {
    q: "What solutions exist to reduce customer onboarding friction?",
    a: "Orchestration. Identity, sanctions screening, document verification and affordability checks run in parallel against multiple providers, with automatic fallback when one fails, and only genuinely ambiguous cases escalate to manual review. Most of the multi-day wait in a typical onboarding flow is queueing, not checking.",
  },
  {
    q: "How can accounting processes be automated for SMEs?",
    a: "Bank feed ingestion, rules-based categorisation with a model handling the long tail, automated matching against invoices, and exception queues for what genuinely does not tie out. For most SME finance functions that removes the bulk of the manual work without replacing the accounting package.",
  },
  {
    q: "How do AI financial software development services reduce IT failures and outages?",
    a: "Mostly through architecture rather than AI: isolating the new services from the core, making integrations event-driven and idempotent, and instrumenting everything so a degradation is visible before it is an incident. Anomaly detection on telemetry then shortens the time to diagnose.",
  },
  {
    q: "How can data quality issues be resolved in finance systems?",
    a: "With entity resolution across source systems, enforced lineage, reconciliation controls between the ledger and every downstream store, and quality gates that refuse to publish a broken figure. The hard part is governance, not tooling, so we design the ownership model alongside the pipeline.",
  },
  {
    q: "Can payment reconciliation be automated for better visibility?",
    a: "Yes, and it is one of the highest-return automations in finance. An automated matching engine handles the clean majority, and the team works a short, evidenced exception queue instead of a spreadsheet. Daily reconciliation then becomes realistic rather than aspirational.",
  },
  {
    q: "How do AI financial software development services strengthen cybersecurity?",
    a: "Zero-trust networking, hardware-backed key management, least-privilege access and continuous control monitoring do the structural work. AI contributes on detection: behavioural analytics on access and transaction telemetry, flagging what does not fit the established pattern.",
  },
  {
    q: "Can fintech scalability issues be resolved with custom software?",
    a: "Usually, yes, though the fix is rarely a rewrite. Isolating the hot paths, moving to event-driven processing and putting a proper ledger under the product handles most scaling walls. We will tell you honestly when the constraint is the vendor core rather than your code.",
  },
  {
    q: "How much does it cost to develop custom financial software?",
    a: "It depends on the regulatory surface, the state of your data and how much of the core you need to integrate with. A scoped pilot is the fastest route to a real number. Book a free session and we will size it honestly, including what we would not build.",
  },
];

export const finalCta = {
  title: "Get Your Free AI Financial Software Consultation",
  subtitle:
    "Talk to our experts and discover how custom AI financial software development services can streamline your operations, reduce risk and accelerate growth.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
