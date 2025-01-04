import { type Locator, type Page } from '@playwright/test';

export class TopNavBarComponent {
  
  readonly page: Page
  readonly component: Locator

  constructor(page: Page) {
    this.page = page
    this.component = page.locator('#top_page')  // ajouter un testid topNavBar
  }

  async expectBasketToBeEmpty() {

  }

  async expectBasketToContainProducts() {
    
  }

}