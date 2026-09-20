// frontend/src/utils/status.js

/**
 * Centralized status constants and utility functions.
 *
 * Keep backend/frontend status values consistent.
 */

/* -------------------------------------------------------------------------- */
/* Inventory statuses                                                         */
/* -------------------------------------------------------------------------- */

export const INVENTORY_STATUS = Object.freeze({
  AVAILABLE: "AVAILABLE",
  RESERVED: "RESERVED",
  ALLOCATED: "ALLOCATED",
  IN_TRANSIT: "IN_TRANSIT",
  RECEIVED: "RECEIVED",
  ISSUED: "ISSUED",
  CONSUMED: "CONSUMED",
  RETURNED: "RETURNED",
  DAMAGED: "DAMAGED",
  UNDER_INSPECTION: "UNDER_INSPECTION",
  LOST: "LOST",
  SCRAPPED: "SCRAPPED",
  QUARANTINED: "QUARANTINED",
});

/* -------------------------------------------------------------------------- */
/* Transfer statuses                                                          */
/* -------------------------------------------------------------------------- */

export const TRANSFER_STATUS = Object.freeze({
  REQUESTED: "REQUESTED",
  APPROVED: "APPROVED",
  DISPATCHED: "DISPATCHED",
  IN_TRANSIT: "IN_TRANSIT",
  RECEIVED: "RECEIVED",
  CANCELLED: "CANCELLED",
  REJECTED: "REJECTED",
});

/* -------------------------------------------------------------------------- */
/* Material request statuses                                                  */
/* -------------------------------------------------------------------------- */

export const REQUEST_STATUS = Object.freeze({
  DRAFT: "DRAFT",
  SUBMITTED: "SUBMITTED",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  PARTIALLY_FULFILLED: "PARTIALLY_FULFILLED",
  FULFILLED: "FULFILLED",
  CANCELLED: "CANCELLED",
});

/* -------------------------------------------------------------------------- */
/* Purchase order statuses                                                    */
/* -------------------------------------------------------------------------- */

export const PURCHASE_ORDER_STATUS = Object.freeze({
  DRAFT: "DRAFT",
  PENDING_APPROVAL: "PENDING_APPROVAL",
  APPROVED: "APPROVED",
  SENT: "SENT",
  PARTIALLY_RECEIVED: "PARTIALLY_RECEIVED",
  RECEIVED: "RECEIVED",
  CANCELLED: "CANCELLED",
  CLOSED: "CLOSED",
});

/* -------------------------------------------------------------------------- */
/* Project statuses                                                           */
/* -------------------------------------------------------------------------- */

export const PROJECT_STATUS = Object.freeze({
  PLANNING: "PLANNING",
  ACTIVE: "ACTIVE",
  ON_HOLD: "ON_HOLD",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
});

/* -------------------------------------------------------------------------- */
/* Site statuses                                                              */
/* -------------------------------------------------------------------------- */

export const SITE_STATUS = Object.freeze({
  PLANNING: "PLANNING",
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
  COMPLETED: "COMPLETED",
  CLOSED: "CLOSED",
});

/* -------------------------------------------------------------------------- */
/* Status labels                                                              */
/* -------------------------------------------------------------------------- */

const STATUS_LABELS = Object.freeze({
  /* Inventory */
  AVAILABLE: "Available",
  RESERVED: "Reserved",
  ALLOCATED: "Allocated",
  IN_TRANSIT: "In Transit",
  RECEIVED: "Received",
  ISSUED: "Issued",
  CONSUMED: "Consumed",
  RETURNED: "Returned",
  DAMAGED: "Damaged",
  UNDER_INSPECTION: "Under Inspection",
  LOST: "Lost",
  SCRAPPED: "Scrapped",
  QUARANTINED: "Quarantined",

  /* Transfers */
  REQUESTED: "Requested",
  APPROVED: "Approved",
  DISPATCHED: "Dispatched",
  REJECTED: "Rejected",
  CANCELLED: "Cancelled",

  /* Requests */
  DRAFT: "Draft",
  SUBMITTED: "Submitted",
  PENDING_APPROVAL: "Pending Approval",
  PARTIALLY_FULFILLED: "Partially Fulfilled",
  FULFILLED: "Fulfilled",

  /* Purchase orders */
  SENT: "Sent",
  PARTIALLY_RECEIVED: "Partially Received",
  CLOSED: "Closed",

  /* Projects / Sites */
  PLANNING: "Planning",
  ACTIVE: "Active",
  ON_HOLD: "On Hold",
  COMPLETED: "Completed",
  INACTIVE: "Inactive",
});

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Normalize a status value.
 *
 * @param {unknown} status
 * @returns {string}
 */
function normalizeStatus(status) {
  if (status === null || status === undefined) {
    return "";
  }

  return String(status).trim().toUpperCase();
}

/**
 * Convert a status to a human-readable label.
 *
 * @param {unknown} status
 * @returns {string}
 */
export function getStatusLabel(status) {
  const normalized = normalizeStatus(status);

  if (!normalized) {
    return "-";
  }

  if (Object.prototype.hasOwnProperty.call(STATUS_LABELS, normalized)) {
    return STATUS_LABELS[normalized];
  }

  return normalized
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

/**
 * Get a CSS-friendly status class.
 *
 * Example:
 * AVAILABLE -> status-available
 *
 * @param {unknown} status
 * @returns {string}
 */
export function getStatusClass(status) {
  const normalized = normalizeStatus(status);

  if (!normalized) {
    return "status-default";
  }

  return `status-${normalized.toLowerCase().replace(/_/g, "-")}`;
}

/**
 * Check whether a status matches one of the supplied statuses.
 *
 * @param {unknown} status
 * @param {...unknown} statuses
 * @returns {boolean}
 */
export function isStatus(status, ...statuses) {
  const normalizedStatus = normalizeStatus(status);

  if (!normalizedStatus || statuses.length === 0) {
    return false;
  }

  return statuses.some(
    (value) => normalizeStatus(value) === normalizedStatus
  );
}

/* -------------------------------------------------------------------------- */
/* Inventory helpers                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Check whether inventory can be considered usable.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isUsableInventory(status) {
  return isStatus(
    status,
    INVENTORY_STATUS.AVAILABLE,
    INVENTORY_STATUS.RESERVED,
    INVENTORY_STATUS.ALLOCATED
  );
}

/**
 * Check whether inventory is unavailable for normal use.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isUnavailableInventory(status) {
  return isStatus(
    status,
    INVENTORY_STATUS.DAMAGED,
    INVENTORY_STATUS.LOST,
    INVENTORY_STATUS.SCRAPPED,
    INVENTORY_STATUS.QUARANTINED,
    INVENTORY_STATUS.UNDER_INSPECTION
  );
}

/* -------------------------------------------------------------------------- */
/* Transfer helpers                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Check whether a transfer has been completed.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isTransferCompleted(status) {
  return isStatus(status, TRANSFER_STATUS.RECEIVED);
}

/**
 * Check whether a transfer is currently in transit.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isTransferInTransit(status) {
  return isStatus(status, TRANSFER_STATUS.IN_TRANSIT);
}

/**
 * Check whether a transfer can be approved.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function canApproveTransfer(status) {
  return isStatus(status, TRANSFER_STATUS.REQUESTED);
}

/* -------------------------------------------------------------------------- */
/* Request helpers                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Check whether a material request can be approved.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function canApproveRequest(status) {
  return isStatus(
    status,
    REQUEST_STATUS.SUBMITTED,
    REQUEST_STATUS.PENDING_APPROVAL
  );
}

/**
 * Check whether a material request is completed.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isRequestCompleted(status) {
  return isStatus(status, REQUEST_STATUS.FULFILLED);
}

/**
 * Check whether a material request is editable.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isRequestEditable(status) {
  return isStatus(
    status,
    REQUEST_STATUS.DRAFT,
    REQUEST_STATUS.REJECTED
  );
}

/* -------------------------------------------------------------------------- */
/* Purchase order helpers                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Check whether a purchase order is editable.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isPurchaseOrderEditable(status) {
  return isStatus(
    status,
    PURCHASE_ORDER_STATUS.DRAFT,
    PURCHASE_ORDER_STATUS.PENDING_APPROVAL
  );
}

/**
 * Check whether a purchase order is completed.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isPurchaseOrderCompleted(status) {
  return isStatus(
    status,
    PURCHASE_ORDER_STATUS.RECEIVED,
    PURCHASE_ORDER_STATUS.CLOSED
  );
}

/* -------------------------------------------------------------------------- */
/* Project helpers                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Check whether a project is currently active.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isProjectActive(status) {
  return isStatus(status, PROJECT_STATUS.ACTIVE);
}

/**
 * Check whether a project is completed.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isProjectCompleted(status) {
  return isStatus(status, PROJECT_STATUS.COMPLETED);
}

/* -------------------------------------------------------------------------- */
/* Site helpers                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Check whether a site is currently active.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isSiteActive(status) {
  return isStatus(status, SITE_STATUS.ACTIVE);
}

/**
 * Check whether a site is closed.
 *
 * @param {unknown} status
 * @returns {boolean}
 */
export function isSiteClosed(status) {
  return isStatus(status, SITE_STATUS.CLOSED);
}