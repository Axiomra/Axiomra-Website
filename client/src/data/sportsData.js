/**
 * Copy and imagery for the Sports industry page (/industries/sports).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/sports/hero.webp";
import introImg from "../assets/industries/sports/intro.webp";

import svcMotionImg from "../assets/industries/sports/svc-motion.webp";
import svcGymImg from "../assets/industries/sports/svc-gym.webp";
import svcMobileImg from "../assets/industries/sports/svc-mobile.webp";
import svcLeagueImg from "../assets/industries/sports/svc-league.webp";
import svcMedicineImg from "../assets/industries/sports/svc-medicine.webp";
import svcTrainingImg from "../assets/industries/sports/svc-training.webp";
import svcEventImg from "../assets/industries/sports/svc-event.webp";
import svcTeamImg from "../assets/industries/sports/svc-team.webp";
import svcStreamingImg from "../assets/industries/sports/svc-streaming.webp";
import svcFanImg from "../assets/industries/sports/svc-fan.webp";
import svcTicketingImg from "../assets/industries/sports/svc-ticketing.webp";
import svcScoutingImg from "../assets/industries/sports/svc-scouting.webp";

import midCtaBgImg from "../assets/industries/sports/midcta-bg.webp";

import solProductImg from "../assets/industries/sports/sol-product.webp";
import solConsultingImg from "../assets/industries/sports/sol-consulting.webp";
import solVisionImg from "../assets/industries/sports/sol-vision.webp";
import solIntegrationImg from "../assets/industries/sports/sol-integration.webp";
import solInfraImg from "../assets/industries/sports/sol-infra.webp";

import stkCoachesImg from "../assets/industries/sports/stk-coaches.webp";
import stkAthletesImg from "../assets/industries/sports/stk-athletes.webp";
import stkClubsImg from "../assets/industries/sports/stk-clubs.webp";
import stkBroadcastersImg from "../assets/industries/sports/stk-broadcasters.webp";
import stkSponsorshipImg from "../assets/industries/sports/stk-sponsorship.webp";
import stkPhysioImg from "../assets/industries/sports/stk-physio.webp";

import sportSoccerImg from "../assets/industries/sports/sport-soccer.webp";
import sportCricketImg from "../assets/industries/sports/sport-cricket.webp";
import sportBasketballImg from "../assets/industries/sports/sport-basketball.webp";
import sportTennisImg from "../assets/industries/sports/sport-tennis.webp";
import sportBaseballImg from "../assets/industries/sports/sport-baseball.webp";
import sportGolfImg from "../assets/industries/sports/sport-golf.webp";
import sportBadmintonImg from "../assets/industries/sports/sport-badminton.webp";
import sportAthleticsImg from "../assets/industries/sports/sport-athletics.webp";
import sportSwimmingImg from "../assets/industries/sports/sport-swimming.webp";
import sportCyclingImg from "../assets/industries/sports/sport-cycling.webp";
import sportFootballImg from "../assets/industries/sports/sport-football.webp";
import sportHockeyImg from "../assets/industries/sports/sport-hockey.webp";

import textureBgImg from "../assets/industries/sports/texture-bg.webp";
import buildVisualImg from "../assets/industries/sports/build-visual.webp";

import blog1Img from "../assets/industries/sports/blog-1.webp";
import blog2Img from "../assets/industries/sports/blog-2.webp";
import blog3Img from "../assets/industries/sports/blog-3.webp";
import finalCtaBgImg from "../assets/industries/sports/final-cta.webp";

export const SPORTS_SLUG = "sports";

export const hero = {
  eyebrow: "AI for the sports industry",
  titleLead: "Custom",
  titleAccent: "Sports Software Development",
  titleTail: "For High-Performance Teams",
  body:
    "We design and build sports software that turns athlete performance, operations and fan attention into systems you can actually run. From real-time match data and injury prevention to ticketing, broadcast and fan engagement platforms, our work keeps sports organisations ahead in a season that never really stops.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "A packed football stadium under floodlights on a match night",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "AI Sports Software Development That Elevates",
  titleAccent: "Performance And Fan Engagement",
  paragraphs: [
    "Axiomra is a sports software development company built around data engineers and sports technologists who ship end-to-end platforms for performance, fan engagement, ticketing and live analytics. Our systems replace the data silos that leave coaching staff guessing, cut the operational friction between departments, and put every number in one secure, cloud-native place.",
    "We work with professional clubs, colleges, academies, venues and federations. On the performance side that means fewer soft-tissue injuries, a real concussion-management trail and coaching admin that stops eating the training week. On the commercial side it means attendance you can forecast, OTT revenue you can measure and sponsorship you can price. Wearable privacy, NIL compliance and AI misuse all get guardrails from day one, not after the first incident.",
  ],
  ctaText: "Book a Free Sports Tech Consultation",
  image: introImg,
  alt: "An analyst reviewing match video on a bank of monitors",
};

export const impact = {
  titleLead: "How AI Is Reshaping Performance, Revenue",
  titleAccent: "And Safety In Sports",
  body:
    "AI sports software is redefining how teams manage training load, reduce injury risk and open new revenue by unifying wearables, video, ticketing and CRM into real-time workflows that scale from academies to professional leagues.",
  stats: [
    {
      value: "$10.4B",
      label: "global AI in sports market size in 2025, on its way to roughly ten times that by the mid-2030s.",
      source: "Precedence Research, AI In Sports Market 2025",
    },
    {
      value: "38%",
      label: "of sports media executives said AI made content commercialisation easier in 2025.",
      source: "Stats Perform, 2025 AI Trends",
    },
    {
      value: "33%",
      label:
        "average positive shift in expectations for AI-driven audience and monetisation growth across sectors in 2025.",
      source: "Stats Perform, 2025 Survey",
    },
  ],
};

/**
 * The challenge rail. Each entry is a barrier sports organisations hit, and the
 * platform capability we build to remove it.
 */
export const challenges = {
  eyebrow: "Overcoming key barriers in sport",
  titleLead: "Solving The Problems Sports Organisations Actually Have",
  titleAccent: "With Custom Software",
  items: [
    {
      title: "Performance Data Nobody Reads",
      body:
        "GPS vests, force plates, wellness questionnaires and video all land in different exports, and by the time anyone has merged them the session they describe is a week old. We build the ingestion layer and the one screen that sits on top of it, so a coach sees load, readiness and risk for the whole squad before training starts rather than after it.",
    },
    {
      title: "Injury Risk Spotted Too Late",
      body:
        "Soft-tissue injuries rarely arrive without warning; the warning is just spread across sources nobody correlates. We combine workload history, movement asymmetry and self-reported wellness into a risk model with an audit trail, so medical staff get a flag they can act on and a record that stands up when someone asks why a player was rested.",
    },
    {
      title: "Video Reviewed Once, Then Lost",
      body:
        "Match footage gets watched on Monday and never again, because nothing in it is searchable. Our computer-vision pipelines tag events, players and phases automatically, so a decade of footage becomes a queryable archive for coaching, scouting, broadcast highlights and sponsorship reporting.",
    },
    {
      title: "Match-Day Operations That Break Under Load",
      body:
        "Ticketing, access control, retail and stewarding usually come from four vendors who have never spoken. We build the integration layer and the real-time operations view so gate throughput, capacity and incidents are visible during the match, not reconstructed from four reports the following week.",
    },
    {
      title: "Fans Who Only Show Up Twice A Season",
      body:
        "Declining attendance is a retention problem, and retention needs identity. We unify ticketing, OTT, merchandise and app behaviour into one supporter profile, then build the personalisation, live polling and second-screen features that turn an occasional attendee into a season-ticket renewal.",
    },
    {
      title: "Sponsorship You Cannot Price",
      body:
        "Rights holders still sell exposure on estimates. We instrument broadcast and social video with brand-detection models, so perimeter boards, shirt fronts and digital placements report measured seconds of visibility and audience reach per asset, which is what a renewal conversation needs.",
    },
    {
      title: "Compliance, NIL And Wearable Privacy",
      body:
        "Athlete biometrics are among the most sensitive data a club holds, and NIL, concussion protocols and image rights each carry their own obligations. We design consent capture, retention and access control into the schema, so the security review and the league audit both find what they are looking for.",
    },
  ],
};

export const services = {
  eyebrow: "What sports solutions do we offer?",
  titleLead: "Tailored Sports Software Solutions",
  titleAccent: "For Every Organisation",
  body:
    "We build custom sports software that removes the manual, repetitive work modern sports organisations still run on: in-person-only coaching, fragmented medical records, batch-processed performance data and fan engagement that stops at the final whistle.",
  items: [
    {
      title: "Kinesiology & Motion Analysis Software",
      body:
        "Manual posture analysis and movement tracking are slow and inconsistent between assessors. Our motion analysis software uses pose estimation to break down biomechanics, quantify asymmetry and track technique changes session over session, so coaching decisions rest on measurement rather than memory.",
      image: svcMotionImg,
      alt: "A motion-capture session with reflective markers in a biomechanics lab",
    },
    {
      title: "Fitness Club & Gym Management Software",
      body:
        "Running a club by hand produces double bookings, membership errors and hours lost to admin. We automate memberships, billing, class scheduling and trainer coordination into one platform that staff and members both actually want to use.",
      image: svcGymImg,
      alt: "The interior of a modern gym lined with training machines",
    },
    {
      title: "Sports Mobile App Development",
      body:
        "Fans and athletes drop off when the experience is disconnected from live data. Our sports apps deliver performance tracking, instant analytics and real-time engagement in one place, so athletes, coaches and supporters stay connected between fixtures rather than only during them.",
      image: svcMobileImg,
      alt: "A runner checking a smartwatch mid-session",
    },
    {
      title: "League & Tournament Management Software",
      body:
        "Running a competition manually creates fixture clashes, disputed results and a mountain of administration. We automate scheduling, bracket generation, eligibility checks and live score distribution so organisers run a professional competition without a war room.",
      image: svcLeagueImg,
      alt: "A referee signalling during a football match",
    },
    {
      title: "Sports Medicine Software",
      body:
        "Injury and medical records scattered across paper, spreadsheets and clinic systems make continuity of care impossible. Our sports medicine platforms centralise injury logs, rehab plans and medical history with the access control that health data requires, and surface the recovery signal staff need.",
      image: svcMedicineImg,
      alt: "A physiotherapist treating an athlete's knee",
    },
    {
      title: "Sports Training Software",
      body:
        "Coaching that depends on in-person sessions caps how many athletes a programme can develop well. We build personalised training plans, progress tracking and performance analytics into one system, so a coach's method scales past the number of people in the room.",
      image: svcTrainingImg,
      alt: "A youth football squad working through a cone drill",
    },
    {
      title: "Sports Event App",
      body:
        "Event day exposes every gap in planning, ticketing and communication at once. Our event apps handle digital ticketing, wayfinding, schedules and live updates, so attendees stay informed and your operations team stops firefighting over radio.",
      image: svcEventImg,
      alt: "A stadium stand packed with cheering spectators",
    },
    {
      title: "Team Management App",
      body:
        "Squads run on spreadsheets and group chats until something important gets missed. We centralise availability, selection, travel, player data and communication so coaches, players and managers work from the same source through a long season.",
      image: svcTeamImg,
      alt: "A coach giving instructions to a huddled team",
    },
    {
      title: "Streaming & Broadcasting Software",
      body:
        "Broadcast usually means high cost, latency and no analytics worth the name. We build live streaming, automated highlight generation and in-stream video analytics that cut delivery cost while opening direct-to-fan revenue you own rather than rent.",
      image: svcStreamingImg,
      alt: "A broadcast camera operator covering a match from the touchline",
    },
    {
      title: "Fan Engagement Software",
      body:
        "Generic updates and once-a-fortnight contact are why loyalty erodes. Our fan engagement platforms deliver personalised content, live polls, predictions and interactive second-screen experiences that lift retention and give you first-party data worth having.",
      image: svcFanImg,
      alt: "Supporters holding scarves and flags in a stadium stand",
    },
    {
      title: "Ticketing & Venue Operations",
      body:
        "Match-day systems from four vendors become one queue at gate three. We integrate ticketing, access control, retail and stewarding into a real-time operations view, with dynamic pricing and demand forecasting that fill seats before the day rather than discount them after.",
      image: svcTicketingImg,
      alt: "Spectators passing through a stadium entrance gate",
    },
    {
      title: "Scouting & Recruitment Analytics",
      body:
        "Recruitment still turns on the games a scout could physically attend. We build data pipelines and similarity models across competitions and age groups, so a shortlist reflects the whole market and every recommendation carries the evidence behind it.",
      image: svcScoutingImg,
      alt: "An analyst reviewing play from the sideline on a tablet",
    },
  ],
};

export const midCta = {
  title: "Looking For Something Else?",
  body:
    "These are the sports solutions we get asked for most. If you have a specific idea, an existing platform that needs rescuing, or a requirement nobody has built yet, that is the conversation we most want to have.",
  ctaText: "Get in touch",
  background: midCtaBgImg,
};

export const solutions = {
  eyebrow: "How we deliver",
  titleLead: "Sports Software Development Services",
  titleAccent: "Built Around Your Season",
  body:
    "Five ways we engage, from a scoped pilot before pre-season to a long-running platform partnership across competitions and venues. Every engagement is sized to a calendar you do not control, so delivery lands between fixtures rather than across them.",
  items: [
    {
      title: "Sports Product Engineering",
      body:
        "End-to-end delivery of the platform itself: architecture, data model, services, interfaces and the release process behind them. We start with the one workflow that costs your staff the most hours, ship it, and grow the system outward from something already in daily use.",
      extra:
        "You get working software in weekly increments, with the first usable capability live long before the full scope lands. Nothing is built behind a curtain for three months and revealed at the end, which is how sports projects usually miss a season.",
      points: [
        "Discovery, architecture and a costed backlog inside the first three weeks",
        "Weekly releases to a staging environment your staff can actually open",
        "Handover package: documentation, tests and the runbook your team keeps",
      ],
      image: solProductImg,
      alt: "A development team working across a bank of monitors",
    },
    {
      title: "AI & Data Consulting",
      body:
        "A short, honest engagement that maps your data estate, names the models worth building, and says plainly which ideas will not pay for themselves. Most organisations already hold more signal than they use; far fewer hold enough for the model somebody sold them.",
      extra:
        "You leave with a costed roadmap rather than a proposal: what to build first, what it needs from your data, what it will cost to run, and the measurement that tells you whether it worked.",
      points: [
        "Audit of the tracking, medical, ticketing and league feeds you already hold",
        "Model shortlist with expected accuracy, effort and running cost per item",
        "A written case against the ideas that do not clear the bar",
      ],
      image: solConsultingImg,
      alt: "A strategy workshop around a whiteboard",
    },
    {
      title: "Video & Computer Vision Pipelines",
      body:
        "Automated event tagging, player tracking, pose estimation and brand detection, running on live feeds or a decade of archive. The output is structured data your other systems can query, not another video player nobody logs into.",
      extra:
        "We train on your competition rather than a public dataset, because camera angles, kit colours and pitch markings are exactly what breaks a generic model. Accuracy is reported per event type, so you know which outputs to trust and which still need a human.",
      points: [
        "Live and archive pipelines sharing one model and one schema",
        "Tagging, tracking, pose estimation and sponsorship exposure in a single pass",
        "Per-event accuracy reporting, with human review only where it is needed",
      ],
      image: solVisionImg,
      alt: "An analysis console tracking motion data from a live video feed",
    },
    {
      title: "Platform Integration & Modernisation",
      body:
        "Most organisations do not start from nothing; they start from six systems that do not talk. We build the integration layer, migrate what deserves to survive, and retire the rest without taking match day offline.",
      extra:
        "The work is staged so every step is independently useful and independently reversible. If we stop halfway, you are still better off than when we started, which is the only honest way to modernise a system a season depends on.",
      points: [
        "One integration layer across GPS, optical tracking, ticketing, CRM and league feeds",
        "Staged migration with rollback at every step, never a big-bang cutover",
        "Legacy systems retired only once their replacement has run a full cycle",
      ],
      image: solIntegrationImg,
      alt: "Racks of servers in a data centre aisle",
    },
    {
      title: "Cloud & Real-Time Infrastructure",
      body:
        "Match day is a traffic spike with a fixed start time. We build the streaming, caching and autoscaling layer that survives it, plus the observability to prove it held and the cost controls to keep the quiet weeks cheap.",
      extra:
        "Capacity is load-tested against your own peak, not a vendor benchmark, and the same architecture scales down between fixtures so you are not paying stadium-day rates on a Tuesday in February.",
      points: [
        "Load tested against your real peak concurrency before the first fixture",
        "Autoscaling and caching tuned for a spike with a known start time",
        "Cost guardrails and alerting so quiet weeks cost what quiet weeks should",
      ],
      image: solInfraImg,
      alt: "Rows of servers in a data centre lit by blue neon",
    },
  ],
};

export const stakeholders = {
  eyebrow: "Whom do we build custom sports solutions for?",
  titleLead: "We Build Advanced Sports Software",
  titleAccent: "For The Following Clients",
  items: [
    {
      title: "Coaches & Analysts",
      body:
        "Load management, opposition analysis and selection evidence in one place, so the week's plan is built on the squad's actual state rather than last week's impression of it.",
      image: stkCoachesImg,
      alt: "A coach working through a tactics board with the team",
    },
    {
      title: "Athletes",
      body:
        "Personal dashboards covering training load, recovery, nutrition and rehab progress, with clear control over who sees which part of their own data.",
      image: stkAthletesImg,
      alt: "An athlete on the podium after a medal ceremony",
    },
    {
      title: "Teams & Clubs",
      body:
        "One operating system for the organisation: squad administration, medical, performance, ticketing and commercial, reporting into the same numbers the board reviews.",
      image: stkClubsImg,
      alt: "A team lined up on the pitch before kick-off",
    },
    {
      title: "Broadcasters & Journalists",
      body:
        "Automated highlight generation, searchable archives and live statistical feeds, so a package ships during the match instead of the morning after it.",
      image: stkBroadcastersImg,
      alt: "A reporter interviewing an athlete with a microphone",
    },
    {
      title: "Marketing & Sponsorship Agencies",
      body:
        "Measured brand exposure across broadcast and social, audience segmentation from first-party data, and valuation models that make a renewal negotiation an evidence-based one.",
      image: stkSponsorshipImg,
      alt: "Perimeter advertising boards around a stadium pitch",
    },
    {
      title: "Trainers & Physiotherapists",
      body:
        "Rehab protocols, return-to-play criteria and objective movement assessment in a shared record, so handovers between medical and coaching staff stop losing detail.",
      image: stkPhysioImg,
      alt: "A therapist working on an athlete's leg",
    },
  ],
};

/**
 * The sports we build for. Rendered as a clipped, angled card rail, so keep the
 * labels to one or two words.
 */
export const sportsWeServe = {
  eyebrow: "Which sports do we serve?",
  titleLead: "We Build Custom Sports Software",
  titleAccent: "For Every Game You Play",
  body:
    "The performance, operations and fan problems rhyme across codes; the data model and the rules do not. These are the sports we have shipped against.",
  items: [
    { label: "Football", body: "Match analysis, academy pathways and matchday operations.", image: sportSoccerImg, alt: "A football resting in the back of a goal net" },
    { label: "Cricket", body: "Ball-by-ball data, workload tracking and multi-format scheduling.", image: sportCricketImg, alt: "A batsman playing a shot during a cricket match" },
    { label: "Basketball", body: "Possession analytics, rotation planning and arena engagement.", image: sportBasketballImg, alt: "A basketball player rising to the hoop" },
    { label: "Tennis", body: "Shot and rally analysis, tour scheduling and coaching review.", image: sportTennisImg, alt: "A tennis player serving on a hard court" },
    { label: "Baseball", body: "Pitch tracking, biomechanics and minor-league player development.", image: sportBaseballImg, alt: "A pitcher mid-delivery on the mound" },
    { label: "Golf", body: "Swing analysis, course management data and club operations.", image: sportGolfImg, alt: "A golfer following through on a fairway shot" },
    { label: "Badminton", body: "Rally analytics, court scheduling and federation administration.", image: sportBadmintonImg, alt: "A badminton player striking a shuttlecock" },
    { label: "Athletics", body: "Split timing, sprint mechanics and meet management.", image: sportAthleticsImg, alt: "A sprinter set in the starting blocks" },
    { label: "Swimming", body: "Stroke rate analysis, session planning and gala administration.", image: sportSwimmingImg, alt: "A swimmer mid-stroke in a competition lane" },
    { label: "Cycling", body: "Power data, route telemetry and race logistics.", image: sportCyclingImg, alt: "A cyclist racing on an open road" },
    { label: "American Football", body: "Play tagging, snap counts and collision-load monitoring.", image: sportFootballImg, alt: "An American football player in helmet and pads" },
    { label: "Hockey", body: "Shift tracking, puck and ball possession data, rink operations.", image: sportHockeyImg, alt: "A hockey player driving forward with the puck" },
  ],
};

export const benefits = {
  eyebrow: "What you can optimise with AI-powered sports applications",
  titleLead: "Benefits Of Custom AI-Powered",
  titleAccent: "Sports Software Solutions",
  items: [
    {
      title: "Elevate Athlete Performance",
      body:
        "Athletes get training prescribed against their own measured state: load history, movement quality and recovery, rather than a squad-wide plan that fits the average and nobody in particular.",
    },
    {
      title: "Integrate With The Tools You Already Run",
      body:
        "Wearables, optical tracking, AR and VR training environments and league data feeds all land in one model, so a new sensor becomes an input rather than another platform to log into.",
    },
    {
      title: "Optimise Club Operations",
      body:
        "Scheduling, squad administration, medical records and facility management run off shared data with real-time reporting, which removes most of the manual coordination a season currently demands.",
    },
    {
      title: "Deepen Fan Engagement",
      body:
        "Personalised content, live interaction and second-screen features keep supporters engaged between fixtures, and give you the first-party data that makes the next campaign cheaper.",
    },
    {
      title: "Grow Revenue",
      body:
        "Automated billing, subscriptions, dynamic ticket pricing and measured sponsorship exposure turn commercial guesswork into forecastable, defensible numbers.",
    },
    {
      title: "Protect Health And Availability",
      body:
        "Monitoring physical and mental load reduces avoidable injury and keeps more of the squad available, which is the single cheapest performance gain most organisations have left.",
    },
  ],
};

export const build = {
  title: "Craft Your Ideal Sports Software Solution",
  body:
    "Bring us the bottleneck, whether that is performance analysis, match-day operations or a fan platform that has stopped scaling. We will scope it honestly, build it in increments you can use, and tell you which parts are not worth building at all.",
  ctaText: "Get in touch now",
  texture: textureBgImg,
  image: buildVisualImg,
  alt: "A footballer striking the ball during a match",
};

export const techStrip = {
  eyebrow: "Technologies we work with",
  titleLead: "Expertise In Advanced",
  titleAccent: "Development Technologies",
  body:
    "The same production-grade toolchain sits under every sports platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "MediaPipe", "OpenPose", "YOLO", "Detectron2",
        "SAM", "DeepSORT", "Whisper", "PyTorch", "TensorFlow", "scikit-learn", "XGBoost",
        "OpenCV", "Vertex AI", "Guardrails", "LangChain", "OpenAI Embeddings",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "FastAPI", "Django", "Go", "GraphQL", "PostgreSQL", "TimescaleDB",
        "MongoDB", "Redis", "ClickHouse", "Elasticsearch", "Kafka", "Airflow", "dbt", "Snowflake",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js", "GSAP",
        "React Native", "Flutter", "Vite", "D3.js", "Deck.gl",
      ],
    },
    {
      id: "streaming",
      label: "Streaming & Video",
      items: ["FFmpeg", "GStreamer", "HLS", "LL-HLS", "WebRTC", "MediaLive", "Mux", "SRT", "NVENC"],
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
      items: ["Figma", "Design Tokens", "Prototyping", "WCAG 2.2 Audits", "Usability Testing"],
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who do we work with?",
  titleLead: "Explore The Range Of",
  titleAccent: "Sports Organisations We Support",
  body:
    "From a single academy digitising its first season to a federation running a national competition, the engagement shape changes but the standard does not.",
  rows: [
    {
      label: "Academies and grassroots clubs",
      body: "Registration, subscriptions, scheduling and parent communication in one place, so volunteers stop running a club out of a shared inbox and a spreadsheet.",
    },
    {
      label: "Professional clubs",
      body: "Performance, medical, recruitment and commercial systems on shared data, with the access control and audit trail a first-team environment needs before anyone will use it.",
    },
    {
      label: "Leagues and federations",
      body: "Competition management, eligibility and disciplinary workflows, official data feeds and the distribution layer broadcasters and betting partners consume.",
    },
    {
      label: "Venues, brands and sports-tech startups",
      body: "Venue operations, fan platforms and white-label products, including the MVP work that has to prove a market before the next funding round.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "What Clubs And Leagues Say",
  titleAccent: "About Building With Us",
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
  titleAccent: "The Sports Industry",
  body:
    "A selection of the platforms and models we have shipped, including the video analytics and real-time data work that sports organisations come to us for.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "Why Partner With Axiomra For",
  titleAccent: "Intelligent Sports Software Development",
  cards: [
    {
      icon: "Target",
      title: "We Speak Sport, Not Just Software",
      body:
        "Our engineers have shipped against training weeks, transfer windows and match-day constraints. Every system we design fits how a season actually runs, which is why staff use it past the first month.",
    },
    {
      icon: "Layers",
      title: "Integrates With What You Already Run",
      body:
        "GPS vendors, optical tracking, ticketing platforms, CRM and league feeds each have their own idea of a schema. We build the layer that reconciles them, modular enough to survive the next vendor change.",
    },
    {
      icon: "ShieldCheck",
      title: "Athlete Data Handled Properly",
      body:
        "Biometrics, medical records and minors' data carry real obligations. Consent, retention, residency and access control are designed in from the first architecture session, with post-launch support for up to 60 days within the agreed scope.",
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
  title: "Insights On AI, Performance And The Business Of Sport",
  body:
    "Field notes from the platforms we build: what video analysis is genuinely good at, where athlete monitoring earns its keep, and which parts of the sports AI pitch do not survive contact with a season.",
  posts: [
    {
      title: "How AI And Video Analysis Are Reshaping Modern Football",
      tag: "Computer Vision",
      image: blog1Img,
      alt: "A football pitch seen from above during a match",
    },
    {
      title: "What Is Athlete Monitoring? Tools, Systems And Real Gains",
      tag: "Performance",
      image: blog2Img,
      alt: "A coach reading live heart rate and VO2 metrics on a tablet during an athlete test",
    },
    {
      title: "AI Sports Video Analysis: How Computer Vision Improves Performance",
      tag: "Analytics",
      image: blog3Img,
      alt: "A screen showing performance data visualisations",
    },
  ],
};

export const faqs = [
  {
    q: "What types of sports software development do you offer?",
    a: "Performance and motion analysis, sports medicine and injury tracking, team and league management, ticketing and venue operations, streaming and broadcast tooling, fan engagement platforms, and the mobile apps that sit on top of all of it. Most engagements start with one of those and grow into the data layer underneath.",
  },
  {
    q: "How does AI actually enhance sports software?",
    a: "In three places that pay for themselves: computer vision that turns video into structured, searchable events; predictive models that flag injury risk and demand before they arrive; and personalisation that lifts fan retention on an audience you already have. Everything else we will tell you is optional.",
  },
  {
    q: "How does sports motion analysis software benefit athletes?",
    a: "It replaces subjective assessment with measurement. Pose estimation quantifies joint angles, asymmetry and technique changes frame by frame, so a coach can see whether a cue actually changed the movement, and medical staff can set objective return-to-play criteria instead of a feel-based judgement.",
  },
  {
    q: "Can you work with our existing GPS, optical tracking and ticketing vendors?",
    a: "Yes, and that is usually most of the job. We build the integration and reconciliation layer across whatever you already run, so you keep your vendor relationships and stop paying for four systems that each hold a partial version of the truth.",
  },
  {
    q: "How do you handle athlete data privacy and compliance?",
    a: "Consent capture, data residency, retention and role-based access are designed into the schema from the first session, covering GDPR, HIPAA-adjacent medical handling, league regulations and NIL where it applies. Athletes get visibility over their own records, which is also what gets them to use the system.",
  },
  {
    q: "How much does custom sports software cost?",
    a: "It depends on the data you already hold, the number of integrations and how much AI capability is genuinely in scope. A scoped pilot is the fastest route to a real number. Book a free session and we will size it honestly, including the parts we would advise against building.",
  },
  {
    q: "How long does a sports platform build take?",
    a: "A scoped MVP with one capability, such as a performance dashboard or a league management module, typically runs eight to twelve weeks. A full platform spanning performance, operations and fan engagement runs four to nine months, delivered in weekly increments you can use from the first sprint.",
  },
  {
    q: "Can you develop mobile apps for sports teams?",
    a: "Yes. Athlete apps, coaching apps and supporter apps, native or cross-platform depending on what the feature set needs. We build offline-first where venue connectivity cannot be assumed, and instrument everything so product decisions rest on behaviour rather than opinion.",
  },
];

export const finalCta = {
  title: "Start With One Question About Your Season",
  subtitle:
    "Ready to raise performance, tighten operations and turn attention into revenue? Talk to our sports software engineers.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
