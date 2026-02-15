import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface AddToCartToastProps {
  itemName: string;
  onClose: () => void;
}

export function AddToCartToast({ itemName, onClose }: AddToCartToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
        <div className="flex-1">
          <p className="font-medium text-sm">Added to cart</p>
          <p className="text-xs opacity-90 truncate">{itemName}</p>
        </div>
      </div>
    </div>
  );
}
