const fs = require('fs');
const path = require('path');

function loadLocators(pageName) {
  const filePath = path.join(__dirname, '..', 'locators', `${pageName}.json`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Locator file not found: ${filePath}`);
  }
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

module.exports = { loadLocators };
