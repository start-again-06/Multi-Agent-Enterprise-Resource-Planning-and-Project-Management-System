import React from "react";

const DEFAULT_KPIS = [
  {
    id: "inventory",
    label: "Total Inventory",
    value: "2,264",
    unit: "units",
    change: "+8.4%",
    trend: "up",
    description: "Across all active locations",
  },
  {
    id: "projects",
    label: "Active Projects",
    value: "12",
    unit: "",
    change: "+2",
    trend: "up",
    description: "Currently in execution",
  },
  {
    id: "requests",
    label: "Pending Requests",
    value: "18",
    unit: "",
    change: "-4",
    trend: "down",
    description: "Awaiting approval",
  },
  {
    id: "transfers",
    label: "In-Transit Transfers",
    value: "7",
    unit: "",
    change: "+1",
    trend: "neutral",
    description: "Awaiting site receipt",
  },
];

export default function KPIGrid({ kpis = DEFAULT_KPIS }) {
  return (
    <section className="kpi-grid">
      {kpis.map((kpi) => (
        <article className="stat-card" key={kpi.id}>
          <div className="stat-card__header">
            <span>{kpi.label}</span>

            <span className={`trend trend--${kpi.trend}`}>
              {kpi.trend === "up" && "↑"}
              {kpi.trend === "down" && "↓"}
              {kpi.trend === "neutral" && "→"}
              {" "}
              {kpi.change}
            </span>
          </div>

          <div className="stat-card__value">
            {kpi.value}
            {kpi.unit && <small>{kpi.unit}</small>}
          </div>

          <span className="stat-card__description">
            {kpi.description}
          </span>
        </article>
      ))}
    </section>
  );
}