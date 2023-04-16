import cataloguePage from "../support/pages/catalogue.page"

describe('Basket discovery', () => {

  specify('After login, the mini basket contains the items from my last session', () => {
    // add product as a logged user
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()

    CLEAR BASKET

    cataloguePage.addProductToBasket(208)
    
    // logout
    cy.visit('/accounts/logout')

    // when i log in again
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()

    // then
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })

  add the other tests

})