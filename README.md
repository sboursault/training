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

### First acceptance criterias' workshop: the mini-basket

**User story**
  
  > As a shopper,
  > I want to see my basket content in the mini-basket,
  > so that I quickly know the basket's content and amount.


**Workshop:** What could be the acceptance criterias for these story ?

The trainer takes the role of the Product Owner, the participants are the testers. The must suggest acceptance criterias to the PO.
The PO can kindly reject some criterias if he thinks they are not required right now. Example : displaying discounts...

Possible list:
- The mini basket always show the number of products in basket
- It contains basket entries (with prodcut name, quantity and price)

What if ?
- When empty, it doesn't show the number of products in basket
- When empty, it informs the basket is empty

**New:**
  - Write acceptance tests for a user story
  - Find edge cases

### First tests

The trainer writes and explains the first test. The spec file can be created from the dashboad.

```typescript
// mini-basket.cy.ts
describe('Mini-basket', () => {
  it('always shows the number of products in basket', () => {
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
**New:**
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
      .should('contain.text', "The shellcoder's handbook")
      .and('contain.text', "Qty 1")
      .and('contain.text', "€9.99")
  })
```

**New:**
  - User creates his first test in autonomy

**Repetition:**
  - Cypress api: should, and
  - Retryability

### Refactor with page object

Our test quickly becomes complex, and not so easy to read.
Let's rewrite it with a page object.

```typescript

// catalogue.page.ts

class CataloguePage {
  addProductToBasket(productId: number) {
    cy.get(`[data-testid=product-pod-add-button-${productId}]`).click()
  }
  getMiniBasket() {
    return cy.get('.dropdown-menu.show')
  }
  displayMiniBasket() {
    this.getMiniBasketDisplayToggle().click()
  }
  getMiniBasketDisplayToggle() {
    return cy.get('.basket-mini .dropdown-toggle')
  }
}
export default new CataloguePage()

// mini-basket.cy.ts

import cataloguePage from "../support/pages/catalogue.page"

describe('Mini-basket', () => {
  
  beforeEach(() =>   cy.visit('/'))
  
  describe('When empty', () => {
  
    it('doesn\'t show the number of products in basket', () => {
      cataloguePage.getMiniBasketDisplayToggle().should('not.contain.text', '(')
    })
  
    it('informs the basket is empty', () => {
      cataloguePage.displayMiniBasket()
      cataloguePage.getMiniBasket().should('contain.text', 'Your basket is empty')
    })
  })
  
  it('always shows the number of products in basket', () => {
    cataloguePage.addProductToBasket(209)
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })
  
  it('shows the basket entry details', () => {
    cataloguePage.addProductToBasket(209)
    cataloguePage.displayMiniBasket()
    cataloguePage.getMiniBasket()
      .should('contain.text', "The shellcoder's handbook")
      .and('contain.text', "Qty 1")
      .and('contain.text', "€9.99")
  })
})

```

**New:**
  - Use page object to avoid code duplication and facilitate reading
  - Create a typescript object
  - Continuously polish your test code


## Verify behavior by mocking server reponse

Ah bah non, ça ne marche pour l'ajout de produit sans stock.
C'est un rechargement de page complet, l'erreur 'no stock available' arrive avec le contenu de la page.

https://www.google.com/search?channel=fs&client=ubuntu&q=cypress+mock+api
page cypress pas si simple pour une première page de la doc cypress...
Reprendre les étapes précédentes, il faut se référer plus souvent à la doc cypress !

Cette étape demande beaucoup de préparation.
Elle est intéressante, mais dispensable.
Je préparerai à la fin.

On pourrait recoder le add product pour que l'opération soit en rest.
si erreur, on affiche les messages
si succès, on rafraichit la page ou bien juste le mini panier et les messages.
(utiliser une sorte de toggle si c'est possible)
Je crois comprendre que l'api reste peut être utilisée avec la session utilisateur
https://github.com/django-oscar/django-oscar-api/issues/137


## 2nd acceptance criterias workshop: basket recovery

**User story**
  
  > As a shopper,
  > I want to recover the basket from my previous session
  > so that I can prepare my order and validate in several times.

**Workshop:** What could be the acceptance criterias for these story ?

Possible list:
- After login, the mini basket contains the items from my last session
- After logout, the mini basket is empty
- After login, the product also contain the items I added as an anonymous user
- After login, the mini basket contains both the items from my last session and those from my current basket

What if ?
- there is not enough stock for a product: products are added anyway

**Repetition:**
  - Write acceptance tests for a user story
  - Find edge cases

## 2nd test in autonomy

Exercice :
- Automate the accetance critera verification, _by priority order_

```typescript
describe('Basket discovery', () => {
    specify.skip('After login, the mini basket contains the items from my last session', () => {
      // TODO (in 1st since it's the more important)
    })
    specify.skip('After login, the product also contain the items I added as an anonymous user', () => {
      // TODO
    })
    specify.skip('After logout, the mini basket is empty', () => {
      // TODO
    })
    specify.skip('After login, the mini basket contains both the items from my last session and those from my current basket', () => {
      // TODO
    })
})

```

**New:**
  - Automate by priority order
  - 
  - 


## Elaborate

- Check cypress doc more offten
- not enough stock with intercept
- add test on getting back my mini basket after logging
  - can be based on an existing user
  - how can we make this test repeatable ? (clear the basket before tests, create a new user...)
- accelerate test with API (login)
- verify basket amount based on products (api only !)
- more on getting tests repeatable
  - rewrite tests without initial data ?

- prévoir des exercices en plus
  - change languages
  - what if I'm french, or english ?
  - ?

- automation pitfalls
  lister les points de Joe C. sous la forme d'une fiche à emporter.

## Test with Api

- Verify basket amount with api
  - 1 product with qtty 1 and another with qtty 2
  - voucher ?
- execution order, then and expect
