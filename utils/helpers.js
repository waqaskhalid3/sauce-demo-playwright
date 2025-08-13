const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

const logsDir = path.join(__dirname, '..', 'logs');
fs.ensureDirSync(logsDir);

async function logMessage(message, browserName = '') {
  const timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  const prefix = browserName ? `[${browserName}] ` : '';
  const logLine = `[${timestamp}] ${prefix}${message}\n`;
  console.log(logLine);
  await fs.appendFile(path.join(logsDir, 'test.log'), logLine);
}

async function screenshotAction(page, name, browserName = '') {
  const timestamp = moment().format('YYYYMMDD_HHmmss');
  const browserPrefix = browserName ? `${browserName}_` : '';
  const screenshotPath = path.join(__dirname, '..', 'screenshots', `${timestamp}_${browserPrefix}${name}.png`);
  await fs.ensureDir(path.dirname(screenshotPath));
  await page.screenshot({ path: screenshotPath, fullPage: true });
  return screenshotPath;
}

module.exports = { logMessage, screenshotAction };
