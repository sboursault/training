import cataloguePage from "../../support/page-object/catalogue.page"
import loginPage from "../../support/page-object/login.page"

describe('login', () => {

    beforeEach(() => {
      cy.visit('/accounts/login/')
    })

    it('accepts valid credentials', () => {
        loginPage.loginWith('tom@test.com', 'tom@test.com')
        cataloguePage.topMenu()
          .should('contain.text', 'tom@test.com')
    })

    it('shows an error on invalid password', () => {
        loginPage.loginWith('tom@test.com', 'tom@test.co')
        cataloguePage.topMenu()
          .should('contain.text', 'Account')
          .and('not.contain.text', 'tom@test.com')
        loginPage.loginForm()
          .should('contain.text', 'Oops! We found some errors')
    })

})