import { expect, type Locator, type Page } from '@playwright/test'
import { url as catalogPageUrl } from './catalogue.page'

export class LoginPage {
  readonly page: Page
  readonly form: Locator
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly submitButton: Locator

  constructor(page: Page) {
    this.page = page
    this.form = page.locator('#login_form')
    this.usernameInput = page.locator('input[name=login-username]')
    this.passwordInput = page.locator('input[name=login-password]')
    this.submitButton = page.locator('button[name=login_submit]')
  }

  async goto() {
    await this.page.goto('/accounts/login/')
  }

  async fill(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
  }

  async submit() {
    await this.submitButton.click()
  }

  async login(username: string, password: string) {
    await this.fill(username, password)
    await this.submit()
    await expect(this.page).toHaveURL(catalogPageUrl);
  }
}
