/**
 * Copy and imagery for the Insurance industry page (/industries/insurance).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/insurance/hero.webp";
import introImg from "../assets/industries/insurance/intro.webp";

import chainQuoteImg from "../assets/industries/insurance/chain-quote.webp";
import chainUnderwritingImg from "../assets/industries/insurance/chain-underwriting.webp";
import chainPolicyImg from "../assets/industries/insurance/chain-policy.webp";
import chainFnolImg from "../assets/industries/insurance/chain-fnol.webp";
import chainAssessmentImg from "../assets/industries/insurance/chain-assessment.webp";
import chainFraudImg from "../assets/industries/insurance/chain-fraud.webp";
import chainRecoveryImg from "../assets/industries/insurance/chain-recovery.webp";
import chainServiceImg from "../assets/industries/insurance/chain-service.webp";

import midCtaBgImg from "../assets/industries/insurance/midcta-bg.webp";

import solConsultingImg from "../assets/industries/insurance/sol-consulting.webp";
import solDevelopmentImg from "../assets/industries/insurance/sol-development.webp";
import solAnalyticsImg from "../assets/industries/insurance/sol-analytics.webp";
import solAutomationImg from "../assets/industries/insurance/sol-automation.webp";

import stkBrokerImg from "../assets/industries/insurance/stk-broker.webp";
import stkUnderwriterImg from "../assets/industries/insurance/stk-underwriter.webp";
import stkAdjusterImg from "../assets/industries/insurance/stk-adjuster.webp";
import stkActuaryImg from "../assets/industries/insurance/stk-actuary.webp";
import stkFounderImg from "../assets/industries/insurance/stk-founder.webp";
import stkExecImg from "../assets/industries/insurance/stk-exec.webp";

import lineAutoImg from "../assets/industries/insurance/line-auto.webp";
import linePropertyImg from "../assets/industries/insurance/line-property.webp";
import lineLifeImg from "../assets/industries/insurance/line-life.webp";
import lineHealthImg from "../assets/industries/insurance/line-health.webp";
import lineCommercialImg from "../assets/industries/insurance/line-commercial.webp";
import lineTravelImg from "../assets/industries/insurance/line-travel.webp";
import lineCyberImg from "../assets/industries/insurance/line-cyber.webp";
import lineMarineImg from "../assets/industries/insurance/line-marine.webp";

import textureBgImg from "../assets/industries/insurance/texture-bg.webp";
import buildVisualImg from "../assets/industries/insurance/build-visual.webp";

import blog1Img from "../assets/industries/insurance/blog-1.webp";
import blog2Img from "../assets/industries/insurance/blog-2.webp";
import blog3Img from "../assets/industries/insurance/blog-3.webp";

import finalCtaBgImg from "../assets/industries/insurance/final-cta.webp";

export const hero = {
  eyebrow: "AI for Insurance",
  titleLead: "Custom AI Insurance Software",
  titleAccent: "Development Services",
  titleTail: "For Modern Carriers",
  body:
    "We build the systems that decide faster and pay sooner: straight-through underwriting, automated claims triage, fraud scoring that survives a regulator's question and policy administration that does not depend on a spreadsheet. Every model ships with the rationale attached, because in insurance an unexplainable decision is not a decision.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "An insurance professional working across live risk data on a tablet",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "Cover That Settles At The Speed Of",
  titleAccent: "Custom AI Insurance Software",
  paragraphs: [
    "Axiomra is a custom insurance software development company working with carriers, MGAs, brokers and insurtechs on the parts of the business that decide margin: how a risk is priced, how a claim is triaged and how much of either still needs a human. We design and build the platforms that carry those decisions end to end, on top of the policy administration system you already run.",
    "Our AI insurance software development services pair document intelligence, behavioural fraud models and portfolio analytics with the governance layer a supervisor will ask for: feature lineage, challenger models, bias testing and a written reason for every automated outcome. The result is a book you can price with confidence and a claims queue your adjusters can actually clear.",
  ],
  ctaText: "Book a free tech consultation",
  image: introImg,
  alt: "An insurance adviser walking a client through their policy schedule",
};

export const impact = {
  titleLead: "The Role Of AI In",
  titleAccent: "Modern Insurance Operations",
  body:
    "Insurance was always a data business; what changed is that the data now arrives faster than a manual process can read it. Telematics, imagery, medical records and open claims feeds only pay back when something can act on them in the moment — which is what AI insurance software development services are actually for.",
  stats: [
    {
      value: "34%",
      label:
        "of an average insurer's operating cost sits in underwriting, claims handling and policy servicing — the three processes automation reaches first.",
      source: "McKinsey — Insurance Productivity Benchmark",
    },
    {
      value: "84%",
      label:
        "of carriers name claims automation and fraud analytics as their highest-priority AI investments for the next two years.",
      source: "Deloitte — Global Insurance Outlook",
    },
    {
      value: "7%",
      label:
        "of gross written premium is lost to claims leakage and undetected fraud across a typical general insurance book.",
      source: "Insurance Europe — Fraud & Leakage Estimates",
    },
  ],
};

/** The pledge band. Short, decorative, and the only place shape-outside runs. */
export const pledge = {
  eyebrow: "What we actually promise",
  lines: [
    "Every automated decision arrives with its reason attached.",
    "Every model is tested for drift and for bias before it prices a risk.",
    "Every claim your team still touches is one the machine could not justify closing alone.",
  ],
  footnote: "That is the whole contract. Everything below is how we build it.",
};

/**
 * The challenge rail. Each entry is a barrier insurance teams hit, and the
 * platform capability we build to remove it.
 */
export const challenges = {
  eyebrow: "Overcoming key barriers in insurance operations",
  titleLead: "Operational Challenges We Solve With",
  titleAccent: "Simple, Secure AI",
  items: [
    {
      title: "Claims cycle times measured in weeks",
      body:
        "First notice of loss arrives as a phone call, a form and a folder of photographs, and then waits for an adjuster with capacity. We build intake that reads the documents and imagery on arrival, scores severity and complexity, settles the clean low-value claims straight through and routes the rest to the adjuster whose caseload and licence actually fit. The queue stops being first-in-first-out and starts being worst-first.",
    },
    {
      title: "Fraud detection that only catches yesterday's pattern",
      body:
        "A static rule set flags the schemes it was written for and floods the SIU with false positives on everything else. We deploy network and behavioural models that score a claim against the claimant, the repairer, the medical provider and the ring behind them — then feed every investigator decision back into the model, so the hit rate rises instead of the queue.",
    },
    {
      title: "Underwriting bottlenecked on manual review",
      body:
        "Submissions land as PDFs, spreadsheets and broker emails, and a qualified underwriter spends the morning retyping them. We build ingestion that extracts, normalises and enriches the submission automatically, applies appetite rules and hands the underwriter a priced, triaged risk with the exposures already flagged. The judgement stays human; the data entry does not.",
    },
    {
      title: "Pricing built on stale tables",
      body:
        "Rating factors refreshed annually cannot see a hardening market or a deteriorating segment until the loss ratio says so. We build the analytics layer that monitors experience continuously, surfaces segment drift while it is still small and lets the actuarial team test a rate change against the live book before it is filed.",
    },
    {
      title: "Policy administration that blocks every new product",
      body:
        "When a product change needs a core release, the roadmap is set by the vendor, not the market. We wrap the policy admin system in an event-driven configuration and integration layer so new covers, endorsements and distribution channels ship at product speed while the system of record keeps running untouched underneath.",
    },
    {
      title: "Regulatory and conduct exposure on automated decisions",
      body:
        "Automated pricing and claims decisions attract scrutiny on fairness, explainability and data use. We build the governance surface alongside the model: feature lineage, proxy-variable testing, challenger comparisons, decision reasons stored per outcome and an audit export a supervisor can read without our help.",
    },
    {
      title: "Customer service running on hold music",
      body:
        "Most policyholder contact is status chasing that nobody enjoys on either end. We build assistants grounded in the policy wording and the live claim record — so they answer from the schedule rather than a guess, and escalate the moment the question turns into advice.",
    },
  ],
};

/**
 * The value chain. Eight stages, each a card with a photo, matching the way
 * an insurance operation is actually organised.
 */
export const valueChain = {
  eyebrow: "What insurance solutions do we offer?",
  titleLead: "How We Deliver Custom AI Insurance Solutions",
  titleAccent: "Across The Value Chain",
  body:
    "We build across the whole policy lifecycle rather than dropping a model into one step of it. Each stage below is a system we have shipped: integrated with the core, governed from day one and measured on the number it was meant to move.",
  items: [
    {
      title: "Quote, Bind & Digital Distribution",
      body:
        "Embedded and direct quote journeys that price in real time, pre-fill from third-party data and bind without a callback. Broker and aggregator channels run off the same rating service, so a rate change lands everywhere at once.",
      metric: "Quote-to-bind in one session",
      image: chainQuoteImg,
      alt: "A customer comparing insurance quotes on a laptop",
    },
    {
      title: "AI-Assisted Underwriting & Risk Selection",
      body:
        "Submission ingestion that reads broker packs, schedules and loss runs, enriches them with exposure data and applies appetite automatically. Underwriters open a triaged risk, not a mailbox.",
      metric: "Straight-through on clean risks",
      image: chainUnderwritingImg,
      alt: "An underwriter reviewing a submission pack at their desk",
    },
    {
      title: "Policy Administration & Servicing",
      body:
        "Configuration-driven products, endorsements and renewals sitting over your system of record, with an event layer that keeps every downstream service — billing, documents, reporting — in step without a nightly batch.",
      metric: "New product without a core release",
      image: chainPolicyImg,
      alt: "Organised policy documentation in a modern office",
    },
    {
      title: "FNOL Intake & Claims Triage",
      body:
        "Loss notification through any channel, with document and image understanding on arrival. Severity, complexity and coverage questions are scored before a human opens the file, and low-complexity claims settle straight through.",
      metric: "Worst-first, not first-in-first-out",
      image: chainFnolImg,
      alt: "A driver photographing vehicle damage to report a claim",
    },
    {
      title: "Damage Assessment & Estimating",
      body:
        "Computer vision on claim imagery producing a first estimate and a repair-versus-total call, benchmarked against your own historical settlements rather than a vendor's national average.",
      metric: "Consistent estimates across adjusters",
      image: chainAssessmentImg,
      alt: "An assessor inspecting property damage on site",
    },
    {
      title: "Fraud, SIU & Claims Integrity",
      body:
        "Network analytics across claimants, repairers, providers and devices, with behavioural scoring at intake and at payment. Investigators get ranked referrals with the evidence assembled, not a list of rule hits.",
      metric: "Higher SIU hit rate, shorter queue",
      image: chainFraudImg,
      alt: "An analyst monitoring fraud detection dashboards",
    },
    {
      title: "Recovery, Subrogation & Litigation",
      body:
        "Automatic identification of recovery potential at first notice, document assembly for demand packs, and litigation-risk scoring so reserves and settlement authority reflect the actual exposure.",
      metric: "Recovery spotted at FNOL, not at close",
      image: chainRecoveryImg,
      alt: "Legal counsel reviewing a recovery file",
    },
    {
      title: "Policyholder Service & Retention",
      body:
        "Assistants grounded in the policy wording and live claim state, plus renewal and lapse models that tell the retention team which policyholder is worth a call this week.",
      metric: "Fewer status calls, better renewals",
      image: chainServiceImg,
      alt: "A service agent supporting a policyholder by phone",
    },
  ],
};

export const midCta = {
  eyebrow: "Ready to level up?",
  title: "Settle Faster, Price Sharper, Explain Everything",
  body:
    "Bring us the process that costs you the most — the claims backlog, the referral queue, the submission mailbox — and we will scope what automation realistically moves, and what it will not. No pilot theatre.",
  ctaText: "Get in touch",
  background: midCtaBgImg,
};

/**
 * The engagement fold: four alternating photo/copy rows describing how we
 * actually work rather than what we sell.
 */
export const solutions = {
  eyebrow: "What kinds of insurance systems do we build?",
  titleLead: "Our Custom Insurance Software Development Services",
  titleAccent: "& AI Automation",
  body:
    "End-to-end delivery, from the first workshop to the model monitoring dashboard your risk function signs off on. We work alongside your underwriting, claims, actuarial and compliance teams rather than around them.",
  items: [
    {
      title: "AI Consulting & Insurance Automation Strategy",
      body:
        "We map the policy lifecycle against where your cost and leakage actually sit, then rank the automation candidates by return rather than by how demonstrable they are. Expect us to name the processes that are not worth automating yet — usually the ones with the prettiest demos.",
      image: solConsultingImg,
      alt: "Consultants mapping an insurance process on a whiteboard",
    },
    {
      title: "Custom Insurance Platform Engineering",
      body:
        "Underwriting workbenches, claims platforms, broker portals and embedded distribution built to sit alongside Guidewire, Duck Creek, Sapiens or a legacy core you are not replacing this year. Event-driven, idempotent integrations, delivered in increments you can put in front of a regulator.",
      image: solDevelopmentImg,
      alt: "Engineers building an insurance platform across multiple screens",
    },
    {
      title: "Portfolio Analytics & Actuarial Intelligence",
      body:
        "Governed data on top of policy, claims and third-party feeds, with loss-ratio monitoring, reserve analytics and segment drift detection. One set of figures that underwriting, actuarial and finance all read from, so the pricing conversation stops being a reconciliation.",
      image: solAnalyticsImg,
      alt: "An analyst reviewing portfolio performance dashboards",
    },
    {
      title: "Intelligent Document & Workflow Automation",
      body:
        "Document understanding across submissions, medical records, loss runs and claim evidence, wired into workflows with human-in-the-loop checkpoints where the stakes justify one. Every automated step writes its own audit trail.",
      image: solAutomationImg,
      alt: "Automated document processing in an insurance workflow",
    },
  ],
};

export const stakeholders = {
  eyebrow: "Whom do we build insurance software for?",
  titleLead: "We Build Software For Insurance Leaders Driving",
  titleAccent: "Claims, Underwriting And Risk Transformation",
  items: [
    {
      title: "Brokers & MGAs",
      body:
        "Submission workbenches, delegated authority reporting and bordereaux automation, so binder compliance stops being a month-end spreadsheet exercise.",
      image: stkBrokerImg,
      alt: "An insurance broker working with a client",
    },
    {
      title: "Underwriting Leaders",
      body:
        "Triaged submissions, appetite rules in one place and portfolio exposure visible before the quarter closes rather than after it.",
      image: stkUnderwriterImg,
      alt: "An underwriting lead reviewing portfolio exposure",
    },
    {
      title: "Claims & SIU Directors",
      body:
        "Severity-ranked queues, straight-through settlement on clean claims and referrals that arrive with the evidence already assembled.",
      image: stkAdjusterImg,
      alt: "A claims assessor carrying out a site inspection",
    },
    {
      title: "Actuarial & Pricing Teams",
      body:
        "Governed experience data, challenger models and the ability to test a rate change against the live book before it is filed.",
      image: stkActuaryImg,
      alt: "An actuary working through experience data",
    },
    {
      title: "Insurtech Founders",
      body:
        "A compliant ledger, a rating service and the reporting a regulator asks for on day one — built to survive the first capacity partner's due diligence.",
      image: stkFounderImg,
      alt: "An insurtech founder in a modern workspace",
    },
    {
      title: "Carrier Executives",
      body:
        "One view of combined ratio, reserve adequacy and automation coverage that holds up in a board pack, refreshed continuously instead of assembled overnight.",
      image: stkExecImg,
      alt: "A carrier executive reviewing performance in a boardroom",
    },
  ],
};

/**
 * The marquee rail. Each line-of-business card shows its photo and label at
 * rest, and reveals the detail copy and capability list on hover or focus.
 */
export const lines = {
  eyebrow: "Which lines of business do we serve?",
  titleLead: "AI Insurance Solutions Across",
  titleAccent: "Every Line Of Business",
  body:
    "Every line carries its own regulator, its own data and its own definition of an acceptable loss. Hover any card to see what we build for it.",
  items: [
    {
      label: "Motor & Auto",
      body: "Telematics-based pricing, photo-first FNOL and repair-versus-total calls benchmarked on your own settlement history.",
      points: ["Telematics rating", "Photo damage estimating", "Total-loss prediction"],
      image: lineAutoImg,
      alt: "Car keys handed over at a dealership",
    },
    {
      label: "Property & Home",
      body: "Perils modelling on live geospatial data, automated inspection triage and catastrophe surge planning that holds when the queue triples overnight.",
      points: ["Geospatial perils models", "Inspection triage", "Catastrophe surge handling"],
      image: linePropertyImg,
      alt: "A model house beside a set of keys",
    },
    {
      label: "Life & Pensions",
      body: "Accelerated underwriting on medical evidence, mortality experience analytics and orphan-policy servicing that stops a book going quiet.",
      points: ["Accelerated underwriting", "Medical document intelligence", "Experience analytics"],
      image: lineLifeImg,
      alt: "Three generations of a family together",
    },
    {
      label: "Health & Protection",
      body: "Claims adjudication against policy wording, provider network analytics and pre-authorisation that answers while the patient is still in the room.",
      points: ["Automated adjudication", "Provider analytics", "Real-time pre-authorisation"],
      image: lineHealthImg,
      alt: "A clinician in consultation with a patient",
    },
    {
      label: "Commercial & SME",
      body: "Submission ingestion across broker packs, exposure aggregation by location and appetite rules applied before an underwriter opens the file.",
      points: ["Submission ingestion", "Exposure aggregation", "Appetite automation"],
      image: lineCommercialImg,
      alt: "Warehouse operations at a commercial business",
    },
    {
      label: "Travel & Assistance",
      body: "Real-time disruption feeds, automated eligibility checks and settlement for low-value claims before the policyholder has landed.",
      points: ["Disruption data feeds", "Instant eligibility", "Straight-through settlement"],
      image: lineTravelImg,
      alt: "A traveller waiting in an airport terminal",
    },
    {
      label: "Cyber & Specialty",
      body: "Attack-surface scoring at quote, exposure accumulation across a portfolio and incident-cost modelling on live threat intelligence.",
      points: ["Attack-surface scoring", "Accumulation modelling", "Incident cost analytics"],
      image: lineCyberImg,
      alt: "A digital security padlock over a network",
    },
    {
      label: "Marine & Cargo",
      body: "Voyage and route risk scoring, shipment-level exposure tracking and claims evidence assembled from carrier and IoT telemetry.",
      points: ["Route risk scoring", "Shipment exposure", "Telemetry-based evidence"],
      image: lineMarineImg,
      alt: "Container ships loading at a busy port",
    },
  ],
};

export const benefits = {
  eyebrow: "What changes once it is live?",
  titleLead: "Business Outcomes From Custom",
  titleAccent: "AI Insurance Software And Automation",
  items: [
    {
      title: "Shorter claims cycles",
      body:
        "Triage at intake and straight-through settlement on clean claims take the waiting out of the majority of files, so adjuster capacity goes to the ones that genuinely need judgement.",
    },
    {
      title: "Less leakage and fraud",
      body:
        "Behavioural and network scoring catches the schemes a rule set was never written for, and evidence assembly means referrals arrive ready to investigate rather than ready to triage again.",
    },
    {
      title: "Sharper risk selection",
      body:
        "Enriched submissions and continuously monitored experience data let underwriters see segment drift while it is still small, instead of meeting it in next year's loss ratio.",
    },
    {
      title: "Faster product launches",
      body:
        "Configuration over code, and an integration layer that isolates the core, means a new cover or channel is a product decision rather than a vendor release slot.",
    },
    {
      title: "Defensible automation",
      body:
        "Decision reasons, feature lineage, bias testing and challenger comparisons are part of the build, so an automated outcome can be explained to a policyholder, an ombudsman or a supervisor.",
    },
    {
      title: "Service that stops chasing",
      body:
        "Assistants grounded in the policy wording and the live claim record answer status questions immediately and escalate cleanly the moment a question becomes advice.",
    },
  ],
};

export const build = {
  eyebrow: "Where to start",
  title: "Plan Your Insurance AI Roadmap",
  // Three paragraphs, not one: the copy has to run past the shield's taper for
  // the shape-outside wrap to be visible at all. Shorten it and the float
  // degrades to an ordinary right-aligned image.
  paragraphs: [
    "One session, your process map, and an honest read on what automation moves and what it does not. We will leave you with a sequenced plan whether or not you build it with us.",
    "Bring the parts that hurt — the claims your adjusters argue about, the submissions that sit unread for a week, the renewals priced on instinct. We trace where the data already lives, where it is missing, and which decisions a model should be allowed near.",
    "No slide deck at the end of it. A sequenced plan, a cost range, and a plain list of the things we would leave to your people.",
  ],
  ctaText: "Hire insurance software developers",
  texture: textureBgImg,
  image: buildVisualImg,
  alt: "A team mapping a delivery plan on a whiteboard",
};

export const techStrip = {
  eyebrow: "Technologies we work with",
  titleLead: "Expertise In Advanced",
  titleAccent: "Insurance Development Technologies",
  body:
    "The same production-grade toolchain sits under every insurance platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "LayoutLM", "Donut", "Tesseract",
        "XGBoost", "LightGBM", "scikit-learn", "PyTorch", "TensorFlow", "SHAP", "Fairlearn",
        "Evidently", "LangChain", "Vertex AI",
      ],
    },
    {
      id: "vision",
      label: "Computer Vision",
      items: ["YOLO", "Segment Anything", "Detectron2", "OpenCV", "Roboflow", "Depth Anything", "EXIF forensics"],
    },
    {
      id: "backend",
      label: "Backend & Data",
      items: [
        "Node.js", "NestJS", "FastAPI", "Django", "Go", "Java Spring", "GraphQL", "PostgreSQL",
        "MongoDB", "Redis", "Kafka", "Airflow", "dbt", "Snowflake", "Databricks", "Neo4j",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "D3.js", "React Native", "Flutter", "Vite", "Radix UI"],
    },
    {
      id: "core",
      label: "Core & Integration",
      items: ["Guidewire", "Duck Creek", "Sapiens", "Majesco", "ACORD standards", "EDI bordereaux", "Open API rating services", "Policy admin adapters"],
    },
    {
      id: "cloud",
      label: "Cloud",
      items: ["AWS", "Google Cloud", "Azure", "Kubernetes", "Terraform", "Vault", "Cloudflare"],
    },
    {
      id: "governance",
      label: "Security & Governance",
      items: ["SOC 2", "ISO 27001", "GDPR", "Model risk management", "Bias & fairness testing", "Decision audit trails", "Zero-trust networking", "Penetration testing"],
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who do we work with?",
  titleLead: "Explore The Range Of",
  titleAccent: "Insurance Businesses We Support",
  body:
    "We build insurance software that stands up to a regulator, an auditor and a catastrophe week. Whether you are launching a licensed product or modernising a core that predates the API era, we turn it into a platform your team can actually run.",
  rows: [
    {
      label: "Insurtech start-ups",
      body: "We help founders get a licensed product live: a rating service, a compliant ledger, a claims flow that scales past the first surge, and the reporting a capacity partner will ask for during due diligence.",
    },
    {
      label: "MGAs and brokers",
      body: "Delegated authority runs on evidence. We automate bordereaux, binder compliance and submission handling so the carrier relationship is governed by data rather than by a monthly spreadsheet exchange.",
    },
    {
      label: "Regional carriers",
      body: "Enterprise obligations, a fraction of the enterprise headcount. Our automation and analytics tooling closes that gap without a core replacement programme or a three-year rollout.",
    },
    {
      label: "Global insurers and reinsurers",
      body: "We partner on governed data layers, core integration and AI systems that clear security, model risk and procurement before they ever reach production — and keep clearing them afterwards.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Our Clients Trust Us For Top-Notch AI Solutions",
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
    "Discover our portfolio showcasing our expertise as an AI development company, delivering state-of-the-art solutions to address complex operational challenges.",
  ctaText: "Check out our full portfolio",
};

export const partner = {
  eyebrow: "Why choose Axiomra?",
  titleLead: "Why Partner With Axiomra For",
  titleAccent: "Intelligent Insurance Software Development",
  cards: [
    {
      icon: "Target",
      title: "We solve problems, not ship features",
      body:
        "Every system is scoped against a number it has to move — cycle time, leakage, loss ratio, straight-through rate. If a piece of work cannot name its number, we will tell you rather than build it.",
    },
    {
      icon: "Layers",
      title: "Built around your core, not against it",
      body:
        "Guidewire, Duck Creek, Sapiens or a legacy core nobody wants to touch: we integrate through an event layer that isolates the system of record, so new products ship without a core release.",
    },
    {
      icon: "ShieldCheck",
      title: "Governance is part of the build",
      body:
        "Decision reasons, feature lineage, bias testing and challenger models are delivered with the model, not retrofitted when a supervisor asks. Plus 60 days of technical support and team training after go-live.",
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
  title: "Expert Perspectives On AI And Automation In Insurance",
  body:
    "Explore our knowledge hub for practical reads on claims automation, underwriting intelligence and the governance that keeps automated decisions defensible.",
  posts: [
    {
      title: "Claims Automation: Which 60% Of A Book Can Actually Settle Straight Through",
      tag: "Claims",
      image: blog1Img,
      alt: "An abstract blue field of artificial intelligence data",
    },
    {
      title: "Explainable Underwriting: Building Models A Regulator Will Accept",
      tag: "Underwriting",
      image: blog2Img,
      alt: "An abstract network of digital connections",
    },
    {
      title: "Core Modernisation Without Replacement: An Integration Playbook For Carriers",
      tag: "Architecture",
      image: blog3Img,
      alt: "A futuristic geometric technology pattern",
    },
  ],
};

export const faqs = [
  {
    q: "How do AI insurance software development services shorten claims cycle times?",
    a: "By deciding what a claim is before a human opens it. Document and image understanding at first notice produce a severity and complexity score, clean low-value claims settle straight through, and everything else is routed to the adjuster whose caseload and licence fit. The saving is mostly queueing time, not handling time.",
  },
  {
    q: "Can AI realistically reduce insurance fraud and claims leakage?",
    a: "Yes, on two fronts. Network analytics across claimants, repairers, providers and devices catches organised patterns a rule set was never written for, and behavioural scoring at payment stage catches opportunistic inflation. The bigger operational win is usually evidence assembly: referrals that arrive investigable rather than as a list of rule hits.",
  },
  {
    q: "Will an automated underwriting decision stand up to a regulator?",
    a: "Only if you build for that from the start. We ship feature lineage, proxy-variable and fairness testing, challenger model comparisons, and a stored decision reason for every outcome, with an audit export a supervisor can read unaided. Where the regulatory position is unsettled, we keep a human in the loop and say so plainly.",
  },
  {
    q: "Do we have to replace our policy administration system first?",
    a: "Almost never, and we would usually advise against leading with it. We wrap the core in an event-driven integration and configuration layer, ship the new capability against that, and leave the system of record running. Replacement, if it is still warranted afterwards, becomes a much smaller decision.",
  },
  {
    q: "How does computer vision handle damage assessment accuracy?",
    a: "It is benchmarked on your own settled claims rather than a vendor's national average, which is where most estimating tools quietly lose money. The model produces a first estimate and a repair-versus-total call with a confidence score; below the threshold the file goes to an assessor. The gain is consistency across adjusters as much as speed.",
  },
  {
    q: "What data do you need to start, and how is it protected?",
    a: "Typically policy, claims and third-party enrichment feeds for the line in scope. Work starts in an isolated environment with least-privilege access, pseudonymised where the use case allows, under SOC 2 and ISO 27001 aligned controls with GDPR data-minimisation applied. We scope the data we need rather than the data you have.",
  },
  {
    q: "How long before an insurance AI project shows a measurable result?",
    a: "A scoped claims-triage or submission-ingestion build usually shows a measurable movement within one to two quarters, because both have a clean baseline to compare against. Pricing and portfolio work takes longer to prove — the feedback loop is the experience period, and no amount of engineering shortens that.",
  },
  {
    q: "Can you work alongside our existing vendors and internal team?",
    a: "Yes, and most of our insurance work is shaped that way. We integrate with incumbent core, rating and document vendors, and we work in your delivery process rather than importing ours. Where a vendor constraint is the real blocker, we will say so instead of engineering around it indefinitely.",
  },
  {
    q: "How much does custom insurance software development cost?",
    a: "It depends on the line of business, the regulatory surface and the state of your data — the last one moves the number more than anything else. A scoped pilot is the fastest route to a real figure. Book a free session and we will size it honestly, including the parts we would not build.",
  },
];

export const finalCta = {
  title: "Start Your Insurance AI Project",
  subtitle:
    "Talk to our engineers about claims automation, underwriting intelligence or the governance layer underneath both. No sales desk in the middle.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
