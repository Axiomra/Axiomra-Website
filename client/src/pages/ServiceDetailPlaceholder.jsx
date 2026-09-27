import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import NotFoundPage from "./NotFoundPage";
import services from "../data/servicesData";
import { SERVICES_BASE_PATH } from "../routes.constants";
import Seo from "../seo/Seo";

export default function ServiceDetailPlaceholder() {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  // A slug we have no entry for is a dead link, not a page that is on its way.
  if (!service) return <NotFoundPage />;

  return (
    <section className="min-h-[70vh] flex items-center">
      <Seo
        title={service ? `${service.title} | Axiomra` : "Service | Axiomra"}
        description={service?.description}
        noindex
      />
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        {service && (
          <img
            src={service.image}
            alt={service.imageAlt}
            className="w-full h-56 object-cover rounded-xl2 shadow-card border border-line mb-10"
          />
        )}
        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-3">Coming soon</p>
        <h1 className="font-display font-semibold text-3xl md:text-4xl mb-4">
          {service ? service.title : "This service page"} is on its way
        </h1>
        <p className="text-content-dim leading-relaxed mb-8">
          {service
            ? service.description
            : "We couldn't find that service, but our full lineup is on the services page."}
        </p>
        <Link
          to={SERVICES_BASE_PATH}
          className="inline-flex items-center gap-2 text-sm font-medium bg-inverse text-white px-6 py-3 rounded-full hover:opacity-90 transition-opacity focus-ring"
        >
          <ArrowLeft size={16} /> Back to all services
        </Link>
      </div>
    </section>
  );
}
