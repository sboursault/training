import { BrowserContext } from '@playwright/test'

export class LoginApi {
  readonly context: BrowserContext

  constructor(context) {
    this.context = context
  }

  async login(username: string, password: string) {
    const response = await this.context.request.post('/api/login/', {
      failOnStatusCode: true,
      data: { username, password },
    })
    const body = await response.text
    console.log(body)
  }
}
