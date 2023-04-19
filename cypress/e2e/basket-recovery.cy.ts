import cataloguePage from "../support/pages/catalogue.page"

describe('Basket discovery', () => {

  beforeEach(() => {
    cy.login('mytest@test.com', 'simplepassword')
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
    cy.logout()
  })

  specify('After login, the mini basket contains the items from my last session', () => {
    // add product as a logged user
    cy.login('mytest@test.com', 'simplepassword')
    cataloguePage.addProductToBasket(208)

    // logout
    cy.logout()

    // when i log in again
    cy.login('mytest@test.com', 'simplepassword')

    // then
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })

  specify('After login, the basket also contain the items I added as an anonymous user', () => {
    cy.visit('/')
    cataloguePage.addProductToBasket(208)

    // when i log in
    cy.login('mytest@test.com', 'simplepassword')

    // then
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })

  specify('After logout, the mini basket is empty', () => {
    // add product as a logged user
    cy.login('mytest@test.com', 'simplepassword')

    cataloguePage.addProductToBasket(208)

    // logout
    cy.logout()

    // then
    cataloguePage.displayMiniBasket()
    cataloguePage.getMiniBasket().should('contain.text', 'Your basket is empty')
  })

  specify('After login, the mini basket contains both the items from my last session and those from my current basket', () => {
    // add product as a logged user
    cy.login('mytest@test.com', 'simplepassword')
    cataloguePage.addProductToBasket(208)
    cy.logout()

    // add product as an anonymous user
    cataloguePage.addProductToBasket(206)

    cy.login('mytest@test.com', 'simplepassword')

    // then
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(2)')
  })

})