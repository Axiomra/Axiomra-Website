import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import {
  SITE_NAME,
  SITE_URL,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  absoluteUrl,
} from "./seo.config";
import { breadcrumbSchema, toJsonLd } from "./schema";
import { PrerenderContext } from "./prerender-context";

/**
 * Head tags for one page: title, description, canonical, Open Graph and
 * Twitter card. Renders nothing into the page body.
 *
 * `path` defaults to the current pathname, so most pages only pass copy.
 * `noindex` is for admin screens and "coming soon" placeholders.
 * `breadcrumbs` ([{ name, path }], Home is added) and `jsonLd` (schema.org
 * nodes from ./schema) are emitted together as one JSON-LD @graph.
 */
export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  breadcrumbs,
  jsonLd = [],
  children,
}) {
  const { pathname } = useLocation();
  // react-helmet-async registers an instance during render, so a render React
  // discards (Suspense, concurrent rendering) leaves an instance that is never
  // removed, and its JSON-LD outlives the page. Mounting Helmet only after
  // commit avoids that.
  // The build-time prerender has no effects and no discarded renders, and its
  // whole point is getting these tags into the static HTML, so it renders
  // them straight away.
  const prerendering = useContext(PrerenderContext);
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- the point is one render after commit
  useEffect(() => setMounted(true), []);
  // Trailing slashes are dropped so /about and /about/ share one canonical;
  // the root keeps its slash.
  const canonicalPath = (path ?? pathname).replace(/\/+$/, "") || "/";
  const url = SITE_URL + canonicalPath;
  const imageUrl = absoluteUrl(image);
  const graph = [
    ...[].concat(jsonLd),
    ...(breadcrumbs ? [breadcrumbSchema(breadcrumbs, canonicalPath)] : []),
  ];

  if (!mounted && !prerendering) return null;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {graph.length > 0 && <script type="application/ld+json">{toJsonLd(graph)}</script>}
      {children}
    </Helmet>
  );
}
