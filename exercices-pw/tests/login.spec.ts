import { url as cataloguePageUrl } from './../support/page-object/catalogue.page';
import { test, expect } from '../support/fixtures'

test.describe('Login', () => {
  test('The login accepts valid credentials', async ({ page, loginPage, topNavBar }) => {
    await loginPage.goto()
    await loginPage.fill('tom@test.com', 'tom@test.com')
    await page.pause()
    await loginPage.submit()
    await expect(page).toHaveURL(cataloguePageUrl);
    await expect(topNavBar.component).toContainText('tom@test.com')
  })

  test('It shows an error on invalid password', async ({ loginPage, topNavBar }) => {
    await loginPage.goto()
    await loginPage.fill('tom@test.com', 'zut')
    await loginPage.submit()
    await expect(loginPage.form).toContainText('Saisissez un nom d’utilisateur et un mot de passe valides')
    await expect(topNavBar.component).not.toContainText('tom@test.com')
  })
})

// ajouter test-id 
// - sur les input text pour le login
// - sur la top nav bar
