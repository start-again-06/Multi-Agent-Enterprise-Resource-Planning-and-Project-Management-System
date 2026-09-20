// frontend/src/utils/currency.js

/**
 * Currency utility functions
 */

export const DEFAULT_CURRENCY = "INR";
export const DEFAULT_LOCALE = "en-IN";

/**
 * Format a number as currency.
 *
 * @param {number|string|null|undefined} amount
 * @param {string} currency
 * @param {string} locale
 * @returns {string}
 */
export function formatCurrency(
  amount,
  currency = DEFAULT_CURRENCY,
  locale = DEFAULT_LOCALE
) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return formatCurrency(0, currency, locale);
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format INR specifically.
 *
 * @param {number|string|null|undefined} amount
 * @returns {string}
 */
export function formatINR(amount) {
  return formatCurrency(amount, "INR", "en-IN");
}

/**
 * Format USD specifically.
 *
 * @param {number|string|null|undefined} amount
 * @returns {string}
 */
export function formatUSD(amount) {
  return formatCurrency(amount, "USD", "en-US");
}

/**
 * Format a number without a currency symbol.
 *
 * @param {number|string|null|undefined} amount
 * @param {string} locale
 * @param {number} maximumFractionDigits
 * @returns {string}
 */
export function formatNumber(
  amount,
  locale = DEFAULT_LOCALE,
  maximumFractionDigits = 2
) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat(locale, {
    maximumFractionDigits,
  }).format(value);
}

/**
 * Convert a value into a safe numeric amount.
 *
 * @param {unknown} value
 * @returns {number}
 */
export function toNumber(value) {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d.-]/g, "");
    const parsed = Number(cleaned);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

/**
 * Parse currency text into a number.
 *
 * Example:
 * parseCurrency("₹1,25,000") => 125000
 *
 * @param {string|number} value
 * @returns {number}
 */
export function parseCurrency(value) {
  return toNumber(value);
}

/**
 * Add monetary values safely.
 *
 * @param {...number|string} values
 * @returns {number}
 */
export function addCurrency(...values) {
  return values.reduce((total, value) => {
    return total + toNumber(value);
  }, 0);
}

/**
 * Calculate percentage of an amount.
 *
 * @param {number|string} amount
 * @param {number|string} percentage
 * @returns {number}
 */
export function calculatePercentage(amount, percentage) {
  return (toNumber(amount) * toNumber(percentage)) / 100;
}

/**
 * Calculate GST amount.
 *
 * @param {number|string} amount
 * @param {number|string} gstRate
 * @returns {number}
 */
export function calculateGST(amount, gstRate = 18) {
  return calculatePercentage(amount, gstRate);
}

/**
 * Calculate amount including GST.
 *
 * @param {number|string} amount
 * @param {number|string} gstRate
 * @returns {number}
 */
export function amountWithGST(amount, gstRate = 18) {
  const base = toNumber(amount);
  return base + calculateGST(base, gstRate);
}

/**
 * Calculate amount excluding GST from a GST-inclusive amount.
 *
 * @param {number|string} total
 * @param {number|string} gstRate
 * @returns {number}
 */
export function amountWithoutGST(total, gstRate = 18) {
  const value = toNumber(total);
  return value / (1 + toNumber(gstRate) / 100);
}

/**
 * Round monetary value to two decimal places.
 *
 * @param {number|string} amount
 * @returns {number}
 */
export function roundCurrency(amount) {
  return Math.round((toNumber(amount) + Number.EPSILON) * 100) / 100;
}