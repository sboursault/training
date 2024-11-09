import { test, expect } from '../support/fixtures'

test.describe('Mini-basket', () => {
  test.describe('Toggle', () => {
    test('The mini-basket always shows the number of products in basket', async ({ catalogPage }) => {
      await catalogPage.goto()
      await catalogPage.addProductToBasket(209)
      await expect(catalogPage.miniBasketToggle).toContainText('(1)')
    })

    test("When empty, it doesn't show the number of products in basket", async ({ catalogPage }) => {
      await catalogPage.goto()
      await expect(catalogPage.miniBasketToggle).toHaveText(/\s*Panier\s*/)
    })
  })

  test.describe('Detail', () => {
    test('It contains basket entries (with prodcut name, quantity and price)', async ({ catalogPage }) => {
      await catalogPage.goto()
      await catalogPage.addProductToBasket(209)
      await catalogPage.openMiniBasket()
      await expect(catalogPage.miniBasketDetail).toContainText("The shellcoder's handbook")
      await expect(catalogPage.miniBasketDetail).toContainText('9,99 €')
      await expect(catalogPage.miniBasketDetail).toContainText('Qté 1')
    })

    test('When empty, it informs the basket is empty', async ({ catalogPage }) => {
      await catalogPage.goto()
      await catalogPage.openMiniBasket()
      await expect(catalogPage.miniBasketDetail).toContainText('panier est vide')
    })
  })
})

// page objects and fixtures:
// https://playwright.dev/docs/pom
// https://playwright.dev/docs/test-fixtures
