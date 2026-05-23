import {Page,Locator, expect} from '@playwright/test'

export default class AddToCartPage {


constructor(private page : Page)
  {  
  }
    async addProductById(productId: string) 
    {
 const product = this.page.locator(`a[data-product-id="${productId}"]`).first();
 await product.hover();
 await product.click();
 await this.page.waitForSelector('#cartModal', {state: 'visible'})
    }
   
    async continueShopping()
    {
        await this.page.getByRole('button', { name: 'Continue Shopping'}).click();
        await this.page.waitForTimeout(500);
    }
    async goToCart()
    {

        await this.page.goto('/view_cart', {waitUntil: 'domcontentloaded'})
    }

    async verifyCartHasProducts()
    {

        await expect(this.page.locator('tbody tr')).toHaveCount(3);
    }

    async deleteProductById(productId: string)

    {
   
        await this.page.locator(`tr#product-${productId} a.cart_quantity_delete`).click();
    }

    async proceedtoCheckout()
    {
        await this.page.locator('a.btn.btn-default.check_out').click();

    }

    async payAndConfirmOrder(payment: any)
    {
        await this.page.locator('[data-qa="name-on-card"]').fill(payment.nameOnCard);
        await this.page.locator('[data-qa="card-number"]').fill(payment.cardNumber);
        await this.page.locator('[data-qa="cvc"]').fill(payment.cvc);
        await this.page.locator('[data-qa="expiry-month"]').fill(payment.expiryMonth);
        await this.page.locator('[data-qa="expiry-year"]').fill(payment.expiryYear);
        await this.page.locator('[data-qa="pay-button"]').click();
    }    
  }




      

   
    
    
