import { useCallback, useState } from "react";

import FaqsHero from "../components/faqs/FaqsHero";
import FaqsBrowser from "../components/faqs/FaqsBrowser";
import FaqsHelpBanner from "../components/faqs/FaqsHelpBanner";
import GradientCTA from "../components/GradientCTA";
import Seo from "../seo/Seo";

const META_DESCRIPTION =
  "Answers to the questions teams ask before starting an AI project with Axiomra: " +
  "scope, cost, timelines, integration, data handling, support and ownership.";

export default function FaqsPage() {
  // The search field lives in the hero and the results live below it, so the
  // query has to be owned by the page rather than by either component.
  const [query, setQuery] = useState("");

  const jumpToResults = useCallback(() => {
    const el = document.getElementById("faq-browser");
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  return (
    <div>
      <Seo title="FAQs | Axiomra AI Development" description={META_DESCRIPTION} />
      <FaqsHero query={query} onQueryChange={setQuery} onSubmit={jumpToResults} />
      <FaqsBrowser query={query} onQueryChange={setQuery} />
      <FaqsHelpBanner />

      <GradientCTA
        dark
        three
        title="Question not on the list?"
        subtitle="Book a free session. We will answer it on the call, not in a follow-up brochure."
        buttonText="Book My Strategy Call"
      />
    </div>
  );
}
