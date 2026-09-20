import React, { useMemo, useState } from "react";

export default function StockCount({
  items = [],
  onSubmit,
  onCancel,
}) {
  const initialCounts = useMemo(
    () =>
      Object.fromEntries(
        items.map((item) => [
          item.id,
          item.countedQuantity ?? item.quantity ?? 0,
        ])
      ),
    [items]
  );

  const [counts, setCounts] = useState(initialCounts);
  const [notes, setNotes] = useState("");

  const updateCount = (id, value) => {
    setCounts((current) => ({
      ...current,
      [id]: value,
    }));
  };

  const getVariance = (item) => {
    const expected = Number(item.quantity || 0);
    const counted = Number(counts[item.id] || 0);

    return counted - expected;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = items.map((item) => ({
      inventoryId: item.id,
      expectedQuantity: Number(item.quantity || 0),
      countedQuantity: Number(counts[item.id] || 0),
      variance: getVariance(item),
    }));

    onSubmit?.({
      items: result,
      notes,
    });
  };

  return (
    <form className="card stock-count" onSubmit={handleSubmit}>
      <div className="section-header">
        <div>
          <span className="page-header__eyebrow">
            Inventory Control
          </span>
          <h2>Stock Count</h2>
          <p>
            Record physical quantities and identify inventory variances.
          </p>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Location</th>
              <th>Expected</th>
              <th>Counted</th>
              <th>Variance</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => {
              const variance = getVariance(item);

              return (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>

                    {item.sku && (
                      <div className="table-secondary">
                        {item.sku}
                      </div>
                    )}
                  </td>

                  <td>
                    {item.locationName ||
                      item.warehouseName ||
                      "—"}
                  </td>

                  <td>
                    {Number(item.quantity || 0).toLocaleString()}
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={counts[item.id] ?? ""}
                      onChange={(event) =>
                        updateCount(item.id, event.target.value)
                      }
                      aria-label={`Count ${item.name}`}
                    />
                  </td>

                  <td>
                    <span
                      className={
                        variance === 0
                          ? "variance-zero"
                          : variance > 0
                            ? "variance-positive"
                            : "variance-negative"
                      }
                    >
                      {variance > 0 ? "+" : ""}
                      {variance}
                    </span>
                  </td>
                </tr>
              );
            })}

            {items.length === 0 && (
              <tr>
                <td colSpan="5">
                  <div className="empty-state">
                    <h3>No items to count</h3>
                    <p>
                      Add inventory items before starting a stock count.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="form-group stock-count__notes">
        <label htmlFor="stock-count-notes">Count Notes</label>
        <textarea
          id="stock-count-notes"
          rows="3"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Add observations, discrepancies or inspection notes..."
        />
      </div>

      <div className="stock-count__actions">
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={items.length === 0}
        >
          Submit Stock Count
        </button>
      </div>
    </form>
  );
}