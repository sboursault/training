class ProductAdminApi {

  private adminCredentials = btoa('superuser@example.com:testing')

  createProduct(price: string): Cypress.Chainable<string> {
    return cy.request(
      {
        method: 'POST',
        url: '/api/admin/products/',
        headers: {
          'Authorization': 'Basic ' + this.adminCredentials
        },
        body: {
          slug: randomString(10),
          product_class: 'book',
          stockrecords: [
            {
              "partner_sku": randomString(10),
              "price_currency": "EUR",
              "price": price,
              "num_in_stock": 100,
              "partner": "http://localhost:8000/api/admin/partners/3/"
            }
          ],
        }
      }).its('headers.location')
      .then(url => url.replace('/admin', ''))
  }
}

function randomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default new ProductAdminApi()
