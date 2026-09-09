/**
 * Copy and imagery for the Portfolio page.
 *
 * Every case study carries its own palette because the page is a run of
 * full-bleed bands: the brand colour IS the section background, and the
 * mockup was exported on that exact colour. `band` and the image therefore
 * have to stay in sync — change one and the seam becomes visible.
 *
 * Rows without a `band` are "neutral": they sit on the page surface and the
 * mockup gets a white stage of its own, so the row still works in dark mode.
 * `accent` is the hue those rows borrow for numbers, pills and glows.
 */

import fluenttalkImg from "../assets/portfolio/fluenttalk.webp";
import moveallyImg from "../assets/portfolio/moveally.webp";
import navexImg from "../assets/portfolio/navex.webp";
import studylabaiImg from "../assets/portfolio/studylabai.webp";
import tuneGptImg from "../assets/portfolio/tune-gpt.webp";
import tambotImg from "../assets/portfolio/tambot.webp";
import visaBotImg from "../assets/portfolio/visa-bot.webp";
import ladleImg from "../assets/portfolio/ladle.webp";
import gearguideImg from "../assets/portfolio/gearguide.webp";
import fnAdImg from "../assets/portfolio/fn-ad.webp";
import fnAdMatchImg from "../assets/portfolio/fn-ad-match.webp";
import fnAdSalesCrmImg from "../assets/portfolio/fn-ad-sales-crm.webp";
import fnAdBpImg from "../assets/portfolio/fn-ad-bp.webp";
import pitchmarkImg from "../assets/portfolio/pitchmark.webp";
import mailpitchImg from "../assets/portfolio/mailpitch.webp";
import autotagaiImg from "../assets/portfolio/autotagai.webp";
import bestproverImg from "../assets/portfolio/bestprover.webp";
import haslinkedImg from "../assets/portfolio/haslinked.webp";
import voltoxImg from "../assets/portfolio/voltox.webp";
import evoAiImg from "../assets/portfolio/evo-ai.webp";
import frontOfficeImg from "../assets/portfolio/front-office.webp";
import formoleImg from "../assets/portfolio/formole.webp";

export const PORTFOLIO_PATH = "/portfolio";

export const hero = {
  eyebrow: "Selected work",
  titleLead: "Explore the impact of our",
  titleAccent: "AI case studies.",
  body:
    "Browse our portfolio of proven AI-powered solutions built for businesses across the globe. " +
    "Each case study shows how we turn complex challenges into scalable, intelligent systems, " +
    "backed by data and driven by results.",
  ctaText: "Read case study",
  stats: [
    { value: "22", label: "Shipped case studies" },
    { value: "12+", label: "Industries served" },
    { value: "300+", label: "AI projects delivered" },
    { value: "4.9/5", label: "Average client rating" },
  ],
};

export const caseStudies = [
  {
    slug: "fluenttalk-ai",
    name: "FluentTalk AI",
    tag: "Education",
    title: "AI Language Tutor",
    description:
      "An AI-powered language tutor that adapts to each learner's pace, style and goals across 20+ languages with personalized lessons and real-time feedback.",
    stats: [
      { value: "20+", label: "Languages supported" },
      { value: "87%", label: "Manual tasks automated" },
      { value: "80%", label: "Learner time saved" },
    ],
    image: fluenttalkImg,
    width: 787,
    height: 488,
    accent: "#4C3BD8",
  },
  {
    slug: "moveally",
    name: "Moveally",
    tag: "Edtech & Entertainment",
    title: "AI-Assisted Dance Training App",
    description:
      "Moveally is an AI-powered virtual dance training platform that brings professional coaching to students regardless of their physical location. It eliminates the need for in-person classes by using AI-driven motion analysis and automated feedback, while giving instructors full control to manage classes, upload lectures, and monitor student progress remotely.",
    stats: [
      { value: "70%", label: "Student performance analysis and feedback automated" },
      { value: "40%", label: "Improvement in student learning outcomes" },
      { value: "30%", label: "Instructor time saved" },
    ],
    image: moveallyImg,
    width: 817,
    height: 459,
    band: "#9F165C",
    accent: "#F2A8CB",
  },
  {
    slug: "navex",
    name: "Navex",
    tag: "Education",
    title: "Automated School Attendance System",
    description:
      "Navex is an AI-powered school transport and attendance management system that automates student tracking through real-time facial recognition. It eliminates manual attendance processes and communication gaps by seamlessly connecting schools, bus attendants, and parents in one centralized, secure platform.",
    stats: [
      { value: "75%", label: "Automation in student attendance and tracking" },
      { value: "50%", label: "Drop in manual attendance errors" },
      { value: "2X", label: "Improvement in student transport safety and security" },
    ],
    image: navexImg,
    width: 835,
    height: 1251,
    accent: "#1F3B63",
  },
  {
    slug: "studylabai",
    name: "StudylabAI",
    tag: "Education",
    title: "AI Personalized Learning Platform",
    description:
      "StudylabAI is an AI-powered learning platform built on Large Language Models and prompt engineering that delivers personalized lessons, real-time feedback, and automated assessments. It addresses the growing challenge educators face managing diverse student needs at scale, adapting dynamically to each student's learning style and progress.",
    stats: [
      { value: "80%", label: "Teacher admin time saved" },
      { value: "85%", label: "Grading accuracy achieved" },
      { value: "3", label: "Learning roles in one platform" },
    ],
    image: studylabaiImg,
    width: 798,
    height: 460,
    band: "#1F4A7D",
    accent: "#9EC5F0",
  },
  {
    slug: "tune-gpt",
    name: "Tune-GPT",
    tag: "Music & Agentic AI",
    title: "AI-Powered Music Assistant",
    description:
      "Tune-GPT is an AI-powered music assistant that centralizes everything a musician or artist needs into a single platform. It removes the friction of scattered resources by providing career guidance, album launch support, music generation, and industry information all accessible with just one click.",
    stats: [
      { value: "30%", label: "Increase in user experience score" },
      { value: "40X", label: "Productivity gain for musicians using the platform" },
      { value: "60%", label: "Time saved on music research, career planning, and content creation" },
    ],
    image: tuneGptImg,
    width: 844,
    height: 491,
    accent: "#7C4DFF",
  },
  {
    slug: "tambot",
    name: "Tambot",
    tag: "Market Research & Agentic AI",
    title: "Multi LLM-Powered Market Analysis Tool",
    description:
      "Tambot is an AI-powered Excel plugin that automates the creation of Total Addressable Market reports by leveraging a multi-agent setup of Claude, Gemini, and GPT alongside intelligent web scrapers. It eliminates the hours of manual research and data gathering that businesses typically spend by instantly transforming raw inputs into comprehensive, actionable TAM reports.",
    stats: [
      { value: "70%", label: "Reduction in manual research effort" },
      { value: "15", label: "Minutes faster report turnaround time" },
      { value: "10X", label: "Higher accuracy and more reliable TAM inputs" },
    ],
    image: tambotImg,
    width: 811,
    height: 457,
    band: "#7D8DA4",
    accent: "#E8EDF5",
  },
  {
    slug: "visa-bot",
    name: "Visa Bot",
    tag: "Technology & Agentic AI",
    title: "AI-Powered Visa Slot Booking Platform",
    description:
      "Visa Bot is an AI-powered appointment automation platform that continuously monitors visa application websites for available slots and instantly posts them to a Telegram group for users to book. It removes the exhausting manual process of repeatedly checking appointment portals, ensuring users never miss an available visa interview or biometric verification slot.",
    stats: [
      { value: "70%", label: "Visa slot booking process automated" },
      { value: "30%", label: "Faster appointment booking" },
      { value: "100%", label: "Manual monitoring eliminated" },
    ],
    image: visaBotImg,
    width: 828,
    height: 486,
    accent: "#4A9BE4",
  },
  {
    slug: "ladle",
    name: "Ladle",
    tag: "Food & Beverages & Agentic AI",
    title: "AI Chef Assistant For Smarter Meal Personalization",
    description:
      "Ladle is an AI kitchen assistant that instantly generates personalized recipes based on a user's dietary restrictions, available ingredients, and nutritional goals, using NLP and large language models. It solves the everyday problem of meal planning decision fatigue while helping households reduce food waste and eat according to their specific health needs.",
    stats: [
      { value: "90%", label: "Recipe accuracy through AI validation" },
      { value: "40X", label: "Faster recipe customization vs. manual planning" },
      { value: "30sec", label: "Average delivery time per validated recipe" },
    ],
    image: ladleImg,
    width: 849,
    height: 475,
    band: "#F25C75",
    accent: "#FFE1E6",
  },
  {
    slug: "gearguide",
    name: "Gearguide",
    tag: "Automotive & Agentic AI",
    title: "AI-Powered Motorcycle Assistant",
    description:
      "Gearguide is a RAG-powered custom AI chatbot built specifically for motorcycle enthusiasts that delivers precise, accurate information about bikes, parts, gear, and maintenance around the clock. It solves the problem of website visitors leaving without answers by providing instant, personalized support that keeps users engaged and drives purchase decisions.",
    stats: [
      { value: "24/7", label: "Real-time personalized customer assistance" },
      { value: "4", label: "Weeks from kickoff to live deployment" },
      { value: "40%", label: "Reduction in support overhead" },
    ],
    image: gearguideImg,
    width: 820,
    height: 454,
    accent: "#B01F1F",
  },
  {
    slug: "fn-ad",
    name: "FN-AD",
    tag: "Fashion",
    title: "AI Automation For Branding Agencies",
    description:
      "FN-AD is an AI-powered system built to streamline the core operations of a fashion branding agency by automating brand classification, competitor analysis, and lead management through a custom CRM. It eliminates the slow, manual processes that limit agency growth by delivering a continuous, intelligent pipeline of profiled and qualified leads.",
    stats: [
      { value: "40%", label: "Reduction in manual work" },
      { value: "47%", label: "Increase in productivity" },
      { value: "50%", label: "Lift in lead conversion rate" },
    ],
    image: fnAdImg,
    width: 796,
    height: 465,
    band: "#121212",
    accent: "#E7C88C",
  },
  {
    slug: "fn-ad-match",
    name: "FN-AD Match",
    tag: "Fashion",
    title: "Fashion Brand Matchmaking Platform",
    description:
      "FN-AD Match is an AI-driven platform that automates the process of matching fashion brands with the most suitable wholesale retail partners using NLP, computer vision, and real-time data scraping. It replaces a traditionally slow and subjective manual process with intelligent automation that dramatically improves the speed, accuracy, and scalability of brand-to-wholesaler connections.",
    stats: [
      { value: "90%", label: "Faster time to first match" },
      { value: "75%", label: "Higher match accuracy" },
      { value: "60%", label: "Less manual work per match cycle" },
    ],
    image: fnAdMatchImg,
    width: 827,
    height: 515,
    accent: "#B98A2E",
  },
  {
    slug: "fn-ad-sales-crm",
    name: "FN-AD Sales CRM",
    tag: "Fashion",
    title: "AI-Powered Sales CRM For Fashion",
    description:
      "FN-AD Sales CRM is a custom AI-powered sales platform built for fashion wholesalers that automates lead generation, brand profiling, and smart lead assignment around the clock. It addresses the inefficiency of manual sales workflows by building detailed brand profiles automatically and routing leads to the right team members using an intelligent assignment algorithm.",
    stats: [
      { value: "70X", label: "Increase in conversion rate" },
      { value: "24/7", label: "Always-on lead discovery and profiling" },
      { value: "5", label: "Clear pipeline stages with full tracking" },
    ],
    image: fnAdSalesCrmImg,
    width: 758,
    height: 472,
    band: "#121212",
    accent: "#E7C88C",
  },
  {
    slug: "fn-ad-bp",
    name: "FN-AD BP",
    tag: "Fashion",
    title: "AI Project Management Tool",
    description:
      "FN-AD BP is an AI-powered project management tool designed to streamline post-sales operations in the fashion industry by automating brand-to-member assignments and tracking full project lifecycles. It solves the challenge of managing complex, multi-team workflows by delivering visual dashboards, smart alerts, and AI-driven insights that keep every project on track.",
    stats: [
      { value: "40%", label: "Productivity boost with smart alerts and clear ownership" },
      { value: "5", label: "Structured stages" },
      { value: "3-4", label: "Days inactivity alert window that keeps every project moving" },
    ],
    image: fnAdBpImg,
    width: 712,
    height: 419,
    accent: "#C08A4A",
  },
  {
    slug: "pitchmark",
    name: "Pitchmark",
    tag: "Marketing",
    title: "Automated Marketing Pitch Creator",
    description:
      "Pitchmark is an AI-powered tool that automates the creation of highly tailored marketing pitches by pulling live company data including SEO keywords, active ad campaigns, and marketing activity, then generating customized pitches using GPT-4 and pre-designed templates. It solves the bottleneck of time-consuming manual pitch research and writing, allowing teams to redirect their energy toward client relationships and closing deals.",
    stats: [
      { value: "70%", label: "Pitch build time reduced" },
      { value: "3X", label: "Proposal output increased from the same team" },
      { value: "65%", label: "Manual formatting and production effort eliminated" },
    ],
    image: pitchmarkImg,
    width: 835,
    height: 494,
    band: "#00A996",
    accent: "#D6FFF7",
  },
  {
    slug: "mailpitch",
    name: "Mailpitch",
    tag: "Email Marketing",
    title: "AI-Powered HARO Email Automation Tool",
    description:
      "Mailpitch is an AI-powered HARO email automation tool that integrates ChatGPT with the HARO platform to handle the entire pitching process from scanning relevant queries to generating and sending tailored responses. It eliminates the hours of manual effort required to monitor, filter, and respond to journalist queries, making consistent high-quality outreach scalable for any team.",
    stats: [
      { value: "70%", label: "Automation in HARO query management" },
      { value: "30+", label: "Hours per week saved in manual inbox work" },
      { value: "50%", label: "More personalized pitches sent per week" },
    ],
    image: mailpitchImg,
    width: 825,
    height: 481,
    accent: "#0E93DC",
  },
  {
    slug: "autotagai",
    name: "AutotagAI (Bestprover I)",
    tag: "Marketing & Advertising",
    title: "AI-Based Content And Data Tagging System",
    description:
      "AutotagAI is an AI-driven system that automates the classification and tagging of business data at scale using NLP, semantic classification, and transformer-based models. It solves the impossibly time-consuming challenge of manually categorizing large datasets by intelligently organizing millions of business records into defined categories with no human input required.",
    stats: [
      { value: "95%", label: "Manual tagging effort eliminated" },
      { value: "3X", label: "Faster content categorization for large batches" },
      { value: "1.9 FTE", label: "Equivalent effort saved from the tagging team" },
    ],
    image: autotagaiImg,
    width: 796,
    height: 459,
    band: "#A123CC",
    accent: "#F0CCFF",
  },
  {
    slug: "bestprover",
    name: "Bestprover (Phase II)",
    tag: "Marketing & Advertising",
    title: "AI-Powered Review Aggregation Platform",
    description:
      "Bestprover is an AI-driven review aggregation platform that combines ratings from Google, Yelp, and Trustpilot into a single unified trust score for businesses. It addresses the fragmented and unreliable nature of online reviews by using smart matching algorithms to deliver accurate, multi-source reputation data that helps consumers make confident decisions and businesses manage their online presence.",
    stats: [
      { value: "70%", label: "Manual review analysis time saved" },
      { value: "50%", label: "Time saved across end-to-end review operations" },
      { value: "2M", label: "Brand records processed and mapped into main business categories" },
    ],
    image: bestproverImg,
    width: 816,
    height: 459,
    accent: "#C79A05",
  },
  {
    slug: "haslinked",
    name: "Haslinked",
    tag: "Marketing",
    title: "AI-Powered LinkedIn Hashtag Tracker",
    description:
      "Haslinked is a custom AI-powered tool built to fill the significant gap in LinkedIn's native hashtag analytics by capturing real-time engagement data from every post using a client's tracked hashtags. It replaces entirely manual monitoring with automated insights that reveal which hashtags drive reach, audience engagement, and campaign performance.",
    stats: [
      { value: "65%", label: "Reduction in manual monitoring time" },
      { value: "100%", label: "Visibility into hashtag performance" },
      { value: "40%", label: "Increase in campaign engagement" },
    ],
    image: haslinkedImg,
    width: 796,
    height: 547,
    band: "#0070BA",
    accent: "#CBE6FF",
  },
  {
    slug: "voltox",
    name: "Voltox",
    tag: "Fintech & Banking",
    title: "AI-Driven Liveness Detection Tool",
    description:
      "Voltox is an AI-powered identity verification platform that uses advanced computer vision and OCR scanning to deliver real-time facial recognition and liveness detection for KYC processes and passwordless authentication. It addresses the growing demand for secure, frictionless identity verification across banks, fintech platforms, hospitals, insurance companies, and retail environments.",
    stats: [
      { value: "70%", label: "Of KYC onboarding fully automated" },
      { value: "30%", label: "Reduction in user registration time" },
      { value: "99.8%", label: "Identity verification accuracy achieved" },
    ],
    image: voltoxImg,
    width: 849,
    height: 540,
    accent: "#0E4E38",
  },
  {
    slug: "evo-ai",
    name: "Evo AI",
    tag: "Finance",
    title: "AI-Powered Multi Agent Chatbot",
    description:
      "Evo AI is an intelligent AI agent that evolves beyond basic chatbot functionality to understand and respond to complex queries across multiple industries including finance and stock markets. It solves the limitations of static chatbots by enabling real-time training on custom datasets, delivering context-aware, accurate responses tailored to each business's specific needs.",
    stats: [
      { value: "40%", label: "Reduction in AI agent management time" },
      { value: "50X", label: "Faster stock and crypto data processing" },
      { value: "3X", label: "Coverage across financial instruments" },
    ],
    image: evoAiImg,
    width: 732,
    height: 675,
    band: "#0B9444",
    accent: "#D3FBE0",
  },
  {
    slug: "front-office",
    name: "Front Office",
    tag: "Fintech & Investing",
    title: "Predictive Analysis Tool For Traders",
    description:
      "Front Office is an AI-powered forex trading and forecasting platform that uses feature engineering and machine learning to generate predictive analysis and assist traders with technical decision-making. It addresses the high-stakes challenge of navigating volatile markets by providing data-driven trade signals that improve accuracy and reduce the reliance on manual chart analysis.",
    stats: [
      { value: "30%", label: "Increase in trading accuracy" },
      { value: "85%", label: "High-volume market accuracy maintained" },
      { value: "40X", label: "Fewer missed opportunities" },
    ],
    image: frontOfficeImg,
    width: 849,
    height: 1520,
    accent: "#E08210",
  },
  {
    slug: "formole",
    name: "FormOle",
    tag: "Sports",
    title: "AI-Powered Football Coach",
    description:
      "FormOle is a fully automated AI coaching platform that transforms the traditional football coaching model into a virtual, accessible experience where users upload videos and receive instant AI-driven performance analysis. It removes the barrier of requiring physical academy attendance or hiring a personal coach by making professional-level guidance available to any sports enthusiast, anywhere.",
    stats: [
      { value: "50%", label: "Manual coaching time reduced" },
      { value: "100%", label: "Soccer video analysis automated" },
      { value: "2+ Years", label: "Ongoing partnership" },
    ],
    image: formoleImg,
    width: 673,
    height: 868,
    band: "#074E16",
    accent: "#BEF2C7",
  },
];

/** Desks shown at the foot of the page, mirroring the contact page routing. */
export const desks = [
  {
    title: "Info Queries",
    body: "Questions about our services, projects or a new idea you want to explore.",
    email: "info@axiomra.co",
  },
  {
    title: "Careers",
    body: "Want to join the team? Send us your portfolio and we will be in touch.",
    email: "career@axiomra.co",
  },
  {
    title: "Sales",
    body: "Ready to start or scale an AI project? Let's talk scope, pricing and timelines.",
    email: "sales@axiomra.co",
  },
];

export const faqs = [
  {
    q: "What types of AI projects have you worked on?",
    a: "We have shipped AI solutions across healthcare, sports, fintech, fashion, retail and more, spanning predictive analytics, NLP, computer vision, recommendation systems and agentic AI. Each case study solves a real business challenge.",
  },
  {
    q: "Can I see detailed case studies of your past AI projects?",
    a: "Yes. Every project on this page has a longer write-up covering the problem, the architecture, the models we chose and the numbers after launch. Ask for the ones closest to your industry and we will send them across, under NDA where the client requires it.",
  },
  {
    q: "What technologies do you use in your AI projects?",
    a: "Large language models from Anthropic, Google and OpenAI, PyTorch and TensorFlow for custom models, OpenCV for vision, and Python, FastAPI, Node.js, React, PostgreSQL and Docker around them. The stack is chosen against your data and your load, never by fashion.",
  },
  {
    q: "Can you integrate AI with our existing business systems?",
    a: "That is the normal case rather than the exception. We integrate with CRMs, ERPs, data warehouses, spreadsheets and internal APIs, and several projects here ship as plugins inside tools the team already uses, such as Excel and Telegram.",
  },
  {
    q: "Do you offer AI consulting before development?",
    a: "Yes. We start with a free strategy session to pressure-test the idea, then scope the smallest version that proves value. If AI is the wrong tool for the problem, we will say so on that call rather than after an invoice.",
  },
  {
    q: "What is the typical timeline for an AI project?",
    a: "A focused assistant or automation reaches live deployment in about four to six weeks. Platforms with multiple roles, dashboards and integrations run three to six months, delivered in two-week sprints with working software at the end of each one.",
  },
  {
    q: "Can I get a case study relevant to my industry?",
    a: "Tell us the industry and the workflow you want to automate and we will send the closest two or three, including what did not work first time. If we have not shipped in your sector yet, we will say that too.",
  },
];
