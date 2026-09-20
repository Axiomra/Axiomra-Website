/**
 * Copy and imagery for the Marketing industry page (/industries/marketing).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/marketing/hero.webp";
import introImg from "../assets/industries/marketing/intro.webp";

import svcAutomationImg from "../assets/industries/marketing/svc-automation.webp";
import svcAnalyticsImg from "../assets/industries/marketing/svc-analytics.webp";
import svcRtbImg from "../assets/industries/marketing/svc-rtb.webp";
import svcEmailImg from "../assets/industries/marketing/svc-email.webp";
import svcSocialImg from "../assets/industries/marketing/svc-social.webp";
import svcSalesImg from "../assets/industries/marketing/svc-sales.webp";
import svcCrmImg from "../assets/industries/marketing/svc-crm.webp";
import svcWorkflowImg from "../assets/industries/marketing/svc-workflow.webp";
import svcRevenueImg from "../assets/industries/marketing/svc-revenue.webp";
import svcChatbotImg from "../assets/industries/marketing/svc-chatbot.webp";
import svcLoyaltyImg from "../assets/industries/marketing/svc-loyalty.webp";
import svcAgencyImg from "../assets/industries/marketing/svc-agency.webp";

import midCtaBgImg from "../assets/industries/marketing/midcta-bg.webp";

import solTransformationImg from "../assets/industries/marketing/sol-transformation.webp";
import solConsultingImg from "../assets/industries/marketing/sol-consulting.webp";
import solProductImg from "../assets/industries/marketing/sol-product.webp";
import solMobileImg from "../assets/industries/marketing/sol-mobile.webp";
import solCmsImg from "../assets/industries/marketing/sol-cms.webp";
import solIntegrationImg from "../assets/industries/marketing/sol-integration.webp";

import stkAgencyImg from "../assets/industries/marketing/stk-agency.webp";
import stkCrmImg from "../assets/industries/marketing/stk-crm.webp";
import stkProductImg from "../assets/industries/marketing/stk-product.webp";

import subSmmImg from "../assets/industries/marketing/sub-smm.webp";
import subInfluencerImg from "../assets/industries/marketing/sub-influencer.webp";
import subEmailImg from "../assets/industries/marketing/sub-email.webp";
import subContentImg from "../assets/industries/marketing/sub-content.webp";
import subSeoImg from "../assets/industries/marketing/sub-seo.webp";
import subPpcImg from "../assets/industries/marketing/sub-ppc.webp";
import subAffiliateImg from "../assets/industries/marketing/sub-affiliate.webp";
import subVideoImg from "../assets/industries/marketing/sub-video.webp";
import subEventImg from "../assets/industries/marketing/sub-event.webp";
import subBrandImg from "../assets/industries/marketing/sub-brand.webp";

import textureBgImg from "../assets/industries/marketing/texture-bg.webp";
import buildVisualImg from "../assets/industries/marketing/build-visual.webp";

import blog1Img from "../assets/industries/marketing/blog-1.webp";
import blog2Img from "../assets/industries/marketing/blog-2.webp";
import blog3Img from "../assets/industries/marketing/blog-3.webp";
import finalCtaBgImg from "../assets/industries/marketing/final-cta.webp";

export const MARKETING_SLUG = "marketing";

export const hero = {
  eyebrow: "AI for the marketing industry",
  titleLead: "Custom",
  titleAccent: "AI Marketing Software Development",
  titleTail: "Services",
  body:
    "Rebuild your marketing operations with AI-powered, custom-built software that delivers precision, personalisation and performance. We help marketing leaders, creative agencies and digital enterprises build intelligent solutions that automate workflows, optimise campaigns and connect every touchpoint for measurable growth.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "A hand reaching into a glowing blue network of connected data points",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "Transforming Brands Through Custom",
  titleAccent: "Marketing Software Development Services",
  paragraphs: [
    "Axiomra is a forward-thinking marketing software development company that builds enterprise-grade, AI-powered solutions for digital marketing and creative teams. We combine deep marketing domain expertise with intelligent automation, data engineering and analytics to help organisations simplify campaigns, improve decision-making and enhance collaboration.",
    "We design and develop custom AI marketing software that goes beyond off-the-shelf tools, tailored to your exact needs. From workflow automation and personalisation engines to real-time analytics and omnichannel campaign orchestration, our platforms eliminate fragmented processes, reduce manual effort and connect data across every channel. For CMOs, marketing directors and creative strategists, our AI-driven solutions deliver measurable ROI, faster optimisation cycles and marketing intelligence that compounds.",
  ],
  ctaText: "Book a Free Tech Consultation",
  image: introImg,
  alt: "A marketing lead reviewing a campaign dashboard on a tablet",
};

export const impact = {
  titleLead: "The Role Of AI In",
  titleAccent: "Modern Marketing Operations",
  body:
    "AI-driven marketing software is transforming how brands plan, execute and measure campaigns in real time. From automating insights and optimising ad performance to enabling tightly personalised experiences, AI gives marketing teams to act faster, smarter and more strategically.",
  stats: [
    {
      value: "77%",
      label: "of marketers who have adopted generative AI report using it for creative development tasks.",
      source: "Gartner, Use of GenAI Report 2025",
    },
    {
      value: "35%",
      label:
        "of marketing teams say AI is used for content creation, the top AI application, followed by 30% for data analysis and insights.",
      source: "HubSpot, State of Marketing Report 2025",
    },
    {
      value: "65%",
      label: "of marketing leaders said their team plans to increase investment in AI and automation tools in 2025.",
      source: "HubSpot, State of AI Report 2025",
    },
  ],
};

/**
 * The challenge rail. Each entry is a barrier marketing teams hit, and the
 * platform capability we build to remove it.
 */
export const challenges = {
  eyebrow: "Overcoming key barriers in marketing",
  titleLead: "Solving Key Marketing Challenges",
  titleAccent: "With Custom Software Development Services",
  items: [
    {
      title: "Inability to Measure True Marketing ROI",
      body:
        "Many marketing teams cannot clearly see which campaigns drive revenue because data sits in different tools and systems. This makes it hard to prove value or adjust budgets. We build custom analytics platforms that connect every channel, giving you a full view of performance and helping you invest where it matters most.",
    },
    {
      title: "Manual Reporting and Dashboards",
      body:
        "Monday mornings disappear into copy-paste reporting that is stale by the time it is read. We automate the whole pipeline, from ingestion to presentation, so dashboards refresh themselves and analysts spend their hours on interpretation rather than assembly.",
    },
    {
      title: "Inability to Personalise at Scale",
      body:
        "Personalisation that stops at a first name does not move a number. Our engines segment on behaviour, intent and lifecycle stage, then generate and serve the right message per audience automatically across email, web, app and paid channels.",
    },
    {
      title: "Inability to Scale Content Production",
      body:
        "Content demand outruns the team long before quality does. We build assisted production pipelines with brand-tuned generation, human review gates and asset governance, so volume rises without the brand drifting.",
    },
    {
      title: "Lack of Performance Tracking",
      body:
        "Campaigns get judged after the budget is gone. We wire predictive performance models into live campaigns so underperformance surfaces within hours, with the recommended reallocation attached.",
    },
    {
      title: "Slow Turnaround Time for Insights",
      body:
        "When a question takes a week to answer, the answer no longer matters. We ship self-service analytics with natural-language querying on top of a governed data layer, moving insight turnaround from days to minutes.",
    },
    {
      title: "Poor Email List Segmentation",
      body:
        "Broad lists burn sender reputation and depress every downstream metric. We rebuild segmentation on engagement and propensity scoring, with automated hygiene and send-time optimisation baked into the platform.",
    },
  ],
};

/**
 * Twelve product categories. Each is a card with a photo, a description and a
 * route to the contact page.
 */
export const services = {
  eyebrow: "What custom marketing solutions do we build?",
  titleLead: "AI-Driven Marketing Software Development Services",
  titleAccent: "That Power Business Growth",
  body:
    "Our marketing software development services help teams overcome daily operational bottlenecks with AI-driven precision. From automation to analytics and customer engagement, we build solutions that simplify complex workflows, improve campaign results and enable smarter decisions across every marketing channel.",
  items: [
    {
      title: "Marketing Automation Software",
      body:
        "Our custom-built intelligent marketing automation software simplifies complex campaign workflows and eliminates repetitive manual tasks. Many teams waste hours managing multiple tools that never quite connect, but our custom-built platform unifies these systems into one process, ensuring faster execution, fewer errors and campaigns that run with precision.",
      image: svcAutomationImg,
      alt: "A laptop showing an automated campaign workflow diagram",
    },
    {
      title: "Marketing Analytics Software",
      body:
        "With advanced marketing analytics solutions, you can turn scattered campaign data into clear, usable insights. Most teams struggle to connect data from multiple sources, leaving gaps in performance visibility. Our AI-powered dashboards bring every metric together, helping marketing leaders uncover trends and make faster, data-driven decisions.",
      image: svcAnalyticsImg,
      alt: "A dark analytics dashboard with live performance charts",
    },
    {
      title: "Real-Time Bidding (RTB) Software",
      body:
        "We build real-time bidding software that helps marketing teams optimise ad spend and maximise visibility across digital platforms. Traditional manual bidding methods often lead to budget waste and inconsistent ad performance. Our custom-made system uses AI-driven algorithms to automate bid adjustments in milliseconds, ensuring better reach and cost-efficient advertising outcomes.",
      image: svcRtbImg,
      alt: "Trading screens showing live bid activity in green and red",
    },
    {
      title: "Email Marketing Software",
      body:
        "Our tailored email marketing platform delivers personalisation at scale with minimal effort. Marketers often face challenges in keeping messages timely and relevant across diverse audiences. Using behavioural analytics and smart segmentation, our solution ensures each email resonates, driving higher open rates, conversions and loyalty.",
      image: svcEmailImg,
      alt: "Hands typing an email campaign on a laptop",
    },
    {
      title: "Social Media Marketing Software",
      body:
        "Managing multiple social accounts should not mean sacrificing strategy or consistency. That is why we design custom social media marketing software that centralises planning, publishing and analytics. By eliminating manual scheduling chaos, teams gain full visibility into performance and create cohesive, impactful social campaigns.",
      image: svcSocialImg,
      alt: "Social app icons glowing on a smartphone screen",
    },
    {
      title: "Sales Automation Software",
      body:
        "We develop sales automation software that bridges marketing and sales teams for clean lead handover. Many businesses lose leads due to manual handoffs and poor follow-up tracking. Our intelligent system automates lead scoring, follow-ups and pipeline tracking to ensure every opportunity is nurtured efficiently and converted with precision.",
      image: svcSalesImg,
      alt: "A sales team reviewing pipeline figures in a meeting room",
    },
    {
      title: "Marketing CRM Software",
      body:
        "We build marketing CRM software that unifies customer data, campaign interactions and engagement metrics in one place. Fragmented data across tools often causes missed personalisation and poor customer experiences. Our CRM integrates every touchpoint to deliver a single customer view, driving stronger relationships and smarter, insight-led engagement strategies.",
      image: svcCrmImg,
      alt: "A support specialist working a CRM queue with a headset on",
    },
    {
      title: "Workflow Automation Software",
      body:
        "We develop custom workflow automation software that simplifies operations and accelerates collaboration. Marketing teams often get slowed down by repetitive approvals and manual updates. Our intelligent systems automate these workflows, improving visibility and freeing teams to focus on strategy and creativity.",
      image: svcWorkflowImg,
      alt: "A kanban board of campaign tasks mapped out on sticky notes",
    },
    {
      title: "Revenue Management Software",
      body:
        "We build revenue management software that provides real-time visibility into marketing-driven financial performance. Many companies struggle to connect campaign outcomes to actual revenue impact. Our platform integrates financial analytics with marketing data to forecast revenue trends, optimise budgets and ensure better alignment between marketing spend and profitability.",
      image: svcRevenueImg,
      alt: "A finance review session with revenue charts on the table",
    },
    {
      title: "Chatbot Software Development",
      body:
        "Conversational AI is reshaping how brands communicate. Our custom chatbot software automates real-time interactions across websites, apps and social channels. Businesses struggling with delayed responses gain instant engagement, stronger lead capture and round-the-clock customer support powered by natural language intelligence.",
      image: svcChatbotImg,
      alt: "A smartphone displaying an AI chat assistant conversation",
    },
    {
      title: "Customer Loyalty Software",
      body:
        "We develop customer loyalty software that helps brands retain and reward their most valuable customers. Many organisations rely on generic loyalty programmes that fail to build emotional engagement. Our system personalises rewards based on behaviour, preferences and purchase history, helping brands increase repeat sales and strengthen customer relationships.",
      image: svcLoyaltyImg,
      alt: "A customer redeeming a loyalty card at a shop counter",
    },
    {
      title: "Advertising Agency Software",
      body:
        "We develop custom advertising agency software that brings project management, billing and campaign performance into one intelligent platform. Agencies often juggle multiple clients and tools that create operational inefficiencies. Our custom-built solution centralises everything, improving collaboration, financial accuracy and project turnaround for data-driven campaign execution.",
      image: svcAgencyImg,
      alt: "An agency strategist working on a digital advertising deck",
    },
  ],
};

export const midCta = {
  title: "Let's Build Your Marketing Software Together",
  body:
    "Rebuild your campaigns, content and analytics with AI-powered automation tailored to your brand's goals.",
  ctaText: "Get in Touch",
  background: midCtaBgImg,
};

/**
 * The services fold: six alternating photo/copy rows.
 */
export const solutions = {
  eyebrow: "What types of AI services do we offer?",
  titleLead: "Custom Marketing",
  titleAccent: "Software Development Services",
  body:
    "We deliver tailored marketing software development services that help enterprises and agencies achieve operational excellence through AI automation and intelligent system design.",
  items: [
    {
      title: "Digital Transformation in Marketing",
      body:
        "We work closely with stakeholders to identify automation opportunities, optimise workflows and design AI strategies aligned with business objectives. Using AI insights, we help organisations improve decision-making and cut operational waste.",
      extra:
        "The work starts with the campaign process that costs your team the most hours, not with a platform rollout. We map how briefs, approvals, launches and reporting actually move today, then automate the steps that never needed a person in the first place.",
      points: [
        "Workflow audit across briefing, approval, launch and reporting cycles",
        "A costed automation roadmap ranked by hours saved per quarter",
        "Change plan and training so the new process survives the handover",
      ],
      image: solTransformationImg,
      alt: "A strategist standing in front of a wall of projected data",
    },
    {
      title: "AI Software Development Consulting",
      body:
        "Our experts guide marketing teams through every stage of AI adoption, from strategy to implementation. We identify high-impact automation opportunities, design tailored AI models for predictive insights and keep integration clean with your existing tools. The result is smarter marketing operations that reduce costs, enhance personalisation and maximise ROI.",
      extra:
        "You leave with a roadmap that has prices on it, including an honest case against the ideas that will not pay for themselves. Most marketing teams already hold more first-party signal than they use, and far less than the model somebody tried to sell them needs.",
      points: [
        "Audit of your CRM, web, ad platform and offline data before any model is scoped",
        "Model shortlist with expected lift, build effort and monthly running cost",
        "Integration plan for the martech stack you already pay for",
      ],
      image: solConsultingImg,
      alt: "A developer working across multiple code monitors",
    },
    {
      title: "Marketing Custom Product Development",
      body:
        "We build fully custom marketing products that fit your workflows, not the other way around. Whether it is campaign management software, performance analytics dashboards or data-driven recommendation engines, we develop solutions that integrate with your martech stack and evolve alongside your growth objectives.",
      extra:
        "Delivery runs in weekly increments, with the first usable capability live long before the full scope lands. Nothing is built behind a curtain for three months and revealed at the end, which is how most in-house marketing tools quietly die.",
      points: [
        "Architecture, data model and a costed backlog inside the first three weeks",
        "Weekly staging releases your marketers can open and comment on",
        "Documentation, tests and a runbook your own team can maintain",
      ],
      image: solProductImg,
      alt: "A product team mapping a build on a studio whiteboard",
    },
    {
      title: "Marketing Mobile App Development",
      body:
        "Our team designs and develops mobile-first marketing applications that enhance engagement, speed up campaign execution and deliver real-time insights on the go. From customer engagement tools to campaign performance trackers, our apps let marketers manage, monitor and optimise digital activities anytime and anywhere.",
      extra:
        "Approvals, budget shifts and creative sign-off are the moments that stall a campaign while someone is away from a desk, so those are the flows we build for the phone first. Everything else stays where it belongs, on the web.",
      points: [
        "Native or cross-platform builds sharing one API with your web tooling",
        "Push-driven approvals, alerts and budget controls for time-critical calls",
        "Offline-tolerant reporting with store release and update management included",
      ],
      image: solMobileImg,
      alt: "Hands holding a smartphone above a desk with a keyboard",
    },
    {
      title: "Custom CMS Integration",
      body:
        "We integrate and customise CMS platforms to align content operations with AI-powered insights and automated workflows. Our CMS integration services enhance content governance, speed up publishing cycles and improve personalisation across digital channels, whether you work with WordPress, Magento, Shopify, Contentful or a headless stack.",
      extra:
        "Content teams lose most of their time to the gap between writing and publishing: reformatting, re-approving and re-uploading the same asset per channel. We close that gap so one approved piece reaches every surface in the shape each one expects.",
      points: [
        "Headless or traditional CMS wired into your campaign and analytics tooling",
        "Role-based governance, versioning and audit trails on every publish",
        "Personalisation rules and localisation handled from a single content source",
      ],
      image: solCmsImg,
      alt: "A content manager publishing a campaign page on a laptop",
    },
    {
      title: "CRM Integration Services",
      body:
        "We connect your CRM to every marketing surface you run, so lead data, campaign attribution and lifecycle stage move in one direction and stay in sync. Clean handoffs between marketing and sales mean fewer lost leads, accurate reporting and a single customer record everyone can trust.",
      extra:
        "Sync direction is decided per field rather than per system, because the arguments between marketing and sales are almost always about which side owns a value. Once that is settled in the integration layer, attribution reporting stops being contested.",
      points: [
        "Two-way sync across CRM, ad platforms, email, web and support tooling",
        "Deduplication and identity resolution so one person is one record",
        "Attribution that reconciles to the numbers finance already reports",
      ],
      image: solIntegrationImg,
      alt: "Teal fibre-optic cabling patched into a network switch",
    },
  ],
};

export const stakeholders = {
  eyebrow: "Whom do we build custom solutions for?",
  titleLead: "Tailored AI Marketing Solutions",
  titleAccent: "For Key Industry Stakeholders",
  items: [
    {
      title: "Digital and Advertising Agencies",
      body:
        "Client work, billing and campaign performance in one platform, so account teams spend their time on strategy instead of status updates.",
      image: stkAgencyImg,
      alt: "An agency team reviewing campaign work around a laptop",
    },
    {
      title: "CRM Manager",
      body:
        "A single customer record across every channel, with segmentation and lifecycle automation that runs without a weekly export.",
      image: stkCrmImg,
      alt: "A CRM manager working across a tablet and laptop",
    },
    {
      title: "Product Marketing Manager",
      body:
        "Launch tracking, message testing and adoption analytics wired together, so the next positioning call is made on evidence.",
      image: stkProductImg,
      alt: "A product marketing manager presenting launch results",
    },
  ],
};

/**
 * The marquee rail. Each sub-industry card shows its photo and label at rest,
 * and reveals the detail copy and capability list on hover or focus.
 */
export const subIndustries = {
  eyebrow: "Which marketing sector do we serve?",
  titleLead: "AI-Powered Software Solutions For",
  titleAccent: "Every Marketing Sub-Industry",
  body:
    "Every marketing discipline has its own data, its own cadence and its own definition of a good week. Hover any card to see what we build for it.",
  items: [
    {
      label: "Social Media Marketing (SMM)",
      body: "Planning, publishing and listening in one platform, with AI drafting on brand and analytics that tie posts to pipeline.",
      points: ["Unified scheduling", "Sentiment listening", "Creative performance scoring"],
      image: subSmmImg,
      alt: "A creator filming social content with a ring light",
    },
    {
      label: "Influencer Marketing",
      body: "Discovery, contracting and measurement for creator programmes, with fraud detection and true incremental lift reporting.",
      points: ["Creator discovery models", "Automated contracts", "Incrementality measurement"],
      image: subInfluencerImg,
      alt: "An influencer recording a video to camera",
    },
    {
      label: "Email Marketing",
      body: "Segmentation on propensity rather than demographics, with deliverability monitoring and send-time optimisation built in.",
      points: ["Propensity segmentation", "Deliverability monitoring", "Lifecycle journeys"],
      image: subEmailImg,
      alt: "A marketer building an email campaign at a desk",
    },
    {
      label: "Content Marketing",
      body: "Brand-tuned generation with human review gates, topic-gap analysis and an asset library that stays governed as volume rises.",
      points: ["Topic gap analysis", "Assisted drafting", "Asset governance"],
      image: subContentImg,
      alt: "A content strategist drafting an outline in a notebook",
    },
    {
      label: "Search Engine Optimisation",
      body: "Technical crawling, intent clustering and content scoring in one pipeline, so ranking work is prioritised by expected revenue.",
      points: ["Intent clustering", "Technical crawl automation", "Revenue-weighted prioritisation"],
      image: subSeoImg,
      alt: "Two strategists discussing an SEO plan over coffee",
    },
    {
      label: "Performance & PPC",
      body: "Budget allocation models that reallocate across channels daily, with creative fatigue detection and automated bid guardrails.",
      points: ["Cross-channel budget models", "Creative fatigue alerts", "Bid guardrails"],
      image: subPpcImg,
      alt: "A performance marketer reviewing campaign charts on a laptop",
    },
    {
      label: "Affiliate & Partner Marketing",
      body: "Partner onboarding, attribution and payout automation, with anomaly detection that catches leakage before the invoice does.",
      points: ["Partner onboarding flows", "Multi-touch attribution", "Payout automation"],
      image: subAffiliateImg,
      alt: "A shopper checking out on an online store with a card",
    },
    {
      label: "Video Marketing",
      body: "Auto-clipping, caption generation and per-platform packaging, with watch-through analytics feeding the next production brief.",
      points: ["Auto-clipping and captions", "Per-platform packaging", "Watch-through analytics"],
      image: subVideoImg,
      alt: "A cinema camera set up on a production shoot",
    },
    {
      label: "Event Marketing",
      body: "Registration, session intelligence and post-event scoring joined up, so sales follows up on interest rather than a badge scan.",
      points: ["Registration and check-in", "Session engagement scoring", "Post-event lead routing"],
      image: subEventImg,
      alt: "A speaker presenting on stage to a conference audience",
    },
    {
      label: "Brand Marketing",
      body: "Brand tracking, share-of-voice monitoring and asset compliance checks that keep a growing team on one visual system.",
      points: ["Share-of-voice tracking", "Brand compliance checks", "Creative asset system"],
      image: subBrandImg,
      alt: "A brand moodboard pinned out with reference imagery",
    },
  ],
};

export const benefits = {
  eyebrow: "What you can optimise with our AI-powered solutions?",
  titleLead: "Key Benefits Of Partnering With",
  titleAccent: "Axiomra For Marketing Software",
  items: [
    {
      title: "Accelerated Marketing Efficiency",
      body:
        "Our AI-powered workflows reduce repetitive manual processes and improve cross-team collaboration. This enables marketing teams to execute campaigns faster and focus on strategy rather than operations.",
    },
    {
      title: "Enhanced Data-Driven Decision-Making",
      body:
        "We centralise data from multiple marketing channels and apply advanced analytics to extract real insights. Teams gain the clarity needed to make informed, performance-oriented decisions in real time.",
    },
    {
      title: "Personalised Customer Experiences",
      body:
        "Our AI algorithms analyse customer behaviour to deliver tightly personalised recommendations and campaigns. This helps marketers build stronger connections and increase engagement across digital touchpoints.",
    },
    {
      title: "Integration That Holds",
      body:
        "Our custom development approach ensures your CRM, CMS and analytics tools work together effortlessly. The result is a unified marketing ecosystem that eliminates data silos and improves accuracy.",
    },
    {
      title: "Enterprise-Grade Security and Compliance",
      body:
        "We work to the GDPR, SOC 2 and ISO 27001 requirements that apply to your data, and confirm them with your team before development starts. Every solution is built with privacy, transparency and reliability at its core.",
    },
    {
      title: "Scalable Architecture That Lasts",
      body:
        "Our platforms are built to evolve with your growing business needs. Whether expanding to new markets or adding new channels, your marketing system scales without disruption.",
    },
  ],
};

export const build = {
  title: "Build Your Custom AI Marketing Software with Axiomra",
  body:
    "Rebuild your marketing operations with intelligent automation and data-driven personalisation designed to boost efficiency and ROI.",
  ctaText: "Request a Consultation",
  texture: textureBgImg,
  image: buildVisualImg,
  alt: "A campaign performance report beside a phone showing live figures",
};

export const techStrip = {
  eyebrow: "Technologies we work with",
  titleLead: "Expertise In Advanced",
  titleAccent: "Development Technologies",
  body:
    "The same production-grade toolchain sits under every marketing platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "Phi-2", "Groq", "PaLM", "Pix2Pix", "StyleGAN",
        "Stable Diffusion", "Midjourney", "DeepDream", "Whisper", "MediaPipe", "Guardrails", "Vertex AI",
        "OpenAI Embeddings", "CLIP", "LangChain",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "Express", "FastAPI", "Django", "GraphQL", "PostgreSQL", "MongoDB",
        "Redis", "Elasticsearch", "Qdrant", "Pinecone", "Kafka", "Airflow", "dbt", "Snowflake",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js",
        "React Native", "Flutter", "Vite", "Radix UI", "D3.js",
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
      items: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "GitLab CI", "Nginx", "Prometheus", "Grafana", "Sentry"],
    },
    {
      id: "martech",
      label: "Martech",
      items: ["HubSpot", "Salesforce", "Segment", "Braze", "Klaviyo", "GA4", "Meta Ads API", "Google Ads API", "Shopify", "Contentful"],
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
  titleAccent: "Marketing Businesses We Support",
  body:
    "We excel in custom AI-powered marketing software development that drives measurable growth. Whether you are validating a new product idea or consolidating a sprawling martech stack, we turn it into a platform your team actually runs on.",
  rows: [
    {
      label: "Startups",
      body: "We work with startups to get a first marketing platform live fast: concept validation, an MVP that proves the loop, and the analytics to show it working before the next raise.",
    },
    {
      label: "Scale-ups",
      body: "Growth exposes every manual process. We help scale-ups automate campaign operations, unify reporting and move from tool sprawl to a platform that supports the next order of magnitude.",
    },
    {
      label: "Small and medium-sized businesses",
      body: "SMB marketing teams carry enterprise workloads with a fraction of the headcount. Our automation and analytics tooling closes that gap without an enterprise budget or a year-long rollout.",
    },
    {
      label: "Enterprises",
      body: "We partner with enterprise marketing organisations on governed data layers, multi-brand orchestration and AI systems that satisfy security, privacy and procurement before they ever reach production.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "What Marketing Teams Say",
  titleAccent: "Once The Work Is Live",
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
    "A look at the marketing systems we have built, and the number each one was measured against.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Why Partner With Axiomra For",
  titleAccent: "Intelligent Marketing Software Development",
  cards: [
    {
      icon: "Target",
      title: "Marketing Operators, Not Just Engineers",
      body:
        "Our developers and strategists understand marketing operations from campaign analytics to automation, so every solution we ship is designed around a metric you already report on rather than a feature list.",
    },
    {
      icon: "Layers",
      title: "Integrates With Your Stack",
      body:
        "From CRM to CMS and analytics tools, our solutions drop into your existing marketing ecosystem. We build modular so the platform adapts as your channels, tools and business needs change.",
    },
    {
      icon: "ShieldCheck",
      title: "Visible At Every Stage",
      body:
        "Our agile process ensures full visibility at every stage, with continuous updates and proactive technical guidance. We also provide post-launch technical support for up to 60 days, within the scope agreed in the engagement.",
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
  title: "Explore Insights On AI And Marketing Innovation",
  body:
    "Explore our knowledge hub to stay updated on the latest expert insights, best practices and real-world case studies on AI-driven marketing transformation.",
  posts: [
    {
      title: "How To Use AI In Sales: 10 Use Cases That Close Deals",
      tag: "Sales",
      image: blog1Img,
      alt: "A notebook headed Social Media Marketing beside a keyboard",
    },
    {
      title: "10 AI Sales Tools Worth Running In Your Pipeline In 2026",
      tag: "Tooling",
      image: blog2Img,
      alt: "A white humanoid robot against a deep purple background",
    },
    {
      title: "AI In Market Research: How AI Delivers Faster Insights",
      tag: "Research",
      image: blog3Img,
      alt: "A team analysing printed performance charts together",
    },
  ],
};

export const faqs = [
  {
    q: "What is marketing software development and how does it support business growth?",
    a: "It is the design and build of the systems a marketing organisation runs on: campaign automation, analytics, CRM and content operations. Off-the-shelf tools force your process to match their assumptions. Custom software matches your funnel, your data and your reporting, which is where the compounding return comes from.",
  },
  {
    q: "How does AI marketing software development help improve campaign ROI?",
    a: "By shortening the loop between spend and signal. Predictive models flag underperformance within hours instead of at month end, budget allocation moves on live data, and personalisation lifts conversion on traffic you have already paid for.",
  },
  {
    q: "Why should a company build custom marketing software instead of using existing tools?",
    a: "Most teams do both. You build custom where the tools fracture: the joins between systems, the reporting layer nobody's vendor owns, and the workflows specific to how you go to market. We will tell you honestly which parts are not worth building.",
  },
  {
    q: "What services does a marketing software development company provide?",
    a: "Strategy and AI consulting, custom product development, mobile apps, CMS and CRM integration, data engineering, and the analytics layer on top. We also take on modernisation work where an existing platform needs to keep running while it changes underneath.",
  },
  {
    q: "How much does it cost to develop custom marketing management software?",
    a: "It depends on the channel count, the state of your data and how much AI capability is in scope. A scoped pilot is the fastest route to a real number. Book a free session and we will size it honestly, including what we would not build.",
  },
  {
    q: "How long does a marketing platform build take?",
    a: "A scoped MVP with one capability, such as an analytics layer or a campaign automation engine, typically runs eight to twelve weeks. A full platform spanning automation, analytics and integrations runs four to nine months, delivered in weekly increments you can use from the first sprint.",
  },
  {
    q: "Can AI software track social media ROI and engagement?",
    a: "Yes. We connect platform APIs to your revenue data so social performance is reported against pipeline and revenue rather than impressions, with incrementality testing where attribution alone is not trustworthy.",
  },
  {
    q: "Do you handle data privacy and compliance?",
    a: "Yes. GDPR, SOC 2 and ISO 27001 requirements are reviewed with your compliance team and designed in from the first architecture session, covering consent capture, data residency, retention and the audit trail your security review will ask for.",
  },
];

export const finalCta = {
  title: "Show Us The Campaign Problem You Want Solved",
  subtitle:
    "Ready to automate workflows, personalise campaigns and maximise your marketing performance? Talk to our AI software experts.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
