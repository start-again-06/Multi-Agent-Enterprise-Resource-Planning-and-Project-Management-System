import React from "react";

const DEFAULT_LOCATIONS = [
  {
    id: "chennai",
    name: "Chennai Central Warehouse",
    type: "Warehouse",
    stock: 1248,
    utilization: 78,
    status: "healthy",
  },
  {
    id: "bangalore",
    name: "Bangalore Site",
    type: "Project Site",
    stock: 486,
    utilization: 64,
    status: "healthy",
  },
  {
    id: "calicut",
    name: "Calicut Site",
    type: "Project Site",
    stock: 312,
    utilization: 48,
    status: "warning",
  },
  {
    id: "hyderabad",
    name: "Hyderabad Site",
    type: "Project Site",
    stock: 218,
    utilization: 39,
    status: "healthy",
  },
];

export default function InventoryNetwork({
  locations = DEFAULT_LOCATIONS,
  onLocationClick,
}) {
  return (
    <section className="card inventory-network">
      <div className="section-header">
        <div>
          <span className="page-header__eyebrow">Inventory Network</span>
          <h2>Material Distribution</h2>
          <p>Current inventory across warehouses and project sites.</p>
        </div>

        <button type="button" className="btn btn-secondary">
          View Network
        </button>
      </div>

      <div className="inventory-network__body">
        <div className="inventory-network__summary">
          <div>
            <span>Total Locations</span>
            <strong>{locations.length}</strong>
          </div>

          <div>
            <span>Stock Units</span>
            <strong>
              {locations
                .reduce((total, location) => total + location.stock, 0)
                .toLocaleString()}
            </strong>
          </div>
        </div>

        <div className="inventory-network__locations">
          {locations.map((location) => (
            <button
              type="button"
              className={`inventory-location inventory-location--${location.status}`}
              key={location.id}
              onClick={() => onLocationClick?.(location)}
            >
              <div className="inventory-location__header">
                <div>
                  <strong>{location.name}</strong>
                  <span>{location.type}</span>
                </div>

                <span className="status-dot" />
              </div>

              <div className="inventory-location__metrics">
                <div>
                  <span>Stock</span>
                  <strong>{location.stock.toLocaleString()}</strong>
                </div>

                <div>
                  <span>Utilization</span>
                  <strong>{location.utilization}%</strong>
                </div>
              </div>

              <div className="progress">
                <div
                  className="progress__bar"
                  style={{ width: `${location.utilization}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}