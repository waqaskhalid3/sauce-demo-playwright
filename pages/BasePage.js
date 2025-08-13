const { expect } = require('@playwright/test');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async assertTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  async assertVisible(locator) {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  async assertText(locator, expectedText) {
    await expect(this.page.locator(locator)).toHaveText(String(expectedText));
  }

  async assertContains(locator, expectedSubstring) {
    await expect(this.page.locator(locator)).toContainText(expectedSubstring);
  }
}

module.exports = BasePage;
