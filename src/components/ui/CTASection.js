import Button from "./Button";
import siteConfig, { whatsappLink } from "../../data/siteConfig";

/** Bottom-of-page conversion band — appears on every major page per the WRS. */
export default function CTASection({
  title = "Ready when your building is.",
  lead = "Tell us what you're cooling, ventilating or fixing — we'll survey, quote and give you a straight answer.",
}) {
  return (
    <section className="cta-band">
      <div className="container cta-band__grid">
        <div>
          <p className="kicker kicker--light">Get started</p>
          <h2>{title}</h2>
          <p className="cta-band__lead">{lead}</p>
        </div>
        <div className="cta-band__actions">
          <Button to="/request-quote" variant="solid" icon="arrow">Request a free quotation</Button>
          <Button href={siteConfig.phoneHref} variant="ghost" icon="phone">{siteConfig.phoneDisplay}</Button>
          <Button href={whatsappLink()} variant="ghost" icon="whatsapp">Chat on WhatsApp</Button>
        </div>
      </div>
    </section>
  );
}
