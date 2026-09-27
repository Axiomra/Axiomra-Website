import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "../seo/Seo";
import { SERVICES_BASE_PATH } from "../data/servicesData";

// Same classes as the secondary pills in ServiceRow.
const SECONDARY_LINK =
  "inline-flex items-center gap-2 rounded-full border border-line bg-surface-card px-6 py-3 text-sm font-medium text-content-dim transition-colors hover:border-brand/50 hover:text-brand focus-ring";

/**
 * Shown for any URL the site does not know, inside the normal navbar and
 * footer. Laid out like the "coming soon" placeholders so it reads as part of
 * the site rather than an error screen.
 */
export default function NotFoundPage() {
  return (
    <section className="min-h-[70vh] flex items-center">
      <Seo
        title="Page not found | Axiomra"
        description="The page you were looking for does not exist or has moved."
        noindex
      />
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">404</p>
        <h1 className="font-display font-semibold text-3xl md:text-4xl mb-4">
          We couldn&apos;t find that page
        </h1>
        <p className="text-content-dim leading-relaxed mb-8">
          The link may be out of date, or the page may have moved. These will get you back on track.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium bg-inverse text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity focus-ring"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <Link to={SERVICES_BASE_PATH} className={SECONDARY_LINK}>
            Explore our services
          </Link>
          <Link to="/contact" className={SECONDARY_LINK}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
