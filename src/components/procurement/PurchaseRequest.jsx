import React, { useState } from "react";

const PRIORITY_OPTIONS = [
  { value: "LOW", label: "Low" },
  { value: "MEDIUM", label: "Medium" },
  { value: "HIGH", label: "High" },
  { value: "CRITICAL", label: "Critical" },
];

export default function PurchaseRequest({
  projects = [],
  items = [],
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    projectId: "",
    siteId: "",
    priority: "MEDIUM",
    requiredDate: "",
    justification: "",
  });

  const [lines, setLines] = useState([
    {
      itemId: "",
      quantity: "",
      unit: "",
      notes: "",
    },
  ]);

  const updateForm = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const updateLine = (index, key, value) => {
    setLines((current) =>
      current.map((line, lineIndex) =>
        lineIndex === index
          ? { ...line, [key]: value }
          : line
      )
    );
  };

  const addLine = () => {
    setLines((current) => [
      ...current,
      {
        itemId: "",
        quantity: "",
        unit: "",
        notes: "",
      },
    ]);
  };

  const removeLine = (index) => {
    if (lines.length === 1) return;

    setLines((current) =>
      current.filter((_, lineIndex) => lineIndex !== index)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validLines = lines
      .filter((line) => line.itemId && Number(line.quantity) > 0)
      .map((line) => ({
        ...line,
        quantity: Number(line.quantity),
      }));

    if (!form.projectId || validLines.length === 0) {
      return;
    }

    onSubmit?.({
      ...form,
      lines: validLines,
    });
  };

  return (
    <form className="card purchase-request" onSubmit={handleSubmit}>
      <div className="section-header">
        <div>
          <span className="page-header__eyebrow">
            Procurement
          </span>
          <h2>Create Purchase Request</h2>
          <p>
            Request materials that cannot be fulfilled through
            existing inventory or internal transfers.
          </p>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="purchase-project">
            Project
          </label>

          <select
            id="purchase-project"
            value={form.projectId}
            onChange={(event) =>
              updateForm("projectId", event.target.value)
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
          <label htmlFor="purchase-site">
            Site
          </label>

          <select
            id="purchase-site"
            value={form.siteId}
            onChange={(event) =>
              updateForm("siteId", event.target.value)
            }
          >
            <option value="">Select site</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="purchase-priority">
            Priority
          </label>

          <select
            id="purchase-priority"
            value={form.priority}
            onChange={(event) =>
              updateForm("priority", event.target.value)
            }
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="purchase-required-date">
            Required Date
          </label>

          <input
            id="purchase-required-date"
            type="date"
            value={form.requiredDate}
            onChange={(event) =>
              updateForm("requiredDate", event.target.value)
            }
          />
        </div>
      </div>

      <section className="purchase-request__items">
        <div className="section-header">
          <div>
            <h3>Requested Materials</h3>
            <p>Add all required materials to this request.</p>
          </div>

          <button
            type="button"
            className="btn btn-secondary"
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
                <th>Quantity</th>
                <th>Unit</th>
                <th>Notes</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {lines.map((line, index) => (
                <tr key={index}>
                  <td>
                    <select
                      value={line.itemId}
                      onChange={(event) =>
                        updateLine(
                          index,
                          "itemId",
                          event.target.value
                        )
                      }
                      required
                    >
                      <option value="">
                        Select material
                      </option>

                      {items.map((item) => (
                        <option
                          key={item.id}
                          value={item.id}
                        >
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td>
                    <input
                      type="number"
                      min="0"
                      step="any"
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

                  <td>
                    <input
                      type="text"
                      value={line.unit}
                      onChange={(event) =>
                        updateLine(
                          index,
                          "unit",
                          event.target.value
                        )
                      }
                      placeholder="kg / pcs / m³"
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      value={line.notes}
                      onChange={(event) =>
                        updateLine(
                          index,
                          "notes",
                          event.target.value
                        )
                      }
                      placeholder="Optional"
                    />
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-icon"
                      onClick={() => removeLine(index)}
                      disabled={lines.length === 1}
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
      </section>

      <div className="form-group">
        <label htmlFor="purchase-justification">
          Justification
        </label>

        <textarea
          id="purchase-justification"
          rows="4"
          value={form.justification}
          onChange={(event) =>
            updateForm("justification", event.target.value)
          }
          placeholder="Explain the project requirement..."
        />
      </div>

      <div className="form-actions">
        {onCancel && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        <button type="submit" className="btn btn-primary">
          Submit Purchase Request
        </button>
      </div>
    </form>
  );
}