import React from "react";

export default function TransferOpportunities({
  opportunities = [],
  onTransfer,
  onDismiss,
}) {
  return (
    <section className="card transfer-opportunities">
      <div className="section-header">
        <div>
          <span className="page-header__eyebrow">
            Inventory Optimization
          </span>

          <h2>Transfer Opportunities</h2>

          <p>
            Existing inventory that could satisfy material
            requirements before external procurement.
          </p>
        </div>
      </div>

      {opportunities.length === 0 ? (
        <div className="empty-state">
          <h3>No transfer opportunities</h3>
          <p>
            No suitable internal inventory has been identified.
          </p>
        </div>
      ) : (
        <div className="transfer-opportunities__list">
          {opportunities.map((opportunity) => (
            <article
              className="transfer-opportunity"
              key={opportunity.id}
            >
              <div className="transfer-opportunity__header">
                <div>
                  <span className="page-header__eyebrow">
                    Internal Transfer
                  </span>

                  <h3>{opportunity.itemName}</h3>
                </div>

                <span className="status-badge status-success">
                  Available
                </span>
              </div>

              <div className="transfer-opportunity__route">
                <div className="transfer-location">
                  <span>Source</span>
                  <strong>
                    {opportunity.sourceLocation}
                  </strong>

                  {opportunity.sourceAvailable !==
                    undefined && (
                    <small>
                      {Number(
                        opportunity.sourceAvailable
                      ).toLocaleString()}{" "}
                      available
                    </small>
                  )}
                </div>

                <div className="transfer-route-arrow">
                  →
                </div>

                <div className="transfer-location">
                  <span>Destination</span>
                  <strong>
                    {opportunity.destinationLocation}
                  </strong>

                  {opportunity.requiredQuantity !==
                    undefined && (
                    <small>
                      {Number(
                        opportunity.requiredQuantity
                      ).toLocaleString()}{" "}
                      required
                    </small>
                  )}
                </div>
              </div>

              <div className="transfer-opportunity__metrics">
                <div>
                  <span>Transfer Quantity</span>
                  <strong>
                    {Number(
                      opportunity.transferQuantity || 0
                    ).toLocaleString()}{" "}
                    {opportunity.unit || ""}
                  </strong>
                </div>

                {opportunity.estimatedSavings !==
                  undefined && (
                  <div>
                    <span>Estimated Purchase Avoidance</span>
                    <strong>
                      {opportunity.estimatedSavings}
                    </strong>
                  </div>
                )}

                {opportunity.distance !== undefined && (
                  <div>
                    <span>Distance</span>
                    <strong>{opportunity.distance}</strong>
                  </div>
                )}
              </div>

              {opportunity.reason && (
                <div className="alert alert-info">
                  {opportunity.reason}
                </div>
              )}

              <div className="transfer-opportunity__actions">
                {onDismiss && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() =>
                      onDismiss(opportunity)
                    }
                  >
                    Dismiss
                  </button>
                )}

                {onTransfer && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      onTransfer(opportunity)
                    }
                  >
                    Create Transfer
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}