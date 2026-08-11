// Scrolling headline-style ticker shown across the top of the site
// while maintenance mode is on. Text comes from the CMS
// (SiteSettings.maintenance_ticker), editable without a redeploy.
export default function MaintenanceBanner({ text }) {
  if (!text) return null;
  return (
    <div className="maintenance-ticker" role="status" aria-live="polite">
      <div className="maintenance-ticker__track">
        <span>{text}</span>
        <span aria-hidden="true">{text}</span>
      </div>
    </div>
  );
}
