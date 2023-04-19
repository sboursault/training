
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login with a user an password.
     * @example cy.login('joe@test.com', 'secret')
     */
    login(username: string, password: string)

    /**
     * Custom command to logout
     * @example cy.login('joe@test.com', 'secret')
     */
    logout()
  }
}

