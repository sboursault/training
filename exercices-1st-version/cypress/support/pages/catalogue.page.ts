class CataloguePage {
  
  addProductToBasket(productId: number) {
    cy.get(`[data-testid=product-pod-add-button-${productId}]`).click()
  }

  getMiniBasket() {
    return cy.get('.dropdown-menu.show')
  }

  displayMiniBasket() {
    this.getMiniBasketDisplayToggle().click()
  }
  
  getMiniBasketDisplayToggle() {
    return cy.get('.basket-mini .dropdown-toggle')
  }

}

export default new CataloguePage()
