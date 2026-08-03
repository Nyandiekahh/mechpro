import { useParams, Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import CTASection from "../components/ui/CTASection";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import NotFound from "./NotFound";
import ProjectCard from "../components/cards/ProjectCard";
import { useApi } from "../api/hooks";
import { getIndustry } from "../data/industries";
import fallbackProjects from "../data/projects";
import useSeo from "../hooks/useSeo";

export default function SolutionDetail() {
  const { slug } = useParams();
  const { data: industry, loading } = useApi(`/api/solutions/${slug}/`, getIndustry(slug));
  const { data: projects } = useApi("/api/projects/", fallbackProjects);

  useSeo({
    title: industry ? `HVAC for ${industry.name}` : "Industry Solution",
    description: industry ? industry.challenge : "Sector-specific HVAC solutions from MECHPRO SOLUTIONS LTD.",
    path: `/solutions/${slug}`,
  });

  if (!industry) {
    return loading ? <section className="section"><div className="container"><p className="kicker">Loading…</p></div></section> : <NotFound />;
  }

  const related = projects.filter(
    (p) => p.sector.toLowerCase() === industry.name.toLowerCase().split(" ")[0].toLowerCase()
  ).slice(0, 2);

  return (
    <>
      <PageHero kicker={`HVAC for ${industry.tag}`} title={industry.name} lead={industry.challenge} image={industry.image} />

      <section className="section">
        <div className="container detail-grid">
          <div>
            <SectionHeader kicker="Our approach" title={`How we solve it for ${industry.name.toLowerCase()}.`} />
            <ul className="check-list check-list--spread">
              {industry.approach.map((a) => (
                <li key={a}><Icon name="check" size={18} /> {a}</li>
              ))}
            </ul>
            {related.length > 0 && (
              <>
                <SectionHeader kicker="Related work" title="From the project file." />
                <div className="grid grid--2">
                  {related.map((p) => <ProjectCard key={p.slug} project={p} />)}
                </div>
              </>
            )}
          </div>
          <aside className="detail-aside">
            <div className="detail-aside__card">
              <p className="kicker">Start here</p>
              <p className="detail-aside__note">
                Tell us about your facility and we'll survey and quote with sector-specific recommendations.
              </p>
              <div className="detail-aside__actions">
                <Button to="/request-quote" icon="arrow">Request a quotation</Button>
                <Button to="/services" variant="ghost">Browse services</Button>
              </div>
            </div>
            <div className="detail-aside__card">
              <p className="kicker">Other sectors</p>
              <p className="detail-aside__note">
                See all <Link to="/solutions">industry solutions</Link>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <CTASection title={`Cooling or ventilation for ${industry.tag.toLowerCase()}?`} />
    </>
  );
}
