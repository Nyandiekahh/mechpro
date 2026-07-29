import { useParams, Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import SpecPlate from "../components/ui/SpecPlate";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import NotFound from "./NotFound";
import { useApi } from "../api/hooks";
import { getService } from "../data/services";
import { useSite } from "../context/SiteContext";

export default function ServiceDetail() {
  const { slug } = useParams();
  const { wa } = useSite();
  const { data: service, loading } = useApi(`/api/services/${slug}/`, getService(slug));

  if (!service) {
    // Content added in the CMS won't be in the bundled fallback — wait for the
    // API before declaring 404.
    return loading ? <section className="section"><div className="container"><p className="kicker">Loading…</p></div></section> : <NotFound />;
  }

  const inquiry = wa(`Hello MECHPRO SOLUTIONS LTD. I would like a quotation for ${service.name}.`);

  return (
    <>
      <PageHero kicker="Service" title={service.name} lead={service.summary} image={service.image}>
        <SpecPlate
          className="specplate--onink"
          items={[
            { label: "Scope", value: service.plate.scope },
            { label: "Approach", value: service.plate.lead },
            { label: "Cover", value: service.plate.cover },
          ]}
        />
      </PageHero>

      <section className="section">
        <div className="container detail-grid">
          <div>
            <SectionHeader kicker="Overview" title="How we approach it." />
            <div className="prose"><p>{service.overview}</p></div>

            <SectionHeader kicker="Process" title="Step by step." />
            <ol className="process-list">
              {service.process.map((p, i) => (
                <li key={p.step}>
                  <span className="process-list__num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{p.step}</h3>
                    <p>{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>

            <SectionHeader kicker="FAQ" title="Asked often, answered straight." />
            <dl className="faq-list">
              {service.faqs.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="detail-aside">
            <div className="detail-aside__card">
              <p className="kicker">What you get</p>
              <ul className="check-list">
                {service.benefits.map((b) => (
                  <li key={b}><Icon name="check" size={16} /> {b}</li>
                ))}
              </ul>
              <div className="detail-aside__actions">
                <Button to="/request-quote" icon="arrow">Request a quotation</Button>
                <Button href={inquiry} variant="ghost" icon="whatsapp">Ask on WhatsApp</Button>
              </div>
            </div>
            <div className="detail-aside__card">
              <p className="kicker">Other services</p>
              <p className="detail-aside__note">
                Browse <Link to="/services">all services</Link> or explore{" "}
                <Link to="/solutions">solutions by industry</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <CTASection title={`Need ${service.name.toLowerCase()}?`} />
    </>
  );
}
