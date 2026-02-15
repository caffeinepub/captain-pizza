import { SectionContainer } from '../components/site/SectionContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/cart/CartContext';
import { formatPrice } from '@/cart/cartUtils';
import { siteConfig } from '@/config/siteConfig';
import { ShoppingCart, Trash2, Package } from 'lucide-react';
import { WhatsAppCheckoutForm } from '../components/order/WhatsAppCheckoutForm';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

export function CheckoutPage() {
  const { cart, removeItem, updateQuantity } = useCart();
  const [checkoutMethod, setCheckoutMethod] = useState<'whatsapp' | 'zomato' | null>(null);
  const navigate = useNavigate();

  const handleZomatoCheckout = () => {
    window.open(siteConfig.zomatoUrl, '_blank');
  };

  if (cart.itemCount === 0) {
    return (
      <SectionContainer id="checkout">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
            <ShoppingCart className="w-10 h-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some delicious items from our menu to get started!
          </p>
          <Button size="lg" onClick={() => navigate({ to: '/menu' })}>
            Browse Menu
          </Button>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer id="checkout">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Checkout</h1>
          <p className="text-lg text-muted-foreground">Review your order and complete checkout</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Cart Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Order
                  <Badge variant="secondary" className="ml-auto">
                    {cart.itemCount} {cart.itemCount === 1 ? 'item' : 'items'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.unitPrice)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{formatPrice(item.unitPrice * item.quantity)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="space-y-2 pt-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(cart.subtotal)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Delivery fee (₹{siteConfig.deliveryFee}) will be added for delivery orders
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Method */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Choose Checkout Method</CardTitle>
                <CardDescription>Select how you'd like to complete your order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!checkoutMethod && (
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-start gap-2"
                      onClick={() => setCheckoutMethod('whatsapp')}
                    >
                      <span className="font-semibold">WhatsApp Order</span>
                      <span className="text-sm text-muted-foreground font-normal">
                        Send your order directly via WhatsApp
                      </span>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full h-auto py-4 flex flex-col items-start gap-2"
                      onClick={() => setCheckoutMethod('zomato')}
                    >
                      <span className="font-semibold">Order on Zomato</span>
                      <span className="text-sm text-muted-foreground font-normal">
                        Complete your order on Zomato platform
                      </span>
                    </Button>
                  </div>
                )}

                {checkoutMethod === 'whatsapp' && (
                  <div className="space-y-4">
                    <Button variant="ghost" size="sm" onClick={() => setCheckoutMethod(null)}>
                      ← Back to methods
                    </Button>
                    <WhatsAppCheckoutForm />
                  </div>
                )}

                {checkoutMethod === 'zomato' && (
                  <div className="space-y-4">
                    <Button variant="ghost" size="sm" onClick={() => setCheckoutMethod(null)}>
                      ← Back to methods
                    </Button>
                    <div className="p-4 bg-muted rounded-lg space-y-3">
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-primary mt-0.5" />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">Order via Zomato</h4>
                          <p className="text-sm text-muted-foreground">
                            You'll be redirected to Zomato to complete your order. Your cart items are for reference
                            only - please add them again on Zomato.
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={handleZomatoCheckout}>
                      Continue to Zomato
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
