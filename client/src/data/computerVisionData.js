/** Every string and image the Computer Vision detail page renders lives here. */
import heroFaceMesh from "../assets/opencv/hero-face-mesh.webp";
import heroDetectionConsole from "../assets/opencv/hero-detection-console.webp";
import heroVisionGraph from "../assets/opencv/hero-vision-graph.webp";
import heroRoboticHand from "../assets/opencv/hero-robotic-hand.jpg";
import challengesMonitoring from "../assets/opencv/cv-challenges-monitoring.jpg";
import caseStudyAnalytics from "../assets/opencv/cv-case-study-analytics.jpg";
import modelPipeline from "../assets/opencv/cv-model-pipeline.png";

/* Per-service photography: one frame per engagement type, so the detail
   panel never renders against an empty right-hand column. */
import serviceConsulting from "../assets/opencv/cv-service-consulting.webp";
import serviceCustomSoftware from "../assets/opencv/cv-service-custom-software.webp";
import serviceModelOptimization from "../assets/opencv/cv-service-model-optimization.webp";
import serviceIntegration from "../assets/opencv/cv-service-integration.webp";
import servicePoc from "../assets/opencv/cv-service-poc.webp";
import serviceData from "../assets/opencv/cv-service-data.webp";

/* Per-industry photography: each tab carries its own scene rather than one
   shared stock frame behind every vertical. */
import industryHealthcare from "../assets/opencv/cv-industry-healthcare.webp";
import industryRetail from "../assets/opencv/cv-industry-retail.webp";
import industryManufacturing from "../assets/opencv/cv-industry-manufacturing.webp";
import industryFinance from "../assets/opencv/cv-industry-finance.webp";
import industryLogistics from "../assets/opencv/cv-industry-logistics.webp";
import industryConstruction from "../assets/opencv/cv-industry-construction.webp";

/* Per-capability photography: each expertise row gets a real scene under the
   wireframe motif, so the frame reads as a camera feed instead of a diagram. */
import capObjectDetection from "../assets/cv/cv-cap-object-detection.webp";
import capFacialRecognition from "../assets/cv/cv-cap-facial-recognition.webp";
import capPoseEstimation from "../assets/cv/cv-cap-pose-estimation.webp";
import capImageAnalytics from "../assets/cv/cv-cap-image-analytics.webp";
import capVideoAnalytics from "../assets/cv/cv-cap-video-analytics.webp";
import capOcr from "../assets/cv/cv-cap-ocr.webp";
import capGan from "../assets/cv/cv-cap-gan.webp";

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
      image: serviceConsulting,
      imageAlt:
        "Consultants reviewing charts and a roadmap on a whiteboard during a scoping workshop",
      title: "Computer Vision Consulting",
      body:
        "Not sure where to start? Our consultants review your business goals, existing data, and technical setup. You get a clear plan that tells you what to build, how long it will take, and what it will cost, plus which use cases are worth doing first, whether your data is ready, and which technology fits your budget and timeline. No guesswork, no overselling.",
      deliverables: ["Use-case scoring", "Data readiness audit", "Build vs. buy call", "Costed roadmap"],
    },
    {
      id: "custom-vision-software",
      image: serviceCustomSoftware,
      imageAlt:
        "Developer writing production code across two monitors in a darkened studio",
      title: "Custom Computer Vision Software Development",
      body:
        "End-to-end builds: data pipeline, model, inference service, and the UI your team actually works in. We write production code: versioned, tested, containerised, and handed over with the repo, not a notebook.",
      deliverables: ["Training pipelines", "Inference APIs", "Operator dashboards", "Edge + cloud builds"],
    },
    {
      id: "model-design-optimization",
      image: serviceModelOptimization,
      imageAlt:
        "Processor seated in its socket on a motherboard, lit by the rig it trains on",
      title: "Computer Vision Model Design And Optimization",
      body:
        "Architecture selection, transfer learning, and hard-negative mining to get accuracy up, then quantisation, pruning, and TensorRT/ONNX conversion to get latency and GPU cost down without losing the accuracy you just paid for.",
      deliverables: ["Architecture selection", "Quantisation & pruning", "Latency budgeting", "Accuracy regression suites"],
    },
    {
      id: "system-integration",
      image: serviceIntegration,
      imageAlt:
        "Operator watching a wall of live camera feeds inside a monitoring room",
      title: "Computer Vision System Integration",
      body:
        "The model is the easy part. We wire it into your cameras, PLCs, PACS, WMS, ERP, or CRM so detections become tickets, alerts, and records inside the systems your team already uses.",
      deliverables: ["Camera & RTSP ingest", "ERP/CRM/PACS hooks", "Event streaming", "Alerting & escalation"],
    },
    {
      id: "proof-of-concept",
      image: servicePoc,
      imageAlt:
        "Engineer testing a projected interface prototype on her own hand in the lab",
      title: "Computer Vision Proof Of Concept (PoC)",
      body:
        "A time-boxed build on your own data that answers one question honestly: is this technically possible at the accuracy your business needs? You get the numbers, the failure cases, and a straight recommendation, including when the answer is no.",
      deliverables: ["4-6 week timebox", "Your data, your metrics", "Documented failure modes", "Go / no-go report"],
    },
    {
      id: "vision-data-services",
      image: serviceData,
      imageAlt:
        "Annotator reviewing a contact sheet of candidate training images on screen",
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
      image: capObjectDetection,
      imageAlt: "Warehouse camera feed with detected items outlined by bounding boxes",
      title: "Object Detection",
      body:
        "Identify, locate, and track objects in images and video streams in real time, with a confidence score attached to every prediction. We build detection systems for quality control, security monitoring, inventory management, and logistics automation, tuned to the cameras and lighting you already have on site. Models are trained on your own footage rather than generic public datasets, so they learn the exact parts, packaging, and edge cases your operation deals with. Everything runs on the edge or in the cloud depending on the latency and bandwidth your environment allows.",
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
      image: capFacialRecognition,
      imageAlt: "Face captured by an access-control camera during identity verification",
      title: "Facial Recognition",
      body:
        "Secure facial recognition for identity verification, access control, and customer analytics, built to hold accuracy across lighting conditions, camera angles, masks, and ageing. Our matching pipelines scale from a single door reader to millions of enrolled faces without a drop in response time. Liveness checks sit in front of every match, so printed photos, screen replays, and deepfake attempts are rejected before they reach the database. Templates are encrypted and stored as irreversible vectors, which keeps deployments aligned with GDPR and regional biometric rules.",
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
      image: capPoseEstimation,
      imageAlt: "Person tracked by a camera while joint keypoints map their posture",
      title: "Pose Estimation",
      body:
        "Detect body position, joint angles, and movement over time with keypoint-level accuracy, from a single camera or a multi-view rig. The same models power patient mobility monitoring, physiotherapy progress tracking, sports biomechanics, gesture-driven interfaces, and workplace safety compliance. We track posture across frames rather than scoring isolated images, so the system can flag a fall, a repetitive strain risk, or a missed safety step as it happens. Output streams as structured coordinates your own analytics tools can read directly.",
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
      image: capImageAnalytics,
      imageAlt: "High-resolution scan being segmented region by region for inspection",
      title: "Image Analytics",
      body:
        "We segment images at the pixel level so every region in a frame is classified, not just boxed. That precision is what medical imaging, autonomous systems, satellite analysis, and industrial inspection need when the difference between a pass and a defect is a few hundred pixels. Our models separate overlapping objects, backgrounds, and fine boundaries, and hold up on low-contrast, noisy, or high-resolution source images. Results are delivered as masks, measurements, and area statistics that plug straight into reporting.",
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
      image: capVideoAnalytics,
      imageAlt: "Video wall reviewing movement and behaviour across multiple camera feeds",
      title: "Video Analytics",
      body:
        "Turn raw footage into structured business intelligence instead of hours nobody has time to review. Our video analytics monitor behaviour across frames, detect anomalies, count and classify movement, and automate reporting across retail, logistics, transport, and security environments. Because the system understands sequence, it can tell the difference between someone waiting and someone loitering, or a stopped vehicle and a blocked exit. Alerts, dashboards, and forensic search over archives come as part of the delivery, not as a separate product.",
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
      image: capOcr,
      imageAlt: "Scanned document being read line by line into structured fields",
      title: "Optical Character Recognition",
      body:
        "Extract text from photographs, scanned documents, handwritten forms, and video frames, then return it as structured, searchable data rather than a flat text dump. We fine-tune deep learning models on your own document types, fonts, and layouts, which is how we reach accuracy levels off-the-shelf OCR tools cannot get near on domain material. Tables, multi-column layouts, stamps, degraded scans, and multilingual pages are handled as first-class cases. The output maps to your fields, so downstream systems get values they can validate instead of paragraphs someone has to retype.",
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
      image: capGan,
      imageAlt: "Synthetic imagery generated to fill gaps in a vision training set",
      title: "GAN-Based Image Generation",
      body:
        "We use generative adversarial networks to create synthetic training data, enhance image quality, and generate visual content at scale. This matters most when real-world data is limited, expensive to capture, or legally restricted, such as rare manufacturing defects or patient imaging that cannot leave the hospital. Generated samples are balanced against your real distribution so the model learns the rare cases without drifting away from reality. The same techniques handle super-resolution, denoising, style transfer, and augmentation for pipelines that are starved of examples.",
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
  imageCaption:
    "Same models, different rules, and the rules are where vision projects fail.",
  items: [
    {
      name: "Healthcare",
      image: industryHealthcare,
      imageAlt:
        "Radiologist reading a set of scans across multiple diagnostic monitors",
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
      image: industryRetail,
      imageAlt:
        "Shoppers moving through a busy supermarket aisle stacked with product",
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
      image: industryManufacturing,
      imageAlt:
        "Robotic arm working a part on an automated assembly cell",
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
      image: industryFinance,
      imageAlt:
        "Hands capturing a printed document with a phone camera for automated extraction",
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
      image: industryLogistics,
      imageAlt:
        "Aerial view of a container yard with trucks moving between stacked freight",
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
      image: industryConstruction,
      imageAlt:
        "Construction crew in helmets and high-vis riding a hoist up a building facade",
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
    "A structured 8-step process that takes your project from the first conversation to a live, production-ready system that your team can actually operate. Every step has named deliverables, a clear owner, and an exit condition, so you always know what has been done, what is happening now, and what comes next. Nothing moves forward on assumption, and nothing is handed over without documentation.",
  ctaText: "Contact Us Now",
  steps: [
    {
      title: "Discovery And Use-Case Definition",
      body:
        "We start with your business problem, not the technology. Together we define what a correct prediction actually means in your operation, what an acceptable error rate looks like in cost terms, and what the system must do when it is not confident enough to decide on its own. We map the people, cameras, and existing tools the solution has to live alongside, and we write down the cases where a human must stay in the loop. That definition becomes the contract every later stage is measured against.",
    },
    {
      title: "Feasibility And Success Metrics",
      body:
        "We agree the accuracy, latency, throughput, and cost targets in writing before a single model is trained, so success is measurable and nobody moves the goalposts later. If the data or the hardware cannot support the target, we say so at this stage rather than six weeks in. You get a feasibility summary that states what is realistic, what it will take, and what the honest risks are, which is often the point where scope gets sharpened and budget gets protected.",
    },
    {
      title: "Data Audit",
      body:
        "We audit the visual data you already hold: volume, resolution, label quality, class balance, lighting and weather conditions, camera placement, and the edge cases that are missing entirely. Most vision projects fail on data, not on modelling, so this step is deliberately thorough. You get a written report on whether what you have is enough, what needs to be collected or relabelled, and how much of the gap synthetic data can realistically close.",
    },
    {
      title: "Data Collection And Preparation",
      body:
        "Good models need good data. We collect, clean, de-duplicate, label, and structure your visual data for training, with a review pass so labelling errors do not get baked into the model. Where you do not have enough real examples, we use synthetic generation and targeted augmentation to fill the gaps without distorting the underlying distribution. You keep the cleaned and labelled dataset, the repeatable data pipeline, and a quality report, all of which stay yours regardless of what happens with the engagement.",
    },
    {
      title: "Model Development And Training",
      body:
        "Architecture selection, transfer learning, and iterative training runs against the metrics we agreed up front. We benchmark several candidate approaches instead of committing to the first one that works, and we weigh accuracy against inference cost and the hardware the system has to run on. Every experiment is tracked with its data version, parameters, and results, so any number we report can be reproduced from the repository months later by someone who was not in the room.",
    },
    {
      title: "Evaluation And Hardening",
      body:
        "We test against held-out data and deliberately hostile cases: bad lighting, occlusion, motion blur, dirty lenses, unusual angles, and spoofing attempts. We also check performance across subgroups, because a model with a good average score can still be unreliable for a specific shift, site, or demographic. Failure modes get documented, thresholds get tuned to your tolerance for false positives versus false negatives, and you receive the full evaluation report rather than a single headline accuracy number.",
    },
    {
      title: "Integration And Deployment",
      body:
        "We deploy to edge devices, cloud, or a hybrid of both, depending on the latency, bandwidth, and privacy constraints your environment imposes. The system is wired into the tools your team already uses, whether that is an ERP, a WMS, a VMS, or an internal dashboard, so nobody has to learn a second interface. Monitoring, logging, and alerting go live at the same time, which means accuracy drift shows up on a dashboard early instead of arriving as a customer complaint.",
    },
    {
      title: "Monitoring, Retraining, And Support",
      body:
        "Vision models decay as cameras get replaced, lighting changes, packaging is redesigned, and new product lines appear. We monitor live accuracy against your baseline, flag drift as it develops, and retrain on an agreed schedule using the fresh data production generates. For 60 days after launch our team stays available at no extra cost to fix issues, answer questions, and coach your staff, and beyond that we offer a support arrangement sized to how critical the system is to your operation.",
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
    {
      value: "300+",
      label: "Business apps developed",
      detail: "Shipped across vision, AI, web, and mobile, from first prototype to production rollout.",
    },
    {
      value: "20+",
      label: "Countries served",
      detail: "Delivery across time zones with clients in North America, Europe, the Gulf, and Asia.",
    },
    {
      value: "7+",
      label: "Business partnerships",
      detail: "Long-term technology partners covering cloud, edge hardware, and data infrastructure.",
    },
    {
      value: "25+",
      label: "Team of experts",
      detail: "ML engineers, data scientists, MLOps, and product specialists working in one team.",
    },
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
