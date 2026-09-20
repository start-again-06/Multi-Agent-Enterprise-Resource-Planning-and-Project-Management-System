import React, { useState } from "react";

const INITIAL_FORM = {
  projectId: "",
  siteId: "",
  priority: "NORMAL",
  requiredDate: "",
  justification: "",
  lines: [
    {
      itemId: "",
      itemName: "",
      sku: "",
      quantity: 1,
      unit: "",
    },
  ],
};

const PRIORITIES = ["LOW", "NORMAL", "HIGH", "URGENT"];

export default function RequestForm({
  projects = [],
  sites = [],
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
          ? {
              ...line,
              [field]: value,
            }
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
      updateLine(index, "unit", item.unit || "");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validLines = form.lines.filter(
      (line) =>
        line.itemId &&
        Number(line.quantity) > 0
    );

    if (!form.projectId || !form.siteId || validLines.length === 0) {
      return;
    }

    await onSubmit?.({
      projectId: form.projectId,
      siteId: form.siteId,
      priority: form.priority,
      requiredDate: form.requiredDate,
      justification: form.justification.trim(),
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
          <span className="eyebrow">Material requirement</span>
          <h3>Create Material Request</h3>
          <p className="text-muted">
            Request materials for a project site.
          </p>
        </div>
      </div>

      <div className="form-grid form-grid-2">
        <div className="form-group">
          <label htmlFor="request-project">Project *</label>

          <select
            id="request-project"
            className="form-select"
            value={form.projectId}
            onChange={(event) =>
              updateField("projectId", event.target.value)
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
          <label htmlFor="request-site">Site *</label>

          <select
            id="request-site"
            className="form-select"
            value={form.siteId}
            onChange={(event) =>
              updateField("siteId", event.target.value)
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
          <label htmlFor="request-priority">Priority</label>

          <select
            id="request-priority"
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
          <label htmlFor="request-date">Required Date</label>

          <input
            id="request-date"
            type="date"
            className="form-input"
            value={form.requiredDate}
            onChange={(event) =>
              updateField("requiredDate", event.target.value)
            }
          />
        </div>
      </div>

      <div className="detail-section">
        <div className="section-header">
          <div>
            <h4>Material Lines</h4>
            <p className="text-muted">
              Add every material required at the site.
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
                <th>Quantity</th>
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
                        handleItemChange(index, event.target.value)
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
                    <input
                      type="number"
                      className="form-input"
                      min="0.01"
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
                      aria-label="Remove material"
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

      <div className="form-group">
        <label htmlFor="request-justification">
          Justification
        </label>

        <textarea
          id="request-justification"
          className="form-textarea"
          rows={4}
          value={form.justification}
          onChange={(event) =>
            updateField("justification", event.target.value)
          }
          placeholder="Explain why these materials are required..."
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
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}