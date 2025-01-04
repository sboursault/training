import { BrowserContext } from '@playwright/test'

export class LoginApi {
  readonly context: BrowserContext

  constructor(context: BrowserContext) {
    this.context = context
  }

  async login(username: string, password: string) {
    await this.context.request.post('/api/login/', {
      failOnStatusCode: true,
      data: { username, password },
    })
  }
}
