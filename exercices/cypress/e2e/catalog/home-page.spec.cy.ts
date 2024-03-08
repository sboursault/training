describe('home-page', () => {
  specify('the home page title contains "All products"', () => {
      cy.visit('/')
      cy.title().should('equals', 'All products | Simple commerce')
  })
})