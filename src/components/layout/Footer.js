import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import TickRule from "../ui/TickRule";
import siteConfig, { whatsappLink } from "../../data/siteConfig";
import navigation from "../../data/navigation";
import services from "../../data/services";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <TickRule className="footer__rule" />
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <p className="footer__brand">
              <Icon name="snowflake" size={20} stroke={2} /> {siteConfig.shortName}
            </p>
            <p className="footer__desc">{siteConfig.descriptor}</p>
            <p className="footer__areas">
              <strong>Service areas:</strong> {siteConfig.serviceAreas.join(" · ")}
            </p>
          </div>

          <div className="footer__col">
            <h3>Company</h3>
            <ul>
              {navigation.map((n) => (
                <li key={n.to}><Link to={n.to}>{n.label}</Link></li>
              ))}
              <li><Link to="/request-quote">Request a Quote</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h3>Services</h3>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link to={`/services/${s.slug}`}>{s.name}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3>Talk to us</h3>
            <ul className="footer__contact">
              <li><a href={siteConfig.phoneHref}><Icon name="phone" size={15} /> {siteConfig.phoneDisplay}</a></li>
              <li><a href={whatsappLink()} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={15} /> WhatsApp us</a></li>
              <li><a href={`mailto:${siteConfig.emails.sales}`}><Icon name="mail" size={15} /> {siteConfig.emails.sales}</a></li>
              <li><a href={`mailto:${siteConfig.emails.support}`}><Icon name="mail" size={15} /> {siteConfig.emails.support}</a></li>
              <li><span><Icon name="pin" size={15} /> {siteConfig.address}</span></li>
              <li><span><Icon name="clock" size={15} /> {siteConfig.hours}</span></li>
            </ul>
            <div className="footer__socials">
              {siteConfig.socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__legal">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p>
            <Link to="/privacy">Privacy Policy</Link>
            <span aria-hidden="true"> · </span>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
