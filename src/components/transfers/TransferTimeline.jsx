import React from "react";
import TransferStatus from "./TransferStatus";

const TIMELINE_STEPS = [
  {
    status: "REQUESTED",
    label: "Transfer Requested",
    description: "Transfer request was created.",
  },
  {
    status: "APPROVED",
    label: "Approved",
    description: "Transfer was approved for dispatch.",
  },
  {
    status: "DISPATCHED",
    label: "Dispatched",
    description: "Materials left the source location.",
  },
  {
    status: "IN_TRANSIT",
    label: "In Transit",
    description: "Materials are moving to the destination.",
  },
  {
    status: "RECEIVED",
    label: "Received",
    description: "Destination confirmed receipt.",
  },
];

const STATUS_ORDER = {
  REQUESTED: 1,
  APPROVED: 2,
  DISPATCHED: 3,
  IN_TRANSIT: 4,
  RECEIVED: 5,
};

const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function TransferTimeline({
  transfer,
  events = [],
}) {
  if (!transfer) {
    return (
      <div className="empty-state">
        <strong>No transfer selected</strong>
        <span>Select a transfer to view its timeline.</span>
      </div>
    );
  }

  const currentStatus = transfer.status;
  const currentOrder = STATUS_ORDER[currentStatus] || 0;

  const eventMap = events.reduce((map, event) => {
    map[event.status] = event;
    return map;
  }, {});

  return (
    <section className="card transfer-timeline">
      <div className="card-header">
        <div>
          <span className="eyebrow">Transfer tracking</span>
          <h3>
            {transfer.transferNumber || transfer.id}
          </h3>
          <p className="text-muted">
            {transfer.sourceSiteName ||
              transfer.sourceSite ||
              "Source"}{" "}
            →{" "}
            {transfer.destinationSiteName ||
              transfer.destinationSite ||
              "Destination"}
          </p>
        </div>

        <TransferStatus status={currentStatus} />
      </div>

      <div className="timeline">
        {TIMELINE_STEPS.map((step) => {
          const stepOrder = STATUS_ORDER[step.status];
          const event = eventMap[step.status];

          const completed = currentOrder >= stepOrder;
          const current = currentStatus === step.status;

          return (
            <div
              key={step.status}
              className={`timeline-item ${
                completed ? "is-completed" : ""
              } ${current ? "is-current" : ""}`}
            >
              <div className="timeline-marker">
                {completed ? "✓" : stepOrder}
              </div>

              <div className="timeline-content">
                <div className="timeline-title">
                  <strong>{step.label}</strong>

                  {event?.timestamp && (
                    <span className="timeline-date">
                      {formatDate(event.timestamp)}
                    </span>
                  )}
                </div>

                <p>{event?.description || step.description}</p>

                {event?.performedBy && (
                  <span className="table-subtext">
                    By {event.performedBy}
                  </span>
                )}

                {event?.location && (
                  <span className="table-subtext">
                    Location: {event.location}
                  </span>
                )}

                {event?.reference && (
                  <span className="table-subtext">
                    Reference: {event.reference}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {(currentStatus === "CANCELLED" ||
          currentStatus === "REJECTED") && (
          <div className="timeline-item is-error">
            <div className="timeline-marker">!</div>

            <div className="timeline-content">
              <div className="timeline-title">
                <strong>
                  {currentStatus === "CANCELLED"
                    ? "Transfer Cancelled"
                    : "Transfer Rejected"}
                </strong>

                {transfer.cancelledAt && (
                  <span className="timeline-date">
                    {formatDate(transfer.cancelledAt)}
                  </span>
                )}
              </div>

              <p>
                {transfer.cancellationReason ||
                  transfer.rejectionReason ||
                  "No reason provided."}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}