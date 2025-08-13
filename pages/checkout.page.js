const BasePage = require('./BasePage');
const { loadLocators } = require('../utils/locatorLoader');

class CheckoutPage extends BasePage {
  constructor(page) {
    super(page);
    const locators = loadLocators('checkoutPage');

    this.checkoutButton = page.locator(locators.checkoutButton);
    this.firstName = page.locator(locators.firstName);
    this.lastName = page.locator(locators.lastName);
    this.postalCode = page.locator(locators.postalCode);
    this.continueButton = page.locator(locators.continueButton);
    this.finishButton = page.locator(locators.finishButton);
    this.confirmationText = page.locator(locators.confirmationText);
    this.summaryTotal = locators.summaryTotalLabel;
  }

  async checkoutDetails(firstName, lastName, postalCode) {
    await this.checkoutButton.click();
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
    await this.assertVisible(this.summaryTotal);
    await this.finishButton.click();
  }

  async getConfirmation() {
    return await this.page.locator('.complete-header').innerText();
  }

}

module.exports = CheckoutPage;
