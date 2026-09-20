import React from "react";
import TransferStatus from "./TransferStatus";

const PRIORITY_CLASSES = {
  LOW: "status-neutral",
  NORMAL: "status-info",
  HIGH: "status-warning",
  URGENT: "status-danger",
};

export default function TransferTable({
  transfers = [],
  onView,
  onApprove,
  onDispatch,
  onReceive,
  onCancel,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="card">
        <div className="loading-state">
          <span className="loading-spinner" />
          <span>Loading transfers...</span>
        </div>
      </div>
    );
  }

  if (transfers.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <strong>No transfers found</strong>
          <span>
            Inventory transfers will appear here when created.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <span className="eyebrow">Inventory logistics</span>
          <h3>Transfer Queue</h3>
          <p className="text-muted">
            Track material transfers between project locations.
          </p>
        </div>

        <span className="text-muted">
          {transfers.length} transfer
          {transfers.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Transfer</th>
              <th>Source</th>
              <th>Destination</th>
              <th>Materials</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Expected</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {transfers.map((transfer) => {
              const lines = transfer.lines || [];

              const canApprove =
                transfer.status === "REQUESTED";

              const canDispatch =
                transfer.status === "APPROVED";

              const canReceive =
                transfer.status === "IN_TRANSIT";

              return (
                <tr key={transfer.id}>
                  <td>
                    <strong>
                      {transfer.transferNumber ||
                        transfer.id}
                    </strong>

                    {transfer.createdAt && (
                      <span className="table-subtext">
                        {new Date(
                          transfer.createdAt
                        ).toLocaleDateString("en-IN")}
                      </span>
                    )}
                  </td>

                  <td>
                    <strong>
                      {transfer.sourceProjectName ||
                        transfer.sourceProject ||
                        "—"}
                    </strong>

                    <span className="table-subtext">
                      {transfer.sourceSiteName ||
                        transfer.sourceSite ||
                        "—"}
                    </span>

                    {transfer.sourceWarehouseName && (
                      <span className="table-subtext">
                        {transfer.sourceWarehouseName}
                      </span>
                    )}
                  </td>

                  <td>
                    <strong>
                      {transfer.destinationProjectName ||
                        transfer.destinationProject ||
                        "—"}
                    </strong>

                    <span className="table-subtext">
                      {transfer.destinationSiteName ||
                        transfer.destinationSite ||
                        "—"}
                    </span>

                    {transfer.destinationWarehouseName && (
                      <span className="table-subtext">
                        {transfer.destinationWarehouseName}
                      </span>
                    )}
                  </td>

                  <td>
                    <strong>{lines.length}</strong>
                    <span className="table-subtext">
                      material {lines.length !== 1 ? "lines" : "line"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        PRIORITY_CLASSES[transfer.priority] ||
                        "status-neutral"
                      }`}
                    >
                      {transfer.priority || "NORMAL"}
                    </span>
                  </td>

                  <td>
                    <TransferStatus status={transfer.status} />
                  </td>

                  <td>
                    {transfer.expectedDate || "—"}
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => onView?.(transfer)}
                      >
                        View
                      </button>

                      {canApprove && (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => onApprove?.(transfer)}
                        >
                          Approve
                        </button>
                      )}

                      {canDispatch && (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => onDispatch?.(transfer)}
                        >
                          Dispatch
                        </button>
                      )}

                      {canReceive && (
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          onClick={() => onReceive?.(transfer)}
                        >
                          Receive
                        </button>
                      )}

                      {!["RECEIVED", "CANCELLED", "REJECTED"].includes(
                        transfer.status
                      ) && (
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => onCancel?.(transfer)}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}