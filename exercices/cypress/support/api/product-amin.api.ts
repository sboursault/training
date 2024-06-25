class ProductAdminApi {

  private adminCredentials = btoa('superuser@example.com:testing')

  createProduct(price: string): Cypress.Chainable<string> {
    const slug = crypto.randomUUID();
    return cy.request(
      {
        method: 'POST',
        url: '/api/admin/products/',
        headers: {
          'Authorization': 'Basic ' + this.adminCredentials
        },
        body: {
          slug: slug,
          product_class: 'book',
          stockrecords: [
            {
              "partner_sku": slug,
              "price_currency": "EUR",
              "price": price,
              "num_in_stock": 100,
              "partner": "http://localhost:8000/api/admin/partners/3/"
            }
          ],
        }
      }).its('headers.location')
      .then(url => {
        const productId = url.split("/")[6]
        return cy.log(`Product ${productId} created`)
          .then(() => productId)
      })
  }
}


export default new ProductAdminApi()
