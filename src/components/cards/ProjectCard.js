import { Link } from "react-router-dom";
import SpecPlate from "../ui/SpecPlate";
import Icon from "../ui/Icon";
import useReveal from "../../hooks/useReveal";

export default function ProjectCard({ project, i = 0 }) {
  const r = useReveal((i % 3) * 90);
  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={r.ref}
      className={`card project-card ${r.className}`}
      style={r.style}
    >
      {project.image && (
        <div className="card-media">
          <img src={project.image} alt={project.name} loading="lazy" />
        </div>
      )}
      <p className="project-card__meta">
        <span>{project.sector}</span>
        <span>{project.year}</span>
      </p>
      <h3>{project.name}</h3>
      <p className="card__text">{project.summary}</p>
      <SpecPlate
        items={[
          { label: "Location", value: project.location },
          { label: "Equipment", value: project.equipment },
        ]}
      />
      <span className="card__link">See the full story <Icon name="arrow" size={16} /></span>
    </Link>
  );
}
