import { type Locator, type Page } from '@playwright/test'

export class BasketPage {
  readonly page: Page
  readonly shippingChargeAmount: Locator

  constructor(page: Page) {
    this.page = page
    this.shippingChargeAmount = page.getByTestId('checkout.shipping_charge.amount')
  }

  async goto() {
    await this.page.goto('/basket')
  }
}
