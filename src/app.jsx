import React, { useState } from "react";

// Layout
import Sidebar from "./components/layout/sidebar";
import Topbar from "./components/layout/Topbar";
import MobileNav from "./components/layout/MobileNav";

// Dashboard
import KPIGrid from "./components/Dashboard/KPIGrid";
import InventoryNetwork from "./components/Dashboard/InventoryNetwork";
import MaterialReadiness from "./components/Dashboard/MaterialReadiness";
import OperationalSignals from "./components/Dashboard/OperationalSignals";
import RecentActivity from "./components/Dashboard/RecentActivity";

// Inventory
import InventoryTable from "./components/Inventory/InventoryTable";
import InventoryFilters from "./components/Inventory/InventoryFilters";
import BarcodeScanner from "./components/Inventory/BarcodeScanner";

// Requests
import RequestForm from "./components/requests/RequestForm";
import RequestTable from "./components/requests/RequestTable";
import RequestApproval from "./components/requests/RequestApproval";

// Transfers
import TransferForm from "./components/transfers/TransferForm";
import TransferTable from "./components/transfers/TransferTable";
import TransferTimeline from "./components/transfers/TransferTimeline";

// Reports
import InventoryValue from "./components/reports/InventoryValue";
import ReportMaterialReadiness from "./components/reports/MaterialReadiness";
import StockMovement from "./components/reports/StockMovement";

// AI
import AiCommandCenter from "./components/ai/AiCommandCenter";

// Styles
import "./styles/globals.css";
import "./styles/components.css";
import "./styles/responsive.css";

/* =========================================================
   DEMO DATA
   ========================================================= */

const DEMO_PROJECTS = [
  {
    id: "P001",
    name: "Chennai Data Center",
  },
  {
    id: "P002",
    name: "Bangalore Industrial Facility",
  },
  {
    id: "P003",
    name: "Calicut Infrastructure Project",
  },
];

const DEMO_SITES = [
  {
    id: "S001",
    name: "Chennai Site",
    projectId: "P001",
  },
  {
    id: "S002",
    name: "Bangalore Site",
    projectId: "P002",
  },
  {
    id: "S003",
    name: "Calicut Site",
    projectId: "P003",
  },
];

const DEMO_WAREHOUSES = [
  {
    id: "W001",
    name: "Chennai Main Warehouse",
    siteId: "S001",
  },
  {
    id: "W002",
    name: "Bangalore Site Warehouse",
    siteId: "S002",
  },
  {
    id: "W003",
    name: "Calicut Site Warehouse",
    siteId: "S003",
  },
];

const DEMO_ITEMS = [
  {
    id: "I001",
    name: "OPC 53 Grade Cement",
    sku: "CEM-OPC-53",
    barcode: "890100000001",
    unit: "Bags",
    availableQuantity: 2500,
    quantity: 2500,
    project: "Chennai Data Center",
    site: "Chennai Site",
    warehouse: "Chennai Main Warehouse",
    status: "AVAILABLE",
  },
  {
    id: "I002",
    name: "Rebar 16mm",
    sku: "REB-16",
    barcode: "890100000002",
    unit: "Nos",
    availableQuantity: 1800,
    quantity: 1800,
    project: "Bangalore Industrial Facility",
    site: "Bangalore Site",
    warehouse: "Bangalore Site Warehouse",
    status: "AVAILABLE",
  },
  {
    id: "I003",
    name: "Construction Sand",
    sku: "SND-001",
    barcode: "890100000003",
    unit: "Tonnes",
    availableQuantity: 125,
    quantity: 125,
    project: "Chennai Data Center",
    site: "Chennai Site",
    warehouse: "Chennai Main Warehouse",
    status: "RESERVED",
  },
];

const DEMO_REQUESTS = [
  {
    id: "REQ-001",
    requestNumber: "MR-2026-0001",
    projectName: "Chennai Data Center",
    siteName: "Chennai Site",
    requestedBy: "Site Manager",
    priority: "HIGH",
    requiredDate: "2026-09-25",
    status: "SUBMITTED",
    createdAt: "2026-09-20T09:30:00",
    justification: "Concrete work scheduled for next week.",
    lines: [
      {
        id: "RL-001",
        itemId: "I001",
        itemName: "OPC 53 Grade Cement",
        sku: "CEM-OPC-53",
        quantity: 500,
        unit: "Bags",
      },
    ],
  },
  {
    id: "REQ-002",
    requestNumber: "MR-2026-0002",
    projectName: "Bangalore Industrial Facility",
    siteName: "Bangalore Site",
    requestedBy: "Field Engineer",
    priority: "NORMAL",
    requiredDate: "2026-09-28",
    status: "APPROVED",
    createdAt: "2026-09-19T14:00:00",
    justification: "Structural work material requirement.",
    lines: [
      {
        id: "RL-002",
        itemId: "I002",
        itemName: "Rebar 16mm",
        sku: "REB-16",
        quantity: 300,
        unit: "Nos",
      },
    ],
  },
];

const DEMO_TRANSFERS = [
  {
    id: "TRF-001",
    transferNumber: "TRF-2026-0001",

    sourceProjectName: "Chennai Data Center",
    sourceSiteName: "Chennai Site",
    sourceWarehouseName: "Chennai Main Warehouse",

    destinationProjectName: "Bangalore Industrial Facility",
    destinationSiteName: "Bangalore Site",
    destinationWarehouseName: "Bangalore Site Warehouse",

    priority: "HIGH",
    status: "IN_TRANSIT",
    expectedDate: "2026-09-22",
    createdAt: "2026-09-19T10:00:00",

    lines: [
      {
        itemId: "I001",
        itemName: "OPC 53 Grade Cement",
        quantity: 400,
        unit: "Bags",
      },
    ],
  },
];

const DEMO_MOVEMENTS = [
  {
    id: "TXN-001",
    date: "2026-09-20T09:30:00",
    type: "RECEIPT",
    itemName: "OPC 53 Grade Cement",
    sku: "CEM-OPC-53",
    project: "Chennai Data Center",
    site: "Chennai Site",
    to: "Chennai Main Warehouse",
    quantity: 500,
    unit: "Bags",
    reference: "GRN-2026-0012",
    performedBy: "Storekeeper",
  },
  {
    id: "TXN-002",
    date: "2026-09-19T16:20:00",
    type: "TRANSFER",
    itemName: "Rebar 16mm",
    sku: "REB-16",
    project: "Bangalore Industrial Facility",
    site: "Bangalore Site",
    from: "Central Warehouse",
    to: "Bangalore Site Warehouse",
    quantity: 250,
    unit: "Nos",
    reference: "TRF-2026-0001",
    performedBy: "Warehouse Manager",
  },
  {
    id: "TXN-003",
    date: "2026-09-19T12:10:00",
    type: "ISSUE",
    itemName: "Construction Sand",
    sku: "SND-001",
    project: "Chennai Data Center",
    site: "Chennai Site",
    from: "Chennai Main Warehouse",
    to: "Execution Area",
    quantity: 20,
    unit: "Tonnes",
    reference: "ISS-2026-0041",
    performedBy: "Storekeeper",
  },
];

const DEMO_TIMELINE = [
  {
    status: "REQUESTED",
    timestamp: "2026-09-19T10:00:00",
    performedBy: "Site Manager",
    description: "Transfer request was created.",
  },
  {
    status: "APPROVED",
    timestamp: "2026-09-19T11:15:00",
    performedBy: "Project Manager",
    description: "Transfer approved for dispatch.",
  },
  {
    status: "DISPATCHED",
    timestamp: "2026-09-19T14:00:00",
    performedBy: "Warehouse Manager",
    description: "Materials dispatched from source warehouse.",
  },
  {
    status: "IN_TRANSIT",
    timestamp: "2026-09-19T15:30:00",
    performedBy: "Logistics",
    description: "Materials are currently in transit.",
  },
];

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard({ onNavigate }) {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Operations overview</span>

          <h1>Construction Inventory Control</h1>

          <p className="text-muted">
            Monitor materials, project readiness and inventory movement
            across all active sites.
          </p>
        </div>
      </div>

      <KPIGrid
        inventory={1842}
        projects={3}
        requests={12}
        transfers={7}
      />

      <div className="dashboard-grid">
        <InventoryNetwork
          locations={[
            {
              name: "Chennai Main Warehouse",
              stock: 2450,
              utilization: 78,
              status: "Operational",
            },
            {
              name: "Bangalore Site Warehouse",
              stock: 1820,
              utilization: 64,
              status: "Operational",
            },
            {
              name: "Calicut Site Warehouse",
              stock: 980,
              utilization: 52,
              status: "Operational",
            },
          ]}
        />

        <MaterialReadiness
          projects={[
            {
              name: "Chennai Data Center",
              site: "Chennai Site",
              required: 1200,
              available: 980,
              reserved: 120,
            },
            {
              name: "Bangalore Industrial Facility",
              site: "Bangalore Site",
              required: 950,
              available: 760,
              reserved: 100,
            },
            {
              name: "Calicut Infrastructure Project",
              site: "Calicut Site",
              required: 800,
              available: 760,
              reserved: 20,
            },
          ]}
          onProjectClick={(project) => {
            if (onNavigate) {
              onNavigate("projects", project);
            }
          }}
        />
      </div>

      <div className="dashboard-grid">
        <OperationalSignals
          signals={[
            {
              type: "warning",
              title: "Material shortage",
              description:
                "Chennai project requires additional cement.",
            },
            {
              type: "info",
              title: "Transfer in transit",
              description:
                "400 cement bags are moving to Bangalore.",
            },
            {
              type: "success",
              title: "Receipt completed",
              description:
                "Latest GRN has been successfully recorded.",
            },
          ]}
        />

        <RecentActivity
          activities={[
            {
              type: "receipt",
              title: "Material received",
              description: "500 cement bags received.",
              time: "20 min ago",
            },
            {
              type: "transfer",
              title: "Transfer dispatched",
              description: "TRF-2026-0001 dispatched.",
              time: "2 hrs ago",
            },
            {
              type: "request",
              title: "Material request submitted",
              description: "MR-2026-0001 requires approval.",
              time: "4 hrs ago",
            },
          ]}
        />
      </div>
    </div>
  );
}

/* =========================================================
   INVENTORY
   ========================================================= */

function InventoryPage() {
  const [showScanner, setShowScanner] = useState(false);

  const handleScan = (barcode) => {
    console.log("Scanned barcode:", barcode);
    setShowScanner(false);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Inventory</span>

          <h1>Inventory Control</h1>

          <p className="text-muted">
            Track material quantities and locations across the network.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowScanner(true)}
        >
          Scan Barcode
        </button>
      </div>

      <InventoryFilters />

      {showScanner && (
        <BarcodeScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      <InventoryTable items={DEMO_ITEMS} />
    </div>
  );
}

/* =========================================================
   REQUESTS
   ========================================================= */

function RequestsPage() {
  const [view, setView] = useState("table");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleApprove = (payload) => {
    console.log("Approve request:", payload);
    setSelectedRequest(null);
  };

  const handleReject = (payload) => {
    console.log("Reject request:", payload);
    setSelectedRequest(null);
  };

  if (view === "create") {
    return (
      <div className="page-content">
        <RequestForm
          projects={DEMO_PROJECTS}
          sites={DEMO_SITES}
          items={DEMO_ITEMS}
          onSubmit={(data) => {
            console.log("Create request:", data);
            setView("table");
          }}
          onCancel={() => setView("table")}
        />
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Materials</span>

          <h1>Material Requests</h1>

          <p className="text-muted">
            Review and manage material requirements from project sites.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setView("create")}
        >
          + New Request
        </button>
      </div>

      <RequestTable
        requests={DEMO_REQUESTS}
        onView={(request) => setSelectedRequest(request)}
        onApprove={(request) => setSelectedRequest(request)}
        onReject={(request) => setSelectedRequest(request)}
      />

      {selectedRequest && (
        <RequestApproval
          request={selectedRequest}
          onApprove={handleApprove}
          onReject={handleReject}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
}

/* =========================================================
   TRANSFERS
   ========================================================= */

function TransfersPage() {
  const [view, setView] = useState("table");
  const [selectedTransfer, setSelectedTransfer] = useState(
    DEMO_TRANSFERS[0]
  );

  if (view === "create") {
    return (
      <div className="page-content">
        <TransferForm
          projects={DEMO_PROJECTS}
          sites={DEMO_SITES}
          warehouses={DEMO_WAREHOUSES}
          items={DEMO_ITEMS}
          onSubmit={(data) => {
            console.log("Create transfer:", data);
            setView("table");
          }}
          onCancel={() => setView("table")}
        />
      </div>
    );
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Logistics</span>

          <h1>Inventory Transfers</h1>

          <p className="text-muted">
            Move materials between project sites and warehouses.
          </p>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setView("create")}
        >
          + New Transfer
        </button>
      </div>

      <TransferTable
        transfers={DEMO_TRANSFERS}
        onView={(transfer) => setSelectedTransfer(transfer)}
        onApprove={(transfer) =>
          console.log("Approve transfer:", transfer)
        }
        onDispatch={(transfer) =>
          console.log("Dispatch transfer:", transfer)
        }
        onReceive={(transfer) =>
          console.log("Receive transfer:", transfer)
        }
        onCancel={(transfer) =>
          console.log("Cancel transfer:", transfer)
        }
      />

      {selectedTransfer && (
        <TransferTimeline
          transfer={selectedTransfer}
          events={DEMO_TIMELINE}
        />
      )}
    </div>
  );
}

/* =========================================================
   REPORTS
   ========================================================= */

function ReportsPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Analytics</span>

          <h1>Reports</h1>

          <p className="text-muted">
            Inventory valuation, material readiness and stock movement.
          </p>
        </div>
      </div>

      <InventoryValue
        totalValue={48500000}
        availableValue={32100000}
        reservedValue={7200000}
        inTransitValue={6100000}
        damagedValue={3100000}
        itemCount={1842}
      />

      <ReportMaterialReadiness
        projects={[
          {
            id: "P001",
            name: "Chennai Data Center",
            site: "Chennai Site",
            required: 1200,
            available: 980,
            reserved: 120,
          },
          {
            id: "P002",
            name: "Bangalore Industrial Facility",
            site: "Bangalore Site",
            required: 950,
            available: 760,
            reserved: 100,
          },
          {
            id: "P003",
            name: "Calicut Infrastructure Project",
            site: "Calicut Site",
            required: 800,
            available: 760,
            reserved: 20,
          },
        ]}
      />

      <StockMovement movements={DEMO_MOVEMENTS} />
    </div>
  );
}

/* =========================================================
   AI COMMAND CENTER
   ========================================================= */

function AIPage() {
  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">Intelligence</span>

          <h1>AI Command Center</h1>

          <p className="text-muted">
            Inventory, procurement, logistics and project intelligence.
          </p>
        </div>
      </div>

      <AiCommandCenter />
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigate = (page) => {
    if (!page) {
      return;
    }

    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case "inventory":
        return <InventoryPage />;

      case "requests":
        return <RequestsPage />;

      case "transfers":
        return <TransfersPage />;

      case "reports":
        return <ReportsPage />;

      case "ai":
        return <AIPage />;

      case "projects":
        return <Dashboard onNavigate={handleNavigate} />;

      case "dashboard":
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div
      className={`app-shell ${
        sidebarCollapsed ? "sidebar-collapsed" : ""
      }`}
    >
      <Sidebar
        collapsed={sidebarCollapsed}
        activeItem={activePage}
        onNavigate={handleNavigate}
        onCollapse={() =>
          setSidebarCollapsed((current) => !current)
        }
      />

      <div className="app-main">
        <Topbar
          onMenuClick={() =>
            setSidebarCollapsed((current) => !current)
          }
          onNavigate={handleNavigate}
        />

        <main>{renderPage()}</main>
      </div>

      <MobileNav
        activeItem={activePage}
        onNavigate={handleNavigate}
      />
    </div>
  );
}