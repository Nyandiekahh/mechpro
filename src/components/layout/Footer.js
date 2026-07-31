import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../ui/Icon";
import TickRule from "../ui/TickRule";
import { useSite } from "../../context/SiteContext";
import { useApi } from "../../api/hooks";
import { apiPost } from "../../api/client";
import navigation from "../../data/navigation";
import { LOGO_SRC } from "../../data/branding";
import fallbackServices from "../../data/services";

export default function Footer() {
  const { config, wa } = useSite();
  const { data: services } = useApi("/api/services/", fallbackServices);
  const year = new Date().getFullYear();

  // --- Newsletter subscription (WRS footer requirement) ---
  const [email, setEmail] = useState("");
  const [newsletterState, setNewsletterState] = useState("idle"); // idle | sending | done | error

  const subscribe = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setNewsletterState("error"); return; }
    setNewsletterState("sending");
    const res = await apiPost("/api/newsletter/", { email });
    setNewsletterState(res.ok ? "done" : "error");
  };

  return (
    <footer className="footer">
      <div className="container">
        <TickRule className="footer__rule" />
        <div className="footer__grid">
          <div className="footer__col footer__col--brand">
            <p className="footer__brand">
              <img className="footer__logo" src={LOGO_SRC} alt="" /> {config.shortName}
            </p>
            <p className="footer__desc">{config.descriptor}</p>
            <p className="footer__areas">
              <strong>Service areas:</strong> {config.serviceAreas.join(" · ")}
            </p>
            <form className="newsletter-form" onSubmit={subscribe}>
              <label htmlFor="newsletter-email">Practical HVAC advice, occasionally.</label>
              {newsletterState === "done" ? (
                <p className="newsletter-form__done"><Icon name="check" size={15} /> Subscribed. Welcome aboard.</p>
              ) : (
                <div className="newsletter-form__row">
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setNewsletterState("idle"); }}
                  />
                  <button type="submit" className="btn btn--solid" disabled={newsletterState === "sending"}>
                    <span>{newsletterState === "sending" ? "…" : "Subscribe"}</span>
                  </button>
                </div>
              )}
              {newsletterState === "error" && (
                <p className="newsletter-form__error">That didn't go through, check the address and try again.</p>
              )}
            </form>
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
              <li><a href={config.phoneHref}><Icon name="phone" size={15} /> {config.phoneDisplay}</a></li>
              <li><a href={wa()} target="_blank" rel="noreferrer"><Icon name="whatsapp" size={15} /> WhatsApp us</a></li>
              <li><a href={`mailto:${config.emails.sales}`}><Icon name="mail" size={15} /> {config.emails.sales}</a></li>
              <li><a href={`mailto:${config.emails.support}`}><Icon name="mail" size={15} /> {config.emails.support}</a></li>
              <li><span><Icon name="pin" size={15} /> {config.address}</span></li>
              <li><span><Icon name="clock" size={15} /> {config.hours}</span></li>
            </ul>
            <div className="footer__socials">
              {config.socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label}>{s.label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__legal">
          <p>© {year} {config.name}. All rights reserved.</p>
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
