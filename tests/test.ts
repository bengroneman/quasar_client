import { expect, test } from '@playwright/test';

test('login page has expected h1', async ({ page }) => {
  await page.goto('/login');
  expect(await page.textContent('h2')).toBe('Quality Toolkit');
});

test('test login page loads as 200', async ({ page }) => {
  await page.goto('/login');
  expect(await page.title()).toBe('Sign in • Quality Toolkit');
});

test('login failure notifies end user', async ({ page }) => {
  await page.goto('/login');
  const email = 'fakeuser@gmail.com'
  const password = 'fakepassword'
  await page.fill('#email', email)
  await page.fill('#password', password)
  await page.click('button#submit')

  expect(page.url()).toBe('/login')
});

test('successful login', async ({ page }) => {
  await page.goto('/login');
  const email = 'create@bluedojo.dev'
  const password = ''
  await page.fill('#email', email)
  await page.fill('#password', password)
  await page.click('button#submit')
  // # TODO check for cookie
  expect(page.url()).toBe('/scorecard/dashboard')
});

