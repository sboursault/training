import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/{api,e2e}/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:8000',
  },
})
