class LoginPage {
  
  // components

  loginForm() {
    return cy.get('#login_form')
  }

  // behaviours
  
  loginWith(username: string, password: string) {
    this.fillUsername(username)
      .fillPassword(password)
    cy.get('#login_form button').click()
  }
  
  fillUsername(value : string) {
    cy.get('#id_login-username').type(value)
    return this;
  }

  fillPassword(value : string) {
    cy.get('#id_login-password').type(value)
    return this;
  }
}

export default new LoginPage()