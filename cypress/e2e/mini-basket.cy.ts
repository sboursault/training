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
  
  it('always shows the number of products in basket', () => {
    cataloguePage.addProductToBasket(209)
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })
  
  it('shows the basket entry details', () => {
    cataloguePage.addProductToBasket(209)
    cataloguePage.displayMiniBasket()
    cataloguePage.getMiniBasket()
      .should('contain.text', "The shellcoder's handbook")
      .and('contain.text', "Qty 1")
      .and('contain.text', "€9.99")
  })
})
