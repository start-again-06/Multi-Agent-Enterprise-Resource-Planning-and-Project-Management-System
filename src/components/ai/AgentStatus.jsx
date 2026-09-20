import React from "react";

const STATUS_CONFIG = {
  online: {
    label: "Online",
    className: "status-success",
  },
  running: {
    label: "Running",
    className: "status-info",
  },
  idle: {
    label: "Idle",
    className: "status-neutral",
  },
  error: {
    label: "Error",
    className: "status-danger",
  },
  offline: {
    label: "Offline",
    className: "status-warning",
  },
};

export default function AgentStatus({
  status = "idle",
  lastRun,
  compact = false,
}) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.idle;

  return (
    <div className={`ai-agent-status ${compact ? "ai-agent-status--compact" : ""}`}>
      <span className={`status-dot ${config.className}`} />

      <div className="ai-agent-status__content">
        <span className="ai-agent-status__label">{config.label}</span>

        {lastRun && !compact && (
          <span className="ai-agent-status__time">
            Last run: {lastRun}
          </span>
        )}
      </div>
    </div>
  );
}