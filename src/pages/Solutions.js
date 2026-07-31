import { Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import Icon from "../components/ui/Icon";
import Chip from "../components/ui/Chip";
import useReveal from "../hooks/useReveal";
import { useApi } from "../api/hooks";
import industries from "../data/industries";

function SolutionCard({ industry, i }) {
  const r = useReveal((i % 3) * 90);
  return (
    <Link
      to={`/solutions/${industry.slug}`}
      ref={r.ref}
      className={`card solution-card ${r.className}`}
      style={r.style}
    >
      {industry.image && (
        <div className="card-media">
          <img src={industry.image} alt="" loading="lazy" />
        </div>
      )}
      <Chip>{industry.tag}</Chip>
      <h3>{industry.name}</h3>
      <p className="card__text">{industry.challenge}</p>
      <span className="card__link">See our approach <Icon name="arrow" size={16} /></span>
    </Link>
  );
}

export default function Solutions() {
  const { data: solutions } = useApi("/api/solutions/", industries);
  return (
    <>
      <PageHero
        kicker="Solutions"
        title="Designed for your industry's physics."
        lead="A data centre and a dining room fail differently. Pick your sector, and we've written down its specific challenges and how we solve them."
      />
      <section className="section">
        <div className="container">
          <div className="grid grid--3">
            {solutions.map((ind, i) => <SolutionCard key={ind.slug} industry={ind} i={i} />)}
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
