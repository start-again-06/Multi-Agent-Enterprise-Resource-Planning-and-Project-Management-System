// frontend/src/utils/inventory.js

/**
 * Inventory utility functions
 */

/**
 * Safely convert quantity to number.
 *
 * @param {unknown} value
 * @returns {number}
 */
export function toQuantity(value) {
  const quantity = Number(value);

  return Number.isFinite(quantity) ? quantity : 0;
}

/**
 * Calculate total stock.
 *
 * @param {object} stock
 * @returns {number}
 */
export function getTotalStock(stock = {}) {
  return (
    toQuantity(stock.available) +
    toQuantity(stock.reserved) +
    toQuantity(stock.allocated) +
    toQuantity(stock.inTransit)
  );
}

/**
 * Calculate available stock.
 *
 * @param {object} stock
 * @returns {number}
 */
export function getAvailableStock(stock = {}) {
  return Math.max(0, toQuantity(stock.available));
}

/**
 * Calculate projected available stock.
 *
 * Formula:
 *
 * Available
 * + Reserved
 * + In Transit
 * + Expected Receipts
 * - Pending Requirements
 *
 * @param {object} stock
 * @returns {number}
 */
export function getProjectedStock(stock = {}) {
  return (
    toQuantity(stock.available) +
    toQuantity(stock.reserved) +
    toQuantity(stock.inTransit) +
    toQuantity(stock.expectedReceipts) -
    toQuantity(stock.pendingRequirements)
  );
}

/**
 * Calculate free stock after reservations.
 *
 * @param {number} available
 * @param {number} reserved
 * @returns {number}
 */
export function getFreeStock(available, reserved) {
  return Math.max(
    0,
    toQuantity(available) - toQuantity(reserved)
  );
}

/**
 * Calculate stock value.
 *
 * @param {number} quantity
 * @param {number} unitCost
 * @returns {number}
 */
export function getStockValue(quantity, unitCost) {
  return toQuantity(quantity) * toQuantity(unitCost);
}

/**
 * Calculate reorder quantity.
 *
 * @param {number} currentStock
 * @param {number} reorderPoint
 * @param {number} targetStock
 * @returns {number}
 */
export function getReorderQuantity(
  currentStock,
  reorderPoint,
  targetStock
) {
  const stock = toQuantity(currentStock);
  const reorder = toQuantity(reorderPoint);
  const target = toQuantity(targetStock);

  if (stock > reorder) {
    return 0;
  }

  return Math.max(0, target - stock);
}

/**
 * Check whether inventory is below reorder point.
 *
 * @param {number} currentStock
 * @param {number} reorderPoint
 * @returns {boolean}
 */
export function isLowStock(currentStock, reorderPoint) {
  return toQuantity(currentStock) <= toQuantity(reorderPoint);
}

/**
 * Check whether inventory is out of stock.
 *
 * @param {number} quantity
 * @returns {boolean}
 */
export function isOutOfStock(quantity) {
  return toQuantity(quantity) <= 0;
}

/**
 * Calculate inventory utilization.
 *
 * @param {number} used
 * @param {number} capacity
 * @returns {number}
 */
export function calculateUtilization(used, capacity) {
  const usedValue = toQuantity(used);
  const capacityValue = toQuantity(capacity);

  if (capacityValue <= 0) {
    return 0;
  }

  return Math.min(
    100,
    Math.max(0, (usedValue / capacityValue) * 100)
  );
}

/**
 * Calculate percentage of total inventory.
 *
 * @param {number} quantity
 * @param {number} total
 * @returns {number}
 */
export function stockPercentage(quantity, total) {
  const quantityValue = toQuantity(quantity);
  const totalValue = toQuantity(total);

  if (totalValue <= 0) {
    return 0;
  }

  return (quantityValue / totalValue) * 100;
}

/**
 * Aggregate inventory records by item.
 *
 * @param {Array} records
 * @returns {Array}
 */
export function aggregateInventory(records = []) {
  const map = new Map();

  for (const record of records) {
    if (!record || !record.itemId) {
      continue;
    }

    const existing = map.get(record.itemId);

    if (!existing) {
      map.set(record.itemId, {
        ...record,
        quantity: toQuantity(record.quantity),
      });

      continue;
    }

    existing.quantity += toQuantity(record.quantity);
  }

  return Array.from(map.values());
}

/**
 * Calculate inventory balance from transactions.
 *
 * @param {Array} transactions
 * @returns {number}
 */
export function calculateBalance(transactions = []) {
  return transactions.reduce((balance, transaction) => {
    return balance + toQuantity(transaction.quantity);
  }, 0);
}

/**
 * Determine whether a transaction increases stock.
 *
 * @param {string} transactionType
 * @returns {boolean}
 */
export function isStockIncrease(transactionType) {
  const increaseTypes = [
    "RECEIVE",
    "RETURN",
    "TRANSFER_RECEIPT",
    "ADJUSTMENT_IN",
  ];

  return increaseTypes.includes(
    String(transactionType).toUpperCase()
  );
}

/**
 * Determine whether a transaction decreases stock.
 *
 * @param {string} transactionType
 * @returns {boolean}
 */
export function isStockDecrease(transactionType) {
  const decreaseTypes = [
    "ISSUE",
    "CONSUME",
    "TRANSFER_DISPATCH",
    "ADJUSTMENT_OUT",
    "SCRAP",
  ];

  return decreaseTypes.includes(
    String(transactionType).toUpperCase()
  );
}

/**
 * Calculate transaction impact.
 *
 * @param {string} transactionType
 * @param {number} quantity
 * @returns {number}
 */
export function getTransactionImpact(transactionType, quantity) {
  const value = Math.abs(toQuantity(quantity));

  if (isStockIncrease(transactionType)) {
    return value;
  }

  if (isStockDecrease(transactionType)) {
    return -value;
  }

  return 0;
}

/**
 * Calculate stock after transaction.
 *
 * @param {number} currentStock
 * @param {string} transactionType
 * @param {number} quantity
 * @returns {number}
 */
export function calculateStockAfterTransaction(
  currentStock,
  transactionType,
  quantity
) {
  return Math.max(
    0,
    toQuantity(currentStock) +
      getTransactionImpact(transactionType, quantity)
  );
}

/**
 * Check whether enough stock exists for an operation.
 *
 * @param {number} available
 * @param {number} requested
 * @returns {boolean}
 */
export function hasSufficientStock(available, requested) {
  return toQuantity(available) >= toQuantity(requested);
}

/**
 * Calculate stock shortage.
 *
 * @param {number} available
 * @param {number} required
 * @returns {number}
 */
export function getStockShortage(available, required) {
  return Math.max(
    0,
    toQuantity(required) - toQuantity(available)
  );
}

/**
 * Generate inventory recommendation.
 *
 * @param {object} stock
 * @returns {object}
 */
export function getInventoryRecommendation(stock = {}) {
  const available = toQuantity(stock.available);
  const inTransit = toQuantity(stock.inTransit);
  const expectedReceipts = toQuantity(stock.expectedReceipts);
  const pendingRequirements = toQuantity(stock.pendingRequirements);
  const reorderPoint = toQuantity(stock.reorderPoint);

  const projected =
    available +
    inTransit +
    expectedReceipts -
    pendingRequirements;

  if (available >= pendingRequirements && available > reorderPoint) {
    return {
      action: "WAIT",
      reason: "Current stock is sufficient.",
    };
  }

  if (inTransit + expectedReceipts >= pendingRequirements) {
    return {
      action: "WAIT",
      reason: "Expected receipts can cover the requirement.",
    };
  }

  if (available > 0 && available < pendingRequirements) {
    return {
      action: "TRANSFER",
      reason: "Additional stock may be required from another location.",
    };
  }

  if (projected <= reorderPoint) {
    return {
      action: "BUY",
      reason: "Projected stock is below the reorder point.",
    };
  }

  return {
    action: "INVESTIGATE",
    reason: "Inventory position requires review.",
  };
}