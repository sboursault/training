// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username: string, password: string) => {
  //cy.visit('/accounts/login/')
  //cy.get('#id_login-username').type(username)
  //cy.get('#id_login-password').type(password)
  //cy.get('button').contains('Log In').click()
  cy.request('POST', '/api/login/', { username: username, password: password })
})

Cypress.Commands.add('logout', () => {
  cy.getCookie('csrftoken')
    .then(csrftoken => {
      cy.request({
        method: 'DELETE',
        url: '/api/login/',
        headers: {
          'X-CSRFToken': csrftoken.value
        }
      })
    })
})
