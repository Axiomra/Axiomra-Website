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

/**
 * Head tags for one page: title, description, canonical, Open Graph and
 * Twitter card. Renders nothing into the page body.
 *
 * `path` defaults to the current pathname, so most pages only pass copy.
 * `noindex` is for admin screens and "coming soon" placeholders.
 */
export default function Seo({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  type = "website",
  noindex = false,
  children,
}) {
  const { pathname } = useLocation();
  // Trailing slashes are dropped so /about and /about/ share one canonical;
  // the root keeps its slash.
  const url = SITE_URL + ((path ?? pathname).replace(/\/+$/, "") || "/");
  const imageUrl = absoluteUrl(image);

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
      {children}
    </Helmet>
  );
}
