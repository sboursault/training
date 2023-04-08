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
    cy.get('[data-testid=product-pod-add-button-209]').click()
    cy.get('.basket-mini .dropdown-toggle').should('contain.text', '(1)')
  })
})
```

Elaborate with negative case

```ts
  beforeEach(() =>   cy.visit('/'))
  describe('when empty', () => {
    it('doesn\'t show the number of products in basket', () => {
      cy.get('.basket-mini .dropdown-toggle').should('not.contain.text', '(')
    })
  })
```
New:
  - Cypress runner with execution logs and chrome inspector
  - Mocha api (before, beforeEach, describe, it)
  - Cypress api (visit, get, click, should)
  - CSS selectors based on class and data-test-id
  - Introduction to retryability (Timeout to find elements)
  - Introduction to test isolation (basket is automatically emptied betwin tests)

### Fist tests in autonomy

Exercice :
- verify the mini-basket dropdown content :
  - it contains basket entries
  - it informs the user when the product is empty

```typescript
  it('informs the basket is empty', () => {
    cy.get('.basket-mini .dropdown-toggle')
      .click()
    cy.get('.dropdown-menu.show').should('contain.text', 'Your basket is empty')
  })
  it('shows the basket entry details', () => {
    cy.get('[data-testid=product-pod-add-button-209]').click()
    cy.get('.basket-mini .dropdown-toggle')
      .click()
    cy.get('.dropdown-menu.show')
      .then($miniBasket => {
        expect($miniBasket.text()).to.contain('The shellcoder\'s handbook')
        expect($miniBasket.text()).to.contain('Qty 1')
        expect($miniBasket.text()).to.contain('€9.99')
      })
  })
```

New:
  - User creates his first test in autonomy
  - Cypress api: then, expect

### Refactor with page object



## Elaborate

- not enough stock with intercept
- add test on getting back my mini basket after logging
- accelerate test with API
- verify basket amount based on products (api only !)

### Test with Api

- Verify basket amount with api
  - 1 product with qtty 1 and another with qtty 2
  - voucher ?
