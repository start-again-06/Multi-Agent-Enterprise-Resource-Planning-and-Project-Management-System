import React from "react";

const STATUS_CONFIG = {
  AVAILABLE: {
    label: "Available",
    className: "status-success",
  },
  RESERVED: {
    label: "Reserved",
    className: "status-info",
  },
  ALLOCATED: {
    label: "Allocated",
    className: "status-info",
  },
  IN_TRANSIT: {
    label: "In Transit",
    className: "status-warning",
  },
  RECEIVED: {
    label: "Received",
    className: "status-success",
  },
  ISSUED: {
    label: "Issued",
    className: "status-neutral",
  },
  CONSUMED: {
    label: "Consumed",
    className: "status-neutral",
  },
  RETURNED: {
    label: "Returned",
    className: "status-success",
  },
  DAMAGED: {
    label: "Damaged",
    className: "status-danger",
  },
  UNDER_INSPECTION: {
    label: "Under Inspection",
    className: "status-warning",
  },
  LOST: {
    label: "Lost",
    className: "status-danger",
  },
  SCRAPPED: {
    label: "Scrapped",
    className: "status-danger",
  },
  QUARANTINED: {
    label: "Quarantined",
    className: "status-danger",
  },
};

export default function InventoryStatus({
  status,
  quantity,
  showQuantity = false,
}) {
  const normalized = String(status || "")
    .trim()
    .toUpperCase();

  const config =
    STATUS_CONFIG[normalized] || {
      label: status || "Unknown",
      className: "status-neutral",
    };

  return (
    <div className="inventory-status">
      <span className={`status-badge ${config.className}`}>
        <span className="status-dot" />
        {config.label}
      </span>

      {showQuantity && quantity !== undefined && (
        <span className="inventory-status__quantity">
          {Number(quantity).toLocaleString()}
        </span>
      )}
    </div>
  );
}