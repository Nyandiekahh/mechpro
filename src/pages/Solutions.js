import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import Icon from "../components/ui/Icon";
import industries from "../data/industries";

export default function Solutions() {
  return (
    <>
      <PageHero
        kicker="Solutions"
        title="Designed for your industry's physics."
        lead="A data centre and a dining room fail differently. Pick your sector — we've written down its specific challenges and how we solve them."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {industries.map((ind) => (
              <Link to={`/solutions/${ind.slug}`} key={ind.slug} className="card solution-card">
                <div className="service-card__icon"><Icon name={ind.icon} size={26} /></div>
                <h3>{ind.name}</h3>
                <p className="solution-card__tag">{ind.tag}</p>
                <p className="card__text">{ind.challenge}</p>
                <span className="card__link">See our approach <Icon name="arrow" size={16} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
