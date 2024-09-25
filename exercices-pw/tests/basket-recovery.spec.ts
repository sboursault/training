import { test, expect } from '../support/fixtures'

test.describe('Basket recovery', () => {

  test.beforeEach(async ({ basketApi }) => {
    await basketApi.clearBasket('tom@test.com', 'tom@test.com')
  })

  test('After login, the mini basket contains the items from my last session', async ({
    page,
    loginApi,
    catalogPage,
  }) => {
    
    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await catalogPage.addProductToBasket(209)
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')

    await page.goto('/accounts/logout')
    await expect(catalogPage.miniBasketToggle).not.toContainText('(1)')

    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')
  })

  test('After logout, the mini basket is empty', async ({ page, loginApi, catalogPage }) => {
    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await catalogPage.addProductToBasket(209)
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')

    await page.goto('/accounts/logout')
    await expect(catalogPage.miniBasketToggle).not.toContainText('(1)')
  })

  test('After login, the basket contains the items I added as an anonymous user', async ({
    loginApi,
    catalogPage,
  }) => {
    await catalogPage.goto()
    await catalogPage.addProductToBasket(209)
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')

    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')
  })

  test('After login, the basket contains both the items from my last session and those from my current basket', async ({
    page,
    loginApi,
    catalogPage,
  }) => {
    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await catalogPage.addProductToBasket(209)
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')

    await page.goto('/accounts/logout')
    await expect(catalogPage.miniBasketToggle).not.toContainText('(1)')

    await catalogPage.addProductToBasket(208)
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')

    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await expect(catalogPage.miniBasketToggle).toContainText('(2)')
  })
})

