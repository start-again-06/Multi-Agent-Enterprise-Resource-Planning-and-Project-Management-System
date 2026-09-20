import React from "react";

export const TRANSFER_STATUSES = {
  DRAFT: "DRAFT",
  REQUESTED: "REQUESTED",
  APPROVED: "APPROVED",
  DISPATCHED: "DISPATCHED",
  IN_TRANSIT: "IN_TRANSIT",
  RECEIVED: "RECEIVED",
  CANCELLED: "CANCELLED",
  REJECTED: "REJECTED",
};

const STATUS_LABELS = {
  DRAFT: "Draft",
  REQUESTED: "Requested",
  APPROVED: "Approved",
  DISPATCHED: "Dispatched",
  IN_TRANSIT: "In Transit",
  RECEIVED: "Received",
  CANCELLED: "Cancelled",
  REJECTED: "Rejected",
};

const STATUS_CLASSES = {
  DRAFT: "status-neutral",
  REQUESTED: "status-info",
  APPROVED: "status-success",
  DISPATCHED: "status-warning",
  IN_TRANSIT: "status-info",
  RECEIVED: "status-success",
  CANCELLED: "status-neutral",
  REJECTED: "status-danger",
};

export function getTransferStatusLabel(status) {
  return (
    STATUS_LABELS[status] ||
    status
      ?.replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (character) => character.toUpperCase()) ||
    "Unknown"
  );
}

export function getTransferStatusClass(status) {
  return STATUS_CLASSES[status] || "status-neutral";
}

export default function TransferStatus({
  status,
  compact = false,
}) {
  return (
    <span
      className={`status-badge ${
        getTransferStatusClass(status)
      } ${compact ? "status-compact" : ""}`}
    >
      {getTransferStatusLabel(status)}
    </span>
  );
}