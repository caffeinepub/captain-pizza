import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { openWhatsAppCheckout, type WhatsAppCheckoutData } from '@/utils/whatsapp';
import { siteConfig } from '@/config/siteConfig';
import { useCart } from '@/cart/CartContext';

export function WhatsAppCheckoutForm() {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    orderType: 'delivery' as 'delivery' | 'pickup',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (formData.orderType === 'delivery' && !formData.address?.trim()) {
      newErrors.address = 'Delivery address is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const checkoutData: WhatsAppCheckoutData = {
        name: formData.name,
        phone: formData.phone,
        orderType: formData.orderType,
        address: formData.address,
        notes: formData.notes,
        cartItems: cart.items,
      };
      openWhatsAppCheckout(siteConfig.whatsappNumber, checkoutData);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">
          Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 98765 43210"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderType">
          Order Type <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.orderType}
          onValueChange={(value: 'delivery' | 'pickup') => handleInputChange('orderType', value)}
        >
          <SelectTrigger id="orderType">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="delivery">Delivery</SelectItem>
            <SelectItem value="pickup">Pickup</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {formData.orderType === 'delivery' && (
        <div className="space-y-2">
          <Label htmlFor="address">
            Delivery Address <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="address"
            placeholder="Enter your complete delivery address"
            value={formData.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className={errors.address ? 'border-destructive' : ''}
            rows={3}
          />
          {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          placeholder="Any special instructions or requests"
          value={formData.notes}
          onChange={(e) => handleInputChange('notes', e.target.value)}
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full" size="lg">
        Place Order via WhatsApp
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Clicking the button will open WhatsApp with your order details pre-filled
      </p>
    </form>
  );
}
