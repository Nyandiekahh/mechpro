import { useMemo, useState } from "react";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import ProjectCard from "../components/cards/ProjectCard";
import { useApi } from "../api/hooks";
import fallbackProjects from "../data/projects";

export default function Projects() {
  const { data: projects } = useApi("/api/projects/", fallbackProjects);
  const [sector, setSector] = useState("All");

  // Sector tabs derive from whatever projects exist in the CMS.
  const sectors = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.sector)))],
    [projects]);
  const results = sector === "All" ? projects : projects.filter((p) => p.sector === sector);

  return (
    <>
      <PageHero
        kicker="Projects"
        title="The file speaks for itself."
        lead="What the client needed, what we installed, and what changed. A selection from recent years."
      />
      <section className="section">
        <div className="container">
          <div className="filter-tabs" role="tablist" aria-label="Filter projects by sector">
            {sectors.map((s) => (
              <button
                key={s}
                role="tab"
                aria-selected={sector === s}
                className={sector === s ? "is-active" : ""}
                onClick={() => setSector(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="grid grid--3">
            {results.map((p, i) => <ProjectCard key={p.slug} project={p} i={i} />)}
          </div>
        </div>
      </section>
      <CTASection title="Your building could be on this page." />
    </>
  );
}
