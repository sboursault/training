
class LoginApi {
  login(username: string, password: string) {
    cy.request({
      method: "POST",
      url: "/api/login/",
      body: { username, password },
    });
  }

  logout() {
    cy.getCookie("csrftoken").then((cookie) => {
      cy.request({
        method: "DELETE",
        url: "/api/login/",
        headers: {
          "X-CSRFToken": cookie.value,
        },
      });
    });
  }
}

export default new LoginApi();
