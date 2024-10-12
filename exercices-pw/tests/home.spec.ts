import { test, expect } from '@playwright/test'

test('The home page title contains "All products', async ({ page }) => {
  await page.goto('/')
  expect(page).toHaveTitle(/\s*Tous les produits\s*/)
})
