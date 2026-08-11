import { useParams, Link } from "react-router-dom";
import PageHero from "../components/ui/PageHero";
import SectionHeader from "../components/ui/SectionHeader";
import SpecPlate from "../components/ui/SpecPlate";
import CTASection from "../components/ui/CTASection";
import Icon from "../components/ui/Icon";
import NotFound from "./NotFound";
import { useApi } from "../api/hooks";
import useSeo from "../hooks/useSeo";

export default function ProjectDetail() {
  const { slug } = useParams();
  const { data: project, loading } = useApi(`/api/projects/${slug}/`, null);

  useSeo({
    title: project ? project.name : "Project",
    description: project ? project.summary : "A completed HVAC project by MECHPRO SOLUTIONS LTD.",
    path: `/projects/${slug}`,
  });

  if (!project) {
    return loading
      ? <section className="section"><div className="container"><p className="kicker">Loading…</p></div></section>
      : <NotFound />;
  }

  const paragraphs = project.fullDescription && project.fullDescription.length
    ? project.fullDescription
    : [project.summary];

  return (
    <>
      <PageHero kicker={`${project.sector} · ${project.year}`} title={project.name} image={project.image}>
        <SpecPlate
          className="specplate--onink"
          items={[
            { label: "Location", value: project.location },
            { label: "Equipment", value: project.equipment },
            { label: "Sector", value: project.sector },
          ]}
        />
      </PageHero>

      <section className="section">
        <div className="container container--narrow">
          <SectionHeader kicker="The project" title="What we did." />
          <div className="prose">
            {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <p className="article-back">
            <Link to="/projects" className="card__link">
              <Icon name="arrow" size={15} className="icon--flip" /> All projects
            </Link>
          </p>
        </div>
      </section>

      <CTASection title="Want a similar result on your building?" />
    </>
  );
}
