import { test, expect } from '@playwright/test';


// Manual test cases ported to playwright
// Using Swag Labs' saucedemo website

async function login(page, username) {
  
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  

}

// TC-LOGIN-001: Verify that a user can log in with valid credentials and see the inventory page.
test('TC-LOGIN-001', async ({ page }) => {
  await login(page, 'standard_user');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

// TC-LOGIN-002: Verify that a user cannot log in with invalid credentials and sees an error message.
test('TC-LOGIN-002, 003, 004', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username is required');
  await page.reload();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('asldkfjas');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
  await page.reload();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('asdlfka');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
});

// TC-LOGIN-005: Verify that a locked out user cannot log in and sees an appropriate error message.
test('TC-LOGIN-005', async ({ page }) => {
  await login(page, 'locked_out_user');
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Sorry, this user has been locked out.');
});



