import { APIRequestContext } from '@playwright/test'

export class BasketApi {
  readonly request: APIRequestContext

  constructor(request) {
    this.request = request
  }

  async clearBasket(username: string, password:string) {
    const response = await this.request.get('/api/basket', {
        failOnStatusCode: true,
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password),
        },
      })
      const body = await response.json()
      await this.request.delete(body.url, {
        headers: {
          Authorization: 'Basic ' + btoa(username + ':' + password),
        },
      })
      /*await request
        .get('/api/basket', {
          failOnStatusCode: true,
          headers: {
            Authorization: 'Basic ' + btoa('tom@test.com:tom@test.com'),
          },
        })
        .then((response) => response.json())
        .then((body) =>
          request.delete(body.url, {
            headers: {
              Authorization: 'Basic ' + btoa('tom@test.com:tom@test.com'),
            },
          })
        )*/
  }
}
