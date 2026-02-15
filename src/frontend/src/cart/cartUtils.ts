import type { CartItem } from './cartTypes';

/**
 * Parse price string like "₹299" to numeric value 299
 */
export function parsePriceString(priceStr: string): number {
  const cleaned = priceStr.replace(/[₹,\s]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Format numeric price to INR display format
 */
export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Calculate line total for a cart item
 */
export function calculateLineTotal(item: CartItem): number {
  return item.unitPrice * item.quantity;
}

/**
 * Calculate cart subtotal
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + calculateLineTotal(item), 0);
}

/**
 * Calculate total item count in cart
 */
export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
