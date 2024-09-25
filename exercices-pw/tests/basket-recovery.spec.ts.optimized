import { LoginApi } from './../support/api/login.api';
import { test, expect } from '../support/fixtures'

test.describe('Basket recovery', () => {
  test.setTimeout(10000)
  test.beforeEach(async ({ basketApi }) => {
    await basketApi.clearBasket('tom@test.com', 'tom@test.com')
  })

  test('After login, the mini basket contains the items from my last session', async ({
    page,
    loginPage,
    loginApi,
    catalogPage,
  }) => {
    
    //await loginPage.goto()
    //await loginPage.login('tom@test.com', 'tom@test.com')
    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await catalogPage.addProductToBasket(209)
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')

    await page.goto('/accounts/logout')
    await expect(catalogPage.miniBasketToggle).not.toContainText('(1)')

    //await loginPage.goto()
    //await loginPage.login('tom@test.com', 'tom@test.com')
    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')
  })

  test('After logout, the mini basket is empty', async ({ page, loginApi, catalogPage }) => {
    //await loginPage.goto()
    //await loginPage.login('tom@test.com', 'tom@test.com')
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

    // await loginPage.goto()
    // await loginPage.login('tom@test.com', 'tom@test.com')
    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')
  })

  test('After login, the basket contains both the items from my last session and those from my current basket', async ({
    page,
    loginApi,
    catalogPage,
  }) => {
    // await loginPage.goto()
    // await loginPage.login('tom@test.com', 'tom@test.com')
    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await catalogPage.addProductToBasket(209)
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')

    await page.goto('/accounts/logout')
    await expect(catalogPage.miniBasketToggle).not.toContainText('(1)')

    await catalogPage.addProductToBasket(208)
    await expect(catalogPage.miniBasketToggle).toContainText('(1)')

    // await loginPage.goto()
    // await loginPage.login('tom@test.com', 'tom@test.com')
    await loginApi.login('tom@test.com', 'tom@test.com')
    await catalogPage.goto()
    await expect(catalogPage.miniBasketToggle).toContainText('(2)')
  })
})

// cypress tips : ajout un tip sur les small checks intermédiaires
// bonne idée ; lancer les gens avec la partie test() + le plan du test en commentaire

// problème sur ce test avec plusieurs workers si on utilise le même login qu'ailleurs
// idée : au début, on ne configure qu'un worker,
// on passera à undefined quand on passera sur l'isolation des tests
// on bien on crée simplement des tests avec des users différents (c'est la bonne pratique)


/*
Problème sur ligne qui n'est pas trouvée 
await catalogPage.addProductToBasket(210)
- avec le mode ui, la liste des actions montre qu'on bloque sur cette ligne
  - plus compliqué avec le plugin vscode ?
- le timeout global ne semble pas pris en compte, il faut en mettre un sur l'action
  -   test.setTimeout(10000) ko
  - locator.click({ timeout: 10000 }) ok
  - qelle est la bonne pratique ?
    - définir actionTimeout et navigationTimeout au global semble être une bonne idée
  - je n'arrive pas définir le timeout pour la durée de chaque test, bizarre

*/

/*
api tests
intéressant : l'appel HTTP request.post n'est pas loggé dans la vue network.
Il semble que le contexte ne soit pas partagé.
https://playwright.dev/docs/api-testing#using-request-context
"Behind the scenes, request fixture will actually call apiRequest.newContext()."
Pour partager le context, il faut l'injecter dans le test:
context séparé : await request.post(...)
context partagé : await context.request.post(...)
Pour autant l'appel http n'est pas loggé en console web.
Comment obtenir le détail de l'appel ?

*/

/*
Comment débuggger ?
- avec point d'arret dans vs code, on peut inspecter l'état du navigateur
- "debugger" semble pas pratique
- obtenir le détail d'une requête : https://github.com/microsoft/playwright/issues/19177
  - à tester sur une requête GET en debug
*/

/*
gain de perf sur le premier test 
7.5s -> 5.2s
On a rien perdu en couverture, on a gagné on robustesse, et on a gagné en temps (5,2×100÷7,5: 30%)
Si vous vous dites que c'est bien mais pas fou, il faut rappeler qu'on est pas sur un setup très compliqué.
On pourrait gagner encore plus en définissant l'état du panier via api.
*/
