/**
 * Copy and imagery for the Healthcare industry page (/industries/healthcare).
 *
 * Everything the page renders comes from here, so a copy change never touches
 * a component. Section order in the page mirrors this file.
 */

import heroImg from "../assets/industries/healthcare/hero.webp";
import introImg from "../assets/industries/healthcare/intro.webp";

import svcEhrImg from "../assets/industries/healthcare/svc-ehr.webp";
import svcTelehealthImg from "../assets/industries/healthcare/svc-telehealth.webp";
import svcImagingImg from "../assets/industries/healthcare/svc-imaging.webp";
import svcDecisionImg from "../assets/industries/healthcare/svc-decision.webp";
import svcHospitalImg from "../assets/industries/healthcare/svc-hospital.webp";
import svcPatientImg from "../assets/industries/healthcare/svc-patient.webp";
import svcBillingImg from "../assets/industries/healthcare/svc-billing.webp";
import svcPharmacyImg from "../assets/industries/healthcare/svc-pharmacy.webp";
import svcMonitoringImg from "../assets/industries/healthcare/svc-monitoring.webp";
import svcResearchImg from "../assets/industries/healthcare/svc-research.webp";

import midCtaBgImg from "../assets/industries/healthcare/midcta-bg.webp";

import solConsultingImg from "../assets/industries/healthcare/sol-consulting.webp";
import solDevelopmentImg from "../assets/industries/healthcare/sol-development.webp";
import solAnalyticsImg from "../assets/industries/healthcare/sol-analytics.webp";
import solAutomationImg from "../assets/industries/healthcare/sol-automation.webp";

import stkHospitalsImg from "../assets/industries/healthcare/stk-hospitals.webp";
import stkCliniciansImg from "../assets/industries/healthcare/stk-clinicians.webp";
import stkFoundersImg from "../assets/industries/healthcare/stk-founders.webp";

import subHospitalsImg from "../assets/industries/healthcare/sub-hospitals.webp";
import subTelehealthImg from "../assets/industries/healthcare/sub-telehealth.webp";
import subDiagnosticsImg from "../assets/industries/healthcare/sub-diagnostics.webp";
import subRadiologyImg from "../assets/industries/healthcare/sub-radiology.webp";
import subPharmaImg from "../assets/industries/healthcare/sub-pharma.webp";
import subDevicesImg from "../assets/industries/healthcare/sub-devices.webp";
import subMentalImg from "../assets/industries/healthcare/sub-mental.webp";
import subHomecareImg from "../assets/industries/healthcare/sub-homecare.webp";
import subPayersImg from "../assets/industries/healthcare/sub-payers.webp";
import subDentalImg from "../assets/industries/healthcare/sub-dental.webp";

import textureBgImg from "../assets/industries/healthcare/texture-bg.webp";
import buildVisualImg from "../assets/industries/healthcare/build-visual.webp";

import blog1Img from "../assets/industries/healthcare/blog-1.webp";
import blog2Img from "../assets/industries/healthcare/blog-2.webp";
import blog3Img from "../assets/industries/healthcare/blog-3.webp";
import finalCtaBgImg from "../assets/industries/healthcare/final-cta.webp";

export const HEALTHCARE_SLUG = "healthcare";

export const hero = {
  eyebrow: "AI for the healthcare industry",
  titleLead: "Custom",
  titleAccent: "AI Healthcare Software Development",
  titleTail: "Services",
  body:
    "We build clinical-grade systems that give time back to the people delivering care. Our AI healthcare software development services help hospitals, telehealth providers, labs and health-tech companies remove documentation load, shorten diagnostic turnaround and close the gaps between EHR, imaging and billing, without ever putting protected health information at risk.",
  ctaText: "Request a free consultation",
  image: heroImg,
  alt: "A surgical microscope in a theatre lit in clinical blue",
  reviews: { platform: "Clutch", rating: 5, count: 12 },
};

export const intro = {
  titleLead: "Giving Clinical Teams Their Day Back With Custom",
  titleAccent: "AI Healthcare Software Development Services",
  paragraphs: [
    "Axiomra is a custom healthcare software development company that helps providers, payers and health-tech founders turn fragmented clinical data into systems clinicians actually trust. We design and build HIPAA-ready platforms that reduce administrative load, surface the right information at the point of decision, and integrate with the EHR you already run rather than asking you to replace it.",
    "Our AI healthcare software development services combine clinical NLP, medical imaging models, predictive analytics and workflow automation to shorten turnaround, cut avoidable readmissions and keep documentation current. Every solution is built consultatively, validated against your own clinical data, and shipped with the evidence pack your governance, information security and procurement teams will ask for.",
  ],
  ctaText: "Book a Free Tech Consultation",
  image: introImg,
  alt: "A clinician holding a tablet beside an open case notebook",
};

/**
 * The decorative standards band. This is the only section on the page where
 * copy is flowed around shapes rather than set in a straight column, so the
 * text here is deliberately short.
 */
export const standards = {
  eyebrow: "The part nobody demos",
  titleLead: "A Clinical System Is Only As Good As The",
  titleAccent: "Record It Can Be Trusted With",
  orb: { value: "PHI", caption: "Encrypted at rest and in transit" },
  lead:
    "Every order, result and note arrives as a claim about a real person, and the system has one chance to attach it to the right record. Match it wrongly and the failure is not a bad row in a table. It is a medication given to someone it was never meant for.",
  vial: { value: "FHIR", caption: "R4 native, not bolted on" },
  aside:
    "So we build for the record first and the feature second. Identity resolution runs before anything is written, terminology is mapped rather than assumed, and every access leaves a trail an information governance lead can follow without opening a ticket.",
  rails: [
    { value: "Capture", caption: "At the point of care" },
    { value: "Decide", caption: "With the reasoning attached" },
  ],
  manifesto:
    "Between the moment a clinician notices something and the moment the system acts on it sits the part nobody demos and everybody depends on: the identity that resolves, the model that explains itself, and the audit trail that still holds twelve months later.",
};

export const impact = {
  titleLead: "How AI Is Transforming",
  titleAccent: "Diagnostics, Care And Operations",
  body:
    "AI healthcare software development services are changing how care is documented, diagnosed and coordinated. By automating the administrative layer and putting predictive signal in front of clinicians, these systems shorten time to treatment, reduce avoidable cost and let scarce clinical capacity go where it matters.",
  stats: [
    {
      value: "1016",
      label:
        "AI-enabled medical devices have now been authorised by the FDA, with radiology accounting for roughly three quarters of them.",
      source: "FDA, AI/ML-Enabled Medical Device List 2025",
    },
    {
      value: "29%",
      label:
        "average reduction in clinical documentation time reported by health systems deploying ambient AI scribes across ambulatory care.",
      source: "Peterson Health Technology Institute, Ambient Scribes Review 2025",
    },
    {
      value: "90%",
      label:
        "of hospitals could use AI to improve early diagnosis and shorten patient wait times, according to sector modelling.",
      source: "WHO, Digital Health and AI Readiness Report 2025",
    },
  ],
};

/**
 * The challenge rail. Each entry is a barrier care teams hit, and the
 * platform capability we build to remove it.
 */
export const challenges = {
  eyebrow: "Overcoming the barriers that hold clinical teams back",
  titleLead: "Top Challenges In Modern",
  titleAccent: "Healthcare Delivery",
  items: [
    {
      title: "Clinician Burnout From Documentation",
      body:
        "For every hour of patient contact, most clinicians spend close to another on the keyboard. We build ambient capture and clinical NLP that drafts the note, codes the encounter and pre-fills the order set, leaving the clinician to review and sign rather than transcribe. The note stays theirs; the typing stops being their job.",
    },
    {
      title: "Fragmented EHR And Departmental Silos",
      body:
        "The EHR, the LIS, the PACS and the scheduling system each hold a piece of the patient and none hold the whole. We build an HL7 v2 and FHIR R4 interoperability layer with a real patient-matching strategy behind it, so a clinician opens one longitudinal record instead of four partial ones.",
    },
    {
      title: "Diagnostic Backlogs And Reporting Delays",
      body:
        "Imaging and pathology volumes keep rising while specialist headcount does not. We deploy triage models that reorder the worklist by likelihood of critical finding, pre-populate structured reports and flag discrepancies for a second read, so the urgent study is seen first rather than in the order it arrived.",
    },
    {
      title: "HIPAA, GDPR And Audit Exposure",
      body:
        "Most breaches are access-control failures, not exotic attacks. We design least-privilege by role, encrypt PHI end to end, keep immutable audit logs, and run de-identification pipelines that keep identifiable data out of model training. The evidence your assessor asks for is produced by the system as it runs, rather than assembled before an audit.",
    },
    {
      title: "No-Shows, Rota Gaps And Bed Flow",
      body:
        "Capacity is lost to empty slots on one ward and overtime on another. We build demand forecasting and smart scheduling that predicts no-show risk per appointment, overbooks intelligently, and models discharge timing so bed managers plan the afternoon instead of reacting to it.",
    },
    {
      title: "Revenue Leakage And Claim Denials",
      body:
        "Denials are rarely a billing problem; they start as a documentation problem. We build computer-assisted coding, eligibility checks at the point of booking and denial-prediction models that flag a claim before submission, with the missing evidence named rather than guessed at.",
    },
  ],
};

/**
 * Ten product categories. Each is a card with a photo and a description.
 */
export const services = {
  eyebrow: "What healthcare solutions do we offer?",
  titleLead: "AI Healthcare Software Development Services",
  titleAccent: "Shaped Around How You Actually Deliver Care",
  body:
    "Healthcare software fails when it is designed for the org chart instead of the ward round. Every platform below is built around a real clinical or operational workflow, integrated with the systems already in place, and validated on your own data before it ever reaches a patient-facing decision.",
  items: [
    {
      title: "EHR & EMR Software Development",
      body:
        "Whether you are building a specialty EHR or making the one you own usable, we focus on the parts clinicians touch: templated notes, order sets, problem-list hygiene and clean FHIR interfaces. AI drafts the documentation and codes the encounter, so the record is complete at the point of signature rather than at the end of the week.",
      image: svcEhrImg,
      alt: "A doctor reviewing patient records at a desk",
    },
    {
      title: "Telemedicine & Virtual Care Platforms",
      body:
        "Low-latency video, asynchronous messaging, e-prescribing and remote triage in one platform, with the consultation written straight back into the record. We build for degraded connections and for the patient who is not confident with technology, because those are the visits that fail.",
      image: svcTelehealthImg,
      alt: "A clinician conducting a video consultation on a laptop",
    },
    {
      title: "Medical Imaging & Diagnostic AI",
      body:
        "Radiology, pathology and ophthalmology models that integrate with PACS through DICOM rather than sitting in a separate viewer. We handle worklist triage, measurement automation, structured reporting and second-read flags. We are also explicit with you about where a model's performance falls off.",
      image: svcImagingImg,
      alt: "A doctor examining brain MRI scans on a lightbox",
    },
    {
      title: "Clinical Decision Support Systems",
      body:
        "Risk scores, deterioration alerts, sepsis and readmission prediction delivered inside the clinical workflow with the reasoning attached. Alert fatigue is a design failure, so we tune thresholds against your own outcome data and measure suppression as carefully as we measure sensitivity.",
      image: svcDecisionImg,
      alt: "A doctor showing a CT scan to a patient on a tablet",
    },
    {
      title: "Hospital Management & Workflow Automation",
      body:
        "Bed flow, theatre scheduling, rota planning, supply and sterile-services tracking in a single operational picture. Forecasting sits underneath it, so the day is planned against predicted demand instead of yesterday's census.",
      image: svcHospitalImg,
      alt: "Healthcare professionals walking through a hospital corridor",
    },
    {
      title: "Patient Engagement & mHealth Apps",
      body:
        "Booking, results, medication reminders, care-plan tracking and secure messaging in an app people over sixty can actually use. Accessibility and reading level are requirements here, not polish. Adherence collapses the moment the interface asks too much.",
      image: svcPatientImg,
      alt: "A patient tracking health data in a smartphone app",
    },
    {
      title: "Medical Billing & Revenue Cycle Management",
      body:
        "Computer-assisted coding, eligibility verification, claim scrubbing and denial prediction across ICD-10, CPT and HCC. The model tells you which claim will be denied and which piece of documentation is missing, before submission rather than after the remittance.",
      image: svcBillingImg,
      alt: "A doctor and patient reviewing medical paperwork together",
    },
    {
      title: "Pharmacy & Medication Management Systems",
      body:
        "E-prescribing, interaction and allergy checking, inventory forecasting and adherence monitoring, integrated with dispensing hardware and the record. Reconciliation at admission and discharge is where most medication error lives, so that is where we start.",
      image: svcPharmacyImg,
      alt: "A pharmacist organising shelves of medication",
    },
    {
      title: "Remote Patient Monitoring & IoMT",
      body:
        "Device ingestion at scale from wearables, glucometers, blood-pressure cuffs and bedside monitors, with the alerting layer tuned so a nurse receives a signal rather than a stream. Chronic-care and post-discharge programmes live or die on that distinction.",
      image: svcMonitoringImg,
      alt: "An ECG monitor displaying heart rate and pulse data",
    },
    {
      title: "Clinical Trial & Life Sciences Platforms",
      body:
        "Cohort identification from real-world data, eCRF and EDC systems, decentralised-trial tooling and safety signal detection. Built to 21 CFR Part 11 and GxP expectations, with data lineage recorded because a sponsor audit will ask for it.",
      image: svcResearchImg,
      alt: "A scientist using a multichannel pipette in a laboratory",
    },
  ],
};

export const midCta = {
  eyebrow: "Ready to reduce the load?",
  title: "We Develop Custom AI-Powered Healthcare Software Solutions Using Clinical-Grade Engineering",
  body:
    "Partner with us to build compliance-ready, interoperable systems that shorten diagnosis, cut documentation time and hold up under a security review. Book a consultation and we will scope it against your own workflows, including the parts we would not automate yet.",
  ctaText: "Get in Touch",
  background: midCtaBgImg,
};

/**
 * The services fold: four alternating photo/copy rows.
 */
export const solutions = {
  eyebrow: "See your workflow mapped before you commit",
  titleLead: "Leading Technologies For Efficient And Secure Healthcare",
  titleAccent: "AI Solutions",
  body:
    "We deliver end-to-end healthcare software solutions that pair clinical understanding with production-grade engineering. Each engagement starts with the workflow as it actually runs, not as the process document describes it, and ends with a system your clinicians, your CISO and your regulator can all live with.",
  items: [
    {
      title: "AI Consulting & Clinical Strategy",
      body:
        "We sit with clinicians and operations leads to map where the time and the risk actually go, then rank the candidates by value and feasibility. You get a costed roadmap with a governance and model-risk plan attached, plus a clear statement of which processes are not worth automating yet.",
      image: solConsultingImg,
      alt: "Healthcare workers in discussion during a ward meeting",
    },
    {
      title: "Custom Healthcare Software Development",
      body:
        "Custom clinical platforms built from the compliance surface inwards: HIPAA and GDPR controls, SOC 2 readiness, HL7 and FHIR interfaces, and an architecture that keeps new services away from the systems of record. Delivered in increments you can validate clinically, not as one long build.",
      image: solDevelopmentImg,
      alt: "An abstract visualisation of a neural network",
    },
    {
      title: "Clinical Data Analytics & Interoperability",
      body:
        "A governed clinical data layer with real patient matching, terminology mapping across SNOMED CT, LOINC and ICD-10, and lineage on every field. Population health dashboards, quality reporting and research cohorts then read from one set of figures instead of four extracts.",
      image: solAnalyticsImg,
      alt: "A brain MRI scan displayed on a clinical monitor",
    },
    {
      title: "Intelligent Automation For Clinical Workflows",
      body:
        "Ambient documentation, prior-authorisation automation, referral triage and discharge-summary generation, each with a human in the loop and a full audit trail behind every automated step. Automation that cannot explain itself has no place in a clinical setting.",
      image: solAutomationImg,
      alt: "A robotic hand reaching into a connected data network",
    },
  ],
};

export const stakeholders = {
  eyebrow: "Every decision-maker in your buying committee has a different question",
  titleLead: "We Build Healthcare Software Solutions",
  titleAccent: "For The Following Organisations",
  items: [
    {
      title: "Hospitals and Health Systems",
      body:
        "Interoperability, bed flow and documentation load, addressed without ripping out the core EHR. Deployed department by department, with the security evidence pack ready for your review board.",
      image: stkHospitalsImg,
      alt: "A modern hospital building lit at dusk",
    },
    {
      title: "Clinicians and Care Teams",
      body:
        "Tools that take work away rather than adding a new screen. Every alert carries its reasoning, and every automated note lands as a draft the clinician owns and signs.",
      image: stkCliniciansImg,
      alt: "Healthcare workers smiling together on a ward",
    },
    {
      title: "Health-Tech Founders and Payers",
      body:
        "A defensible clinical product on compliance-ready rails: validated models, FHIR-native integrations, and the documentation a payer contract or an FDA pathway will require.",
      image: stkFoundersImg,
      alt: "A team of professionals in a working meeting",
    },
  ],
};

/**
 * The marquee rail. Each sub-industry card shows its photo and label at rest,
 * and reveals the detail copy and capability list on hover or focus.
 */
export const subIndustries = {
  eyebrow: "Which part of healthcare do we serve?",
  titleLead: "AI Healthcare Software Solutions Across",
  titleAccent: "Key Care Settings",
  body:
    "Every care setting carries its own regulator, its own data model and its own definition of an acceptable failure. Hover any card to see what we build for it.",
  items: [
    {
      label: "Hospitals & Health Systems",
      body:
        "Interoperability layers, bed and theatre flow, and documentation automation that sits alongside a core EHR you are not going to replace this year.",
      points: ["FHIR interoperability layer", "Bed and theatre flow", "Ambient documentation"],
      image: subHospitalsImg,
      alt: "A quiet hospital corridor with clinical equipment",
    },
    {
      label: "Telehealth",
      body:
        "Virtual-first care built for real networks: resilient video, asynchronous triage, e-prescribing and consultation notes written straight back to the record.",
      points: ["Low-latency video", "Async triage", "E-prescribing"],
      image: subTelehealthImg,
      alt: "A patient in bed consulting a doctor over a tablet",
    },
    {
      label: "Diagnostics & Labs",
      body:
        "LIS integration, specimen tracking and result autoverification, with anomaly detection on the analyser data before a result leaves the bench.",
      points: ["LIS integration", "Result autoverification", "Specimen chain of custody"],
      image: subDiagnosticsImg,
      alt: "A scientist working with a microscope in a sterile lab",
    },
    {
      label: "Radiology & Imaging",
      body:
        "DICOM-native triage, measurement automation and structured reporting inside PACS, with critical findings escalated rather than queued.",
      points: ["Worklist triage", "Structured reporting", "Critical-finding escalation"],
      image: subRadiologyImg,
      alt: "A CT scanner in a sterile hospital imaging room",
    },
    {
      label: "Pharma & Life Sciences",
      body:
        "Trial cohort discovery, decentralised-trial tooling and safety signal detection built to GxP and 21 CFR Part 11 expectations.",
      points: ["Cohort discovery", "eCRF and EDC", "Safety signal detection"],
      image: subPharmaImg,
      alt: "Pharmaceutical workers packaging tablets on a production line",
    },
    {
      label: "Medical Devices & IoMT",
      body:
        "Device data ingestion at scale, firmware-to-cloud pipelines and the alerting layer that turns a telemetry stream into a clinical signal.",
      points: ["Device ingestion pipelines", "Edge processing", "Clinical alert tuning"],
      image: subDevicesImg,
      alt: "A smartwatch tracking health data on a wrist",
    },
    {
      label: "Mental & Behavioural Health",
      body:
        "Measurement-based care, risk screening and therapy-adjacent tooling, designed with consent and confidentiality boundaries handled explicitly.",
      points: ["Measurement-based care", "Risk screening", "Consent-aware data sharing"],
      image: subMentalImg,
      alt: "A therapist and client during a counselling session",
    },
    {
      label: "Home & Elder Care",
      body:
        "Remote monitoring, falls and deterioration prediction, carer scheduling and family portals that keep the household informed without exposing the record.",
      points: ["Remote monitoring", "Deterioration prediction", "Carer scheduling"],
      image: subHomecareImg,
      alt: "A nurse sitting with an elderly patient",
    },
    {
      label: "Payers & Insurance",
      body:
        "Claims adjudication, prior-authorisation automation and risk adjustment, with the decision rationale recorded in a form a regulator will accept.",
      points: ["Claims adjudication", "Prior-auth automation", "Risk adjustment"],
      image: subPayersImg,
      alt: "Hands reviewing an insurance policy document",
    },
    {
      label: "Dental & Specialty Clinics",
      body:
        "Imaging assistance, treatment planning and recall automation for single-site practices and multi-clinic groups alike.",
      points: ["Imaging assistance", "Treatment planning", "Recall automation"],
      image: subDentalImg,
      alt: "A dental team examining a patient with modern equipment",
    },
  ],
};

export const benefits = {
  eyebrow: "What can you optimise with our AI-powered healthcare applications?",
  titleLead: "Benefits Of Integrating",
  titleAccent: "AI Solutions For The Healthcare Sector",
  items: [
    {
      title: "Earlier, More Consistent Diagnosis",
      body:
        "Imaging and pathology models surface findings a tired eye misses at the end of a list, and triage reorders the worklist so the critical study is read first rather than in arrival order.",
    },
    {
      title: "Documentation Time Returned To Care",
      body:
        "Ambient capture and clinical NLP draft the note and code the encounter. Clinicians review and sign instead of typing, and the record is complete at the point of care.",
    },
    {
      title: "Fewer Avoidable Readmissions",
      body:
        "Deterioration and readmission models identify who needs follow-up before discharge, so the intervention is a phone call rather than a second admission.",
    },
    {
      title: "Operational Capacity Without New Headcount",
      body:
        "Demand forecasting on appointments, theatres and beds recovers the slots that no-shows and poor sequencing quietly consume across a week.",
    },
    {
      title: "Revenue Protected At Submission",
      body:
        "Computer-assisted coding and denial prediction catch the missing documentation before the claim goes out, instead of after the remittance advice comes back.",
    },
    {
      title: "Compliance That Produces Its Own Evidence",
      body:
        "Least-privilege access, encrypted PHI and immutable audit logs mean the evidence a HIPAA, GDPR or SOC 2 assessment asks for is generated continuously rather than assembled before an audit.",
    },
  ],
};

export const build = {
  title: "Built For Healthcare From Day One, Not Adapted To It",
  body:
    "Discover how AI healthcare software development services can lift the administrative load off your clinical teams and shorten time to treatment. Speak with our engineers about a scoped pilot on your own data, and about what we would leave alone.",
  ctaText: "Hire healthcare software developers",
  texture: textureBgImg,
  image: buildVisualImg,
  alt: "A healthcare professional in a virtual appointment with a patient",
};

export const techStrip = {
  eyebrow: "Technologies we work with",
  titleLead: "Expertise In Advanced",
  titleAccent: "Development Technologies",
  body:
    "The same production-grade toolchain sits under every healthcare platform we ship. Pick a layer to see what it is made of.",
  ctaText: "View all tech stack",
  tabs: [
    {
      id: "ai",
      label: "Artificial Intelligence",
      items: [
        "GPT-4o", "Claude", "Med-PaLM 2", "Llama 3", "Whisper", "MONAI", "nnU-Net", "PyTorch",
        "TensorFlow", "scikit-learn", "XGBoost", "Hugging Face", "spaCy / medspaCy", "cTAKES",
        "SHAP", "Guardrails", "Vertex AI", "LangChain",
      ],
    },
    {
      id: "interop",
      label: "Clinical Interoperability",
      items: [
        "HL7 FHIR R4", "HL7 v2", "DICOM / DICOMweb", "SMART on FHIR", "CDA / C-CDA", "SNOMED CT",
        "LOINC", "ICD-10 / ICD-11", "RxNorm", "openEHR", "Mirth Connect", "IHE Profiles",
      ],
    },
    {
      id: "backend",
      label: "Backend & Databases",
      items: [
        "Node.js", "NestJS", "FastAPI", "Django", "Go", "Java Spring", "GraphQL", "PostgreSQL",
        "MongoDB", "Redis", "Kafka", "Airflow", "dbt", "Snowflake", "TimescaleDB", "MinIO",
      ],
    },
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "React", "Next.js", "TypeScript", "Tailwind CSS", "Three.js", "D3.js", "Cornerstone.js",
        "React Native", "Flutter", "Vite", "Radix UI",
      ],
    },
    {
      id: "cloud",
      label: "Cloud & Devices",
      items: [
        "AWS HealthLake", "Google Cloud Healthcare API", "Azure Health Data Services", "Kubernetes",
        "Terraform", "Vault", "AWS IoT Core", "MQTT", "Edge Inference",
      ],
    },
    {
      id: "security",
      label: "Security & Compliance",
      note:
        "Standards and practices we design and build against, not certifications held by Axiomra. Which of them apply to your project, and what evidence your assessor will want, is confirmed with your compliance team before work starts.",
      items: [
        "HIPAA", "GDPR", "HITRUST CSF", "SOC 2", "ISO 27001", "ISO 13485", "IEC 62304",
        "21 CFR Part 11", "De-identification pipelines", "Zero-trust networking", "Penetration testing",
      ],
    },
    {
      id: "design",
      label: "UI / UX",
      items: ["Figma", "Design Tokens", "Clinical Workflow Prototyping", "WCAG 2.2 Audits", "Usability Testing"],
    },
  ],
};

export const businessTypes = {
  eyebrow: "Who do we work with?",
  titleLead: "Explore The Range Of",
  titleAccent: "Healthcare Organisations We Support",
  body:
    "We build AI-powered healthcare software that stands up to a clinical safety case, an information governance review and a live ward. Whether you are launching a digital health product or modernising a hospital estate that predates the API era, we turn it into a platform your teams can actually run.",
  rows: [
    {
      label: "Start-ups",
      body:
        "We help digital health founders reach a defensible first release: a compliant data layer, FHIR-native integrations, validated model behaviour and the clinical evidence a first payer or pilot site will ask to see.",
    },
    {
      label: "Scale-ups",
      body:
        "Growth exposes every manual control. We help scale-ups automate onboarding, monitoring and reporting, and put the HITRUST or SOC 2 groundwork in place before enterprise procurement asks for it.",
    },
    {
      label: "Clinics and provider groups",
      body:
        "Multi-site groups carry hospital-grade obligations with a fraction of the back office. Our scheduling, documentation and billing automation closes that gap without an enterprise budget or a year-long rollout.",
    },
    {
      label: "Hospitals and enterprises",
      body:
        "We partner with health systems, payers and life sciences organisations on governed clinical data layers, EHR integration and AI systems that satisfy clinical safety, model risk and procurement before they reach production.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Why is it worth working with us?",
  titleLead: "What Care Providers Say",
  titleAccent: "After The Rollout",
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
  eyebrow: "Real results from real healthcare organisations",
  titleLead: "Showcasing Our",
  titleAccent: "AI Development Projects",
  body:
    "Discover our portfolio showcasing our expertise as an AI development company, delivering clinical-grade solutions to complex healthcare challenges.",
  ctaText: "Check Out Our Full Portfolio",
};

export const partner = {
  eyebrow: "Why choose Axiomra?",
  titleLead: "AI Healthcare Software Development Services",
  titleAccent: "Built Around How You Work",
  cards: [
    {
      icon: "ShieldCheck",
      title: "Compliance Is The Starting Point, Not The Retrofit",
      body:
        "HIPAA, GDPR and SOC 2 controls are reviewed with your compliance team and designed into the architecture from the first sprint: least-privilege access, encrypted PHI, de-identified training data and immutable audit trails. Retrofitting them onto a finished product costs more and convinces nobody.",
    },
    {
      icon: "Layers",
      title: "We Integrate With Your EHR, We Do Not Replace It",
      body:
        "Our platforms sit alongside the systems of record through HL7, FHIR and DICOM interfaces, so new capability ships at product speed while the record your clinicians depend on keeps running untouched underneath.",
    },
    {
      icon: "Target",
      title: "Clinically Validated, Honestly Reported",
      body:
        "Models are evaluated on your own data, with performance reported by subgroup and the failure modes named. We provide 60 days of technical support and team training after delivery, and we will tell you when a model is not ready for a clinical decision.",
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
  title: "Our Blogs On AI And Clinical Innovation",
  body:
    "Explore our knowledge hub to stay current on clinical AI, interoperability and the practical side of shipping software into a regulated care setting.",
  posts: [
    {
      title: "Clinical AI In Production: What Changes After The Pilot",
      tag: "Clinical AI",
      image: blog1Img,
      alt: "A 3D visualisation of an artificial neural network",
    },
    {
      title: "FHIR Without The Fantasy: A Realistic Interoperability Playbook",
      tag: "Interoperability",
      image: blog2Img,
      alt: "An abstract rendering of biological complexity",
    },
    {
      title: "Ambient Scribes And The Documentation Burden: Reading The Evidence",
      tag: "Workflow",
      image: blog3Img,
      alt: "An abstract visual linking AI with medicine and biology",
    },
  ],
};

export const faqs = [
  {
    q: "How do AI healthcare software development services reduce clinician burnout?",
    a: "By removing the typing rather than adding another screen. Ambient capture drafts the encounter note, clinical NLP codes it and pre-fills the order set, and the clinician reviews and signs. The measured gains in published evaluations sit around a quarter to a third of documentation time. Meaningful, but not the 80% figure vendors quote.",
  },
  {
    q: "Is a custom healthcare platform HIPAA compliant out of the box?",
    a: "No product is compliant by itself; compliance is a property of the system, the contracts and the operating practice together. What we build in is the technical half: least-privilege access by role, PHI encrypted at rest and in transit, immutable audit logging, de-identification before model training, and a Business Associate Agreement in place before any data moves.",
  },
  {
    q: "Can you integrate with Epic, Cerner or our existing EHR?",
    a: "Yes, through HL7 v2 interfaces, FHIR R4 APIs and SMART on FHIR apps, depending on what your vendor exposes and what your integration team will approve. We design the layer so the EHR stays the system of record and our services stay outside it. That is what keeps the integration approvable and the upgrade path intact.",
  },
  {
    q: "How accurate is AI in medical imaging, honestly?",
    a: "On narrow, well-defined tasks with good training data (screening mammography, diabetic retinopathy, intracranial haemorrhage triage), performance is genuinely at or near specialist level. It degrades on rare presentations, unusual scanner protocols and populations under-represented in training. We report performance by subgroup and design the workflow so the model triages and flags rather than decides.",
  },
  {
    q: "What does interoperability actually require beyond supporting FHIR?",
    a: "A patient-matching strategy, terminology mapping across SNOMED CT, LOINC and ICD-10, and agreement on what each field means clinically. Speaking FHIR is the easy part; the work is reconciling four systems that each define an encounter differently. Budget for that mapping effort explicitly or it will surface as a delay later.",
  },
  {
    q: "How do you handle patient consent and data governance for AI training?",
    a: "Training runs on de-identified data by default, with a documented de-identification method and a re-identification risk assessment behind it. Where identifiable data is unavoidable we work within your existing research governance or ethics approval. Consent models differ by jurisdiction, so we design the data flow with your DPO or privacy officer rather than around them.",
  },
  {
    q: "Can AI reduce claim denials and revenue leakage?",
    a: "Yes, and it is one of the highest-return automations in healthcare because the feedback loop is fast and measurable. Computer-assisted coding improves documentation specificity, and denial-prediction models flag the claim and name the missing evidence before submission. The gain comes from fixing the claim, not appealing it.",
  },
  {
    q: "How long does it take to deliver a healthcare software platform?",
    a: "A scoped pilot on de-identified data typically runs eight to twelve weeks. A production clinical deployment depends far more on your governance, security review and integration approvals than on engineering time. Plan for those in parallel from week one rather than discovering them at go-live.",
  },
  {
    q: "Do you build software that needs FDA or MHRA clearance?",
    a: "We build to IEC 62304 and ISO 13485 expectations where a product falls under software-as-a-medical-device, and we work alongside your regulatory lead on the technical file. We are not a regulatory consultancy, and we will say so early rather than let a clearance pathway become a surprise.",
  },
  {
    q: "How much does custom healthcare software development cost?",
    a: "It depends on the regulatory surface, the state of your clinical data and how many systems you need to integrate with. A scoped pilot is the fastest route to a real number. Book a free session and we will size it honestly, including the parts we would not build yet.",
  },
];

export const finalCta = {
  title: "Grow Smarter, Grow Faster With Axiomra",
  subtitle:
    "Talk to our engineers and discover how custom AI healthcare software development services can lift administrative load, shorten diagnosis and keep patient data safe.",
  buttonText: "Get your project done!",
  background: finalCtaBgImg,
};
