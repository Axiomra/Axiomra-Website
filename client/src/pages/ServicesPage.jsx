import ServicesHero from "../components/ServicesHero";
import ServiceRow from "../components/ServiceRow";
import BusinessTypes from "../components/BusinessTypes";
import GradientCTA from "../components/GradientCTA";
import Portfolio from "../sections/Portfolio";
import TechStack from "../sections/TechStack";
import WhyUs from "../sections/WhyUs";
import FAQ from "../sections/FAQ";
import services from "../data/servicesData";
import {
  SERVICES_BASE_PATH,
  AI_DEVELOPMENT_SLUG,
  GENERATIVE_AI_SLUG,
  AGENTIC_AI_SLUG,
  COMPUTER_VISION_SLUG,
  NLP_SLUG,
} from "../routes.constants";
import Seo from "../seo/Seo";

const servicesFaq = [
  {
    q: "How can AI solutions benefit my business?",
    a: "AI reduces manual, repetitive work, surfaces insight hidden in your data, and speeds up decision-making. Most clients see measurable time and cost savings within the first two quarters.",
  },
  {
    q: "Do you provide customized AI solutions for specific business needs?",
    a: "Yes. Every engagement starts with your workflows and goals. We don't ship off-the-shelf templates. Solutions are built around your data, systems, and constraints.",
  },
  {
    q: "How do I know if AI is right for my business?",
    a: "If you have repetitive processes, growing data volumes, or decisions that rely on gut-feel more than evidence, AI is usually worth exploring. A free consultation will tell you exactly where it fits.",
  },
  {
    q: "Do you provide a free consultation or project assessment?",
    a: "Yes: book a free strategy session and we'll assess your challenges honestly, including whether AI is the right investment at your current stage.",
  },
  {
    q: "How do you ensure the scalability of AI solutions?",
    a: "We design with cloud-native architecture, modular pipelines, and load-tested infrastructure from day one, so solutions keep performing as your data and user base grow.",
  },
  {
    q: "Can AI integrate with my existing systems and tools?",
    a: "In most cases, yes. We build secure APIs and integrations that connect with your current CRM, ERP, databases, and internal tools without disrupting existing operations.",
  },
  {
    q: "What is the cost of developing an AI solution?",
    a: "Cost depends on project scope, chosen tech stack, and ongoing maintenance needs. Book a free session and we'll give you an honest, itemized estimate.",
  },
  {
    q: "What is the typical implementation timeline for an AI project?",
    a: "Most focused AI projects move from discovery to a working pilot in 6-10 weeks, with full production rollout depending on integration complexity.",
  },
];

const META_DESCRIPTION =
  "Explore Axiomra's full range of AI services: from generative AI and computer vision to custom software, chatbots, and process automation.";

// Services with a built detail page. The rest would land on "Coming soon", so
// their pills stay unlinked until the page ships.
const DETAIL_SLUGS = new Set([
  AI_DEVELOPMENT_SLUG,
  GENERATIVE_AI_SLUG,
  AGENTIC_AI_SLUG,
  COMPUTER_VISION_SLUG,
  NLP_SLUG,
]);

export default function ServicesPage() {
  return (
    <>
      <Seo
        title="AI Services & Solutions | Axiomra"
        description={META_DESCRIPTION}
        breadcrumbs={[{ name: "Services" }]}
      />
      <ServicesHero />

      <div>
        {services.map((s, i) => (
          <ServiceRow
            key={s.slug}
            id={s.slug}
            index={i}
            eyebrow={i === 0 ? "What type of services do we offer?" : undefined}
            title={s.title}
            description={s.description}
            image={s.image}
            imageAlt={s.imageAlt}
            links={s.links}
            ctaHref={DETAIL_SLUGS.has(s.slug) ? `${SERVICES_BASE_PATH}/${s.slug}` : undefined}
          />
        ))}
      </div>

      <TechStack />

      <Portfolio />

      <BusinessTypes />

      <WhyUs />

      <FAQ id="services-faq" items={servicesFaq} />

      <GradientCTA
        title="Turn Your AI Idea Into a Clear Project Plan"
        subtitle="Tell us what you want to achieve. We will help define the scope, technical approach, and next steps for a solution that fits your business."
        buttonText="Discuss Your Project"
      />
    </>
  );
}
