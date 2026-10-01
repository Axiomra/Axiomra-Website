/** Every string and image the Computer Vision detail page renders lives here. */
import { companyStats } from "./companyStats.js";
import heroFaceMesh from "../assets/opencv/hero-face-mesh.webp";
import heroDetectionConsole from "../assets/opencv/hero-detection-console.webp";
import heroVisionGraph from "../assets/opencv/hero-vision-graph.webp";
import heroRoboticHand from "../assets/opencv/hero-robotic-hand.jpg";
import challengesMonitoring from "../assets/opencv/cv-challenges-monitoring.jpg";
import caseStudyAnalytics from "../assets/opencv/cv-case-study-analytics.jpg";
import modelPipeline from "../assets/opencv/cv-model-pipeline.png";
import { caseStudyPath } from "../routes.constants";

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
import capObjectDetection from "../assets/cv/cv-cap-object-detection-v2.webp";
import capFacialRecognition from "../assets/cv/cv-cap-facial-recognition-v2.webp";
import capPoseEstimation from "../assets/cv/cv-cap-pose-estimation-v2.webp";
import capImageAnalytics from "../assets/cv/cv-cap-image-analytics-v2.webp";
import capVideoAnalytics from "../assets/cv/cv-cap-video-analytics-v2.webp";
import capOcr from "../assets/cv/cv-cap-ocr-v2.webp";
import capGan from "../assets/cv/cv-cap-gan-v2.webp";

/* Hero */

export const hero = {
  eyebrow: "Computer Vision Development",
  titleLead: "Computer Vision",
  titleAccent: "Development",
  titleTail: "for Your Business Operations",
  body: "Axiomra builds computer vision systems that read images, video, and camera feeds and turn them into information your team can act on. We assess what your existing cameras and data can support, agree accuracy and latency targets before development, and deploy to the edge or the cloud to suit your environment.",
  ctaText: "Book a Free Consultation",
  secondaryCtaText: "Explore Our Capabilities",
  proof: { rating: "4.8", reviews: "300+ companies", source: "Reviewed on Clutch" },
  /**
   * Capability labels rather than statistics. Entries with no `value` render as a
   * single label, so verified figures can be reinstated by adding `value:` here.
   */
  stats: [
    { label: "Detection and Tracking" },
    { label: "Image and Video Analytics" },
    { label: "Edge and Cloud Deployment" },
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
  label: "Tools and frameworks we work with",
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
  eyebrow: "Working with visual data",
  titleAccent: "Turn Visual Data",
  titleLead: "Into Information You Can Use",
  intro:
    "Most organisations record far more visual material than anyone can review: camera feeds, scanned documents, inspection photos, and product imagery. Much of it is checked by a person, and some of it is never checked at all.",
  listTitle: "Common problems we are asked to solve:",
  problems: [
    {
      title: "Manual Visual Review",
      body: "Checking frames, photos, or scans by hand takes time and produces different results between people and shifts.",
    },
    {
      title: "Limited Real-time Visibility",
      body: "A defect, an obstruction, or a growing queue is often identified after the point where action would have helped.",
    },
    {
      title: "Identity Checks That Can Be Defeated",
      body: "Verification that relies on a static image can be passed with a printed photo or a replayed video.",
    },
    {
      title: "Operational Data That Goes Unmeasured",
      body: "Footfall, dwell time, shelf gaps, and safety compliance are not recorded because nobody has time to review the footage.",
    },
    {
      title: "Approaches That Do Not Scale",
      body: "A setup that works on a handful of cameras can become unreliable or too costly to run across a larger estate.",
    },
  ],
  outro:
    "We design computer vision systems around your workflow and the equipment you already have, covering identity verification, document processing, inspection, and monitoring. Scope, accuracy targets, and the points where a person reviews an output are agreed with you before development begins.",
  ctaText: "Book a Free Consultation",
  image: challengesMonitoring,
  imageAlt: "Dark monitoring room with terminals streaming live camera analysis output",
  /** Capability labels, not measured results. See the note on `hero.stats`. */
  metrics: [
    { label: "Automated Review" },
    { label: "Continuous Monitoring" },
    { label: "Cross-industry Delivery" },
  ],
};

/* Service layers (numbered accordion) */

export const services = {
  eyebrow: "What we deliver",
  titleAccent: "Computer Vision Services",
  titleLead: "From Assessment to Deployment",
  subtitle:
    "We support every stage of a computer vision project, from the first feasibility question through to a system your team operates. Each service is scoped around your business problem and the data you hold.",
  items: [
    {
      id: "computer-vision-consulting",
      image: serviceConsulting,
      imageAlt:
        "Consultants reviewing charts and a roadmap on a whiteboard during a scoping workshop",
      title: "Computer Vision Consulting",
      body: "We review your business goals, the visual data you already hold, and your technical setup, then set out what can realistically be built. You receive a prioritised list of use cases, an assessment of whether your data supports them, and a roadmap with estimated effort, cost, and dependencies.",
      deliverables: [
        "Prioritised use cases",
        "Data readiness assessment",
        "Build or buy assessment",
        "Roadmap with estimates",
      ],
    },
    {
      id: "custom-vision-software",
      image: serviceCustomSoftware,
      imageAlt: "Developer writing production code across two monitors in a darkened studio",
      title: "Custom Computer Vision Development",
      body: "We build the full solution: the data pipeline, the model, the inference service, and the interface your team works in. Code is versioned, tested, and containerised, and the repository is handed over with documentation for the people who will maintain it.",
      deliverables: [
        "Training pipelines",
        "Inference APIs",
        "Operator dashboards",
        "Edge and cloud builds",
      ],
    },
    {
      id: "model-design-optimization",
      image: serviceModelOptimization,
      imageAlt: "Processor seated in its socket on a motherboard, lit by the rig it trains on",
      title: "Model Design and Optimisation",
      body: "We select an architecture suited to your task and hardware, then apply transfer learning and targeted training to reach the agreed quality level. Quantisation, pruning, and conversion to ONNX or TensorRT reduce latency and running cost, with accuracy re-tested after each change.",
      deliverables: [
        "Architecture selection",
        "Quantisation and pruning",
        "Latency budgeting",
        "Accuracy regression tests",
      ],
    },
    {
      id: "system-integration",
      image: serviceIntegration,
      imageAlt: "Operator watching a wall of live camera feeds inside a monitoring room",
      title: "System Integration",
      body: "We connect the model to your cameras, PLCs, PACS, WMS, ERP, or CRM so that detections arrive as tickets, alerts, and records in the systems your team already uses. Integration work covers authentication, expected volumes, and behaviour when a component is unavailable.",
      deliverables: [
        "Camera and RTSP ingest",
        "ERP, CRM and PACS integration",
        "Event streaming",
        "Alerting and escalation",
      ],
    },
    {
      id: "proof-of-concept",
      image: servicePoc,
      imageAlt: "Engineer testing a projected interface prototype on her own hand in the lab",
      title: "Proof of Concept",
      body: "A time-boxed build on your own data to establish whether the use case is achievable at the accuracy your business needs. You receive the evaluation results, the cases where the model failed, and a recommendation on whether to proceed.",
      deliverables: [
        "Agreed timebox",
        "Your data and success measures",
        "Documented failure modes",
        "Proceed or stop recommendation",
      ],
    },
    {
      id: "vision-data-services",
      image: serviceData,
      imageAlt: "Annotator reviewing a contact sheet of candidate training images on screen",
      title: "Vision Data Services",
      body: "Collection, cleaning, annotation, and augmentation of your visual data, with synthetic generation where real examples are limited, costly to capture, or restricted. Labelling follows a written specification, and each batch is sampled for quality before it enters training.",
      deliverables: [
        "Annotation at scale",
        "Synthetic data generation",
        "Label quality sampling",
        "Dataset versioning",
      ],
    },
  ],
};

/* Capability rows (motif-driven, no photography) */

export const expertise = {
  eyebrow: "Our computer vision capabilities",
  titleAccent: "Computer Vision Capabilities",
  titleLead: "for Your Use Case",
  subtitle: "Each capability below can be delivered on its own or combined into a larger system.",
  items: [
    {
      id: "object-detection",
      motif: "boxes",
      image: capObjectDetection,
      imageAlt: "Warehouse camera feed with detected items outlined by bounding boxes",
      title: "Object Detection",
      body: "Identify, locate, and track objects in images and video streams, with a confidence score attached to every prediction. We build detection systems for quality control, security monitoring, inventory management, and logistics, tuned to the cameras and lighting already installed on your sites. Models are trained on your own footage rather than generic public datasets, so they learn the parts, packaging, and edge cases your operation deals with. Inference runs at the edge or in the cloud, chosen against the latency and bandwidth your environment allows.",
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
      body: "Facial recognition for identity verification, access control, and customer analytics, tested across the lighting conditions, camera angles, and coverings your sites actually see. Matching pipelines are sized to your enrolled population, from a single door reader upwards. Liveness checks run ahead of every match so printed photos, screen replays, and synthetic video are rejected before a comparison is made. Templates are encrypted and stored as vectors rather than images, and the applicable biometric and privacy requirements are reviewed with your team before deployment.",
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
      body: "Detect body position, joint angles, and movement over time at keypoint level, from a single camera or a multi-view setup. The same approach supports patient mobility monitoring, physiotherapy progress tracking, sports biomechanics, gesture-driven interfaces, and workplace safety checks. Posture is tracked across frames rather than scored on isolated images, so the system can flag a fall, a repetitive strain risk, or a missed safety step as it occurs. Output is delivered as structured coordinates your own analytics tools can read.",
      bullets: [
        "2D and 3D pose estimation",
        "Gesture recognition",
        "Head pose estimation",
        "Body landmark tracking",
        "Single and multi-view estimation",
        "Skeleton keypoint mapping",
      ],
      // Long-form write-up of this capability in use, linked under the bullets.
      caseStudy: {
        text: "Read the AI physical therapy blueprint",
        to: caseStudyPath("ai-physical-therapy-pose-estimation"),
      },
    },
    {
      id: "image-analytics",
      motif: "segments",
      image: capImageAnalytics,
      imageAlt: "High-resolution scan being segmented region by region for inspection",
      title: "Image Analytics",
      body: "We segment images at pixel level so each region in a frame is classified rather than only enclosed in a box. That level of detail is what medical imaging, autonomous systems, satellite analysis, and industrial inspection require when a pass and a defect differ by a small area. Models are evaluated on overlapping objects, fine boundaries, and low-contrast or noisy source images before deployment. Results are delivered as masks, measurements, and area statistics that feed directly into your reporting.",
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
      body: "Convert recorded footage into structured data instead of hours of material nobody has time to review. Video analytics monitor behaviour across frames, detect anomalies, count and classify movement, and produce reporting for retail, logistics, transport, and security environments. Because the model reads sequence rather than single frames, it can distinguish waiting from loitering, or a stopped vehicle from a blocked exit. Alerts, dashboards, and search across archived footage are part of the delivery.",
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
      body: "Extract text from photographs, scanned documents, handwritten forms, and video frames, and return it as structured, searchable data rather than a block of plain text. Models are fine-tuned on your own document types, fonts, and layouts, which generally performs better on specialist material than a general-purpose OCR tool. Tables, multi-column layouts, stamps, degraded scans, and multilingual pages are handled as part of the scope. The output maps to your fields, so downstream systems receive values they can validate rather than text someone has to re-key.",
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
      body: "Generative models are used to create synthetic training data, improve image quality, and produce visual content at volume. This matters most when real examples are limited, costly to capture, or restricted, such as rare manufacturing defects or patient imaging that cannot leave the hospital. Generated samples are balanced against your real data distribution so the model learns uncommon cases without drifting from the conditions it will meet in production. The same techniques cover super-resolution, denoising, style transfer, and augmentation.",
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
  eyebrow: "Selected projects",
  titleLead: "Computer Vision Projects",
  titleAccent: "We Have Delivered",
  subtitle:
    "Examples of computer vision systems we have built. Each began with a defined business problem, an agreed measure of success, and a scope set with the client before development started.",
  image: caseStudyAnalytics,
  imageAlt: "Analyst workstation showing a live vision analytics dashboard in a dark room",
  // Long-form write-up of a related design, linked under the picker.
  blueprint: {
    text: "Read the medical imaging solution blueprint",
    to: caseStudyPath("healthcare-medical-imaging-disease-identification"),
  },
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
        { value: "On-prem", label: "Deployed inside the hospital network" },
      ],
    },
  ],
};

/* Industries */

export const industries = {
  eyebrow: "Industries we work with",
  titleAccent: "Computer Vision",
  titleLead: "Across Industries",
  subtitle:
    "We build computer vision systems for a range of sectors. Each solution is shaped around the workflows, data types, and regulatory requirements that apply to your industry, which we review with your team during scoping.",
  imageCaption: "The models are similar across sectors; the rules around them are not.",
  items: [
    {
      name: "Healthcare",
      image: industryHealthcare,
      imageAlt: "Radiologist reading a set of scans across multiple diagnostic monitors",
      body: "Support clinical teams, reduce diagnostic errors, and automate time-consuming manual reviews.",
      bullets: [
        "Medical image analysis and diagnostic support (X-ray, MRI, CT)",
        "Surgical assistance and real-time guidance",
        "Patient monitoring through video and wearable feeds",
        "Pathology slide analysis and anomaly detection",
        "Hospital safety compliance (PPE detection, fall detection)",
        "Chronic disease progression tracking through imaging",
      ],
      note: "Data handling, hosting, and retention for healthcare builds are agreed with your compliance team before deployment.",
    },
    {
      name: "Retail And E-Commerce",
      image: industryRetail,
      imageAlt: "Shoppers moving through a busy supermarket aisle stacked with product",
      body: "Understand what happens on the shop floor and in the catalogue, without adding headcount.",
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
      imageAlt: "Robotic arm working a part on an automated assembly cell",
      body: "Catch defects in the same cycle they happen, not after the pallet is wrapped.",
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
      imageAlt: "Hands capturing a printed document with a phone camera for automated extraction",
      body: "Verify identity and process documents without a manual review queue.",
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
      imageAlt: "Aerial view of a container yard with trucks moving between stacked freight",
      body: "Track what moves through your yard, dock, and fleet without manual scanning.",
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
      imageAlt: "Construction crew in helmets and high-vis riding a hoist up a building facade",
      body: "Measure progress and enforce safety from the footage you already capture.",
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
  eyebrow: "Technologies we work with",
  titleAccent: "The Technology Behind",
  titleLead: "Your Computer Vision System",
  subtitle:
    "Established, well-supported tools across every layer of the build. The selection for your project is made against your data, your hardware, and the people who will maintain it.",
  image: modelPipeline,
  imageAlt: "Illustration of a layered neural network pipeline rendered as translucent panels",
  groups: [
    {
      name: "Core Frameworks And Libraries",
      why: "The foundation the models are built on. We keep to widely used, actively maintained frameworks so your system remains supportable over time.",
      items: [
        "OpenCV",
        "PyTorch",
        "TensorFlow",
        "Keras",
        "scikit-image",
        "MediaPipe",
        "Albumentations",
        "NumPy",
      ],
    },
    {
      name: "Model Architectures",
      why: "Selected for the task and the latency budget it has to meet. Candidate architectures are evaluated on your data before one is chosen.",
      items: [
        "YOLOv8",
        "Detectron2",
        "ResNet-50",
        "EfficientNet",
        "InceptionV3",
        "Segment Anything",
        "U-Net",
        "Vision Transformers",
      ],
    },
    {
      name: "Serving And Optimization",
      why: "This layer determines running cost. Quantisation and graph optimisation reduce inference cost, and we measure the effect on your workload rather than assume it.",
      items: [
        "ONNX Runtime",
        "NVIDIA TensorRT",
        "Triton Inference Server",
        "TorchServe",
        "OpenVINO",
        "CoreML",
        "DeepStream",
      ],
    },
    {
      name: "Data And MLOps",
      why: "Versioned data, tracked experiments, and repeatable pipelines, so the system can be retrained and audited later by someone who was not on the original team.",
      items: [
        "MLflow",
        "DVC",
        "Label Studio",
        "CVAT",
        "Weights & Biases",
        "Airflow",
        "Docker",
        "Kubernetes",
      ],
    },
    {
      name: "Edge And Cloud",
      why: "Where inference runs is decided by bandwidth, latency, and data handling requirements. Footage that should not leave a site is processed on that site.",
      items: [
        "NVIDIA Jetson",
        "AWS Panorama",
        "Azure IoT Edge",
        "Google Vertex AI",
        "AWS SageMaker",
        "Raspberry Pi + Coral",
      ],
    },
  ],
};

/* Process */

export const process = {
  eyebrow: "How we work",
  titleLead: "Our",
  titleAccent: "Computer Vision Development",
  titleTail: "Process",
  subtitle:
    "A structured process that takes a project from the first conversation to a system your team operates. Each stage has defined deliverables, a named owner, and an exit condition, so the current state of the work is always clear and nothing is handed over without documentation.",
  ctaText: "Discuss Your Requirements",
  steps: [
    {
      title: "Discovery And Use-Case Definition",
      body: "We start with your business problem, not the technology. Together we define what a correct prediction actually means in your operation, what an acceptable error rate looks like in cost terms, and what the system must do when it is not confident enough to decide on its own. We map the people, cameras, and existing tools the solution has to live alongside, and we write down the cases where a human must stay in the loop. That definition becomes the contract every later stage is measured against.",
    },
    {
      title: "Feasibility And Success Metrics",
      body: "We agree the accuracy, latency, throughput, and cost targets in writing before a single model is trained, so success is measurable and nobody moves the goalposts later. If the data or the hardware cannot support the target, we say so at this stage rather than six weeks in. You get a feasibility summary that states what is realistic, what it will take, and what the honest risks are, which is often the point where scope gets sharpened and budget gets protected.",
    },
    {
      title: "Data Audit",
      body: "We audit the visual data you already hold: volume, resolution, label quality, class balance, lighting and weather conditions, camera placement, and the edge cases that are missing entirely. Most vision projects fail on data, not on modelling, so this step is deliberately thorough. You get a written report on whether what you have is enough, what needs to be collected or relabelled, and how much of the gap synthetic data can realistically close.",
    },
    {
      title: "Data Collection And Preparation",
      body: "Good models need good data. We collect, clean, de-duplicate, label, and structure your visual data for training, with a review pass so labelling errors do not get baked into the model. Where you do not have enough real examples, we use synthetic generation and targeted augmentation to fill the gaps without distorting the underlying distribution. You keep the cleaned and labelled dataset, the repeatable data pipeline, and a quality report, all of which stay yours regardless of what happens with the engagement.",
    },
    {
      title: "Model Development And Training",
      body: "Architecture selection, transfer learning, and iterative training runs against the metrics we agreed up front. We benchmark several candidate approaches instead of committing to the first one that works, and we weigh accuracy against inference cost and the hardware the system has to run on. Every experiment is tracked with its data version, parameters, and results, so any number we report can be reproduced from the repository months later by someone who was not in the room.",
    },
    {
      title: "Evaluation And Hardening",
      body: "We test against held-out data and deliberately hostile cases: bad lighting, occlusion, motion blur, dirty lenses, unusual angles, and spoofing attempts. We also check performance across subgroups, because a model with a good average score can still be unreliable for a specific shift, site, or demographic. Failure modes get documented, thresholds get tuned to your tolerance for false positives versus false negatives, and you receive the full evaluation report rather than a single headline accuracy number.",
    },
    {
      title: "Integration And Deployment",
      body: "We deploy to edge devices, cloud, or a hybrid of both, depending on the latency, bandwidth, and privacy constraints your environment imposes. The system is wired into the tools your team already uses, whether that is an ERP, a WMS, a VMS, or an internal dashboard, so nobody has to learn a second interface. Monitoring, logging, and alerting go live at the same time, which means accuracy drift shows up on a dashboard early instead of arriving as a customer complaint.",
    },
    {
      title: "Monitoring, Retraining, and Support",
      body: "Vision models lose accuracy over time as cameras are replaced, lighting changes, packaging is redesigned, and new product lines appear. We monitor live performance against your baseline, flag drift as it develops, and retrain on an agreed schedule using the data production generates. A post-launch support period is included in the engagement, and longer-term support is arranged to suit how critical the system is to your operation.",
    },
  ],
};

/* Outcomes */

export const outcomes = {
  eyebrow: "What a vision system changes",
  titleAccent: "What You Gain",
  titleLead: "From a Computer Vision System",
  items: [
    {
      title: "Capacity to Scale",
      body: "Extend the same system across additional sites and cameras without adding review staff in proportion to the volume.",
    },
    {
      title: "Lower Operating Cost",
      body: "Automating repetitive visual checks reduces the manual effort involved and the cost of running the process over time.",
    },
    {
      title: "Automated Visual Checks",
      body: "Routine work such as quality control and inventory sorting runs continuously, with results recorded rather than re-keyed.",
    },
    {
      title: "Consistent Review",
      body: "A model applies the same criteria to every image, which removes the variation that appears between people and across a long shift.",
    },
  ],
};

/* Why us */

export const whyUs = {
  eyebrow: "Why work with Axiomra",
  titleAccent: "Why Choose Axiomra",
  titleLead: "for Computer Vision Development",
  subtitle:
    "What clients tell us matters when they choose a computer vision partner, and what we commit to on every engagement.",
  ctaText: "Book a Free Consultation",
  stats: [
    {
      value: "400+",
      label: "Business apps developed",
      detail: "Shipped across vision, AI and web, from first prototype to production rollout.",
    },
    {
      value: `${companyStats.countries}+`,
      label: "Countries served",
      detail:
        "Delivery across time zones with clients in North America, Europe, the Gulf, and Asia.",
    },
    {
      value: `${companyStats.partnerships}+`,
      label: "Business partnerships",
      detail:
        "Long-term technology partners covering cloud, edge hardware, and data infrastructure.",
    },
    {
      value: `${companyStats.experts}+`,
      label: "Team of experts",
      detail: "ML engineers, data scientists, MLOps, and product specialists working in one team.",
    },
  ],
  reasons: [
    {
      title: "Built for Operational Use",
      body: "We build systems intended to run in live environments, against real data volumes and the conditions your cameras actually see. Before handover, the solution is tested, integrated with your systems, and documented for the team that will run it.",
    },
    {
      title: "One Team Across the Full Lifecycle",
      body: "Strategy, data preparation, model training, interface development, integration, deployment, and maintenance are handled by the same team. You have a single point of accountability from the first assessment through to support.",
    },
    {
      title: "Post-launch Engineering Support",
      body: "A support period is included after your system goes live, covering fixes, questions, and help for the people using the system day to day. The length and scope are set out in the engagement before work begins.",
    },
    {
      title: "Training for the People Who Use It",
      body: "After deployment we run sessions on how the system works, how to read its outputs, and how to raise an issue early. The aim is that your team can operate and question the system without depending on us.",
    },
    {
      title: "Visibility at Every Stage",
      body: "You can see what the team is working on, which decisions have been made, and what results are being tracked, from the first data assessment to deployment. Changes to scope are agreed with you rather than absorbed quietly.",
    },
    {
      title: "Scoped Around Your Objectives",
      body: "We start by establishing what success means for your operation, not only what the model needs to achieve technically. Decisions are tied back to that objective, whether it is fewer defects reaching customers, less manual review, or faster turnaround.",
    },
  ],
};

/* FAQ */

export const faqs = [
  {
    q: "What are computer vision services?",
    a: "Computer vision services cover the work needed to make software interpret images and video: identifying a suitable use case, collecting and labelling visual data, training and optimising models, integrating them with your existing systems, and running them in production. In practice it means turning camera feeds, scans, and photos into information your business can act on.",
  },
  {
    q: "How much does computer vision software development cost?",
    a: "Cost depends on the number of cameras, the accuracy target, whether the system runs at the edge or in the cloud, and how much labelled data already exists. We provide a costed range after the data assessment rather than a figure before it, so the estimate reflects your data rather than an average.",
  },
  {
    q: "How long does it take to build a computer vision solution?",
    a: "Timelines are set during scoping and depend mainly on the state of your data. Data preparation is the stage that varies most; where clean labelled data and fixed camera positions already exist, the build moves considerably faster. We give an estimated schedule with the proposal.",
  },
  {
    q: "How much data do I need to train a computer vision model?",
    a: "It depends on how visually distinct the categories are. With transfer learning, a modest number of well-labelled examples per class is often enough for a usable baseline, while subtle defect detection needs considerably more. Where real samples are limited we use synthetic generation and augmentation, and the data assessment states plainly whether what you hold is sufficient.",
  },
  {
    q: "Can you integrate computer vision with our existing systems?",
    a: "Yes, and it is usually a substantial part of the work. We integrate with RTSP and IP camera fleets, PLCs on the factory floor, PACS in healthcare, WMS in logistics, and your ERP or CRM, so detections become tickets, alerts, and records inside the tools your team already uses.",
  },
  {
    q: "Does computer vision work in poor lighting or with low-quality cameras?",
    a: "Often, but there are limits and we identify them during evaluation. We test against difficult conditions such as low light, glare, occlusion, and motion blur, and document the cases where the model is unreliable. Sometimes the better fix is a change to the camera or the lighting rather than a larger model, and we will say so.",
  },
  {
    q: "How do you handle privacy for facial recognition and other biometric data?",
    a: "Data handling is agreed with your team before development. Depending on your requirements that can include on-premise or edge inference so frames stay on your network, storing encrypted templates rather than raw imagery, configurable retention periods, and logging of matches for review. We assess the privacy and sector rules that apply to your deployment with your compliance team rather than assuming them.",
  },
  {
    q: "What happens to accuracy after the system goes live?",
    a: "Vision models drift as cameras age, lighting changes, and products are redesigned. We monitor live accuracy against a sampled ground truth, alert on drift, and retrain on a schedule agreed with you. A post-launch support period is included while the system settles into normal operation.",
  },
];
