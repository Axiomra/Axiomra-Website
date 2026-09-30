/**
 * schema.org JSON-LD builders. Every value here is already published
 * elsewhere on the site (footer socials, contact page channels, page copy);
 * nothing is filled in for the sake of richer markup.
 *
 * No `logo`: the only logo files are 500x91 and 83x91, and Google requires
 * at least 112x112, so declaring one would fail validation.
 */
import { SITE_NAME, SITE_URL, absoluteUrl } from "./seo.config";

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

// Same profiles the footer links to.
const SOCIAL_PROFILES = [
  "https://www.facebook.com/share/19cPggERYa",
  "https://www.instagram.com/axiomra.co",
  "https://www.linkedin.com/company/axiomra.co",
  "https://x.com/Axiomra_co",
];

// Same channel the contact page lists "for project inquiries and proposals".
const SALES_CONTACT = {
  "@type": "ContactPoint",
  contactType: "sales",
  email: "info@axiomra.co",
  telephone: "+1-657-520-3444",
};

/** Full Organization node. Other nodes point at it by @id. */
export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    sameAs: SOCIAL_PROFILES,
    contactPoint: [SALES_CONTACT],
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    publisher: { "@id": ORG_ID },
  };
}

// Pages other than Home carry a short Organization node so the @id reference
// still resolves when a page is validated on its own.
const orgRef = () => ({
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
});

export function serviceSchema({ name, description, path }) {
  return {
    "@type": "Service",
    name,
    serviceType: name,
    description,
    url: SITE_URL + path,
    provider: orgRef(),
  };
}

export function articleSchema({ headline, description, image, path }) {
  const url = SITE_URL + path;
  return {
    "@type": "Article",
    headline,
    description,
    ...(image && { image: [absoluteUrl(image)] }),
    url,
    mainEntityOfPage: url,
    author: orgRef(),
    publisher: orgRef(),
  };
}

export function contactPageSchema({ name, description, path }) {
  return {
    "@type": "ContactPage",
    name,
    description,
    url: SITE_URL + path,
    mainEntity: { ...orgRef(), contactPoint: [SALES_CONTACT] },
  };
}

/**
 * BreadcrumbList for `crumbs` ([{ name, path }]), with Home prepended. The
 * last crumb may omit `path`; it is the current page.
 */
export function breadcrumbSchema(crumbs, currentPath) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: SITE_URL + (c.path ?? currentPath),
    })),
  };
}

/** Serialises nodes into one @graph, escaped for an inline <script>. */
export function toJsonLd(nodes) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(
    /</g,
    "\\u003c"
  );
}
