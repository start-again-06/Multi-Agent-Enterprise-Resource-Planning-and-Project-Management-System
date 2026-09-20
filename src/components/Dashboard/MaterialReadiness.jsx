import React from "react";

const DEFAULT_PROJECTS = [
  {
    id: "p001",
    name: "IIT Chennai Construction",
    required: 420,
    available: 390,
    reserved: 20,
    readiness: 93,
    status: "ready",
  },
  {
    id: "p002",
    name: "Bangalore Commercial Project",
    required: 680,
    available: 520,
    reserved: 75,
    readiness: 76,
    status: "warning",
  },
  {
    id: "p003",
    name: "Calicut Infrastructure Project",
    required: 340,
    available: 214,
    reserved: 42,
    readiness: 63,
    status: "critical",
  },
];

export default function MaterialReadiness({
  projects = DEFAULT_PROJECTS,
  onProjectClick,
}) {
  return (
    <section className="card material-readiness">
      <div className="section-header">
        <div>
          <span className="page-header__eyebrow">Project Planning</span>
          <h2>Material Readiness</h2>
          <p>Material availability against current project requirements.</p>
        </div>
      </div>

      <div className="material-readiness__list">
        {projects.map((project) => (
          <button
            type="button"
            className="material-readiness__item"
            key={project.id}
            onClick={() => onProjectClick?.(project)}
          >
            <div className="material-readiness__header">
              <div>
                <strong>{project.name}</strong>
                <span>
                  {project.available.toLocaleString()} /{" "}
                  {project.required.toLocaleString()} units available
                </span>
              </div>

              <strong className={`readiness-value readiness-${project.status}`}>
                {project.readiness}%
              </strong>
            </div>

            <div className="progress">
              <div
                className="progress__bar"
                style={{ width: `${project.readiness}%` }}
              />
            </div>

            <div className="material-readiness__footer">
              <span>
                Reserved: {project.reserved.toLocaleString()}
              </span>

              <span>
                Gap:{" "}
                {Math.max(
                  project.required -
                    project.available -
                    project.reserved,
                  0
                ).toLocaleString()}
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}