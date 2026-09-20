import React from "react";

const DEFAULT_NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⌂", path: "/" },
  { id: "inventory", label: "Inventory", icon: "▦", path: "/inventory" },
  { id: "projects", label: "Projects", icon: "▤", path: "/projects" },
  { id: "requests", label: "Requests", icon: "↗", path: "/requests" },
  { id: "transfers", label: "Transfers", icon: "⇄", path: "/transfers" },
  { id: "more", label: "More", icon: "•••", path: "/more" },
];

export default function MobileNav({
  items = DEFAULT_NAV_ITEMS,
  activeItem = "dashboard",
  onNavigate,
}) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map((item) => (
        <button
          type="button"
          key={item.id}
          className={`mobile-nav__item ${
            activeItem === item.id ? "is-active" : ""
          }`}
          onClick={() => onNavigate?.(item)}
        >
          <span className="mobile-nav__icon">{item.icon}</span>
          <span className="mobile-nav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}