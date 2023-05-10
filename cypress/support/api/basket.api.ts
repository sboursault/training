class BasketApi {

  clearBasket(credentials: string) {
    cy.request({
      method: 'DELETE',
      url: '/api/basket',
      headers: {
        'Authorization': 'Basic ' + btoa(credentials)
      }
    })
  }

  getBasket(): Cypress.Chainable<BasketResource> {
    return cy.request('GET', '/api/basket/').its('body')
  }

  addProduct(quantity: number, productUrl: string) {
    cy.request('POST', '/api/basket/add-product/',
      {
        url: productUrl,
        quantity
      })
  }

  getShippingMethods(): Cypress.Chainable<ShippingMethodResource[]> {
    return cy.request('GET', '/api/basket/shipping-methods/').its('body')
  }

  getShippingMethod(): Cypress.Chainable<ShippingMethodResource> {
    return cy
      .request('GET', '/api/basket/shipping-methods/')
      .its('body')
      .should('have.length', 1)
      .its(0)
  }
}

class BasketResource {
  total_incl_tax: string
}

class ShippingMethodResource {
  price: ShippingMethodPriceResource
}

class ShippingMethodPriceResource {
  incl_tax: string
}

export default new BasketApi()
