import basketApi from "../support/api/basket.api"

describe('Order amount', () => {

  before(() => { })

  beforeEach(() => { })

  specify(
    "Basket amount equals the sum of (product price x quantity) for each basket entries", () => {

      basketApi.addProduct(2, '/api/products/208/') // 23.99€
      basketApi.addProduct(3, '/api/products/203/') // 12.99

      basketApi.getBasket().then(basket => {
        expect(basket.total_incl_tax).to.equal("86.95")
      })

    })

  describe("Over 30€, the 7€ delivery fees are offered", () => {
    specify("Basket amount bellow 30€", () => {

      basketApi.addProduct(1, '/api/products/208/') // 23.99€

      basketApi.getShippingMethod().its('price.incl_tax').should('equal', '7.00')

    });

    specify("Basket amount over 30€", () => {

      basketApi.addProduct(3, '/api/products/203/') // 12.99

      basketApi.getShippingMethod().its('price.incl_tax').should('equal', '0.00')

    });
  });

})