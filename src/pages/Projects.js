import { useState } from "react";
import PageHero from "../components/ui/PageHero";
import CTASection from "../components/ui/CTASection";
import ProjectCard from "../components/cards/ProjectCard";
import projects, { projectSectors } from "../data/projects";

export default function Projects() {
  const [sector, setSector] = useState("All");
  const results = sector === "All" ? projects : projects.filter((p) => p.sector === sector);

  return (
    <>
      <PageHero
        kicker="Projects"
        title="The file speaks for itself."
        lead="What the client needed, what we installed, and what changed — a selection from recent years."
      />
      <section className="section">
        <div className="container">
          <div className="filter-tabs" role="tablist" aria-label="Filter projects by sector">
            {projectSectors.map((s) => (
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
            {results.map((p) => <ProjectCard key={p.slug} project={p} />)}
          </div>
        </div>
      </section>
      <CTASection title="Your building could be on this page." />
    </>
  );
}
