const BasePage = require('./BasePage');
const { loadLocators } = require('../utils/locatorLoader');

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);
    const locators = loadLocators('productsPage');
    this.page = page;
    this.inventoryItems = page.locator(locators.inventoryItems);
    this.addToCartButton = locators.addToCartButtons;
    this.cartButton = page.locator(locators.cartLink);
    this.cartBadge = locators.cartBadge;
  }

  async addRandomItems(count = 3) {
    const items = await this.inventoryItems.all();
    const totalItems = items.length;
    const selectedIndexes = new Set();
    while (selectedIndexes.size < Math.min(count, totalItems)) {
      selectedIndexes.add(Math.floor(Math.random() * totalItems));
    }
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