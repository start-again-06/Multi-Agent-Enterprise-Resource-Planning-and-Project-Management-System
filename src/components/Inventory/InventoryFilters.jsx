import React from "react";

const DEFAULT_FILTERS = {
  search: "",
  projectId: "",
  siteId: "",
  warehouseId: "",
  status: "",
  category: "",
};

export default function InventoryFilters({
  filters = DEFAULT_FILTERS,
  onChange,
  onReset,
  projects = [],
  sites = [],
  warehouses = [],
  categories = [],
}) {
  const update = (key, value) => {
    onChange?.({
      ...filters,
      [key]: value,
    });
  };

  return (
    <section className="inventory-filters card">
      <div className="inventory-filters__header">
        <div>
          <h3>Inventory Filters</h3>
          <p>Filter inventory by project, location and status.</p>
        </div>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => onReset?.()}
        >
          Reset
        </button>
      </div>

      <div className="inventory-filters__grid">
        <div className="form-group">
          <label htmlFor="inventory-search">Search</label>
          <input
            id="inventory-search"
            type="search"
            value={filters.search || ""}
            onChange={(event) => update("search", event.target.value)}
            placeholder="Item, SKU or barcode..."
          />
        </div>

        <div className="form-group">
          <label htmlFor="inventory-project">Project</label>
          <select
            id="inventory-project"
            value={filters.projectId || ""}
            onChange={(event) => update("projectId", event.target.value)}
          >
            <option value="">All Projects</option>

            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inventory-site">Site</label>
          <select
            id="inventory-site"
            value={filters.siteId || ""}
            onChange={(event) => update("siteId", event.target.value)}
          >
            <option value="">All Sites</option>

            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inventory-warehouse">Warehouse</label>
          <select
            id="inventory-warehouse"
            value={filters.warehouseId || ""}
            onChange={(event) =>
              update("warehouseId", event.target.value)
            }
          >
            <option value="">All Warehouses</option>

            {warehouses.map((warehouse) => (
              <option key={warehouse.id} value={warehouse.id}>
                {warehouse.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inventory-category">Category</label>
          <select
            id="inventory-category"
            value={filters.category || ""}
            onChange={(event) => update("category", event.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="inventory-status">Status</label>
          <select
            id="inventory-status"
            value={filters.status || ""}
            onChange={(event) => update("status", event.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="RESERVED">Reserved</option>
            <option value="ALLOCATED">Allocated</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="DAMAGED">Damaged</option>
            <option value="UNDER_INSPECTION">Under Inspection</option>
            <option value="QUARANTINED">Quarantined</option>
            <option value="LOST">Lost</option>
            <option value="SCRAPPED">Scrapped</option>
          </select>
        </div>
      </div>
    </section>
  );
}