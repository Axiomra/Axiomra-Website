/**
 * Copy and imagery for the Education industry page (/industries/education).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/education/hero.webp";
import introImg from "../assets/industries/education/intro.webp";

import svcOperationsImg from "../assets/industries/education/svc-operations.webp";
import svcCollaborationImg from "../assets/industries/education/svc-collaboration.webp";
import svcAssessmentImg from "../assets/industries/education/svc-assessment.webp";
import svcContentImg from "../assets/industries/education/svc-content.webp";
import svcInteractiveImg from "../assets/industries/education/svc-interactive.webp";

import specBgImg from "../assets/industries/education/spec-bg.webp";
import techBgImg from "../assets/industries/education/tech-bg.webp";
import midCtaBgImg from "../assets/industries/education/midcta-bg.webp";
import textureBgImg from "../assets/industries/education/texture-bg.webp";

import stkAdminsImg from "../assets/industries/education/stk-admins.webp";
import stkTeachersImg from "../assets/industries/education/stk-teachers.webp";
import stkStudentsImg from "../assets/industries/education/stk-students.webp";
import stkParentsImg from "../assets/industries/education/stk-parents.webp";
import stkK12Img from "../assets/industries/education/stk-k12.webp";
import stkHigherEdImg from "../assets/industries/education/stk-highered.webp";

import blog1Img from "../assets/industries/education/blog-1.webp";
import blog2Img from "../assets/industries/education/blog-2.webp";
import blog3Img from "../assets/industries/education/blog-3.webp";
import finalCtaBgImg from "../assets/industries/education/final-cta.webp";

export const EDUCATION_SLUG = "education";

export const hero = {
  eyebrow: "AI for the education industry",
  titleLead: "Rebuilding EdTech With AI-Powered",
  titleAccent: "Education Software Development",
  titleTail: "Services",
  body:
    "As a leading education app development company, Axiomra builds intelligent, AI-powered learning products that give educators and students better tools. Our custom education software development services deliver tools that improve learning engagement, cut administrative work and support digital transformation across K-12 schools, colleges and universities.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "The reading room of a historic library lined with books",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "AI-Powered Education Software Development Services",
  titleAccent: "For Equitable Learning Outcomes",
  paragraphs: [
    "We design and build secure, interoperable learning platforms, adaptive courseware and analytics that measurably improve student outcomes. Our AI-powered education software closes the digital divide by design, with mobile-first, low-bandwidth experiences and offline sync, while upskilling educators through embedded coaching and just-in-time training.",
    "By unifying LMS, SIS, content and assessment data, we simplify workflows, protect privacy by design and raise engagement with personalised paths, timely feedback and gamified nudges. Delivered through agile discovery, rapid prototyping, rigorous QA and phased rollouts, our solutions stay scalable, reliable and accessible across devices and contexts.",
  ],
  ctaText: "Let's work together",
  image: introImg,
  alt: "A student taking notes from a textbook at a study desk",
};

export const impact = {
  titleLead: "AI's Measurable Impact On",
  titleAccent: "Global Education Outcomes",
  body:
    "AI is rapidly reshaping K-12, higher education and workforce training: speeding up instruction, grading and student support while personalising learning journeys, improving accessibility and delivering real-time insight that boosts engagement, equity and completion.",
  stats: [
    {
      value: "92%",
      label: "of UK undergraduates now use AI tools in their studies.",
      source: "HEPI, Student Generative AI Survey 2025",
    },
    {
      value: "88%",
      label: "reported using generative AI for assessment-related tasks in 2025.",
      source: "HEPI, Student Generative AI Survey 2025",
    },
    {
      value: "$7.6B",
      label: "global AI in education market size estimated for 2025.",
      source: "The Business Research Company, 2025 market report",
    },
  ],
};

/**
 * The challenge rail. Each entry is a barrier institutions hit, and the
 * capability we build to remove it.
 */
export const challenges = {
  eyebrow: "Overcoming key barriers in digital learning",
  titleLead: "Top 7 Education Industry",
  titleAccent: "Challenges We Solve",
  items: [
    {
      title: "Digital Divide & Access Barriers",
      body:
        "Many students have limited access to devices, bandwidth and online resources, which quietly decides who keeps up and who falls behind. We build inclusive platforms that run on low-end devices and poor networks, with offline sync and mobile-first flows, so every learner can take part fully.",
    },
    {
      title: "Inadequate Teacher Training",
      body:
        "New tools fail when the staff using them are handed a login and left alone. We embed guided onboarding, in-product coaching and role-based training paths into the platform itself, so teachers build confidence while they work instead of in a one-off workshop they forget by term two.",
    },
    {
      title: "Data Privacy & Security",
      body:
        "Student records are among the most sensitive data any organisation holds, and the rules differ by country and by age group. We design for GDPR, FERPA and COPPA from the first architecture session: least-privilege access, encryption in transit and at rest, audit trails and clear consent and retention policies.",
    },
    {
      title: "Student Engagement",
      body:
        "Attendance is not attention. Courses lose learners in the middle, long before anyone sees it in the results. We build adaptive content, gamified progress, timely nudges and interactive assessment so engagement is designed in and, just as importantly, measured week by week rather than at the end.",
    },
    {
      title: "Limited Personalisation",
      body:
        "One syllabus at one pace suits almost nobody. Our AI models read performance signals to identify each learner's gaps and recommend the next best activity, so stronger students keep moving and struggling students get help while it still matters.",
    },
    {
      title: "Poor Platform Integration",
      body:
        "LMS, SIS, assessment tools and content libraries rarely talk to each other, so staff re-key the same data and no one trusts the reports. We build integration layers on LTI, xAPI, OneRoster and SIS APIs that make one record the source of truth across every system.",
    },
    {
      title: "Administrative Overload",
      body:
        "Registration, timetabling, attendance, grading and reporting consume the hours that should go to teaching. We automate the repeatable parts and give leadership live dashboards, so the admin load drops and the decisions get faster and better evidenced.",
    },
  ],
};

/**
 * The five product families we build, each with the modules that sit inside
 * them. `points` renders as the arrow list from the reference.
 */
export const services = {
  eyebrow: "What types of education apps are we experts in?",
  titleLead: "Education Software Development Services",
  titleAccent: "For Digital Transformation",
  body:
    "Our team of expert education software developers builds custom software for K-12 schools and universities, ensuring each solution aligns with your institutional goals. Whether you want to enhance remote learning, improve student engagement or cut down administrative processes, our EdTech software development services deliver measurable results.",
  items: [
    {
      title: "Educational Operations and Analytics Tools",
      body:
        "Simplify administration and boost performance with advanced back-office solutions. Our e-learning software development services enable smooth operations, accurate reporting and informed decision-making across every department.",
      points: ["Learning Management Systems (LMS)", "Student Information Systems (SIS)", "Performance Analytics"],
      image: svcOperationsImg,
      alt: "An analytics dashboard open on a laptop at a study desk",
    },
    {
      title: "Collaboration and Communication Platforms",
      body:
        "Enhance connectivity with tools that support remote learning and group projects. As a trusted EdTech app development company, we deliver solutions that improve teamwork and keep parents, tutors and students in the same loop.",
      points: ["Online Collaboration Platforms", "Discussion Forums", "Video Conferencing Tools"],
      image: svcCollaborationImg,
      alt: "Two participants smiling during a live video lesson",
    },
    {
      title: "Assessment and Feedback Systems",
      body:
        "Our AI-based educational app development services offer powerful tools for quizzes, automated grading and performance analytics, shortening the feedback process and giving teachers back the evenings they currently spend marking.",
      points: ["Online Assessment Tools", "Automated Grading Systems", "Performance Analytics"],
      image: svcAssessmentImg,
      alt: "A pencil resting on a multiple-choice answer sheet",
    },
    {
      title: "Content Creation and Accessibility Tools",
      body:
        "Create interactive and multimedia-rich educational materials. Our EdTech app development services support inclusive learning experiences, so the same course works for a screen reader, a slow connection and a second language.",
      points: [
        "E-Learning Authoring Tools",
        "Digital Content Repositories",
        "Assistive Technology",
        "Teacher Training Platforms",
        "Multilingual Platforms",
        "Certification and Credentialing Systems",
      ],
      image: svcContentImg,
      alt: "A blank sketch pad surrounded by coloured pencils on a desk",
    },
    {
      title: "Interactive Learning and Engagement Solutions",
      body:
        "Engage students with adaptive learning platforms, AI-powered virtual teaching and gamified experiences. Our educational app development services create personalised learning paths that improve motivation and understanding.",
      points: [
        "Adaptive Learning Platforms",
        "Gamified Learning",
        "Interactive Simulations",
        "Personalised Learning Apps",
        "Virtual Reality (VR) and Augmented Reality (AR)",
      ],
      image: svcInteractiveImg,
      alt: "A child following an interactive lesson on a tablet",
    },
  ],
};

/** The product types we specialise in, shown as a pill rail over a photo band. */
export const specialisms = {
  eyebrow: "What types of education apps do we specialise in?",
  titleLead: "Using AI To Create Custom",
  titleAccent: "Education Software Solutions That Lead The Industry",
  background: specBgImg,
  items: [
    {
      label: "Mobile learning apps",
      body:
        "Learning that survives a commute and a weak signal. We build offline-first mobile apps with synced progress, push nudges and bite-sized lessons, so study time fits the gaps in a student's day instead of competing with them.",
    },
    {
      label: "School management software",
      body:
        "Admissions, timetabling, attendance, fees and reporting in one system rather than six spreadsheets. Role-based access keeps staff, parents and leadership on the same record without exposing anything they should not see.",
    },
    {
      label: "Tutor apps",
      body:
        "Marketplace or in-house, the mechanics are the same: matching, scheduling, payments, live sessions and a shared progress history that makes the next session start where the last one ended.",
    },
    {
      label: "E-learning apps",
      body:
        "Course authoring, media delivery, assessment and certification, built to keep working when a cohort of ten thousand all log in on the same Monday evening.",
    },
    {
      label: "LMS software",
      body:
        "A learning management system shaped around your curriculum, integrated with your SIS and content libraries through LTI and OneRoster, with analytics leadership will actually open.",
    },
  ],
};

/** The four technology pillars under every EdTech build. */
export const technologies = {
  eyebrow: "Which technologies do we use for education solutions?",
  titleLead: "Modern Technologies For Reliable",
  titleAccent: "EdTech And E-Learning Tools",
  body:
    "As a leading e-learning development company, we specialise in EdTech software development and educational app development services to create dependable educational applications. Our approach integrates various tech solutions to enhance user experiences, simplify operations and provide real value in the education sector.",
  ctaText: "View all services",
  background: techBgImg,
  items: [
    {
      title: "Artificial Intelligence",
      body:
        "AI drives smarter decision-making and automation in education. Machine learning algorithms analyse student data to identify gaps, predict performance and provide personalised learning paths, so institutions raise engagement, optimise resources and improve outcomes.",
    },
    {
      title: "Data Analytics",
      body:
        "Data analytics uncovers trends and insight, supporting better instructional strategies and operational decisions. Advanced reporting tools help administrators monitor performance, evaluate programmes and make decisions backed by evidence rather than instinct.",
    },
    {
      title: "Generative AI",
      body:
        "Generative AI accelerates content creation, automates curriculum design and supports personalised learning experiences. With this technology, educators focus on teaching while the software handles repetitive tasks and content adaptation.",
    },
    {
      title: "Machine Learning",
      body:
        "Machine learning converts large datasets into insight teachers can act on. It helps tailor learning modules, improve student interactions and optimise administrative workflows, allowing schools to operate more efficiently and scale effectively.",
    },
  ],
};

/** Six outcomes AI opens up for an institution. */
export const streamline = {
  eyebrow: "What can AI optimise for you?",
  titleLead: "Discover How AI Can",
  titleAccent: "Simplify Your Education Operations",
  texture: textureBgImg,
  items: [
    {
      title: "Increased Student Retention",
      body:
        "Low engagement and one-size-fits-all learning lead to high dropout rates. AI-powered platforms tailor learning experiences to each student's needs, improving motivation, boosting retention and lifting overall educational outcomes.",
    },
    {
      title: "Improved Student Learning",
      body:
        "Identifying knowledge gaps is difficult at scale. Machine learning analyses student data to provide personalised feedback and targeted learning paths, helping learners achieve better results without waiting for the end-of-term report.",
    },
    {
      title: "Enhanced Efficiency",
      body:
        "Administrative tasks like grading and reporting consume significant time. Automation through AI and smart analytics simplifies these processes, saving time and resources while reducing errors.",
    },
    {
      title: "Optimised Product Development",
      body:
        "Building effective educational tools requires insight into user behaviour and outcomes. AI-driven analytics reveal trends and preferences, guiding the development of solutions that meet real-world needs.",
    },
    {
      title: "Enhanced Marketing And Student Acquisition",
      body:
        "Understanding student and institutional needs helps EdTech providers target effectively. Data insights support tailored marketing strategies, attracting the right users and improving adoption rates.",
    },
    {
      title: "Strategic Advantage",
      body:
        "Staying competitive requires innovation. Integrating AI and machine learning into educational solutions provides unique capabilities, improving learning outcomes, operational efficiency and market positioning.",
    },
  ],
};

export const midCta = {
  title: "Craft Your Ideal AI-Powered EdTech Software Solution",
  body:
    "Our AI-powered platforms enhance teaching, engage students and take the weight out of administrative processes, enabling schools, universities and training centres to thrive in a digital-first world.",
  ctaText: "Get in touch now",
  background: midCtaBgImg,
};

export const stakeholders = {
  eyebrow: "Who we build for",
  titleLead: "Built For Every",
  titleAccent: "Stakeholder In Education",
  items: [
    {
      title: "School Administrators",
      body:
        "Live dashboards for enrolment, attendance, staffing and spend, so decisions are made on this week's numbers rather than last term's report.",
      image: stkAdminsImg,
      alt: "Three school staff members reviewing paperwork together at a desk",
    },
    {
      title: "Teachers & Instructors",
      body:
        "Automated grading, lesson planning support and a clear view of which students need help this week, giving teaching hours back to teaching.",
      image: stkTeachersImg,
      alt: "A teacher guiding a young pupil writing on a classroom blackboard",
    },
    {
      title: "Students",
      body:
        "Adaptive paths, instant feedback and mobile access, so the course meets each learner at their own pace and on the device they actually use.",
      image: stkStudentsImg,
      alt: "Two university students smiling in a lecture hall",
    },
    {
      title: "Parents",
      body:
        "Progress, attendance and communication in one portal, so families see how a child is doing without waiting for a parents' evening.",
      image: stkParentsImg,
      alt: "A parent reading with a child at home",
    },
    {
      title: "K-12 Institutions",
      body:
        "Safeguarded, age-appropriate platforms that handle timetabling, assessment and reporting for a whole school without a dedicated IT department.",
      image: stkK12Img,
      alt: "A young pupil with a school backpack on the first day of term",
    },
    {
      title: "Higher Education & Universities",
      body:
        "Research-grade analytics, credentialing and SIS integration built for scale, multi-campus structures and the compliance reviews that come with them.",
      image: stkHigherEdImg,
      alt: "A university campus quad on a clear day",
    },
  ],
};

export const blogs = {
  eyebrow: "What can our expertise teach you?",
  title: "Explore Insights On AI And EdTech Innovation",
  body:
    "We share what we learn building education platforms: practical guidance, architecture decisions and real-world case studies for institutions and EdTech founders.",
  posts: [
    {
      title: "How To Develop Custom Language Learning Software In 2026",
      tag: "Product",
      image: blog1Img,
      alt: "The letters AI standing on a circuit board",
    },
    {
      title: "A Complete Guide To E-Learning App Development",
      tag: "Guide",
      image: blog2Img,
      alt: "A child using a learning app on a tablet",
    },
    {
      title: "Top 10 AI-Based Language Learning Apps In 2026",
      tag: "Roundup",
      image: blog3Img,
      alt: "A graduate throwing a cap into a blue sky",
    },
  ],
};

export const techStrip = {
  eyebrow: "Our tech stack",
  titleLead: "Proven Technology",
  titleAccent: "Solutions For Your Institution",
  body:
    "The same production-grade toolchain sits under every learning platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "Phi-2", "Groq", "PaLM", "Whisper",
        "Stable Diffusion", "MediaPipe", "Guardrails", "Vertex AI", "OpenAI Embeddings", "LangChain", "RAG Pipelines",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "Express", "FastAPI", "Django", "GraphQL", "PostgreSQL", "MongoDB",
        "Redis", "Elasticsearch", "Qdrant", "Pinecone", "Kafka", "Airflow", "dbt", "BigQuery",
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
      id: "edtech",
      label: "EdTech Standards",
      items: ["LTI 1.3", "xAPI", "SCORM", "QTI", "OneRoster", "Ed-Fi", "Open Badges", "WCAG 2.2", "Moodle", "Canvas API"],
    },
    {
      id: "design",
      label: "UI / UX",
      items: ["Figma", "Design Tokens", "Prototyping", "Accessibility Audits", "Usability Testing With Learners"],
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who do we work with?",
  titleLead: "Explore The Range Of",
  titleAccent: "Education Organisations We Support",
  body:
    "We build AI-powered education software for the people responsible for learning outcomes, whether that is a single campus, a multi-academy trust or an EdTech product serving thousands of institutions.",
  rows: [
    {
      label: "EdTech startups",
      body: "We help founders get a first learning product live fast: concept validation, an MVP that proves retention, and the analytics to show it working before the next raise.",
    },
    {
      label: "K-12 schools and trusts",
      body: "Safeguarding, timetabling, attendance and parent communication in one platform, built for schools that do not have an in-house engineering team to maintain it.",
    },
    {
      label: "Colleges and universities",
      body: "Multi-campus SIS and LMS integration, credentialing, research analytics and the accessibility and procurement evidence higher education reviews demand.",
    },
    {
      label: "Corporate training providers",
      body: "Workforce learning at scale: compliance tracking, skills mapping, certification and reporting that stands up to an audit as well as to a board deck.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "What Our Clients Say About Our",
  titleAccent: "AI Development Team",
  items: [
    {
      name: "Sudeep Kulkarni",
      role: "CEO & Founder, NitCode",
      quote:
        "The team were very co-operative and helpful throughout the project. They understood what we needed early, kept us updated weekly and delivered without the back and forth we expected. Highly recommended for AI projects.",
      rating: 5,
    },
    {
      name: "David",
      role: "CEO, Alisia",
      quote:
        "They never miss deadlines and always delivered the agreed scope on time. They collaborated with us at different stages of product development and were ready to accept the changes we required in our application.",
      rating: 5,
    },
    {
      name: "James",
      role: "CEO & Founder, FluentTalkAI",
      quote:
        "I'm very grateful for their services. They helped us build a great AI product that is actually usable by thousands of people. They are the best in building AI-powered software, very professional and easy to work with.",
      rating: 5,
    },
  ],
};

export const showcase = {
  eyebrow: "What innovations have we delivered to businesses?",
  titleLead: "Showcasing Our",
  titleAccent: "AI Development Projects",
  body:
    "Explore the platforms we have shipped as an AI development company, built to solve the operational and learning problems institutions actually face.",
  ctaText: "Check out our full portfolio",
};

export const partner = {
  eyebrow: "Why choose us for your next big project?",
  titleLead: "Choose Axiomra For",
  titleAccent: "Results That Speak For Themselves",
  cards: [
    {
      icon: "Target",
      title: "Enhanced Training Adaptability",
      body:
        "Educators need effective tools to convey concepts and reinforce learning. Our educational app development services integrate cleanly with classroom and online programmes, providing interactive training modules that support teaching and assessment.",
    },
    {
      icon: "Layers",
      title: "Enhanced Cost Efficiency",
      body:
        "Investing in custom education software helps institutions maximise resources. By partnering with digital content providers and using AI solutions, schools and universities expand what they offer while reducing operational costs.",
    },
    {
      icon: "ShieldCheck",
      title: "Flexibility With Modern Teaching Methods",
      body:
        "Learning methods evolve rapidly. Our mobile EdTech apps support interactive modules, job aids and updated teaching methodologies. Scalable and adaptable, these solutions ensure learners always access effective, up-to-date educational content.",
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
    q: "How is AI and machine learning used in EdTech?",
    a: "In three main places. Personalisation: models read performance signals and recommend the next best activity for each learner. Automation: grading, scheduling, attendance and reporting run without staff re-keying data. Early warning: engagement and assessment patterns flag students at risk while there is still time to intervene.",
  },
  {
    q: "How can Axiomra tailor EdTech app development to an institution's needs?",
    a: "We start with discovery on your curriculum, your existing systems and your compliance obligations, then build around them rather than around a product template. That usually means integrating your SIS and LMS instead of replacing them, and shipping the highest-value module first so staff see a result inside a term.",
  },
  {
    q: "Can your solutions integrate with existing EdTech systems?",
    a: "Yes. We build against the standards the sector already runs on: LTI 1.3, xAPI, SCORM, QTI, OneRoster and Ed-Fi, plus direct SIS and LMS APIs where a standard does not cover it. The goal is one source of truth per record, not another system to reconcile.",
  },
  {
    q: "How do I hire an app developer to make an educational app?",
    a: "Start with a scoped consultation rather than a job spec. We will size the work honestly, including what we would not build, and you get a written scope, timeline and cost before anyone writes code. From there you can engage us for a fixed-scope MVP or as a dedicated team.",
  },
  {
    q: "Is custom educational software development a smarter choice than off-the-shelf?",
    a: "It depends on where your pain is. Off-the-shelf is fine for commodity needs. Custom pays when the tools fracture: the joins between LMS, SIS and assessment, the reporting layer no vendor owns, and the workflows specific to how your institution runs. Most clients do both, and we will tell you which is which.",
  },
  {
    q: "How do you handle student data privacy and safeguarding?",
    a: "GDPR, FERPA and COPPA requirements are designed in from the first architecture session: least-privilege role-based access, encryption in transit and at rest, audit trails, data residency, retention policies and age-appropriate consent flows. We also document all of it for the review your DPO or procurement team will run.",
  },
  {
    q: "How long does an education platform build take?",
    a: "A scoped MVP with one capability, such as an assessment engine or a parent portal, typically runs eight to twelve weeks. A full platform spanning LMS, SIS integration and analytics runs four to nine months, delivered in increments you can use from the first sprint rather than at the end.",
  },
];

export const finalCta = {
  title: "Put AI To Work Across Your Institution",
  subtitle:
    "As a premier AI service provider, we are trusted by clients worldwide to deliver tailored AI solutions that drive success. Let's discuss your project.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
