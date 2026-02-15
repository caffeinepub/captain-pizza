/**
 * Maps menu item names/categories to static generated image assets.
 * Returns the appropriate image path based on keywords in the item name or category.
 */
export function getMenuItemImage(itemName: string, category?: string): string {
  const searchText = `${itemName} ${category || ''}`.toLowerCase();

  // Pizza
  if (
    searchText.includes('pizza') ||
    searchText.includes('margherita') ||
    searchText.includes('deluxe') ||
    searchText.includes('veggie')
  ) {
    return '/assets/generated/menu-pizza.dim_640x480.png';
  }

  // Burger
  if (searchText.includes('burger') || searchText.includes('tikki') || searchText.includes('crispy')) {
    return '/assets/generated/menu-burger.dim_640x480.png';
  }

  // Wrap
  if (searchText.includes('wrap') || searchText.includes('roll')) {
    return '/assets/generated/menu-wrap.dim_640x480.png';
  }

  // Shakes & Beverages
  if (
    searchText.includes('shake') ||
    searchText.includes('mojito') ||
    searchText.includes('coffee') ||
    searchText.includes('soda') ||
    searchText.includes('ocean') ||
    searchText.includes('moketail')
  ) {
    return '/assets/generated/menu-shake.dim_640x480.png';
  }

  // Pasta
  if (searchText.includes('pasta') || searchText.includes('penne') || searchText.includes('arrabiata')) {
    return '/assets/generated/menu-pasta.dim_640x480.png';
  }

  // Fries
  if (searchText.includes('fries') || searchText.includes('peri peri')) {
    return '/assets/generated/menu-fries.dim_640x480.png';
  }

  // Garlic Bread
  if (searchText.includes('garlic') || searchText.includes('bread')) {
    return '/assets/generated/menu-garlic-bread.dim_640x480.png';
  }

  // Combo (default for combo meals)
  if (searchText.includes('combo') || searchText.includes('meal') || searchText.includes('friends')) {
    return '/assets/generated/menu-combo.dim_640x480.png';
  }

  // Default fallback to pizza
  return '/assets/generated/menu-pizza.dim_640x480.png';
}
