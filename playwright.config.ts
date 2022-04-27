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
        browswerName: 'chromium',
        viewport: { width: 1280, height: 720 },
      }
    },
    {
      name: 'Desktop Firefox',
      use: {
        browswerName: 'firefox',
        viewport: { width: 1280, height: 720 },
      }
    },
    {
      name: 'Mobile Chromium',
      use: devices['Pixel 5'],
    },
    {
      name: 'Mobile Safari',
      use: devices['IPhone 12'],
    }
  ]
};

export default config;
