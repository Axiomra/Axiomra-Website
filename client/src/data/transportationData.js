/**
 * Copy and imagery for the Transportation & Logistics industry page
 * (/industries/transportation).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/transportation/hero.webp";
import introImg from "../assets/industries/transportation/intro.webp";

import solTmsImg from "../assets/industries/transportation/sol-tms.webp";
import solFleetImg from "../assets/industries/transportation/sol-fleet.webp";
import solFreightImg from "../assets/industries/transportation/sol-freight.webp";
import solAssetImg from "../assets/industries/transportation/sol-asset.webp";
import solMobilityImg from "../assets/industries/transportation/sol-mobility.webp";
import solSharingImg from "../assets/industries/transportation/sol-sharing.webp";
import solTaxiImg from "../assets/industries/transportation/sol-taxi.webp";
import solAirportImg from "../assets/industries/transportation/sol-airport.webp";

import midCtaBgImg from "../assets/industries/transportation/midcta-bg.webp";

import svcCustomImg from "../assets/industries/transportation/svc-custom.webp";
import svcMvpImg from "../assets/industries/transportation/svc-mvp.webp";
import svcApiImg from "../assets/industries/transportation/svc-api.webp";
import svcMobileImg from "../assets/industries/transportation/svc-mobile.webp";
import svcModernImg from "../assets/industries/transportation/svc-modern.webp";

import modeTruckingImg from "../assets/industries/transportation/mode-trucking.webp";
import modeRailImg from "../assets/industries/transportation/mode-rail.webp";
import modeOceanImg from "../assets/industries/transportation/mode-ocean.webp";
import modeAirImg from "../assets/industries/transportation/mode-air.webp";
import modeLastmileImg from "../assets/industries/transportation/mode-lastmile.webp";
import modeTransitImg from "../assets/industries/transportation/mode-transit.webp";
import modeRideshareImg from "../assets/industries/transportation/mode-rideshare.webp";
import modePortsImg from "../assets/industries/transportation/mode-ports.webp";
import modeColdchainImg from "../assets/industries/transportation/mode-coldchain.webp";
import modeMaintenanceImg from "../assets/industries/transportation/mode-maintenance.webp";
import modeWarehouseImg from "../assets/industries/transportation/mode-warehouse.webp";
import modeTankerImg from "../assets/industries/transportation/mode-tanker.webp";

import textureBgImg from "../assets/industries/transportation/texture-bg.webp";
import buildVisualImg from "../assets/industries/transportation/build-visual.webp";

import blog1Img from "../assets/industries/transportation/blog-1.webp";
import blog2Img from "../assets/industries/transportation/blog-2.webp";
import blog3Img from "../assets/industries/transportation/blog-3.webp";
import finalCtaBgImg from "../assets/industries/transportation/final-cta.webp";

export const TRANSPORTATION_SLUG = "transportation";

export const hero = {
  eyebrow: "AI for transportation & logistics",
  titleLead: "Custom",
  titleAccent: "Transportation Software Development",
  titleTail: "For Networks That Never Stop",
  body:
    "Fleet telematics, route optimisation, freight visibility and mobility platforms, engineered for operations where a delayed load, an idling truck or a missed slot is measured in money the same day.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "An aerial night view of a multi-level motorway interchange traced by traffic light trails",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "Transportation Software That Moves Freight, Fleets",
  titleAccent: "And People With Less Waste",
  paragraphs: [
    "Most transport operations do not lack data; they lack one place where telematics, TMS, ELD, WMS and customer systems agree on where a load actually is. We build that layer, then put the decisions on top of it: dispatch, routing, capacity, maintenance and ETA, so planners stop reconciling four screens before making a call.",
    "Every platform we ship is built against the constraints your network really runs on: driver hours, dock windows, cold-chain tolerances, tariffs and fuel. The result is software your dispatchers open at 5am because it is faster than the phone, not because a policy says they must.",
  ],
  ctaText: "Book a free transportation tech consultation",
  image: introImg,
  alt: "Two operators at a transit control-room desk facing a wall of live network displays",
};

export const impact = {
  titleLead: "What Digitalisation Is Actually Worth",
  titleAccent: "In Transport And Logistics",
  body:
    "The pressure on transport networks is not theoretical: demand is rising faster than capacity, and the margin sits in the miles, minutes and empty space nobody currently measures. These are the numbers that frame most of the projects we are asked to build.",
  stats: [
    {
      value: "$1.54T",
      label:
        "of value digitalisation is projected to add for logistics operators through the next decade of connected, data-led networks.",
      source: "World Economic Forum, Digital Transformation Initiative, Logistics",
    },
    {
      value: "78%",
      label:
        "projected growth in last-mile delivery demand across the world's 100 largest cities by 2030.",
      source: "World Economic Forum, The Future of the Last-Mile Ecosystem",
    },
    {
      value: "21%",
      label:
        "rise in urban congestion by 2030 if delivery growth is absorbed without smarter routing and consolidation.",
      source: "World Economic Forum, The Future of the Last-Mile Ecosystem",
    },
  ],
};

/**
 * The challenge rail. Each entry is a barrier transport operators hit, and the
 * platform capability we build to remove it.
 */
export const challenges = {
  eyebrow: "Overcoming key barriers in transport",
  titleLead: "Solving The Problems Transport Operators Actually Have",
  titleAccent: "With Custom Software",
  items: [
    {
      title: "Nobody Can Say Where The Load Is",
      body:
        "Telematics says one thing, the carrier portal another, and the customer is asking a third party. We build the tracking layer that reconciles GPS, EDI, ELD and carrier APIs into one shipment record with a single status, so a service call is answered in seconds instead of escalated to a planner.",
    },
    {
      title: "Routes Planned On Yesterday's Map",
      body:
        "Static routes ignore traffic, weather, dock congestion and driver hours, then blow up at 3pm. Our optimisation engines replan continuously against live conditions and real constraints (HOS, vehicle class, cold-chain windows, tolls) and hand the driver a sequence that survives the day.",
    },
    {
      title: "Empty Miles Nobody Prices",
      body:
        "Deadhead and half-full trailers are the largest silent cost in most road networks. We build load-matching, backhaul and consolidation models on top of your own order book, so the second leg is sold before the first one finishes rather than written off as an operating fact.",
    },
    {
      title: "Maintenance That Happens After The Breakdown",
      body:
        "Fixed-interval servicing replaces parts too early and still misses the failure. We combine engine fault codes, duty cycles and sensor drift into predictive maintenance that schedules a vehicle into a workshop slot while it is still earning, with the evidence behind every recommendation.",
    },
    {
      title: "Compliance Assembled By Hand",
      body:
        "Hours of service, tachograph data, dangerous-goods paperwork, customs and emissions reporting all arrive in different formats and get stitched together by someone on a Friday. We automate capture, validation and submission, and keep an audit trail that answers a regulator without a week of retrieval.",
    },
    {
      title: "Customers Who Only Hear From You When It's Late",
      body:
        "Shippers churn over visibility more than price. We build the customer-facing layer of predictive ETAs, exception alerts, proof of delivery and self-service booking, so your account team spends its day selling rather than reading tracking numbers down a phone line.",
    },
    {
      title: "Systems That Cannot Absorb Another Integration",
      body:
        "A decade-old TMS with bolt-ons becomes the reason you cannot onboard a carrier or a customer quickly. We modernise in stages behind a stable API layer, migrating what earns its place and retiring the rest, without taking dispatch offline for a single shift.",
    },
  ],
};

export const solutions = {
  eyebrow: "What transportation solutions do we offer?",
  titleLead: "Tailored Transportation Software Solutions",
  titleAccent: "For Every Part Of The Network",
  body:
    "From a transport management system that finally reflects how your dispatchers work, to the rider app that has to load on a weak signal at a bus stop: these are the platforms operators ask us for most.",
  items: [
    {
      title: "Transport Management Systems (TMS)",
      body:
        "One operating picture for orders, planning, dispatch, carrier selection, rating and settlement. We build TMS platforms around the way your planners actually sequence a day, with automated tendering, live exception handling and the reporting your finance team stops rebuilding in spreadsheets.",
      image: solTmsImg,
      alt: "An operator at a control desk facing a wall of live monitoring screens",
    },
    {
      title: "Fleet Management & Telematics",
      body:
        "Vehicle health, utilisation, fuel, driver behaviour and compliance in one view. We ingest telematics, CAN bus and ELD feeds, then surface the handful of signals that change a decision today: which asset is idle, which is due, which driver needs coaching, which route is burning fuel.",
      image: solFleetImg,
      alt: "A line of semi trucks parked in a carrier yard",
    },
    {
      title: "Freight Forwarding & Brokerage Platforms",
      body:
        "Quoting, capacity sourcing, documentation and multi-modal tracking for forwarders and brokers. Automated rating across lanes and modes, carrier scorecards, margin visibility per load, and customs paperwork generated from the shipment record rather than retyped from it.",
      image: solFreightImg,
      alt: "A loaded container ship under way on open water",
    },
    {
      title: "Asset & Container Tracking",
      body:
        "IoT-backed visibility for trailers, containers, reefers, swap bodies and high-value cargo. Geofencing, dwell analytics, tamper and temperature alerting, and a utilisation model that tells you how many assets you genuinely need before you lease more.",
      image: solAssetImg,
      alt: "A gantry crane lowering a shipping container onto a stack at a terminal",
    },
    {
      title: "Public Transit & Mobility Platforms",
      body:
        "Scheduling, AVL, passenger information, ticketing and demand-responsive services for operators and authorities. Real-time arrival prediction that holds up in traffic, accessible journey planning, and the ridership analytics that justify the next timetable change.",
      image: solMobilityImg,
      alt: "An articulated trolleybus moving along a tree-lined city road",
    },
    {
      title: "Micromobility & Vehicle Sharing",
      body:
        "End-to-end platforms for scooter, bike, car and van sharing: onboarding and identity checks, geofenced operating zones, dynamic pricing, battery and rebalancing operations, and the field-ops app the street team uses all day.",
      image: solSharingImg,
      alt: "A row of shared e-scooters parked at a kerbside bay",
    },
    {
      title: "Ride-Hailing & Taxi Dispatch",
      body:
        "Matching, dispatch, surge, driver supply and payments built for the density you actually operate at. We handle the hard parts properly: dispatch latency, fair allocation, fraud and driver earnings transparency. Those are what decide retention on both sides of the market.",
      image: solTaxiImg,
      alt: "A yellow ride-hailing taxi seen from above on asphalt",
    },
    {
      title: "Airport, Port & Terminal Operations",
      body:
        "Slot management, turnaround tracking, yard and gate optimisation, and ground-handling coordination. We connect the planning system to what is actually happening on the apron or the quay, so a delay is re-sequenced in minutes rather than absorbed across the shift.",
      image: solAirportImg,
      alt: "A widebody aircraft being serviced by ground handlers at the gate",
    },
  ],
};

export const midCta = {
  title: "Looking For Something Else?",
  body:
    "These are the transportation solutions we get asked for most. If you have a lane, a terminal or a legacy TMS that nobody wants to touch, that is usually the conversation worth having first.",
  ctaText: "Get in touch",
  background: midCtaBgImg,
};

export const services = {
  eyebrow: "How we deliver",
  titleLead: "Transportation Software Development Services",
  titleAccent: "Sized To Your Operation",
  body:
    "Five ways we engage, from a scoped pilot on one lane to a multi-year platform partnership across a national network. Every engagement is staged so the first useful capability reaches dispatch early, not at the end.",
  items: [
    {
      title: "Custom Transportation Software Development",
      body:
        "End-to-end delivery of the platform itself: domain model, services, integrations, interfaces and the release process behind them. We start with the workflow costing your team the most hours, usually planning or exception handling, ship it, and grow the system outward from something already in daily use.",
      extra:
        "You get working software in weekly increments, with the first usable capability live long before the full scope lands. Nothing is built behind a curtain for a quarter and unveiled at the end, which is how transport projects usually miss a peak season.",
      points: [
        "Discovery, architecture and a costed backlog inside the first three weeks",
        "Weekly releases to a staging environment your dispatchers can open",
        "Handover package: documentation, tests and the runbook your team keeps",
      ],
      image: svcCustomImg,
      alt: "An analyst reviewing code and performance charts on a laptop",
    },
    {
      title: "MVP & Proof Of Concept Builds",
      body:
        "A narrow, honest first version that proves the idea against real loads and real drivers before anyone commits a platform budget. We pick the one hypothesis that carries the business case and build only what tests it.",
      extra:
        "You leave with a working product and a decision, including the version of the decision that says stop. We would rather tell you an idea does not clear the bar in eight weeks than in eighteen months.",
      points: [
        "One hypothesis, one lane or depot, a measurable success threshold",
        "Production-grade foundations, so a successful pilot is extended and not rewritten",
        "A written recommendation at the end, including the case against scaling it",
      ],
      image: svcMvpImg,
      alt: "Someone sketching a system diagram on a whiteboard during a planning session",
    },
    {
      title: "Integration, Telematics & API Engineering",
      body:
        "The unglamorous layer that decides whether anything else works: telematics providers, ELD, EDI (204/214/990), TMS and WMS, carrier and customs APIs, payment and fuel-card feeds, all reconciled into one schema with retries, backfill and monitoring.",
      extra:
        "We build to the failure cases, because in transport the interesting path is the one where a provider goes dark mid-shift. Every feed has a defined behaviour when it degrades, and an alert that reaches a human before a customer does.",
      points: [
        "One integration layer across telematics, EDI, TMS, WMS and carrier APIs",
        "Idempotent ingestion with replay, so a provider outage does not lose a day",
        "Per-feed monitoring and alerting, with a documented degraded mode",
      ],
      image: svcApiImg,
      alt: "Server racks lit in blue inside a data centre aisle",
    },
    {
      title: "Driver, Rider & Field Mobile Apps",
      body:
        "The apps used in a cab, on a platform or at a loading bay. Offline-first, low-bandwidth, glove-friendly, and built so a scan, a signature or a proof of delivery survives the twenty minutes with no signal that your network definitely has.",
      extra:
        "We instrument the field experience properly, so product decisions come from what drivers and riders actually do rather than from what a workshop assumed they would do.",
      points: [
        "Offline-first sync with conflict handling, not a spinner over a dead connection",
        "Navigation, ePOD, scanning and messaging in one app, not four",
        "Battery, data and one-handed use treated as hard requirements",
      ],
      image: svcMobileImg,
      alt: "Hands on a steering wheel with a navigation app running on a dash-mounted phone",
    },
    {
      title: "Legacy Modernisation & Cloud Migration",
      body:
        "Most operators do not start from nothing; they start from a TMS older than half the fleet. We wrap it in a stable API, move capability out module by module, and retire the original only once its replacement has run a full peak.",
      extra:
        "The work is staged so every step is independently useful and independently reversible. If we stop halfway, you are still better off than when we started. That is the only honest way to modernise a system dispatch depends on.",
      points: [
        "Strangler-pattern migration behind a stable API, never a big-bang cutover",
        "Data migration with reconciliation reports your finance team can sign off",
        "Cost and capacity tuned for peak, then scaled down for the quiet weeks",
      ],
      image: svcModernImg,
      alt: "Source code on a dark screen during a modernisation project",
    },
  ],
};

/**
 * The modes we build for. Rendered as a clipped, angled card rail, so keep the
 * labels to one or two words.
 */
export const modes = {
  eyebrow: "Which modes do we serve?",
  titleLead: "We Build Custom Transportation Software",
  titleAccent: "For Every Way Things Move",
  body:
    "The planning, visibility and compliance problems rhyme across modes; the constraints and the data models do not. These are the networks we have shipped against.",
  items: [
    { label: "Road Freight", body: "Dispatch, HOS-aware routing and lane profitability.", image: modeTruckingImg, alt: "A tipper truck travelling along an open highway" },
    { label: "Rail", body: "Wagon tracking, yard planning and intermodal handover.", image: modeRailImg, alt: "Freight wagons standing in a marshalling yard" },
    { label: "Ocean", body: "Container visibility, demurrage control and booking flows.", image: modeOceanImg, alt: "A container ship at sea carrying stacked containers" },
    { label: "Air Cargo", body: "Capacity, ULD tracking and time-definite handling.", image: modeAirImg, alt: "A cargo aircraft on the taxiway at an airport" },
    { label: "Last Mile", body: "Route density, ePOD and live customer ETAs.", image: modeLastmileImg, alt: "A courier unloading parcels from the back of a delivery van" },
    { label: "Public Transit", body: "Scheduling, AVL and real-time passenger information.", image: modeTransitImg, alt: "A city bus at a stop on a European street" },
    { label: "Ride-Hailing", body: "Matching, dispatch latency and driver supply balance.", image: modeRideshareImg, alt: "A passenger in the back of a taxi checking a phone" },
    { label: "Ports & Terminals", body: "Yard moves, gate flow and quay-side sequencing.", image: modePortsImg, alt: "Quay cranes working at a container terminal" },
    { label: "Cold Chain", body: "Reefer telemetry, excursion alerting and audit trails.", image: modeColdchainImg, alt: "Refrigerated trailers parked in a yard" },
    { label: "Fleet Maintenance", body: "Predictive servicing, parts and workshop scheduling.", image: modeMaintenanceImg, alt: "Mechanics working on a truck cab in a workshop" },
    { label: "Warehousing", body: "Dock scheduling, yard management and WMS integration.", image: modeWarehouseImg, alt: "An overhead view of two warehouse workers checking a tablet beside pallets" },
    { label: "Bulk & Tanker", body: "Hazmat compliance, load planning and site telemetry.", image: modeTankerImg, alt: "A stainless steel tanker trailer parked at a depot" },
  ],
};

export const benefits = {
  eyebrow: "What you can optimise with AI-powered transportation software",
  titleLead: "Benefits Of Custom AI-Powered",
  titleAccent: "Transportation Software Solutions",
  items: [
    {
      title: "Cut Cost Per Mile",
      body:
        "Continuous route optimisation, load consolidation and backhaul matching attack the three costs that dominate a road network: fuel, empty running and overtime built into a badly sequenced day.",
    },
    {
      title: "Deliver On Promises You Can Keep",
      body:
        "Predictive ETAs built on your own historical performance, not a straight-line average, let you quote windows you hit, and flag the exceptions early enough that a customer hears from you first.",
    },
    {
      title: "Keep Assets Earning",
      body:
        "Predictive maintenance and utilisation analytics move work from roadside breakdown to a planned workshop slot, and answer honestly whether the next ten vehicles need to be bought at all.",
    },
    {
      title: "Automate The Compliance Load",
      body:
        "Hours of service, tachograph, dangerous goods, customs and emissions reporting generated from operational data as it happens, with an audit trail that holds up without a week of retrieval.",
    },
    {
      title: "Scale Without Scaling Headcount",
      body:
        "Automated tendering, exception-based dispatch and self-service booking mean volume growth stops translating directly into another planner, another phone and another spreadsheet.",
    },
    {
      title: "Report Emissions With Evidence",
      body:
        "Per-shipment CO2e calculated from real distance, load factor and vehicle profile, so sustainability reporting and customer scope-3 requests come from your operational data rather than an estimate.",
    },
  ],
};

export const build = {
  title: "Build The Transportation Platform Your Network Deserves",
  body:
    "Bring us the bottleneck, whether that is planning, visibility, maintenance or a customer portal that has stopped scaling. We will scope it honestly, build it in increments your team can use, and tell you which parts are not worth building at all.",
  ctaText: "Get in touch now",
  texture: textureBgImg,
  image: buildVisualImg,
  alt: "A technician checking inventory on a tablet in a parts warehouse",
};

export const techStrip = {
  eyebrow: "Technologies we work with",
  titleLead: "Expertise In Advanced",
  titleAccent: "Development Technologies",
  body:
    "The same production-grade toolchain sits under every transportation platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "PyTorch", "TensorFlow", "scikit-learn", "XGBoost",
        "Prophet", "OR-Tools", "VROOM", "OSRM", "Valhalla", "YOLO", "OpenCV",
        "Vertex AI", "LangChain", "OpenAI Embeddings", "MLflow",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "FastAPI", "Django", "Go", "GraphQL", "PostgreSQL", "PostGIS",
        "TimescaleDB", "MongoDB", "Redis", "ClickHouse", "Kafka", "MQTT", "Airflow", "dbt", "Snowflake",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "GSAP",
        "Mapbox GL", "MapLibre", "Deck.gl", "D3.js", "Vite",
      ],
    },
    {
      id: "mobile",
      label: "Mobile & IoT",
      items: ["React Native", "Flutter", "Swift", "Kotlin", "WatermelonDB", "AWS IoT Core", "Azure IoT Hub", "Geotab", "Samsara APIs"],
    },
    {
      id: "cloud",
      label: "Cloud",
      items: ["AWS", "Google Cloud", "Azure", "Vercel", "Cloudflare", "Firebase", "Supabase", "Fly.io"],
    },
    {
      id: "devops",
      label: "DevOps",
      items: ["Docker", "Kubernetes", "Terraform", "GitHub Actions", "GitLab CI", "Nginx", "Prometheus", "Grafana", "Sentry"],
    },
    {
      id: "design",
      label: "UI / UX",
      items: ["Figma", "Design Tokens", "Prototyping", "WCAG 2.2 Audits", "Field Usability Testing"],
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who do we work with?",
  titleLead: "Explore The Range Of",
  titleAccent: "Transport Operators We Support",
  body:
    "From a regional haulier digitising dispatch for the first time to an authority running a metropolitan network, the engagement shape changes but the standard does not.",
  rows: [
    {
      label: "Carriers, hauliers and fleet owners",
      body: "Dispatch, telematics, maintenance and compliance on shared data, so a growing fleet stops needing a proportional increase in office staff.",
    },
    {
      label: "Freight forwarders, brokers and 3PLs",
      body: "Quoting, capacity sourcing, multi-modal tracking and margin visibility per load, with the customer portal that wins the tender rather than the one that survives it.",
    },
    {
      label: "Transit authorities and mobility operators",
      body: "Scheduling, AVL, ticketing, passenger information and accessibility, plus the ridership analytics that make the next service change defensible in public.",
    },
    {
      label: "Ports, terminals and mobility startups",
      body: "Yard and gate optimisation, terminal operating integrations, and the MVP work that has to prove a market before the next funding round.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "What Fleet Operators Say",
  titleAccent: "After Their First Release",
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
  eyebrow: "Our portfolio",
  titleLead: "Proven Results Across",
  titleAccent: "Transportation And Logistics",
  body:
    "A selection of the platforms and models we have shipped, including the real-time tracking, optimisation and computer-vision work transport operators come to us for.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Why Partner With Axiomra For",
  titleAccent: "Intelligent Transportation Software Development",
  cards: [
    {
      icon: "Route",
      title: "We Build For Operations, Not Demos",
      body:
        "Our engineers have shipped against peak season, driver shortages and dock windows. Systems are designed for the 5am shift and the bad-signal cab, which is why staff still use them in month six.",
    },
    {
      icon: "Layers",
      title: "Integrates With What You Already Run",
      body:
        "Telematics vendors, ELD, EDI, legacy TMS, WMS and carrier APIs each have their own idea of a schema. We build the layer that reconciles them, modular enough to survive the next vendor change.",
    },
    {
      icon: "ShieldCheck",
      title: "Safety And Compliance Designed In",
      body:
        "Driver hours, tachograph records, hazmat documentation and location data carry real obligations. Consent, retention, residency and access control are set in the first architecture session, with complimentary post-launch support for up to 60 days.",
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
  title: "Insights On AI, Fleets And The Business Of Moving Things",
  body:
    "Field notes from the platforms we build: where route optimisation genuinely pays, what telematics data is good for once the novelty fades, and which parts of the logistics AI pitch do not survive a peak season.",
  posts: [
    {
      title: "Route Optimisation In Practice: What Actually Cuts Cost Per Mile",
      tag: "Optimisation",
      image: blog1Img,
      alt: "A laptop showing an operations analytics dashboard",
    },
    {
      title: "Fleet Telematics Beyond Tracking: Turning Feeds Into Decisions",
      tag: "Telematics",
      image: blog2Img,
      alt: "The view from a truck cab over the steering wheel onto the road ahead",
    },
    {
      title: "Real-Time Freight Visibility: Building ETAs Customers Can Trust",
      tag: "Visibility",
      image: blog3Img,
      alt: "A port gantry crane lifting a container above a stacked terminal yard",
    },
  ],
};

export const faqs = [
  {
    q: "What types of transportation software development do you offer?",
    a: "Transport management systems, fleet management and telematics, freight forwarding and brokerage platforms, asset and container tracking, public transit and mobility platforms, vehicle sharing, ride-hailing dispatch, and terminal operations, plus the driver, rider and field apps that sit on top of them. Most engagements start with one of those and grow into the data layer underneath.",
  },
  {
    q: "How does AI actually improve transportation and logistics software?",
    a: "In four places that pay for themselves: route and load optimisation that cuts fuel and empty miles; predictive ETAs built on your own historical performance; predictive maintenance that moves failures into planned workshop slots; and demand forecasting that sizes capacity before the week starts. Anything beyond that we will tell you is optional.",
  },
  {
    q: "Can you integrate with our existing TMS, telematics and ELD providers?",
    a: "Yes, and that is usually most of the job. We build the integration and reconciliation layer across Geotab, Samsara, EDI 204/214/990, your TMS and WMS, carrier and customs APIs, so you keep your vendor relationships and stop paying for four systems that each hold a partial version of the truth.",
  },
  {
    q: "How accurate can predictive ETAs really be?",
    a: "Accuracy depends on your data, not on the model. With reliable GPS pings, historical lane performance and dwell data at the stops that matter, most road networks land within a tight window on the majority of loads. We report accuracy per lane and per customer, so you know which promises to make and which to keep conservative.",
  },
  {
    q: "Do you build software for electric and mixed fleets?",
    a: "Yes. Charging-aware route planning, range and payload modelling, depot charging schedules against tariff windows, and total-cost comparison across drivetrains. For mixed fleets, the planner treats the drivetrain as a constraint like any other rather than running two separate systems.",
  },
  {
    q: "How do you handle driver data, location privacy and compliance?",
    a: "Location and driver-behaviour data are among the most sensitive a transport business holds. Consent, retention, residency and role-based access are designed into the schema from the first session, covering GDPR, works-council requirements where they apply, HOS and tachograph rules, and ADR documentation for dangerous goods.",
  },
  {
    q: "Will your software work where there is no signal?",
    a: "It has to. Driver and field apps are offline-first: scans, signatures, proof of delivery and status changes are captured locally and synced with conflict handling when the connection returns. A dead zone should cost you a delayed update, never a lost delivery record.",
  },
  {
    q: "How much does custom transportation software cost?",
    a: "It depends on the integrations in scope, the size of your network and how much optimisation is genuinely required. A scoped pilot on one lane or depot is the fastest route to a real number. Book a free session and we will size it honestly, including the parts we would advise against building.",
  },
  {
    q: "How long does a transportation platform build take?",
    a: "A scoped MVP with one capability (a dispatch board, a tracking portal, a driver app) typically runs eight to twelve weeks. A full platform spanning planning, visibility, maintenance and customer self-service runs four to nine months, delivered in weekly increments you can use from the first sprint.",
  },
  {
    q: "Can you replace our legacy TMS without stopping operations?",
    a: "Yes, by not replacing it all at once. We wrap the existing system in a stable API, move one capability at a time, run both in parallel with reconciliation reports, and retire the original only after its replacement has survived a full peak. Every step is independently reversible.",
  },
  {
    q: "Do you support real-time tracking at fleet scale?",
    a: "Yes. High-frequency position ingestion, geofencing and event processing are built on streaming infrastructure sized against your real peak, with time-series storage for history and replay. We load test against your own concurrency before the first vehicle goes live.",
  },
  {
    q: "Who owns the code and the data?",
    a: "You do. Source, infrastructure definitions, models and data stay yours, in your repositories and your cloud accounts, with documentation and a runbook handed over at the end. We are hired to build a capability you keep, not to become a dependency you cannot leave.",
  },
];

export const finalCta = {
  title: "Tell Us What Your Fleet Needs To Run Better",
  subtitle:
    "Ready to cut empty miles, keep assets earning and give customers an ETA they trust? Talk to our transportation software engineers.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
