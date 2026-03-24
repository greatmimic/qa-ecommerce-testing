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

// func to click cart
async clickOnCartLink(){
    await this.page.locator(productPageLocators.cartButton).click();
}

// add product
async addProductToCart() {
    await this.page.locator(productPageLocators.addRemoveCartButton).first().click();
}

// add all prodcuts
async addAllProductsToCart() {
    const addButton = await this.page.locator(productPageLocators.addRemoveCartButton);
    const count = await addButton.count();

    for(let i = 0; i < count; i++) {
        await addButton.nth(i).click();
    }
}

// add product by name
async addProductToCartByName(productName) {
    const productNames = await this.page.locator(productPageLocators.productNames).allTextContents(); // create list
    const addButtons = await this.page.locator(productPageLocators.addRemoveCartButton);
    const count = await addButtons.count();

    //iterate through list and find productName
    for(let i = 0; i < count; i++) {
        const productNameText = productNames[i];
        if(productNameText === productName) {
            await addButtons.nth(i).click();
            break;
        }
    }
}

// func to get first product desc.
async getFirstProductDescription() {

    const name = await this.page.locator(productPageLocators.productNames).first().textContent();
    const description = await this.page.locator(productPageLocators.productDescription).first().textContent();
    const price = await this.page.locator(productPageLocators.productPrices).first().textContent();

    return {
        name: name.trim(),
        description: description.trim(),
        price: price.trim()
    }
}

// func to get all product descriptions
async getAllProductDescriptions() {
    const AllNames = await this.page.locator(productPageLocators.productNames).allTextContents();
    const AllDescriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
    const AllPrices = await this.page.locator(productPageLocators.productPrices).allTextContents();

    //return dictionary of name, description, and price for each product
    return AllNames.map((_, index) => ({
        name: AllNames[index].trim(),
        description: AllDescriptions[index].trim(),
        price: AllPrices[index].trim()
    }));

}

// func to get specific product description by name
async getProductDescriptionByName(productName) {
    const AllNames = await this.page.locator(productPageLocators.productNames).allTextContents();
    const AllDescriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
    const AllPrices = await this.page.locator(productPageLocators.productPrices).allTextContents();

    //return dictionary of name, description, and price for each product
    const allProducts = AllNames.map((_, index) => ({
        name: AllNames[index].trim(),
        description: AllDescriptions[index].trim(),
        price: AllPrices[index].trim()
    }));

    return allProducts.filter(product => productName.includes(product.name));
}

}