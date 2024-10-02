import { ProductAdminApi } from './api/basket-admin.api';
import { test as base } from '@playwright/test'
import { CataloguePage } from './page-object/catalogue.page'
import { LoginPage } from './page-object/login.page'
import { TopNavBarComponent } from './page-object/top-nav-bar.component'
import { BasketApi } from './api/basket.api'
import { LoginApi } from './api/login.api'
import { BasketPage } from './page-object/basket.page'
import { ProductPage } from './page-object/product.page'

type MyFixtures = {
  basketApi: BasketApi
  loginApi: LoginApi
  productAdminApi: ProductAdminApi
  catalogPage: CataloguePage
  productPage: ProductPage
  loginPage: LoginPage
  topNavBar: TopNavBarComponent
  basketPage: BasketPage
}

export const test = base.extend<MyFixtures>({
  basketApi: async ({request}, use) => {
    await use(new BasketApi(request))
  },
  loginApi: async ({context}, use) => {
    await use(new LoginApi(context))
  },
  productAdminApi: async ({request}, use) => {
    await use(new ProductAdminApi(request))
  },
  catalogPage: async ({ page }, use) => {
    // Set up the fixture
    const todoPage = new CataloguePage(page)

    // Use the fixture value in the test
    await use(todoPage)

    // Clean up the fixture
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page))
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page))
  },
  topNavBar: async ({ page }, use) => {
    await use(new TopNavBarComponent(page))
  },
  basketPage: async ({ page }, use) => {
    await use(new BasketPage(page))
  },
})

export { expect } from '@playwright/test'
