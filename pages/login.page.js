const BasePage = require('./BasePage');
const { loadLocators } = require('../utils/locatorLoader');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    const locators = loadLocators('loginPage');
    this.usernameInput = page.locator(locators.usernameField);
    this.passwordInput = page.locator(locators.passwordField);
    this.loginButton = page.locator(locators.loginButton);
    this.inventoryList = locators.inventoryList;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.assertVisible(this.inventoryList);
  }
}

module.exports = LoginPage;
