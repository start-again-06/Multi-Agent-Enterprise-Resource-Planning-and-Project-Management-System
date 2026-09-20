import React from "react";

const getReadinessClass = (readiness) => {
  if (readiness >= 90) return "status-success";
  if (readiness >= 70) return "status-warning";
  return "status-danger";
};

const getReadinessLabel = (readiness) => {
  if (readiness >= 90) return "Ready";
  if (readiness >= 70) return "At Risk";
  return "Shortage";
};

const formatNumber = (value = 0) =>
  new Intl.NumberFormat("en-IN").format(value);

export default function MaterialReadiness({
  projects = [],
  onProjectClick,
}) {
  return (
    <section className="card report-card">
      <div className="card-header">
        <div>
          <span className="eyebrow">Project materials</span>
          <h3>Material Readiness</h3>
          <p className="text-muted">
            Material availability against current project requirements.
          </p>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="empty-state">
          <strong>No material readiness data</strong>
          <span>
            Project material requirements will appear here once available.
          </span>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Required</th>
                <th>Available</th>
                <th>Reserved</th>
                <th>Shortage</th>
                <th>Readiness</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => {
                const required = Number(project.required || 0);
                const available = Number(project.available || 0);
                const reserved = Number(project.reserved || 0);

                const shortage = Math.max(
                  required - available - reserved,
                  0
                );

                const readiness =
                  project.readiness ??
                  (required > 0
                    ? Math.min(
                        100,
                        Math.round(((available + reserved) / required) * 100)
                      )
                    : 100);

                return (
                  <tr
                    key={project.id || project.projectId || project.name}
                    onClick={() => onProjectClick?.(project)}
                    className={onProjectClick ? "table-row-clickable" : ""}
                  >
                    <td>
                      <strong>{project.name}</strong>
                      {project.site && (
                        <span className="table-subtext">
                          {project.site}
                        </span>
                      )}
                    </td>

                    <td>{formatNumber(required)}</td>
                    <td>{formatNumber(available)}</td>
                    <td>{formatNumber(reserved)}</td>

                    <td>
                      <strong className={shortage > 0 ? "text-danger" : ""}>
                        {formatNumber(shortage)}
                      </strong>
                    </td>

                    <td>
                      <div className="progress-wrapper">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            style={{
                              width: `${Math.min(readiness, 100)}%`,
                            }}
                          />
                        </div>

                        <span>{readiness}%</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`status-badge ${getReadinessClass(
                          readiness
                        )}`}
                      >
                        {getReadinessLabel(readiness)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}