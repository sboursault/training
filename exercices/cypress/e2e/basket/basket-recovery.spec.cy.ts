import basketApi from "../../support/api/basket.api"
import userApi from "../../support/api/user.api"
import cataloguePage from "../../support/page-object/catalogue.page"
import simpleCommerceApp from "../../support/page-object/simple-commerce.app"

describe('Basket recovery', () => {

  const login = Cypress.env('USER_LOGIN')
  const passwd = Cypress.env('USER_PASSWD')

  beforeEach(() => {
    userApi.registerIfNotExists(login, passwd)
    simpleCommerceApp.login(login, passwd)
    basketApi.clearBasket()
    simpleCommerceApp.logout()
  })

  it('After login, the basket contains the items from my last session',
    () => {
      simpleCommerceApp.login(login, passwd)
      basketApi.addProduct(208)
      simpleCommerceApp.logout()
      
      simpleCommerceApp.login(login, passwd)
      cy.visit('/')
      cataloguePage.miniBasketLink().should("contain.text", "(1)");
    }
  )

  it('After login, the product also contain the items I added as an anonymous user', () => {
    basketApi.addProduct(209)
    simpleCommerceApp.login(login, passwd)
    cy.visit('/')
    cataloguePage.miniBasketLink().should('contain.text', '(1)')
  })

  it('After logout, the mini basket is empty', () => {
    simpleCommerceApp.login(login, passwd)
    basketApi.addProduct(208)
    simpleCommerceApp.logout()
    cy.visit('/')
    cataloguePage.miniBasketLink().should('not.contain.text', '(')
  })

  it('After login, the mini basket contains both the items from my last session and those from my current basket',
  () => {
    simpleCommerceApp.login(login, passwd)
    basketApi.addProduct(209)
    simpleCommerceApp.logout()

    basketApi.addProduct(208)

    simpleCommerceApp.login(login, passwd)
    cy.visit('/')
    cataloguePage.miniBasketLink().should('contain.text', '(2)')
  })
})
