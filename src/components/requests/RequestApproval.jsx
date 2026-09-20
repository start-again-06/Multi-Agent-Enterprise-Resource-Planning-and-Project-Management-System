import React, { useState } from "react";

const REQUEST_STATUS = {
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  UNDER_REVIEW: "UNDER_REVIEW",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  FULFILLED: "FULFILLED",
  CANCELLED: "CANCELLED",
};

export default function RequestApproval({
  request,
  onApprove,
  onReject,
  onClose,
  loading = false,
}) {
  const [comment, setComment] = useState("");

  if (!request) {
    return (
      <div className="empty-state">
        <strong>No request selected</strong>
        <span>Select a material request to review.</span>
      </div>
    );
  }

  const canReview =
    request.status === REQUEST_STATUS.SUBMITTED ||
    request.status === REQUEST_STATUS.UNDER_REVIEW;

  const handleApprove = async () => {
    await onApprove?.({
      requestId: request.id,
      comment: comment.trim(),
    });
  };

  const handleReject = async () => {
    if (!comment.trim()) {
      return;
    }

    await onReject?.({
      requestId: request.id,
      comment: comment.trim(),
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal modal-lg">
        <div className="modal-header">
          <div>
            <span className="eyebrow">Material request</span>
            <h2>Request Approval</h2>
            <p className="text-muted">
              Review the requested materials before approving fulfilment.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-icon"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-grid">
            <div>
              <span className="detail-label">Request ID</span>
              <strong>{request.requestNumber || request.id}</strong>
            </div>

            <div>
              <span className="detail-label">Status</span>
              <span className="status-badge">
                {request.status || "—"}
              </span>
            </div>

            <div>
              <span className="detail-label">Project</span>
              <strong>{request.projectName || request.project || "—"}</strong>
            </div>

            <div>
              <span className="detail-label">Site</span>
              <strong>{request.siteName || request.site || "—"}</strong>
            </div>

            <div>
              <span className="detail-label">Requested By</span>
              <strong>{request.requestedBy || "—"}</strong>
            </div>

            <div>
              <span className="detail-label">Priority</span>
              <strong>{request.priority || "NORMAL"}</strong>
            </div>

            <div>
              <span className="detail-label">Required Date</span>
              <strong>{request.requiredDate || "—"}</strong>
            </div>
          </div>

          {request.justification && (
            <div className="detail-section">
              <h4>Justification</h4>
              <p>{request.justification}</p>
            </div>
          )}

          <div className="detail-section">
            <h4>Requested Materials</h4>

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>SKU</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                  </tr>
                </thead>

                <tbody>
                  {(request.lines || []).map((line, index) => (
                    <tr key={line.id || `${request.id}-line-${index}`}>
                      <td>
                        <strong>
                          {line.itemName || line.material || "—"}
                        </strong>
                      </td>
                      <td>{line.sku || "—"}</td>
                      <td>{line.quantity ?? 0}</td>
                      <td>{line.unit || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {canReview && (
            <div className="form-group">
              <label htmlFor="approval-comment">
                Review Comment
              </label>

              <textarea
                id="approval-comment"
                className="form-textarea"
                rows={4}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Add an approval note or rejection reason..."
              />

              <span className="form-help">
                A rejection reason is required when rejecting a request.
              </span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={loading}
          >
            Close
          </button>

          {canReview && (
            <>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleReject}
                disabled={loading || !comment.trim()}
              >
                {loading ? "Processing..." : "Reject Request"}
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleApprove}
                disabled={loading}
              >
                {loading ? "Processing..." : "Approve Request"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}