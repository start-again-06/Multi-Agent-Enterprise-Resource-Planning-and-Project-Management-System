import React, { useState } from "react";

const INITIAL_FORM = {
  sourceProjectId: "",
  sourceSiteId: "",
  sourceWarehouseId: "",
  destinationProjectId: "",
  destinationSiteId: "",
  destinationWarehouseId: "",
  priority: "NORMAL",
  expectedDate: "",
  reason: "",
  lines: [
    {
      itemId: "",
      itemName: "",
      sku: "",
      availableQuantity: 0,
      quantity: 1,
      unit: "",
    },
  ],
};

const PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT"];

export default function TransferForm({
  projects = [],
  sites = [],
  warehouses = [],
  items = [],
  initialData,
  onSubmit,
  onCancel,
  loading = false,
}) {
  const [form, setForm] = useState(initialData || INITIAL_FORM);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateLine = (index, field, value) => {
    setForm((current) => ({
      ...current,
      lines: current.lines.map((line, lineIndex) =>
        lineIndex === index
          ? { ...line, [field]: value }
          : line
      ),
    }));
  };

  const addLine = () => {
    setForm((current) => ({
      ...current,
      lines: [
        ...current.lines,
        {
          itemId: "",
          itemName: "",
          sku: "",
          availableQuantity: 0,
          quantity: 1,
          unit: "",
        },
      ],
    }));
  };

  const removeLine = (index) => {
    setForm((current) => ({
      ...current,
      lines:
        current.lines.length === 1
          ? current.lines
          : current.lines.filter(
              (_, lineIndex) => lineIndex !== index
            ),
    }));
  };

  const handleItemChange = (index, itemId) => {
    const item = items.find(
      (candidate) => String(candidate.id) === String(itemId)
    );

    updateLine(index, "itemId", itemId);

    if (item) {
      updateLine(index, "itemName", item.name || "");
      updateLine(index, "sku", item.sku || "");
      updateLine(
        index,
        "availableQuantity",
        Number(item.availableQuantity || 0)
      );
      updateLine(index, "unit", item.unit || "");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validLines = form.lines.filter(
      (line) =>
        line.itemId &&
        Number(line.quantity) > 0 &&
        Number(line.quantity) <= Number(line.availableQuantity)
    );

    if (
      !form.sourceProjectId ||
      !form.sourceSiteId ||
      !form.sourceWarehouseId ||
      !form.destinationProjectId ||
      !form.destinationSiteId ||
      !form.destinationWarehouseId ||
      validLines.length === 0
    ) {
      return;
    }

    await onSubmit?.({
      sourceProjectId: form.sourceProjectId,
      sourceSiteId: form.sourceSiteId,
      sourceWarehouseId: form.sourceWarehouseId,
      destinationProjectId: form.destinationProjectId,
      destinationSiteId: form.destinationSiteId,
      destinationWarehouseId: form.destinationWarehouseId,
      priority: form.priority,
      expectedDate: form.expectedDate,
      reason: form.reason.trim(),
      lines: validLines.map((line) => ({
        itemId: line.itemId,
        quantity: Number(line.quantity),
        unit: line.unit,
      })),
    });
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit}>
      <div className="card-header">
        <div>
          <span className="eyebrow">Inventory transfer</span>
          <h3>Create Transfer</h3>
          <p className="text-muted">
            Move materials between project sites or warehouses.
          </p>
        </div>
      </div>

      <div className="detail-section">
        <h4>Source Location</h4>

        <div className="form-grid form-grid-3">
          <div className="form-group">
            <label>Project *</label>
            <select
              className="form-select"
              value={form.sourceProjectId}
              onChange={(event) =>
                updateField(
                  "sourceProjectId",
                  event.target.value
                )
              }
              required
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Site *</label>
            <select
              className="form-select"
              value={form.sourceSiteId}
              onChange={(event) =>
                updateField("sourceSiteId", event.target.value)
              }
              required
            >
              <option value="">Select site</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Warehouse *</label>
            <select
              className="form-select"
              value={form.sourceWarehouseId}
              onChange={(event) =>
                updateField(
                  "sourceWarehouseId",
                  event.target.value
                )
              }
              required
            >
              <option value="">Select warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <h4>Destination Location</h4>

        <div className="form-grid form-grid-3">
          <div className="form-group">
            <label>Project *</label>
            <select
              className="form-select"
              value={form.destinationProjectId}
              onChange={(event) =>
                updateField(
                  "destinationProjectId",
                  event.target.value
                )
              }
              required
            >
              <option value="">Select project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Site *</label>
            <select
              className="form-select"
              value={form.destinationSiteId}
              onChange={(event) =>
                updateField(
                  "destinationSiteId",
                  event.target.value
                )
              }
              required
            >
              <option value="">Select site</option>
              {sites.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Warehouse *</label>
            <select
              className="form-select"
              value={form.destinationWarehouseId}
              onChange={(event) =>
                updateField(
                  "destinationWarehouseId",
                  event.target.value
                )
              }
              required
            >
              <option value="">Select warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="detail-section">
        <div className="section-header">
          <div>
            <h4>Transfer Materials</h4>
            <p className="text-muted">
              Only available inventory can be transferred.
            </p>
          </div>

          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={addLine}
          >
            + Add Material
          </button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>SKU</th>
                <th>Available</th>
                <th>Transfer Qty</th>
                <th>Unit</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {form.lines.map((line, index) => (
                <tr key={index}>
                  <td>
                    <select
                      className="form-select"
                      value={line.itemId}
                      onChange={(event) =>
                        handleItemChange(
                          index,
                          event.target.value
                        )
                      }
                      required
                    >
                      <option value="">Select material</option>

                      {items.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>{line.sku || "—"}</td>

                  <td>
                    <strong>{line.availableQuantity}</strong>
                  </td>

                  <td>
                    <input
                      type="number"
                      className="form-input"
                      min="0.01"
                      max={line.availableQuantity}
                      step="0.01"
                      value={line.quantity}
                      onChange={(event) =>
                        updateLine(
                          index,
                          "quantity",
                          event.target.value
                        )
                      }
                      required
                    />
                  </td>

                  <td>{line.unit || "—"}</td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-icon btn-danger"
                      onClick={() => removeLine(index)}
                      disabled={form.lines.length === 1}
                    >
                      ×
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="form-grid form-grid-2">
        <div className="form-group">
          <label>Priority</label>
          <select
            className="form-select"
            value={form.priority}
            onChange={(event) =>
              updateField("priority", event.target.value)
            }
          >
            {PRIORITIES.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Expected Receipt Date</label>
          <input
            type="date"
            className="form-input"
            value={form.expectedDate}
            onChange={(event) =>
              updateField("expectedDate", event.target.value)
            }
          />
        </div>
      </div>

      <div className="form-group">
        <label>Transfer Reason</label>
        <textarea
          className="form-textarea"
          rows={3}
          value={form.reason}
          onChange={(event) =>
            updateField("reason", event.target.value)
          }
          placeholder="Why is this material being transferred?"
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Transfer"}
        </button>
      </div>
    </form>
  );
}