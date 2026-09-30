/** Every string and image the Agentic AI detail page renders lives here. */
import heroAgent from "../assets/agentic-ai/hero-autonomous-agent.jpg";
import heroGraph from "../assets/agentic-ai/hero-agent-graph.jpg";
import heroChat from "../assets/agentic-ai/hero-agent-chat.jpg";
import businessChallenges from "../assets/agentic-ai/business-challenges.jpg";
import agentDevelopment from "../assets/agentic-ai/agent-development.jpg";
import enterpriseDeployment from "../assets/agentic-ai/enterprise-agent-deployment.jpg";
import conversationalAgents from "../assets/agentic-ai/conversational-agents.jpg";
import ragAsAService from "../assets/agentic-ai/rag-as-a-service.jpg";
import orchestration from "../assets/agentic-ai/multi-agent-orchestration.jpg";
import adaptiveWorkflow from "../assets/agentic-ai/adaptive-workflow-automation.jpg";
import observability from "../assets/agentic-ai/agent-observability.jpg";
import strategyConsulting from "../assets/agentic-ai/agent-strategy-consulting.jpg";
import caseSupport from "../assets/agentic-ai/case-study-support.jpg";
import caseFinance from "../assets/agentic-ai/case-study-finance.jpg";
import caseSupplyChain from "../assets/agentic-ai/case-study-supply-chain.jpg";
import trendsImage from "../assets/agentic-ai/agentic-trends.jpg";
import stackImage from "../assets/agentic-ai/agent-runtime-infra.jpg";
import toolCalling from "../assets/agentic-ai/agent-tool-calling.jpg";
import humanInTheLoop from "../assets/agentic-ai/human-in-the-loop.jpg";
import whyAxiomra from "../assets/agentic-ai/why-axiomra-agents.jpg";
import agentRoi from "../assets/agentic-ai/agent-roi.jpg";
import industriesImage from "../assets/agentic-ai/agentic-industries.jpg";

export const hero = {
  eyebrow: "Agentic AI Development Company",
  titleLead: "Agentic AI",
  titleAccent: "Development",
  titleTail: "for Connected Business Workflows",
  body: "Axiomra builds AI agents that plan tasks, use approved tools, and coordinate multi-step workflows. We define permissions, human approval points, and activity logging so your team can delegate routine work with appropriate oversight.",
  ctaText: "Book a Free Consultation",
  secondaryCtaText: "Explore Agent Solutions",
  proof: { rating: "4.8", reviews: "300+ companies", source: "Reviewed on Clutch" },
  stats: [
    { value: "60%", label: "Less manual workload" },
    { value: "24/7", label: "Agents on shift" },
    { value: "6-10", label: "Weeks to production" },
  ],
  images: [
    {
      src: heroAgent,
      alt: "Operator watching an autonomous agent run a live process across a control-room dashboard wall",
    },
    {
      src: heroGraph,
      alt: "Hand holding a wireframe head wired into a graph of delegated agent tasks",
    },
    {
      src: heroChat,
      alt: "Hands typing a prompt into an agent interface open on a laptop",
    },
  ],
};

/** Agent frameworks and runtimes we build on, a wordmark ticker under the hero. */
export const frameworkMarquee = [
  "LangGraph",
  "CrewAI",
  "AutoGen",
  "LangChain",
  "OpenAI Agents SDK",
  "Claude Agent SDK",
  "Model Context Protocol",
  "Temporal",
  "Semantic Kernel",
  "LlamaIndex",
  "Pydantic AI",
  "Ray Serve",
];

export const challenges = {
  eyebrow: "Where the manual work actually costs you",
  titleAccent: "Your Workflows Are Not Slow",
  titleLead: "Because Your People Are",
  body: "They are slow because every multi-step process still needs a human to open the next tab. Copy from the CRM, check the policy, wait for an approval, paste into the ERP. RPA scripts break the moment a field moves. Agentic AI removes the handoffs, not the people.",
  image: businessChallenges,
  imageAlt: "Leadership team reviewing a stalled process together in a boardroom",
  items: [
    {
      title: "Work stalls between systems, not inside them",
      body: "Your CRM, ERP, ticketing, and finance tools all work. The cost is the human glue between them. The lookups, re-keying, and status chasing that nobody has ever measured but everyone does daily.",
    },
    {
      title: "Rule-based automation breaks on the first exception",
      body: "RPA bots follow a recorded path. Change a field, add a supplier, get an unusual invoice, and the bot fails silently, so a person ends up reviewing the bot as well as doing the work.",
    },
    {
      title: "Chatbots answer questions but cannot finish jobs",
      body: "A support bot that can explain your refund policy but cannot issue the refund just moved the ticket, it did not close it. Deflection rates look good; queue length does not move.",
    },
    {
      title: "Nobody will approve AI they cannot audit",
      body: "The blocker on most agent projects is not accuracy, it is accountability. Without permissions, logs, and a human checkpoint on high-stakes steps, security and legal will stop the rollout.",
    },
  ],
};

export const services = {
  eyebrow: "What we build for you",
  titleAccent: "End-To-End Agentic AI Development",
  titleLead: "For Teams That Need It Working, Not Demoed",
  subtitle:
    "We do not ship agent demos. We ship agents that run in production, integrate with your existing stack, and carry a number you can defend to a CFO. Whether you need one autonomous agent or a full multi-agent system, these are the layers we cover.",
  items: [
    {
      id: "agent-development",
      title: "Agent Development & Integration",
      image: agentDevelopment,
      imageAlt: "Developer building agent integrations across a dual-monitor workstation",
      body: "We design and build custom agents around your actual workflows, tools, and data, not a template. From a single-task agent that clears one queue to a reasoning system that handles a whole process, each one is wired into your APIs, databases, and enterprise platforms so it is doing real work from the first week.",
      bullets: [
        "Workflow decomposition into agent-sized tasks",
        "Tool and function-calling layer over your APIs",
        "Memory, state, and long-running task handling",
        "Native connectors for CRM, ERP, ticketing, and data warehouse",
      ],
    },
    {
      id: "enterprise-deployment",
      title: "Enterprise Agent Deployment",
      image: enterpriseDeployment,
      imageAlt: "Rack-mounted servers running containerised production agents in a data centre",
      body: "Most AI projects die between prototype and production. We treat deployment as part of the build: agents are containerised, secured, monitored, and scaled across cloud, on-premise, or hybrid environments, with rollout staged so nothing in your current operation stops working while it happens.",
      bullets: [
        "Containerised agent runtime with autoscaling",
        "Cloud, on-premise, air-gapped, or hybrid",
        "Blue-green rollout beside the manual process",
        "Cost ceilings and token budgets per agent",
      ],
    },
    {
      id: "conversational-agents",
      title: "Conversational AI Agents",
      image: conversationalAgents,
      imageAlt:
        "AI assistant interface answering a live conversation across voice, chat, and search",
      body: "Agents that go past chat: they read intent, retrieve current facts through RAG, take action across your systems, and hold context across a long conversation. Ideal for customer support, internal helpdesks, sales assistants, and HR, anywhere the answer is only useful if something happens afterwards.",
      bullets: [
        "Intent, entity, and escalation handling",
        "Actions on live systems, not just replies",
        "Cited answers pulled from your own sources",
        "Voice, web, WhatsApp, Slack, and Teams channels",
      ],
    },
    {
      id: "rag-as-a-service",
      title: "RAG As A Service",
      image: ragAsAService,
      imageAlt:
        "Search query running over an internal knowledge base to retrieve the source behind an answer",
      body: "Hallucinations kill enterprise adoption faster than anything else. Our RAG service connects your agents to your proprietary documents, databases, knowledge bases, and APIs, so every answer is grounded in a source your team can open, with retrieval quality measured rather than assumed.",
      bullets: [
        "Chunking, embedding, and re-ranking tuned on your corpus",
        "Hybrid vector plus keyword retrieval",
        "Source citations on every generated answer",
        "Freshness pipelines so the index never goes stale",
      ],
    },
    {
      id: "agent-orchestration",
      title: "Intelligent Agent Orchestration",
      image: orchestration,
      imageAlt:
        "Linked node graph on screen showing specialised agents delegating work between them",
      body: "Complex processes need several agents working in sync. We architect multi-agent systems where specialised agents collaborate, delegate, share context, and resolve conflicts: supervisor patterns, hand-off protocols, and shared memory built on LangGraph, CrewAI, and AutoGen to deliver outcomes no single agent reaches alone.",
      bullets: [
        "Supervisor and worker agent topologies",
        "Deterministic hand-offs with typed contracts",
        "Shared memory and conflict resolution rules",
        "Replayable traces of every delegation",
      ],
    },
    {
      id: "adaptive-automation",
      title: "Adaptive Workflow Automation",
      image: adaptiveWorkflow,
      imageAlt:
        "Analyst working with an AI assistant that routes files and tasks through a workflow automatically",
      body: "Unlike rigid RPA, our agentic workflows adapt to changing conditions, handle exceptions with judgement instead of failing, and improve as they run. We replace brittle rule trees with agents that read context, decide, and execute end-to-end, and that flag rather than guess when something is genuinely new.",
      bullets: [
        "Exception handling instead of hard failure",
        "Dynamic routing based on live context",
        "Feedback loops that tighten accuracy over time",
        "Side-by-side benchmarks against your current process",
      ],
    },
    {
      id: "agent-governance",
      title: "Agent Observability & Governance",
      image: observability,
      imageAlt: "Profiler trace on a laptop showing an agent run measured step by step",
      body: "Enterprise AI needs accountability. We give you real-time monitoring, full decision and tool-call audit trails, explainability dashboards, and human-in-the-loop controls, so your agents stay inside defined boundaries, satisfy your regulators, and stay reviewable long after go-live.",
      bullets: [
        "Trace of every prompt, tool call, and outcome",
        "Cost, latency, and success-rate dashboards",
        "Approval gates on high-stakes actions",
        "Drift and regression alerts with rollback",
      ],
    },
    {
      id: "agent-strategy",
      title: "Agentic AI Strategy & Consulting",
      image: strategyConsulting,
      imageAlt: "Team mapping automation candidates across a wall of sticky notes in a workshop",
      body: "Not sure where to start? Our consultants work with your leadership and technical teams to find the highest-ROI automation candidates, define the agent architecture around them, and sequence a phased plan, so you invest in the right agents, in the right order, and can stop after phase one if the numbers do not hold.",
      bullets: [
        "Process audit scored by volume, cost, and risk",
        "Agent architecture and build-versus-buy call",
        "Phased roadmap with a measurable phase-one target",
        "Honest no when agentic AI is the wrong tool",
      ],
    },
  ],
};

export const agentTypes = {
  eyebrow: "Types of agents we build",
  titleAccent: "The Right Agent Architecture",
  titleLead: "For Every Business Problem",
  subtitle:
    "Not all agents work the same way, and picking the wrong class is the most expensive mistake on an agent project. We build all six, so the architecture follows the problem instead of whatever framework was trending that quarter.",
  items: [
    {
      name: "Reactive Agents",
      summary: "Fast, stateless, rule-matched execution.",
      body: "Reactive agents are built for speed. They read an incoming condition, match it against defined rules, and act immediately, no memory, no planning, just fast and accurate execution. A support triage agent that reads every inbound ticket, detects urgency and topic, and routes it to the right team in under a second is a reactive agent.",
      best: "High-volume routing, triage, classification, and alerting",
      tags: ["Sub-second", "Stateless", "High throughput"],
    },
    {
      name: "Deliberative Agents",
      summary: "Plan first, then execute against a goal.",
      body: "Deliberative agents build an internal model of the task, plan a route to the goal, and then execute it step by step, re-planning when reality disagrees with the plan. This is the class you want when the work has ordering constraints: a procurement agent that must check budget, verify a supplier, and raise a PO in that order.",
      best: "Multi-step processes with dependencies and constraints",
      tags: ["Planning", "Goal-directed", "Re-planning"],
    },
    {
      name: "Collaborative Multi-Agent Systems",
      summary: "Specialists that delegate and negotiate.",
      body: "Several narrow agents beat one general one on complex work. A supervisor decomposes the request, specialists handle their own slice, and results are merged with explicit conflict rules. Finance, sales, and operations agents can share the same context without sharing the same prompt or the same permissions.",
      best: "Cross-functional processes that span teams and systems",
      tags: ["Supervisor pattern", "Delegation", "Shared memory"],
    },
    {
      name: "Generative Agents",
      summary: "Produce artefacts, not just decisions.",
      body: "Generative agents create the output the process actually needs (a drafted response, a report, a contract summary, a campaign variant) grounded in retrieved facts rather than invented from the prompt. They pair naturally with a reviewer agent that checks the artefact before a human ever sees it.",
      best: "Reporting, drafting, summarisation, and content operations",
      tags: ["RAG-grounded", "Reviewed output", "Brand-aligned"],
    },
    {
      name: "Learning Agents",
      summary: "Improve from outcomes and feedback.",
      body: "Learning agents track their own results, compare them against the outcome you cared about, and adjust behaviour: through feedback loops, example banks, and periodic evaluation rather than blind retraining. The longer they run, the closer they get to how your best operator would have handled it.",
      best: "Work where quality is judged after the fact, not in the moment",
      tags: ["Feedback loops", "Eval harness", "Self-correcting"],
    },
    {
      name: "Hybrid Agents",
      summary: "Reactive speed with deliberative judgement.",
      body: "Most production systems end up hybrid: a fast reactive layer handles the ninety percent of traffic that is routine, and escalates the rest to a deliberative or collaborative layer that can think. It is also the cheapest architecture to run, because the expensive reasoning path is only taken when it is earned.",
      best: "Anything at real volume with a long tail of hard cases",
      tags: ["Tiered routing", "Cost-aware", "Production default"],
    },
  ],
};

/** The ReAct loop section, the architectural centrepiece of the page. */
export const reactLoop = {
  eyebrow: "How agentic AI actually works",
  titleAccent: "The Architecture Behind Agents",
  titleLead: "That Get Work Finished",
  body: "Most AI tools answer questions. Agentic systems take action. The difference is architecture: how an agent thinks, decides, and executes without waiting for a human to direct every step. Every agent Axiomra builds runs on a reason-act cycle rather than a single generation.",
  steps: [
    {
      key: "reason",
      title: "Reason",
      body: "Reads the task, breaks it into steps, and decides what to do next.",
    },
    {
      key: "act",
      title: "Act",
      body: "Calls a tool, queries a database, or triggers an API in your stack.",
    },
    {
      key: "observe",
      title: "Observe",
      body: "Reads the real result and checks it against the goal it was given.",
    },
    {
      key: "repeat",
      title: "Repeat",
      body: "Not done? Reason again with what it just learned and take the next action.",
    },
  ],
  note: "In one of our deployments this loop collects data from six systems, validates its own assumptions, and produces a structured report in under fifteen minutes, work that took an analyst four to six hours.",
  capabilities: {
    title: "Built for what enterprise agents actually need",
    subtitle:
      "Agents that handle complex work, connect to real systems, stay inside their permissions, and improve over time. Here is what ships as standard.",
    rows: [
      {
        capability: "Tool and API calling",
        meaning: "Agents that connect to your CRM, ERP, databases, and third-party tools",
      },
      {
        capability: "Human-in-the-loop controls",
        meaning: "Manual review checkpoints built into high-stakes steps of the workflow",
      },
      {
        capability: "Role-based access control",
        meaning: "Agents reach only the data and actions they are explicitly authorised for",
      },
      {
        capability: "Audit trails and logging",
        meaning: "A full, replayable record of every agent decision, tool call, and outcome",
      },
      {
        capability: "Cloud, on-premise, and hybrid",
        meaning: "Deployed into whatever environment your security posture requires",
      },
      {
        capability: "Evaluation and regression suites",
        meaning: "Every change measured against a fixed test set before it reaches production",
      },
    ],
  },
};

/**
 * The agent cycle, one lap at a time. `reactLoop` above answers "what is the
 * architecture"; this answers "what happens on a single run", with the trace
 * lines an operator would actually see in the log.
 */
export const workflow = {
  eyebrow: "Inside one agent cycle",
  titleAccent: "Perceive, Reason, Act, Learn",
  titleLead: "Then Round Again Until The Job Is Done",
  body: "An agent is not one call to a model. It is a loop: it reads the situation, decides the next move and writes down why, executes against your real systems, then measures what actually happened and carries that forward. Follow one supplier invoice through all four stages.",
  image: toolCalling,
  imageAlt:
    "Agent console surrounded by the dashboards, chat panel, and command prompt it drives on each pass of the loop",
  imageCaption: "One loop, four stages, every pass logged",
  loopBackLabel: "Repeat",
  scenario: "Worked example: a supplier invoice that does not match its purchase order",
  footnote:
    "The loop exits on one of two conditions: the goal is met, or the agent hits a boundary you defined and escalates to a named human with its full reasoning attached. It does not guess its way past a wall.",
  stages: [
    {
      key: "perceive",
      title: "Perceive",
      caption: "Read the whole situation",
      body: "The agent takes in the trigger and everything around it: the inbound document, the matching records in your systems, the contract it sits under, and how similar cases went before. Structured rows and unstructured PDFs both, retrieved with the source kept attached.",
      points: [
        "Event, webhook, schedule, or document triggers",
        "Structured records and unstructured files together",
        "Context retrieved through RAG, with citations kept",
      ],
      trace: [
        "invoice.received   vendor=NORTHWIND  total=48,210",
        "retrieve           po_44192 · contract_v3 · 6mo exceptions",
      ],
    },
    {
      key: "reason",
      title: "Reason",
      caption: "Decide the next move, in writing",
      body: "It compares what it sees against the goal and the rules it was given, breaks the job into ordered steps, and picks the next one. The rationale is written to the trace before anything executes, so a reviewer can disagree with the thinking rather than guess at it.",
      points: [
        "Goal decomposed into ordered, checkable steps",
        "Policy, budget, and permission checks before acting",
        "A written rationale stored against every decision",
      ],
      trace: [
        "compare            po_44192 ↔ invoice → qty ok, unit_price +6.2%",
        "plan               1 verify clause · 2 notify vendor · 3 hold payment",
      ],
    },
    {
      key: "act",
      title: "Act",
      caption: "Call the real tools",
      body: "The agent executes through a permissioned tool layer wired into your ERP, CRM, ticketing, and data warehouse. Routine steps go straight through. Anything above the threshold you set stops at an approval gate with a named owner, not a silent auto-approve.",
      points: [
        "Function calls over your APIs, never screen scraping",
        "Scoped credentials per agent and per action",
        "Approval gate on every high-stakes step",
      ],
      trace: [
        "tool               erp.hold_payment(inv_88301) → ok",
        "gate               >25k requires approval → queued to finance lead",
      ],
    },
    {
      key: "learn",
      title: "Learn",
      caption: "Close the loop on the outcome",
      body: "It reads the real result, compares it against what it expected, and feeds the gap back: a corrected example, a tightened threshold, a new case in the evaluation suite. Every human correction is captured once and reused, so next month's run is measurably better than this one.",
      points: [
        "Outcome measured against expectation on every run",
        "Human corrections captured as training examples",
        "Regression suite re-run before any change ships",
      ],
      trace: [
        "outcome            resolved in 4m12s (manual baseline 3d)",
        "eval               price_tolerance 5% → 3% · suite 128/130 pass",
      ],
    },
  ],
};

export const caseStudies = {
  eyebrow: "Real work, real numbers",
  titleLead: "Agentic AI Systems",
  titleAccent: "We Have Shipped For Real Businesses",
  subtitle:
    "These are not concept projects. Each one is a production system solving a named business problem, integrated with live data, and reporting a measurable outcome. This is what our agentic AI development services look like in practice.",
  items: [
    {
      name: "Customer operations",
      title: "Support Agent For A Subscription Platform",
      image: caseSupport,
      imageAlt:
        "Support agent working a live queue beside the AI agent that resolves tickets end to end",
      problem:
        "A subscription business was answering the same forty questions forever, and its chatbot could explain policy but never execute it. Every refund, plan change, and address update still landed in a human queue.",
      solution:
        "We built a conversational agent grounded in their help centre and billing docs, wired to their billing API with scoped permissions. It resolves routine requests itself, executes the change, and escalates anything outside its boundary with the full context attached.",
      results: [
        { value: "68%", label: "Tickets resolved without a human" },
        { value: "4 min", label: "Average handling time, down from 19" },
        { value: "0", label: "Unauthorised billing actions" },
      ],
    },
    {
      name: "Finance operations",
      title: "Invoice And Exception Agent For A Distributor",
      image: caseFinance,
      imageAlt:
        "Advisors reviewing an agent-generated exception report in front of a live market board",
      problem:
        "Three-way matching between invoices, purchase orders, and receipts was manual. Exceptions piled up at month end, and the team was closing four days late every single quarter.",
      solution:
        "A deliberative agent extracts invoice data, matches it against POs and goods receipts, routes clean items straight through, and prepares a ranked exception queue with its reasoning attached for anything that fails. Approvals above a threshold still require a human.",
      results: [
        { value: "83%", label: "Invoices straight-through processed" },
        { value: "3 days", label: "Faster month-end close" },
        { value: "1.4%", label: "Exception error rate" },
      ],
    },
    {
      name: "Supply chain",
      title: "Multi-Agent Replenishment For A Retail Group",
      image: caseSupplyChain,
      imageAlt:
        "Warehouse operator checking stock the agents track across suppliers and shipping lanes",
      problem:
        "Stockouts were being noticed after they happened. Buyers watched dashboards, suppliers were compared by hand, and a delayed shipment surfaced days late.",
      solution:
        "Three specialised agents (demand, supplier, and logistics) share context under a supervisor. They detect shortage risk early, weigh alternative suppliers on cost and lead time, and prepare reorder recommendations for a buyer to approve in one click.",
      results: [
        { value: "41%", label: "Fewer stockout incidents" },
        { value: "12h", label: "Earlier disruption detection" },
        { value: "6", label: "Weeks to first production agent" },
      ],
    },
  ],
};

export const useCases = {
  eyebrow: "Real problems, real results",
  titleAccent: "How Businesses Are Using Agentic AI",
  titleLead: "To Get More Done",
  subtitle:
    "Agentic AI is not a future concept. Teams across industries already run autonomous agents to cut cost, speed up operations, and absorb work that used to need a whole desk. Here is what that looks like in practice.",
  items: [
    {
      icon: "support",
      name: "Customer support automation",
      body: "Agents read the incoming message, understand the issue, pull the customer's record from your CRM, and either resolve it or route it to the right person with context attached: in seconds, not after a queue.",
      bullets: [
        "Resolution, not just deflection",
        "Context-complete escalations",
        "3x query volume at the same headcount",
      ],
    },
    {
      icon: "sales",
      name: "Sales pipeline management",
      body: "Agents watch your CRM, track deal stages, send follow-ups at the right moment, keep records updated, and flag deals going cold before a manager notices, so reps spend their time closing instead of on admin.",
      bullets: [
        "Automatic CRM hygiene",
        "Timed, context-aware follow-ups",
        "Early warning on at-risk deals",
      ],
    },
    {
      icon: "finance",
      name: "Finance and invoice processing",
      body: "Agents extract data from inbound invoices, match against purchase orders, flag discrepancies, route approvals to the right stakeholder, and post to your accounting system, days of work compressed into hours.",
      bullets: [
        "Three-way matching, automated",
        "Ranked exception queue with reasoning",
        "Threshold-based human approval",
      ],
    },
    {
      icon: "hr",
      name: "HR and recruitment automation",
      body: "Agents screen inbound applications against your criteria, run first-round screening questions, schedule interviews across calendars, and keep every candidate updated, so HR spends its time on final-stage judgement.",
      bullets: [
        "Criteria-scored shortlists",
        "Calendar-aware scheduling",
        "Up to 50% shorter time-to-hire",
      ],
    },
    {
      icon: "supply",
      name: "Supply chain and inventory",
      body: "Agents monitor stock levels, track supplier performance, detect shortage risk before it lands, and trigger reorder workflows, evaluating alternative suppliers on cost and lead time when a disruption hits.",
      bullets: [
        "Predictive shortage detection",
        "Supplier comparison on live data",
        "Reorder drafted, human approved",
      ],
    },
    {
      icon: "marketing",
      name: "Marketing campaign execution",
      body: "Agents build audience segments, generate on-brand copy variants, launch across channels, watch performance in real time, and move budget toward what is working, so marketers work on strategy, not campaign setup.",
      bullets: [
        "Segment and variant generation",
        "Cross-channel launch and monitoring",
        "Automatic budget reallocation",
      ],
    },
  ],
};

export const trends = {
  eyebrow: "What is changing right now",
  titleAccent: "Agentic AI Trends Shaping",
  titleLead: "How Businesses Will Operate In 2026",
  body: "Agentic AI is moving fast, and the businesses that understand where it is going are the ones building the right systems today. Here are the three shifts that are already changing what a competent operation looks like, and what each one means for you.",
  image: trendsImage,
  imageAlt:
    "Analysts working inside a projected operations environment driven by autonomous agents",
  items: [
    {
      title: "LLM-orchestrated multi-agent systems",
      body: "Businesses are moving past single-purpose AI tools. The new standard is a network of agents, each owning a specific job, coordinated by a model that manages priorities, delegates tasks, and keeps everything in sync. Finance, sales, operations, and support can run as one connected system with no manual handoffs and no data silos, teams running multi-agent setups report materially faster process completion than single-agent equivalents.",
    },
    {
      title: "Integration with digital twins",
      body: "Digital twins are virtual replicas of real operations: a factory floor, a supply chain, a customer journey, a financial model. When agents connect to a twin, they simulate the outcome before acting in the real world, so they stop guessing and start validating. That cuts costly errors and gives decision-makers a live view of what the agent is doing and why.",
    },
    {
      title: "Autonomous learning and self-improvement",
      body: "The next generation of agents does not need constant retraining. Using feedback loops and structured evaluation, they track their own performance, identify what is working, and adjust behaviour automatically. Agents that improve as they run reduce long-term maintenance cost and increase ROI the longer they stay in production.",
    },
  ],
};

export const industries = {
  eyebrow: "Industries we serve",
  titleAccent: "Agentic AI Solutions",
  titleLead: "Built Around Your Industry's Rules",
  subtitle:
    "We build agent systems for businesses across industries. Each one is designed around the specific workflows, data, and constraints of that sector, because a healthcare agent and a retail agent fail in completely different ways.",
  image: industriesImage,
  imageAlt: "Freight yard seen from above, one of the many industries running agents in production",
  items: [
    {
      name: "Healthcare",
      body: "Autonomous agents that reduce administrative load and support clinical teams with faster, better-evidenced decisions, without ever taking a clinical action unsupervised.",
      bullets: [
        "Clinical documentation and EHR data processing",
        "Appointment scheduling and follow-up management",
        "Prior authorisation and claims processing",
        "Patient risk stratification with clinician sign-off",
        "Remote monitoring and real-time alert triage",
      ],
    },
    {
      name: "Finance and fintech",
      body: "Agents that handle the reconciliation, review, and reporting load in regulated finance operations, with every action logged and every threshold enforced.",
      bullets: [
        "Invoice matching and exception handling",
        "KYC and onboarding document review",
        "Transaction monitoring with analyst escalation",
        "Regulatory reporting preparation",
        "Portfolio and covenant monitoring",
      ],
    },
    {
      name: "Retail and e-commerce",
      body: "Agents across the full commerce loop, from what a customer asks before buying to what happens in the warehouse afterwards.",
      bullets: [
        "Pre-purchase product and fitment assistants",
        "Order, return, and refund execution",
        "Dynamic pricing and promotion monitoring",
        "Inventory replenishment recommendations",
        "Catalogue enrichment and deduplication",
      ],
    },
    {
      name: "Logistics and supply chain",
      body: "Multi-agent systems that watch the network continuously and act on disruption before it reaches a customer.",
      bullets: [
        "Shortage and delay prediction",
        "Supplier evaluation on cost and lead time",
        "Route and carrier selection",
        "Shipment exception handling",
        "Automated customs and document preparation",
      ],
    },
    {
      name: "Insurance",
      body: "Agents that compress the paperwork half of insurance while leaving the judgement half with your underwriters and adjusters.",
      bullets: [
        "First notice of loss intake and triage",
        "Claims document extraction and validation",
        "Fraud signal detection with human review",
        "Policy servicing and endorsement handling",
        "Renewal and retention outreach",
      ],
    },
    {
      name: "Professional and legal services",
      body: "Agents that handle the research, extraction, and drafting layer so billable hours go to the work only a professional can do.",
      bullets: [
        "Contract review and clause extraction",
        "Matter intake and conflict checking",
        "Research summarisation with citations",
        "Deadline and obligation tracking",
        "Document assembly from precedent",
      ],
    },
  ],
};

export const security = {
  eyebrow: "Controls agreed before deployment",
  titleAccent: "Security, Access, And Control",
  titleLead: "Agreed Before Any Agent Goes Live",
  subtitle:
    "Agents that connect to your systems, handle business data, and take actions need clear boundaries. The controls below are defined with your team during design and confirmed before the agent goes live.",
  items: [
    {
      title: "Access controls",
      body: "Every agent is scoped to only the data and systems it needs. Role-based permissions are defined before deployment, so an agent cannot read, modify, or share anything outside its boundary, even if it is asked to.",
    },
    {
      title: "Data handling",
      body: "Data handling for each agent is agreed with your team before deployment: where data is stored, how it moves between systems, how long it is retained, and the terms covering model training. Encryption and access scope are confirmed in writing as part of the engagement.",
    },
    {
      title: "Human oversight",
      body: "For high-stakes decisions we build manual review checkpoints directly into the agent workflow. The agent does the work; a human approves the outcome before any irreversible action is taken.",
    },
    {
      title: "Fallback behaviour",
      body: "When an agent hits a situation it was not designed for, it does not guess and it does not fail silently. Fallback logic stops the workflow, flags the case, and routes it to the right person with the trace attached.",
    },
    {
      title: "Model risk reduction",
      body: "Every agent is tested against edge cases, adversarial inputs, and failure scenarios before go-live. Prompt injection defence, tool-call validation, and output checking ship as standard, not as an upgrade.",
    },
    {
      title: "Requirements-aware design",
      body: "For regulated sectors such as healthcare, finance, and insurance, the applicable requirements are reviewed with your compliance team at the design stage, and the agent architecture is built around what they confirm.",
    },
  ],
};

export const techStack = {
  eyebrow: "Our technology stack",
  titleAccent: "The Technology Behind Our",
  titleLead: "Agentic AI Development Services",
  subtitle:
    "We build agent systems on proven, production-grade tooling. Every choice in this stack is made for reliability, observability, and how well it fits the agent architecture, not for how new it is.",
  image: stackImage,
  imageAlt: "Agent runtime running on rack infrastructure inside a monitored data centre",
  groups: [
    {
      name: "Agent frameworks",
      tools: [
        "LangGraph",
        "CrewAI",
        "AutoGen",
        "OpenAI Agents SDK",
        "Claude Agent SDK",
        "Semantic Kernel",
      ],
    },
    {
      name: "Reasoning models",
      tools: ["Claude Opus", "Claude Sonnet", "GPT-4o", "Gemini Pro", "Llama 3", "Mistral Large"],
    },
    {
      name: "Tooling and protocols",
      tools: ["Model Context Protocol", "OpenAPI", "gRPC", "Webhooks", "Zapier", "n8n"],
    },
    {
      name: "Retrieval and memory",
      tools: ["pgvector", "Pinecone", "Weaviate", "Qdrant", "Redis", "LlamaIndex"],
    },
    {
      name: "Orchestration and durability",
      tools: ["Temporal", "Celery", "Airflow", "Ray Serve", "Kafka", "RabbitMQ"],
    },
    {
      name: "Observability and evals",
      tools: ["LangSmith", "Langfuse", "OpenTelemetry", "Prometheus", "Grafana", "Promptfoo"],
    },
    {
      name: "Runtime and infrastructure",
      tools: ["Kubernetes", "Docker", "AWS", "Azure", "GCP", "Terraform"],
    },
    {
      name: "Security and governance",
      tools: ["Vault", "OPA", "Keycloak", "Presidio", "Guardrails", "Audit logging"],
    },
  ],
};

export const process = {
  eyebrow: "How we build agentic AI systems",
  titleAccent: "Our Agentic AI Development",
  titleLead: "Process, Start To Handover",
  body: "We follow a structured process built to reduce risk, keep you informed, and make sure the finished system fits how your business actually runs. Every stage has an exit you can take if the numbers stop making sense.",
  ctaText: "Talk To An Agent Engineer",
  steps: [
    {
      title: "Discovery and process audit",
      body: "We map the workflow as it is really performed (including the shortcuts nobody documented) and score each step by volume, cost, and risk to find where an agent earns its keep.",
    },
    {
      title: "Use case scoping",
      body: "We define exactly what the agent must do, what success looks like, and where its boundaries are. Success metrics are agreed here, before a line of code, so performance is never argued about later.",
    },
    {
      title: "Agent architecture design",
      body: "We choose the agent class, the topology, the tools it may call, and the model behind each step, then write it down as an architecture your engineers can challenge.",
    },
    {
      title: "Data and tool integration",
      body: "We connect the agent to your systems through scoped, typed interfaces, with retrieval pipelines built and evaluated against real queries from your business.",
    },
    {
      title: "Guardrails and evaluation harness",
      body: "Permissions, approval gates, fallback paths, and a fixed evaluation set go in before the pilot, so every later change can be measured instead of eyeballed.",
    },
    {
      title: "Pilot in a live environment",
      body: "The agent runs beside your existing process on real traffic. You see its decisions, its costs, and its error cases with nothing at stake operationally.",
    },
    {
      title: "Production rollout",
      body: "Staged cutover with monitoring, cost ceilings, alerting, and a documented rollback. We move volume onto the agent only as fast as the numbers justify.",
    },
    {
      title: "60 days of tuning and support",
      body: "After go-live we stay on: fixing issues, tuning agent behaviour, training your team, and handing over a system your people can run without us.",
    },
  ],
};

export const outcomes = {
  eyebrow: "When we say ROI, we mean it",
  titleAccent: "What Changes",
  titleLead: "Once The Agents Are Running",
  image: agentRoi,
  imageAlt: "Lead reviewing agent performance on a wall-mounted operations dashboard",
  items: [
    {
      value: "60%",
      title: "Less manual workload",
      body: "Repetitive multi-step work moves off your team's desk. The hours come back to the work that actually needs a person.",
    },
    {
      value: "3x",
      title: "Throughput at the same headcount",
      body: "Support, finance, and operations queues absorb far more volume without a hiring round behind them.",
    },
    {
      value: "24/7",
      title: "Operations that never close",
      body: "Agents work through nights, weekends, and peak season at exactly the same quality as a Tuesday morning.",
    },
    {
      value: "83%",
      title: "Straight-through processing",
      body: "Routine cases complete end-to-end without a human touch, leaving only genuine exceptions for review.",
    },
    {
      value: "100%",
      title: "Decisions with an audit trail",
      body: "Every action an agent takes is logged, explainable, and replayable, which is what gets the rollout approved.",
    },
    {
      value: "6-10",
      title: "Weeks to production",
      body: "From first call to an agent handling real volume, with a working pilot on live data well before that.",
    },
  ],
};

export const whyUs = {
  eyebrow: "Why Axiomra",
  titleAccent: "Why Choose Axiomra",
  titleLead: "for Agentic AI Development",
  body: "We bring together workflow design, system integration, testing, and team enablement. Our approach helps you move from a promising use case to an operational agent system, supported through launch and the agreed support period.",
  ctaText: "Book a Free Agentic AI Consultation",
  image: whyAxiomra,
  imageAlt:
    "Axiomra team working through an agent architecture against live dashboards with a client",
  humanImage: humanInTheLoop,
  humanImageAlt: "Human hand and robotic hand meeting over a shared decision",
  stats: [
    { value: "500+", label: "AI projects delivered" },
    { value: "25+", label: "In-house engineers" },
    { value: "60", label: "Days of post-launch support" },
    { value: "4+", label: "Countries served" },
  ],
  reasons: [
    {
      title: "Built for Operational Use",
      body: "We test agent behaviour, connect the required tools, and validate the workflow against agreed acceptance criteria before deployment.",
    },
    {
      title: "Training for the People Who Use It",
      body: "Your team learns how to review outputs, manage exceptions, and supervise agent actions.",
    },
    {
      title: "60 Days of Engineering Support",
      body: "We help resolve early issues and tune behaviour based on actual usage, within the agreed post-launch support scope.",
    },
    {
      title: "The Right Solution for Your Workflow",
      body: "We assess the simplest effective approach to your problem. Depending on the task, that may be a workflow improvement, conventional automation, or an AI agent. Our recommendation considers cost, complexity, and expected value.",
    },
  ],
  humanLoopPoints: [
    "Agents act inside explicit permission boundaries, defined before deployment.",
    "High-stakes actions pause for human approval, with the reasoning attached.",
    "Every prompt, tool call, and outcome is logged and replayable.",
    "Data location, retention, and model-training terms are agreed with your team and written into the engagement.",
  ],
};

export const faqs = [
  {
    q: "What are agentic AI development services?",
    a: "Agentic AI development is the design and delivery of AI systems that act, not just answer. An agent plans a task, calls your tools and APIs, observes what happened, and keeps going until the goal is met. Our services cover the whole stack: strategy, architecture, build, integration, deployment, governance, and support.",
  },
  {
    q: "How is agentic AI different from traditional AI or RPA?",
    a: "Traditional AI classifies or predicts. RPA replays a recorded sequence of clicks and breaks when anything moves. An agent reasons about the goal, chooses which tool to use, handles exceptions with judgement, and adapts when conditions change, which is why it survives the messy ten percent that breaks rule-based automation.",
  },
  {
    q: "What types of AI agents does Axiomra build?",
    a: "All six major classes: reactive, deliberative, collaborative multi-agent, generative, learning, and hybrid. Most production systems end up hybrid: a fast reactive layer for routine volume, escalating to a reasoning layer for the hard cases, which is also the cheapest architecture to run.",
  },
  {
    q: "How long does it take to build and deploy an agentic AI system?",
    a: "It depends on the scope of the workflow, the number of systems the agent has to integrate with, and how your security review is run. We share an indicative schedule after the discovery session and confirm dates once the scope is agreed.",
  },
  {
    q: "Do I need to replace my existing systems to use agentic AI?",
    a: "No. Agents sit on top of what you already run. We integrate through your existing APIs, databases, and platforms. If a system has no API, we work through the supported integration path rather than asking you to migrate.",
  },
  {
    q: "What is multi-agent orchestration and do I actually need it?",
    a: "It is several specialised agents working under a supervisor, delegating and sharing context. You need it when a process spans functions, finance plus procurement plus logistics, for example. For a single well-bounded workflow, one agent is simpler, cheaper, and easier to debug, and we will say so.",
  },
  {
    q: "How do you make sure agents stay within safe boundaries?",
    a: "Role-based permissions scoped before deployment, approval gates on high-stakes actions, validated tool calls, explicit fallback behaviour instead of guessing, and a full audit trail of every decision. Agents are also tested against adversarial inputs and prompt injection before go-live.",
  },
  {
    q: "What is RAG and why do agents need it?",
    a: "Retrieval-Augmented Generation grounds an agent's answers in your own documents, databases, and knowledge bases instead of the model's memory. It is what turns a plausible answer into a correct one with a citation your team can open, and it is the single biggest lever on enterprise trust.",
  },
  {
    q: "Can agentic AI work for a small or mid-sized business?",
    a: "Yes, and often faster than for an enterprise, because there are fewer systems and fewer approval layers. The economics are the same: if a repetitive multi-step process runs at volume, an agent can pay for itself. If it does not, we will tell you before you spend anything.",
  },
  {
    q: "What is the difference between an AI agent and a chatbot?",
    a: "A chatbot produces a reply. An agent produces an outcome. The chatbot can explain your refund policy; the agent checks eligibility, issues the refund, updates the record, and notifies the customer, inside the permissions you granted it.",
  },
  {
    q: "How do you handle data security and privacy when building agents?",
    a: "Access scope, encryption, hosting location, and model-training terms are agreed with your team before development starts and written into the contract. Agents are scoped to the minimum data they need, and we can deploy into your cloud, your on-premise environment, or ours.",
  },
  {
    q: "What support do you provide after the agentic AI system goes live?",
    a: "Sixty days of engineering support within the agreed support scope: issue fixes, behaviour tuning, cost optimisation, and team training. After that you can run it yourself with the documentation and eval harness we hand over, or keep us on a support agreement.",
  },
  {
    q: "How do I get started with Axiomra's agentic AI development services?",
    a: "Book a free consultation. We will look at your workflows, tell you which ones an agent can actually take over, estimate what it costs to run at your volume, and give you a phased plan. There is no obligation to proceed after that call.",
  },
];
