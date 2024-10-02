import { test, expect } from '../support/fixtures'

test('For baskets strictly bellow 30€, we charge 7€ delivery fees', async ({
  catalogPage,
  basketPage,
}) => {
  await catalogPage.goto()
  await catalogPage.addProductToBasket(208)

  await basketPage.goto()
  await expect(basketPage.shippingChargeAmount).toContainText('7,00 €')
})

test('For baskets strictly over 30€, we offer delivery fees', async ({
  catalogPage,
  basketPage,
}) => {
  await catalogPage.goto()
  await catalogPage.addProductToBasket(208)
  await catalogPage.addProductToBasket(209)

  await basketPage.goto()
  await expect(basketPage.shippingChargeAmount).toContainText('0,00 €')
})

test('For 30€ baskets, we offer delivery fees', async ({
  productAdminApi,
  catalogPage,
  basketPage,
  productPage,
}) => {
  const productId = await productAdminApi.createProduct(30)
  await productPage.goto(productId)
  await productPage.addToBasket()
  
  await expect(catalogPage.miniBasketToggle).toContainText('(1)')

  await basketPage.goto()
  await expect(basketPage.shippingChargeAmount).toContainText('0,00 €')
})
