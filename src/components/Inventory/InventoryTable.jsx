import React from "react";
import InventoryStatus from "./InventoryStatus";

export default function InventoryTable({
  items = [],
  loading = false,
  onRowClick,
  onSelect,
  selectedIds = [],
}) {
  const allSelected =
    items.length > 0 &&
    items.every((item) => selectedIds.includes(item.id));

  const toggleAll = () => {
    if (allSelected) {
      items.forEach((item) => onSelect?.(item, false));
      return;
    }

    items.forEach((item) => onSelect?.(item, true));
  };

  if (loading) {
    return (
      <div className="card table-loading">
        Loading inventory...
      </div>
    );
  }

  return (
    <div className="card inventory-table-wrapper">
      <div className="table-container">
        <table className="data-table inventory-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all inventory"
                />
              </th>
              <th>Item</th>
              <th>SKU / Barcode</th>
              <th>Project</th>
              <th>Location</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>

          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan="8">
                  <div className="empty-state">
                    <h3>No inventory found</h3>
                    <p>
                      Try changing your filters or search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((item) => {
                const selected = selectedIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    className={selected ? "is-selected" : ""}
                    onClick={() => onRowClick?.(item)}
                  >
                    <td onClick={(event) => event.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(event) =>
                          onSelect?.(item, event.target.checked)
                        }
                        aria-label={`Select ${item.name}`}
                      />
                    </td>

                    <td>
                      <div className="table-primary">
                        {item.name}
                      </div>

                      {item.category && (
                        <div className="table-secondary">
                          {item.category}
                        </div>
                      )}
                    </td>

                    <td>
                      <div>{item.sku || "—"}</div>
                      <div className="table-secondary">
                        {item.barcode || "No barcode"}
                      </div>
                    </td>

                    <td>
                      {item.projectName || "—"}
                    </td>

                    <td>
                      <div>{item.siteName || "—"}</div>
                      <div className="table-secondary">
                        {item.warehouseName || item.locationName || "—"}
                      </div>
                    </td>

                    <td>
                      <strong>
                        {Number(item.quantity || 0).toLocaleString()}
                      </strong>{" "}
                      {item.unit || ""}
                    </td>

                    <td>
                      <InventoryStatus status={item.status} />
                    </td>

                    <td>
                      {item.updatedAt
                        ? new Date(item.updatedAt).toLocaleDateString()
                        : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}