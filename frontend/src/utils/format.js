/**
 * Format a number as Indian Rupees.
 */
export const formatPrice = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0);

/**
 * Compute the discounted price from a base price and discount percentage.
 */
export const finalPrice = (price, discountPercent = 0) =>
  Math.round(price - (price * discountPercent) / 100);
