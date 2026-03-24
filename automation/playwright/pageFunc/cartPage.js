import { Page } from "@playwright/test";
import { cartPageLocators } from "../locators/cartPageLocators";


export class CartPage {

    constructor( page ) {
        this.page = page;
    }

    async clickContinueShopping() {
            await this.page.locator(cartPageLocators.continueShoppingButton).click();
        }

    async getCartPageElement() {
        return {
            cartTitle:  this.page.locator(cartPageLocators.cartTitle).textContent(),
            shoppingCart: this.page.locator(cartPageLocators.continueShoppingButton),
            checkoutButton: this.page.locator(cartPageLocators.checkoutButton),
        }
    }

    async getProductDetailsInCart() {
            const AllNames = await this.page.locator(cartPageLocators.productName).allTextContents();
            const AllDescriptions = await this.page.locator(cartPageLocators.productDescription).allTextContents();
            const AllPrices = await this.page.locator(cartPageLocators.productPrice).allTextContents();
        
            //return dictionary of name, description, and price for each product
            return AllNames.map((_, index) => ({
                name: AllNames[index].trim(),
                description: AllDescriptions[index].trim(),
                price: AllPrices[index].trim()
            }));
    }

    async removeProductFromCart() {
        await this.page.locator(cartPageLocators.removeButton).first().click(); // remove first product in cart
    }

    async getNumberOfProductsInCart() {
        return await this.page.locator(cartPageLocators.productName).count(); // count and return number of product names in cart
    }




}