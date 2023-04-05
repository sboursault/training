# simple-commerce-e2e

## pre-requis

- install node
- install vs code

## steps

### Project setup

- créer projet projet github 

- create ssh key to connect to github (nécessaire pour récupérer un projet privé et pour pusher)

```shell
ssh-keygen -t ed25519 -C "sboursault@protonmail.com"
cat ~/.ssh/id_ed25519.pub
```

- git clone using ssh

```shell
git clone git@github.com:sboursault/simple-commerce-e2e.git
cd simple-commerce-e2e/
echo node_modules > .gitignore
code .
```

- install cypress

From https://docs.cypress.io/guides/getting-started/installing-cypress
and https://docs.cypress.io/guides/getting-started/opening-the-app

```shell
npm install cypress --save-dev
npx cypress open
```

- install typescript

From https://docs.cypress.io/guides/tooling/typescript-support
and https://docs.cypress.io/guides/references/configuration

```shell
npm install --save-dev typescript
```
Create `tsconfig.json` inside the `cypress` folder
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"]
  },
  "include": ["**/*.ts"]
}
```
Replace cypress config in `cypress.config.js` by `cypress.config.ts`

```ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8000',
  },
})
```

New:
  - Configure a cypress project with typescript


### First tests

- create the first test : add-to-basket.cy.ts or mini-basket.cy

Specifications:  
  - mini basket shows the product
  - basket amount is displayed
  - number of produts in basket is displayed

Create the spec file from the dashboad.

```ts
describe('Mini-basket', () => {
  it('shows the number of products in basket', () => {
    cy.visit('/')
    cy.get('[data-test-id=product-pod-add-button-209]').click()
    cy.get('.basket-mini').contains('Basket (1)')
  })
})
```

Elaborate with negative case

```ts
describe('Mini-basket', () => {
  beforeEach(() =>   cy.visit('/'))
  describe('when empty', () => {
    it('doesn\'t show the number of products in basket', () => {
      cy.get('.basket-mini').contains(/Basket $/)
    })
  })
  it('shows the number of products in basket', () => {
    cy.get('[data-test-id=product-pod-add-button-209]').click()
    cy.get('.basket-mini').contains('Basket (1)')
  })
})
```

New:
  - Cypress runner with execution logs and chrome inspector
  - Mocha api (before, beforeEach, describe, it)
  - Cypress api (visit, get, contains, click)
  - CSS selectors based on class and data-test-id
  - Introduction to retryability (Timeout to find elements)
  - Introduction to test isolation (basket is automatically emptied betwin tests)

### Test with Api

- Verify basket amount with api
  - 1 product with qtty 1 and another with qtty 2
  - voucher ?
