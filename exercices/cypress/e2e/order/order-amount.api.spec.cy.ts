import basketApi from "../../support/api/basket.api";
import loginApi from "../../support/api/login.api";
import productAminApi from "../../support/api/product-amin.api";
import userApi from "../../support/api/user.api";
import cataloguePage from "../../support/page-object/catalogue.page";
import simpleCommerceApp from "../../support/page-object/simple-commerce.app";

describe("Order amount api", () => {

  const login = Cypress.env('user_login')
  const passwd = Cypress.env('user_passwd')

  before(() => {
    userApi.registerIfNotExists(login, passwd)
  })

  specify('basket amount bellow 30€ -> delivery fees are charged 7€', () => {
    simpleCommerceApp.login(login, passwd)
    basketApi.clearBasket()
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.addProductToBasket(208)
    cy.visit('/basket')
    cy.get('[data-testid="checkout.shipping_charge.amount"]').should('contain', '7.00')
  })

  specify('basket amount over 30€ -> delivery fees are charged 7€', () => {
    simpleCommerceApp.login(login, passwd)
    basketApi.clearBasket()
    cy.visit('/catalogue/category/books_2/')
    cataloguePage.addProductToBasket(208)
    cataloguePage.addProductToBasket(208)
    cy.visit('/basket')
    cy.get('[data-testid="checkout.shipping_charge.amount"]').should('contain', '0.00')
  })

  specify.only('basket amount equals 30€ -> delivery fees offered', () => {
    productAminApi.createProduct('30.00').then(productid => {
      cy.visit(`/catalogue/_${productid}/`)
    })
    cy.get('#add_to_basket_form button').click()
    cy.visit('/basket')
    cy.get('[data-testid="checkout.shipping_charge.amount"]').should('contain', '0.00')
  })
});
