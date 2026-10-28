// ------------------------------------------------------------------
// analytics.js — Google Analytics 4 loader, gated by an env var.
//
// Does nothing until REACT_APP_GA_MEASUREMENT_ID is set (in .env.production),
// so there is zero tracking code active until a real GA4 property exists.
// Once Peter/the client creates a GA4 property (analytics.google.com),
// add the Measurement ID (looks like "G-XXXXXXXXXX") to .env.production
// and rebuild — no other code changes needed.
// ------------------------------------------------------------------
const GA_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

let initialized = false;

export function initAnalytics() {
  if (!GA_ID || initialized || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}

/** Call on route change to log a pageview (GA4 SPA tracking). */
export function trackPageview(path) {
  if (!GA_ID || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", { page_path: path });
}

// ------------------------------------------------------------------
// Google Ads conversion — "Purchase" goal (AW-18538282653).
// The Google tag itself is loaded in public/index.html. This fires the
// event snippet, but ONLY when called — i.e. on a successful quote
// request, never on plain page loads. transactionId lets Google
// de-duplicate if the same conversion is reported twice.
// ------------------------------------------------------------------
const ADS_CONVERSION_SEND_TO = "AW-18538282653/iCPOCMTsq6odEJ393odF";

export function trackAdsConversion(transactionId = "") {
  try {
    if (typeof window === "undefined" || typeof window.gtag !== "function") return;
    window.gtag("event", "conversion", {
      send_to: ADS_CONVERSION_SEND_TO,
      value: 1.0,
      currency: "USD",
      transaction_id: transactionId || "",
    });
  } catch {
    // best-effort only — never block the customer's submission
  }
}
