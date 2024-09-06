import { test as base } from '@playwright/test'
import { CataloguePage } from './page-object/catalogue.page'
import { LoginPage } from './page-object/login.page'
import { TopNavBarComponent } from './page-object/top-nav-bar.component'
import { BasketApi } from './api/basket.api'

type MyFixtures = {
  basketApi: BasketApi
  catalogPage: CataloguePage
  loginPage: LoginPage
  topNavBar: TopNavBarComponent
}

export const test = base.extend<MyFixtures>({
  basketApi: async ({request}, use) => {
    await use(new BasketApi(request))
  },
  catalogPage: async ({ page }, use) => {
    // Set up the fixture
    const todoPage = new CataloguePage(page)

    // Use the fixture value in the test
    await use(todoPage)

    // Clean up the fixture
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  topNavBar: async ({ page }, use) => {
    await use(new TopNavBarComponent(page))
  },
})

export { expect } from '@playwright/test'
