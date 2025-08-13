const { defineConfig, devices } = require('@playwright/test');
const path = require('path');          // <--- add this line
const moment = require('moment');      // if you use dynamic report folder
const reportFolder = path.join('playwright-report', moment().format('YYYYMMDD_HHmmss'));

// Read terminal/environment variables
const PARALLEL = process.env.PARALLEL ? parseInt(process.env.PARALLEL) : 1; // default 1 worker
const PROJECTS = process.env.PROJECTS ? process.env.PROJECTS.split(',') : ['Chromium', 'Firefox', 'WebKit']; // default all
const HEADLESS = process.env.HEADLESS === 'false' ? false : true; // default true

// Define all available projects
const allProjects = {
  Chromium: { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
  Firefox: { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
  WebKit: { name: 'WebKit', use: { ...devices['Desktop Safari'] } },
};

// Filter projects based on terminal input
const selectedProjects = PROJECTS.map(p => allProjects[p]).filter(Boolean);

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  reporter: [
    ['html', { outputFolder: reportFolder, open: 'always' }]
  ],
  projects: selectedProjects,
  use: {
    headless: HEADLESS,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    outputDir: 'playwright-report/test-results'
  },
  workers: PARALLEL
});
