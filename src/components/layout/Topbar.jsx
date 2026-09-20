import React, { useState } from "react";

export default function Topbar({
  user,
  onMenuClick,
  onSearch,
  onNotifications,
  onProfile,
  notificationCount = 0,
}) {
  const [search, setSearch] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch?.(search.trim());
  };

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="topbar__menu"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          ☰
        </button>

        <form
          className="topbar__search"
          onSubmit={handleSubmit}
        >
          <span className="topbar__search-icon">⌕</span>

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search inventory, projects, transfers..."
            aria-label="Global search"
          />

          {search && (
            <button
              type="button"
              className="topbar__search-clear"
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>
      </div>

      <div className="topbar__right">
        <button
          type="button"
          className="topbar__icon-button"
          onClick={onNotifications}
          aria-label="Notifications"
        >
          ◉

          {notificationCount > 0 && (
            <span className="topbar__notification-badge">
              {notificationCount > 99
                ? "99+"
                : notificationCount}
            </span>
          )}
        </button>

        <div className="topbar__divider" />

        <button
          type="button"
          className="topbar__profile"
          onClick={onProfile}
        >
          <span className="topbar__avatar">
            {(user?.name || "U").charAt(0).toUpperCase()}
          </span>

          <span className="topbar__profile-info">
            <strong>{user?.name || "User"}</strong>
            <small>{user?.role || "Operations User"}</small>
          </span>

          <span className="topbar__profile-arrow">
            ⌄
          </span>
        </button>
      </div>
    </header>
  );
}