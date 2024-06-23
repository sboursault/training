import basketApi from "../../support/api/basket.api";
import userApi from "../../support/api/user.api";
import simpleCommerceApp from "../../support/page-object/simple-commerce.app";

describe("Order amount api", () => {
  
  const login = Cypress.env('user_login')
  const passwd = Cypress.env('user_passwd')

  beforeEach(() => {
    userApi.register(login, passwd)
    simpleCommerceApp.login(login, passwd)
    basketApi.clearBasket()
    simpleCommerceApp.logout()
  })
  
  specify('basket amount bellow 30€ -> delivery fees are charged 7€')
  specify('basket amount equals 30€ -> delivery fees are charged 7€')
  specify('basket amount over 30€ -> delivery fees offered')
});
