import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import PortfolioHero from "../components/portfolio/PortfolioHero";
import CaseStudyRow from "../components/portfolio/CaseStudyRow";
import CaseStudyProgress from "../components/portfolio/CaseStudyProgress";
import PortfolioDesks from "../components/portfolio/PortfolioDesks";
import FAQ from "../sections/FAQ";
import GradientCTA from "../components/GradientCTA";
import { caseStudies, faqs } from "../data/portfolioData";

const META_DESCRIPTION =
  "Explore Axiomra's AI case studies: 22 shipped projects across education, fashion, fintech, marketing and sports, with the results each one delivered.";

export default function PortfolioPage() {
  useEffect(() => {
    document.title = "Portfolio | AI Case Studies Built By Axiomra";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", META_DESCRIPTION);
  }, []);

  useEffect(() => {
    // Fonts and the remaining images still shift this page after first paint,
    // so recompute trigger positions once things settle. Debounced, because
    // image load events arrive in bursts.
    let timer = 0;
    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    };

    window.addEventListener("load", refresh);
    // Capture phase, since img load events do not bubble.
    document.addEventListener("load", refresh, true);
    document.fonts?.ready.then(refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      document.removeEventListener("load", refresh, true);
    };
  }, []);

  return (
    <div>
      <PortfolioHero />

      <CaseStudyProgress targetId="case-studies" total={caseStudies.length} />

      <div id="case-studies" className="scroll-mt-24">
        {caseStudies.map((study, i) => (
          <CaseStudyRow key={study.slug} study={study} index={i} />
        ))}
      </div>

      <PortfolioDesks />

      <FAQ id="portfolio-faq" eyebrow="Portfolio questions" items={faqs} />

      <GradientCTA
        dark
        three
        title="Stop guessing and start growing with a proven AI partner"
        subtitle="Every project on this page started with one conversation. Book a free strategy session and we will map the fastest path from your workflow to a working system."
        buttonText="Get your project done"
      />
    </div>
  );
}
