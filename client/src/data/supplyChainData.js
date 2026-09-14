/**
 * Copy and imagery for the Supply Chain industry page (/industries/supply-chain).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/supply-chain/hero.webp";
import introImg from "../assets/industries/supply-chain/intro.webp";

import svcErpImg from "../assets/industries/supply-chain/svc-erp.webp";
import svcMrpImg from "../assets/industries/supply-chain/svc-mrp.webp";
import svcAssetImg from "../assets/industries/supply-chain/svc-asset.webp";
import svcOmsImg from "../assets/industries/supply-chain/svc-oms.webp";
import svcWmsImg from "../assets/industries/supply-chain/svc-wms.webp";
import svcDocumentImg from "../assets/industries/supply-chain/svc-document.webp";
import svcRiskImg from "../assets/industries/supply-chain/svc-risk.webp";
import svcLogisticsImg from "../assets/industries/supply-chain/svc-logistics.webp";
import svcProcurementImg from "../assets/industries/supply-chain/svc-procurement.webp";
import svcSupplierImg from "../assets/industries/supply-chain/svc-supplier.webp";
import svcAnalyticsImg from "../assets/industries/supply-chain/svc-analytics.webp";
import svcMobileImg from "../assets/industries/supply-chain/svc-mobile.webp";

import midCtaBgImg from "../assets/industries/supply-chain/midcta-bg.webp";

import solConsultingImg from "../assets/industries/supply-chain/sol-consulting.webp";
import solEndToEndImg from "../assets/industries/supply-chain/sol-endtoend.webp";
import solIntegrationImg from "../assets/industries/supply-chain/sol-integration.webp";
import solControlTowerImg from "../assets/industries/supply-chain/sol-controltower.webp";
import solMobileImg from "../assets/industries/supply-chain/sol-mobile.webp";
import solModerniseImg from "../assets/industries/supply-chain/sol-modernise.webp";

import stkDirectorsImg from "../assets/industries/supply-chain/stk-directors.webp";
import stk3plImg from "../assets/industries/supply-chain/stk-3pl.webp";
import stkDistributorsImg from "../assets/industries/supply-chain/stk-distributors.webp";

import subManufacturingImg from "../assets/industries/supply-chain/sub-manufacturing.webp";
import subInventoryImg from "../assets/industries/supply-chain/sub-inventory.webp";
import subTransportImg from "../assets/industries/supply-chain/sub-transport.webp";
import subWarehousingImg from "../assets/industries/supply-chain/sub-warehousing.webp";
import subMaritimeImg from "../assets/industries/supply-chain/sub-maritime.webp";
import subRetailImg from "../assets/industries/supply-chain/sub-retail.webp";
import subColdChainImg from "../assets/industries/supply-chain/sub-coldchain.webp";
import subEcommerceImg from "../assets/industries/supply-chain/sub-ecommerce.webp";
import subAutomotiveImg from "../assets/industries/supply-chain/sub-automotive.webp";
import subPharmaImg from "../assets/industries/supply-chain/sub-pharma.webp";
import subAirCargoImg from "../assets/industries/supply-chain/sub-aircargo.webp";
import subRailImg from "../assets/industries/supply-chain/sub-rail.webp";

import textureBgImg from "../assets/industries/supply-chain/texture-bg.webp";
import buildVisualImg from "../assets/industries/supply-chain/build-visual.webp";

import blog1Img from "../assets/industries/supply-chain/blog-1.webp";
import blog2Img from "../assets/industries/supply-chain/blog-2.webp";
import blog3Img from "../assets/industries/supply-chain/blog-3.webp";
import finalCtaBgImg from "../assets/industries/supply-chain/final-cta.webp";

export const SUPPLY_CHAIN_SLUG = "supply-chain";

export const hero = {
  eyebrow: "AI for the supply chain industry",
  titleLead: "Custom",
  titleAccent: "AI Supply Chain Software Development",
  titleTail: "Services",
  body:
    "We build custom AI software that shows your stock, orders and shipments in real time. Our supply chain software development services improve forecasts, reduce stockouts and lower shipping costs by automating planning, inventory and delivery.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "A planner tracing a live logistics network above a lit warehouse floor",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "AI Supply Chain Management",
  titleAccent: "Software Development Services That Deliver",
  paragraphs: [
    "Axiomra is an AI supply chain software development company that designs and builds custom tools for planning, inventory, warehousing and transport. We fix the common pain points — poor visibility, weak forecasts, stockouts, high freight costs and manual work — by unifying your data, adding real-time alerts, applying predictive models and automating routine steps.",
    "We create simple, reliable apps your teams use every day: demand forecasting, replenishment, slotting, routing, control-tower dashboards and document automation. Built for inventory management, manufacturing, transportation and logistics teams, and for leaders across logistics providers, distributors and wholesalers, suppliers, regulatory bodies and B2B customers. Our approach is model-agnostic and practical — time-series ML, optimisation, computer vision and LLMs, all selected for your use case.",
  ],
  ctaText: "Book a Free Tech Consultation",
  image: introImg,
  alt: "An operations lead reviewing live inventory levels on a tablet",
};

export const impact = {
  titleLead: "The Role Of AI In",
  titleAccent: "Modern Supply Chain Operations",
  body:
    "AI supply chain software is redefining how companies plan, source, move and deliver. By automating manual processes and enabling real-time data intelligence, these solutions drive smarter decisions, faster operations and stronger resilience across global networks.",
  stats: [
    {
      value: "15%",
      label: "reduction in logistics costs among early adopters of AI-enabled supply chain management.",
      source: "McKinsey — AI supply-chain revolution report",
    },
    {
      value: "35%",
      label: "improvement in inventory levels for organisations applying AI to planning and replenishment.",
      source: "McKinsey — AI supply-chain revolution report",
    },
    {
      value: "$58B",
      label: "projected AI in supply chain market size by 2031, growing at 40.4% CAGR from 2024.",
      source: "Meticulous Research — AI in Supply Chain Market, 2024",
    },
  ],
};

/**
 * The challenge rail. Each entry is a barrier supply chain teams hit, and the
 * platform capability we build to remove it.
 */
export const challenges = {
  eyebrow: "Overcoming key barriers in supply chain",
  titleLead: "Supply Chain Challenges We Solve",
  titleAccent: "With Custom AI Development",
  items: [
    {
      title: "Lack of end-to-end visibility",
      body:
        "Teams cannot see live orders, inventory and shipments across sites and partners, so problems surface late and costs rise. This happens because data sits in many systems with manual updates and mismatched IDs. With AI supply chain software development we unify data streams, predict ETAs and flag exceptions early. You get one source of truth, faster fixes, higher on-time delivery and less buffer stock.",
    },
    {
      title: "Demand forecasting inaccuracy",
      body:
        "Spreadsheet forecasts miss seasonality, promotions and sudden demand shifts, so you carry the wrong stock in the wrong place. We build time-series and causal models that read orders, pricing, weather and campaign calendars together, then feed replenishment automatically. Planners stop rebuilding the forecast every week and start managing exceptions.",
    },
    {
      title: "Supplier disruptions and single-source risk",
      body:
        "One late supplier can stop a line, and most teams learn about it after the fact. We score supplier risk from delivery history, news signals, lead-time variance and quality records, then surface alternate sources and re-plan options before the shortage lands. Buyers get early warning instead of a firefight.",
    },
    {
      title: "Inventory stockouts and overstock",
      body:
        "Service targets and working-capital targets pull in opposite directions when safety stock is set by a flat rule. We apply multi-echelon optimisation so each node carries the cover its demand variability actually justifies. Fill rates hold while cash tied up in slow movers comes down.",
    },
    {
      title: "Component and raw material shortages",
      body:
        "Exploded BOMs, netting errors and unposted receipts turn material planning into guesswork, and expedite freight quietly eats margin. We build MRP that nets on-hand and open orders in real time, applies live lead times and MOQ rules, and flags shortages far enough ahead to fix them cheaply.",
    },
    {
      title: "Inefficient warehouse operations",
      body:
        "Slow picks, high labour cost and accuracy issues are usually fixed at the source: layout, slotting and task sequencing. We orchestrate receiving, putaway, picking, packing and shipping, balance labour across shifts and give supervisors live visibility into work and exceptions.",
    },
    {
      title: "High returns and reverse logistics complexity",
      body:
        "Returns arrive unplanned, grading is manual and resale value falls the longer a unit sits. We automate return authorisation, use computer vision for condition grading and route each unit to the disposition that recovers the most value. Cycle time drops and recovery rate rises.",
    },
  ],
};

export const services = {
  eyebrow: "What solution do we offer?",
  titleLead: "Custom AI Supply Chain",
  titleAccent: "Software Development Solutions Do We Offer",
  body:
    "We deliver custom supply chain software development services that improve visibility, planning, inventory, operations and returns, built around your data, processes and governance.",
  items: [
    {
      title: "Enterprise Resource Planning (ERP)",
      body:
        "We deliver ERP tailored to supply chains that unifies orders, inventory, finance and operations to remove silos and slow reporting. It works as one shared data model with common workflows and real-time views, so everyone sees the same truth. We build it using Python, PyTorch and Transformers for NLP, OCR and computer vision where needed, along with machine learning and predictive analytics aligned with AI-driven supply chain management.",
      image: svcErpImg,
      alt: "An ERP dashboard projected above a laptop on a desk",
    },
    {
      title: "Material Requirements Planning (MRP)",
      body:
        "We develop MRP that tells you what to buy and make, and when, so shortages, overbuys and last-minute expedites do not disrupt plans. It works by exploding BOMs, netting on-hand and open orders, and applying lead times and MOQ rules to create time-phased supply plans. You gain higher schedule adherence, better inventory turns, fewer line stops and lower premium freight.",
      image: svcMrpImg,
      alt: "A global planning network rendered over a world map",
    },
    {
      title: "Asset Tracking Solutions",
      body:
        "Our custom-built asset tracking solution locates tools, pallets, containers and equipment to stop loss and idle time that slow throughput. It works by blending signals like RFID, BLE, GPS and computer vision to show location, status and usage in near real time. Results include higher asset utilisation, lower loss rate, faster maintenance response and improved OEE.",
      image: svcAssetImg,
      alt: "An analyst reviewing asset utilisation charts on a laptop",
    },
    {
      title: "Order Management Software (OMS)",
      body:
        "We design OMS that centralises multi-channel orders to reduce errors, missed promises and manual re-keying that drive customer pain. It works by validating orders, promising realistic ship dates, allocating to the best node and orchestrating fulfilment and returns end to end. We build it using Python, PyTorch, ETA prediction, allocation optimisation and transformer-based NLP for validations.",
      image: svcOmsImg,
      alt: "Stacked cartons beside a rising order-volume chart",
    },
    {
      title: "Warehouse Management Systems (WMS)",
      body:
        "We craft WMS that runs receiving, putaway, picking, packing and shipping, so slow picks, high labour cost and accuracy issues are fixed at the source. It works by orchestrating tasks, slotting fast movers well, balancing labour and giving supervisors live visibility into work and exceptions. You see more picks per hour, lower cost per order, fewer mis-picks and shorter dock-to-stock times.",
      image: svcWmsImg,
      alt: "A warehouse supervisor operating a WMS console on a tablet",
    },
    {
      title: "Document Management",
      body:
        "Axiomra builds document management that captures, classifies and routes POs, invoices, BOLs, specs and quality records to remove manual keying and audit stress. It works by ingesting files and images, extracting key fields, validating against master data and pushing approvals through clear workflows. Benefits are faster cycle time, fewer errors and chargebacks, quick audit readiness and stronger compliance.",
      image: svcDocumentImg,
      alt: "Digital documents flowing through an automated approval workflow",
    },
    {
      title: "Supply Chain Risk Management",
      body:
        "We implement risk management that spots supplier issues, weather events, strikes and route delays early so teams can act before service drops. It works by fusing internal metrics like lead times and quality with external signals such as news and geo risks to score and alert on disruption. We build it with Python, NLP transformers for news, predictive analytics for early warning and machine learning scoring models.",
      image: svcRiskImg,
      alt: "A risk map highlighting disrupted lanes across a live network",
    },
    {
      title: "Logistics Management",
      body:
        "Our team creates logistics management to plan, tender, route and track shipments so freight cost and missed windows go down. It works by consolidating loads, choosing the right mode and carrier, optimising routes and predicting ETAs using live signals. We develop this with Python, PyTorch, routing optimisation, ETA prediction and predictive analytics inside supply chain management software development solutions.",
      image: svcLogisticsImg,
      alt: "A logistics controller checking inventory movement on a tablet",
    },
    {
      title: "Procurement Management",
      body:
        "Axiomra engineers procurement management that streamlines source-to-pay to cut long cycle times, price variance and maverick spend. It works by guiding requests, ranking suppliers, checking prices and terms and automating approvals and three-way matches with clear evidence. We build it using Python, transformer-based NLP to normalise items and suppliers, machine learning for supplier scoring and price anomaly detection.",
      image: svcProcurementImg,
      alt: "A buyer running a digital procurement workflow on a laptop",
    },
    {
      title: "Supplier Relationship Management",
      body:
        "We design SRM to improve supplier performance and collaboration so late POs, defects and communication gaps reduce over time. It works by sharing plans, tracking scorecards, flagging trends early and running structured reviews with clear actions and owners. We create it with Python, predictive analytics for quality and delivery, NLP for sentiment in notes and machine learning risk scoring.",
      image: svcSupplierImg,
      alt: "A supplier collaboration network shown as connected hex tiles",
    },
    {
      title: "Supply Chain Analytics",
      body:
        "Axiomra develops supply chain analytics that turns raw data into clear insights and what-if scenarios to end blind spots and slow decisions. It works by harmonising data, surfacing drivers and letting users test scenarios against targets and constraints with a simple planning view. We build it using Python, PyTorch for forecasting, causal and optimisation models, and an NLP copilot for AI-powered supply chain solutions.",
      image: svcAnalyticsImg,
      alt: "Interlocking gears representing an analytics pipeline",
    },
    {
      title: "Mobile Application Development",
      body:
        "We create mobile apps that put key warehouse, logistics and field workflows in the hands of frontline teams to remove paper and delays. It works by enabling scanning, task updates, approvals and issue capture on any device with offline support and push alerts. Our team builds cross-platform apps with Python backends, on-device OCR and computer vision, so actions are simple and timely.",
      image: svcMobileImg,
      alt: "A field team reviewing a 3D logistics map on a mobile device",
    },
  ],
};

export const midCta = {
  title: "Kickstart Custom AI Supply Chain Optimisation With Axiomra Experts",
  body:
    "Find quick wins in planning, logistics and fulfilment, then build a realistic roadmap to scale value. Get practical guidance on integrations, data readiness and the success metrics your teams need.",
  ctaText: "Get in Touch",
  background: midCtaBgImg,
};

export const solutions = {
  eyebrow: "What types of services do we offer?",
  titleLead: "Custom AI Supply Chain Management Software",
  titleAccent: "Development Services For Enterprises",
  body:
    "We design and build custom AI and workflow solutions across the end-to-end supply chain. Our teams integrate with your ERP, WMS, TMS, PLM, YMS and carrier platforms to orchestrate planning, sourcing, manufacturing, logistics and service — on-premise, in a private cloud, or in a hybrid environment.",
  items: [
    {
      title: "Supply chain management AI software consulting",
      body:
        "We offer hands-on consulting that starts with stakeholder workshops, data and master data reviews, and a quick maturity scan across planning, logistics, warehousing and procurement. The outcome is a clear roadmap with high-value use cases, security and governance, and an ROI model. This solves S&OP misalignment, rigid networks and fragmented data that slow decisions.",
      image: solConsultingImg,
      alt: "A consultant mapping a global supply network in a workshop",
    },
    {
      title: "End-to-end AI supply chain management software development",
      body:
        "Our custom builds cover demand sensing, inventory and replenishment, order orchestration, yard and dock scheduling, transportation intelligence and last-mile delivery optimisation. We design, develop and validate apps that respect your constraints and policies, then deploy on-premise, private cloud or hybrid. This fixes late orders, mis-picks, capacity bottlenecks and compliance gaps.",
      image: solEndToEndImg,
      alt: "A control room view of an automated distribution centre",
    },
    {
      title: "AI integration into existing SCM software",
      body:
        "Axiomra builds seamless AI add-ons for your ERP, WMS, TMS, YMS, PLM and carrier platforms using APIs and EDI, backed by strong master data management and data quality. These integrations bring tender acceptance prediction, mode and carrier mix optimisation, predictive ETA and track and trace, and dynamic allocation into tools your teams already use. This replaces email and spreadsheet work and reduces freight cost volatility.",
      image: solIntegrationImg,
      alt: "An integration layer connecting enterprise supply systems",
    },
    {
      title: "Supply chain control tower dashboards",
      body:
        "We build a single operating picture across suppliers, plants, carriers and customers, with exception queues instead of static reports. Live ETAs, inventory positions and risk scores sit next to the action each owner can take, so escalations are resolved in the tower rather than over email. Leaders get one number everyone trusts at the daily stand-up.",
      image: solControlTowerImg,
      alt: "A control tower dashboard tracking shipments in real time",
    },
    {
      title: "Mobile and frontline supply chain apps",
      body:
        "Warehouse, yard and field teams work on handhelds, not desktops. We ship cross-platform apps for scanning, task updates, proof of delivery and issue capture, with offline support and push alerts so a lost connection never stops the shift. Data lands in your core systems immediately rather than at end of day.",
      image: solMobileImg,
      alt: "A driver capturing proof of delivery on a rugged handheld",
    },
    {
      title: "Legacy SCM modernisation",
      body:
        "We modernise ageing planning and warehouse stacks without a big-bang switch. Capabilities move across in slices behind a stable interface, with data migrated and reconciled as we go, so operations keep running while the platform changes underneath. You retire technical debt on a schedule your business can absorb.",
      image: solModerniseImg,
      alt: "Engineers migrating a legacy logistics platform to the cloud",
    },
  ],
};

export const stakeholders = {
  eyebrow: "Whom do we build custom solutions for?",
  titleLead: "Stakeholders We Serve",
  titleAccent: "Across Supply Chains",
  items: [
    {
      title: "Supply Chain Directors & Managers",
      body:
        "One operating picture across planning, inventory and logistics, with the exception queues and scenario tools needed to hit service targets without carrying dead working capital.",
      image: stkDirectorsImg,
      alt: "A supply chain manager reviewing operations on a tablet",
    },
    {
      title: "Logistics Providers & 3PLs",
      body:
        "Multi-client orchestration, carrier and mode optimisation, predictive ETAs and billing-grade event data, so margin holds as volumes and service commitments grow.",
      image: stk3plImg,
      alt: "A logistics supervisor coordinating a yard by phone",
    },
    {
      title: "Distributors & Wholesalers",
      body:
        "Demand sensing, multi-echelon replenishment and order promising built for wide catalogues and thin margins, so fill rates rise while slow-moving stock comes down.",
      image: stkDistributorsImg,
      alt: "A distribution team confirming a delivery handover",
    },
  ],
};

export const subIndustries = {
  eyebrow: "Which supply chain sectors do we serve?",
  titleLead: "Sub-Industries We Support",
  titleAccent: "Across Supply Chains",
  body:
    "Every sector carries its own constraints — shelf life, dangerous goods, serialisation, seasonality. We build to those constraints rather than around them.",
  items: [
    {
      label: "Manufacturing",
      body:
        "Production plans that hold when materials slip, built on live BOM netting and capacity constraints rather than a weekly spreadsheet.",
      points: ["MRP and finite scheduling", "Line-stop early warning", "OEE and quality analytics"],
      image: subManufacturingImg,
      alt: "A robotic arm working a lit production line",
    },
    {
      label: "Inventory Management",
      body:
        "Multi-echelon policies that set cover by actual demand variability, so service targets and working capital stop fighting each other.",
      points: ["Safety-stock optimisation", "Automated replenishment", "Slow and excess recovery"],
      image: subInventoryImg,
      alt: "Warehouse staff checking stock levels on a tablet",
    },
    {
      label: "Transportation",
      body:
        "Load building, carrier selection and route optimisation with predictive ETAs, so freight spend falls without missing delivery windows.",
      points: ["Mode and carrier mix", "Predictive ETA", "Track and trace"],
      image: subTransportImg,
      alt: "A freight fleet moving through a distribution hub at dusk",
    },
    {
      label: "Warehousing",
      body:
        "Slotting, task interleaving and labour balancing that raise picks per hour without adding headcount or new racking.",
      points: ["Dynamic slotting", "Pick-path optimisation", "Labour forecasting"],
      image: subWarehousingImg,
      alt: "High racking inside a modern distribution centre",
    },
    {
      label: "Maritime & Ports",
      body:
        "Container visibility, berth and yard planning, and demurrage exposure tracked before the charges land rather than after.",
      points: ["Container milestone tracking", "Demurrage and detention alerts", "Port congestion forecasting"],
      image: subMaritimeImg,
      alt: "Container cranes working a port terminal at dawn",
    },
    {
      label: "Retail Supply Chain",
      body:
        "Store-level forecasting, allocation and replenishment that respect promotions, planograms and regional demand differences.",
      points: ["Store-level demand sensing", "Promotion uplift modelling", "Markdown optimisation"],
      image: subRetailImg,
      alt: "A retail team checking backroom stock against a device",
    },
    {
      label: "Cold Chain",
      body:
        "Temperature-controlled lanes with excursion detection, shelf-life aware routing and the audit trail regulators expect.",
      points: ["IoT excursion alerts", "Shelf-life aware allocation", "Compliance reporting"],
      image: subColdChainImg,
      alt: "A temperature-controlled cold storage facility",
    },
    {
      label: "E-commerce Fulfilment",
      body:
        "Order orchestration across nodes and channels, with promise dates customers can trust and returns handled as a first-class flow.",
      points: ["Distributed order management", "Ship-from-store logic", "Automated returns grading"],
      image: subEcommerceImg,
      alt: "A fulfilment operator packing e-commerce orders",
    },
    {
      label: "Automotive",
      body:
        "Sequenced supply for assembly lines, tier-n visibility and shortage simulation so a single component does not stop production.",
      points: ["Tier-n supplier visibility", "Sequenced JIT delivery", "Shortage scenario planning"],
      image: subAutomotiveImg,
      alt: "An automotive assembly line in operation",
    },
    {
      label: "Pharmaceutical",
      body:
        "Serialisation, lot genealogy and chain-of-custody built to GxP expectations, with recall traceability in minutes rather than days.",
      points: ["Serialisation and track-trace", "Lot genealogy", "GxP-ready audit trail"],
      image: subPharmaImg,
      alt: "A pharmaceutical packaging and inspection line",
    },
    {
      label: "Air Cargo",
      body:
        "Capacity booking, ULD build-up and customs documentation automated so tight connection windows are actually met.",
      points: ["Capacity and ULD planning", "Customs document automation", "Connection risk alerts"],
      image: subAirCargoImg,
      alt: "Air cargo being loaded onto a freighter aircraft",
    },
    {
      label: "Rail Freight",
      body:
        "Wagon utilisation, intermodal handovers and yard dwell tracked end to end, so rail legs stop being the blind spot in the lane.",
      points: ["Wagon and asset utilisation", "Intermodal handover tracking", "Yard dwell analytics"],
      image: subRailImg,
      alt: "A freight train moving containers along a rail corridor",
    },
  ],
};

export const benefits = {
  eyebrow: "What can you optimise with our AI-powered solutions?",
  titleLead: "Practical AI Benefits Your",
  titleAccent: "Supply Chain Teams Will See Fast",
  items: [
    {
      title: "Forecast Accuracy",
      body:
        "AI reads orders, seasonality and simple signals to improve forecasts, so plans are closer to reality and teams buy and make the right amount.",
    },
    {
      title: "Reduce Stockouts",
      body:
        "Smarter planning and timely reorders keep key items available, which cuts lost sales and keeps customers satisfied.",
    },
    {
      title: "Lower Transport Costs",
      body:
        "Carrier and route choices get smarter with predicted delays and capacity, so loads are accepted more often, delays fall and costs drop.",
    },
    {
      title: "Faster Warehousing",
      body:
        "Better storage and picking guidance moves staff to the next best task, raising picks per hour and lowering cost per order.",
    },
    {
      title: "Better Service Levels",
      body:
        "Orders are promised with realistic dates and sent from the best location, which lifts on-time delivery and shortens the overall cycle.",
    },
    {
      title: "Inventory Cost Reduction",
      body:
        "Multi-echelon policies set service targets and right-size buffers. Companies lift inventory turns and lower carrying cost while protecting fill rate.",
    },
  ],
};

export const build = {
  title: "Schedule Your Supply Chain AI Strategy Consultation With Axiomra",
  body:
    "Map priority use cases, ROI and a secure delivery plan aligned to your systems and policies. Accelerate from discovery to a validated pilot in weeks with clear governance and adoption steps.",
  ctaText: "Request a Consultation",
  texture: textureBgImg,
  image: buildVisualImg,
  alt: "A planning team reviewing a supply chain roadmap together",
};

export const techStrip = {
  eyebrow: "Technologies we work with",
  titleLead: "Expertise In Advanced",
  titleAccent: "Development Technologies",
  body:
    "The same production-grade toolchain sits under every supply chain platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "PyTorch", "TensorFlow", "scikit-learn",
        "Prophet", "XGBoost", "LightGBM", "OR-Tools", "Gurobi", "YOLO", "Tesseract OCR",
        "LangChain", "Vertex AI", "OpenAI Embeddings", "Guardrails", "MLflow",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "FastAPI", "Django", "GraphQL", "PostgreSQL", "MongoDB", "TimescaleDB",
        "Redis", "Elasticsearch", "Kafka", "RabbitMQ", "Airflow", "dbt", "Snowflake", "Databricks",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "D3.js", "Deck.gl", "Mapbox GL",
        "AG Grid", "React Native", "Flutter", "Vite",
      ],
    },
    {
      id: "cloud",
      label: "Cloud",
      items: ["AWS", "Google Cloud", "Azure", "Snowflake", "Cloudflare", "On-premise", "Private cloud", "Hybrid"],
    },
    {
      id: "devops",
      label: "DevOps",
      items: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "GitLab CI", "Nginx", "Prometheus", "Grafana", "Sentry"],
    },
    {
      id: "scm",
      label: "SCM Platforms",
      items: ["SAP", "Oracle SCM", "Dynamics 365", "Manhattan", "Blue Yonder", "Kinaxis", "EDI X12", "EDIFACT", "GS1", "Shopify"],
    },
    {
      id: "iot",
      label: "IoT & Edge",
      items: ["MQTT", "RFID", "BLE Beacons", "GPS Telematics", "AWS IoT Core", "Edge OCR", "Industrial PLC", "OPC UA"],
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who do we work with?",
  titleLead: "Explore The Range Of",
  titleAccent: "Supply Chain Businesses We Support",
  body:
    "We excel in custom AI-powered supply chain software development that drives measurable results. Whether you are digitising a single warehouse or orchestrating a multi-country network, we turn it into a platform your operations team actually runs on.",
  rows: [
    {
      label: "Startups",
      body: "We help logistics and supply chain startups get a first platform live fast: a working order or inventory core, the integrations that unlock a pilot customer, and the metrics that prove the model before the next raise.",
    },
    {
      label: "Scale-ups",
      body: "Volume exposes every manual step. We help scale-ups automate fulfilment and transport operations, unify reporting across sites, and move from spreadsheet workarounds to systems that hold at ten times the throughput.",
    },
    {
      label: "Small and medium-sized businesses",
      body: "SMB operations teams carry enterprise complexity with a fraction of the headcount. Our forecasting, replenishment and warehouse tooling closes that gap without an enterprise budget or a year-long rollout.",
    },
    {
      label: "Enterprises",
      body: "We partner with enterprise supply chain organisations on governed data layers, multi-site orchestration and AI systems that satisfy security, compliance and procurement before they ever reach production.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Our Clients Trust Us For Top-Notch AI Solutions",
  titleAccent: "And Exceptional Results",
  items: [
    {
      name: "Faisal",
      role: "CEO, FormOle",
      quote:
        "Axiomra has strong software development skills and knowledge of industry tools and AI videos. Their willingness to take any problem, break it down and get through it is impressive.",
      rating: 5,
    },
    {
      name: "Alan",
      role: "Chairman & CEO, Peersana",
      quote:
        "I am most impressed with Axiomra's robust team, discipline, culture, project management skills and extensive pool of resources.",
      rating: 5,
    },
    {
      name: "Pablo Sanchez",
      role: "CEO, Notebook",
      quote:
        "Excellent service. The team planned the project really well, keeping me in the loop. Throughout the project they maintained a fluid and professional conversation.",
      rating: 5,
    },
  ],
};

export const showcase = {
  eyebrow: "What innovations have we delivered to businesses?",
  titleLead: "Showcasing Our",
  titleAccent: "AI Development Projects",
  body:
    "Discover our portfolio showcasing our expertise as an AI development company, delivering state-of-the-art solutions to address complex supply chain challenges.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Why Axiomra For Custom AI",
  titleAccent: "Supply Chain Management Software Development",
  cards: [
    {
      icon: "Target",
      title: "Built For You, No Vendor Lock-In",
      body:
        "We design and ship software that fits your process, uses your data and tools, and runs where you choose, so you keep control and flexibility. No licence trap, no forced migration when priorities change.",
    },
    {
      icon: "Layers",
      title: "Seamless Integration",
      body:
        "ERP, WMS, TMS, PLM and MDM connect through APIs and EDI, which gives 3PL visibility and partner onboarding while removing manual work and shadow spreadsheets.",
    },
    {
      icon: "ShieldCheck",
      title: "60-Day Support And Enablement",
      body:
        "Our team stays engaged for 60 days to monitor performance, resolve issues and apply small improvements. We train planners, warehouse staff and leaders with role-based sessions so adoption accelerates as users learn how to run workflows and act on AI insights.",
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
  title: "Blog Insights On AI And Supply Chain Innovation",
  body:
    "Explore practical guidance on AI solutions for supply chain management, from scenario planning and what-if analysis to last-mile delivery optimisation and emissions tracking. Learn how leaders fund, govern and scale initiatives that move the P&L.",
  posts: [
    {
      title: "10 Proven AI In Retail Use Cases That Boosted Sales In 2026",
      tag: "Retail",
      image: blog1Img,
      alt: "A retail analytics dashboard glowing on a store floor",
    },
    {
      title: "15 Best Logistics Software Development Companies In 2026",
      tag: "Logistics",
      image: blog2Img,
      alt: "A logistics network visualised across a digital map",
    },
    {
      title: "AI In Logistics And Supply Chain: Use Cases And Implementation",
      tag: "Supply Chain",
      image: blog3Img,
      alt: "Freight containers overlaid with live tracking data",
    },
  ],
};

export const faqs = [
  {
    q: "What services do you offer in supply chain software development?",
    a: "Strategy and AI consulting, custom platform development across ERP, MRP, WMS, TMS and OMS, AI integration into the systems you already run, mobile apps for frontline teams, data engineering and the analytics layer on top. We also take on modernisation work where a legacy stack has to keep running while it changes underneath.",
  },
  {
    q: "How do you measure ROI for a new platform or AI feature?",
    a: "We agree the baseline before we build: fill rate, forecast error, cost per order, premium freight spend, dock-to-stock time. Each use case is scoped against one of those numbers, measured after go-live against the same definition, and dropped if it does not move.",
  },
  {
    q: "Can AI help with driver and labour shortages?",
    a: "It does not create capacity, but it uses what you have far better. Labour forecasting matches shifts to real workload, task interleaving cuts unproductive travel, and route and load optimisation reduces the driver hours a given volume needs. Most clients see the gap close through productivity rather than hiring.",
  },
  {
    q: "How do you address component and raw material shortages?",
    a: "Real-time MRP netting with live lead times surfaces shortages weeks earlier than a batch run. We add supplier risk scoring and alternate-source suggestions so buyers can act while the cheap options are still open, instead of paying for expedited freight.",
  },
  {
    q: "How do you fix inventory discrepancies between system records and physical counts?",
    a: "By finding the process step that creates them. We instrument receiving, putaway and picking, add cycle counting driven by discrepancy risk rather than a flat schedule, and use computer vision or scan validation at the points where errors actually occur.",
  },
  {
    q: "Can you modernise a legacy stack without a big switch?",
    a: "Yes, and we recommend it. Capabilities move across in slices behind a stable interface, with data migrated and reconciled as we go. Operations keep running throughout, and you can stop or re-sequence between slices without stranding the investment.",
  },
  {
    q: "Do you build custom WMS, TMS and OMS for large networks?",
    a: "Yes, for multi-site and multi-client networks including 3PL models. We build what your network genuinely needs and integrate the rest. Where a packaged product already fits a function well, we will say so rather than rebuild it.",
  },
  {
    q: "How long does a typical MVP take from kick-off to pilot?",
    a: "A scoped MVP with one capability, such as demand forecasting or a warehouse task engine, typically runs eight to twelve weeks to a live pilot. A full platform spanning planning, warehousing and transport runs four to nine months, delivered in increments your teams can use from the first sprint.",
  },
  {
    q: "Can you integrate with our current ERP, WMS and TMS without disrupting operations?",
    a: "Yes. Integrations run through APIs and EDI against a hardened master data layer, are built and validated in a parallel environment, and cut over per flow. Nothing goes live until it reconciles against the system of record.",
  },
  {
    q: "How do you reduce risk on a complex multi-site programme?",
    a: "One site becomes the reference implementation and proves the model end to end. Later sites inherit a tested template with only local variations configured, so risk and cost fall with each rollout instead of repeating from zero.",
  },
  {
    q: "Are you a supply chain software development company or do you sell a product?",
    a: "We are a development company. You own the code and the data, deployment runs where your policies require — on-premise, private cloud or hybrid — and there is no licence dependency holding the platform hostage.",
  },
  {
    q: "Why partner with Axiomra for supply chain software development services?",
    a: "Because we build for operators, not demos. Our teams work inside your constraints — master data quality, union rules, customs, cold chain, GxP — and stay engaged for 60 days after delivery to tune performance and train the people who run it every day.",
  },
];

export const finalCta = {
  title: "Schedule Your Supply Chain AI Consultation Today",
  subtitle:
    "Share your goals, pain points and current systems, and we will map quick wins and a realistic roadmap. Get a clear estimate, timeline and deployment plan that fits your security and compliance needs.",
  buttonText: "Contact our team",
  background: finalCtaBgImg,
};
