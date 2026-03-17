import { productPageLocators } from '../locators/productPageLocators';

export class ProductPage {

constructor(page) {
    this.page = page;
}

// Constructor to initialize the page object
async filterByNameAtoZ() {
    await this.page.selectOption(productPageLocators.filterDropdown, { value: 'az' });
}

async filterByNameZtoA() {
    await this.page.selectOption(productPageLocators.filterDropdown, { value: 'za' }); 
}

async filterByPriceLowToHigh() {
    await this.page.selectOption(productPageLocators.filterDropdown, { value: 'lohi' });
}

async filterByPriceHighToLow() {
    await this.page.selectOption(productPageLocators.filterDropdown, { value: 'hilo' }); 
}


//getters to retrieve product names and prices for assertions
async getProductNames() {
    return await this.page.locator(productPageLocators.productNames).allTextContents();
}

async getProductPrices() {
    const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
    
    //remove $ symbol and convert to float
    return prices.map(price => parseFloat(price.replace('$', '')));
}



}