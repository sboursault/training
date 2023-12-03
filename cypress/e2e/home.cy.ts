describe('home', () => {
    specify('the home page title is "Tous les produits"', () => {
        cy.visit('/')
        cy.title().should('equal', 'All products | Simple commerce')
    })
})