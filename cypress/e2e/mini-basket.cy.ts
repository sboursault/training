import cataloguePage from "../support/pages/catalogue.page"

describe('Mini-basket', () => {
  
  beforeEach(() =>   cy.visit('/'))
  
  describe('When empty', () => {
  
    it('doesn\'t show the number of products in basket', () => {
      cataloguePage.getMiniBasketDisplayToggle().should('not.contain.text', '(')
    })
  
    it('informs the basket is empty', () => {
      cataloguePage.displayMiniBasket()
      cataloguePage.getMiniBasket().should('contain.text', 'Your basket is empty')
    })
  })
  
  it('shows the number of products in basket', () => {
    cataloguePage.addProductToBasket(209)
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })
  
  it('shows the basket entry details', () => {
    cataloguePage.addProductToBasket(209)
    cataloguePage.displayMiniBasket()
    cataloguePage.getMiniBasket()
      .then($miniBasket => {
        expect($miniBasket.text()).to.contain('The shellcoder\'s handbook')
        expect($miniBasket.text()).to.contain('Qty 1')
        expect($miniBasket.text()).to.contain('€9.99')
      })
  })
})
