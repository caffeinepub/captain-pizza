import { useState } from 'react';
import { SectionContainer } from '../site/SectionContainer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/cart/CartContext';
import { parsePriceString } from '@/cart/cartUtils';
import { Plus, Leaf } from 'lucide-react';
import { getMenuItemImage } from '@/utils/menuImages';
import { AddToCartToast } from '../cart/AddToCartToast';

interface MenuItem {
  name: string;
  description: string;
  price: string;
  popular?: boolean;
  vegetarian?: boolean;
  category?: string;
}

const menuItems: MenuItem[] = [
  // COMBO-1
  {
    category: 'COMBO-1',
    name: 'COMBO-1',
    description: '1 ALOO TIKKI BURGER + 1 MINI PIZZA + COKE 200 ML',
    price: '₹169.00',
    vegetarian: true,
    popular: true,
  },

  // COMBO-2
  {
    category: 'COMBO-2',
    name: 'Medium Simply Veg Combo',
    description: 'Medium Simply Veg Combo',
    price: '₹380.00',
    vegetarian: true,
  },
  {
    category: 'COMBO-2',
    name: 'Medium Classic Veg Combo',
    description: 'Medium Classic Veg Combo',
    price: '₹430.00',
    vegetarian: true,
  },
  {
    category: 'COMBO-2',
    name: 'Medium Deluxe Veg Combo',
    description: 'Medium Deluxe Veg Combo',
    price: '₹480.00',
    vegetarian: true,
  },
  {
    category: 'COMBO-2',
    name: 'Large Simply Veg Combo',
    description: 'Large Simply Veg Combo',
    price: '₹530.00',
    vegetarian: true,
  },
  {
    category: 'COMBO-2',
    name: 'Large Classic Veg Combo',
    description: 'Large Classic Veg Combo',
    price: '₹630.00',
    vegetarian: true,
  },
  {
    category: 'COMBO-2',
    name: 'Large Deluxe Veg Combo',
    description: 'Large Deluxe Veg Combo',
    price: '₹680.00',
    vegetarian: true,
  },

  // SUNDAY SPECIAL
  {
    category: "'SUNDAY' Bole to",
    name: 'ANY MEDIUM PIZZA',
    description: 'Any Medium Pizza - Sunday Special',
    price: '₹499.00',
    vegetarian: true,
    popular: true,
  },

  // COMBO-3
  {
    category: 'COMBO-3',
    name: 'FRIENDS MEAL',
    description: '3 SIDE ORDERS FREE WITH A MEDIUM PIZZA',
    price: '₹399.00',
    vegetarian: true,
    popular: true,
  },

  // COMBO-4
  {
    category: 'COMBO-4',
    name: '4 Mini Pizza Combo',
    description: '4 Mini Pizza Combo',
    price: '₹279.00',
    vegetarian: true,
  },

  // BURGERS & WRAP
  {
    category: 'BURGERS & WRAP',
    name: 'Aloo Tikki Burger',
    description: 'Aloo Tikki Burger',
    price: '₹40.00',
    vegetarian: true,
  },
  {
    category: 'BURGERS & WRAP',
    name: 'Masala Crunch',
    description: 'Masala Crunch Burger',
    price: '₹60.00',
    vegetarian: true,
  },
  {
    category: 'BURGERS & WRAP',
    name: 'Crispy Veg',
    description: 'Crispy Veg Burger',
    price: '₹70.00',
    vegetarian: true,
  },
  {
    category: 'BURGERS & WRAP',
    name: 'Classic Veg',
    description: 'Classic Veg Burger',
    price: '₹100.00',
    vegetarian: true,
  },
  {
    category: 'BURGERS & WRAP',
    name: 'Monster Club',
    description: 'Monster Club Burger',
    price: '₹130.00',
    vegetarian: true,
  },
  {
    category: 'BURGERS & WRAP',
    name: 'Aloo Tikki Wrap',
    description: 'Aloo Tikki Wrap',
    price: '₹50.00',
    vegetarian: true,
  },
  {
    category: 'BURGERS & WRAP',
    name: 'Masala Crunch Wrap',
    description: 'Masala Crunch Wrap',
    price: '₹65.00',
    vegetarian: true,
  },
  {
    category: 'BURGERS & WRAP',
    name: 'Crispy Veg Wrap',
    description: 'Crispy Veg Wrap',
    price: '₹80.00',
    vegetarian: true,
  },
  {
    category: 'BURGERS & WRAP',
    name: 'Classic Veg Wrap',
    description: 'Classic Veg Wrap',
    price: '₹110.00',
    vegetarian: true,
  },
  {
    category: 'BURGERS & WRAP',
    name: 'Monster Club Wrap',
    description: 'Monster Club Wrap',
    price: '₹110.00',
    vegetarian: true,
  },

  // SHAKES & MOKETAIL
  {
    category: 'SHAKES & MOKETAIL',
    name: 'VANILA SHAKE',
    description: 'Vanilla Shake',
    price: '₹65.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'MINT MOJITO',
    description: 'Mint Mojito',
    price: '₹60.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'STARAWVERRY SHAKE',
    description: 'Strawberry Shake',
    price: '₹70.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'BLUE OCEAN',
    description: 'Blue Ocean',
    price: '₹65.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'COLD COFFEE',
    description: 'Cold Coffee',
    price: '₹70.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'MASALA SODA',
    description: 'Masala Soda',
    price: '₹65.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'CHOCOLATE SHAKE',
    description: 'Chocolate Shake',
    price: '₹75.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'GREEN APPLE',
    description: 'Green Apple',
    price: '₹70.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'BUTTER SCOTCH SHAKE',
    description: 'Butter Scotch Shake',
    price: '₹80.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'WATER MELAN',
    description: 'Watermelon',
    price: '₹75.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'OREO SHAKE',
    description: 'Oreo Shake',
    price: '₹100.00',
    vegetarian: true,
  },
  {
    category: 'SHAKES & MOKETAIL',
    name: 'LEMON ICE',
    description: 'Lemon Ice',
    price: '₹75.00',
    vegetarian: true,
  },

  // PIZZA - Basic
  {
    category: 'PIZZA',
    name: 'MARGHERITA',
    description: 'Cheese & Tomato Sauce',
    price: '₹100.00',
    vegetarian: true,
    popular: true,
  },
  {
    category: 'PIZZA',
    name: 'ONION VEG',
    description: 'Cheese & Onion',
    price: '₹100.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA',
    name: 'SWEET CORN',
    description: 'Cheese & Corn',
    price: '₹100.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA',
    name: 'TOMATO VEG',
    description: 'Cheese & Tomato',
    price: '₹100.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA',
    name: 'CAPSICUM VEG',
    description: 'Cheese & Cap.',
    price: '₹100.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA',
    name: 'Two In One Veg. Pizza',
    description: 'Tomato & Onion Cheese',
    price: '₹110.00',
    vegetarian: true,
  },

  // PIZZA - CHOICE OF JAIN CRUSTS
  {
    category: 'PIZZA - JAIN SPECIAL',
    name: 'GOLDEN DELIGHT',
    description: 'Tomato, Capsicum, Golden Corn',
    price: '₹130.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA - JAIN SPECIAL',
    name: 'VEGGIE CRUST',
    description: 'Sauce Tomato, Capsicum, Jalapeno',
    price: '₹130.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA - JAIN SPECIAL',
    name: 'SPICY SEASONAL',
    description: 'Green Chilli Capsicum, Red Chilli',
    price: '₹130.00',
    vegetarian: true,
  },

  // PIZZA - CLASSIC VEG CATEGORY
  {
    category: 'PIZZA - CLASSIC VEG',
    name: 'FARM HOUSE',
    description: 'Onion, Capsicum, Tomato, Mushroom',
    price: '₹150.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA - CLASSIC VEG',
    name: 'MEXICAN GREEN WAVE',
    description: 'Onion, Capsicum, Tomato, Jalapeno',
    price: '₹150.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA - CLASSIC VEG',
    name: 'PEPPY PANEER',
    description: 'Onion, Capsicum, Paneer',
    price: '₹150.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA - CLASSIC VEG',
    name: 'VEG EXTRAVAGANZA',
    description: 'Onion, Capsicum, Tomato, Mushroom, Corn, Paneer',
    price: '₹150.00',
    vegetarian: true,
  },

  // PIZZA - DELUXE VEG CATEGORY
  {
    category: 'PIZZA - DELUXE VEG',
    name: 'PANEER MAKHANI',
    description: 'Onion, Capsicum, Paneer, Makhani Sauce',
    price: '₹180.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA - DELUXE VEG',
    name: 'CHEESE N CORN',
    description: 'Extra Cheese, Golden Corn',
    price: '₹180.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA - DELUXE VEG',
    name: 'DOUBLE CHEESE MARGHERITA',
    description: 'Extra Cheese, Tomato Sauce',
    price: '₹180.00',
    vegetarian: true,
  },
  {
    category: 'PIZZA - DELUXE VEG',
    name: 'FRESH VEGGIE',
    description: 'Onion, Capsicum, Tomato, Mushroom, Corn',
    price: '₹180.00',
    vegetarian: true,
  },

  // PASTA
  {
    category: 'PASTA',
    name: 'PENNE ARRABIATA',
    description: 'Penne Pasta in Spicy Tomato Sauce',
    price: '₹120.00',
    vegetarian: true,
  },
  {
    category: 'PASTA',
    name: 'PENNE ALFREDO',
    description: 'Penne Pasta in Creamy White Sauce',
    price: '₹130.00',
    vegetarian: true,
  },
  {
    category: 'PASTA',
    name: 'PENNE PINK SAUCE',
    description: 'Penne Pasta in Pink Sauce',
    price: '₹140.00',
    vegetarian: true,
  },

  // GARLIC BREAD
  {
    category: 'GARLIC BREAD',
    name: 'GARLIC BREAD',
    description: 'Classic Garlic Bread',
    price: '₹80.00',
    vegetarian: true,
  },
  {
    category: 'GARLIC BREAD',
    name: 'CHEESE GARLIC BREAD',
    description: 'Garlic Bread with Cheese',
    price: '₹100.00',
    vegetarian: true,
  },

  // FRIES
  {
    category: 'FRIES',
    name: 'PERI PERI FRIES',
    description: 'Crispy Fries with Peri Peri Seasoning',
    price: '₹60.00',
    vegetarian: true,
  },
  {
    category: 'FRIES',
    name: 'CLASSIC FRIES',
    description: 'Classic Salted Fries',
    price: '₹50.00',
    vegetarian: true,
  },

  // VEG. DOUBLES
  {
    category: 'VEG. DOUBLES',
    name: 'VEG DOUBLE PATTY BURGER',
    description: 'Double Veg Patty Burger',
    price: '₹150.00',
    vegetarian: true,
  },
  {
    category: 'VEG. DOUBLES',
    name: 'DOUBLE CHEESE BURGER',
    description: 'Double Cheese Veg Burger',
    price: '₹160.00',
    vegetarian: true,
  },
];

// Group items by category
const groupedMenu = menuItems.reduce((acc, item) => {
  const category = item.category || 'Other';
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(item);
  return acc;
}, {} as Record<string, MenuItem[]>);

export function MenuSection() {
  const { addItem } = useCart();
  const [toastItem, setToastItem] = useState<string | null>(null);

  const handleAddToCart = (item: MenuItem) => {
    const unitPrice = parsePriceString(item.price);
    addItem({
      id: `${item.category}-${item.name}`,
      name: item.name,
      description: item.description,
      unitPrice,
      vegetarian: item.vegetarian,
      popular: item.popular,
    });
    setToastItem(item.name);
  };

  return (
    <SectionContainer id="menu">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">Our Menu</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our delicious selection of pizzas, burgers, wraps, shakes, and more
        </p>
      </div>

      <div className="space-y-12">
        {Object.entries(groupedMenu).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-2xl font-bold mb-6 text-primary">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item, index) => {
                const imageUrl = getMenuItemImage(item.name, item.category);
                return (
                  <Card key={`${category}-${index}`} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
                        <div className="flex gap-1 flex-shrink-0">
                          {item.popular && (
                            <Badge variant="destructive" className="text-xs">
                              Popular
                            </Badge>
                          )}
                          {item.vegetarian && (
                            <Badge variant="secondary" className="text-xs">
                              <Leaf className="w-3 h-3 mr-1" />
                              Veg
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{item.price}</span>
                        <Button size="sm" onClick={() => handleAddToCart(item)}>
                          <Plus className="w-4 h-4 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {toastItem && <AddToCartToast itemName={toastItem} onClose={() => setToastItem(null)} />}
    </SectionContainer>
  );
}
