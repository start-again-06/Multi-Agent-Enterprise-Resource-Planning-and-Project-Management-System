import React from "react";

export default function ReorderQueue({
  items = [],
  onCreateRequest,
  onInvestigate,
}) {
  return (
    <section className="card reorder-queue">
      <div className="section-header">
        <div>
          <span className="page-header__eyebrow">
            Procurement Intelligence
          </span>
          <h2>Reorder Queue</h2>
          <p>
            Materials requiring attention based on projected
            availability and requirements.
          </p>
        </div>

        <span className="status-badge status-warning">
          {items.length} Items
        </span>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>Reorder queue is clear</h3>
          <p>
            No materials currently require procurement action.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Project / Site</th>
                <th>Available</th>
                <th>Reserved</th>
                <th>Required</th>
                <th>Projected</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>

                    {item.sku && (
                      <div className="table-secondary">
                        {item.sku}
                      </div>
                    )}
                  </td>

                  <td>
                    <div>{item.projectName || "—"}</div>
                    <div className="table-secondary">
                      {item.siteName || "—"}
                    </div>
                  </td>

                  <td>
                    {Number(
                      item.available || 0
                    ).toLocaleString()}
                  </td>

                  <td>
                    {Number(
                      item.reserved || 0
                    ).toLocaleString()}
                  </td>

                  <td>
                    {Number(
                      item.required || 0
                    ).toLocaleString()}
                  </td>

                  <td>
                    <strong>
                      {Number(
                        item.projectedAvailable || 0
                      ).toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    <div className="table-actions">
                      {onCreateRequest && (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            onCreateRequest(item)
                          }
                        >
                          Create PR
                        </button>
                      )}

                      {onInvestigate && (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() =>
                            onInvestigate(item)
                          }
                        >
                          Investigate
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}