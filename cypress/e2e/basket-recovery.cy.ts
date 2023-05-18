import basketApi from "../support/api/basket.api"
import cataloguePage from "../support/pages/catalogue.page"

describe('Basket recovery', () => {

  beforeEach(() => {
    basketApi.clearBasket('mytest@test.com:simplepassword')
  })

  specify('After login, the mini basket contains the items from my last session', () => {
    // add product as a logged user
    cy.login('mytest@test.com', 'simplepassword')
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.addProductToBasket(208)

    // logout
    cy.logout()

    // when i log in again
    cy.login('mytest@test.com', 'simplepassword')

    // then
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })

  specify('After login, the basket also contain the items I added as an anonymous user', () => {
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.addProductToBasket(208)

    // when i log in
    cy.login('mytest@test.com', 'simplepassword')
    cy.visit('/catalogue/category/books_2/')
    // then
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })

  specify('After logout, the mini basket is empty', () => {
    // add product as a logged user
    cy.login('mytest@test.com', 'simplepassword')
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.addProductToBasket(208)

    // logout
    cy.logout()

    // then
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.displayMiniBasket()
    cataloguePage.getMiniBasket().should('contain.text', 'Your basket is empty')
  })

  specify('After login, the mini basket contains both the items from my last session and those from my current basket', () => {
    // add product as a logged user
    cy.login('mytest@test.com', 'simplepassword')
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.addProductToBasket(208)
    cy.logout()

    // add product as an anonymous user
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.addProductToBasket(206)

    cy.login('mytest@test.com', 'simplepassword')

    // then
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(2)')
  })

})