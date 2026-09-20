import React from "react";

const STATUS_CLASSES = {
  DRAFT: "status-neutral",
  SUBMITTED: "status-info",
  UNDER_REVIEW: "status-warning",
  APPROVED: "status-success",
  REJECTED: "status-danger",
  FULFILLED: "status-success",
  CANCELLED: "status-neutral",
};

const PRIORITY_CLASSES = {
  LOW: "status-neutral",
  NORMAL: "status-info",
  HIGH: "status-warning",
  URGENT: "status-danger",
};

const STATUS_LABELS = {
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  FULFILLED: "Fulfilled",
  CANCELLED: "Cancelled",
};

const formatStatus = (status) =>
  STATUS_LABELS[status] ||
  status
    ?.replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase()) ||
  "—";

export default function RequestTable({
  requests = [],
  onView,
  onApprove,
  onReject,
  loading = false,
}) {
  if (loading) {
    return (
      <div className="card">
        <div className="loading-state">
          <span className="loading-spinner" />
          <span>Loading material requests...</span>
        </div>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="card">
        <div className="empty-state">
          <strong>No material requests</strong>
          <span>
            Material requests created by project sites will appear here.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <span className="eyebrow">Material requests</span>
          <h3>Request Queue</h3>
          <p className="text-muted">
            Review and manage project material requirements.
          </p>
        </div>

        <span className="text-muted">
          {requests.length} request
          {requests.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Request</th>
              <th>Project / Site</th>
              <th>Requested By</th>
              <th>Materials</th>
              <th>Priority</th>
              <th>Required Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => {
              const lines = request.lines || [];

              const canApprove =
                request.status === "SUBMITTED" ||
                request.status === "UNDER_REVIEW";

              return (
                <tr key={request.id}>
                  <td>
                    <strong>
                      {request.requestNumber || request.id}
                    </strong>

                    {request.createdAt && (
                      <span className="table-subtext">
                        {new Date(
                          request.createdAt
                        ).toLocaleDateString("en-IN")}
                      </span>
                    )}
                  </td>

                  <td>
                    <strong>
                      {request.projectName ||
                        request.project ||
                        "—"}
                    </strong>

                    <span className="table-subtext">
                      {request.siteName ||
                        request.site ||
                        "—"}
                    </span>
                  </td>

                  <td>{request.requestedBy || "—"}</td>

                  <td>
                    <strong>{lines.length}</strong>
                    <span className="table-subtext">
                      material {lines.length !== 1 ? "lines" : "line"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        PRIORITY_CLASSES[request.priority] ||
                        "status-neutral"
                      }`}
                    >
                      {request.priority || "NORMAL"}
                    </span>
                  </td>

                  <td>{request.requiredDate || "—"}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        STATUS_CLASSES[request.status] ||
                        "status-neutral"
                      }`}
                    >
                      {formatStatus(request.status)}
                    </span>
                  </td>

                  <td>
                    <div className="table-actions">
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        onClick={() => onView?.(request)}
                      >
                        View
                      </button>

                      {canApprove && (
                        <>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => onApprove?.(request)}
                          >
                            Approve
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => onReject?.(request)}
                          >
                            Reject
                          </button>
                        </>
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