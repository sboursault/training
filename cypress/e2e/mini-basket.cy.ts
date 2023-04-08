describe('Mini-basket', () => {
  beforeEach(() =>   cy.visit('/'))
  describe('When empty', () => {
    it('doesn\'t show the number of products in basket', () => {
      cy.get('.basket-mini .dropdown-toggle').should('not.contain.text', '(')
    })
    it('informs the basket is empty', () => {
      cy.get('.basket-mini .dropdown-toggle')
        .click()
      cy.get('.dropdown-menu.show').should('contain.text', 'Your basket is empty')
    })
  })
  it('shows the number of products in basket', () => {
    cy.get('[data-testid=product-pod-add-button-209]').click()
    cy.get('.basket-mini .dropdown-toggle').should('contain.text', '(1)')
  })
  it('shows the basket entry details', () => {
    cy.get('[data-testid=product-pod-add-button-209]').click()
    cy.get('.basket-mini .dropdown-toggle')
      .click()
    cy.get('.dropdown-menu.show')
      .then($miniBasket => {
        expect($miniBasket.text()).to.contain('The shellcoder\'s handbook')
        expect($miniBasket.text()).to.contain('Qty 1')
        expect($miniBasket.text()).to.contain('€9.99')
      })
  })
})
