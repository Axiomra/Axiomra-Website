import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { industries, INDUSTRIES_PATH } from "../data/industriesData";

/** Stand-in for the per-industry pages until each one is built. */
export default function IndustryDetailPlaceholder() {
  const { slug } = useParams();
  const industry = industries.find((i) => i.slug === slug);

  useEffect(() => {
    document.title = industry ? `AI for ${industry.name} | Axiomra` : "Industry | Axiomra";
  }, [industry]);

  return (
    <section className="flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        {industry && (
          <img
            src={industry.image}
            alt={industry.alt}
            width={1920}
            height={1280}
            className="mb-10 h-56 w-full rounded-xl2 border border-line object-cover shadow-card"
          />
        )}
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">Coming soon</p>
        <h1 className="mb-4 font-display text-3xl font-semibold md:text-4xl">
          {industry ? `AI for ${industry.name}` : "This industry page"} is on its way
        </h1>
        <p className="mb-8 leading-relaxed text-content-dim">
          {industry
            ? industry.description
            : "We couldn't find that industry, but every sector we serve is on the industries page."}
        </p>
        <Link
          to={INDUSTRIES_PATH}
          className="inline-flex items-center gap-2 rounded-full bg-inverse px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 focus-ring"
        >
          <ArrowLeft size={16} /> Back to all industries
        </Link>
      </div>
    </section>
  );
}
