/**
 * TickRule — intentionally disabled per client feedback ("remove that
 * pattern of strokes, they look generic/AI"). Kept as a no-op component
 * rather than deleted outright, so every existing usage across the app
 * (PageHero, SectionHeader, hero, footer, cta-band) keeps working with
 * zero further code changes elsewhere — it just renders nothing now.
 */
export default function TickRule() {
  return null;
}
