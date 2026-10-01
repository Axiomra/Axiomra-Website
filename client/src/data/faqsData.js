/**
 * The FAQs page content. Categories drive the filter pills, so every question
 * must carry a `category` that exists in `faqCategories`.
 */

import { companyStats } from "./companyStats.js";

export const hero = {
  eyebrow: "Answers, not brochures",
  titleLead: "Everything People Ask Us",
  titleAccent: "Before Starting An AI Project",
  body: "Scope, cost, data handling, timelines and what happens after launch. The same answers we give on a first call.",
  searchLabel: "Search the questions",
  searchPlaceholder: 'Try "cost", "data" or "timeline"',
  popular: [
    "How much does an AI project cost?",
    "How long does a typical build take?",
    "Who owns the code and the data?",
  ],
};

export const faqCategories = [
  "About Axiomra",
  "Services & Industries",
  "Process & Timelines",
  "Integration",
  "Cost & ROI",
  "Support & Guarantees",
  "Technical",
];

export const faqItems = [
  {
    category: "About Axiomra",
    q: "Who is Axiomra and what do you actually do?",
    a: `We are an AI development company founded in 2021, with ${companyStats.experts}+ in-house engineers, data scientists and product specialists. We build production AI systems end to end: the model, the service around it, the interface people use and the infrastructure it runs on.`,
  },
  {
    category: "About Axiomra",
    q: "How is Axiomra different from other AI development companies?",
    a: "Most of the market sells prototypes. We ship systems that survive production traffic, and the engineers who scope your project are the ones who build it. No handover to an unnamed delivery pool after the contract is signed.",
  },
  {
    category: "About Axiomra",
    q: "Do you outsource any of the work?",
    a: "No. Every engineer on your project is on our payroll and in our office. That is why we can commit to a named team for the length of an engagement.",
  },
  {
    category: "About Axiomra",
    q: "How big a team will we work with?",
    a: "Typically three to six people: a lead engineer, one or two specialists in the relevant discipline, a product designer where there is an interface, and a technical project manager. You meet all of them before you sign.",
  },

  {
    category: "Services & Industries",
    q: "Which industries have you shipped into?",
    a: `Healthcare, finance, retail, fashion, education, real estate and logistics, across ${companyStats.projects}+ projects delivered or in progress. Where we lack sector depth we say so, and we price the discovery work honestly rather than learning on your budget.`,
  },
  {
    category: "Services & Industries",
    q: "Do you only build AI, or full products too?",
    a: "Full products. A model is rarely the deliverable. Most engagements include the backend service, the web interface, the data pipeline feeding it and the deployment story around all of it.",
  },
  {
    category: "Services & Industries",
    q: "Can you take over a project another team started?",
    a: "Yes. We start with a paid technical audit: what works, what is load-bearing, what has to be replaced. You get that assessment as a document whether or not you continue with us.",
  },
  {
    category: "Services & Industries",
    q: "Do you work with companies outside your time zone?",
    a: `We have shipped to clients in ${companyStats.countries}+ countries. Teams commit to four hours of daily overlap with your working day, and async written updates cover the rest.`,
  },

  {
    category: "Process & Timelines",
    q: "How long does a typical build take?",
    a: "A focused proof of concept runs four to six weeks. A production system with an interface, integrations and a deployment pipeline runs three to six months. Anything quoted at two weeks is a demo, and we will say so.",
  },
  {
    category: "Process & Timelines",
    q: "What does the first month look like?",
    a: "Week one is discovery on your data and constraints. Weeks two and three produce a working slice of the highest-risk part of the system. Week four is a demo plus a revised plan based on what we learned rather than what we guessed.",
  },
  {
    category: "Process & Timelines",
    q: "How do you handle changes to scope mid-project?",
    a: "Scope changes are expected, not punished. We work in two-week cycles with a re-prioritised backlog at the start of each. Anything that moves the end date gets flagged in writing before work starts, not in the invoice afterwards.",
  },
  {
    category: "Process & Timelines",
    q: "How often will we hear from you?",
    a: "A working demo every week, a written summary every Friday, and a shared board you can open at any hour. No status decks.",
  },

  {
    category: "Integration",
    q: "Can you integrate with the systems we already run?",
    a: "Yes. We build against your existing APIs, databases and identity provider rather than asking you to migrate. Where a legacy system has no API, we put a thin service layer in front of it instead of modifying it.",
  },
  {
    category: "Integration",
    q: "What if our data is messy or spread across systems?",
    a: "That is the normal starting condition. Part of discovery is mapping where the data lives and how bad it is, then building the ingestion and cleaning pipeline as a first-class part of the project rather than a hidden cost.",
  },
  {
    category: "Integration",
    q: "Can the system run entirely inside our own infrastructure?",
    a: "Yes. Open models, self-hosted vector stores and container deployments into your cloud account or on-premise hardware. This is the default for healthcare and financial clients with data residency requirements.",
  },
  {
    category: "Integration",
    q: "Will this work on mobile and on low bandwidth?",
    a: "Interfaces are built and tested on mid-range devices, not just a developer laptop. Where inference has to happen on device, we use quantised models sized for the hardware you actually ship on.",
  },

  {
    category: "Cost & ROI",
    q: "How much does an AI project cost?",
    a: `It depends on scope, but for calibration: a proof of concept typically lands between $${companyStats.pocRange.min}k and $${companyStats.pocRange.max}k, and a production system between $60k and $250k. We give a fixed price per phase after discovery, so you are never signing an open-ended hourly commitment.`,
  },
  {
    category: "Cost & ROI",
    q: "What ongoing costs should we plan for?",
    a: "Inference, hosting and monitoring. We model these during discovery with your expected volume, and we design around the number rather than discovering it in your first production bill.",
  },
  {
    category: "Cost & ROI",
    q: "How do you measure whether it worked?",
    a: "We agree on one primary metric before the build starts, whether that is hours saved per week, conversion, error rate or cost per transaction. Every demo reports against it.",
  },
  {
    category: "Cost & ROI",
    q: "When should we expect a return?",
    a: "Automation projects usually pay back within two quarters of going live because the saving is measurable from day one. Revenue-side projects take longer and carry more uncertainty. We will tell you which one you are buying.",
  },

  {
    category: "Support & Guarantees",
    q: "What happens after launch?",
    a: "You choose. Some clients take full handover with a documented runbook. Others keep us on a support retainer covering monitoring, model drift, dependency upgrades and a response-time commitment.",
  },
  {
    category: "Support & Guarantees",
    q: "Who owns the code and the models?",
    a: "You do, from the first commit. Repositories, cloud accounts, model weights and training artefacts are yours, and handover includes everything another team would need to continue without us.",
  },
  {
    category: "Support & Guarantees",
    q: "What if the model does not reach the accuracy we need?",
    a: "We set the accuracy bar together during discovery and test feasibility in the first phase, before you commit to a full build. If the data cannot support the target, you find out in week three and pay for three weeks, not six months.",
  },
  {
    category: "Support & Guarantees",
    q: "How do you handle security and confidentiality?",
    a: "NDAs before discovery, least-privilege access to your systems, secrets in a managed vault, and no client data in third-party training. Security review is part of the delivery checklist, not an afterthought.",
  },

  {
    category: "Technical",
    q: "Which models and frameworks do you work with?",
    a: "GPT-4o, Claude, Gemini, Llama 3 and Mistral on the language side, PyTorch and TensorFlow for custom models, and the usual production tooling around them. The full inventory sits on our tech stack page.",
  },
  {
    category: "Technical",
    q: "Can you fine-tune a model on our data?",
    a: "Yes, when fine-tuning is the right answer. Often it is not: retrieval over your documents is cheaper, faster to update and easier to audit. We test the cheap option first and only fine-tune when it measurably wins.",
  },
  {
    category: "Technical",
    q: "How do you stop a language model from making things up?",
    a: "Retrieval grounded in your own sources, structured outputs validated against a schema, refusal paths when confidence is low, and human review on anything with real consequences. Plus an evaluation suite that runs on every change.",
  },
  {
    category: "Technical",
    q: "How do you deploy and monitor models in production?",
    a: "Containerised services behind a versioned API, deployed through CI with a rollback path. Monitoring covers latency, cost per request, output quality samples and drift against a reference set, with alerts wired to whoever is on call.",
  },
];

export const helpBanner = {
  title: "Still have a question?",
  body: "Ask an engineer directly. No forms routed to a sales team, no scripted call.",
  ctaText: "Ask an engineer",
};
