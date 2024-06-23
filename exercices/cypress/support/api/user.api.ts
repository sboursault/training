
class UserApi {
  registerIfNotExists(username: string, password: string) {
    cy.request({
      method: "POST",
      url: "/api/register/",
      body: { email: username, password1: password, password2: password},
      failOnStatusCode: false
    }).then(response => {
      if (response.status === 400)
        cy.log(`registration failed - ${response.body}`)
      else
        expect(response.status).to.eq(201)
    });
  }

}

export default new UserApi();
