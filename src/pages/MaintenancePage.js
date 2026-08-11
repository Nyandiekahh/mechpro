import Icon from "../components/ui/Icon";

// Shown instead of the entire site when SiteSettings.maintenance_mode is
// on. The admin toggles this in the CMS; message text is CMS-editable too.
export default function MaintenancePage({ message }) {
  return (
    <div className="maintenance-page">
      <div className="maintenance-page__inner">
        <Icon name="wrench" size={40} />
        <h1>We'll be right back.</h1>
        <p>{message || "We're making a few improvements. Back shortly."}</p>
        <p className="maintenance-page__note">
          For anything urgent, call or WhatsApp us directly, we're still answering.
        </p>
      </div>
    </div>
  );
}
