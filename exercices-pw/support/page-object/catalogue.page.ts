import { expect, type Locator, type Page } from '@playwright/test';

export const url: RegExp = /.*\/catalogue/

export class CataloguePage {
  
  readonly page: Page
  readonly miniBasketToggle: Locator
  readonly miniBasketDetail: Locator
  readonly topNavBar: Locator

  constructor(page: Page) {
    this.page = page
    this.miniBasketToggle = page.locator('.basket-mini .dropdown-toggle')
    this.miniBasketDetail = page.locator('.basket-mini .dropdown-menu')
    this.topNavBar = page.locator('.navbar')
  }

  async goto() {
    await this.page.goto('/')
  }

  async addProductToBasket(productId: number) {
    await this.page.getByTestId(`product-pod-add-button-${productId}`).click()
  }

  async openMiniBasket() {
    await this.miniBasketToggle.click()
  }

}