// ------------------------------------------------------------------
// SiteContext — company identity, stats, why-us, brands, testimonials.
// Loads once from GET /api/site/ so everything the client edits in the
// admin (phone, WhatsApp, emails, hours, socials, homepage blocks)
// updates across the whole site. Bundled data is the instant fallback.
// ------------------------------------------------------------------
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiGet } from "../api/client";
import fallbackConfig from "../data/siteConfig";
import fallbackStats from "../data/stats";
import fallbackWhyUs from "../data/whyUs";
import fallbackBrands from "../data/brands";
import fallbackTestimonials from "../data/testimonials";

const initial = {
  config: fallbackConfig,
  stats: fallbackStats,
  whyUs: fallbackWhyUs,
  brands: fallbackBrands.map((name) => ({ name, logo: null })),
  testimonials: fallbackTestimonials,
  live: false,
};

const SiteContext = createContext(initial);

export function SiteProvider({ children }) {
  const [site, setSite] = useState(initial);

  useEffect(() => {
    let active = true;
    apiGet("/api/site/")
      .then((d) => active && setSite({
        config: d.config, stats: d.stats, whyUs: d.whyUs,
        brands: d.brands, testimonials: d.testimonials, live: true,
      }))
      .catch(() => { /* backend unreachable — bundled data keeps the site alive */ });
    return () => { active = false; };
  }, []);

  const value = useMemo(() => ({
    ...site,
    /** Build a WhatsApp link from the live company number. */
    wa: (message) =>
      `https://wa.me/${site.config.whatsappNumber}?text=${encodeURIComponent(
        message || site.config.whatsappDefaultMessage)}`,
  }), [site]);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export const useSite = () => useContext(SiteContext);
