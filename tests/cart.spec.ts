import { test, expect} from '@playwright/test'
import AddToCartPage from '../pages/AddToCartPage'
import {items,payment} from '../testdata/addToCartPage.json'
//import {payment} from '../testdata/addToCartPage.json'

test('add items to cart after login', async ( { page}) => {

// Go To Products 

await page.goto('/products', {waitUntil: 'domcontentloaded'});
const cartPage = new AddToCartPage(page)

for (const item of items)
{
  console.log(`Adding: ${item.name}`)
  await cartPage.addProductById(item.productId)
  await cartPage.continueShopping();
}
 
  //await expect(page.locator('tr.cart_product')).toHaveCount(3);

})

test('View and Delete a item', async ( { page}) => {
  const cartPage = new AddToCartPage(page);
  // flow - go to cart
  await cartPage.goToCart() 
  //flow -verify cart has 3 products
await expect(page.locator('tbody tr')).toHaveCount(3)
  // flow - Delete one of the product
  await cartPage.deleteProductById('1')
// flow - validate the 2 products incarrt 
  await expect (page.locator('tbody tr')).toHaveCount(2)
 // await page.waitForTimeout(10000)

})

test('Place order and payment', async ( { page}) => {
  const cartPage = new AddToCartPage(page);
 
  //flow1 - go to cart and validate only 2 items exists
  await cartPage.goToCart();
  await expect(page.locator('tbody tr')).toHaveCount(2);

  //flow 2 - proceed to checkout
  await cartPage.proceedtoCheckout();

  // floww 3 - placeOrder
await page.locator('a[href="/payment"]').click();

//flow 4 - Fill Payment and confirm 
await cartPage.payAndConfirmOrder(payment);

//flow 5 - verify order placed

await expect(page.getByText('Order Placed')).toBeVisible();
await page.waitForTimeout(10000);
})





















// test.describe('PlaceOrder Test ...', () => {


// let AddToCartPage: AddToCartPage

// test.beforeEach(async  ( { page })  => {

//  AddToCartPage = new AddToCartPage(page)


// await expect()

//     })


//  test('viewcart', async ( { page })   => {

    

//   await page.getByRole('link', { name: 'View Cart' }).click();
//   await page.locator('#product-39 > .cart_delete > .cart_quantity_delete').click();
//   await page.locator('#product-39 > .cart_delete > .cart_quantity_delete').click();
//   await page.getByText('Proceed To Checkout').click();

//  })

//  test('placeorder', async ( { page })   => {

//  await page.getByRole('link', { name: 'Place Order' }).click();
//   await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
//   await page.locator('input[name="name_on_card"]').click();
//   await page.locator('input[name="name_on_card"]').fill('123');
//   await page.locator('input[name="card_number"]').click();
//   await page.locator('input[name="card_number"]').click();
//   await page.locator('input[name="card_number"]').fill('21312');
//   await page.getByRole('textbox', { name: 'ex.' }).click();
//   await page.getByRole('textbox', { name: 'ex.' }).fill('2312');
//   await page.getByRole('textbox', { name: 'ex.' }).press('Tab');
//   await page.getByRole('textbox', { name: 'MM' }).fill('23');
//   await page.getByRole('textbox', { name: 'MM' }).press('Tab');
//   await page.getByRole('textbox', { name: 'YYYY' }).fill('23423');
//   await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();
//   const downloadPromise = page.waitForEvent('download');
//   await page.getByRole('link', { name: 'Download Invoice' }).click();
//   const download = await downloadPromise;
//  })