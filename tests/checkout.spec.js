const { test, expect } = require('@playwright/test');
const { logMessage, screenshotAction } = require('../utils/helpers');
const testData = require('../data/testData.json');
const asserts = require('../data/asserts.json');

const LoginPage = require('../pages/login.page');
const ProductsPage = require('../pages/products.page');
const CheckoutPage = require('../pages/checkout.page');

test.describe('Sauce Demo Checkout Flow', () => {
  test('logs in, adds 3 random items, checks out successfully', async ({ page }, testInfo) => {
    const browserName = testInfo.project.name;

    // Initialize page objects
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await logMessage('Test started: Sauce Demo checkout flow', browserName);

    // Step 1: Go to login
    await loginPage.goto(testData.baseUrl);
    await loginPage.assertTitle(asserts.titles.loginPage);
    await screenshotAction(page, 'login-page', browserName);

    // Step 2: Login
    await loginPage.login(testData.users.standard.username, testData.users.standard.password);
    await screenshotAction(page, 'after-login', browserName);
    await logMessage('Logged in successfully', browserName);

    // Step 3: Add 3 random items
    const addedItems = await productsPage.addRandomItems();
    await productsPage.assertCartBadge(addedItems);
    await logMessage(`Added ${addedItems} items to cart`, browserName);
    await screenshotAction(page, 'items-added', browserName);

    // Step 4: Cart
    await productsPage.goToCart();
    const cartItemsCount = await page.locator('.cart_item').count();
    expect(cartItemsCount).toBe(testData.item_quantity);
    await screenshotAction(page, 'cart-page', browserName);

    // Step 5: Checkout
    await checkoutPage.checkoutDetails(
      testData.checkout.firstName,
      testData.checkout.lastName,
      testData.checkout.postalCode
    );
    await screenshotAction(page, 'checkout-summary', browserName);

    // Step 6: Finish
    const confirmation = await checkoutPage.getConfirmation();
    expect(confirmation).toBe(asserts.headers.orderConfirmation);
    await logMessage(`Confirmation message: ${confirmation}`, browserName);
    await screenshotAction(page, 'checkout-confirmation', browserName);

    await logMessage('Test completed successfully', browserName);
  });
});
