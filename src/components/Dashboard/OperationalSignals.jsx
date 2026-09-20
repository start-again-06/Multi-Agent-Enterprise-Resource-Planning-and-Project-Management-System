import React from "react";

const DEFAULT_SIGNALS = [
  {
    id: 1,
    type: "warning",
    title: "Low stock detected",
    description: "Cement is below minimum threshold at Calicut Site.",
    time: "12 min ago",
  },
  {
    id: 2,
    type: "info",
    title: "Transfer dispatched",
    description: "TRF-2026-018 dispatched from Chennai Warehouse.",
    time: "28 min ago",
  },
  {
    id: 3,
    type: "success",
    title: "Receipt completed",
    description: "GRN-2026-041 received at Bangalore Site.",
    time: "42 min ago",
  },
  {
    id: 4,
    type: "danger",
    title: "Inventory discrepancy",
    description: "Stock count variance detected for steel components.",
    time: "1 hr ago",
  },
];

const SIGNAL_ICONS = {
  warning: "!",
  info: "i",
  success: "✓",
  danger: "×",
};

export default function OperationalSignals({
  signals = DEFAULT_SIGNALS,
  onSignalClick,
}) {
  return (
    <section className="card operational-signals">
      <div className="section-header">
        <div>
          <span className="page-header__eyebrow">Operations</span>
          <h2>Operational Signals</h2>
          <p>Events requiring attention across the network.</p>
        </div>
      </div>

      <div className="operational-signals__list">
        {signals.map((signal) => (
          <button
            type="button"
            className={`operational-signal operational-signal--${signal.type}`}
            key={signal.id}
            onClick={() => onSignalClick?.(signal)}
          >
            <span className="operational-signal__icon">
              {SIGNAL_ICONS[signal.type] || "•"}
            </span>

            <span className="operational-signal__content">
              <strong>{signal.title}</strong>
              <span>{signal.description}</span>
            </span>

            <time>{signal.time}</time>
          </button>
        ))}
      </div>
    </section>
  );
}