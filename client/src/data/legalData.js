/**
 * Copy and imagery for the Legal industry page (/industries/legal).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import { companyStats } from "./companyStats.js";
import heroImg from "../assets/industries/legal/hero.webp";
import introImg from "../assets/industries/legal/intro.webp";
import shapePortraitImg from "../assets/industries/legal/shape-portrait.webp";

import svcDocumentsImg from "../assets/industries/legal/svc-documents.webp";
import svcPracticeImg from "../assets/industries/legal/svc-practice.webp";
import svcCaseImg from "../assets/industries/legal/svc-case.webp";
import svcCrmImg from "../assets/industries/legal/svc-crm.webp";
import svcBillingImg from "../assets/industries/legal/svc-billing.webp";
import svcEdiscoveryImg from "../assets/industries/legal/svc-ediscovery.webp";
import svcContractsImg from "../assets/industries/legal/svc-contracts.webp";
import svcAccountingImg from "../assets/industries/legal/svc-accounting.webp";
import svcComplianceImg from "../assets/industries/legal/svc-compliance.webp";
import svcAnalyticsImg from "../assets/industries/legal/svc-analytics.webp";

import midCtaBgImg from "../assets/industries/legal/midcta-bg.webp";

import solDevelopmentImg from "../assets/industries/legal/sol-development.webp";
import solConsultingImg from "../assets/industries/legal/sol-consulting.webp";
import solAppsImg from "../assets/industries/legal/sol-apps.webp";
import solIntegrationImg from "../assets/industries/legal/sol-integration.webp";
import solModerniseImg from "../assets/industries/legal/sol-modernise.webp";

import stkPartnersImg from "../assets/industries/legal/stk-partners.webp";
import stkInhouseImg from "../assets/industries/legal/stk-inhouse.webp";
import stkComplianceImg from "../assets/industries/legal/stk-compliance.webp";

import subFirmsImg from "../assets/industries/legal/sub-firms.webp";
import subCorporateImg from "../assets/industries/legal/sub-corporate.webp";
import subGovernmentImg from "../assets/industries/legal/sub-government.webp";
import subCourtsImg from "../assets/industries/legal/sub-courts.webp";
import subProvidersImg from "../assets/industries/legal/sub-providers.webp";
import subIpImg from "../assets/industries/legal/sub-ip.webp";
import subLitigationImg from "../assets/industries/legal/sub-litigation.webp";
import subRegtechImg from "../assets/industries/legal/sub-regtech.webp";
import subImmigrationImg from "../assets/industries/legal/sub-immigration.webp";
import subLegaltechImg from "../assets/industries/legal/sub-legaltech.webp";

import textureBgImg from "../assets/industries/legal/texture-bg.webp";
import buildVisualImg from "../assets/industries/legal/build-visual.webp";

import blog1Img from "../assets/industries/legal/blog-1.webp";
import blog2Img from "../assets/industries/legal/blog-2.webp";
import blog3Img from "../assets/industries/legal/blog-3.webp";
import finalCtaBgImg from "../assets/industries/legal/final-cta.webp";

export const LEGAL_SLUG = "legal";

export const hero = {
  eyebrow: "AI for the legal industry",
  titleLead: "Custom",
  titleAccent: "AI Legal Software Development",
  titleTail: "Services",
  body: "Legal work is document work, and most of it is repeatable. We build the contract, matter and client systems that read the paper, track the deadline and hold the privilege boundary, so your lawyers spend their hours on the judgement calls only they can make.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "A lawyer signing a contract across a desk",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
  // Read out beside the hero glass card.
  marks: [
    { value: "60%", label: "faster first-pass contract review" },
    { value: "0", label: "privileged records leaving your tenancy" },
  ],
};

export const intro = {
  titleLead: "Building The Future Of Legal Workflows Through",
  titleAccent: "Custom AI Legal Software Development",
  paragraphs: [
    "Axiomra is a custom legal software development company that turns document-heavy legal operations into governed, searchable systems. We design and build platforms for law firms, in-house legal departments, alternative legal service providers and compliance teams that need modern tooling without putting client confidentiality at risk.",
    "Our AI legal software development services cover contract lifecycle management, matter and case tracking, document automation, eDiscovery support and predictive analytics. Every system is built around an evidence trail: who saw what, which clause the model flagged, and why, so a partner, a regulator or an opposing counsel can all be answered from the same record.",
  ],
  ctaText: "Book a Free Tech Consultation",
  image: introImg,
  alt: "A Lady Justice figurine on a desk in a law office",
};

export const impact = {
  titleLead: "The Role Of AI In",
  titleAccent: "Modern Legal Operations",
  body: "AI legal software is changing how firms and corporate legal teams handle documents, contracts and compliance. By taking the time-intensive first pass off human hands, these systems shorten turnaround, surface risk earlier and leave the lawyer with the part of the work that actually needs a lawyer.",
  stats: [
    {
      value: "79%",
      label: "of legal professionals now use AI tools in some part of their day-to-day work.",
      source: "Clio, Legal Trends Report 2025",
    },
    {
      value: "74%",
      label:
        "of hourly billable work in a typical practice is automatable with current technology.",
      source: "Thomson Reuters, Future of Professionals 2025",
    },
    {
      value: "5hrs",
      label:
        "per lawyer per week freed by AI assistance, the equivalent of an extra fee earner in a small firm.",
      source: "Thomson Reuters, Future of Professionals 2025",
    },
  ],
};

/**
 * The challenge rail. Each entry is a barrier legal teams hit, and the
 * platform capability we build to remove it.
 */
export const challenges = {
  eyebrow: "Overcoming key barriers in the legal industry",
  titleLead: "Challenges Slowing Down Digital",
  titleAccent: "Transformation In Legal Operations",
  items: [
    {
      title: "Fragmented Data and Document Systems",
      body: "Case files live across a document management system, three shared drives and a partner's inbox, so the first hour of any matter is spent finding things. We unify those sources behind one governed index with full-text and semantic search, version history and per-matter permissions, so the document you need is one query away and the copy you open is the current one.",
    },
    {
      title: "Inefficient Case and Workflow Management",
      body: "Matter progress tracked in spreadsheets means nobody can answer where a case stands without asking three people. We build matter management with stage gates, task ownership, limitation and filing deadlines, and automatic escalation when a date is at risk, so status is a dashboard rather than a round of emails.",
    },
    {
      title: "Compliance and Risk Management Gaps",
      body: "Conflicts checks, retention schedules and regulatory obligations are usually enforced by memory. We automate the controls: conflict screening at intake, information barriers that hold at the document level, retention and disposal on a clock, and an audit log that stands up under review rather than being reconstructed after the fact.",
    },
    {
      title: "Time-Consuming Contract Review",
      body: "Manual first-pass review is the single largest sink of billable-grade time in most practices. We deploy clause extraction and deviation scoring trained on your own playbook, so the routine agreement comes back marked against your standard positions, with the fallback language already proposed and the outliers flagged for a human.",
    },
    {
      title: "Lack of Business Intelligence",
      body: "Firms know their realisation rate and almost nothing else: which matter types run over, which clients are unprofitable, which associates carry the unbillable load. We build the reporting layer over time, billing and matter data so pricing, staffing and practice-group decisions are made on evidence.",
    },
    {
      title: "Disconnected Client Communication",
      body: "Clients chase updates because they have no window into their own matter. We build secure client portals with matter status, document exchange, e-signature and billing visibility, which cuts the status-chasing calls and makes the fee note far less contentious.",
    },
    {
      title: "Security and Data Privacy Concerns",
      body: "Privilege is not a feature flag. We design for it: tenant isolation, encryption in transit and at rest, no client data used for model training, retrieval scoped to the matter, and deployment options that keep privileged content inside your own cloud boundary when the engagement demands it.",
    },
  ],
};

/**
 * Ten product categories. Each is a card with a photo and a description.
 */
export const services = {
  eyebrow: "What solution do we offer?",
  titleLead: "Transforming Legal Operations With",
  titleAccent: "AI-Powered Software Solutions",
  body: "Modern law firms and corporate legal teams are adopting AI to reduce inefficiency, strengthen compliance and take back control of daily operations. We build tailored legal solutions that automate the routine work, simplify data management and improve decision-making at every stage of legal service delivery.",
  items: [
    {
      title: "Document Management & Automation Systems",
      body: "We build systems that help legal teams organise, store and retrieve legal papers without guesswork. Secure access, automated version control and workflow automation for drafting, reviewing and approving documents cut human error and speed up matter preparation. Templates assemble from matter data rather than from a previous client's file.",
      image: svcDocumentsImg,
      alt: "Legal papers filed in a brown folder",
    },
    {
      title: "Legal Practice Management Software",
      body: "Our practice management systems centralise scheduling, matter tracking and task assignment so a team knows who owns what. Automating the administrative duties lets fee earners focus on client service instead of manual record-keeping, and gives partners transparent oversight of capacity and workload.",
      image: svcPracticeImg,
      alt: "Colleagues working together in a law office",
    },
    {
      title: "Legal Case Management Software",
      body: "We develop case management platforms that track litigation from intake to closure. Case files, chronologies, evidence repositories and court deadlines consolidate into one secure hub, so counsel gets faster access to the record and nothing turns on a diary entry somebody forgot to make.",
      image: svcCaseImg,
      alt: "A casebook and binder open on a desk",
    },
    {
      title: "Custom Legal CRM Solutions",
      body: "We create CRMs built for legal intake: lead capture, conflict pre-screening, engagement letters and matter history in one place. Automated communication and data-driven insight mean a prospective client is answered in hours, not days, and the intake record becomes the start of the matter file rather than a separate silo.",
      image: svcCrmImg,
      alt: "A lawyer talking a client through their options",
    },
    {
      title: "Billing & Time Capture Systems",
      body: "Our billing software automates invoice generation, passive time capture and payment management. It eliminates manual accounting errors, enforces client billing guidelines and e-billing formats such as LEDES before the invoice goes out, and shortens the cycle from work done to cash collected.",
      image: svcBillingImg,
      alt: "An accountant working through legal invoices with a calculator",
    },
    {
      title: "Legal Hold & eDiscovery Support",
      body: "We design solutions that simplify data preservation for litigation holds. Relevant data is identified, secured and monitored throughout proceedings, with defensible custodian notifications and audit trails. Predictive coding and clustering cut the review population before it reaches an expensive review team.",
      image: svcEdiscoveryImg,
      alt: "Network switch ports in a data centre rack",
    },
    {
      title: "Contract Lifecycle Management",
      body: "From request and drafting to negotiation, signature and renewal, we build CLM that holds the whole lifecycle. Clause libraries, playbook-based review, obligation tracking and renewal alerts turn a contract archive into a live register of what your organisation has actually committed to.",
      image: svcContractsImg,
      alt: "A person signing a contract with a fountain pen",
    },
    {
      title: "Legal Accounting Software",
      body: "We develop accounting platforms built for legal practice, including client and office account separation, trust accounting rules, disbursement tracking and financial reporting. These systems automate bookkeeping while keeping the practice compliant with the accounts rules it is audited against.",
      image: svcAccountingImg,
      alt: "Two colleagues reviewing figures on an invoice",
    },
    {
      title: "Legal Compliance Software",
      body: "Our compliance solutions automate monitoring of regulatory updates and legal obligations for enterprises and firms. Built-in risk assessment, attestation workflows and reporting dashboards keep teams ahead of compliance deadlines and reduce the risk of penalties and governance findings.",
      image: svcComplianceImg,
      alt: "A compliance officer working through a checklist on a clipboard",
    },
    {
      title: "Legal Analytics Software",
      body: "We design AI-powered analytics that turn matter, billing and outcome data into insight partners can act on. Predictive analytics assist with resource planning, matter pricing and settlement posture, so strategy is argued from the firm's own record rather than from instinct.",
      image: svcAnalyticsImg,
      alt: "A analyst reviewing performance charts on a tablet",
    },
  ],
};

export const midCta = {
  eyebrow: "Ready to level up?",
  title: "Bring Us The Legal Workflow You Want Fixed",
  body: "We help law firms and legal departments modernise their operations through custom-built, AI-powered software designed for accuracy, compliance and agility. Our team turns complex workflows into efficient, data-driven processes that drive measurable results.",
  ctaText: "Get in Touch",
  background: midCtaBgImg,
};

/**
 * The decorative doctrine band: the only section whose copy is flowed around
 * shapes. Deliberately short; see the note in LegalDoctrine.jsx.
 */
export const doctrine = {
  eyebrow: "The principle we build on",
  titleLead: "Automate The Reading.",
  titleAccent: "Never The Judgement.",
  seal: { value: "1st pass", caption: "Machine read, human signed" },
  lead: "A legal system earns its place by removing the first pass, not the lawyer. The model reads the bundle, marks the clause against your playbook and proposes the fallback. What it never does is decide.",
  gavel: { value: "Cited", caption: "Every answer traced to source" },
  aside:
    "So we build for the record, not the demo. Every output carries the paragraph it came from, the confidence it holds and the reviewer who signed it off. That trail is what makes the automation defensible, and defensibility is what makes it usable on a live matter.",
  pillars: [
    { value: "Privilege", caption: "Held at the document" },
    { value: "Retention", caption: "Enforced on a clock" },
  ],
  manifesto:
    "Between the paper coming in and the advice going out sits the part nobody sees and everybody relies on: the index that finds it, the control that holds it, and the audit trail that survives the question of how you arrived at the answer.",
  portrait: shapePortraitImg,
  portraitAlt: "A barrister in traditional court robes",
};

/**
 * The services fold: five alternating photo/copy rows.
 */
export const solutions = {
  eyebrow: "What types of legal solutions are we experts in?",
  titleLead: "Legal Software Development Services",
  titleAccent: "Tailored For Modern Law Firms",
  body: "We help law firms, legal departments and legal-tech enterprises build AI-driven systems that improve efficiency, ensure compliance and scale with confidence. Our legal software development services are designed to overcome integration complexity, security constraints and the barriers to AI adoption across modern legal operations.",
  items: [
    {
      title: "Custom Legal Software Development",
      body: "We design and build enterprise legal software that simplifies workflows and strengthens data management. Our custom solutions help firms automate repetitive tasks, reduce document processing time and improve client service quality, with the privilege and retention model designed in from the first sprint rather than retrofitted before launch.",
      image: solDevelopmentImg,
      alt: "Code running across a developer's screen",
    },
    {
      title: "Legal Software Consulting",
      body: "We provide consulting to help firms navigate digital transformation and select the right legal tech. Our consultants analyse current workflows, identify automation opportunities and recommend an AI integration strategy that fits the infrastructure you already run. We will also tell you plainly which processes are not worth automating yet.",
      image: solConsultingImg,
      alt: "Colleagues shaking hands across a table in a law office",
    },
    {
      title: "Legal App Development",
      body: "We build secure, intuitive mobile and web applications that bring agility to legal operations. These apps simplify client communication, matter tracking and document sharing while keeping legal data management inside the controls your firm is accountable for, so counsel has access to the file without carrying it on a laptop.",
      image: solAppsImg,
      alt: "A tablet showing a secure legal application",
    },
    {
      title: "Legal Software Integration",
      body: "Our team specialises in integrating AI with legacy legal systems to unify data and eliminate silos. We connect CRMs, document management tools such as iManage and NetDocuments, billing systems and analytics platforms into one coherent ecosystem, which minimises manual re-entry and improves firm-wide visibility.",
      image: solIntegrationImg,
      alt: "A futuristic interface projected over a laptop keyboard",
    },
    {
      title: "Legal Software Modernisation",
      body: "We modernise outdated systems into scalable, AI-ready legal platforms. Improving performance, security and automation capability lets firms overcome legacy barriers without a disruptive rip-and-replace. The migration runs in stages, with the old system authoritative until the new one has proved itself on real matters.",
      image: solModerniseImg,
      alt: "A modern workstation beside data-centre server racks",
    },
  ],
};

export const stakeholders = {
  eyebrow: "Who we build for in law",
  titleLead: "Every Legal",
  titleAccent: "Stakeholder We Partner With",
  items: [
    {
      title: "Lawyers & Legal Partners",
      body: "Matter status, document search and drafting assistance in one place, so a fee earner opens a case file instead of assembling one.",
      image: stkPartnersImg,
      alt: "A lawyer working at their desk",
    },
    {
      title: "In-House Legal Teams",
      body: "Contract intake, self-service templates and obligation tracking, so the legal function stops being the bottleneck the business routes around.",
      image: stkInhouseImg,
      alt: "An in-house legal team reviewing documents together",
    },
    {
      title: "Compliance & Risk Officers",
      body: "Continuous control monitoring, attestation workflows and an evidence trail that is ready for an audit rather than assembled for one.",
      image: stkComplianceImg,
      alt: "A compliance officer in a professional setting",
    },
  ],
};

/**
 * The marquee rail. Each sector card shows its photo and label at rest, and
 * reveals the detail copy and capability list on hover or focus.
 */
export const subIndustries = {
  eyebrow: "Which legal sector do we serve?",
  titleLead: "AI-Powered Legal Solutions",
  titleAccent: "For Every Legal Sector",
  body: "Every part of the legal market carries its own regulator, its own file structure and its own definition of an acceptable risk. Hover any card to see what we build for it.",
  items: [
    {
      label: "Law Firms & Chambers",
      body: "Practice, matter and document systems for firms that bill by the hour and cannot afford a tool the fee earners refuse to open.",
      points: ["Matter management", "Document automation", "Time and billing capture"],
      image: subFirmsImg,
      alt: "Colleagues at a table with a gavel in a law office",
    },
    {
      label: "Corporate Legal Departments",
      body: "Contract intake, self-service playbooks and obligation registers, so the business gets an answer without a queue at the legal inbox.",
      points: ["Contract lifecycle management", "Legal service desk", "Obligation tracking"],
      image: subCorporateImg,
      alt: "In-house counsel working in a corporate office",
    },
    {
      label: "Government & Public Sector",
      body: "Case and records systems built to public procurement, accessibility and records-retention standards, with full disclosure trails.",
      points: ["Statutory case handling", "Records retention", "FOI and disclosure workflows"],
      image: subGovernmentImg,
      alt: "The facade of a historic courthouse building",
    },
    {
      label: "Courts & Judiciary",
      body: "Docket scheduling, e-filing intake and hearing management, designed around listing realities rather than a generic workflow engine.",
      points: ["E-filing intake", "Docket and listing", "Hearing bundles"],
      image: subCourtsImg,
      alt: "A statue of Lady Justice at a courthouse entrance",
    },
    {
      label: "Legal Service Providers",
      body: "Throughput tooling for ALSPs and LPOs: review orchestration, quality sampling and per-client SLA reporting that survives an audit.",
      points: ["Review orchestration", "Quality sampling", "SLA reporting"],
      image: subProvidersImg,
      alt: "Legal service partners meeting across a desk",
    },
    {
      label: "IP & Patent Practices",
      body: "Prosecution docketing, prior-art search and renewal deadlines, where a missed date is a lost right rather than a late filing fee.",
      points: ["Prosecution docketing", "Prior-art search", "Renewal management"],
      image: subIpImg,
      alt: "A notary stamp resting on an open book",
    },
    {
      label: "Litigation & Disputes",
      body: "Chronology building, evidence linking and predictive coding, so the review population is cut before it reaches an expensive team.",
      points: ["Chronology building", "Predictive coding", "Evidence linking"],
      image: subLitigationImg,
      alt: "A judge presiding in a courtroom beside the scales of justice",
    },
    {
      label: "Compliance & RegTech",
      body: "Horizon scanning, control mapping and attestation, joined so a regulatory change lands as a task rather than as a newsletter.",
      points: ["Regulatory horizon scanning", "Control mapping", "Attestation workflows"],
      image: subRegtechImg,
      alt: "Server racks in a secure data centre",
    },
    {
      label: "Immigration & Family Law",
      body: "High-volume intake with document checklists, status tracking and multilingual client portals, built for caseloads measured in thousands.",
      points: ["Guided intake", "Document checklists", "Multilingual client portals"],
      image: subImmigrationImg,
      alt: "A couple consulting a lawyer across a desk",
    },
    {
      label: "LegalTech Startups",
      body: "Product engineering on regulated ground: multi-tenant architecture, model evaluation harnesses and the security review your buyers will run.",
      points: ["Multi-tenant architecture", "Model evaluation harness", "SOC 2 readiness"],
      image: subLegaltechImg,
      alt: "A laptop running a legal technology product",
    },
  ],
};

export const benefits = {
  eyebrow: "What can you optimise with our AI-powered solutions?",
  titleLead: "Transform Legal Operations",
  titleAccent: "With Intelligent, Automated Solutions",
  items: [
    {
      title: "Accelerated Legal Workflows",
      body: "Automation removes the manual review and document handling that fills a fee earner's day, so teams deliver faster case outcomes without adding headcount.",
    },
    {
      title: "Improved Compliance Confidence",
      body: "Continuous monitoring keeps the practice aligned with evolving regulation and the accounts rules, reducing the risk of oversight findings and reporting delays.",
    },
    {
      title: "Smarter Decision Intelligence",
      body: "Analytics and reporting turn matter and billing data into usable insight, supporting confident pricing, staffing and settlement decisions.",
    },
    {
      title: "Enhanced Client Transparency",
      body: "Integrated billing and communication give clients real-time visibility into progress and costs, which improves trust and shortens the argument about the fee note.",
    },
    {
      title: "Defensible Automation",
      body: "Every automated decision carries its rationale, its source document and its reviewer, so the efficiency gain holds up when somebody asks how the answer was reached.",
    },
    {
      title: "Scalable Digital Growth",
      body: "Modular architecture lets a firm expand easily, adding practice areas, offices or automation capability without disrupting what already runs.",
    },
  ],
};

export const build = {
  title: "Rebuild Your Legal Operations",
  body: "Discover how our custom legal software and automation solutions can modernise your workflows, eliminate bottlenecks and improve decision-making accuracy, so your legal team can focus on strategy rather than repetitive process.",
  ctaText: "Book a Consultation",
  texture: textureBgImg,
  image: buildVisualImg,
  alt: "A framed certificate beside a Lady Justice figurine on a desk",
};

export const techStrip = {
  eyebrow: "Technologies we work with",
  titleLead: "Expertise In Advanced",
  titleAccent: "Development Technologies",
  body: "The same production-grade toolchain sits under every legal platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o",
        "Claude",
        "Gemini",
        "Llama 3",
        "Mistral",
        "LayoutLMv3",
        "Donut",
        "spaCy",
        "Hugging Face Transformers",
        "PyTorch",
        "LangChain",
        "LlamaIndex",
        "RAG pipelines",
        "Named-entity recognition",
        "Clause classification",
        "Guardrails",
        "Ragas evaluation",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js",
        "NestJS",
        "FastAPI",
        "Django",
        "Go",
        "Java Spring",
        "GraphQL",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Elasticsearch",
        "OpenSearch",
        "pgvector",
        "Temporal",
        "Kafka",
        "Airflow",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Three.js",
        "ProseMirror",
        "Slate",
        "PDF.js",
        "TanStack Table",
        "React Native",
        "Flutter",
        "Radix UI",
      ],
    },
    {
      id: "cloud",
      label: "Cloud",
      items: [
        "AWS",
        "Azure",
        "Google Cloud",
        "Kubernetes",
        "Terraform",
        "Vault",
        "Private VPC deployment",
        "Cloudflare",
      ],
    },
    {
      id: "legaltech",
      label: "Legal Data & Integrations",
      items: [
        "iManage",
        "NetDocuments",
        "Relativity",
        "Clio",
        "SharePoint",
        "DocuSign",
        "Adobe Sign",
        "LEDES e-billing",
        "EDRM workflows",
        "PACER",
        "Court e-filing APIs",
        "OCR and redaction",
      ],
    },
    {
      id: "security",
      label: "Security & Compliance",
      note: "Standards and practices we design and build against, not certifications held by Axiomra. Which of them apply to your project, and what evidence your assessor will want, is confirmed with your compliance team before work starts.",
      items: [
        "SOC 2",
        "ISO 27001",
        "GDPR",
        "Legal professional privilege controls",
        "Information barriers",
        "Client-managed encryption keys",
        "Retention and disposal policy",
        "Zero-trust networking",
        "Penetration testing",
      ],
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
  titleAccent: "Legal Businesses We Support",
  body: "We build AI-powered legal software that satisfies a partner, a client's security questionnaire and an auditor at the same time. Whether you are a boutique practice drowning in document work or a legal department modernising a decade-old case system, we turn it into a platform your team will actually open.",
  rows: [
    {
      label: "Start-ups",
      body: "We help legal-tech founders get to a defensible product: multi-tenant architecture, an evaluation harness for the model, and the security posture enterprise legal buyers will interrogate before they will pilot anything.",
    },
    {
      label: "Scale-ups",
      body: "Growth exposes every manual control. We automate intake, conflicts and review orchestration, moving a practice from spreadsheet operations to a system that holds up at ten times the caseload.",
    },
    {
      label: "Small and medium-sized businesses",
      body: "Boutique firms and small legal departments carry the same obligations as the largest practices with a fraction of the headcount. Our automation closes that gap without an enterprise budget or a year-long rollout.",
    },
    {
      label: "Enterprises",
      body: "We partner with large firms and corporate legal functions on governed document layers, legacy integration and AI systems that clear security, records management and procurement before they ever reach production.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "What Legal Teams Say",
  titleAccent: "After The Handover",
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
  body: "Selected work for law firms and in-house teams, with the problem each build was pointed at.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why choose Axiomra?",
  titleLead: "Why Partner With Axiomra For",
  titleAccent: "Intelligent Legal Software Development",
  cards: [
    {
      icon: "ShieldCheck",
      title: "Privilege Is A Design Constraint, Not A Setting",
      body: "Tenant isolation, matter-scoped retrieval, client-managed keys and a no-training-on-your-data term in the contract are decided before the first line of code. We will show you the data-flow diagram your risk team is going to ask for.",
    },
    {
      icon: "Target",
      title: "We Solve Problems, Not Ship Features",
      body: "We do not build tools for the sake of building them. Every solution targets a specific bottleneck in how your matters actually run, and delivers a measurable result rather than another dashboard nobody opens.",
    },
    {
      icon: "Layers",
      title: "Built Around The Systems You Already Run",
      body: "Your document management system, billing platform and court workflows stay where they are. We integrate rather than migrate, and back delivery with 60 days of technical support and team training so adoption actually happens.",
    },
  ],
  stats: [
    { value: `${companyStats.projects}+`, label: "Projects Delivered" },
    { value: `${companyStats.partnerships}+`, label: "Valuable Partnerships" },
    { value: `${companyStats.countries}+`, label: "Countries Served" },
    { value: `${companyStats.experts}+`, label: "Tech Experts" },
  ],
};

export const blogs = {
  eyebrow: "What can our expertise teach you?",
  title: "Insights That Shape The Future Of Legal Tech",
  body: "Explore our knowledge hub to stay current on legal technology, AI adoption in practice, and what actually changes when a firm automates the first pass.",
  posts: [
    {
      title: "AI Contract Review: What It Catches, And What It Still Misses",
      tag: "Contracts",
      image: blog1Img,
      alt: "A dark blue grid of intersecting light lines",
    },
    {
      title: "Building A Privilege-Safe RAG Pipeline For Legal Documents",
      tag: "Architecture",
      image: blog2Img,
      alt: "An abstract pattern of blue circular forms",
    },
    {
      title: "Legal Operations Metrics That Actually Predict Profitability",
      tag: "Legal Ops",
      image: blog3Img,
      alt: "Silver and blue particles suspended on a dark ground",
    },
  ],
};

export const faqs = [
  {
    q: "How can AI legal software development services improve a law firm's operations?",
    a: "By taking the first pass off human hands: document review, clause extraction, intake triage, time capture and status reporting. The gain is not only speed. When review runs continuously rather than in a pre-deadline scramble, the problem clause surfaces while there is still time to negotiate it.",
  },
  {
    q: "Is it safe to put privileged client documents through an AI system?",
    a: "It is, provided the architecture is built for it. That means tenant isolation, retrieval scoped to the matter, encryption with keys you control, a contractual term that your content is not used for model training, and deployment inside your own cloud boundary when the engagement demands it. We design that boundary first and hand your risk team the data-flow diagram.",
  },
  {
    q: "Will AI replace the lawyers in my firm?",
    a: "No, and any vendor promising that is selling you a compliance problem. What changes is the mix: the routine first pass is automated, and the fee earner's time moves to judgement, negotiation and client work. Firms that have adopted this well have generally billed more strategic hours, not fewer hours overall.",
  },
  {
    q: "How long does it take to build custom legal software?",
    a: "A scoped pilot on a single workflow, contract review or intake, is typically eight to twelve weeks to something real on real matters. A full practice or matter management platform is a phased programme measured in quarters, with the legacy system authoritative until each phase has proved itself.",
  },
  {
    q: "Can you integrate with iManage, NetDocuments or our existing case system?",
    a: "Yes, and that is usually the right approach. Your document management system holds the record and the permissions model your firm is audited against. We integrate against it rather than migrating away from it, so the AI layer reads what is already governed instead of creating a second uncontrolled copy.",
  },
  {
    q: "How do you handle hallucination risk in legal AI?",
    a: "By refusing to let the model answer from memory. Every response is grounded in retrieved source documents with citations back to the paragraph, confidence is surfaced rather than hidden, low-confidence output is routed to a human, and we run a regression evaluation set over your own documents before any release goes near a live matter.",
  },
  {
    q: "What does AI contract review actually deliver in practice?",
    a: "Clause extraction against your playbook, deviation scoring on the positions you care about, fallback language proposed for routine departures, and an escalation flag on the outliers. On high-volume standard agreements this compresses first-pass review substantially. On bespoke, heavily negotiated documents the gain is smaller and we will say so.",
  },
  {
    q: "Can small firms afford custom legal software?",
    a: "Often, yes, because the scope is smaller. A boutique practice usually has one or two workflows carrying most of the unbillable load. Automating those specifically costs a fraction of a firm-wide platform and pays back faster. We would rather scope that honestly than sell you a suite.",
  },
  {
    q: "How do you ensure compliance with legal accounting and retention rules?",
    a: "Client and office account separation, trust accounting controls, disbursement tracking and reporting are built to the rules your jurisdiction audits against. Retention and disposal run on a policy clock per matter type, with legal hold overriding disposal, and every action written to an immutable audit log.",
  },
  {
    q: "How much does it cost to develop custom legal software?",
    a: "It depends on the integration surface, the state of your document estate and how much of the compliance boundary has to be built rather than configured. A scoped pilot is the fastest route to a real number. Book a free session and we will size it honestly, including what we would not build.",
  },
];

export const finalCta = {
  title: "Get Your Free AI Legal Software Consultation",
  subtitle:
    "Talk to our experts and discover how custom AI legal software development services can cut your document turnaround, strengthen compliance and give your fee earners their week back.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
