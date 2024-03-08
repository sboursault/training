import loginApi from "../api/login.api"
  
class SimpleCommerce {

  login(username: string, password: string) {
    loginApi.login(username, password)
  } 

  logout() {
    cy.clearCookie('sessionid')
  } 
}

export default new SimpleCommerce()
