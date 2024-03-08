import cataloguePage from "../../support/page-object/catalogue.page"

describe('mini-basket', () => {

  beforeEach(() => {
    cy.visit('/')
  })

  describe('dropdown toggle', () => {
    it('always shows the number of products in basket', () => {
      cataloguePage.addProductToBasket(209)
      cataloguePage.miniBasketLink().should('contain.text', '(1)')
    })

    it("when empty, it doesn't show the number of products in basket", () => {
      cataloguePage.miniBasketLink().should('not.contain.text', '(')
    })
  })

  describe('detail', () => {
    
    it('contains basket entries (with product name, quantity and price)', () => {
      cataloguePage.addProductToBasket(209)
      cataloguePage.showMiniBasket()
      cataloguePage.miniBasket()      
        .should('contain.text', 'The shellcoder\'s handbook')
        .and('contain.text', 'Qty 1')
        .and('contain.text', '€9.99')
    })

    it("indicates when the basket is empty", () => {
      cataloguePage.showMiniBasket()
      cataloguePage.miniBasket()
        .should('contain.text', 'Your basket is empty')
    })
  })






})