import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import SectionHeader from "../components/ui/SectionHeader";
import siteConfig, { whatsappLink } from "../data/siteConfig";

export default function Contact() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="A human answers."
        lead="Phone, WhatsApp or email — whichever suits you. Office hours below; contract clients have emergency lines."
      />

      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            <div className="detail-aside__card contact-card">
              <div className="why-item__icon"><Icon name="phone" size={22} /></div>
              <h3>Call us</h3>
              <p className="detail-aside__note">{siteConfig.hours}<br />{siteConfig.emergencyNote}.</p>
              <Button href={siteConfig.phoneHref} variant="ghost" icon="phone">{siteConfig.phoneDisplay}</Button>
            </div>
            <div className="detail-aside__card contact-card">
              <div className="why-item__icon"><Icon name="whatsapp" size={22} /></div>
              <h3>WhatsApp</h3>
              <p className="detail-aside__note">Fastest for photos of your unit, nameplates or fault codes.</p>
              <Button href={whatsappLink()} variant="ghost" icon="whatsapp">Start a chat</Button>
            </div>
            <div className="detail-aside__card contact-card">
              <div className="why-item__icon"><Icon name="mail" size={22} /></div>
              <h3>Email</h3>
              <ul className="footer__contact">
                <li><a href={`mailto:${siteConfig.emails.info}`}>{siteConfig.emails.info}</a></li>
                <li><a href={`mailto:${siteConfig.emails.sales}`}>{siteConfig.emails.sales}</a></li>
                <li><a href={`mailto:${siteConfig.emails.quotations}`}>{siteConfig.emails.quotations}</a></li>
                <li><a href={`mailto:${siteConfig.emails.support}`}>{siteConfig.emails.support}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--slim">
        <div className="container">
          <SectionHeader kicker="Find us" title={siteConfig.address} />
          <div className="map-frame">
            <iframe
              title={`Map of ${siteConfig.name}`}
              src={siteConfig.mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
