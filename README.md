# Playwright SauceDemo Test Suite

This repository contains an automated end-to-end test suite for the [SauceDemo](https://www.saucedemo.com/) web application, built using [Playwright](https://playwright.dev/). The suite covers the login, product selection, and checkout flows, following best practices for maintainability and scalability.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Tests](#running-the-tests)
- [Configuration](#configuration)
- [Test Data & Locators](#test-data--locators)
- [Reports & Logs](#reports--logs)
- [Dependencies](#dependencies)
- [Additional Resources](#additional-resources)

---

## Project Structure

```
.
├── package.json
├── playwright.config.js
├── data/
│   ├── asserts.json
│   └── testData.json
├── locators/
│   ├── checkoutPage.json
│   ├── loginPage.json
│   └── productsPage.json
├── pages/
│   ├── BasePage.js
│   ├── checkout.page.js
│   ├── login.page.js
│   └── products.page.js
├── tests/
│   └── checkout.spec.js
├── utils/
│   ├── helpers.js
│   └── locatorLoader.js
└── test-results/
```

- **data/**: Test data and assertion values.
- **locators/**: Page element selectors in JSON format.
- **pages/**: Page Object Model (POM) classes for each app page.
- **tests/**: Playwright test specs.
- **utils/**: Helper utilities for logging, screenshots, and locator loading.
- **test-results/**: Stores test run results and reports.

---

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd playwright-saucedemo
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Install Playwright browsers:**
   ```sh
   npx playwright install
   ```

---

## Running the Tests

- **Default run (all browsers, headless):**
  ```sh
  npm test
  ```

- **Run in headed mode:**
  ```sh
  HEADLESS=false npm test
  ```

- **Run specific browsers (comma-separated):**
  ```sh
  PROJECTS=Chromium,Firefox npm test
  ```

- **Run with parallel workers:**
  ```sh
  PARALLEL=3 npm test
  ```

- **View HTML report:**
  After the run, open the generated report folder (e.g., `playwright-report/YYYYMMDD_HHmmss/index.html`) in your browser.

---

## Configuration

- **[playwright.config.js](playwright.config.js):**
  - Controls test directory, timeouts, retries, reporting, browser selection, and parallelism.
  - Supports environment variables for custom runs:
    - `HEADLESS` (default: `true`)
    - `PROJECTS` (default: `Chromium,Firefox,WebKit`)
    - `PARALLEL` (default: `1`)

---

## Test Data & Locators

- **Test Data:**  
  - [data/testData.json](data/testData.json): URLs, user credentials, checkout info.
  - [data/asserts.json](data/asserts.json): Expected titles, headers, and values for assertions.

- **Locators:**  
  - [locators/loginPage.json](locators/loginPage.json)
  - [locators/productsPage.json](locators/productsPage.json)
  - [locators/checkoutPage.json](locators/checkoutPage.json)

  Locators are loaded dynamically by [`utils/locatorLoader.js`](utils/locatorLoader.js).

---

## Reports & Logs

- **Test Reports:**  
  - HTML reports are generated in `playwright-report/YYYYMMDD_HHmmss/`.

- **Logs:**  
  - Execution logs are saved in `logs/test.log`.

- **Screenshots:**  
  - Captured on key steps and failures, stored in `screenshots/`.

---

## Dependencies

- [@playwright/test](https://playwright.dev/)
- [fs-extra](https://www.npmjs.com/package/fs-extra)
- [moment](https://momentjs.com/)
- [allure-playwright](https://github.com/allure-framework/allure-js/tree/master/packages/allure-playwright) (optional, for advanced reporting)

Install all dependencies with `npm install`.

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [SauceDemo App](https://www.saucedemo.com/)
- [Allure Reporting](https://docs.qameta.io/allure/)

---

## Notes

- Ensure Node.js (v14+) is installed.
- For CI/CD integration, configure environment variables as needed.
- For troubleshooting, check the `logs/` and `test-results/` directories.

---

## Author
- Name: Waqas
- Email: waqaskhalidbutt1@gmail.com

---