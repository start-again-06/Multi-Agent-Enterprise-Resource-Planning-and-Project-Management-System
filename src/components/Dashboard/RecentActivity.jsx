import React from "react";

const DEFAULT_ACTIVITIES = [
  {
    id: 1,
    type: "receipt",
    title: "Material received",
    description: "120 bags cement received at Bangalore Site.",
    reference: "GRN-2026-041",
    user: "Storekeeper",
    time: "10 min ago",
  },
  {
    id: 2,
    type: "transfer",
    title: "Transfer dispatched",
    description: "Steel components dispatched to Calicut Site.",
    reference: "TRF-2026-018",
    user: "Warehouse Manager",
    time: "28 min ago",
  },
  {
    id: 3,
    type: "request",
    title: "Material request approved",
    description: "Concrete reinforcement material request approved.",
    reference: "MR-2026-073",
    user: "Project Manager",
    time: "45 min ago",
  },
  {
    id: 4,
    type: "issue",
    title: "Inventory issued",
    description: "Electrical components issued to Site Engineering.",
    reference: "ISS-2026-029",
    user: "Site Manager",
    time: "1 hr ago",
  },
];

const ACTIVITY_ICONS = {
  receipt: "↓",
  transfer: "→",
  request: "✓",
  issue: "↑",
};

export default function RecentActivity({
  activities = DEFAULT_ACTIVITIES,
  onActivityClick,
}) {
  return (
    <section className="card recent-activity">
      <div className="section-header">
        <div>
          <span className="page-header__eyebrow">Activity</span>
          <h2>Recent Activity</h2>
          <p>Latest inventory and project operations.</p>
        </div>

        <button type="button" className="btn btn-secondary">
          View All
        </button>
      </div>

      <div className="recent-activity__list">
        {activities.map((activity) => (
          <button
            type="button"
            className="activity-item"
            key={activity.id}
            onClick={() => onActivityClick?.(activity)}
          >
            <span className={`activity-item__icon activity-${activity.type}`}>
              {ACTIVITY_ICONS[activity.type] || "•"}
            </span>

            <span className="activity-item__content">
              <strong>{activity.title}</strong>
              <span>{activity.description}</span>

              <small>
                {activity.reference} · {activity.user}
              </small>
            </span>

            <time>{activity.time}</time>
          </button>
        ))}
      </div>
    </section>
  );
}