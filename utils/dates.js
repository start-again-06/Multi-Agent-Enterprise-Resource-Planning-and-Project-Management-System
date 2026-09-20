// frontend/src/utils/dates.js

/**
 * Date utility functions
 */

const INVALID_DATE = "Invalid Date";

/**
 * Convert input to a Date object.
 *
 * @param {Date|string|number} value
 * @returns {Date|null}
 */
export function toDate(value) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? new Date(value) : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

/**
 * Format date as DD/MM/YYYY.
 *
 * @param {Date|string|number} value
 * @returns {string}
 */
export function formatDate(value) {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

/**
 * Format date as "20 Sep 2026".
 *
 * @param {Date|string|number} value
 * @returns {string}
 */
export function formatDateShort(value) {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Format date and time.
 *
 * @param {Date|string|number} value
 * @returns {string}
 */
export function formatDateTime(value) {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Format time only.
 *
 * @param {Date|string|number} value
 * @returns {string}
 */
export function formatTime(value) {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

/**
 * Convert date to YYYY-MM-DD.
 *
 * @param {Date|string|number} value
 * @returns {string}
 */
export function toISODate(value) {
  const date = toDate(value);

  if (!date) {
    return "";
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Check whether a date is today.
 *
 * @param {Date|string|number} value
 * @returns {boolean}
 */
export function isToday(value) {
  const date = toDate(value);

  if (!date) {
    return false;
  }

  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

/**
 * Check whether a date is in the past.
 *
 * @param {Date|string|number} value
 * @returns {boolean}
 */
export function isPast(value) {
  const date = toDate(value);

  if (!date) {
    return false;
  }

  return date.getTime() < Date.now();
}

/**
 * Check whether a date is in the future.
 *
 * @param {Date|string|number} value
 * @returns {boolean}
 */
export function isFuture(value) {
  const date = toDate(value);

  if (!date) {
    return false;
  }

  return date.getTime() > Date.now();
}

/**
 * Difference between two dates in days.
 *
 * @param {Date|string|number} start
 * @param {Date|string|number} end
 * @returns {number}
 */
export function daysBetween(start, end) {
  const startDate = toDate(start);
  const endDate = toDate(end);

  if (!startDate || !endDate) {
    return 0;
  }

  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  return Math.round(
    Math.abs(endDate.getTime() - startDate.getTime()) / millisecondsPerDay
  );
}

/**
 * Add days to a date.
 *
 * @param {Date|string|number} value
 * @param {number} days
 * @returns {Date|null}
 */
export function addDays(value, days) {
  const date = toDate(value);

  if (!date) {
    return null;
  }

  date.setDate(date.getDate() + Number(days || 0));

  return date;
}

/**
 * Get relative time.
 *
 * Example:
 * "2 days ago"
 * "in 3 hours"
 *
 * @param {Date|string|number} value
 * @returns {string}
 */
export function relativeTime(value) {
  const date = toDate(value);

  if (!date) {
    return "-";
  }

  const difference = date.getTime() - Date.now();
  const seconds = Math.round(Math.abs(difference) / 1000);

  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "week", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of units) {
    if (seconds >= unit.seconds) {
      const amount = Math.floor(seconds / unit.seconds);
      const label = `${amount} ${unit.name}${amount !== 1 ? "s" : ""}`;

      return difference < 0 ? `${label} ago` : `in ${label}`;
    }
  }

  return "just now";
}