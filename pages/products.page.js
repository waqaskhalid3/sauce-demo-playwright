const BasePage = require('./BasePage');
const { loadLocators } = require('../utils/locatorLoader');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    const locators = loadLocators('productsPage');
    this.page = page; // Ensure page is available
    this.inventoryItems = page.locator(locators.inventoryItems); // Create locator
    this.addToCartButton = locators.addToCartButtons; // Use the correct locator name
    this.cartButton = page.locator(locators.cartLink); // Using cartLink from your JSON
    this.cartBadge = locators.cartBadge;
  }

  async addRandomItems(count = 3) {
    // Get all inventory items
    const items = await this.inventoryItems.all();
    const totalItems = items.length;
    const selectedIndexes = new Set();

    // Generate unique random indexes
    while (selectedIndexes.size < Math.min(count, totalItems)) {
      selectedIndexes.add(Math.floor(Math.random() * totalItems));
    }

    // Click "Add to cart" for each selected item
    for (const index of selectedIndexes) {
      const item = items[index];
      await item.locator(this.addToCartButton).click();
    }

    return selectedIndexes.size;
  }

  async goToCart() {
    await this.cartButton.click();
  }

  async assertCartBadge(count) {
    await this.assertText(this.cartBadge, count);
  }
}

module.exports = ProductsPage;