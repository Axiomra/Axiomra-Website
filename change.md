# Axiomra — Website Content Change Log

Source document: `Axiomra_Website_Content_Review.pdf` (59 pages, 57 screenshots).

**Colour key** — every change is shown as a diff block:

```diff
- RED   = Current Content (what the PDF quoted from the live site)
+ GREEN = Improved Content (what the PDF asked for / what is now live)
```

| Status | Meaning |
| --- | --- |
| ✅ Applied | Change is live in the code |
| ⚠️ Flagged | Needs your decision or verification — **not** changed |
| ⏳ Pending | Not started yet |

---

# Home Page

**Status: ✅ Complete — all 10 screenshots applied.**

Files touched:
`client/src/sections/Hero.jsx` · `FoundersSay.jsx` · `Transformation.jsx` · `Industries.jsx` · `Portfolio.jsx` · `Process.jsx` · `RoiCalculator.jsx` · `client/src/pages/HomePage.jsx` · `client/src/components/Footer.jsx`

---

## 1. Hero Section — ✅ Applied
**File:** `client/src/sections/Hero.jsx` · **PDF:** Home Page, Screenshot 1

```diff
- Stop Guessing. Start Growing with AI That Actually Works
- The Result-Driven AI Development Company That Acts As Your Growth Engine
- Since before ChatGPT existed, we've been building production-grade AI systems for
- businesses that need results, not buzzwords. With 300+ delivered projects, we automate
- processes and develop customized end-to-end AI solutions that reduce costs, accelerate
- decision-making, and deliver proven ROI.
- Book Your FREE AI Strategy Session (Worth $1000)
+ Practical AI. Measurable Business Progress.
+ Custom AI Development That Moves Your Business Forward
+ Axiomra builds AI solutions around your business goals, data, and workflows. From
+ process automation to predictive insights, we help your team work more efficiently,
+ make informed decisions, and measure the value of AI in everyday operations.
+ Book Your Free AI Strategy Session
```

Note: gradient styling on the H1 moved to **"Moves Your Business Forward"** (was on "Growth Engine"). Theme, background and layout untouched.

---

## 2. Client Testimonials Section — ✅ Applied
**File:** `client/src/sections/FoundersSay.jsx` · **PDF:** Home Page, Screenshot 2

```diff
- What Founders Say About Our AI Development Company
- We specialize in breaking down complex problems and building AI systems that hold up
- in production. These stories highlight how we've reinvented business operations for
- our global partners.
- Get these results
+ What Our Clients Say About Working With Axiomra
+ Discover how our clients approach business challenges with AI and what they value
+ about working with our team.
+ Explore Client Stories
```

Note: brand-colour highlight moved to **"What Our Clients Say"** (was on "What Founders Say").

---

## 3. Transformation Section — ✅ Applied
**File:** `client/src/sections/Transformation.jsx` · **PDF:** Home Page, Screenshot 3

```diff
- LEADING THE WAY
- Leading The Way In AI-Powered Transformation
- We focus on one metric: your ROI. By automating manual workflows and deploying
- intelligent predictive systems, we help businesses reduce operational overhead by
- up to 70% and accelerate decision-making by 3.2X.
- Hire our AI developers
+ AI FOR EVERYDAY BUSINESS
+ Turn Business Challenges Into Working AI Solutions
+ We connect process automation and predictive insights to clear goals, such as reducing
+ manual work, improving decision quality, and managing operating costs. Together, we
+ define the measures that matter and track progress against them.
+ Work With Our AI Team
```

### 3b. Floating metric badge — ✅ Applied (extra, not in PDF)
Removed because the "3.2X" claim it repeated was deleted from the paragraph above. The card, its image, animation and position are unchanged — only the text inside it.

```diff
- 3.2X
- FASTER DECISIONS
+ Measurable Outcomes
+ DEFINED WITH YOU
```

---

## 4. Industries Section — ✅ Applied
**File:** `client/src/sections/Industries.jsx` · **PDF:** Home Page, Screenshot 4

```diff
- WHAT INDUSTRIES DOES AXIOMRA SERVE?
- Tailored AI Solutions For Every Industry Vertical
- From clinical workflows to supply-chain forecasting, we ship AI that fits how your
- industry actually operates.
+ INDUSTRIES WE SERVE
+ AI Solutions Built Around Your Industry
+ From healthcare workflows to supply chain forecasting, we design AI to fit your
+ processes, data, and operational requirements.
```

---

## 5. Portfolio / Case Studies Section — ✅ Applied
**File:** `client/src/sections/Portfolio.jsx` · **PDF:** Home Page, Screenshot 5

```diff
- WHAT HAVE WE BUILT FOR BUSINESSES?
- Proven Results: How We Solve Complex Business Challenges
- Five production systems, five very different industries, and one shared outcome:
- measurable lift within the first two quarters.
+ OUR WORK IN PRACTICE
+ Business Challenges Solved With AI
+ Explore selected projects to see the challenge, the solution we developed, and the
+ outcomes measured after deployment.
```

⚠️ **Side effect:** this is a shared component — the same heading also renders on the **Main Services page**. That is consistent with the new copy, but worth knowing.

---

## 6. Process Section (5 steps) — ✅ Applied
**File:** `client/src/sections/Process.jsx` · **PDF:** Home Page, Screenshot 6

```diff
- Discovery & AI Strategy
- We analyze your data to identify high-impact use cases that solve specific business
- inefficiencies.
+ Discovery and AI Strategy
+ We assess your goals, workflows, and data to prioritise practical AI use cases and
+ define success measures.
```
```diff
- Data Engineering & Prototyping
- We prepare your data for high-accuracy model training and build a functional
- prototype (MVP).
+ Data Preparation and Prototyping
+ We prepare the data and develop a prototype to test feasibility before full development.
```
```diff
- Custom AI Engineering
- Our in-house team develops the full system, integrating advanced models into your
- existing infrastructure.
+ Custom AI Development
+ We build the solution and connect it to your existing systems and business tools.
```
```diff
- Testing & Optimization
- We conduct rigorous stress tests to ensure 99.9% reliability and performance across
- all environments.
+ Testing and Optimisation
+ We evaluate accuracy, performance, reliability, and failure handling against agreed
+ acceptance criteria.
```
```diff
- Deployment & Continuous Growth
- We launch your AI solution into production and provide ongoing support as your
- business scales.
+ Deployment and Ongoing Improvement
+ We launch the solution, monitor its performance, and support improvements as your
+ needs evolve.
```

⚠️ **Spelling flag:** the PDF uses British spelling (`prioritise`, `Optimisation`). Applied verbatim, but the rest of the site is American English (`analyze`, `customized`). Say the word and I will switch these two to US spelling.

---

## 7. ROI Calculator — Heading & Workflow Picker — ✅ Applied
**File:** `client/src/sections/RoiCalculator.jsx` · **PDF:** Home Page, Screenshot 7

```diff
- See What Automation Could Save You Each Year.
- Pick the workflow, match the sliders to your team, and the model updates live. Every
- assumption behind the number is printed below it.
- WHICH WORKFLOW ARE YOU AUTOMATING?
- Tier-1 ticket deflection, reply drafting and automatic CRM updates.
+ Estimate the Annual Value of Workflow Automation
+ Select a workflow and adjust the inputs to reflect your team. Explore potential savings,
+ time recovered, and payback using the assumptions shown below.
+ Which workflow would you like to automate?
+ Handle routine support enquiries, draft responses, and update CRM records.
```

Per the PDF instruction, all calculator **controls, sliders, presets and values were left untouched** — copy only.

---

## 8. ROI Calculator — Input & Result Labels — ✅ Applied
**File:** `client/src/sections/RoiCalculator.jsx` · **PDF:** Home Page, Screenshot 8

```diff
- People doing this work
- Fully-loaded hourly cost
- Automatable hours / person / week
- Implementation budget
+ People Involved in This Workflow
+ Total Hourly Employment Cost
+ Hours per Person Available for Automation Each Week
+ Est Implementation Cost
```
```diff
- ESTIMATED NET ANNUAL SAVINGS
- HOURS RECOVERED
- PAYBACK PERIOD
- 3-YEAR NET VALUE
- RETURN ON INVESTMENT
- Get your custom roadmap
+ EST ANNUAL SAVINGS AFTER RUNNING COSTS
+ EST HOURS RECOVERED
+ EST PAYBACK PERIOD
+ EST THREE YEAR NET VALUE
+ EST THREE YEAR ROI
+ Get a Tailored Automation Assessment
```

**New disclaimer added** below the CTA, exactly as the PDF requested:

```diff
+ These estimates use the inputs and assumptions shown. Actual results depend on
+ implementation scope, adoption, operating costs, and the proportion of work
+ successfully automated.
```

**ROI definition check (PDF publication note):** the code computes
`ROI = (3-year net value) ÷ (implementation cost)` — i.e. **net return over cost**.
The label `Est Three Year ROI` and its footnote (`net return over build cost`) now match that formula, so the number and the wording are consistent.

---

## 9. Closing CTA Band — ✅ Applied
**File:** `client/src/pages/HomePage.jsx` · **PDF:** Home Page, Screenshot 9

```diff
- Stop Guessing And Start Growing With Your Trusted AI Development Partner
- Book your complimentary AI Strategic Session, (worth $1000) just for free, and
- discover how tailored AI solutions can drive growth.
- Get Your Project Done!
+ Find the Right AI Opportunity for Your Business
+ Book a free AI strategy session to discuss your goals, assess relevant use cases,
+ and identify a practical next step.
+ Book Your Free AI Strategy Session
```

---

## 10. Footer — ✅ Applied
**File:** `client/src/components/Footer.jsx` · **PDF:** Home Page, Screenshot 10

```diff
- We help businesses by automating their processes and developing customized end-to-end
- AI solutions that deliver proven ROI.
- AI Agent Development
- Awards & Recognitions
- Let's Talk
+ We build custom AI solutions that simplify workflows, support better decisions, and
+ help businesses measure the value of automation.
+ Agentic AI Development
+ Awards and Recognition
+ Discuss Your Project
```

⚠️ **"Teams" → "Our Team" not applied** — the current footer has no "Teams" link. The PDF screenshot is from an older build whose Quick Links column read *Blogs / Contact Us / About Us / Teams / Awards & Recognitions / FAQs*. The live column is *Blogs / Contact Us / About Us / Tech Stack / Awards and Recognition / FAQs*. Tell me if a "Our Team" link should be added back and where it should point.

⚠️ **Site-wide:** the footer renders on every page, so these four changes are already live across the whole site, not just Home.

---

# ⚠️ Home Page — Open Items (not changed, your call)

| # | Item | Where | Why it is flagged |
| --- | --- | --- | --- |
| 1 | `Reviewed on Clutch — 12 reviews` | Hero | PDF publication checks: *"Confirm review scores and counts… The screenshots show differing Clutch figures."* Verify against the live Clutch profile. |
| 2 | `Trusted by 300+ teams` | Hero client marquee | Same check: *"Confirm… project and team statistics."* The 300+ claim was removed from the hero paragraph but still appears above the logo strip. |
| 3 | `We don't just follow trends; we set the standard for how businesses apply AI to create impact.` | Transformation, para 1 | Not quoted in the PDF, so left alone — but the tone now clashes with the measured voice of the new heading. |
| 4 | `a dedicated team of 25+ AI engineers… building production-grade systems since 2021` | Transformation, para 2 | Not quoted in the PDF. These are real, checkable company facts — confirm them rather than delete. Say the word if you want them removed. |
| 5 | `We've done it for 300+ clients…` | Mid-page CTA band #1 | Not covered by the 10 Home screenshots. Repeats the 300+ claim the hero just dropped. |
| 6 | `Get A Custom AI Roadmap…` / `Turn Our Case Studies Into Your Next Win` | Mid-page CTA bands #2 and #3 | Not covered by the PDF screenshots. Left as-is. |
| 7 | British vs American spelling | Process section | See section 6 above. |

---

# Main Services Page

**Status: ✅ Complete — all 3 screenshots applied.**

Files touched:
`client/src/components/ServicesHero.jsx` · `client/src/sections/TechStack.jsx` · `client/src/pages/ServicesPage.jsx`

---

## 1. Services Hero — ✅ Applied
**File:** `client/src/components/ServicesHero.jsx` · **PDF:** Main Services Page, Screenshot 1

```diff
- Our AI Services & Solutions
- Tailored AI Services For Growing Businesses
- Partner with Axiomra, a trusted artificial intelligence company delivering intelligent
- solutions that streamline workflows and help businesses grow with confidence.
- Request A Free Consultation
- Browse all services
+ AI Services and Solutions
+ Custom AI Services Built Around Your Business
+ From AI strategy to development and integration, Axiomra helps you turn business
+ challenges into practical solutions. Explore services that simplify work, improve
+ access to information, and support your growth.
+ Book a Free Consultation
+ Explore Our Services
```

Note: gradient styling on the H1 moved to **"Built Around Your Business"** (was on "Growing Businesses"). The two-line break, background washes and stat strip are unchanged.

---

## 2. Tech Stack — UI/UX Tab Removed — ✅ Applied
**File:** `client/src/sections/TechStack.jsx` · **PDF:** Main Services Page, Screenshot 2

PDF instruction, verbatim: *"Remove the UI/UX tab and its associated tool list: Figma, Canva, Photoshop, After Effects, and Illustrator. Retain the remaining service categories. Set the default selected tab to Artificial Intelligence so the section displays an available category."*

```diff
- "UI/UX": ["Figma", "Canva", "Photoshop", "After Effects", "Illustrator"],
```

Remaining tabs (untouched): `Artificial Intelligence` · `Backend & Database` · `Frontend` · `Cloud` · `DevOps` · `SQA`

**Default tab:** already `Artificial Intelligence` in the code (`useState("Artificial Intelligence")`) — no change needed, requirement already satisfied.

⚠️ **Side effect:** this tech-stack section is a shared component, also rendered on the **Home page**. The UI/UX tab is therefore gone from Home as well. The Home screenshots in the PDF did not cover this section, so there is no conflict — but it is a site-wide effect, not a Services-only one.

⚠️ **Not touched:** the standalone **Tech Stack page** (`/tech-stack`) and the per-industry pages still list Figma and other design tools in their own data files. The PDF only asked for the Main Services page, so those were left alone. Tell me if the design-tool listings should be stripped site-wide.

---

## 3. Closing CTA Band — ✅ Applied
**File:** `client/src/pages/ServicesPage.jsx` · **PDF:** Main Services Page, Screenshot 3

```diff
- Start Your Journey To Success With Us
- As a hands-on AI partner, we're trusted by clients worldwide to deliver tailored AI
- solutions that drive success. Let's discuss your project.
- Get Your Project Sized
+ Turn Your AI Idea Into a Clear Project Plan
+ Tell us what you want to achieve. We will help define the scope, technical approach,
+ and next steps for a solution that fits your business.
+ Discuss Your Project
```

---

# ⚠️ Main Services Page — Open Items (not changed, your call)

| # | Item | Where | Why it is flagged |
| --- | --- | --- | --- |
| 1 | `300+ Projects delivered` · `25+ In-house experts` · `20+ AI service lines` · `6-10 Weeks to pilot` | Services hero stat strip | PDF publication checks: *"Confirm… project and team statistics… time estimates."* Not quoted in the screenshot, so left as-is pending your verification. |
| 2 | Design tools (Figma etc.) on the Tech Stack page and industry pages | `techStackData.js`, `healthcareData.js`, `financeData.js`, and 8 more | Out of scope for the PDF's request, which named the Main Services page only. Consistency decision is yours. |
| 3 | Services FAQ answers | `ServicesPage.jsx` | Contains claims such as *"measurable time and cost savings within the first two quarters"* and *"6-10 weeks to a working pilot"*. Not covered by the 3 screenshots. |

---

# Service Page 1 — AI Development

Route: `/services/ai-development-services` · PDF screenshots 1–14
Files: `client/src/data/aiDevelopmentData.js`, `client/src/pages/AiDevelopmentPage.jsx`

---

## 1. Hero — ✅ Applied
**File:** `client/src/data/aiDevelopmentData.js` → `hero` · **PDF:** Screenshot 1

```diff
- AI Development Services Built For Business Results
- Work with a custom AI development partner that builds, integrates, and scales AI
- systems for your business. We help enterprises automate operations, reduce costs,
- and open new revenue streams with AI built around their goals. Every engagement
- starts with your workflow and your data, not a model demo, and ends with a system
- your team owns, monitors, and keeps improving in production.
+ Custom AI Development Services for Your Business
+ Axiomra designs, builds, and integrates AI systems around your goals, workflows,
+ and data. We help you automate routine operations, uncover useful insights, and
+ develop AI capabilities your team can use and manage. From discovery to
+ deployment, we focus on practical adoption and measurable outcomes.
```

Title split: `titleLead: "Custom AI Development"` + `titleAccent: "Services for Your Business"` (accent renders on its own line in `text-brand`).

---

## 2. Industries Section — ✅ Applied
**File:** `client/src/data/aiDevelopmentData.js` → `industries` · **PDF:** Screenshot 2

```diff
- AI Development Services Built For Your Industry
- We build custom AI systems for businesses across 12+ industries. Every solution is
- built around the specific workflows, data, and goals of your industry, not a
- generic template.
- [Button] View all industries
+ AI Development Tailored to Your Industry
+ We design AI solutions around your industry's workflows, data, and business
+ priorities. Each engagement considers the operational requirements and constraints
+ that shape successful adoption.
+ [Button] Explore Industries
```

The unverified **"12+ industries"** claim is gone as a side effect of the new subtitle.

---

## 3. Industry CTA Banner — ✅ Applied
**File:** `client/src/pages/AiDevelopmentPage.jsx` · **PDF:** Screenshot 3

```diff
- We Know Your Industry. Now Let's Solve Your Problem.
- We have delivered AI systems across 12+ industries. From healthcare and finance to
- retail and supply chain, our teams understand your data, your compliance
- requirements, and your goals.
- [Button] Book A Free Industry AI Consultation
+ Bring Us Your Industry Challenge
+ Whether you work in healthcare, finance, retail, or supply chain operations, we
+ start by understanding your processes, data, and requirements. Together, we
+ identify where AI can add practical value.
+ [Button] Book a Free AI Consultation
```

---

## 4. Process — Heading and CTA — ✅ Applied
**File:** `client/src/data/aiDevelopmentData.js` → `process` · **PDF:** Screenshot 4

```diff
- Our AI Software Development Process Includes
- We follow a structured, technical process to build AI systems that work in the real
- world, not just in demos. Every step is designed to reduce risk, cut development
- time, and deliver AI that performs in production from day one.
- [Button] Contact us now
+ Our AI Development Process
+ A structured approach takes your project from discovery to deployment, with clear
+ decision points, testing, and team handover.
+ [Button] Discuss Your Requirements
```

---

## 5. Process — All 7 Steps — ✅ Applied
**File:** `client/src/data/aiDevelopmentData.js` → `process.steps` · **PDF:** Screenshots 4–10

> **Numbering note:** the PDF writes the new titles as *"1. Discovery and Use Case Definition"*, *"2. Data Assessment…"* and so on. The `AiDevProcess` component already renders a large `01`…`07` badge next to each title, so the numbers were **not** typed into the titles — that would have produced `01  1. Discovery…` on screen. Sequence and wording match the PDF exactly; only the duplicate digit is omitted.

### Step 1 — Screenshot 4
```diff
- Discovery and Use Case Definition
- We start with your business problem, not the model. We map the workflow, quantify
- the cost of the status quo, and agree on the success metric the system will be
- judged against before a single line of code is written. Where AI is the wrong tool
- (a rules engine, a better report, or a fixed process would do the job), we say so
- at this stage, while it is still cheap to change direction.
+ 1. Discovery and Use Case Definition
+ We map your workflow, understand the business problem, and establish success
+ measures. We assess whether AI is suitable and agree on a practical scope before
+ development begins.
```

### Step 2 — Screenshot 5
```diff
- Data Assessment and Preparation
- We audit the data you already hold (volume, quality, labelling, and access) then
- build the cleaning, augmentation, and feature pipelines the model needs. Where data
- is thin, we plan collection or synthetic generation up front. This is also where
- governance gets settled… Getting that wrong later is what stalls most enterprise AI
- projects at the security review.
+ 2. Data Assessment and Preparation
+ We assess data availability, quality, labelling, and access, then prepare the
+ pipelines needed for development. Where gaps exist, we agree on a collection or
+ preparation plan. Data handling, access permissions, and governance requirements
+ are defined at this stage.
```

### Step 3 — Screenshot 6
```diff
- Model Design, Training, and Evaluation
- We select the right model architecture for your specific use case, whether that is
- a fine-tuned LLM, a computer vision model, a recommendation engine, or a custom ML
- model. We train on your prepared data, then run rigorous benchmark testing using
- precision, recall, F1 score, and task-specific metrics. We use RLHF where needed to
- align model outputs with real business requirements.
+ 3. Model Selection and Evaluation
+ We select an approach suited to your use case, data, and performance requirements.
+ Where appropriate, we train or fine-tune models and evaluate them using
+ task-specific benchmarks. Testing covers output quality, errors, and the conditions
+ in which human review is needed.
```

### Step 4 — Screenshot 7
```diff
- System Architecture and Integration
- The model becomes a product here: APIs, auth, rate limits, queues, and the
- integrations into your ERP, CRM, or internal tools. We design for the load you
- actually expect, with a clear fallback path when a model call fails. Inference cost
- is treated as a first-class constraint: caching, batching, and model routing are
- decided at architecture time, not discovered on the first month's bill.
+ 4. System Architecture and Integration
+ We connect the AI capability to your ERP, CRM, and internal tools through a
+ suitable application architecture. We plan authentication, expected usage, running
+ costs, and fallback behaviour so the system fits your operational environment.
```

### Step 5 — Screenshot 8
```diff
- Deployment and MLOps
- We containerize, automate CI/CD, and ship to your cloud of choice with versioned
- models and reproducible builds. Rollback is a one-command operation, not an
- incident. Model weights, training data snapshots, and configuration are all
- versioned together, so any prediction the system made six months ago can be
- reproduced exactly…
+ 5. Deployment and MLOps
+ We deploy to the agreed environment using controlled release processes, version
+ management, and rollback procedures. We document model and configuration changes to
+ support maintenance, troubleshooting, and traceability.
```

### Step 6 — Screenshot 9
```diff
- Monitoring and Continuous Improvement
- Live dashboards track latency, cost, accuracy, and drift. When real-world data
- moves away from the training distribution, we retrain on a schedule you can see
- rather than waiting for a complaint. Human feedback captured in the product feeds
- the next training round, so the system gets measurably better each quarter…
+ 6. Monitoring and Continuous Improvement
+ We monitor agreed measures such as response time, cost, output quality, and data
+ drift. Usage insights and team feedback guide improvements, with model updates or
+ retraining introduced when evaluation shows they are needed.
```

### Step 7 — Screenshot 10
```diff
- Support, Handover, and Team Enablement
- We document the system, train your team to operate it, and stay on for post-launch
- support, so the AI keeps earning after we step back. Handover covers architecture
- notes, runbooks for the failures we anticipate, and working sessions with the
- engineers who will own it. The goal is a team that no longer needs us…
+ 7. Handover and Team Enablement
+ We provide system documentation, operational guidance, and practical training for
+ the people who will manage the solution. Post-launch support follows the agreed
+ scope, helping your team resolve issues and operate the system with confidence.
```

---

## 6. Tech Stack Section — ✅ Applied
**File:** `client/src/data/aiDevelopmentData.js` → `techStack` · **PDF:** Screenshot 11

```diff
- AI Technologies We Use To Build Production-Ready Systems
- We work with organizations at different growth stages, helping them adopt AI in
- ways that match their goals, resources, and technical readiness.
+ The Technology Behind Your AI Solution
+ We select models, frameworks, cloud services, and data tools to fit your use case,
+ existing infrastructure, security requirements, and budget. Explore the
+ technologies that support our development approach.
```

The tool groups and the `View all tech stack` button were not quoted in the PDF and are unchanged.

---

## 7. Technical Discovery CTA Banner — ✅ Applied
**File:** `client/src/pages/AiDevelopmentPage.jsx` · **PDF:** Screenshot 12

```diff
- The Right Tools. The Right Team. Built For Your Stack.
- We work with the most advanced AI frameworks, LLMs, and MLOps tools available. More
- importantly, we know how to combine them into systems that work in production. Tell
- us what you want to build and we will map out the right architecture.
- [Button] Book A Free Technical Discovery Call
+ AI Architecture That Fits Your Existing Systems
+ Discuss your requirements with our engineers. We will help identify suitable
+ models, integration options, and an architecture that balances performance, cost,
+ and maintainability.
+ [Button] Book a Technical Discovery Call
```

---

## 8. Benefits Section — ✅ Applied
**File:** `client/src/data/aiDevelopmentData.js` → `benefits` · **PDF:** Screenshot 13

```diff
- Why choose us for your next big project?
- Partnering With Us Is A Strategic Move For Future
+ Why work with Axiomra
+ Practical Support From Strategy to Adoption
```

```diff
- Team Coaching to Get the Most Out of AI
- We don't just build AI: we help your team use it. Our experts work closely with
- your team to teach them how to understand, use, and grow AI tools that fit your
- business needs. Hands-on sessions cover prompt design, model limits, and when to
- trust an output, so adoption sticks after we step back…
+ Hands-on Team Training
+ Help your team understand model capabilities, evaluate outputs, and use the
+ solution effectively in everyday work.
```

```diff
- Free $1000 AI Strategy Session
- Start your AI journey with a free strategy session worth $1000. We'll learn about
- your goals, find areas where AI can help, and build a plan that fits your business.
- You walk away with a shortlist of use cases ranked by effort and return…
+ Free AI Strategy Session
+ Explore your goals and prioritise potential use cases with a practical discussion
+ of feasibility, effort, and value.
```

```diff
- Extra 60 Days of Tech Support
- We're here for you after the launch too. Get 60 extra days of technical support to
- make sure everything runs smoothly and your team gets the help they need during the
- early stages of using AI. That covers monitoring, tuning against real usage
- patterns, and fixing the edge cases…
+ 60 Days of Post-launch Support
+ Receive help with early usage issues, performance tuning, and operational questions
+ within the agreed support scope.
```

This clears **two** of the global publication checks on this page: the `$1000` session value is gone, and the support promise is now scoped (*"within the agreed support scope"*) rather than open-ended.

---

## 9. Closing CTA Banner — ✅ Applied
**File:** `client/src/pages/AiDevelopmentPage.jsx` · **PDF:** Screenshot 14

```diff
- 300+ AI Projects Delivered. Yours Could Be Next.
- We offer a free AI strategy session to every new client. No commitment. No generic
- pitch. Just a clear plan for what AI can do for your business, built by engineers
- who have done it across 20+ countries.
- [Button] Claim Your Free AI Strategy Session
+ Your Next AI Project Starts With a Clear Plan
+ Discuss your goals with our team in a free AI strategy session. Explore relevant
+ use cases, understand the main requirements, and decide on a practical next step.
+ [Button] Book Your Free AI Strategy Session
```

The unverified **300+** and **20+ countries** claims are removed from this banner by the new copy.

---

# ⚠️ AI Development Page — Open Items (not changed, your call)

| # | Item | Where | Why it is flagged |
| --- | --- | --- | --- |
| 1 | Hero Clutch proof says **`11 reviews`**, Home hero says **`12 reviews`** | `aiDevelopmentData.js` → `hero.proof`, `Hero.jsx` | This is exactly the inconsistency the PDF's publication check #1 names: *"the screenshots show differing Clutch figures."* One number is wrong — tell me the correct count and I will set it site-wide. |
| 2 | Hero button **`Request A Free Consultation`** | `aiDevelopmentData.js` → `hero.ctaText` | Not quoted in Screenshot 1, so left alone. Note the Main Services hero now reads *"Book a Free Consultation"* — same button, two labels. Say the word and I will align them. |
| 3 | `benefits.stats` — `300+ Projects delivered`, `25+ In-house experts`, `20+ Countries served`, `12+ Industries covered` | `aiDevelopmentData.js` → `benefits.stats` | The strip sits directly under the rewritten benefits and was not in Screenshot 13. Publication check #2 asks you to confirm these figures. |
| 4 | `intro`, `whatWeDo`, `subServices` (8 rows), `capabilities` (6 items) | `aiDevelopmentData.js` | No screenshot in the PDF covers these blocks, so the original copy stands. |
| 5 | CTA banner *"Have A Use Case In Mind? / Let's Build It."* | `AiDevelopmentPage.jsx` | Not in the 14 screenshots. Still uses the older promotional tone — worth a second pass once the named pages are done. |
| 6 | `faqs` (10 answers) | `aiDevelopmentData.js` | Not covered. Contains cost and timeline claims that publication check #3 asks you to verify. |
| 7 | Portfolio section heading on this page | `AiDevelopmentPage.jsx` | Renders `<Portfolio showHeading={false} />` with a local `SectionHeading`; not quoted in the PDF. |

---

# Service Page 2 — Generative AI

Route: `/services/generative-ai-services` · PDF screenshots 1–18
Files: `client/src/data/generativeAiData.js`, `client/src/pages/GenerativeAiPage.jsx`,
`client/src/components/gen-ai/GenAiHero.jsx`, `GenAiChallenges.jsx`, `GenAiServices.jsx`, `GenAiWhyUs.jsx`

---

## 1. Hero — Body Copy — ✅ Applied
**File:** `generativeAiData.js` → `hero.body` · **PDF:** Screenshot 1

```diff
- We build production-ready generative AI systems on GPT-4o, Claude, Llama, Gemini,
- Mistral, Midjourney, and Stable Diffusion: systems that automate workflows, generate
- content on brand, and turn your own documents into answers your team can trust. Not
- a model demo: a system your people use on Monday morning.
+ We build generative AI solutions that help your team create content, find
+ information, and automate routine work. By combining suitable models with your
+ business data and existing tools, we develop applications designed for daily use,
+ with evaluation and review controls matched to your needs.
```

---

## 2. Hero — Buttons and Statistics Strip — ✅ Applied
**Files:** `generativeAiData.js` → `hero`, `GenAiHero.jsx` · **PDF:** Screenshot 2

```diff
- [Button] Request A Free Consultation
- [Button] See What We Build
+ [Button] Book a Free Consultation
+ [Button] Explore Our Solutions
```

```diff
- 300+  AI projects delivered
- 60-70%  Less time on manual tasks
- 6-10  Weeks to a working pilot
+ Custom AI Solutions
+ Workflow Automation
+ Pilot Development
```

PDF instruction, verbatim: *"For the statistics strip, use verified figures with clear context. If evidence is unavailable, use these non-numeric labels: Custom AI Solutions | Workflow Automation | Pilot Development."* Since none of the three figures is evidenced anywhere in the repo, the non-numeric labels were applied.

`GenAiHero.jsx` now renders a stat entry without a `value` as a single capability label, so numbers can be put back later by adding `value:` to the data — no component change needed.

**Not changed:** the Clutch proof line `4.8 from 300+ companies`. The PDF says *"Publish a Clutch score and review count only after confirming the current profile"* — that is a check, not a replacement, so it is flagged below rather than guessed at.

---

## 3. Business Challenges — Heading — ✅ Applied
**File:** `generativeAiData.js` → `challenges` · **PDF:** Screenshot 3

```diff
- WHERE GENERATIVE AI ACTUALLY PAYS FOR ITSELF
- Overcome Business Challenges With Generative AI Solutions
- Most teams are not short on ideas: they are short on hours. Repetitive writing, slow
- first drafts, support queues, and knowledge buried in PDFs quietly cost you a
- headcount or two every year. We build generative AI that removes that work instead
- of adding another tool nobody opens.
+ PUT GENERATIVE AI TO WORK
+ Give Your Team More Time for High Value Work
+ Routine writing, growing support queues, and information spread across documents can
+ slow your team down. Our generative AI solutions help create drafts, retrieve
+ relevant knowledge, and streamline repetitive tasks within the tools your people
+ already use.
```

The eyebrow is stored in sentence case and CSS-uppercased by the component, so it renders exactly as the PDF shows it.

---

## 4. Business Challenges — Four Items + CTA — ✅ Applied
**Files:** `generativeAiData.js` → `challenges.items`, `GenAiChallenges.jsx` · **PDF:** Screenshot 4

```diff
- Reduce operational bottlenecks
- Automate the repetitive drafting, tagging, and summarising that eats your team's
- week, and hand the hours back to work that needs judgement.
+ Reduce Routine Work
+ Automate drafting, tagging, and summarisation so your team can focus on work that
+ needs judgement.
```
```diff
- Answer customers instantly
- AI-generated replies grounded in your own policies and product data: personal,
- consistent, and available at 2am without a night shift.
+ Support Faster Customer Responses
+ Generate draft replies using your approved policies and product information, with
+ escalation where needed.
```
```diff
- Ship products faster
- Launch AI-powered features with a team that has already trained, evaluated, and
- deployed them, instead of learning on your budget.
+ Build AI Features With a Clear Plan
+ Move from a defined use case to an evaluated application with development and
+ integration support.
```
```diff
- Scale without disruption
- Systems that fit your existing CRM, ERP, and data stack, no rip-and-replace, no
- six-month migration before value shows up.
+ Extend Your Existing Systems
+ Connect AI to your CRM, ERP, and data tools through a phased implementation
+ approach.
```
```diff
- [Button] Request A Free Consultation
+ [Button] Book a Free Consultation
```

---

## 5. Services — All Seven Blocks — ✅ Applied
**Files:** `generativeAiData.js` → `services.items`, `GenAiServices.jsx` · **PDF:** Screenshots 5–11

> Each service now carries its own `ctaText`. The button was previously hardcoded as `Learn more` for all seven; `GenAiServices.jsx` reads `{item.ctaText ?? "Learn more"}`, so the PDF's per-service labels render and any future service without one still works.
>
> The `id` on each block (`generative-ai-consulting`, `rag-development`, and so on) was **not** renamed — those are anchor targets used by in-page links, and changing them would break existing URLs.

### Screenshot 5 — Consulting
```diff
- Generative AI Consulting And Strategy
- Most businesses know they need generative AI but not where it belongs. We assess
- your workflows, identify the use cases that actually pay back, and hand you a costed
- roadmap with the numbers each initiative has to hit.
- • AI readiness assessment and feasibility study
- • Business-specific use case identification
- • Custom AI strategy and implementation roadmap
- • KPI definition and performance benchmarks
- [Button] Learn more
+ Generative AI Strategy and Consulting
+ Identify where generative AI can support your business. We assess readiness, compare
+ potential use cases, and develop a roadmap with estimated costs, dependencies, and
+ success measures.
+ • AI readiness and feasibility assessment
+ • Prioritised business use cases
+ • Implementation roadmap
+ • KPIs and evaluation criteria
+ [Button] Explore AI Consulting
```

### Screenshot 6 — Integration
```diff
- Adding AI to systems already carrying your business is where most projects stall. We
- integrate generative AI into your CRM, ERP, SaaS platforms, and internal tools with
- minimal disruption and a clear path to ROI.
- • Integration into the systems you already run
- • LLMOps setup for continuous model monitoring
- • Scalable deployment on AWS, Azure, or GCP
- • Ongoing performance and cost optimisation
- [Button] Learn more
+ Bring generative AI into the systems your team already uses. We plan and implement
+ integrations with your CRM, ERP, SaaS platforms, and internal tools, with attention
+ to access, reliability, and operating costs.
+ • Business system integrations
+ • Deployment to your agreed cloud environment
+ • Model monitoring setup
+ • Performance and cost optimisation
+ [Button] Explore AI Integration
```

### Screenshot 7 — Custom LLM
```diff
- Custom LLM Development Services
- Off-the-shelf language models do not know your industry, your data, or your voice.
- We design custom large language models trained on your corpus and fine-tune Llama 3,
- Mistral, and GPT-4o to match how your business actually writes and decides.
- • Custom LLM design and development
- • Model fine-tuning and optimisation
- • Domain-specific LLM training
- • Evaluation harness and quality benchmarks
- [Button] Learn more
+ Custom LLM Solutions and Fine-tuning
+ Adapt language models to your domain, terminology, and output requirements. We
+ evaluate whether prompting, retrieval, or fine-tuning best suits your goals before
+ selecting an approach.
+ • Model selection and solution design
+ • Domain data preparation
+ • Fine-tuning where appropriate
+ • Quality evaluation and benchmarks
+ [Button] Explore Custom LLM Solutions
```

### Screenshot 8 — App Development
```diff
- Generative AI App Development
- Businesses need AI-powered products but rarely have the team to build them from
- scratch. We build generative AI applications for web and mobile, writing tools,
- image generation platforms, AI search, and intelligent SaaS products.
- • End-to-end generative AI app development
- • AI-powered web and mobile applications
- • Custom AI product development for SaaS
- • API-first architecture for easy scaling
- [Button] Learn more
+ Generative AI Application Development
+ Turn your idea into a usable AI application for web or mobile. We develop writing
+ assistants, AI search tools, content generation applications, and AI features for
+ SaaS products.
+ • Application design and development
+ • Web and mobile integration
+ • Custom AI product capabilities
+ • APIs designed for growth and maintenance
+ [Button] Explore AI App Development
```

### Screenshot 9 — Copilots and Agents
```diff
- AI Copilot And Agent Development
- Teams spend too much time on tasks AI can handle end to end. We build copilots and
- autonomous agents that work inside your existing tools, assist your teams, and
- complete multi-step tasks without manual babysitting.
- • Custom AI copilot development for internal tools
- • Autonomous agent design and deployment
- • Multi-agent workflow orchestration
- • Integration with Slack, CRM, ERP and more
- [Button] Learn more
+ AI Copilot and Agent Development
+ Help your team complete routine work with copilots and agents connected to existing
+ tools. We define permissions, approval points, and exception handling to match the
+ level of autonomy your workflow needs.
+ • Internal AI copilots
+ • Task-focused AI agents
+ • Workflow orchestration
+ • Integration with collaboration and business tools
+ [Button] Explore AI Agents
```

### Screenshot 10 — RAG
```diff
- Custom RAG Development Services
- Generic models give confident wrong answers because they have never seen your data.
- We build Retrieval-Augmented Generation systems that connect models to your
- documents, databases, and knowledge bases and cite where every answer came from.
- • RAG architecture design and setup
- • Knowledge base and document integration
- • Context-aware search and Q&A systems
- • Source-cited AI response generation
- [Button] Learn more
+ Retrieval Augmented Generation Development
+ Make your business knowledge easier to access. We connect language models to
+ approved documents and data sources so users can retrieve relevant information and
+ review supporting references.
+ • RAG architecture and setup
+ • Document and knowledge base integration
+ • Context-aware search and Q&A
+ • Source references and answer-quality evaluation
+ [Button] Explore RAG Solutions
```

### Screenshot 11 — Workflow Automation
```diff
- Manual workflows slow down operations and quietly raise costs in every department.
- We design and deploy generative AI automation that handles the repetitive work
- across customer service, marketing, HR, and operations.
- • End-to-end workflow automation with generative AI
- • AI-powered customer service and support systems
- • Automated reporting, summarisation and data processing
- • Integration with existing business tools and platforms
- [Button] Learn more
+ Streamline repetitive work across customer service, marketing, HR, and operations.
+ We connect generative AI to your existing processes, with review steps for outputs
+ and actions that need human judgement.
+ • Workflow assessment and automation
+ • Reporting and summarisation
+ • Customer support assistance
+ • Integration with business tools
+ [Button] Explore Workflow Automation
```

---

## 6. Model Types — Heading + All Six Cards — ✅ Applied
**File:** `generativeAiData.js` → `modelTypes` · **PDF:** Screenshots 12–13

```diff
- Transform Your Operations With Production Generative AI
- Six families of generative systems, each tuned to your data and your quality bar
- before a single user sees an output.
+ Generative AI Capabilities for Your Business
+ Explore the types of AI systems we can combine to support your workflows, with
+ evaluation tailored to each use case.
```

```diff
- Text Generation Models
- Models trained on your terminology, tone, and writing style. They draft product
- descriptions, reports, customer emails, and documentation with consistent quality,
- straight inside your CMS, CRM, or internal workflow.
+ Text Generation
+ Create drafts of reports, emails, product descriptions, and documentation using your
+ terminology and style guidance, with review before publication.
```
```diff
- Image Generation Models
- Image systems built on DALL·E, Stable Diffusion, and similar models, fine-tuned on
- your brand guidelines. On-demand mockups, marketing assets, and design variations…
+ Image Generation
+ Generate concepts, marketing visuals, and variations using selected tools and
+ reference assets, subject to brand review and usage requirements.
```
```diff
- Audio And Speech Models
- Speech systems that generate and understand audio for service bots, audiobook
- narration, podcasts, and music. Each system is trained to sound human…
+ Audio and Speech
+ Build transcription, speech generation, and audio workflows for customer support,
+ narration, and content production.
```
```diff
- Video Generation Models
- Video systems that combine visual, audio, and text input to generate and edit
- content without manual production overhead, marketing videos, training content, and
- personalised video messages at scale.
+ Video Generation
+ Support the creation and editing of marketing videos, training content, and
+ personalised messages. Combine appropriate AI tools with human review for quality
+ and brand consistency.
```
```diff
- Code Generation Models
- Coding assistants trained on your standards that write boilerplate, suggest
- implementations, and convert code between languages, reviewed and debugged against
- your own quality gates, not the public internet's.
+ Code Assistance
+ Help developers draft code, suggest implementations, refactor existing work, and
+ create tests. Outputs are reviewed against your engineering standards before
+ release.
```
```diff
- Multimodal Models
- Systems that process text, images, audio, and video together so nothing is lost in
- translation between formats. One system that answers questions about visual content
- with full context, instead of four stitched-together tools.
+ Multimodal AI
+ Work across text, images, audio, and video within a connected workflow. Build
+ applications that extract information, answer questions, and summarise supported
+ content formats.
```

The technology tag pills on each card (`GPT-4o`, `Stable Diffusion`, `Whisper`…) were not quoted in the PDF and are unchanged.

---

## 7. Model-Fit CTA Banner — ✅ Applied
**File:** `GenerativeAiPage.jsx` · **PDF:** Screenshot 14

```diff
- Not Sure Which Model Fits Your Use Case?
- Bring us the workflow you want to automate. We will tell you which model class fits,
- what it costs to run at your volume, and whether generative AI is even the right
- answer, before you spend anything.
- [Button] Book A Free Generative AI Consultation
+ Find the Right Generative AI Approach
+ Share the workflow you want to improve. We will assess suitable approaches, discuss
+ estimated running costs, and help you decide whether generative AI fits your needs.
+ [Button] Discuss Your Use Case
```

---

## 8. Industries Band — ✅ Applied
**File:** `generativeAiData.js` → `industriesBand` · **PDF:** Screenshot 15

```diff
- Generative AI Built For The Way Your Industry Works
- We have shipped generative AI for healthcare, finance, retail, education, logistics,
- legal, real estate, and manufacturing teams. Every one came with its own compliance
- rules, data shape, and tolerance for error, and the system was built around them.
+ Generative AI Tailored to Your Industry
+ Every industry has different workflows, data requirements, and expectations for
+ accuracy. We design generative AI around these needs, with appropriate review,
+ access controls, and evaluation for your use case.
```

The unverified *"we have shipped for eight named sectors"* claim goes with it. The industry name chips below are unchanged.

---

## 9. Why Us — Heading and CTA — ✅ Applied
**File:** `generativeAiData.js` → `whyUs` · **PDF:** Screenshot 16

```diff
- What Makes Us Different From Other Generative AI Companies
- Most generative AI companies hand you a finished product and disappear. We stay
- involved from the first conversation to post-deployment, making sure your AI system
- actually works for your business, and keeps working as your data changes.
- [Button] Request A Free Consultation
+ Why Build Generative AI With Axiomra
+ Work with a team that connects strategy, development, and adoption. We help you
+ define success, integrate the solution, and support your team through launch and the
+ agreed post-deployment period.
+ [Button] Book a Free Consultation
```

---

## 10. Why Us — All Six Reasons — ✅ Applied
**File:** `generativeAiData.js` → `whyUs.reasons` · **PDF:** Screenshot 17

```diff
- Clear And Consistent Communication
- You get a dedicated project manager from day one. No chasing updates, no unclear
- timelines. You always know what is being built, what stage it is at, and what is
- coming next.
+ Clear Project Communication
+ Follow progress through regular updates, clear milestones, and an identified point
+ of contact.
```
```diff
- Results You Can Measure
- We define success metrics before we write a line of code. Every solution is tied to
- a business outcome, whether that is cost reduction, faster output, or improved
- accuracy.
+ Agreed Success Measures
+ Track outcomes against measures defined before development, such as turnaround time,
+ output quality, or operating cost.
```
```diff
- Flexible Engagement Models
- Fixed-price projects, dedicated teams, and time-and-materials engagements, so you
- can work with us the way that fits your situation, not ours.
+ Flexible Ways to Work Together
+ Choose a fixed scope, a dedicated team, or time-based delivery to suit your project.
```
```diff
- End-To-End Ownership
- We handle everything from strategy and model selection through development,
- integration, deployment, and monitoring. One partner, full accountability.
+ One Partner Across Delivery
+ Coordinate strategy, development, integration, and deployment through a single
+ delivery team.
```
```diff
- 60 Days Of Post-Deployment Support
- After your solution goes live, we stay on for 60 days at no extra cost. We monitor
- performance, fix issues, and make adjustments based on real-world usage from day
- one.
+ 60 Days of Post-deployment Support
+ Address early usage issues and performance adjustments within the agreed support
+ scope.
```
```diff
- Team Coaching And Handover
- We do not just build and leave. Our team trains your staff on how to use, manage,
- and get the most out of your new AI system, so your team walks away confident, not
- dependent.
+ Practical Training and Handover
+ Give your team the documentation and training needed to use and manage the solution.
```

The *"60 days at no extra cost"* pricing promise is gone — this is publication check #5 cleared on this page.

---

## 11. Security and Governance Panel — ✅ Applied
**File:** `GenAiWhyUs.jsx` · **PDF:** Screenshot 18

```diff
- Security And Governance, Handled From Day One
- Generative systems touch your most sensitive documents. We treat that as an
- architecture requirement, not a policy document written after launch.
- • Your data stays in your cloud or ours. Your call, written into the contract.
- • Guardrails, PII redaction, and output filtering built in, not bolted on.
- • Full audit trail of prompts, retrievals, and responses for every request.
- • SOC 2, GDPR, and HIPAA-aligned delivery when your industry requires it.
+ Security and Governance Built Into the Project
+ We agree on data handling, hosting, and access requirements before implementation.
+ Controls are selected for the data and risks involved in your use case.
+ • Agreed hosting and data access arrangements
+ • Appropriate handling of personal and sensitive information
+ • Output controls and human review where needed
+ • Logging and retention suited to audit and privacy requirements
+ • Assessment of applicable security and regulatory requirements with your team
```

This is the most important change on the page from a legal standpoint: the old bullets asserted **SOC 2, GDPR and HIPAA-aligned delivery** and a contractual data-residency guarantee. Those are compliance claims, not marketing copy. The new wording commits to assessing requirements with the client instead of asserting certification.

---

# ⚠️ Generative AI Page — Open Items (not changed, your call)

| # | Item | Where | Why it is flagged |
| --- | --- | --- | --- |
| 1 | Clutch proof `4.8 from 300+ companies` | `generativeAiData.js` → `hero.proof` | **Third different Clutch figure on the site** — Home says `12 reviews`, AI Development says `11 reviews`, this says `4.8 from 300+ companies`. PDF publication check #1 exactly. Give me the real profile numbers and I will set one value everywhere. |
| 2 | Hero headline `Custom Generative AI Development Services For Enterprises And Startups` | `generativeAiData.js` → `hero.titleLead/Accent/Tail` | Screenshot 1 quoted only the body paragraph, so the headline stands as-is. |
| 3 | `whyUs.stats` — `300+`, `50+ Engineers and data scientists`, `20+ Global markets served`, `4+ Years` | `generativeAiData.js` → `whyUs.stats` | Not in Screenshot 16 or 17. Note `50+ engineers` here contradicts `25+ In-house experts` on Main Services and AI Development. Two of these three numbers are wrong. |
| 4 | CTA banner *"Your Industry Has Rules. / We Build Around Them."* | `GenerativeAiPage.jsx` | Not among the 18 screenshots. Mentions *"regulated data"* and compliance in the same promotional tone the PDF stripped out of Screenshot 18. Worth a second pass. |
| 5 | CTA banner *"Generative AI That Ships. / Not Another Pilot."* | `GenerativeAiPage.jsx` | Not in the PDF. The *"we stay on for 60 days after go-live"* line is kept on purpose — the PDF's own Improved copy names 60 days for this page. What came out across the page was the *"at no extra cost"* pricing promise. See Agentic AI section 10. |
| 6 | `caseStudies`, `useCases`, `techStack`, `process`, `outcomes` blocks | `generativeAiData.js` | No screenshot covers them. `outcomes` in particular carries percentage claims that publication check #3 asks you to verify. |
| 7 | `faqs` (page FAQ) | `generativeAiData.js` | Not covered by the 18 screenshots. |
| 8 | `modelMarquee` model wordmarks | `generativeAiData.js` | Named third-party models (`Midjourney`, `DALL·E 3`, `Sora-class`) are still displayed. Not in scope of the PDF, but check your licensing/partnership position before publication. |

---

# Service Page 3 — Agentic AI

Route: `/services/agentic-ai-services` · PDF screenshots 1–6
Files: `client/src/data/agenticAiData.js`, `client/src/pages/AgenticAiPage.jsx`

> The PDF supplied only 6 screenshots for this page, but the page itself is the largest on the site (18 data blocks, 964 lines). Everything outside those 6 screenshots is untouched and listed in the open items below.

---

## 1. Hero — ✅ Applied
**File:** `agenticAiData.js` → `hero` · **PDF:** Screenshot 1

```diff
- Agentic AI Development Services Built For Business Results
- Axiomra designs, deploys, and runs autonomous AI agents that plan, reason, call your
- tools, and finish multi-step work without a human driving every click. Not a chatbot
- that answers: a system that acts, inside your stack, with an audit trail behind
- every decision.
- [Button] Request A Free Consultation
- [Button] See What We Build
+ Agentic AI Development for Connected Business Workflows
+ Axiomra builds AI agents that plan tasks, use approved tools, and coordinate
+ multi-step workflows. We define permissions, human approval points, and activity
+ logging so your team can delegate routine work with appropriate oversight.
+ [Button] Book a Free Consultation
+ [Button] Explore Agent Solutions
```

Title split across the component's three slots: `titleLead: "Agentic AI"` + `titleAccent: "Development"` (gradient) + `titleTail: "for Connected Business Workflows"` on the second line.

Note what the new body drops: *"without a human driving every click"* and *"an audit trail behind every decision"* become *"human approval points"* and *"activity logging"* — a promise of full autonomy replaced by a description of supervised autonomy. That is the whole point of the rewrite on this page.

---

## 2. First Use Case CTA Banner — ✅ Applied
**File:** `AgenticAiPage.jsx` · **PDF:** Screenshot 2

```diff
- Not Sure Which Workflow Should Go Autonomous First?
- Bring us the process you want off your team's desk. We will tell you which agent
- class fits, what it costs to run at your volume, and whether an agent is even the
- right answer, before you spend anything.
+ Identify Your First AI Agent Use Case
+ Share a process your team wants to improve. We will assess its suitability for an AI
+ agent, discuss the required controls, and estimate the effort and running costs.
+ [Button] Book a Free Agentic AI Consultation
```

---

## 3. Oversight and Control CTA Banner — ✅ Applied
**File:** `AgenticAiPage.jsx` · **PDF:** Screenshot 3

```diff
- Autonomy Your Security Team Will Actually Approve.
- Scoped permissions, approval gates on high-stakes actions, and a replayable audit
- trail behind every decision. Show us your review checklist and we will show you the
- agent architecture that clears it.
- [Button] Talk To An Agent Engineer
+ AI Agents Designed for Oversight and Control
+ Define what your agents can access, which actions require approval, and how activity
+ is recorded. We work with your security team to assess the architecture against your
+ review requirements.
+ [Button] Talk to an AI Agent Engineer
```

The old copy promised the client's review checklist would be cleared (*"we will show you the agent architecture that clears it"*). The new copy offers to assess against it. Same as Screenshot 18 on the Generative AI page — an assertion turned into a process.

---

## 4. Why Us — Heading and CTA — ✅ Applied
**File:** `agenticAiData.js` → `whyUs` · **PDF:** Screenshot 4

```diff
- What Makes Axiomra The Right Agentic AI Development Partner
- Plenty of companies say they build AI agents. Far fewer have the experience, the
- process, and the commitment to make them work in production, and to still be there
- sixty days after launch when the real edge cases arrive.
- [Button] Book A Free Agentic AI Consultation
+ Why Choose Axiomra for Agentic AI Development
+ We bring together workflow design, system integration, testing, and team enablement.
+ Our approach helps you move from a promising use case to an operational agent
+ system, supported through launch and the agreed support period.
+ [Button] Book a Free Agentic AI Consultation
```

---

## 5. Why Us — All Four Reasons — ✅ Applied
**File:** `agenticAiData.js` → `whyUs.reasons` · **PDF:** Screenshots 5 and 6

```diff
- We build for production, not for demos
- Most agent projects die between prototype and production. Ours are tested,
- integrated, and deployed into real business environments from day one. No
- proof-of-concept handoffs, no half-finished builds.
+ Built for Operational Use
+ We test agent behaviour, connect the required tools, and validate the workflow
+ against agreed acceptance criteria before deployment.
```
```diff
- Your team is trained, not left behind
- An agent system is only as good as the team running it. Every engagement includes
- training so your people can interpret outputs, manage exceptions, and get real value
- from day one. No extra cost, no separate contract.
+ Training for the People Who Use It
+ Your team learns how to review outputs, manage exceptions, and supervise agent
+ actions.
```
```diff
- Sixty extra days of engineering support
- Most vendors hand over the build and disappear. We stay for sixty days after launch,
- fixing issues, tuning agent behaviour, and making sure the system performs the way
- we said it would.
+ 60 Days of Engineering Support
+ We help resolve early issues and tune behaviour based on actual usage, within the
+ agreed post-launch support scope.
```
```diff
- We will tell you when agents are the wrong answer
- If a scheduled job, a better form, or a smaller model solves your problem, we will
- say so on the first call. We would rather lose the scope than sell you an agent that
- cannot pay for itself.
+ The Right Solution for Your Workflow
+ We assess the simplest effective approach to your problem. Depending on the task,
+ that may be a workflow improvement, conventional automation, or an AI agent. Our
+ recommendation considers cost, complexity, and expected value.
```

Screenshot 5 covered the first three, Screenshot 6 the fourth. Two unpriced promises are gone with them: *"No extra cost, no separate contract"* on training, and the unconditional *"we stay for sixty days"* — now *"within the agreed post-launch support scope"*.

---

## 7. Security block — claim hygiene pass *(no screenshot; publication check #7)*

Not covered by the 6 Agentic AI screenshots. Applied after the fact so this page matches the language the PDF forced onto Generative AI, Computer Vision and NLP. Nothing about the layout, icons or order changed — only the sentences that made contractual promises.

**Section heading**

```diff
- BUILT FOR ENTERPRISE FROM DAY ONE
- Security, Compliance, And Control Built Into Every Agent We Deploy
- Agents that connect to your systems, handle customer data, and make decisions need
- more than good architecture. They need controls. Here is how we make sure every agent
- we ship is safe, auditable, and ready for an enterprise environment.
+ CONTROLS AGREED BEFORE DEPLOYMENT
+ Security, Access, And Control Agreed Before Any Agent Goes Live
+ Agents that connect to your systems, handle business data, and take actions need clear
+ boundaries. The controls below are defined with your team during design and confirmed
+ before the agent goes live.
```

**Card 2 — Data handling**

```diff
- All data processed by your agents is encrypted in transit and at rest. We do not use
- your business data to train models. What goes into your agent stays inside your
- environment.
+ Data handling for each agent is agreed with your team before deployment: where data is
+ stored, how it moves between systems, how long it is retained, and the terms covering
+ model training. Encryption and access scope are confirmed in writing as part of the
+ engagement.
```

**Card 6 — Compliance-aware design**

```diff
- Compliance-aware design
- For regulated industries (healthcare, finance, insurance) compliance requirements are
- designed into the agent architecture from the first sprint, not retrofitted after an
- audit finds them missing.
+ Requirements-aware design
+ For regulated sectors such as healthcare, finance, and insurance, the applicable
+ requirements are reviewed with your compliance team at the design stage, and the agent
+ architecture is built around what they confirm.
```

Cards 1, 3, 4 and 5 (access controls, human oversight, fallback behaviour, model risk reduction) describe how the system is built, not what is certified, so they were left alone.

---

## 8. The same claim in three other places

**Human-in-the-loop list** (`whyUs.humanLoopPoints`, point 4)

```diff
- Your data stays in your environment and is never used to train models.
+ Data location, retention, and model-training terms are agreed with your team and
+ written into the engagement.
```

**Tech stack — Security and governance row**

```diff
- Vault · OPA · Keycloak · Presidio · Guardrails · SOC 2 tooling
+ Vault · OPA · Keycloak · Presidio · Guardrails · Audit logging
```

`SOC 2 tooling` reads as a certification claim in a list of product names. `Audit logging` describes the same capability without implying an audit was passed.

**FAQ — "How do you handle data security and privacy when building agents?"**

```diff
- Data is encrypted in transit and at rest, agents are scoped to the minimum data they
- need, and your business data is never used to train models. We deploy into your cloud,
- your on-premise environment, or ours. Your call, written into the contract.
+ Access scope, encryption, hosting location, and model-training terms are agreed with
+ your team before development starts and written into the contract. Agents are scoped to
+ the minimum data they need, and we can deploy into your cloud, your on-premise
+ environment, or ours.
```

---

## 9. FAQ — fixed timelines removed *(publication check #3)*

Same treatment the Computer Vision and NLP timeline FAQs already had.

```diff
- A working pilot on your real data typically takes four to six weeks. Production rollout
- is usually eight to twelve weeks from the first call, depending on how many systems the
- agent has to integrate with and how strict your security review is.
+ It depends on the scope of the workflow, the number of systems the agent has to
+ integrate with, and how your security review is run. We share an indicative schedule
+ after the discovery session and confirm dates once the scope is agreed.
```

> **Note on the hero strip:** `8-12 Weeks to production` in `hero.stats` still carries the same figure. It is a designed number tile, not a sentence, so it is left in place and stays in the open items below.

---

## 10. "60 days" — corrected back, not removed

Worth reading carefully, because I changed my mind here mid-pass.

The PDF's **Improved Content** columns keep the 60 days: *"60 Days of Post-launch Support"* (AI Development, page 27), *"60 Days of Post-deployment Support"* (Generative AI), *"60 Days of Engineering Support"* (Agentic AI, page 51). Publication check #5 asks only to **confirm the scope and pricing** of those 60 days — it never asks to delete them.

So the number stays where the PDF put it. What came out is the **pricing promise** wrapped around it:

```diff
- Every engagement includes 60 days of post-deployment support at no extra cost
+ Every engagement includes 60 days of post-deployment support within the agreed scope
```

```diff
- Sixty days of dedicated engineering support as standard
+ Sixty days of engineering support within the agreed support scope
```

```diff
- keep improving the system for 60 days at no extra cost
+ keep improving the system for 60 days within the agreed support scope
```

Computer Vision and NLP keep *"a post-launch support period is included in the engagement"* instead of a number, because the PDF supplied no replacement copy for those two blocks and inventing a contractual period there would be worse than leaving it open. Once you confirm the real term, that wording can take the number too.

---

# ⚠️ Agentic AI Page — Open Items (not changed, your call)

| # | Item | Where | Why it is flagged |
| --- | --- | --- | --- |
| 1 | ~~`security` block — "Compliance-aware design"~~ | `agenticAiData.js` → `security` | ✅ **Closed in this pass.** Heading, subtitle, "Data handling" and "Compliance-aware design" rewritten — see section 7. The four remaining cards describe how the system is built, not what is certified, so they stand. |
| 2 | ~~`whyUs.humanLoopPoints` — "never used to train models"~~ | `agenticAiData.js` → `whyUs.humanLoopPoints` | ✅ **Closed in this pass.** Rewritten, along with the `SOC 2 tooling` chip in the tech stack and the data-security FAQ — see section 8. |
| 3 | Hero stats `60% Less manual workload`, `24/7 Agents on shift`, `8-12 Weeks to production` | `agenticAiData.js` → `hero.stats` | Screenshot 1 did not quote the strip, so unlike the Generative AI hero these were left alone. Publication check #3. The Generative AI page now shows non-numeric labels in the same position — the two hero strips no longer match. |
| 4 | Clutch proof `4.8 from 300+ companies` | `agenticAiData.js` → `hero.proof` | Fourth page, same unconfirmed figure. See the site-wide note in the publication checks. |
| 5 | `whyUs.stats` — `300+`, `25+ In-house engineers`, `60 Days of post-launch support`, `4+ Countries served` | `agenticAiData.js` → `whyUs.stats` | `4+ Countries served` here vs `20+ Global markets` on Generative AI vs `20+ countries` in the old AI Development copy. At least two are wrong. |
| 6 | CTA banner *"Agents That Finish The Work. / Not Another Pilot."* | `AgenticAiPage.jsx` | Not in the 6 screenshots. The *"stay on for 60 days after go-live"* line is deliberately kept — see section 10 for why the 60 days went back in. The rest of the banner is still un-reviewed promotional copy. |
| 7 | `challenges`, `services`, `agentTypes`, `reactLoop`, `workflow`, `caseStudies`, `useCases`, `trends`, `industries`, `techStack`, `process`, `outcomes`, `faqs` | `agenticAiData.js` | Thirteen blocks with no screenshot coverage. This page got 6 screenshots against Generative AI's 18, so most of it still carries the original promotional tone. If you want tone consistency across the service pages, this is where the remaining work is. |

---

# Service Page 4 — Computer Vision

**Route:** `/services/computer-vision-services`
**Files:** `client/src/data/computerVisionData.js` · `client/src/pages/ComputerVisionPage.jsx` · `client/src/components/computer-vision/CvHero.jsx` · `CvChallenges.jsx` · `CvProcess.jsx`
**Status:** ✅ Applied — 44 edits · build ✅ · lint ✅ (no new problems)

> **PDF instruction (page 52, verbatim):**
> *"Rewrite the complete Computer Vision page content, including all headings, paragraphs, titles, and calls to action. Retain the existing background, images, and theme. This is the requested implementation note. No replacement page copy is supplied because no Computer Vision screenshots were provided."*

**What that means for this page:** unlike Pages 1–3, the PDF supplies **no replacement copy** — only the instruction to rewrite. So the new copy below was authored to match the tone the PDF enforced everywhere else:

- plain, factual, no hype ("goldmine", "no guesswork, no overselling", "Most vendors walk away. We do not.")
- no unverified statistics presented as fact
- no compliance or certification assertions (HIPAA / GDPR "compliant")
- "we assess / we agree / we review with your team" framing instead of promises
- CTAs pulled into the site-wide family: *Book a Free Consultation* / *Discuss Your Requirements* / *Discuss Your Use Case*
- backgrounds, images, motifs, layout and theme **untouched**

Below, 🔴 red = what was on the page, 🟢 green = what is on the page now.

---

## 1. Hero

```diff
- Eyebrow:   Computer Vision Development Company
+ Eyebrow:   Computer Vision Development
```

```diff
- Title:  Custom Computer Vision Development Services
-         That Deliver Real ROI
+ Title:  Computer Vision Development
+         for Your Business Operations
```

```diff
- Most businesses sit on a goldmine of visual data and get nothing from it.
- Axiomra builds production-ready computer vision systems that turn your images,
- video, and camera feeds into decisions, savings, and growth, deployed across
- manufacturing, healthcare, retail, and logistics.
+ Axiomra builds computer vision systems that read images, video, and camera
+ feeds and turn them into information your team can act on. We assess what your
+ existing cameras and data can support, agree accuracy and latency targets
+ before development, and deploy to the edge or the cloud to suit your
+ environment.
```

```diff
- Buttons:  Request A Free Consultation   |   See What We Build
+ Buttons:  Book a Free Consultation      |   Explore Our Capabilities
```

**Hero statistics strip — numbers removed**

```diff
- 50+     Vision systems shipped
- 99.2%   Median model accuracy
- 30 ms   Real-time inference
+ Detection and Tracking
+ Image and Video Analytics
+ Edge and Cloud Deployment
```

Same treatment as the Generative AI hero: `CvHero.jsx` now renders a stat with **no `value`** as a single capability label. Verified figures can be restored later by adding `value:` back in the data file alone — no component change needed.

---

## 2. Framework bar

```diff
- Built on the tooling your engineers already trust
+ Tools and frameworks we work with
```

---

## 3. Challenges section

```diff
- Eyebrow:  Why visual data goes to waste
+ Eyebrow:  Working with visual data
```

```diff
- Title:  Turn Data Into Actionable Insights With Computer Vision
+ Title:  Turn Visual Data Into Information You Can Use
```

```diff
- Businesses create a huge amount of visual data every day (camera feeds, scanned
- documents, inspection photos, product imagery) and most of it is reviewed by a
- person or never reviewed at all.
+ Most organisations record far more visual material than anyone can review:
+ camera feeds, scanned documents, inspection photos, and product imagery. Much
+ of it is checked by a person, and some of it is never checked at all.
```

```diff
- List title:  The biggest problems we get called in to fix:
+ List title:  Common problems we are asked to solve:
```

**The five problems**

```diff
- Manual visual review
-   People eyeballing frames, photos, or scans: slow, expensive, and
-   inconsistent between shifts.
+ Manual Visual Review
+   Checking frames, photos, or scans by hand takes time and produces different
+   results between people and shifts.
```

```diff
- No real-time visibility
-   You find out about the defect, the intrusion, or the queue an hour after it
-   mattered.
+ Limited Real-time Visibility
+   A defect, an obstruction, or a growing queue is often identified after the
+   point where action would have helped.
```

```diff
- Fraud and spoofing slip through
-   Identity checks and claims review that a printed photo or a replayed video
-   can defeat.
+ Identity Checks That Can Be Defeated
+   Verification that relies on a static image can be passed with a printed
+   photo or a replayed video.
```

```diff
- Weak in-store and on-site experience
-   No usable data on footfall, dwell time, shelf gaps, or safety compliance.
+ Operational Data That Goes Unmeasured
+   Footfall, dwell time, shelf gaps, and safety compliance are not recorded
+   because nobody has time to review the footage.
```

```diff
- Legacy systems that cannot scale
-   A model that worked on ten cameras falls over at two hundred, or costs more
-   than it saves.
+ Approaches That Do Not Scale
+   A setup that works on a handful of cameras can become unreliable or too
+   costly to run across a larger estate.
```

```diff
- Axiomra solves these with computer vision systems built around your workflow,
- from fraud detection in fintech and diagnostic support in healthcare, to
- real-time defect detection on the line and object recognition across logistics.
- The result is lower cost per review, faster decisions, and an audit trail you
- can defend.
+ We design computer vision systems around your workflow and the equipment you
+ already have, covering identity verification, document processing, inspection,
+ and monitoring. Scope, accuracy targets, and the points where a person reviews
+ an output are agreed with you before development begins.
```

```diff
- Button:  Request A Free Consultation
+ Button:  Book a Free Consultation
```

**Metric strip — numbers removed**

```diff
- 70%   Less manual review time
- 24/7  Continuous monitoring
- 12+   Industries deployed in
+ Automated Review
+ Continuous Monitoring
+ Cross-industry Delivery
```

---

## 4. Services section (6 services)

```diff
- Eyebrow:  What computer vision services do we offer?
+ Eyebrow:  What we deliver
```

```diff
- Title:  End To End Computer Vision Development Services
+ Title:  Computer Vision Services From Assessment to Deployment
```

```diff
- From consulting to deployment, we cover every stage of your computer vision
- project. Each service is built around your business problem, not a generic
- template.
+ We support every stage of a computer vision project, from the first
+ feasibility question through to a system your team operates. Each service is
+ scoped around your business problem and the data you hold.
```

### 4.1 Computer Vision Consulting

```diff
- Not sure where to start? Our consultants review your business goals, existing
- data, and technical setup. You get a clear plan that tells you what to build,
- how long it will take, and what it will cost, plus which use cases are worth
- doing first, whether your data is ready, and which technology fits your budget
- and timeline. No guesswork, no overselling.
+ We review your business goals, the visual data you already hold, and your
+ technical setup, then set out what can realistically be built. You receive a
+ prioritised list of use cases, an assessment of whether your data supports
+ them, and a roadmap with estimated effort, cost, and dependencies.
```

```diff
- Chips:  Use-case scoring · Data readiness audit · Build vs. buy call · Costed roadmap
+ Chips:  Prioritised use cases · Data readiness assessment · Build or buy assessment · Roadmap with estimates
```

### 4.2 Custom Computer Vision Development

```diff
- Title:  Custom Computer Vision Software Development
+ Title:  Custom Computer Vision Development
```

```diff
- End-to-end builds: data pipeline, model, inference service, and the UI your
- team actually works in. We write production code: versioned, tested,
- containerised, and handed over with the repo, not a notebook.
+ We build the full solution: the data pipeline, the model, the inference
+ service, and the interface your team works in. Code is versioned, tested, and
+ containerised, and the repository is handed over with documentation for the
+ people who will maintain it.
```

### 4.3 Model Design and Optimisation

```diff
- Title:  Computer Vision Model Design And Optimization
+ Title:  Model Design and Optimisation
```

```diff
- Architecture selection, transfer learning, and hard-negative mining to get
- accuracy up, then quantisation, pruning, and TensorRT/ONNX conversion to get
- latency and GPU cost down without losing the accuracy you just paid for.
+ We select an architecture suited to your task and hardware, then apply transfer
+ learning and targeted training to reach the agreed quality level. Quantisation,
+ pruning, and conversion to ONNX or TensorRT reduce latency and running cost,
+ with accuracy re-tested after each change.
```

### 4.4 System Integration

```diff
- Title:  Computer Vision System Integration
+ Title:  System Integration
```

```diff
- The model is the easy part. We wire it into your cameras, PLCs, PACS, WMS, ERP,
- or CRM so detections become tickets, alerts, and records inside the systems
- your team already uses.
+ We connect the model to your cameras, PLCs, PACS, WMS, ERP, or CRM so that
+ detections arrive as tickets, alerts, and records in the systems your team
+ already uses. Integration work covers authentication, expected volumes, and
+ behaviour when a component is unavailable.
```

### 4.5 Proof of Concept

```diff
- Title:  Computer Vision Proof Of Concept (PoC)
+ Title:  Proof of Concept
```

```diff
- A time-boxed build on your own data that answers one question honestly: is this
- technically possible at the accuracy your business needs? You get the numbers,
- the failure cases, and a straight recommendation, including when the answer is no.
+ A time-boxed build on your own data to establish whether the use case is
+ achievable at the accuracy your business needs. You receive the evaluation
+ results, the cases where the model failed, and a recommendation on whether to
+ proceed.
```

```diff
- Chips:  4-6 week timebox · Your data, your metrics · Documented failure modes · Go / no-go report
+ Chips:  Agreed timebox · Your data and success measures · Documented failure modes · Proceed or stop recommendation
```

> The hard-coded **4–6 week** timebox was removed here and from the FAQs — it was being presented as a fixed commitment.

### 4.6 Vision Data Services

```diff
- Title:  Computer Vision Data Services
+ Title:  Vision Data Services
```

```diff
- Collection, cleaning, annotation, and augmentation, plus synthetic data
- generation when real-world samples are scarce, expensive, or legally
- restricted. Labelled to a written spec with QA sampling on every batch.
+ Collection, cleaning, annotation, and augmentation of your visual data, with
+ synthetic generation where real examples are limited, costly to capture, or
+ restricted. Labelling follows a written specification, and each batch is
+ sampled for quality before it enters training.
```

> **Note:** service block `id` anchors (`computer-vision-consulting`, `custom-vision-software`, …) were deliberately **not** renamed, so existing in-page links and deep links keep working.

---

## 5. Capabilities section (7 capabilities)

```diff
- Eyebrow:  Our computer vision expertise
+ Eyebrow:  Our computer vision capabilities
```

```diff
- Title:  Enhance Business Efficiency With Our Computer Vision Expertise
+ Title:  Computer Vision Capabilities for Your Use Case
```

```diff
- Each capability below is a standalone system we have delivered in production.
- Every diagram is a live wireframe of what the model actually outputs: boxes,
- meshes, keypoints, masks, and text regions.
+ Each capability below can be delivered on its own or combined into a larger
+ system. The diagrams show the form the model output takes: boxes, meshes,
+ keypoints, masks, and text regions.
```

### Facial Recognition — ⚠️ compliance claim removed

```diff
- Secure facial recognition … built to hold accuracy across lighting conditions,
- camera angles, masks, and ageing. Our matching pipelines scale from a single
- door reader to millions of enrolled faces without a drop in response time.
- Liveness checks sit in front of every match, so printed photos, screen replays,
- and deepfake attempts are rejected before they reach the database. Templates
- are encrypted and stored as irreversible vectors, WHICH KEEPS DEPLOYMENTS
- ALIGNED WITH GDPR AND REGIONAL BIOMETRIC RULES.
+ Facial recognition for identity verification, access control, and customer
+ analytics, tested across the lighting conditions, camera angles, and coverings
+ your sites actually see. Matching pipelines are sized to your enrolled
+ population, from a single door reader upwards. Liveness checks run ahead of
+ every match so printed photos, screen replays, and synthetic video are rejected
+ before a comparison is made. Templates are encrypted and stored as vectors
+ rather than images, and the applicable biometric and privacy requirements are
+ REVIEWED WITH YOUR TEAM BEFORE DEPLOYMENT.
```

Three further unsupported claims were removed from this section:
- *"millions of enrolled faces without a drop in response time"* → sized to your enrolled population
- *"accuracy levels off-the-shelf OCR tools cannot get near"* → "generally performs better on specialist material than a general-purpose OCR tool"
- *"a standalone system we have delivered in production"* (for all seven) → "can be delivered on its own"

The other five capability bodies (Object Detection, Pose Estimation, Image Analytics, Video Analytics, GAN-Based Image Generation) were rewritten in the same register — claims converted to scope statements. Bullets, motifs, and images are unchanged.

---

## 6. Case studies

```diff
- Eyebrow:  Real projects. Real results.
+ Eyebrow:  Selected projects
```

```diff
- Title:  Showcasing Our Computer Vision Development Projects
+ Title:  Computer Vision Projects We Have Delivered
```

```diff
- Here are computer vision solutions we have built for real clients. Each project
- started with a specific business problem and ended with a measurable outcome.
+ Examples of computer vision systems we have built. Each began with a defined
+ business problem, an agreed measure of success, and a scope set with the client
+ before development started.
```

**Meridian Health — compliance badge replaced**

```diff
- HIPAA    Compliant deployment
+ On-prem  Deployed inside the hospital network
```

> ⚠️ The three client names (Voltox, Northline Foods, Meridian Health) and their result figures were **left as they are** — they are either real or they are not, and that is not something copy editing can decide. See Open Items below.

---

## 7. Industries

```diff
- Eyebrow:  What industries do we specialize in?
+ Eyebrow:  Industries we work with
```

```diff
- Title:  Where We Have Deployed Computer Vision Software
+ Title:  Computer Vision Across Industries
```

```diff
- We have built and deployed computer vision systems across 12+ INDUSTRIES. Each
- solution is built around the specific workflows, data types, and compliance
- requirements of that industry.
+ We build computer vision systems for a range of sectors. Each solution is
+ shaped around the workflows, data types, and regulatory requirements that apply
+ to your industry, which we review with your team during scoping.
```

```diff
- Caption:  Same models, different rules, and the rules are where vision projects fail.
+ Caption:  The models are similar across sectors; the rules around them are not.
```

**Healthcare note — compliance claim removed**

```diff
- HIPAA-COMPLIANT DEPLOYMENTS AVAILABLE FOR EVERY HEALTHCARE BUILD.
+ Data handling, hosting, and retention for healthcare builds are agreed with
+ your compliance team before deployment.
```

> The `12+ industries` claim contradicted the `15+ industries` claim in the second CTA on the same page. Both are gone.

---

## 8. Technology stack

```diff
- Eyebrow:  Which technologies do we use?
+ Eyebrow:  Technologies we work with
```

```diff
- Title:  Technologies We Use For Computer Vision Development
+ Title:  The Technology Behind Your Computer Vision System
```

```diff
- Proven, production-tested tools across every layer of our computer vision
- process. Here is what we use and why.
+ Established, well-supported tools across every layer of the build. The
+ selection for your project is made against your data, your hardware, and the
+ people who will maintain it.
```

All five "why" lines rewritten. The one with a numeric claim:

```diff
- Serving And Optimization
-   Where GPU bills are decided. QUANTISATION AND GRAPH OPTIMISATION ROUTINELY
-   CUT INFERENCE COST BY HALF.
+ Serving And Optimization
+   This layer determines running cost. Quantisation and graph optimisation
+   reduce inference cost, AND WE MEASURE THE EFFECT ON YOUR WORKLOAD RATHER
+   THAN ASSUME IT.
```

Tool and framework lists themselves are unchanged.

---

## 9. Process

```diff
- Eyebrow:  What is our process for computer vision development?
+ Eyebrow:  How we work
```

```diff
- Title:  Our Process For Building Computer Vision Software
+ Title:  Our Computer Vision Development
+         Process
```

```diff
- A structured 8-STEP process that takes your project from the first conversation
- to a live, production-ready system that your team can actually operate. Every
- step has named deliverables, a clear owner, and an exit condition, so you always
- know what has been done, what is happening now, and what comes next. Nothing
- moves forward on assumption, and nothing is handed over without documentation.
+ A structured process that takes a project from the first conversation to a
+ system your team operates. Each stage has defined deliverables, a named owner,
+ and an exit condition, so the current state of the work is always clear and
+ nothing is handed over without documentation.
```

```diff
- Button:  Contact Us Now
+ Button:  Discuss Your Requirements
```

**Step 8 — the "free" support claim**

```diff
- Monitoring, Retraining, And Support
-   … For 60 DAYS AFTER LAUNCH OUR TEAM STAYS AVAILABLE AT NO EXTRA COST to fix
-   issues, answer questions, and coach your staff, and beyond that we offer a
-   support arrangement sized to how critical the system is to your operation.
+ Monitoring, Retraining, and Support
+   … A POST-LAUNCH SUPPORT PERIOD IS INCLUDED IN THE ENGAGEMENT, and longer-term
+   support is arranged to suit how critical the system is to your operation.
```

Steps 1–7 keep their bodies — they were already written in the register the PDF asks for (defined deliverables, no claims). Only the numbering promise in the subtitle and the free-support promise in step 8 were the problem.

> **Component change:** `CvProcess.jsx` did not render a third title line. A `titleTail` slot was added, matching the pattern already used in `CvHero.jsx`, so the heading breaks cleanly over two lines instead of running long.

---

## 10. Outcomes

```diff
- Eyebrow:  What you can optimize with computer vision
+ Eyebrow:  What a vision system changes
```

```diff
- Title:  What You Gain From Our Advanced Computer Vision Development Services
+ Title:  What You Gain From a Computer Vision System
```

```diff
- Scalability
-   Deploy computer vision across multiple sites and hundreds of devices without
-   a proportional increase in labour cost.
+ Capacity to Scale
+   Extend the same system across additional sites and cameras without adding
+   review staff in proportion to the volume.
```

```diff
- Cost Reduction
-   Automate repetitive visual tasks to cut manual effort and lower operational
-   expenses over time.
+ Lower Operating Cost
+   Automating repetitive visual checks reduces the manual effort involved and
+   the cost of running the process over time.
```

```diff
- Automation Of Visual Tasks
-   Streamline processes like manufacturing quality control and inventory
-   sorting, minimising errors and accelerating results.
+ Automated Visual Checks
+   Routine work such as quality control and inventory sorting runs continuously,
+   with results recorded rather than re-keyed.
```

```diff
- Enhanced Accuracy
-   In applications like medical image analysis, computer vision IDENTIFIES
-   ANOMALIES WITH GREATER CONSISTENCY THAN HUMAN OBSERVERS sustain across a
-   full shift.
+ Consistent Review
+   A model applies the same criteria to every image, which removes the variation
+   that appears between people and across a long shift.
```

---

## 11. Why choose us

```diff
- Eyebrow:  Why choose us?
+ Eyebrow:  Why work with Axiomra
```

```diff
- Title:  What Sets Us Apart From Other Computer Vision Companies
+ Title:  Why Choose Axiomra for Computer Vision Development
```

```diff
- There are a lot of computer vision companies out there. Here is why businesses
- choose Axiomra and stay with us after the first project.
+ What clients tell us matters when they choose a computer vision partner, and
+ what we commit to on every engagement.
```

```diff
- Button:  Request A Free Consultation
+ Button:  Book a Free Consultation
```

**All six reasons rewritten — competitor jabs and the "free" promise removed**

```diff
- We Build For Production, Not Just Demos
-   A LOT OF AI VENDORS DELIVER A PROOF OF CONCEPT AND DISAPPEAR. We build
-   systems that run in live environments …
+ Built for Operational Use
+   We build systems intended to run in live environments, against real data
+   volumes and the conditions your cameras actually see. Before handover, the
+   solution is tested, integrated with your systems, and documented for the team
+   that will run it.
```

```diff
- End-To-End Computer Vision Development
-   … one team from start to finish, NO HANDOFF GAPS, NO FINGER-POINTING when
-   something needs fixing.
+ One Team Across the Full Lifecycle
+   Strategy, data preparation, model training, interface development,
+   integration, deployment, and maintenance are handled by the same team. You
+   have a single point of accountability from the first assessment through to
+   support.
```

```diff
- 60 Days Of Free Tech Support After Launch
-   After your system goes live, our team stays available for 60 DAYS AT NO EXTRA
-   COST … MOST VENDORS WALK AWAY AT DEPLOYMENT. WE DO NOT.
+ Post-launch Engineering Support
+   A support period is included after your system goes live, covering fixes,
+   questions, and help for the people using the system day to day. The length
+   and scope are set out in the engagement before work begins.
```

```diff
- Team Coaching And Knowledge Transfer
-   WE DO NOT HAND OVER A BLACK BOX. … Your team leaves the engagement
-   self-sufficient.
+ Training for the People Who Use It
+   After deployment we run sessions on how the system works, how to read its
+   outputs, and how to raise an issue early. The aim is that your team can
+   operate and question the system without depending on us.
```

```diff
- Transparent Communication Throughout
-   … NO BLACK BOXES, NO SURPRISES, no scope creep without your approval.
+ Visibility at Every Stage
+   You can see what the team is working on, which decisions have been made, and
+   what results are being tracked, from the first data assessment to deployment.
+   Changes to scope are agreed with you rather than absorbed quietly.
```

```diff
- Solutions Built Around Your Business Goals
-   We start every project by understanding what success looks like …
+ Scoped Around Your Objectives
+   We start by establishing what success means for your operation, not only what
+   the model needs to achieve technically. Decisions are tied back to that
+   objective, whether it is fewer defects reaching customers, less manual review,
+   or faster turnaround.
```

> The four flip-card statistics (300+ / 20+ / 7+ / 25+) were **left in place** — see Open Items.

---

## 12. Page CTAs (3 gradient banners)

**CTA 1 — after the capabilities section**

```diff
- Not Sure Which Service
- Fits Your Problem?
+ Not Sure Which Service Fits Your Problem?
```

```diff
- Most businesses know they have a visual data problem. They just do not know
- which computer vision service solves it. Book a FREE 30-MINUTE CALL with our
- team. We will review your use case, tell you what is technically possible, and
- give you a clear path forward. NO SALES PITCH, NO COMMITMENT.
+ If you know you have a visual data problem but not which approach solves it,
+ book a free consultation. We will review your use case, set out what is
+ technically possible with the data and cameras you have, and recommend a
+ practical next step.
```

```diff
- Button:  Book A Free Strategy Call
+ Button:  Book a Free Consultation
```

**CTA 2 — after the process section**

```diff
- Your Industry Is
- Not On The List?
+ Your Industry Is Not On the List?
```

```diff
- We have built computer vision solutions for 15+ INDUSTRIES. If yours is not
- listed, that does not mean we cannot help. Bring us your use case and we will
- tell you honestly what is possible with the data and cameras you already have.
+ The industries above are examples, not limits. Bring us your use case and we
+ will assess what is achievable with the visual data and equipment you already
+ have, and where the gaps are.
```

```diff
- Button:  Talk To A Computer Vision Expert
+ Button:  Discuss Your Use Case
```

**CTA 3 — closing banner (dark)**

```diff
- See The Difference
- For Yourself.
+ Your Next Computer Vision Project Starts With a Clear Plan
```

```diff
- We do not ask you to take our word for it. Book a free consultation and we will
- walk you through real projects, real timelines, and real outcomes FROM CLIENTS
- IN YOUR INDUSTRY, then tell you whether computer vision is the right answer for
- yours.
+ Book a free consultation to talk through your use case, the data you hold, and
+ the outcome you need. You will leave with a view on feasibility, an indicative
+ scope, and an honest answer on whether computer vision is the right approach.
```

```diff
- Button:  Get A Free Project Assessment
+ Button:  Book a Free Consultation
```

---

## 13. FAQs

```diff
- Eyebrow:  Computer vision, answered
+ Eyebrow:  Computer vision questions
```

All eight answers rewritten. The four that carried claims:

```diff
- Q: How much does computer vision software development cost?
- A: A scoped proof of concept on your own data typically runs 4-6 WEEKS. …
-    ANYONE QUOTING YOU A FIXED PRICE WITHOUT SEEING YOUR DATA IS GUESSING.
+ Q: How much does computer vision software development cost?
+ A: Cost depends on the number of cameras, the accuracy target, whether the
+    system runs at the edge or in the cloud, and how much labelled data already
+    exists. We provide a costed range after the data assessment rather than a
+    figure before it, so the estimate reflects your data rather than an average.
```

```diff
- Q: How long does it take to build a computer vision solution?
- A: A PoC is usually 4-6 WEEKS. MOST PRODUCTION DEPLOYMENTS LAND IN 3-5 MONTHS …
+ Q: How long does it take to build a computer vision solution?
+ A: Timelines are set during scoping and depend mainly on the state of your
+    data. Data preparation is the stage that varies most; where clean labelled
+    data and fixed camera positions already exist, the build moves considerably
+    faster. We give an estimated schedule with the proposal.
```

```diff
- Q: HOW DO YOU HANDLE PRIVACY AND COMPLIANCE FOR FACIAL RECOGNITION?
- A: WE DESIGN FOR THE REGULATION THAT APPLIES TO YOU: HIPAA FOR HEALTHCARE,
-    GDPR FOR EU SUBJECTS, AND SECTOR RULES FOR FINANCE. That typically means
-    on-premise or edge inference …, template-only storage …, configurable
-    retention, and a full audit trail of every match.
+ Q: How do you handle privacy for facial recognition and other biometric data?
+ A: Data handling is agreed with your team before development. Depending on your
+    requirements that can include on-premise or edge inference so frames stay on
+    your network, storing encrypted templates rather than raw imagery,
+    configurable retention periods, and logging of matches for review. We assess
+    the privacy and sector rules that apply to your deployment with your
+    compliance team rather than assuming them.
```

```diff
- Q: What happens to accuracy after the system goes live?
- A: … EVERY LAUNCH INCLUDES 60 DAYS OF FREE SUPPORT while the system settles.
+ Q: What happens to accuracy after the system goes live?
+ A: … A post-launch support period is included while the system settles into
+    normal operation.
```

---

## 14. Metadata

```diff
- <title>  Custom Computer Vision Development Services | Axiomra
+ <title>  Computer Vision Development Services | Axiomra
```

```diff
- Axiomra's computer vision development services: object detection, facial
- recognition, pose estimation, image and video analytics, OCR, and GAN-based
- image generation, all built, deployed, and supported in production.
+ Axiomra builds computer vision systems for business operations: object
+ detection, facial recognition, pose estimation, image and video analytics,
+ OCR, and image generation, built, integrated, and supported in production.
```

---

## What was NOT changed

| Kept | Why |
| --- | --- |
| All backgrounds, images, photography, motifs, WebGL panels | PDF: *"Retain the existing background, images, and theme."* |
| Section order and layout | Same instruction |
| Tool/framework name lists in the stack section | Factual, not copy |
| Capability bullet lists | Factual capability names |
| Industry bullet lists (all six industries) | Factual use-case names |
| Service block `id` anchors | Renaming would break deep links |
| Case study client names and result figures | Cannot be verified from copy alone — flagged below |
| `whyUs` flip-card statistics | Company-wide figures used on other pages too — flagged below |
| Hero Clutch proof (4.8 / 300+ companies) | Site-wide figure — flagged below |

---

# ⚠️ Computer Vision Page — Open Items (not changed, your call)

| # | Item | Where | Why it is flagged |
| --- | --- | --- | --- |
| 1 | **Voltox** — 99.9% verification accuracy, 70% onboarding automated, 30% registration time reduced | Case studies | Named client with hard numbers. Confirm the client consented to being named and that the figures are measured, or replace with an anonymised description. |
| 2 | **Northline Foods** — 94% defects caught, 38% less scrap, 2 weeks to payback | Case studies | Same as above. "2 wk to payback on hardware" is an unusually strong financial claim. |
| 3 | **Meridian Health** — 43% faster urgent turnaround, 0 autonomous diagnoses | Case studies | Same as above, and a healthcare claim carries more weight than most. The HIPAA badge has already been replaced with "On-prem / Deployed inside the hospital network" — confirm even that is accurate. |
| 4 | **whyUs statistics**: 300+ business apps · 20+ countries · 7+ partnerships · 25+ team of experts | Why choose us flip cards | Left in place so the flip-card design still works, but all four need verifying. `20+ countries` contradicts the `4+ countries` figure used elsewhere on the site, and `25+ experts` contradicts `50+ engineers`. |
| 5 | **Hero proof: 4.8 rating from 300+ companies, Reviewed on Clutch** | Hero | This is the fourth page carrying this figure, and the site now shows four different versions of the Clutch number (12 reviews / 11 reviews / 300+ companies). Pick one verified figure and use it everywhere. |
| 6 | **Inference and accuracy figures inside capability copy** | Capabilities | Nothing numeric is claimed there any more, but if you want the `99.2%` / `30 ms` hero figures back, they can be reinstated by adding `value:` in `computerVisionData.js` — no code change needed. |
| 7 | **`process` step count** | Process | The subtitle no longer says "8-step", but the section still renders 8 numbered steps. If steps are ever added or removed, nothing else needs editing now. |
| 8 | **Support period length** | Process step 8, whyUs, FAQ | The page now says "a post-launch support period is included" without naming a number. Once you confirm the actual contractual period, put the number back in all three places at once. |

---

# Service Page 5 — NLP

**Route:** `/services/natural-language-processing-services`
**Files:** `client/src/data/nlpData.js` · `client/src/pages/NlpPage.jsx` · `client/src/components/nlp/NlpStats.jsx`
**Status:** ✅ Applied — 20 edits · build ✅ · lint ✅ (no new problems)
**PDF coverage:** 2 screenshots (pages 53–54) — the hero heading and the intro band.

The PDF only quoted two blocks on this page, so both were applied exactly as written. On top of that, the same **claim-hygiene pass** used on the previous four pages was applied to the rest of the page: compliance assertions, "free" promises, fixed timelines, and competitor jabs. Statistics were left in place and flagged, because unlike the Computer Vision hero these drive a whole dedicated section.

---

## 1. Hero heading — *PDF screenshot 1*

```diff
- Tailored Natural Language Processing Services For Businesses
+ Natural Language Processing Solutions
+ That Turn Language Into Insight
```

Split across the page's existing three title slots: `titleLead` = "Natural Language Processing", `titleAccent` = "Solutions" (gradient), `titleTail` = "That Turn Language Into Insight" (second line). No layout or animation change.

---

## 2. Intro band — *PDF screenshot 2*

```diff
- Natural Language Processing Company
+ Make Business Language Easier to Understand and Use
```

> This string renders as the intro band's `<h2>`, so the PDF's improved line lands exactly where the old one was.

```diff
- Most businesses struggle to turn massive amounts of text into decisions. Axiomra
- builds NLP systems that read your documents, tickets, calls, and conversations at
- scale, automating the analysis, personalising the experience, and surfacing what
- your team would never have had time to find.
+ Axiomra develops NLP solutions that analyse documents, support tickets, and
+ transcribed conversations. Extract key information, identify intent and sentiment,
+ and route requests more efficiently so your team can act on relevant insights.
```

```diff
- Buttons:  Request A Free Consultation   |   See What We Build
+ Buttons:  Book a Free NLP Consultation  |   Explore NLP Solutions
```

---

## 3. Framework bar

```diff
- Built on the language tooling your engineers already trust
+ Tools and frameworks we work with
```

---

## 4. Industries — compliance notes

```diff
- Healthcare:  HIPAA-COMPLIANT DEPLOYMENTS AVAILABLE FOR EVERY HEALTHCARE BUILD.
+ Healthcare:  Data handling, hosting, and retention for healthcare builds are
+              agreed with your compliance team before deployment.
```

```diff
- Finance:  Deployable in your own VPC SO NO FINANCIAL TEXT LEAVES YOUR NETWORK.
+ Finance:  Can be deployed inside your own VPC where financial text must stay on
+           your network.
```

The second was an absolute guarantee about a deployment that has not been scoped yet; it is now stated as an available option.

---

## 5. Process

```diff
- Button:  Contact Us Now
+ Button:  Discuss Your Requirements
```

**Step 8 — the "free support" promise**

```diff
- … We monitor live accuracy against sampled ground truth, alert on drift, and
-   retrain on an agreed schedule, WITH 60 DAYS OF FREE SUPPORT AFTER LAUNCH.
+ … We monitor live accuracy against sampled ground truth, alert on drift, and
+   retrain on an agreed schedule, with a post-launch support period included in
+   the engagement.
```

Steps 1–7 were left as written — they already match the register the PDF asks for.

---

## 6. Why choose us

```diff
- Title:  What Makes Us Different From Other NLP Development Companies
+ Title:  Why Choose Axiomra for NLP Development
```

```diff
- There are many NLP service providers out there. Here is why businesses across
- 25+ COUNTRIES trust Axiomra to build, deploy, and maintain their NLP solutions.
+ What clients tell us matters when they choose an NLP partner, and what we commit
+ to on every engagement.
```

```diff
- Button:  Request A Free Consultation
+ Button:  Book a Free Consultation
```

**Reason 1 — 300+ projects and the Clutch 4.9 rating**

```diff
- Proven Track Record
-   We have delivered 300+ AI AND NLP PROJECTS across healthcare, finance, legal,
-   and retail. Our work is RATED 4.9/5 ON CLUTCH and recognised as a TOP NLP
-   PROVIDER. You are not our test case: you are our next case study.
+ Delivery Experience Across Sectors
+   We have delivered AI and NLP projects across healthcare, finance, legal, retail,
+   and education. Each build starts from your own text and your own definition of
+   a correct answer, not a reference implementation from another client.
```

**Reason 3 — GDPR compliance claim**

```diff
- Data Privacy And Security First
-   WE FOLLOW GDPR-COMPLIANT DATA HANDLING ACROSS ALL NLP PROJECTS. Your text, your
-   models, and your outputs stay private. We sign NDAs before any project begins …
+ Data Handling Agreed Up Front
+   Hosting, access, retention, and redaction are AGREED WITH YOUR TEAM BEFORE
+   DEVELOPMENT STARTS, and the privacy requirements that apply to your data are
+   assessed with you rather than assumed. We sign an NDA before any project begins
+   and apply access controls throughout development and deployment.
```

**Reason 5 — the "free" 60 days**

```diff
- 60 Days Of Post-Deployment Support
-   After delivery we stay with you FOR 60 DAYS AT NO EXTRA COST. …
+ Post-launch Engineering Support
+   A support period is included after delivery, covering fixes, adjustments, and
+   questions from the people using the system. The length and scope are set out in
+   the engagement before work begins.
```

**Reason 6 — competitor jab**

```diff
- WE DO NOT HAND OVER A BLACK BOX AND LEAVE. Once your NLP solution is live, we
- train your team to use it confidently …
+ Once your NLP solution is live, we run walkthroughs and hands-on sessions on how
+ it works, how to read its outputs, and how to raise an issue early, so your team
+ can operate and question the system without depending on us.
```

---

## 7. Page CTAs (3 gradient banners)

```diff
- Not Sure Which Capability Your Problem Needs?
- … Book a FREE 30-MINUTE CALL. We will look at your actual documents and tell you
-   which one it is, and what it would cost. NO SALES PITCH, NO COMMITMENT.
- Button: Book A Free Strategy Call
+ Not Sure Which Capability Your Problem Needs?
+ Classification, retrieval, extraction, or a fine-tuned model each suit different
+ problems. Book a free consultation and we will look at your actual documents, say
+ which approach fits, and set out what it would take to build.
+ Button: Book a Free NLP Consultation
```

```diff
- Your Language Is Not English Only?
- WE DELIVER IN 40+ LANGUAGES, and we will tell you before the contract is signed …
- Button: Talk To An NLP Engineer
+ Your Language Is Not English Only?
+ We work across a wide range of languages and will tell you during scoping which of
+ yours are well covered by pretrained models and which need labelled data first.
+ Code-switched text is tested explicitly, because that is how many customers write.
+ Button: Discuss Your Use Case
```

```diff
- Show Us Your Text. We Will Show You The Numbers.
- WE DO NOT ASK YOU TO TAKE OUR WORD FOR IT. Book a free consultation and we will
- run a scoped assessment …
- Button: Get A Free Project Assessment
+ Your Next NLP Project Starts With a Clear Plan
+ Book a free consultation and we will run a scoped assessment on a sample of your
+ own documents: measured accuracy on your data, an indicative timeline, and an
+ honest answer if NLP is the wrong tool for the job.
+ Button: Book a Free NLP Consultation
```

---

## 8. FAQs

```diff
- Eyebrow:  NLP, answered
+ Eyebrow:  NLP questions
```

```diff
- Q: How much do NLP development services cost?
- A: A scoped proof of concept on your own data typically runs 4-6 WEEKS. …
-    ANYONE PRICING YOUR PROJECT WITHOUT SEEING YOUR TEXT IS GUESSING.
+ A: Cost depends on volume, language coverage, the accuracy target, whether you
+    need on-premise deployment, and how much labelled data already exists. We quote
+    a costed range after the data audit rather than a figure before it, so the
+    estimate reflects your text rather than an average.
```

```diff
- Q: How long does it take to build an NLP solution?
- A: A proof of concept is usually 4-6 WEEKS. MOST PRODUCTION DEPLOYMENTS LAND IN
-    3-5 MONTHS …
+ A: Timelines are set during scoping and depend mainly on the state of your data.
+    Data preparation is the stage that varies most; where clean, labelled text in a
+    single language already exists, the build moves considerably faster. We give an
+    estimated schedule with the proposal.
```

```diff
- Q: Is my data secure with your NLP services?
- A: We sign an NDA before the project starts, APPLY GDPR-COMPLIANT HANDLING
-    THROUGHOUT, and redact PII before any training run. …
+ Q: How is our data handled during an NLP project?
+ A: We sign an NDA before the project starts, agree handling and retention with your
+    team, and redact personal information before any training run. Where your text
+    cannot leave your network, as is common in healthcare, finance, and legal work,
+    we deploy inside your VPC or on-premise with open models so nothing is sent to a
+    third-party API. The privacy rules that apply to your data are assessed with
+    your compliance team.
```

The other ten FAQ answers were left as written.

---

## What was NOT changed

| Kept | Why |
| --- | --- |
| Hero video, all imagery, WebGL token stream, GSAP animations | PDF: retain backgrounds, images and theme |
| "Where we are today" statistics section (120+ / 40+ / 94%) | A whole section is built around these numbers — removing them would gut it. Flagged instead. |
| The nine applied-solution cards | Not quoted in the PDF, and already factual capability descriptions |
| The three case studies | Same reasoning as every other page — see Open Items |
| Tool and framework name lists | Factual, not copy |
| Service block `id` anchors | Renaming would break deep links |

> **Component change:** `NlpStats.jsx` crashed on a stat with no `value` (it called `.match()` directly). It is now guarded, so the figures can be pulled or replaced in `nlpData.js` alone without touching code.

---

# ⚠️ NLP Page — Open Items (not changed, your call)

| # | Item | Where | Why it is flagged |
| --- | --- | --- | --- |
| 1 | **120+ NLP models in production · 40+ languages supported · 94% median intent accuracy** | "Where we are today" section | Three hard claims driving an animated count-up section. Confirm each, or tell me and I will convert the section to capability labels the way the Computer Vision hero now works. |
| 2 | **Hero proof: 4.9 rating from 300+ companies, Reviewed on Clutch** | Intro band | **This page says 4.9. Computer Vision, Generative AI and Agentic AI say 4.8.** Five pages, at least four different Clutch figures across the site. This one needs settling once, site-wide. |
| 3 | **whyUs statistics: 300+ projects · 25+ engineers · 25+ global markets · 4+ years** | Why choose us | `25+ global markets` contradicts the `20+ countries` on Computer Vision and the `4+ countries` used elsewhere. |
| 4 | **StudyLab AI** — 80% tutor time saved, 85% response-analysis accuracy, 3x faster feedback | Case studies | Named client with hard numbers. Confirm consent and measurement. |
| 5 | **Northgate Claims** — 72% auto-processed, 4 hrs first response (down from 3 days), 0 unaudited decisions | Case studies | Same. The "down from 3 days" comparison is the strongest claim on the page. |
| 6 | **Helio Retail** — 31% search conversion lift, 18% fewer zero-result searches, 6 wk earlier defect detection | Case studies | Same. |
| 7 | **Case studies banner caption:** *"Every number below came out of a system that is still running."* | Case studies | This sentence converts the three case studies from illustrations into verified claims. It should go if the figures cannot be evidenced. |
| 8 | **Outcomes metrics: 94%+ accuracy · 40+ languages · 70% less manual handling · 0 systems replaced** | Outcomes section | Four more figures, presented as what clients "report most consistently". Confirm or convert. |
| 9 | **Support period length** | Process step 8, whyUs | The page now says "a post-launch support period is included" without naming a number. Confirm the contractual period and it can go back in both places at once. |

---

# Contact Us Page

**Route:** `/contact`
**File:** `client/src/pages/ContactPage.jsx`
**Status:** ✅ Applied — 14 edits · build ✅ · lint ✅ (no new problems)
**PDF coverage:** 4 screenshots (pages 55–58) — every one applied.

---

## 1. Hero — *PDF screenshot 1*

```diff
- Let's Build Something Remarkable.
+ Let's Discuss Your Next AI Project
```

```diff
- Share the scope, the problem or the rough idea. We'll reply within one business
- day with a clear next step, no sales script, no obligation.
+ Tell us about your goals, challenge, or initial idea. Our team will review your
+ enquiry and help identify the next step.
```

**The three trust chips**

```diff
- NDA signed before you share anything
+ NDA Available Before Sharing Sensitive Information
```

```diff
- Reply within one business day
+ We Aim to Reply Within One Business Day
```

```diff
- No obligation, no sales script
+ Free Initial Consultation
```

> The first two were unconditional promises ("signed", "reply within one business day"). The PDF's versions state an availability and an aim instead, which is the point of the change.

```diff
- <title>  Contact Axiomra: Let's Build Something Remarkable
+ <title>  Contact Axiomra: Let's Discuss Your Next AI Project
```

> The heading string appears twice in the file — once in the live hero and once in an earlier commented-out hero block. **Both** were updated so a future developer uncommenting the old block does not resurrect the old copy.

---

## 2. Engagement steps — *PDF screenshot 2*

```diff
- What Happens After You Hit Send
+ What Happens After You Contact Us
```

```diff
- No black box. Here is the exact sequence every Axiomra engagement runs through,
- from the first reply to the handover.
+ Here is how we move from your initial enquiry to an agreed project and delivery
+ plan.
```

**Step 01**

```diff
- Scoping & NDA
-   We sign an NDA before you share anything sensitive, then run a 60-MINUTE
-   SCOPING CALL to pin down the problem, the data you already hold, and the
-   success metric.
+ Discovery and Confidentiality
+   We clarify your goals and arrange an NDA before sensitive information is shared.
+   A discovery discussion establishes scope, available data, and success measures.
```

**Step 02**

```diff
- Team assembly
-   You get A NAMED SQUAD (AN AI ENGINEER, A FULL-STACK DEVELOPER AND A DELIVERY
-   LEAD), NOT A ROTATING BENCH. The same people stay on the project through launch.
+ Project Team and Plan
+   We identify the skills your project needs and agree on responsibilities,
+   milestones, and communication.
```

**Step 03**

```diff
- Two-week sprints
-   WORKING SOFTWARE EVERY FORTNIGHT in your own staging environment. Demos are
-   recorded, so stakeholders who miss the call still see the progress.
+ Development and Progress Reviews
+   We work in agreed delivery cycles and share demonstrations so your team can
+   review progress and provide feedback.
```

**Step 04**

```diff
- Handover & support
-   Source code, infrastructure and documentation transfer to you at launch. Support
-   and model retraining continue ON A ROLLING MONTHLY AGREEMENT.
+ Handover and Support
+   We provide the agreed deliverables, documentation, and training. Post-launch
+   support and any continuing maintenance are defined in your project agreement.
```

> Every fixed commitment in this block — a 60-minute call, a three-person named squad, a two-week cadence, a rolling monthly agreement — is now stated as something agreed per project. This is the PDF's wording, and it matches the support-period changes made on the five service pages.

---

## 3. Contact desks — *PDF screenshot 3*

```diff
- Connect With Us
+ Contact the Right Team
```

```diff
- Skip the general inbox and write straight to the desk that owns your question.
+ Choose the contact below that best matches your enquiry.
```

```diff
- Info Queries
-   Questions about our services, projects or a new idea you want to explore.
+ General Enquiries
+   Ask about our services or share an idea you would like to explore.
```

```diff
- Careers
-   Want to join the team? Send us your portfolio and we will be in touch.
+ Careers
+   Interested in working with us? Send your CV and relevant portfolio for
+   consideration.
```

```diff
- Sales
-   Ready to start or scale an AI project? Let's talk scope, pricing and timelines.
+ Project Enquiries
+   Discuss your requirements, budget, and timeline with our team.
```

**Email addresses — unchanged, exactly as the PDF supplied them:**
`info@axiomra.co` · `career@axiomra.co` · `sales@axiomra.co`

> PDF publication check #6: *"Keep contact addresses exactly as supplied."* All three match.

---

## 4. Closing CTA — *PDF screenshot 4*

```diff
- Stop Guessing And Start Growing With Your Trusted AI Development Partner
+ Find the Right AI Opportunity for Your Business
```

```diff
- Book your complimentary AI Strategic Session, (WORTH $1000) JUST FOR FREE, and
- discover how tailored AI solutions can drive growth.
+ Book a free AI strategy session to discuss your goals, assess relevant use cases,
+ and identify a practical next step.
```

```diff
- Button:  Get Your Project Done!
+ Button:  Book Your Free AI Strategy Session
```

> This was the **last surviving `$1000` claim on the site.** The same banner on the Home page was corrected earlier; publication check #4 can now be closed.

---

## What was NOT changed

| Kept | Why |
| --- | --- |
| Orbit background animation, glass form panel, all layout | PDF: retain backgrounds and theme |
| The contact form itself — fields, validation, submission | Not copy, and not in scope |
| All three email addresses | PDF check #6 |
| The rotating statistics band above the form | Numbers — flagged below |

---

# ⚠️ Contact Us Page — Open Items (not changed, your call)

| # | Item | Where | Why it is flagged |
| --- | --- | --- | --- |
| 1 | **300+ AI projects delivered · 12+ industries served · 4.9/5 average client rating** | Rotating band above the form | Three unverified figures on the page where a prospect is deciding whether to write to you. The `4.9/5` here contradicts the `4.8` on three service pages, and `12+ industries` contradicts the `15+` that was on Computer Vision. |
| 2 | **"We Aim to Reply Within One Business Day"** | Hero chip | Now an aim rather than a promise, as the PDF asked. Confirm the team can actually meet it before publication, since it is the one measurable commitment left on the page. |
| 3 | **"Free Initial Consultation"** | Hero chip | Replaces "No obligation, no sales script". Confirm the first consultation is genuinely free in all cases, including enterprise enquiries. |

---

# Industry Pages — Compliance & Pricing Claim Pass

**Not part of the PDF.** The review document covers Home, Main Services, five service pages and Contact. The thirteen industry pages were never screenshotted, so nothing here comes from the PDF's Improved Content columns. What was applied is the **rule** the PDF enforced everywhere else, nothing more:

> Remove assertions that a **compliance status is held or guaranteed**, and remove **free / complimentary pricing promises**. Keep descriptions of controls that are actually built, keep "readiness" and "aligned to" framing, and keep the 60-day support period itself.

Deliberately **not** a rewrite. 19 edits across 8 files. No headings, layouts, images or section structure were touched.

---

## 1. Healthcare — 5 edits

`healthcareData.js`

```diff
- ...run de-identification pipelines so model training never touches identifiable data.
- The compliance evidence is produced by the system, not assembled before an audit.
+ ...run de-identification pipelines that keep identifiable data out of model training.
+ The evidence your assessor asks for is produced by the system as it runs, rather than
+ assembled before an audit.
```

```diff
- Compliance That Produces Its Own Evidence
- Least-privilege access, encrypted PHI and immutable audit logs mean the evidence for
- HIPAA, GDPR or SOC 2 is generated continuously rather than assembled before an audit.
+ Compliance That Produces Its Own Evidence
+ Least-privilege access, encrypted PHI and immutable audit logs mean the evidence a
+ HIPAA, GDPR or SOC 2 assessment asks for is generated continuously rather than
+ assembled before an audit.
```

```diff
- HIPAA, GDPR and SOC 2 controls are designed into the architecture on day one: ...
- Retrofitting compliance onto a finished product costs more and convinces nobody.
+ HIPAA, GDPR and SOC 2 controls are reviewed with your compliance team and designed into
+ the architecture from the first sprint: ...
+ Retrofitting them onto a finished product costs more and convinces nobody.
```

```diff
- Partner with us to build compliant, interoperable systems...
- A defensible clinical product on compliant rails...
+ Partner with us to build compliance-ready, interoperable systems...
+ A defensible clinical product on compliance-ready rails...
```

> **Left alone on purpose:** `HIPAA-ready platforms`, `SOC 2 readiness`, the `PHI — Encrypted at rest and in transit` orb, and the FAQ that already says *"No product is compliant by itself; compliance is a property of the system, the contracts and the operating practice together."* That FAQ is the best-written compliance sentence on the site — it is the target register, not a problem.

---

## 2. Finance — 4 edits

`financeData.js`. The first one was the strongest compliance claim anywhere on the site.

```diff
- We build AI-driven monitoring and automated reporting frameworks that hold continuous
- compliance with GDPR, SOC 2, ISO 27001 and PCI DSS
+ We build AI-driven monitoring and automated reporting frameworks aligned to the GDPR,
+ SOC 2, ISO 27001 and PCI DSS requirements your team confirms
```

```diff
- We ensure secure, scalable and compliant platforms for modern finance operations
+ We build secure and scalable platforms around the regulatory requirements agreed with
+ your team
```

```diff
- Partner with us to build secure, scalable and compliant systems
- ...get a licensed product live: a compliant ledger, an onboarding flow that converts
+ Partner with us to build secure, scalable and compliance-ready systems
+ ...get a licensed product live: a ledger built to the rules your regulator applies, an
+ onboarding flow that converts
```

---

## 3. Insurance — 3 edits

`insuranceData.js` + `InsurancePage.jsx`

```diff
- A compliant ledger, a rating service and the reporting a regulator asks for on day one
+ A ledger built to the rules your regulator applies, a rating service and the reporting
+ asked for on day one
```

```diff
- <meta> ...built to stay explainable and compliant.
+ <meta> ...built to stay explainable and auditable.
```

> `SOC 2 and ISO 27001 aligned controls` in the data-handling FAQ was left as-is — "aligned" is already the hedge this pass is trying to produce.

---

## 4. Legal — 2 edits

`legalData.js`. This page was already close to the target register; only the word **guarantee** came out.

```diff
- ...client-managed keys and a no-training-on-your-data guarantee are decided before the
- first line of code.
+ ...client-managed keys and a no-training-on-your-data term in the contract are decided
+ before the first line of code.
```

```diff
- a contractual guarantee that your content is never used for model training
+ a contractual term that your content is not used for model training
```

---

## 5. Marketing — 3 edits

`marketingData.js`

```diff
- We follow strict GDPR, SOC 2 and ISO 27001 standards to protect sensitive marketing
- data.
+ We work to the GDPR, SOC 2 and ISO 27001 requirements that apply to your data, and
+ confirm them with your team before development starts.
```

```diff
- GDPR, SOC 2 and ISO 27001 requirements are designed in from the first architecture
- session
+ GDPR, SOC 2 and ISO 27001 requirements are reviewed with your compliance team and
+ designed in from the first architecture session
```

```diff
- We also provide complimentary post-launch technical support for up to 60 days.
+ We also provide post-launch technical support for up to 60 days, within the scope
+ agreed in the engagement.
```

---

## 6. Sports and Transportation — 1 edit each

Same sentence pattern on both pages, same fix — the word **complimentary** is a pricing promise.

```diff
- ...with complimentary post-launch support for up to 60 days.
+ ...with post-launch support for up to 60 days within the agreed scope.
```

---

## 7. Compliance chips — caption added *(follow-up)*

The `SOC 2` / `ISO 27001` / `HIPAA` / `PCI DSS` chips stay, but they no longer stand on their own. A caption now sits under the panel saying what they are:

```diff
+ Standards and practices we design and build against, not certifications held by
+ Axiomra. Which of them apply to your project, and what evidence your assessor will
+ want, is confirmed with your compliance team before work starts.
```

Added to four tabs:

| Page | Tab |
| --- | --- |
| Healthcare | `Security & Compliance` — HIPAA, GDPR, HITRUST CSF, SOC 2, ISO 27001, ISO 13485, IEC 62304, 21 CFR Part 11 |
| Finance | `Security & Compliance` — PCI DSS, SOC 2, ISO 27001, GDPR |
| Insurance | `Security & Governance` — SOC 2, ISO 27001, GDPR |
| Legal | `Security & Compliance` — SOC 2, ISO 27001, GDPR |

**Component change:** `IndustriesTechStrip.jsx` gained an optional `note` slot, rendered below the pill marquee and outside it, so the edge fades and the scrolling pills do not sit on top of the text. Tabs without a `note` render exactly as before — this is shared by every industry page, and the other tabs are untouched.

```jsx
{active.note ? (
  <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-content-dim">
    {active.note}
  </p>
) : null}
```

---

## What was NOT changed on the industry pages

| Item | Where | Why it stands |
| --- | --- | --- |
| `"Security & Compliance"` chip lists | Healthcare, Finance, Insurance, Legal → tech-stack panels | Chips kept, **caption added instead** — see section 7 above. Removing them would have understated a real capability; the caption removes the badge reading without losing it. |
| `60 days of technical support` | Healthcare, Finance, Insurance, Legal, Supply Chain, Real Estate | No pricing promise attached, and the PDF keeps 60 days on three service pages. Consistent as-is. |
| `Book a free session` / `Request a free consultation` | Every industry page | The PDF keeps "Book a Free Consultation" throughout. Only the `$1000` valuation was the problem, and that is gone site-wide. |
| Education, Retail, Fashion, Supply Chain, Real Estate, Industries index | — | Already in the target register (*"We work to GDPR and PCI DSS requirements"*, *"We design for GDPR, FERPA and COPPA"*). Nothing to fix. |
| Statistics, percentages, case-study figures | All industry pages | Same standing as the service pages — publication checks #1, #2 and #3. Never reviewed by the PDF at all. |

---

# Global PDF Publication Checks

Straight from page 1 of the review document — these apply to the whole site, not just Home:

1. ⚠️ Confirm **review scores and counts**. All six pages are now applied and the site carries **at least four different Clutch figures**: Home `12 reviews`, AI Development `11 reviews`, Generative AI / Agentic AI / Computer Vision `4.8 from 300+ companies`, NLP `4.9 from 300+ companies`, Contact `4.9/5 average client rating`. Pick one verified figure and I will set it everywhere in one pass.
2. ⚠️ Confirm **project and team statistics**. The site currently says `25+ engineers` (Services hero, NLP, Computer Vision) and `50+ engineers` elsewhere; `4+ countries`, `20+ countries` (Computer Vision) and `25+ global markets` (NLP); and `12+ industries` (Contact) against `15+ industries` (was on Computer Vision, now removed). Same one-pass fix once the real numbers are confirmed.
3. ⚠️ Confirm **percentage improvements and time estimates**. Fixed `4-6 week` and `3-5 month` commitments were removed from the Computer Vision and NLP pages. Case-study result figures on Computer Vision (3 clients) and NLP (3 clients) and the NLP statistics sections are left in place and listed in those pages' open items.
4. ✅ **Closed.** The `$1000` figure is gone from every page. The last instance was the Contact page's closing CTA, replaced with the PDF's wording in this pass.
5. ⚠️ Reconcile the **"60 days of support"** scope and pricing with the monthly maintenance terms. *(The number itself is kept where the PDF's own Improved copy keeps it — AI Development, Generative AI and Agentic AI. What was removed everywhere is the pricing promise around it: "at no extra cost", "free tech support", "no separate contract", and the unconditional "we stay for sixty days" are gone, replaced with "within the agreed support scope". The Contact page's "rolling monthly agreement" is now "defined in your project agreement". Computer Vision and NLP say "a post-launch support period is included" with no number, because the PDF supplied no replacement copy for those blocks. Confirm the real contractual term and the number can be set consistently in one pass.)*
6. ✅ **Closed.** `info@axiomra.co`, `career@axiomra.co` and `sales@axiomra.co` are unchanged and match the PDF exactly.
7. ✅ **Closed across all six PDF pages.** SOC 2 / GDPR / HIPAA-aligned delivery, HIPAA-compliant healthcare deployments, GDPR-compliant data handling, "no financial text leaves your network", encryption at rest and in transit, "we do not use your business data to train models", the `SOC 2 tooling` chip, and compliance designed in for regulated industries are all replaced with "agreed with your team" / "reviewed with your compliance team" language. The same pass has now also been run over the **thirteen industry pages**, which the PDF never reviewed — 19 further edits, documented in the *Industry Pages* section above. The `SOC 2` / `ISO 27001` / `HIPAA` chips in the Healthcare, Finance, Insurance and Legal tech-stack panels now carry a caption stating they are standards designed against, not certifications held.
8. ROI calculator — definition verified and labelled consistently (see section 8).

---

## Verification

- `npm run build` — ✅ passes
- `npm run lint` — ✅ no new errors in any edited file (4 pre-existing errors remain in `NetworkBackground.jsx`, `PortfolioHero.jsx`, untouched by this work)
- Backgrounds, images, theme, animations and layout — unchanged, as the PDF required
