
import { test, expect } from '@playwright/test';
import { ProductPage } from '../pageFunc/productPage';




let productPage;

async function login(page, username) {
  
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}



// Takes snapshot of inventory list for golden baseline
test('Assert snapshot of golden baseline', async ({ page }) => {
  await login(page, 'standard_user');
  await expect(page.locator('[data-test="inventory-list"]')).toHaveScreenshot('inventory-list.png');
});


// TC-INVENTORY-001: Verify that the inventory list page matches the golden baseline screenshot. Expected to fail with problem_user.
test('TC-INVENTORY-001', async ({ page }) => {
  await login(page, 'problem_user');
  await expect(page.locator('[data-test="inventory-list"]'), 'Inventory list screenshot does not match!').toHaveScreenshot('inventory-list.png');
});





//test sorting functionality with problem_user - expected to fail due to known issues with this user type

test.describe('Sorting Tests', () => {


test.beforeEach(async ({ page }) => {
  productPage = new ProductPage(page);
  await login(page, 'problem_user');
});

test('TC-INVENTORY-002/Name (A to Z)', async () => {
  await productPage.filterByNameAtoZ();
  const productNames = await productPage.getProductNames();
  const sortedNames = [...productNames].sort();
  expect(productNames).toEqual(sortedNames);

});

test('TC-INVENTORY-003/Name (Z to A)', async () => {
  await productPage.filterByNameZtoA();
  const productNames = await productPage.getProductNames();
  const sortedNames = [...productNames].sort().reverse();
  expect(productNames).toEqual(sortedNames);
});

test('TC-INVENTORY-004/Price (Low to High)', async () => {
  await productPage.filterByPriceLowToHigh();
  const productPrices = await productPage.getProductPrices();
  const sortedPrices = [...productPrices].sort((a, b) => a - b);
  expect(productPrices).toEqual(sortedPrices);
});

test('TC-INVENTORY-005/Price (High to Low)', async () => {
  await productPage.filterByPriceHighToLow();
  const productPrices = await productPage.getProductPrices();
  const sortedPrices = [...productPrices].sort((a, b) => b - a);
  expect(productPrices).toEqual(sortedPrices);
});



});