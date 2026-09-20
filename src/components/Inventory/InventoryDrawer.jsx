import React from "react";
import InventoryStatus from "./InventoryStatus";

export default function InventoryDrawer({
  item,
  open = false,
  onClose,
  onAction,
}) {
  if (!open || !item) {
    return null;
  }

  const action = (type) => {
    onAction?.(type, item);
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside
        className="drawer inventory-drawer"
        onClick={(event) => event.stopPropagation()}
        aria-label="Inventory details"
      >
        <div className="drawer__header">
          <div>
            <span className="page-header__eyebrow">
              Inventory Details
            </span>
            <h2>{item.name}</h2>
          </div>

          <button
            type="button"
            className="btn btn-icon"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="drawer__body">
          <div className="inventory-drawer__status">
            <InventoryStatus
              status={item.status}
              quantity={item.quantity}
              showQuantity
            />
          </div>

          <section className="drawer-section">
            <h3>Item Information</h3>

            <dl className="details-list">
              <div>
                <dt>SKU</dt>
                <dd>{item.sku || "—"}</dd>
              </div>

              <div>
                <dt>Barcode</dt>
                <dd>{item.barcode || "—"}</dd>
              </div>

              <div>
                <dt>Category</dt>
                <dd>{item.category || "—"}</dd>
              </div>

              <div>
                <dt>Unit</dt>
                <dd>{item.unit || "—"}</dd>
              </div>
            </dl>
          </section>

          <section className="drawer-section">
            <h3>Location</h3>

            <dl className="details-list">
              <div>
                <dt>Project</dt>
                <dd>{item.projectName || "—"}</dd>
              </div>

              <div>
                <dt>Site</dt>
                <dd>{item.siteName || "—"}</dd>
              </div>

              <div>
                <dt>Warehouse</dt>
                <dd>{item.warehouseName || "—"}</dd>
              </div>

              <div>
                <dt>Bin</dt>
                <dd>{item.binName || "—"}</dd>
              </div>
            </dl>
          </section>

          <section className="drawer-section">
            <h3>Stock</h3>

            <div className="inventory-drawer__stock-grid">
              <div>
                <span>Available</span>
                <strong>{item.available ?? 0}</strong>
              </div>

              <div>
                <span>Reserved</span>
                <strong>{item.reserved ?? 0}</strong>
              </div>

              <div>
                <span>In Transit</span>
                <strong>{item.inTransit ?? 0}</strong>
              </div>

              <div>
                <span>Damaged</span>
                <strong>{item.damaged ?? 0}</strong>
              </div>
            </div>
          </section>
        </div>

        <div className="drawer__footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => action("TRANSFER")}
          >
            Transfer
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => action("ISSUE")}
          >
            Issue
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => action("VIEW_LEDGER")}
          >
            View Ledger
          </button>
        </div>
      </aside>
    </div>
  );
}