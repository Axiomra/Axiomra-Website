import aiDevelopment from "../assets/services/ai-development-services.jpg";
import generativeAi from "../assets/services/generative-ai-services.jpg";
import businessIntelligence from "../assets/services/business-intelligence-services.jpg";
import processAutomation from "../assets/services/process-automation-services.jpg";
import computerVision from "../assets/services/computer-vision-services.jpg";
import machineLearning from "../assets/services/machine-learning-services.jpg";
import nlp from "../assets/services/natural-language-processing-services.jpg";
import gptIntegration from "../assets/services/gpt-integration-services.jpg";
import predictiveAnalytics from "../assets/services/predictive-analytics-services.jpg";
import deepLearning from "../assets/services/deep-learning-services.jpg";
import dataScience from "../assets/services/data-science-analytics-services.jpg";
import chatbotDevelopment from "../assets/services/chatbot-development-services.jpg";
import dataExtraction from "../assets/services/data-extraction-services.jpg";
import audioAnalysis from "../assets/services/audio-analysis-services.jpg";
import infoTechnology from "../assets/services/information-technology-services.jpg";
import customSoftware from "../assets/services/custom-software-development-services.jpg";
import webAppDevelopment from "../assets/services/web-app-development-services.jpg";
import mobileAppDevelopment from "../assets/services/mobile-app-development-services.jpg";
import uiUxDesign from "../assets/services/ui-ux-design-services.jpg";
import recommendationSystems from "../assets/services/recommendation-systems-services.jpg";
import webScraping from "../assets/services/web-scraping-services.jpg";
import botAutomation from "../assets/services/bot-automation-services.jpg";

// Base path every individual service detail page will eventually live under,
// e.g. /ai-services-and-solutions/ai-development-services/
export const SERVICES_BASE_PATH = "/ai-services-and-solutions";

const services = [
  {
    slug: "ai-development-services",
    title: "Artificial Intelligence",
    image: aiDevelopment,
    imageAlt: "Glowing AI core representing Axiomra's artificial intelligence services",
    description:
      "We design and ship enterprise-grade AI and machine learning systems built for real business problems. As a hands-on AI partner, we create scalable, secure applications that automate processes, cut operating costs, and speed up decision-making — so your team can focus on growth instead of busywork.",
    links: ["AI Software Development", "AI Consultation", "AI Agents", "AI Product Development", "AI Integration", "AI Automation", "AI LogOps", "AI Copilots"],
  },
  {
    slug: "generative-ai-services",
    title: "Generative AI",
    image: generativeAi,
    imageAlt: "Neural network visualization representing generative AI capabilities",
    description:
      "Our generative AI services help teams create faster and stay ahead of the curve. From automated content generation to personalized customer experiences and design optimization, we combine deep technical expertise with your industry context to build solutions that boost creativity and measurably improve output.",
    links: ["Generative AI Consulting", "Generative AI Integration", "Generative AI Model Development", "Generative AI Development"],
  },
  {
    slug: "business-intelligence-services",
    title: "Business Intelligence",
    image: businessIntelligence,
    imageAlt: "Data network visualization representing business intelligence dashboards",
    description:
      "Axiomra turns scattered, complex data into clear, actionable insight. Using AI-driven analytics, we build predictive models, interactive dashboards, and forecasting tools that help leadership teams make confident, informed calls — so you can spot risk and opportunity before your competitors do.",
    links: ["BI Consulting", "Enterprise Business Intelligence", "BI Support & Maintenance"],
  },
  {
    slug: "process-automation-services",
    title: "Process Automation",
    image: processAutomation,
    imageAlt: "Automated workflow interface representing process automation services",
    description:
      "We use artificial intelligence and robotic process automation (RPA) to remove repetitive manual work and streamline entire workflows. Our automation platforms integrate cleanly with your existing systems — data entry, invoice processing, customer support, and supply chain — cutting errors while scaling output.",
    links: ["Process Automation Consulting", "Intelligent Automation Solutions", "RPA", "RPA Software Development", "Workflow Automation Consulting"],
  },
  {
    slug: "computer-vision-services",
    title: "Computer Vision",
    image: computerVision,
    imageAlt: "Facial recognition interface representing computer vision technology",
    description:
      "Our computer vision team uses deep learning, neural networks, and advanced image recognition to make sense of visual data with precision. From security monitoring and healthcare imaging to manufacturing defect detection and autonomous navigation, we deliver models that improve accuracy, safety, and performance.",
    links: ["Object Detection", "Facial Recognition", "Image Analytics", "Video Analytics", "Optical Character Recognition"],
  },
  {
    slug: "machine-learning-services",
    title: "Machine Learning",
    image: machineLearning,
    imageAlt: "3D AI model visualization representing machine learning services",
    description:
      "We design machine learning solutions tailored to your business needs, covering supervised and unsupervised learning, predictive modeling, and real-time analytics. Whether it's building custom ML pipelines, fine-tuning pretrained models, or deploying scalable APIs, we help you forecast demand and personalize customer experience.",
    links: ["Machine Learning Strategy & Consulting", "ML Model Development", "MLOps Consulting Services", "Generative Models"],
  },
  {
    slug: "natural-language-processing-services",
    title: "Natural Language Processing",
    image: nlp,
    imageAlt: "AI-powered circuit board representing natural language processing",
    description:
      "We build advanced natural language processing applications that go well beyond basic text analysis. Using large language models, transformers, and modern NLP techniques, our AI solutions deliver accurate sentiment analysis, entity recognition, and conversational intelligence for real-world business use cases.",
    links: ["Sentiment Analysis", "Text Summarization", "Language Translation", "Text Classification", "Speech Recognition", "Named Entity Recognition"],
  },
  {
    slug: "gpt-integration-services",
    title: "GPT Integration",
    image: gptIntegration,
    imageAlt: "Chat interface visualization representing GPT integration services",
    description:
      "We integrate advanced LLMs — GPT-4o, Gemini, and Llama — directly into your applications to boost customer experience and operational efficiency. Our GPT integration services cover secure API connections, fine-tuned prompts, and scalable deployment, keeping your business ahead in the era of generative AI.",
    links: ["Prompt Engineering", "Custom Software Solutions with ChatGPT API", "Seamless Integration with ChatGPT API", "Voice Assistant Integration", "ChatGPT Advisory Services"],
  },
  {
    slug: "predictive-analytics-services",
    title: "Predictive Analytics",
    image: predictiveAnalytics,
    imageAlt: "Data visualization on tablet representing predictive analytics",
    description:
      "Our predictive analytics services use advanced AI and machine learning models to forecast trends, detect anomalies, and optimize business strategy. By analyzing historical and real-time data, we help decision-makers anticipate demand, reduce risk, and make proactive, informed choices that strengthen long-term growth.",
    links: ["Sales Forecasting", "Customer Retention", "Demand Forecasting", "Fraud & Anomaly Detection", "Recommender Systems"],
  },
  {
    slug: "deep-learning-services",
    title: "Deep Learning",
    image: deepLearning,
    imageAlt: "Person analyzing multiple data screens representing deep learning systems",
    description:
      "We deliver deep learning services that solve complex challenges through advanced neural networks and custom architectures. From computer vision and NLP to speech recognition and recommendation systems, our custom deep learning models are designed to maximize accuracy, performance, and efficiency across industries.",
    links: ["Video Analytics", "Image Classification", "Data Labelling", "Model Deployment and Support", "Speech Recognition"],
  },
  {
    slug: "data-science-analytics-services",
    title: "Data Science & Analytics",
    image: dataScience,
    imageAlt: "Glowing circuit board representing data science and analytics infrastructure",
    description:
      "Our data science and analytics services help organizations turn raw data into actionable insight. From data engineering and model development to interactive dashboards and visualization, we enable data-driven decisions that improve user experience, optimize operations, and boost measurable business outcomes.",
    links: ["Data Ingestion and Cleaning", "Predictive Analytics", "Data Visualization", "Data Analytics Consulting"],
  },
  {
    slug: "chatbot-development-services",
    title: "Chatbot Development",
    image: chatbotDevelopment,
    imageAlt: "Futuristic robot in front of monitoring screens representing chatbot development",
    description:
      "We develop intelligent AI chatbots powered by conversational AI and natural language understanding. These personalized assistants provide 24/7 support, resolve inquiries instantly, and integrate seamlessly across web, mobile, and messaging platforms — enhancing customer engagement while freeing up your team for high-value tasks.",
    links: ["AI Chatbot Development Solutions", "Chatbot Design and Development", "Multi-language Chatbot Development", "Chatbot Integration", "NLP Chatbot Development"],
  },
  {
    slug: "data-extraction-services",
    title: "Data Extraction",
    image: dataExtraction,
    imageAlt: "Circuit board close-up representing automated data extraction pipelines",
    description:
      "Our data extraction services pull relevant, structured information from diverse sources — documents, websites, and databases. These pipelines handle large volumes of data efficiently, ensuring accuracy and speeding up retrieval so your team spends less time hunting for information and more time using it.",
    links: ["Email Data Extraction", "Website Data Extraction", "Data Extraction for AI and ML Models", "PDF Parsing and Extraction", "Document and Other File Extraction"],
  },
  {
    slug: "audio-analysis-services",
    title: "Audio Analysis",
    image: audioAnalysis,
    imageAlt: "Sound wave and microphone visualization representing audio analysis technology",
    description:
      "Our audio analysis services transform unstructured audio into actionable insight using AI and machine learning. From speech-to-text transcription and emotion detection to audio embeddings and voice biometrics, we help businesses unlock value from conversations, calls, and recordings with precision and scale.",
    links: ["Voice Tone Analysis", "Audio Recognition and Moderation", "Audio Classification", "Text-to-Audio Processing", "Virtual Assistants", "Sentiment Analysis"],
  },
  {
    slug: "information-technology-services",
    title: "Information Technology (IT)",
    image: infoTechnology,
    imageAlt: "Illuminated processor chip representing IT consulting services",
    description:
      "Axiomra provides IT consulting services that align technology with business goals. We design future-ready IT strategies powered by cloud, AI, and automation to digitize operations, optimize enterprise software, and enhance mobility — giving businesses a scalable, secure technology roadmap for long-term growth.",
    links: ["IT Consulting", "Cloud Transition and Architecture Strategy", "Digital Transformation Consulting", "Optimized Software Portfolio"],
  },
  {
    slug: "custom-software-development-services",
    title: "Custom Software Development",
    image: customSoftware,
    imageAlt: "Glowing software interface icon representing custom software development",
    description:
      "As a hands-on AI development partner, we build custom software solutions designed to fit your exact business requirements. From AI-powered applications to enterprise-grade platforms across mobile and web, we cover the full development lifecycle — ensuring reliability, scalability, and measurable business impact.",
    links: ["AI Software Development", "Software Development Consulting", "SaaS Application Development", "Web Application Development", "Mobile Application Development"],
  },
  {
    slug: "web-app-development-services",
    title: "Web App Development",
    image: webAppDevelopment,
    imageAlt: "High-performance processor representing scalable web application development",
    description:
      "Axiomra delivers robust web app development services tailored to your business objectives. Using modern frameworks, APIs, and cloud-native architectures, we create secure, high-performance applications that scale with your growth and deliver an exceptional user experience from day one.",
    links: ["Website Development", "Front-End Development", "Full-Stack Applications", "Back-End Development"],
  },
  {
    slug: "mobile-app-development-services",
    title: "Mobile App Development",
    image: mobileAppDevelopment,
    imageAlt: "Circular AI processor representing cross-platform mobile app development",
    description:
      "Our mobile app development services cover both enterprise and consumer applications, built on clean architecture and scalable backends. We design and deploy cross-platform, iOS, and Android apps that expand customer reach, improve enterprise mobility, and deliver seamless user experiences.",
    links: ["Hybrid App Development", "Android Application Development", "Hybrid Architecture", "App/Soft Design", "iPhone App Development"],
  },
  {
    slug: "ui-ux-design-services",
    title: "UI/UX Designing",
    image: uiUxDesign,
    imageAlt: "Bold typographic AI design representing UI/UX design services",
    description:
      "Our UI/UX design services focus on creating intuitive, user-friendly, and visually engaging digital products. Whether redesigning existing platforms or building new ones, we combine user research, wireframing, and prototyping to deliver interfaces that align with your brand identity, business goals, and customer expectations.",
    links: ["Graphic Design", "Website and App Design", "Product Prototyping", "Audit and Research", "UI/UX for Web & Mobile"],
  },
  {
    slug: "recommendation-systems-services",
    title: "Recommendation Systems",
    image: recommendationSystems,
    imageAlt: "AI tablet interface representing personalized recommendation systems",
    description:
      "No matter your industry — e-commerce, fintech, or beyond — we specialize in building customized AI recommendation engines powered by artificial intelligence and machine learning. Using collaborative filtering, neural networks, and matrix factorization, we deliver AI-powered solutions that boost engagement, increase conversions, and drive measurable revenue growth.",
    links: ["Content Recommendation", "Product Recommendation", "Collaborative Filtering", "Content-Based Filtering", "Hybrid Recommendations", "Visual Search"],
  },
  {
    slug: "web-scraping-services",
    title: "Web Scraping",
    image: webScraping,
    imageAlt: "Abstract data texture representing large-scale web scraping infrastructure",
    description:
      "Our web scraping services use advanced technologies to extract and analyze valuable data from across the web reliably and at scale. Our data engineers deploy robust scrapers to gather critical business and product insight, empowering informed decision-making, increasing revenue, and enhancing operational efficiency across industries.",
    links: ["Retail and Web Scraping", "Social Media Web Scraping", "E-Commerce Price & Product Data Scraping"],
  },
  {
    slug: "bot-automation-services",
    title: "Bot Automation",
    image: botAutomation,
    imageAlt: "Robotic hand holding a glowing AI symbol representing bot automation",
    description:
      "Automate repetitive tasks with our bot automation services. We build intelligent bots that enhance productivity and efficiency across various processes. Our tailored automation solutions simplify workflows, reduce manual effort, and save valuable time so your team can focus on higher-value work.",
    links: ["Data Management Bots", "Website Bots", "Accounts Payable Bots"],
  },
];

export default services;
