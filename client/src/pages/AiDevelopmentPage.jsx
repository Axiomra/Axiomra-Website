
import AiDevHero from "../components/ai-dev/AiDevHero";
import ClientLogoStrip from "../components/ai-dev/ClientLogoStrip";
import AiDevIntro from "../components/ai-dev/AiDevIntro";
import AiDevCapabilities from "../components/ai-dev/AiDevCapabilities";
import AiDevIndustries from "../components/ai-dev/AiDevIndustries";
import AiDevProcess from "../components/ai-dev/AiDevProcess";
import AiDevTechStack from "../components/ai-dev/AiDevTechStack";
import AiDevBenefits from "../components/ai-dev/AiDevBenefits";

import SectionHeading from "../components/SectionHeading";
import ServiceRow from "../components/ServiceRow";
import GradientCTA from "../components/GradientCTA";
import Portfolio from "../sections/Portfolio";
import FAQ from "../sections/FAQ";

import { whatWeDo, subServices, faqs } from "../data/aiDevelopmentData";
import Seo from "../seo/Seo";
import { serviceSchema } from "../seo/schema";
import { SERVICES_BASE_PATH } from "../data/servicesData";

const META_DESCRIPTION =
  "Axiomra's AI development services: custom AI software, AI agents, LLM integration, " +
  "enterprise AI, PoC and MVP builds, AI integration, and AIOps, shipped to production.";

export default function AiDevelopmentPage() {
  return (
    <div className="ai-dev-page">
      <Seo
        title="AI Development Services Built For Business Results | Axiomra"
        description={META_DESCRIPTION}
        breadcrumbs={[{ name: "Services", path: SERVICES_BASE_PATH }, { name: "Artificial Intelligence" }]}
        jsonLd={serviceSchema({ name: "Artificial Intelligence", description: META_DESCRIPTION, path: `${SERVICES_BASE_PATH}/ai-development-services` })}
      />
      <div className="ai-dev-bg" aria-hidden="true" />

      <AiDevHero />
      <ClientLogoStrip />
      <AiDevIntro />

      <section id="what-we-do" className="bg-surface pt-20 md:pt-28">
        <div className="mx-auto max-w-8xl px-6">
          <SectionHeading
            eyebrow={whatWeDo.eyebrow}
            title={
              <>
                <span className="text-brand">{whatWeDo.titleAccent}</span> {whatWeDo.titleLead}
              </>
            }
            subtitle={whatWeDo.subtitle}
          />
        </div>
      </section>

      <div>
        {subServices.map((s, i) => (
          <ServiceRow
            key={s.id}
            id={s.id}
            index={i}
            compact
            title={s.title}
            description={s.description}
            image={s.image}
            imageAlt={s.imageAlt}
            ctaHref={s.ctaText ? "/contact" : undefined}
            ctaText={s.ctaText}
          />
        ))}
      </div>

      <AiDevCapabilities />

      <GradientCTA
        title={
          <>
            Have A Use Case In Mind?
            <br />
            Let&rsquo;s Build It.
          </>
        }
        subtitle="Whether you need a generative AI system, a computer vision tool, or an AI agent that runs complex workflows, we have built it before. Share your idea and we will tell you exactly how to build it."
        buttonText="Book A Free Strategy Session"
      />

      <section className="bg-surface pt-20 md:pt-28">
        <div className="mx-auto max-w-8xl px-6">
          <SectionHeading
            eyebrow="Real AI systems we have built"
            title={
              <>
                AI Development Projects{" "}
                <span className="text-brand">That Delivered Measurable Results</span>
              </>
            }
          />
        </div>
      </section>
      <Portfolio showHeading={false} />

      <AiDevIndustries />

      <GradientCTA
        title="Bring Us Your Industry Challenge"
        subtitle="Whether you work in healthcare, finance, retail, or supply chain operations, we start by understanding your processes, data, and requirements. Together, we identify where AI can add practical value."
        buttonText="Book a Free AI Consultation"
      />

      <AiDevProcess />
      <AiDevTechStack />

      <GradientCTA
        dark
        title="AI Architecture That Fits Your Existing Systems"
        subtitle="Discuss your requirements with our engineers. We will help identify suitable models, integration options, and an architecture that balances performance, cost, and maintainability."
        buttonText="Book a Technical Discovery Call"
      />

      <AiDevBenefits />

      <GradientCTA
        dark
        three
        title="Your Next AI Project Starts With a Clear Plan"
        subtitle="Discuss your goals with our team in a free AI strategy session. Explore relevant use cases, understand the main requirements, and decide on a practical next step."
        buttonText="Book Your Free AI Strategy Session"
      />

      <FAQ id="ai-development-faq" eyebrow="AI development, answered" items={faqs} />
    </div>
  );
}
