import React, { useState } from "react";

const DEFAULT_NAVIGATION = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "⌂",
    path: "/",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "▤",
    path: "/projects",
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: "▦",
    path: "/inventory",
  },
  {
    id: "requests",
    label: "Material Requests",
    icon: "↗",
    path: "/requests",
  },
  {
    id: "transfers",
    label: "Transfers",
    icon: "⇄",
    path: "/transfers",
  },
  {
    id: "procurement",
    label: "Procurement",
    icon: "🛒",
    path: "/procurement",
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: "♙",
    path: "/vendors",
  },
  {
    id: "reports",
    label: "Reports",
    icon: "▥",
    path: "/reports",
  },
  {
    id: "ai",
    label: "AI Command Center",
    icon: "✦",
    path: "/ai",
  },
];

const DEFAULT_SECONDARY = [
  {
    id: "notifications",
    label: "Notifications",
    icon: "◉",
    path: "/notifications",
  },
  {
    id: "audit",
    label: "Audit Trail",
    icon: "✓",
    path: "/audit",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "⚙",
    path: "/settings",
  },
];

export default function Sidebar({
  activeItem = "dashboard",
  navigation = DEFAULT_NAVIGATION,
  secondaryNavigation = DEFAULT_SECONDARY,
  collapsed = false,
  onNavigate,
  onToggle,
  user,
}) {
  const [openGroups, setOpenGroups] = useState({});

  const handleNavigation = (item) => {
    onNavigate?.(item);
  };

  const toggleGroup = (id) => {
    setOpenGroups((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <aside
      className={`sidebar ${
        collapsed ? "sidebar--collapsed" : ""
      }`}
    >
      <div className="sidebar__header">
        <button
          type="button"
          className="sidebar__brand"
          onClick={() =>
            onNavigate?.({
              id: "dashboard",
              path: "/",
            })
          }
          aria-label="Go to dashboard"
        >
          <span className="sidebar__logo">C</span>

          {!collapsed && (
            <span className="sidebar__brand-text">
              Construction
              <small>Inventory OS</small>
            </span>
          )}
        </button>

        <button
          type="button"
          className="sidebar__toggle"
          onClick={onToggle}
          aria-label={
            collapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav className="sidebar__navigation" aria-label="Main navigation">
        <div className="sidebar__section">
          {!collapsed && (
            <span className="sidebar__section-title">
              Operations
            </span>
          )}

          {navigation.map((item) => {
            const hasChildren =
              Array.isArray(item.children) &&
              item.children.length > 0;

            return (
              <React.Fragment key={item.id}>
                <button
                  type="button"
                  className={`sidebar__item ${
                    activeItem === item.id ||
                    item.children?.some(
                      (child) => child.id === activeItem
                    )
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    hasChildren
                      ? toggleGroup(item.id)
                      : handleNavigation(item)
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <span className="sidebar__item-icon">
                    {item.icon}
                  </span>

                  {!collapsed && (
                    <>
                      <span className="sidebar__item-label">
                        {item.label}
                      </span>

                      {hasChildren && (
                        <span className="sidebar__item-arrow">
                          {openGroups[item.id] ? "⌃" : "⌄"}
                        </span>
                      )}
                    </>
                  )}
                </button>

                {hasChildren &&
                  openGroups[item.id] &&
                  !collapsed && (
                    <div className="sidebar__submenu">
                      {item.children.map((child) => (
                        <button
                          type="button"
                          key={child.id}
                          className={`sidebar__submenu-item ${
                            activeItem === child.id
                              ? "is-active"
                              : ""
                          }`}
                          onClick={() =>
                            handleNavigation(child)
                          }
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="sidebar__section sidebar__section--secondary">
          {!collapsed && (
            <span className="sidebar__section-title">
              System
            </span>
          )}

          {secondaryNavigation.map((item) => (
            <button
              type="button"
              key={item.id}
              className={`sidebar__item ${
                activeItem === item.id ? "is-active" : ""
              }`}
              onClick={() => handleNavigation(item)}
              title={collapsed ? item.label : undefined}
            >
              <span className="sidebar__item-icon">
                {item.icon}
              </span>

              {!collapsed && (
                <span className="sidebar__item-label">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <div className="sidebar__avatar">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </div>

          {!collapsed && (
            <div className="sidebar__user-info">
              <strong>{user?.name || "User"}</strong>
              <span>{user?.role || "Operations User"}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}