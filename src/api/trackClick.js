import { API_URL } from "./client";

// Fire-and-forget click tracking for Call Now / WhatsApp Us / email links.
// Never awaited by the caller and never throws — a tracking failure must
// not delay or block the actual phone call / WhatsApp chat / email open.
export function trackClick(kind) {
  try {
    fetch(`${API_URL}/api/track-click/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, path: window.location.pathname }),
      keepalive: true, // survives the page navigating away right after the click
    }).catch(() => {});
  } catch {
    // swallow — tracking is best-effort only
  }
}
