
import { get } from "node:http";
import { CartPage } from "../pageFunc/cartPage";
import { ProductPage } from "../pageFunc/productPage";
import { expect, test } from "@playwright/test";

let cartPage;
let productPage;

async function login(page, username) {
  
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
}


test.describe('Cart Page Tests', () => {

    test.beforeEach(async ({ page }) => {
      productPage = new ProductPage(page);
      cartPage = new CartPage(page);
      await login(page, 'standard_user');
    });



    test('Test Cart Page URL', async ({ page }) => {  
        await productPage.addProductToCart();
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
            }
        )
    

    test('Validate Continue Shopping Button', async ({ page }) => {
        await productPage.clickOnCartLink();
        await cartPage.clickContinueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        }
    )
    
    test('Validate Single Product Details in Cart', async ({ page }) => {
        
        const productDesc =await productPage.getFirstProductDescription();
        await productPage.addProductToCart();
        await productPage.clickOnCartLink();
        
        const cartDesc = await cartPage.getProductDetailsInCart();

        expect(cartDesc[0]).toEqual(productDesc);

    })

    test('Validate All Products in Cart', async ({ page }) => {
        const allProductDesc = await productPage.getAllProductDescriptions();
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();
        const cartDesc = await cartPage.getProductDetailsInCart();
        expect(cartDesc).toEqual(allProductDesc);
    })

    test('Validate Remove Product from Cart', async ({ page }) => {
        await productPage.addAllProductsToCart();
        await productPage.clickOnCartLink();

        const numberOfProductsInCart = await cartPage.getNumberOfProductsInCart(); // get title count from function in cartPage.js
        expect(numberOfProductsInCart).toBeGreaterThan(0);
        
        await cartPage.removeProductFromCart();
        const numberOfProductsInCartAfterRemoval = await cartPage.getNumberOfProductsInCart(); // get count after removal
        expect(numberOfProductsInCartAfterRemoval).toBe(numberOfProductsInCart - 1); // final count = 5

    })

    test('Validate Specific Product Details in Cart', async ({ page }) => {
        const specificProductDesc = await productPage.getProductDescriptionByName('Sauce Labs Onesie');
        await productPage.addProductToCartByName('Sauce Labs Onesie');
        await productPage.clickOnCartLink();
        const cartDesc = await cartPage.getProductDetailsInCart();
        expect(cartDesc).toEqual(specificProductDesc);

    })




});
