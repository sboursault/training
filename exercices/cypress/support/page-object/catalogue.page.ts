class CatalogPage {
  
  // components

  miniBasketLink() {
    return cy.get('.basket-mini .dropdown-toggle')
  }

  miniBasket() {
    return cy.get('.basket-mini .dropdown-menu')
  }

  topMenu() {
    return cy.get('nav#top_page')
  }


  // behaviours
  
  showMiniBasket() {
    this.miniBasketLink().click()
  }

  addProductToBasket(produtId: number) {
    cy.get(`[data-testid=product-pod-add-button-${produtId}]`).click()
  }

}

export default new CatalogPage()
