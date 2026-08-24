/** Every string and image the Computer Vision detail page renders lives here. */
import heroFaceMesh from "../assets/opencv/hero-face-mesh.webp";
import heroDetectionConsole from "../assets/opencv/hero-detection-console.webp";
import heroVisionGraph from "../assets/opencv/hero-vision-graph.webp";
import heroRoboticHand from "../assets/opencv/hero-robotic-hand.jpg";
import challengesMonitoring from "../assets/opencv/cv-challenges-monitoring.jpg";
import caseStudyAnalytics from "../assets/opencv/cv-case-study-analytics.jpg";
import industriesHumanoid from "../assets/opencv/cv-industries-humanoid.jpg";
import modelPipeline from "../assets/opencv/cv-model-pipeline.png";

/** Route this page owns, imported by App.jsx and the navbar so they can't drift. */
export const COMPUTER_VISION_SLUG = "computer-vision-services";

/** Listing-card image, re-exported so `servicesData` never reaches into assets twice. */
export const computerVisionListingImage = heroFaceMesh;

/* Hero */

export const hero = {
  eyebrow: "Computer Vision Development Company",
  titleLead: "Custom Computer Vision",
  titleAccent: "Development Services",
  titleTail: "That Deliver Real ROI",
  body:
    "Most businesses sit on a goldmine of visual data and get nothing from it. Axiomra builds production-ready computer vision systems that turn your images, video, and camera feeds into decisions, savings, and growth, deployed across manufacturing, healthcare, retail, and logistics.",
  ctaText: "Request A Free Consultation",
  secondaryCtaText: "See What We Build",
  proof: { rating: "4.8", reviews: "300+ companies", source: "Reviewed on Clutch" },
  stats: [
    { value: "50+", label: "Vision systems shipped" },
    { value: "99.2%", label: "Median model accuracy" },
    { value: "30 ms", label: "Real-time inference" },
  ],
  /** The four textures the WebGL panel ring maps onto its planes. */
  panels: [
    {
      src: heroFaceMesh,
      alt: "Wireframe portrait with a glowing facial landmark mesh mapped over it",
      label: "Face landmarks",
      confidence: "0.981",
    },
    {
      src: heroDetectionConsole,
      alt: "Control-room console tracking live detections across a monitoring grid",
      label: "Object tracking",
      confidence: "0.964",
    },
    {
      src: heroVisionGraph,
      alt: "Linked spheres of light representing a multi-camera vision graph",
      label: "Scene graph",
      confidence: "0.947",
    },
    {
      src: heroRoboticHand,
      alt: "Robotic hand reaching into a field of blue bokeh light",
      label: "Robotic guidance",
      confidence: "0.972",
    },
  ],
};

/* Framework / tooling bar */

export const frameworkBar = {
  label: "Built on the tooling your engineers already trust",
  items: [
    "OpenCV",
    "PyTorch",
    "TensorFlow",
    "YOLO",
    "Detectron2",
    "ONNX Runtime",
    "NVIDIA TensorRT",
    "MediaPipe",
  ],
};

/* Challenges */

export const challenges = {
  eyebrow: "Why visual data goes to waste",
  titleAccent: "Turn Data Into Actionable Insights",
  titleLead: "With Computer Vision",
  intro:
    "Businesses create a huge amount of visual data every day (camera feeds, scanned documents, inspection photos, product imagery) and most of it is reviewed by a person or never reviewed at all.",
  listTitle: "The biggest problems we get called in to fix:",
  problems: [
    {
      title: "Manual visual review",
      body: "People eyeballing frames, photos, or scans: slow, expensive, and inconsistent between shifts.",
    },
    {
      title: "No real-time visibility",
      body: "You find out about the defect, the intrusion, or the queue an hour after it mattered.",
    },
    {
      title: "Fraud and spoofing slip through",
      body: "Identity checks and claims review that a printed photo or a replayed video can defeat.",
    },
    {
      title: "Weak in-store and on-site experience",
      body: "No usable data on footfall, dwell time, shelf gaps, or safety compliance.",
    },
    {
      title: "Legacy systems that cannot scale",
      body: "A model that worked on ten cameras falls over at two hundred, or costs more than it saves.",
    },
  ],
  outro:
    "Axiomra solves these with computer vision systems built around your workflow, from fraud detection in fintech and diagnostic support in healthcare, to real-time defect detection on the line and object recognition across logistics. The result is lower cost per review, faster decisions, and an audit trail you can defend.",
  ctaText: "Request A Free Consultation",
  image: challengesMonitoring,
  imageAlt:
    "Dark monitoring room with terminals streaming live camera analysis output",
  metrics: [
    { value: "70%", label: "Less manual review time" },
    { value: "24/7", label: "Continuous monitoring" },
    { value: "12+", label: "Industries deployed in" },
  ],
};

/* Service layers (numbered accordion) */

export const services = {
  eyebrow: "What computer vision services do we offer?",
  titleAccent: "End To End",
  titleLead: "Computer Vision Development Services",
  subtitle:
    "From consulting to deployment, we cover every stage of your computer vision project. Each service is built around your business problem, not a generic template.",
  items: [
    {
      id: "computer-vision-consulting",
      title: "Computer Vision Consulting",
      body:
        "Not sure where to start? Our consultants review your business goals, existing data, and technical setup. You get a clear plan that tells you what to build, how long it will take, and what it will cost, plus which use cases are worth doing first, whether your data is ready, and which technology fits your budget and timeline. No guesswork, no overselling.",
      deliverables: ["Use-case scoring", "Data readiness audit", "Build vs. buy call", "Costed roadmap"],
    },
    {
      id: "custom-vision-software",
      title: "Custom Computer Vision Software Development",
      body:
        "End-to-end builds: data pipeline, model, inference service, and the UI your team actually works in. We write production code: versioned, tested, containerised, and handed over with the repo, not a notebook.",
      deliverables: ["Training pipelines", "Inference APIs", "Operator dashboards", "Edge + cloud builds"],
    },
    {
      id: "model-design-optimization",
      title: "Computer Vision Model Design And Optimization",
      body:
        "Architecture selection, transfer learning, and hard-negative mining to get accuracy up, then quantisation, pruning, and TensorRT/ONNX conversion to get latency and GPU cost down without losing the accuracy you just paid for.",
      deliverables: ["Architecture selection", "Quantisation & pruning", "Latency budgeting", "Accuracy regression suites"],
    },
    {
      id: "system-integration",
      title: "Computer Vision System Integration",
      body:
        "The model is the easy part. We wire it into your cameras, PLCs, PACS, WMS, ERP, or CRM so detections become tickets, alerts, and records inside the systems your team already uses.",
      deliverables: ["Camera & RTSP ingest", "ERP/CRM/PACS hooks", "Event streaming", "Alerting & escalation"],
    },
    {
      id: "proof-of-concept",
      title: "Computer Vision Proof Of Concept (PoC)",
      body:
        "A time-boxed build on your own data that answers one question honestly: is this technically possible at the accuracy your business needs? You get the numbers, the failure cases, and a straight recommendation, including when the answer is no.",
      deliverables: ["4-6 week timebox", "Your data, your metrics", "Documented failure modes", "Go / no-go report"],
    },
    {
      id: "vision-data-services",
      title: "Computer Vision Data Services",
      body:
        "Collection, cleaning, annotation, and augmentation, plus synthetic data generation when real-world samples are scarce, expensive, or legally restricted. Labelled to a written spec with QA sampling on every batch.",
      deliverables: ["Annotation at scale", "Synthetic data generation", "Label QA sampling", "Dataset versioning"],
    },
  ],
};

/* Capability rows (motif-driven, no photography) */

export const expertise = {
  eyebrow: "Our computer vision expertise",
  titleAccent: "Enhance Business Efficiency With Our",
  titleLead: "Computer Vision Expertise",
  subtitle:
    "Each capability below is a standalone system we have delivered in production. Every diagram is a live wireframe of what the model actually outputs: boxes, meshes, keypoints, masks, and text regions.",
  items: [
    {
      id: "object-detection",
      motif: "boxes",
      title: "Object Detection",
      body:
        "Identify, locate, and track objects in images and video streams in real time. We build detection systems for quality control, security monitoring, inventory management, and logistics automation.",
      bullets: [
        "Real-time object detection and classification",
        "Bounding box annotation and labeling",
        "Quality inspection and defect detection",
        "Security threat analysis",
        "Livestock and asset counting",
      ],
    },
    {
      id: "facial-recognition",
      motif: "mesh",
      title: "Facial Recognition",
      body:
        "Secure facial recognition for identity verification, access control, and customer analytics. Our systems hold accuracy across lighting conditions and scale to millions of faces.",
      bullets: [
        "Face matching and verification",
        "Biometric identification",
        "Liveness detection (anti-spoofing)",
        "Know Your Customer (KYC) compliance",
        "Real-time facial recognition",
        "Facial emotion detection",
      ],
    },
    {
      id: "pose-estimation",
      motif: "skeleton",
      title: "Pose Estimation",
      body:
        "Detect body positions and movement with high accuracy, used in healthcare monitoring, sports analytics, gaming, and workplace safety compliance.",
      bullets: [
        "2D and 3D pose estimation",
        "Gesture recognition",
        "Head pose estimation",
        "Body landmark tracking",
        "Single and multi-view estimation",
        "Skeleton keypoint mapping",
      ],
    },
    {
      id: "image-analytics",
      motif: "segments",
      title: "Image Analytics",
      body:
        "We segment images at the pixel level to support medical imaging, autonomous systems, and industrial inspection. Our models separate objects, backgrounds, and regions with precision.",
      bullets: [
        "Semantic segmentation",
        "Panoptic segmentation",
        "Image enhancement",
        "Real-time object tracking",
        "Medical image analytics",
      ],
    },
    {
      id: "video-analytics",
      motif: "timeline",
      title: "Video Analytics",
      body:
        "Turn raw footage into structured business intelligence. Our video analytics monitor behaviour, detect anomalies, and automate reporting across retail, logistics, and security environments.",
      bullets: [
        "Queue management and counting",
        "Automatic licence plate recognition",
        "Scene and behaviour detection",
        "Forensic search across archives",
        "Crowd density detection",
      ],
    },
    {
      id: "ocr",
      motif: "text",
      title: "Optical Character Recognition",
      body:
        "Extract text from images, scanned documents, and video frames with high accuracy. We fine-tune deep learning models on your domain data for results off-the-shelf OCR tools cannot reach.",
      bullets: [
        "OCR clean-up services",
        "Document scanning and digitisation",
        "Information retrieval from complex files",
        "OCR conversion services",
        "Microfiche scanning and archival",
      ],
    },
    {
      id: "gan-image-generation",
      motif: "noise",
      title: "GAN-Based Image Generation",
      body:
        "We use generative adversarial networks to create synthetic training data, enhance image quality, and generate visual content at scale, especially useful when real-world data is limited, expensive, or restricted.",
      bullets: [
        "Synthetic data generation for training",
        "Style transfer and visual simulation",
        "Image super-resolution and enhancement",
        "Data augmentation for vision pipelines",
      ],
    },
  ],
};

/* Case studies */

export const caseStudies = {
  eyebrow: "Real projects. Real results.",
  titleLead: "Showcasing Our",
  titleAccent: "Computer Vision Development Projects",
  subtitle:
    "Here are computer vision solutions we have built for real clients. Each project started with a specific business problem and ended with a measurable outcome.",
  image: caseStudyAnalytics,
  imageAlt:
    "Analyst workstation showing a live vision analytics dashboard in a dark room",
  items: [
    {
      name: "Voltox",
      tagline: "AI-Powered KYC And Identity Verification",
      problem:
        "Voltox needed to replace slow, manual identity verification with a system that could authenticate users by face in real time, support passwordless login, and stop fraud at checkout.",
      solution:
        "We built a full computer vision stack with facial recognition, liveness detection, KYC registration, and passwordless authentication. The system encrypts user credentials and flags spoofing attempts in real time.",
      results: [
        { value: "99.9%", label: "Identity verification accuracy" },
        { value: "70%", label: "Of onboarding automated" },
        { value: "30%", label: "Registration time reduced" },
      ],
    },
    {
      name: "Northline Foods",
      tagline: "Inline Defect Detection On A Packaging Line",
      problem:
        "Manual spot-checks caught defects after a full pallet had already been wrapped, so every miss meant scrapping or reworking an entire batch downstream.",
      solution:
        "Edge inference on four line cameras at 30 ms per frame, wired straight into the PLC so a reject arm fires within the same cycle. Operators get a dashboard with a rolling defect Pareto by shift.",
      results: [
        { value: "94%", label: "Of defects caught inline" },
        { value: "38%", label: "Less scrap and rework" },
        { value: "2 wk", label: "To payback on hardware" },
      ],
    },
    {
      name: "Meridian Health",
      tagline: "Radiology Triage Support",
      problem:
        "Urgent findings sat in a first-in-first-out reading queue, so critical scans waited behind routine ones and turnaround was unpredictable.",
      solution:
        "A segmentation and classification model scores every incoming study and reorders the worklist, with every prediction shown alongside the region that drove it. Radiologists stay the decision-maker; the model only reorders the queue.",
      results: [
        { value: "43%", label: "Faster urgent turnaround" },
        { value: "0", label: "Autonomous diagnoses made" },
        { value: "HIPAA", label: "Compliant deployment" },
      ],
    },
  ],
};

/* Industries */

export const industries = {
  eyebrow: "What industries do we specialize in?",
  titleAccent: "Where We Have Deployed",
  titleLead: "Computer Vision Software",
  subtitle:
    "We have built and deployed computer vision systems across 12+ industries. Each solution is built around the specific workflows, data types, and compliance requirements of that industry.",
  image: industriesHumanoid,
  imageAlt:
    "Humanoid robot standing in a bright modern conference room",
  imageCaption:
    "Same models, different rules, and the rules are where vision projects fail.",
  items: [
    {
      name: "Healthcare",
      body:
        "Support clinical teams, reduce diagnostic errors, and automate time-consuming manual reviews.",
      bullets: [
        "Medical image analysis and diagnostic support (X-ray, MRI, CT)",
        "Surgical assistance and real-time guidance",
        "Patient monitoring through video and wearable feeds",
        "Pathology slide analysis and anomaly detection",
        "Hospital safety compliance (PPE detection, fall detection)",
        "Chronic disease progression tracking through imaging",
      ],
      note: "HIPAA-compliant deployments available for every healthcare build.",
    },
    {
      name: "Retail And E-Commerce",
      body:
        "Understand what happens on the shop floor and in the catalogue, without adding headcount.",
      bullets: [
        "Footfall, dwell time, and heat-map analytics",
        "Shelf-gap and planogram compliance",
        "Checkout-free and self-checkout loss prevention",
        "Visual search and automatic catalogue tagging",
        "Try-on and virtual fitting experiences",
      ],
    },
    {
      name: "Manufacturing",
      body:
        "Catch defects in the same cycle they happen, not after the pallet is wrapped.",
      bullets: [
        "Inline surface and assembly defect detection",
        "Dimensional and tolerance verification",
        "Worker safety and PPE compliance monitoring",
        "Predictive maintenance from thermal and visual feeds",
        "Automated inventory and asset counting",
      ],
    },
    {
      name: "Finance And Fintech",
      body:
        "Verify identity and process documents without a manual review queue.",
      bullets: [
        "KYC onboarding with liveness detection",
        "Document forgery and tamper detection",
        "Cheque and invoice data extraction",
        "Branch and ATM security analytics",
        "Claim evidence review automation",
      ],
    },
    {
      name: "Transportation And Logistics",
      body:
        "Track what moves through your yard, dock, and fleet without manual scanning.",
      bullets: [
        "Automatic licence plate and container ID recognition",
        "Load and pallet condition inspection",
        "Yard and dock occupancy analytics",
        "Driver attention and fatigue monitoring",
        "Route and hazard scene understanding",
      ],
    },
    {
      name: "Real Estate And Construction",
      body:
        "Measure progress and enforce safety from the footage you already capture.",
      bullets: [
        "Site progress tracking from drone and fixed cameras",
        "PPE and exclusion-zone safety compliance",
        "Automated property imagery tagging",
        "Structural defect and crack detection",
        "Material stock counting on site",
      ],
    },
  ],
};

/* Technology stack */

export const stack = {
  eyebrow: "Which technologies do we use?",
  titleAccent: "Technologies We Use",
  titleLead: "For Computer Vision Development",
  subtitle:
    "Proven, production-tested tools across every layer of our computer vision process. Here is what we use and why.",
  image: modelPipeline,
  imageAlt:
    "Illustration of a layered neural network pipeline rendered as translucent panels",
  groups: [
    {
      name: "Core Frameworks And Libraries",
      why: "The layer where accuracy is won or lost. We stay on mainstream, well-maintained frameworks so your system is still supportable in three years.",
      items: ["OpenCV", "PyTorch", "TensorFlow", "Keras", "scikit-image", "MediaPipe", "Albumentations", "NumPy"],
    },
    {
      name: "Model Architectures",
      why: "Chosen per problem and latency budget, not per fashion. Every choice is benchmarked on your data before it ships.",
      items: ["YOLOv8", "Detectron2", "ResNet-50", "EfficientNet", "InceptionV3", "Segment Anything", "U-Net", "Vision Transformers"],
    },
    {
      name: "Serving And Optimization",
      why: "Where GPU bills are decided. Quantisation and graph optimisation routinely cut inference cost by half.",
      items: ["ONNX Runtime", "NVIDIA TensorRT", "Triton Inference Server", "TorchServe", "OpenVINO", "CoreML", "DeepStream"],
    },
    {
      name: "Data And MLOps",
      why: "Reproducibility is what separates a demo from a system you can retrain next quarter.",
      items: ["MLflow", "DVC", "Label Studio", "CVAT", "Weights & Biases", "Airflow", "Docker", "Kubernetes"],
    },
    {
      name: "Edge And Cloud",
      why: "Placement follows bandwidth and privacy, not preference. Frames that cannot leave the site get inferred on the site.",
      items: ["NVIDIA Jetson", "AWS Panorama", "Azure IoT Edge", "Google Vertex AI", "AWS SageMaker", "Raspberry Pi + Coral"],
    },
  ],
};

/* Process */

export const process = {
  eyebrow: "What is our process for computer vision development?",
  titleLead: "Our Process For Building",
  titleAccent: "Computer Vision Software",
  subtitle:
    "A structured 8-step process that takes your project from the first conversation to a live, production-ready system. Every step has clear deliverables, so you always know what is happening and what comes next.",
  ctaText: "Contact Us Now",
  steps: [
    {
      title: "Discovery And Use-Case Definition",
      body:
        "We start with your business problem, not the technology. We define what a correct prediction means, what an acceptable error rate looks like, and what the system must do when it is unsure.",
    },
    {
      title: "Feasibility And Success Metrics",
      body:
        "We agree the accuracy, latency, and cost targets in writing before any model is trained, so success is measurable and nobody moves the goalposts later.",
    },
    {
      title: "Data Audit",
      body:
        "We look at what visual data you already have: volume, quality, class balance, lighting conditions, and edge cases. You get an honest report on whether it is enough.",
    },
    {
      title: "Data Collection And Preparation",
      body:
        "Good models need good data. We collect, clean, label, and structure your visual data for training. Where you do not have enough, we use synthetic generation and augmentation to fill the gaps. You get a cleaned and labelled dataset, a data pipeline, and a data quality report.",
    },
    {
      title: "Model Development And Training",
      body:
        "Architecture selection, transfer learning, and iterative training runs. Every experiment tracked, every result reproducible from the repo.",
    },
    {
      title: "Evaluation And Hardening",
      body:
        "We test against held-out data and deliberately hostile cases: bad lighting, occlusion, motion blur, spoofing attempts. Failure modes get documented, not hidden.",
    },
    {
      title: "Integration And Deployment",
      body:
        "We deploy to edge, cloud, or both, wire the system into your existing tools, and set up monitoring so drift shows up on a dashboard rather than in a complaint.",
    },
    {
      title: "Monitoring, Retraining, And Support",
      body:
        "Vision models decay as cameras, lighting, and products change. We monitor accuracy in production and retrain on a schedule, with 60 days of free support after launch.",
    },
  ],
};

/* Outcomes */

export const outcomes = {
  eyebrow: "What you can optimize with computer vision",
  titleAccent: "What You Gain From Our",
  titleLead: "Advanced Computer Vision Development Services",
  items: [
    {
      title: "Scalability",
      body:
        "Deploy computer vision across multiple sites and hundreds of devices without a proportional increase in labour cost.",
    },
    {
      title: "Cost Reduction",
      body:
        "Automate repetitive visual tasks to cut manual effort and lower operational expenses over time.",
    },
    {
      title: "Automation Of Visual Tasks",
      body:
        "Streamline processes like manufacturing quality control and inventory sorting, minimising errors and accelerating results.",
    },
    {
      title: "Enhanced Accuracy",
      body:
        "In applications like medical image analysis, computer vision identifies anomalies with greater consistency than human observers sustain across a full shift.",
    },
  ],
};

/* Why us */

export const whyUs = {
  eyebrow: "Why choose us?",
  titleAccent: "What Sets Us Apart From",
  titleLead: "Other Computer Vision Companies",
  subtitle:
    "There are a lot of computer vision companies out there. Here is why businesses choose Axiomra and stay with us after the first project.",
  ctaText: "Request A Free Consultation",
  stats: [
    { value: "300+", label: "Business apps developed" },
    { value: "20+", label: "Countries served" },
    { value: "7+", label: "Business partnerships" },
    { value: "25+", label: "Team of experts" },
  ],
  reasons: [
    {
      title: "We Build For Production, Not Just Demos",
      body:
        "A lot of AI vendors deliver a proof of concept and disappear. We build systems that run in live environments, handle real data volumes, and stay accurate over time. Every solution we deliver is tested, integrated, and production-ready before handover.",
    },
    {
      title: "End-To-End Computer Vision Development",
      body:
        "We handle the full lifecycle in-house: strategy, data preparation, model training, UI development, system integration, deployment, and ongoing maintenance. You work with one team from start to finish, no handoff gaps, no finger-pointing when something needs fixing.",
    },
    {
      title: "60 Days Of Free Tech Support After Launch",
      body:
        "After your system goes live, our team stays available for 60 days at no extra cost. We fix issues, answer questions, and make sure your team is confident using the system. Most vendors walk away at deployment. We do not.",
    },
    {
      title: "Team Coaching And Knowledge Transfer",
      body:
        "We do not hand over a black box. After deployment, we run coaching sessions on how the system works, how to interpret outputs, and how to flag issues early. Your team leaves the engagement self-sufficient.",
    },
    {
      title: "Transparent Communication Throughout",
      body:
        "You get full visibility into every stage of your project. From the first data audit to the final deployment, you can see what our team is working on, what decisions are being made, and what results we are tracking. No black boxes, no surprises, no scope creep without your approval.",
    },
    {
      title: "Solutions Built Around Your Business Goals",
      body:
        "We start every project by understanding what success looks like for your business, not just what the model needs to achieve technically. Every decision ties back to your operational goals, reducing defect rates, cutting manual review time, or improving customer experience.",
    },
  ],
};

/* FAQ */

export const faqs = [
  {
    q: "What are computer vision services?",
    a: "Computer vision services cover everything needed to make software understand images and video: consulting on the right use case, collecting and labelling visual data, training and optimising models, integrating them with your existing systems, and running them in production. In practice it means turning camera feeds, scans, and photos into decisions your business can act on automatically.",
  },
  {
    q: "How much does computer vision software development cost?",
    a: "A scoped proof of concept on your own data typically runs 4-6 weeks. A full production system depends on camera count, accuracy target, edge versus cloud deployment, and how much labelled data already exists. We give a costed range after the data audit rather than a headline number before it. Anyone quoting you a fixed price without seeing your data is guessing.",
  },
  {
    q: "How long does it take to build a computer vision solution?",
    a: "A PoC is usually 4-6 weeks. Most production deployments land in 3-5 months, with data preparation being the step that varies most. If you already have clean labelled data and fixed camera positions, it moves considerably faster.",
  },
  {
    q: "How much data do I need to train a computer vision model?",
    a: "It depends on how visually distinct your classes are. With transfer learning, a few hundred well-labelled examples per class is often enough to get a usable baseline; subtle defect detection can need thousands. Where real samples are scarce, we use synthetic generation and augmentation to fill the gap, and we tell you honestly in the data audit if what you have is not enough.",
  },
  {
    q: "Can you integrate computer vision with our existing systems?",
    a: "Yes. That is usually the larger half of the work. We integrate with RTSP and IP camera fleets, PLCs on the factory floor, PACS in healthcare, WMS in logistics, and your ERP or CRM, so detections turn into tickets, alerts, and records inside the tools your team already uses.",
  },
  {
    q: "Does computer vision work in poor lighting or with low-quality cameras?",
    a: "Often, but it has limits, and we tell you where they are up front. We test against hostile conditions (low light, glare, occlusion, motion blur), during the evaluation stage and document the failure modes. Sometimes the right answer is a camera or lighting change rather than a bigger model, and we will say so.",
  },
  {
    q: "How do you handle privacy and compliance for facial recognition?",
    a: "We design for the regulation that applies to you: HIPAA for healthcare, GDPR for EU subjects, and sector rules for finance. That typically means on-premise or edge inference so frames never leave your network, template-only storage instead of raw imagery, configurable retention, and a full audit trail of every match.",
  },
  {
    q: "What happens to accuracy after the system goes live?",
    a: "Vision models drift as cameras age, lighting changes, and products get redesigned. We monitor live accuracy against a sampled ground truth, alert on drift, and retrain on a schedule agreed with you. Every launch includes 60 days of free support while the system settles.",
  },
];
