// ------------------------------------------------------------------
// branding.js — static brand assets served from /public.
// The logo lives at public/logo.svg (rename any new logo file to that
// and it updates site-wide, no code changes).
// ------------------------------------------------------------------
export const LOGO_SRC = process.env.PUBLIC_URL + "/logo.svg";

// Expose the logo to CSS (the watermark) without the bundler trying to
// resolve it — css-loader can't see through a CSS variable.
if (typeof document !== "undefined") {
  document.documentElement.style.setProperty("--logo-url", `url("${LOGO_SRC}")`);
}
