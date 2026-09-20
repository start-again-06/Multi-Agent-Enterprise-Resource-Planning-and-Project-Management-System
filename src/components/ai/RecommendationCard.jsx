import React from "react";

const ACTION_LABELS = {
  BUY: "Buy",
  TRANSFER: "Transfer",
  WAIT: "Wait",
  REALLOCATE: "Reallocate",
  INVESTIGATE: "Investigate",
  COUNT: "Perform Stock Count",
};

export default function RecommendationCard({
  title,
  reason,
  action,
  agent = "Inventory Intelligence",
  confidence,
  priority = "medium",
  source,
  onAction,
  onDismiss,
}) {
  const actionLabel = ACTION_LABELS[action] || action || "Review";

  return (
    <article className={`ai-recommendation-card ai-recommendation-card--${priority}`}>
      <div className="ai-recommendation-card__header">
        <div>
          <span className="ai-recommendation-card__eyebrow">
            AI Recommendation
          </span>

          <h3>{title}</h3>
        </div>

        <span className={`priority-badge priority-${priority}`}>
          {priority}
        </span>
      </div>

      <div className="ai-recommendation-card__body">
        {reason && <p>{reason}</p>}

        <div className="ai-recommendation-card__meta">
          <span>
            <strong>Agent:</strong> {agent}
          </span>

          {confidence !== undefined && (
            <span>
              <strong>Confidence:</strong>{" "}
              {Math.round(confidence * 100)}%
            </span>
          )}

          {source && (
            <span>
              <strong>Source:</strong> {source}
            </span>
          )}
        </div>
      </div>

      <div className="ai-recommendation-card__actions">
        {onAction && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onAction(action)}
          >
            {actionLabel}
          </button>
        )}

        {onDismiss && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onDismiss}
          >
            Dismiss
          </button>
        )}
      </div>
    </article>
  );
}