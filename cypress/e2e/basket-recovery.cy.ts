import cataloguePage from "../support/pages/catalogue.page"

describe('Basket discovery', () => {

  beforeEach(() => {
    // login
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()
    // clear basket
    cy.request('/api/baskets')
      .then(response => cy.getCookie('csrftoken')
        .then(csrftoken => {
          cy.request({
            method: 'DELETE',
            url: response.body[0].url,
            headers: {
              'X-CSRFToken': csrftoken.value
            }
          })
        })
      )
    // logout
    cy.visit('/accounts/logout')
  })

  specify('After login, the mini basket contains the items from my last session', () => {
    // add product as a logged user
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()

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

  specify('After login, the basket also contain the items I added as an anonymous user', () => {
    cy.visit('/')
    cataloguePage.addProductToBasket(208)

    // when i log in
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()

    // then
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })

  specify('After logout, the mini basket is empty', () => {
    // add product as a logged user
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()

    cataloguePage.addProductToBasket(208)

    // logout
    cy.visit('/accounts/logout')

    // then
    cataloguePage.displayMiniBasket()
    cataloguePage.getMiniBasket().should('contain.text', 'Your basket is empty')
  })

  specify('After login, the mini basket contains both the items from my last session and those from my current basket', () => {
    // add product as a logged user
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()

    cataloguePage.addProductToBasket(208)

    // logout
    cy.visit('/accounts/logout')

    cataloguePage.addProductToBasket(206)

    // login
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()

    // then
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(2)')
  })

})