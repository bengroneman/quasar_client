import type { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 3000
  },
  projects: [
    {
      name: 'Desktop Chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 1280, height: 720 }
      }
    },
    {
      name: 'Desktop Firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1280, height: 720 }
      }
    },
    {
      name: 'Mobile Chromium',
      use: {
        browserName: 'chromium',
        viewport: { width: 360, height: 800 }
      }
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'firefox',
        viewport: { width: 360, height: 800 }
      }
    }
  ]
};

export default config;
