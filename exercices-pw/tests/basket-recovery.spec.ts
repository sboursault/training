import { BasketApi } from '../support/api/basket.api'
import { test, expect } from '../support/fixtures'

test.describe('Basket recovery', () => {
  test('After login, the mini basket contains the items from my last session', async ({
    basketApi,
    page,
    loginPage,
    catalogPage,
  }) => {
    await basketApi.clearBasket('tom@test.com', 'tom@test.com')

    await loginPage.goto()
    await loginPage.login('tom@test.com', 'tom@test.com')
    await catalogPage.addProductToBasket(209)
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')

    await page.goto('/accounts/logout')
    await expect(catalogPage.miniBasketToggle).not.toContainText('(1)')

    await loginPage.goto()
    await loginPage.login('tom@test.com', 'tom@test.com')
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')
  })
})

/*
After login, the mini basket contains the items from my last session
After logout, the mini basket is empty
After login, the product also contain the items I added as an anonymous user
After login, the mini basket contains both the items from my last session and those from my current basket
*/

// cypress tips : ajout un tip sur les small checks intermédiaires
// bonne idée ; lancer les gens avec la partie test() + le plan du test en commentaire

// problème sur ce test avec plusieurs workers si on utilise le même login qu'ailleurs
// idée : au début, on ne configure qu'un worker,
// on passera à undefined quand on passera sur l'isolation des tests
// on bien on crée simplement des tests avec des users différents (c'est la bonne pratique)
