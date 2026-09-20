import React from "react";

const TYPE_CONFIG = {
  inventory: {
    label: "Inventory",
    icon: "📦",
  },
  project: {
    label: "Project",
    icon: "🏗️",
  },
  procurement: {
    label: "Procurement",
    icon: "🛒",
  },
  logistics: {
    label: "Logistics",
    icon: "🚚",
  },
  finance: {
    label: "Finance",
    icon: "₹",
  },
  operations: {
    label: "Operations",
    icon: "⚙️",
  },
  risk: {
    label: "Risk",
    icon: "⚠️",
  },
};

export default function InsightCard({
  title,
  description,
  value,
  type = "inventory",
  severity = "info",
  timestamp,
}) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.inventory;

  return (
    <article className={`ai-insight-card ai-insight-card--${severity}`}>
      <div className="ai-insight-card__header">
        <div className="ai-insight-card__type">
          <span className="ai-insight-card__icon">{config.icon}</span>
          <span>{config.label}</span>
        </div>

        {timestamp && (
          <span className="ai-insight-card__timestamp">
            {timestamp}
          </span>
        )}
      </div>

      <div className="ai-insight-card__body">
        <h3>{title}</h3>

        {value !== undefined && value !== null && (
          <div className="ai-insight-card__value">{value}</div>
        )}

        {description && (
          <p>{description}</p>
        )}
      </div>
    </article>
  );
}