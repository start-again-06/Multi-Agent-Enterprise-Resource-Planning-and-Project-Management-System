import React from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  actions,
  children,
}) {
  return (
    <header className="page-header">
      <div className="page-header__main">
        {breadcrumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={`${crumb.label}-${index}`}>
                {index > 0 && (
                  <span className="breadcrumbs__separator">/</span>
                )}

                {crumb.onClick ? (
                  <button
                    type="button"
                    onClick={crumb.onClick}
                    className="breadcrumbs__link"
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span
                    className={
                      index === breadcrumbs.length - 1
                        ? "breadcrumbs__current"
                        : ""
                    }
                  >
                    {crumb.label}
                  </span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {eyebrow && (
          <span className="page-header__eyebrow">{eyebrow}</span>
        )}

        <h1>{title}</h1>

        {description && <p>{description}</p>}

        {children}
      </div>

      {actions && (
        <div className="page-header__actions">
          {actions}
        </div>
      )}
    </header>
  );
}