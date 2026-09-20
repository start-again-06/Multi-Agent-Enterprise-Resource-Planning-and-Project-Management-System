import React from "react";

const formatCurrency = (value = 0, currency = "INR") =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value = 0) =>
  new Intl.NumberFormat("en-IN").format(value);

export default function InventoryValue({
  totalValue = 0,
  availableValue = 0,
  reservedValue = 0,
  inTransitValue = 0,
  damagedValue = 0,
  itemCount = 0,
  currency = "INR",
  onViewInventory,
}) {
  const cards = [
    {
      label: "Total Inventory Value",
      value: formatCurrency(totalValue, currency),
      className: "stat-card-primary",
    },
    {
      label: "Available Value",
      value: formatCurrency(availableValue, currency),
      className: "stat-card-success",
    },
    {
      label: "Reserved Value",
      value: formatCurrency(reservedValue, currency),
      className: "stat-card-warning",
    },
    {
      label: "In Transit Value",
      value: formatCurrency(inTransitValue, currency),
      className: "stat-card-info",
    },
  ];

  return (
    <section className="card report-card">
      <div className="card-header">
        <div>
          <span className="eyebrow">Inventory valuation</span>
          <h3>Inventory Value</h3>
          <p className="text-muted">
            Current value of materials across warehouses and project sites.
          </p>
        </div>

        {onViewInventory && (
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={onViewInventory}
          >
            View Inventory
          </button>
        )}
      </div>

      <div className="stats-grid">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`stat-card ${card.className || ""}`}
          >
            <span className="stat-label">{card.label}</span>
            <strong className="stat-value">{card.value}</strong>
          </div>
        ))}
      </div>

      <div className="report-summary">
        <div>
          <span className="text-muted">Tracked Items</span>
          <strong>{formatNumber(itemCount)}</strong>
        </div>

        <div>
          <span className="text-muted">Damaged Value</span>
          <strong>{formatCurrency(damagedValue, currency)}</strong>
        </div>
      </div>
    </section>
  );
}