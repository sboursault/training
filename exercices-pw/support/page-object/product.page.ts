import { expect, type Locator, type Page } from '@playwright/test';

export const url: RegExp = /.*\/catalogue/

export class ProductPage {
  
  readonly page: Page
  readonly addToBasketButton: Locator

  constructor(page: Page) {
    this.page = page
    this.addToBasketButton = page.locator('button', {hasText: 'Ajouter au panier'})
  }

  async goto(productID: number) {
    await this.page.goto('/catalogue/_' + productID)
  }

  async addToBasket() {
    await this.addToBasketButton.click()
  }

}