import React, { useMemo, useState } from "react";

const MOVEMENT_TYPES = [
  "ALL",
  "RECEIPT",
  "TRANSFER",
  "ISSUE",
  "RETURN",
  "CONSUMPTION",
  "ADJUSTMENT",
];

const TYPE_LABELS = {
  RECEIPT: "Receipt",
  TRANSFER: "Transfer",
  ISSUE: "Issue",
  RETURN: "Return",
  CONSUMPTION: "Consumption",
  ADJUSTMENT: "Adjustment",
};

const TYPE_CLASSES = {
  RECEIPT: "status-success",
  TRANSFER: "status-info",
  ISSUE: "status-warning",
  RETURN: "status-success",
  CONSUMPTION: "status-danger",
  ADJUSTMENT: "status-neutral",
};

const formatNumber = (value = 0) =>
  new Intl.NumberFormat("en-IN").format(value);

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function StockMovement({
  movements = [],
  onMovementClick,
}) {
  const [type, setType] = useState("ALL");
  const [search, setSearch] = useState("");

  const filteredMovements = useMemo(() => {
    const query = search.trim().toLowerCase();

    return movements.filter((movement) => {
      const matchesType =
        type === "ALL" || movement.type === type;

      if (!query) return matchesType;

      const searchableText = [
        movement.itemName,
        movement.sku,
        movement.barcode,
        movement.project,
        movement.site,
        movement.from,
        movement.to,
        movement.reference,
        movement.performedBy,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesType && searchableText.includes(query);
    });
  }, [movements, type, search]);

  return (
    <section className="card report-card">
      <div className="card-header">
        <div>
          <span className="eyebrow">Inventory ledger</span>
          <h3>Stock Movement</h3>
          <p className="text-muted">
            Chronological movement of materials across the inventory network.
          </p>
        </div>

        <div className="filter-group">
          <select
            className="form-select"
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            {MOVEMENT_TYPES.map((movementType) => (
              <option key={movementType} value={movementType}>
                {movementType === "ALL"
                  ? "All Movements"
                  : TYPE_LABELS[movementType]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="report-toolbar">
        <div className="search-box">
          <input
            type="search"
            className="form-input"
            placeholder="Search item, SKU, project, reference..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <span className="text-muted">
          {filteredMovements.length} movement
          {filteredMovements.length !== 1 ? "s" : ""}
        </span>
      </div>

      {filteredMovements.length === 0 ? (
        <div className="empty-state">
          <strong>No stock movements found</strong>
          <span>
            Try changing the movement type or search criteria.
          </span>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Movement</th>
                <th>Material</th>
                <th>Project / Site</th>
                <th>From</th>
                <th>To</th>
                <th>Quantity</th>
                <th>Reference</th>
                <th>Performed By</th>
              </tr>
            </thead>

            <tbody>
              {filteredMovements.map((movement) => (
                <tr
                  key={movement.id}
                  onClick={() => onMovementClick?.(movement)}
                  className={
                    onMovementClick ? "table-row-clickable" : ""
                  }
                >
                  <td>{formatDate(movement.date || movement.createdAt)}</td>

                  <td>
                    <span
                      className={`status-badge ${
                        TYPE_CLASSES[movement.type] ||
                        "status-neutral"
                      }`}
                    >
                      {TYPE_LABELS[movement.type] ||
                        movement.type ||
                        "Unknown"}
                    </span>
                  </td>

                  <td>
                    <strong>{movement.itemName || "—"}</strong>

                    {movement.sku && (
                      <span className="table-subtext">
                        SKU: {movement.sku}
                      </span>
                    )}

                    {movement.barcode && (
                      <span className="table-subtext">
                        {movement.barcode}
                      </span>
                    )}
                  </td>

                  <td>
                    <strong>{movement.project || "—"}</strong>

                    {movement.site && (
                      <span className="table-subtext">
                        {movement.site}
                      </span>
                    )}
                  </td>

                  <td>{movement.from || "—"}</td>
                  <td>{movement.to || "—"}</td>

                  <td>
                    <strong>
                      {formatNumber(movement.quantity || 0)}
                    </strong>

                    {movement.unit && (
                      <span className="table-subtext">
                        {movement.unit}
                      </span>
                    )}
                  </td>

                  <td>{movement.reference || "—"}</td>
                  <td>{movement.performedBy || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}