export interface CartItem {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  vegetarian?: boolean;
  popular?: boolean;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
}
