import SpecPlate from "../ui/SpecPlate";

export default function ProjectCard({ project }) {
  return (
    <article className="card project-card">
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
    </article>
  );
}
