import type { CartItem } from '@/cart/cartTypes';
import { calculateLineTotal, formatPrice } from '@/cart/cartUtils';
import { siteConfig } from '@/config/siteConfig';

export interface WhatsAppCheckoutData {
  name: string;
  phone: string;
  orderType: 'delivery' | 'pickup';
  address?: string;
  notes?: string;
  cartItems: CartItem[];
}

export function buildWhatsAppMessageFromCart(data: WhatsAppCheckoutData): string {
  const lines = [
    `*ORDER DETAILS:*`,
    ``,
    `Customer Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Order Type: ${data.orderType === 'delivery' ? 'Delivery' : 'Pickup'}`,
  ];

  if (data.orderType === 'delivery' && data.address) {
    lines.push(`Delivery Address: ${data.address}`);
  }

  lines.push(``, `*ITEMS:*`);

  data.cartItems.forEach((item, index) => {
    const lineTotal = calculateLineTotal(item);
    lines.push(
      `${index + 1}. *${item.name}*`,
      `   Qty: ${item.quantity} x Rs.${item.unitPrice} = Rs.${lineTotal}`
    );
  });

  const subtotal = data.cartItems.reduce((sum, item) => sum + calculateLineTotal(item), 0);
  
  lines.push(``, `=========================`);
  lines.push(`*BILL SUMMARY:*`);
  lines.push(`Subtotal: Rs.${subtotal}`);

  if (data.orderType === 'delivery') {
    lines.push(`Delivery: Rs.${siteConfig.deliveryFee}`);
    lines.push(`*Total: Rs.${subtotal + siteConfig.deliveryFee}*`);
  } else {
    lines.push(`*Total: Rs.${subtotal}*`);
  }

  if (data.notes?.trim()) {
    lines.push(``, `Notes: ${data.notes}`);
  }

  lines.push(``, `Please confirm your order!`);

  return lines.join('\n');
}

export function buildWhatsAppLink(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function openWhatsAppCheckout(phoneNumber: string, data: WhatsAppCheckoutData): void {
  const message = buildWhatsAppMessageFromCart(data);
  const link = buildWhatsAppLink(phoneNumber, message);
  window.open(link, '_blank');
}

export function isPlaceholderNumber(phoneNumber: string): boolean {
  // No longer treat any number as placeholder since we have the real number
  return false;
}
