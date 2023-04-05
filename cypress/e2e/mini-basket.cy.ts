describe('Mini-basket', () => {
  beforeEach(() =>   cy.visit('/'))
  describe('when empty', () => {
    it('doesn\'t show the number of products in basket', () => {
      cy.get('.basket-mini').contains(/Basket $/)
    })
  })
  it('shows the number of products in basket', () => {
    cy.get('[data-test-id=product-pod-add-button-209]').click()
    cy.get('.basket-mini').contains('Basket (1)')
  })
})
