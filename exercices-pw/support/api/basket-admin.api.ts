import { APIRequestContext } from '@playwright/test'

export class ProductAdminApi {
  readonly request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }

  async createProduct(price: number): Promise<number> {
    const response = await this.request.post('/api/admin/products/', {
      failOnStatusCode: true,
      headers: {
        Authorization: 'Basic ' + btoa('superuser@example.com:testing'),
      },
      data: {
        "slug": crypto.randomUUID(),
        "product_class": "book",
        "stockrecords": [
          {
            "partner": "/api/admin/partners/3/",
            "partner_sku": crypto.randomUUID(),
            "price_currency": "EUR",
            "price": price,
            "num_in_stock": 100
          }
        ]
      }
    })
    const body = await response.json()
    return body.id
  }
}
