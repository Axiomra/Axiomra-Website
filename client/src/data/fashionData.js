/**
 * Copy and imagery for the Fashion industry page (/industries/fashion).
 *
 * Everything the page renders comes from here, so a copy change never
 * touches a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/fashion/hero.webp";
import introImg from "../assets/industries/fashion/intro.webp";
import analyticsImg from "../assets/industries/fashion/analytics.webp";
import fittingImg from "../assets/industries/fashion/fitting.webp";
import supplyImg from "../assets/industries/fashion/supply.webp";
import ecommerceImg from "../assets/industries/fashion/ecommerce.webp";
import designImg from "../assets/industries/fashion/design.webp";
import retailImg from "../assets/industries/fashion/retail.webp";
import solutionsBgImg from "../assets/industries/fashion/solutions-bg.webp";
import ctaImg from "../assets/industries/fashion/cta.webp";
import midCtaBgImg from "../assets/industries/fashion/midcta-bg.webp";
import finalCtaBgImg from "../assets/industries/fashion/final-cta.webp";
import designersImg from "../assets/industries/fashion/designers.webp";
import brandsImg from "../assets/industries/fashion/brands.webp";
import executivesImg from "../assets/industries/fashion/executives.webp";
import blog1Img from "../assets/industries/fashion/blog-1.webp";
import blog2Img from "../assets/industries/fashion/blog-2.webp";
import blog3Img from "../assets/industries/fashion/blog-3.webp";

export const FASHION_SLUG = "fashion";

export const hero = {
  eyebrow: "AI for the fashion industry",
  titleLead: "Custom Fashion App",
  titleAccent: "Development Services",
  body:
    "As a leading fashion app development company, we deliver AI-powered fashion software that cuts return rates, improves sizing accuracy and simplifies operations. Our custom fashion platforms help brands boost profitability, elevate customer experience and accelerate digital transformation.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "A rail of brightly coloured jackets hanging in a boutique window",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "AI-Powered Fashion Software Development Services For",
  titleAccent: "Sustainable, Transparent, Profitable Growth Worldwide",
  paragraphs: [
    "We provide AI fashion software development services for brands, retailers and manufacturers. We build end-to-end platforms for demand forecasting, design-to-shelf acceleration and transparent supply chains. They tackle waste, greenwashing risk and counterfeits with real-time traceability, so merchandisers, designers and sustainability teams gain trustworthy insight that lifts quality and consumer trust.",
    "Built on a composable data fabric, computer vision and foundation models with no-code tools, the platform learns from sales, social and supplier signals. It predicts demand, flags quality issues and personalises journeys to lower CAC. Automation speeds up sourcing and compliance, supporting faster launches and measurable impact reductions. The result is resilient operations, higher margins and delighted customers across shifting trends.",
  ],
  ctaText: "Request a Demo",
  image: introImg,
  alt: "Rows of patterned shirts on wooden hangers in a clothing store",
};

export const impact = {
  titleLead: "AI's Measurable Impact On",
  titleAccent: "Global Fashion Outcomes",
  body:
    "AI fashion software development is reshaping how brands design, forecast and sell by unifying product, customer, social and supply data into actionable intelligence. Teams move from intuition to measurable outcomes across trend discovery, assortment planning, dynamic pricing and omnichannel merchandising, all while keeping creative direction aligned.",
  stats: [
    {
      value: "82%",
      label: "of consumers want AI to reduce research time when shopping fashion, accelerating product discovery.",
      source: "McKinsey, The State of Fashion Survey 2025",
    },
    {
      value: "75%",
      label: "of fashion executives prioritise AI for demand forecasting, inventory optimisation and cost control in 2025.",
      source: "McKinsey, The State of Fashion Survey 2025",
    },
    {
      value: "50%",
      label: "of executives say AI-driven product discovery is the top gen-AI use case for 2025.",
      source: "McKinsey, The State of Fashion Report",
    },
  ],
};

/**
 * Each service row is "what it does" plus four capability pairs. The
 * component renders the arrow between `name` and `outcome`, so keep both
 * halves short and free of trailing punctuation.
 */
export const services = {
  eyebrow: "What types of fashion apps are we experts in?",
  titleLead: "Custom AI-Powered",
  titleAccent: "Fashion Software Development Services",
  items: [
    {
      title: "Fashion Analytics and Insights Tools",
      body:
        "Put your data to work with AI-driven fashion analytics. From consumer behaviour tracking to sales forecasting, our tools turn raw data into insight you can act on so brands make smarter decisions, optimise strategy and stay ahead in a fast-moving market.",
      image: analyticsImg,
      alt: "A store manager reviewing stock on a tablet beside a rail of garments",
      points: [
        { name: "Fashion Analytics Tools", outcome: "Overcome unclear consumer patterns with real-time insights" },
        { name: "Business Intelligence Solutions", outcome: "Eliminate guesswork through data-backed decisions" },
        { name: "Trend Prediction Software", outcome: "Avoid missed fashion trends with AI-powered forecasting" },
        { name: "Store Analytics", outcome: "Cut inefficiencies with store-level performance insights" },
      ],
    },
    {
      title: "Virtual Fitting Rooms & AR Try-Ons",
      body:
        "Tackle one of fashion's biggest challenges: sizing and fit. Our AR-based virtual fitting rooms and try-on apps reduce return rates, boost customer confidence and enhance the shopping journey across both online and in-store experiences.",
      image: fittingImg,
      alt: "A shopper in sunglasses and a burgundy coat carrying several shopping bags",
      points: [
        { name: "Virtual Fitting Rooms", outcome: "Reduce costly returns caused by poor sizing" },
        { name: "AR Try-On Apps", outcome: "Eliminate uncertainty in online shopping" },
        { name: "Mobile Integration", outcome: "Deliver try-on experiences that work anywhere" },
        { name: "Customer Confidence Boost", outcome: "Enhance trust with accurate fit previews" },
      ],
    },
    {
      title: "Fashion Supply Chain & Inventory Solutions",
      body:
        "Manage your supply chain smarter with AI-powered inventory and logistics tools. We help brands reduce stockouts, cut excess inventory costs and improve fulfilment efficiency with real-time data and predictive models.",
      image: supplyImg,
      alt: "A garment factory stitching line with folded apparel stacked along the benches",
      points: [
        { name: "Inventory Management", outcome: "Avoid stockouts and overstock issues" },
        { name: "AI Demand Forecasting", outcome: "Stop losses with accurate demand prediction" },
        { name: "Logistics Optimisation", outcome: "Reduce delays and improve delivery times" },
        { name: "Vendor Management", outcome: "Simplify supplier coordination for smoother operations" },
      ],
    },
    {
      title: "Fashion E-Commerce & Customer Experience Platforms",
      body:
        "Turn your online store into a high-performance sales channel. From personalised shopping experiences to AI-driven recommendations, our solutions help fashion businesses increase engagement, retention and conversions.",
      image: ecommerceImg,
      alt: "A flat lay of a knitted hat, jumper, jeans, a watch and tulips on white linen",
      points: [
        { name: "Personalised Shopping", outcome: "End generic experiences with tailored journeys" },
        { name: "AI Recommendation Engines", outcome: "Boost sales with smarter product suggestions" },
        { name: "Omnichannel Integration", outcome: "Close the gap between online and in-store" },
        { name: "Secure Payments", outcome: "Reduce cart abandonment with a shorter checkout" },
      ],
    },
    {
      title: "Fashion Design & Product Innovation Tools",
      body:
        "Give designers modern tools that speed up creativity and reduce errors. We support everything from digital prototyping to sustainable product development, helping brands bring winning designs to market faster.",
      image: designImg,
      alt: "A flat lay of leopard-print shoes, a leather wallet, sunglasses and accessories",
      points: [
        { name: "3D Design Software", outcome: "Avoid delays with faster digital prototyping" },
        { name: "AI Style Generators", outcome: "Reduce creative block with AI-assisted design ideas" },
        { name: "Collaboration Platforms", outcome: "Eliminate siloed workflows with team-based design tools" },
        { name: "Sustainability Tracking", outcome: "Minimise waste with eco-focused product insights" },
      ],
    },
    {
      title: "Fashion Retail & In-Store Experience Solutions",
      body:
        "Reimagine physical retail with intelligent in-store solutions. From smart mirrors to real-time customer analytics, we bridge the gap between offline and online experiences to keep fashion retail competitive.",
      image: retailImg,
      alt: "A shopper smiling at a boutique counter while staff use a tablet point-of-sale",
      points: [
        { name: "Smart Mirrors", outcome: "Enhance shopping with interactive try-ons" },
        { name: "Customer Heatmaps", outcome: "Fix poor layouts with foot-traffic insights" },
        { name: "Digital Kiosks", outcome: "Speed up purchases with self-service options" },
        { name: "Unified Loyalty Programs", outcome: "Retain shoppers with personalised rewards" },
      ],
    },
  ],
};

export const solutions = {
  eyebrow: "What types of fashion apps are we experts in?",
  titleLead: "Building AI-Powered Fashion",
  titleTail: "Solutions Using The Latest Technology",
  image: solutionsBgImg,
  tabs: [
    {
      id: "apparel",
      label: "Apparel and Store Apps",
      title: "Apparel and store apps that sell on every screen",
      body:
        "Native and cross-platform storefronts with AI product discovery, size guidance and one-tap checkout. Built to keep the brand experience consistent from the feed to the fitting room.",
      bullets: ["Personalised catalogue feeds", "Size and fit guidance at add-to-cart", "Loyalty, wishlists and restock alerts"],
    },
    {
      id: "design",
      label: "Clothing Design Softwares",
      title: "Design software that shortens the sketch-to-sample loop",
      body:
        "Generative design assistants, 3D garment visualisation and tech-pack automation so design teams iterate in hours, not weeks, and pass production-ready specs downstream.",
      bullets: ["AI mood boards and style generation", "3D pattern and drape previews", "Automated tech packs and BOMs"],
    },
    {
      id: "ecommerce",
      label: "Fashion Ecommerce App",
      title: "E-commerce platforms tuned for conversion",
      body:
        "Headless commerce with recommendation engines, visual search, dynamic pricing and returns prediction wired into the same customer profile across web, app and marketplace.",
      bullets: ["Visual and semantic product search", "Dynamic bundles and pricing", "Returns risk scoring before dispatch"],
    },
    {
      id: "closet",
      label: "Virtual Closet Apps",
      title: "Virtual closets that keep customers coming back",
      body:
        "Digitised wardrobes with outfit generation, wear tracking and resale hooks. The data feeds recommendations that feel personal because they are built on what the customer already owns.",
      bullets: ["Wardrobe digitisation from photos", "Daily outfit suggestions by weather and calendar", "Resale and rental integrations"],
    },
    {
      id: "styling",
      label: "3D Virtual Styling Apps",
      title: "3D styling and try-on that removes the guesswork",
      body:
        "Body-accurate avatars, AR try-on and 3D garment simulation that let shoppers see fit and drape before they buy, cutting the returns that eat fashion margins.",
      bullets: ["Photogrammetry-based body scanning", "Real-time AR try-on on mobile", "Fit confidence scores at checkout"],
    },
  ],
};

export const technologies = {
  eyebrow: "Which technologies do we use for fashion solutions?",
  titleLead: "The Technologies We Build On",
  titleTail: "For AI Fashion Tools",
  body:
    "We use current technologies to build scalable, long-lived applications for the fashion industry. Our approach blends AI, data analytics and intelligent automation to enhance creativity, improve efficiency and deliver superior customer experiences.",
  ctaText: "View all services",
  items: [
    {
      title: "Artificial Intelligence",
      body:
        "AI is reshaping fashion by boosting creativity, speeding up production and personalising shopping journeys. From intelligent recommendations to automated design tools, it lets brands move faster.",
      metric: "3.2x",
      metricLabel: "faster decisions",
    },
    {
      title: "Data Analytics",
      body:
        "Data-driven insight uncovers customer preferences, forecasts demand and optimises operations. By translating data into strategy, businesses stay competitive in a fast-moving market.",
      metric: "28%",
      metricLabel: "less dead stock",
    },
    {
      title: "Generative AI",
      body:
        "Generative AI opens new possibilities in design and personalisation. It accelerates creative workflows, produces unique styles and enriches customer experiences through innovation.",
      metric: "10x",
      metricLabel: "more design variants",
    },
    {
      title: "Machine Learning",
      body:
        "Machine learning turns raw data into usable insight. It improves design accuracy, predicts demand and enhances product recommendations, helping brands reduce returns and increase loyalty.",
      metric: "31%",
      metricLabel: "fewer returns",
    },
    {
      title: "Computer Vision",
      body:
        "Computer vision powers advanced visual analysis in fashion. From automated quality checks to trend forecasting and AR experiences, it enables more accurate, engaging and efficient solutions.",
      metric: "99%",
      metricLabel: "defect detection",
    },
  ],
};

export const techStrip = {
  eyebrow: "Our tech stack",
  titleLead: "Expertise In Advanced",
  titleAccent: "Development Technologies",
  body:
    "The same production-grade toolchain sits under every fashion product we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Gemini", "Llama 3", "Mistral", "Phi-2", "Groq", "PaLM", "Pix2Pix", "StyleGAN",
        "Stable Diffusion", "Midjourney", "DeepDream", "Whisper", "MediaPipe", "Guardrails", "Vertex AI",
        "OpenAI Embeddings", "CLIP", "YOLO",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "Express", "FastAPI", "Django", "GraphQL", "PostgreSQL", "MongoDB",
        "Redis", "Elasticsearch", "Qdrant", "Pinecone", "Kafka", "Airflow",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "Vue", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js",
        "React Native", "Flutter", "Vite", "Radix UI",
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
      id: "sqa",
      label: "SQA",
      items: ["Playwright", "Cypress", "Vitest", "Jest", "Pytest", "Postman", "k6", "Burp Suite"],
    },
    {
      id: "design",
      label: "UI / UX",
      items: ["Figma", "CLO 3D", "Design Tokens", "Prototyping", "WCAG 2.2 Audits", "Usability Testing"],
    },
  ],
};

export const streamline = {
  eyebrow: "What AI can optimise for you?",
  titleLead: "Discover How AI Can",
  titleAccent: "Simplify Your Fashion Operations",
  items: [
    {
      title: "Boost Revenue",
      body: "Smart e-commerce platforms increase conversions, improve user experiences and deliver personalised shopping that drives sales.",
    },
    {
      title: "Sustainable Resale Market",
      body: "Eco-focused solutions help brands enter the growing resale market, reducing waste and appealing to sustainability-conscious consumers.",
    },
    {
      title: "Global Reach & Brand Identity",
      body: "Scalable digital platforms support international growth, ensuring a consistent brand identity across regions.",
    },
    {
      title: "Data-Driven Insights",
      body: "Actionable analytics refine product offerings, optimise collections and align with shifting customer expectations.",
    },
    {
      title: "AI and Social Media Integration",
      body: "AI-powered tools plug straight into social platforms to improve engagement, personalise campaigns and boost visibility.",
    },
    {
      title: "Omnichannel Innovations",
      body: "Connected shopping experiences, whether in-store, online or in the metaverse, create stronger customer loyalty and future-proof business models.",
    },
  ],
};

export const midCta = {
  title: "Create Your Perfect Fashion Software Solution",
  body:
    "Grow your fashion business with our fashion app development services, crafted to enhance efficiency, engage customers and grow revenue.",
  ctaText: "Contact Us Today",
  image: ctaImg,
  alt: "A model in a flowing red dress turning in a garden",
  background: midCtaBgImg,
};

export const stakeholders = {
  eyebrow: "Who benefits",
  titleLead: "Built Around Every",
  titleAccent: "Stakeholder In Fashion",
  items: [
    {
      title: "Fashion Designers & Manufacturers",
      body: "Faster prototyping, fewer sampling rounds and production data that reaches the studio before the line is cut.",
      image: designersImg,
      alt: "Sage-green t-shirts on wooden hangers in a manufacturing studio",
    },
    {
      title: "Fashion Brands & Retailers",
      body: "Personalised storefronts, accurate forecasts and stock that lands where it will actually sell.",
      image: brandsImg,
      alt: "A bright fashion storefront with window displays and a bicycle parked outside",
    },
    {
      title: "Executives & Decision-Makers",
      body: "One view of product, customer and supply data, with the numbers that matter reported every week.",
      image: executivesImg,
      alt: "A team in a meeting room reviewing a board of colourful sticky notes",
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who do we work with?",
  titleLead: "Explore The Range Of",
  titleAccent: "Fashion Businesses We Support",
  body:
    "We excel in custom AI-powered fashion software development that drives innovation and efficiency. As a leading fashion app development company, we turn your ideas into products that ship, whether you are developing a new prototype or expanding your market reach.",
  rows: [
    {
      label: "Startups",
      body: "We collaborate with startups to bring new fashion app ideas to life. Our expertise guides you from initial market analysis and concept validation to developing MVPs and refining your app post-launch.",
    },
    {
      label: "Scale-ups",
      body: "As your fashion business grows, new opportunities and challenges arise. We help scale-ups use current technology to boost efficiency, simplify operations and improve market positioning.",
    },
    {
      label: "Small and medium-sized businesses",
      body: "Medium-sized fashion businesses often face outdated systems and the need for continuous updates. Our clothing design software solutions address these challenges, improving operational efficiency and competitiveness.",
    },
    {
      label: "Enterprises",
      body: "We partner with enterprises to deliver top-tier AI fashion development. Our expertise in apparel app development and AI models for fashion enhances efficiency and performance at scale.",
    },
  ],
};

export const testimonials = {
  eyebrow: "What do our clients say about us?",
  titleLead: "What Our Clients Say About Our",
  titleAccent: "AI Consulting Company",
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
        "Abdul Hannan and his team have been a trusted development partner for several months with their fully developed team and focus on AI. They helped us move forward and achieve our goal.",
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
    "Work we have shipped for fashion brands, from design tooling through to the storefront.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why choose us for your next big project?",
  titleLead: "Working With Us Is An",
  titleAccent: "Investment In Your Future",
  cards: [
    {
      icon: "Layers",
      title: "Integration Experts",
      body:
        "From initial design to deployment, we excel at integrating with any third-party application, system, API or database. Our fashion app development covers third-party and custom integration work to enhance user experience and boost conversions.",
    },
    {
      icon: "Target",
      title: "Dedicated To E-commerce",
      body:
        "Our team is entirely dedicated to e-commerce web development, partnering with global fashion businesses of all sizes and niches. This gives us deep industry insight, enabling expert consulting and proactive project development tailored to fashion.",
    },
    {
      icon: "ShieldCheck",
      title: "Direct Communication",
      body:
        "We ensure smooth interactions with clear, efficient processes. As a top fashion app development company, we provide a dedicated project manager to keep you updated and keep collaboration direct throughout your build.",
    },
  ],
  stats: [
    { value: "200+", label: "Projects Delivered" },
    { value: "5+", label: "Valuable Partnerships" },
    { value: "20+", label: "Countries Served" },
    { value: "25+", label: "Tech Experts" },
  ],
};

export const blogs = {
  eyebrow: "What can our expertise teach you?",
  title: "Our Blogs",
  body:
    "Using current AI models, we build efficient, reliable business systems that open new ground in innovation, automation and personalisation.",
  posts: [
    {
      title: "How To Grow Your Fashion Business In 2026",
      tag: "Strategy",
      image: blog1Img,
      alt: "A woman browsing a rail of clothes in a boutique",
    },
    {
      title: "Fashion App Development: A Complete Guide To Building AI-Powered Apps",
      tag: "Guide",
      image: blog2Img,
      alt: "A person in a white shirt tapping on a smartphone",
    },
    {
      title: "How AI In Fashion Retail Is Transforming The Shopping Experience",
      tag: "Retail",
      image: blog3Img,
      alt: "A shop assistant showing a customer a tablet at the counter",
    },
  ],
};

export const faqs = [
  {
    q: "What is AI fashion app development?",
    a: "It is the design and build of fashion software where AI does the heavy lifting: size recommendation, virtual try-on, demand forecasting, trend detection and personalised merchandising. We build the app, the models behind it and the data pipelines that keep those models accurate as your catalogue changes.",
  },
  {
    q: "How long does it take to develop a custom AI fashion app?",
    a: "A scoped MVP with one AI capability, such as a recommendation engine or virtual fitting room, typically takes eight to twelve weeks. A full platform with forecasting, e-commerce and analytics runs four to nine months, delivered in weekly increments you can use from the first sprint.",
  },
  {
    q: "Can you integrate AI into my existing fashion app?",
    a: "Yes, and that is most of our fashion work. We build against your existing storefront, PIM, ERP and payment stack rather than asking you to migrate. Where an API does not exist we add a thin service layer so the legacy system is never touched directly.",
  },
  {
    q: "Why should I choose Axiomra for AI fashion app development?",
    a: "Because we have shipped in fashion before and we are judged on your metric. Returns rate, sell-through, conversion or margin: we agree the number before we start and report against it every week. Model accuracy is our problem, not your KPI.",
  },
  {
    q: "How much does a fashion app cost?",
    a: "It depends on the platforms, the AI capabilities and the state of your product data. A scoped pilot is the fastest route to a real number. Book a free session and we will size it honestly, including what we would not build.",
  },
  {
    q: "Do you handle sustainability and supply-chain traceability?",
    a: "Yes. We build traceability layers that track materials and suppliers from source to shelf, flag greenwashing risk and produce the audit trail regulators and conscious customers increasingly expect.",
  },
];

export const finalCta = {
  title: "Steer Your Business Towards Success With The Trustworthy Partner",
  subtitle: "Start your journey to iconic success right here.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
