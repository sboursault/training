# simple-commerce-e2e
<br>

## Prerequisites

- install node (version ?)
- install vscode (or webstorm)
- git installed
- compte github configuré avec clé ssh

Avant la formation, prendre connaissance des motivations de l'aprenant.
Ses connaissances en git, html, css, js, typescript

<br>

## Project setup

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

---
👌 __WHAT WE'VE LEARNED__

- Configure a cypress project with typescript
---

<br>  

## First acceptance criterias' workshop: the mini-basket

**User story**
  
  > As a shopper,
  > I want to see my basket content in the mini-basket,
  > so that I quickly know the basket's content and amount.


**Workshop:** What could be the acceptance criterias for these story ?

_The trainer takes the role of the Product Owner, the participants are the testers. The must suggest acceptance criterias to the PO._
_The PO can kindly reject some criterias if he thinks they are not required right now. Example : displaying discounts..._

_Possible list:_
- _The mini basket always show the number of products in basket_
- _It contains basket entries (with prodcut name, quantity and price)_

_What if ?_
- _When empty, it doesn't show the number of products in basket_
- _When empty, it informs the basket is empty_

---
👌 __WHAT WE'VE LEARNED__

  - Write acceptance tests for a user story
  - Find edge cases with **what if** questions
---

<br>

## First tests

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

---
👌 __WHAT WE'VE LEARNED__

  - Cypress runner with execution logs and chrome inspector
  - Mocha api (before, beforeEach, describe, it)
  - Cypress api (visit, get, click, should)
  - CSS selectors based on class and data-test-id
  - Introduction to retryability (Timeout to find elements)
  - Introduction to test isolation (basket is automatically emptied betwin tests)
---

<br>

## Fist tests in autonomy

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

---
👌 __WHAT WE'VE LEARNED__
- User creates his first test in autonomy
---
👍 __WHAT WE PRACTICED__
- Cypress api: should, and
- Retryability
---

<br>

## Refactor with page object

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

---
👌 __WHAT WE'VE LEARNED__

  - Use page object to avoid code duplication and facilitate reading
  - Create a typescript object
  - Continuously polish your test code
---

<br>

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

Autre solution : présenter `intercept` uniquement en théorique
 - intéressant pour les SPA pour simuler une réponse spécifique
 - intéressant pour attendre le retour d'une requête

<br>

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

---
👍 __WHAT WE PRACTICED__
- Write acceptance tests for a user story
- Find edge cases
---
  
<br>

## 2nd test in autonomy

Exercice :
- Automate the accetance critera verification, _by priority order_

For now, we can create a new account manually (the email is not verified).

```typescript
describe('Basket discovery', () => {
    specify.skip('After login, the basket contains the items from my last session', () => {
      // TODO (in 1st since it's the more important)
    })
    specify.skip('After login, the basket also contain the items I added as an anonymous user', () => {
      // TODO
    })
    specify.skip('After logout, the basket is empty', () => {
      // TODO
    })
    specify.skip('After login, the basket contains both the items from my last session and those from my current basket', () => {
      // TODO
    })
})

```
A first version (not repeatable)

```typescript
  specify('After login, the basket contains the items from my last session', () => {
    // add product as a logged user
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()
    cataloguePage.addProductToBasket(208)
    
    // logout
    cy.visit('/accounts/logout')

    // when i log in again
    cy.visit('/accounts/login/')
    cy.get('#id_login-username').type('mytest@test.com')
    cy.get('#id_login-password').type('simplepassword')
    cy.get('button').contains('Log In').click()
    
    // then
    cataloguePage.getMiniBasketDisplayToggle().should('contain.text', '(1)')
  })
```

How to make this repeatable ?
We want go back to a known state at the beginning of the test.
- let's clear the basket at the beginning (simpler, let's choose this option)
- We could also create a new user for the test (better because we know more depend on an existing user)

How can we clear the basket ?
- we can go the basket page and delete each basket entries
- or we can call the api to clear the basket

_The trainer shows how to use the `request` command._

```typescript
  cy.request('/api/baskets')
    .then(response => cy.getCookie('csrftoken')
      .then(csrftoken => {
        cy.request({
          method: 'DELETE',
          url: response.body[0].url,
          headers: {
            'X-CSRFToken': csrftoken.value
          }
        })
      })
    )
```

---
👌 __WHAT WE'VE LEARNED__

  - Automate by priority order
  - Introduction to test isolation (I'm logged out at the biginning of each test)
  - Repatability: go back to a known state at the beginning of the test
---

<br>

## Simplify test with custom commands

_The trainer shows how to create a `login` custom command, the learner repeats with `logout` and `clearBasket`._

Let's polish our test with a login command.

https://on.cypress.io/custom-commands
https://docs.cypress.io/guides/tooling/typescript-support#Using-an-External-Typings-File



```typescript
// support/cypress.d.ts
declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to login with a user an password.
     * @example cy.login('joe@test.com', 'secret')
     */
    login(username: string, password: string)

    /**
     * Custom command to logout
     * @example cy.login('joe@test.com', 'secret')
     */
    logout()
  }
}

// support/commands.ts
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('/accounts/login/')
  cy.get('#id_login-username').type(username)
  cy.get('#id_login-password').type(password)
  cy.get('button').contains('Log In').click()
})

Cypress.Commands.add('logout', () => {
  cy.visit('/accounts/logout')
})
```

Exercice: create a clearBasket command


---
👌 __WHAT WE'VE LEARNED__
- Cypress: custom command
- Optimize tests with `cy.request()`
- typescrypt: optional parameters (the password can be generic e.g 'simplepassword')

---
💪 __EXTRA__

We can add a test to verify the login: 
- login
- login with valid credentials
---

<br>

## Optimize test with api call

Let's refacator the login command to use apis instead of the UI.

_The trainer gives examples of api requests (using curl) to login and logout._

```typescript
Cypress.Commands.add('login', (username: string, password: string) => {
  cy.request('POST', '/api/login/', { username: username, password: password })
})
// don't forget to add cy.visit('/') to reload the page after logging in
```

On my machine, from 24 seconds with ui login vs 11 seconds with api login.

---
👌 __WHAT WE'VE LEARNED__

- A REFORMULER: More robust tests with api calls (apis are less prone to change)
- A REFORMULER: les tests passent moins au rouge pour des raisons de changements d'UI autre que ce qui est testée
- Faster tests with api call
---
👍 __WHAT WE PRACTICED__
- Cypress api `request` behaves like if the browser made the request
---
💪 __EXTRA__

Rewrite the `logout` command.

```typescript
Cypress.Commands.add('logout', () => {
  cy.getCookie('csrftoken')
    .then(csrftoken => {
      cy.request({
        method: 'DELETE',
        url: '/api/login/',
        headers: {
          'X-CSRFToken': csrftoken.value
        }
      })
    })
})
```
chrono: 9 seconds on my machine

---


<br>

## Elaborate

- Optimize login with api calls `cy.request()` see https://groups.google.com/g/django-oscar/c/qxOXbmu54-U
- Check cypress doc more offten
- not enough stock with intercept
- verify basket amount based on products (api only !)
- more on getting tests repeatable
  - create the user if it doesn't exist (using api)
- test the user creation
- test a single page application
- run cypress in cicd
  - env variables to change baseUrl or password

- prévoir BEAUCOUP d'exercices en plus
  - change languages
  - what if I'm french, or english ?
  - mobile tests - only if they are interested in the subject
    - change dimensions and user agent
    - page objects adaptation and dependency injection ?
      - https://github.com/typestack/typedi
    - mobile or desktop specific tests
  - ?

- automation pitfalls
  lister les points de Joe C. sous la forme d'une fiche à emporter.

<br>

## Test with Api

- Verify basket amount with api
  - 1 product with qtty 1 and another with qtty 2
  - voucher ?
- execution order, then and expect


Déploiement : 
- serverless containers sur scaleway
- google cloud run
- knative ovh cloud (paraît compliqué: commande kubectl)