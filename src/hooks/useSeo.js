// ------------------------------------------------------------------
// useSeo — sets document.title, meta description, canonical link and
// Open Graph tags per page, without adding a dependency (react-helmet
// et al). Googlebot's evergreen renderer reads the DOM after JS runs, so
// this genuinely helps search indexing for a client-rendered app.
//
// Honest limitation: link-preview bots that DON'T execute JavaScript
// (WhatsApp, Facebook, Slack unfurling a shared link) only ever see the
// static tags in public/index.html on first load — they can't see this.
// That's a structural limit of a plain React SPA; fixing it properly
// needs server-side rendering or prerendering, which is a separate,
// larger project from "add per-page meta tags."
// ------------------------------------------------------------------
import { useEffect } from "react";

const SITE_NAME = "MECHPRO SOLUTIONS LTD";
const BASE_URL = "https://www.mechpro.co.ke";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(path) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", `${BASE_URL}${path}`);
}

/**
 * useSeo({ title, description, path })
 * title: page-specific title (SITE_NAME is appended automatically)
 * description: 120-160 char summary for the search snippet
 * path: the route path, e.g. "/services/hvac-design", for the canonical tag
 */
export default function useSeo({ title, description, path = "", enabled = true }) {
  useEffect(() => {
    if (!enabled) return;
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;
    setMeta("description", description);
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", `${BASE_URL}${path}`, "property");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setCanonical(path);
  }, [title, description, path, enabled]);
}
