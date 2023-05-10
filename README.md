# simple-commerce-e2e

<br>

compléter avec

- objectif
- durée

Add a word on flaky tests, bad practices, etc.
Ask for feedback all allong the training, and also at the end.



see the retryable parts here, debug, and others...
https://christianlydemann.com/the-most-common-cypress-mistakes/

## About this training

### Who is this training for?

Knowledge of git, and understanding a language programming will help
This training is for you if you want to discover how E2E tests can fit in development workflow.

You'll learn to how to write acceptance criterias, and how to verify these acceptance criterias with automized tests using Cypress.
You'll also learn how to write a maintanable tests suite, how reduce flakyness (must be defined), and how to keep a fast test suite.

### Prerequisites

- install node (version ?)
- install vscode (or webstorm)
- git installed
- compte github configuré avec clé ssh

Avant la formation, prendre connaissance des motivations de l'aprenant.
Ses connaissances en git, html, css, js, typescript

<br>

## Project setup

---

🧩 **PRIMARY OBJECTIVE**

- Know how to configure a cypress project with typescript

---

- create a github project

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
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
  },
});
```

---

👌 **WHAT WE'VE LEARNED**

- Configure a cypress project with typescript

---

<br>

## Verify a simple feature: Mini basket

### Acceptance criterias workshop

---

🧩 **PRIMARY OBJECTIVE**

- Know what acceptance criterias are, and how they fit in the development process
- Know how to automize tests with Cypress
- Know how to find info in the cypress doc
- Know how to improve maintanabitly with the Page Object pattern

---

_The trainer takes the role of the Product Owner, the participants are the testers. The must suggest acceptance criterias to the PO._
_The PO can show mockups or wireframes_
_The PO can kindly reject some criterias if he thinks they are not required right now. Example : displaying discounts..._

_Possible list:_

- _The mini basket always show the number of products in basket_
- _It contains basket entries (with prodcut name, quantity and price)_

_What if ?_

- _When empty, it doesn't show the number of products in basket_
- _When empty, it informs the basket is empty_

**User story**

> As a shopper,
> I want to see my basket content in the mini-basket,
> so that I quickly know the basket's content and amount.

**Workshop:** What could be the acceptance criterias for this story ?

<br>

### Automize verification with cypress

_The trainer writes and explains the tests for:_

- _always shows the number of products in basket_
- _doesn't show the number of products in basket_

_The spec file can be created from the dashboad._

```typescript
// mini-basket.cy.ts
describe("Mini-basket", () => {
  it("always shows the number of products in basket", () => {
    cy.visit("/");
    cy.get("[data-testid=product-pod-add-button-209]").click();
    cy.get(".basket-mini .dropdown-toggle").should("contain.text", "(1)");
  });
});
```

_Elaborate with negative case_

```ts
beforeEach(() => cy.visit("/"));
describe("when empty", () => {
  it("doesn't show the number of products in basket", () => {
    cy.get(".basket-mini .dropdown-toggle").should("not.contain.text", "(");
  });
});
```

_Then the trainee writes the tests to verify the mini-basket dropdown content:_

- _it contains basket entries_
- _it informs the user when the product is empty_

```typescript
it("informs the basket is empty", () => {
  cy.get(".basket-mini .dropdown-toggle").click();
  cy.get(".dropdown-menu.show").should("contain.text", "Your basket is empty");
});
it("shows the basket entry details", () => {
  cy.get("[data-testid=product-pod-add-button-209]").click();
  cy.get(".basket-mini .dropdown-toggle").click();
  cy.get(".dropdown-menu.show")
    .should("contain.text", "The shellcoder's handbook")
    .and("contain.text", "Qty 1")
    .and("contain.text", "€9.99");
});
```

<br>

### Refactor with page object

_Our test quickly becomes complex, and not so easy to read._
_Let's rewrite it with a page object._

```typescript
// catalogue.page.ts

class CataloguePage {
  addProductToBasket(productId: number) {
    cy.get(`[data-testid=product-pod-add-button-${productId}]`).click();
  }
  getMiniBasket() {
    return cy.get(".dropdown-menu.show");
  }
  displayMiniBasket() {
    this.getMiniBasketDisplayToggle().click();
  }
  getMiniBasketDisplayToggle() {
    return cy.get(".basket-mini .dropdown-toggle");
  }
}
export default new CataloguePage();

// mini-basket.cy.ts

import cataloguePage from "../support/pages/catalogue.page";

describe("Mini-basket", () => {
  beforeEach(() => cy.visit("/"));

  describe("When empty", () => {
    it("doesn't show the number of products in basket", () => {
      cataloguePage
        .getMiniBasketDisplayToggle()
        .should("not.contain.text", "(");
    });

    it("informs the basket is empty", () => {
      cataloguePage.displayMiniBasket();
      cataloguePage
        .getMiniBasket()
        .should("contain.text", "Your basket is empty");
    });
  });

  it("always shows the number of products in basket", () => {
    cataloguePage.addProductToBasket(209);
    cataloguePage.getMiniBasketDisplayToggle().should("contain.text", "(1)");
  });

  it("shows the basket entry details", () => {
    cataloguePage.addProductToBasket(209);
    cataloguePage.displayMiniBasket();
    cataloguePage
      .getMiniBasket()
      .should("contain.text", "The shellcoder's handbook")
      .and("contain.text", "Qty 1")
      .and("contain.text", "€9.99");
  });
});
```

_How E2E tests fits in the dev process?_

_User Story ➜ Acceptance criterias ➜ Automated tests ➜ Validates the new features ➜ Regression test suite AND living documentation_

---

👌 **WHAT WE'VE LEARNED**

- Cypress runner in action with execution logs and chrome inspector
- Mocha api (before, beforeEach, describe, it)
- Cypress api (visit, get, click, should, and)
- CSS selectors based on class and data-test-id
- Introduction to retryability (Timeout to find elements)
- Introduction to test isolation (basket is automatically emptied betwin tests)
- Use page object to avoid code duplication and facilitate reading
- Create a typescript object
- Continuously polish your test code

---

<br>

## Verify a more complex feature: Basket recovery

---

🧩 **PRIMARY OBJECTIVE**

- practice writing acceptance tests for a user story
- Find edge cases
- Write good acceptance tests: isolated (I'm logged out at the biginning of each test) and **repatable** (go back to a known state at the beginning of the test)
- Know how to improve maintanabitly with Cypress custom commands
- Know how to run test faster with api calls

---

EXERICE : quelles sont les qualités d'un bon test auto ?

- on peut faire l'exercice en début et et fin de module pour voir si tout a été trouvé

**User story**

> As a shopper,
> I want to recover the basket from my previous session
> so that I can prepare my order and validate in several times.

**Workshop:** What could be the acceptance criterias for this story ?

Possible list:

- After login, the mini basket contains the items from my last session
- After logout, the mini basket is empty
- After login, the product also contain the items I added as an anonymous user
- After login, the mini basket contains both the items from my last session and those from my current basket

What if ?

- there is not enough stock for a product: products are added anyway

Exercice :

- Automate the accetance critera verification, _by priority order_

For now, we can create a new account manually (the email is not verified).

```typescript
describe("Basket discovery", () => {
  specify.skip(
    "After login, the basket contains the items from my last session",
    () => {
      // TODO (in 1st since it's the more important)
    }
  );
  specify.skip(
    "After login, the basket also contain the items I added as an anonymous user",
    () => {
      // TODO
    }
  );
  specify.skip("After logout, the basket is empty", () => {
    // TODO
  });
  specify.skip(
    "After login, the basket contains both the items from my last session and those from my current basket",
    () => {
      // TODO
    }
  );
});
```

A first version (not repeatable)

```typescript
specify(
  "After login, the basket contains the items from my last session",
  () => {
    // add product as a logged user
    cy.visit("/accounts/login/");
    cy.get("#id_login-username").type("mytest@test.com");
    cy.get("#id_login-password").type("simplepassword");
    cy.get("button").contains("Log In").click();
    cataloguePage.addProductToBasket(208);

    // logout
    cy.visit("/accounts/logout");

    // when i log in again
    cy.visit("/accounts/login/");
    cy.get("#id_login-username").type("mytest@test.com");
    cy.get("#id_login-password").type("simplepassword");
    cy.get("button").contains("Log In").click();

    // then
    cataloguePage.getMiniBasketDisplayToggle().should("contain.text", "(1)");
  }
);
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
cy.request({
  method: 'DELETE',
  url: '/api/basket',
  headers: {
    'Authorization': 'Basic ' + btoa('mytest@test.com:simplepassword')
  }
})
```

<br>

### Simplify test with custom commands

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
    login(username: string, password: string);

    /**
     * Custom command to logout
     * @example cy.login('joe@test.com', 'secret')
     */
    logout();
  }
}

// support/commands.ts
Cypress.Commands.add("login", (username: string, password: string) => {
  cy.visit("/accounts/login/");
  cy.get("#id_login-username").type(username);
  cy.get("#id_login-password").type(password);
  cy.get("button").contains("Log In").click();
});

Cypress.Commands.add("logout", () => {
  cy.visit("/accounts/logout");
});
```

Exercice: create a clearBasket command
-> un peu null

<br>

### Optimize with api call

Let's refacator the login command to use apis instead of the UI.

_The trainer gives examples of api requests (using curl) to login and logout._

```typescript
Cypress.Commands.add("login", (username: string, password: string) => {
  cy.request("POST", "/api/login/", { username: username, password: password });
});
// don't forget to add cy.visit('/') to reload the page after logging in
```

On my machine, from 24 seconds with ui login vs 11 seconds with api login.

---

👍 **WHAT WE PRACTICED**

- Write acceptance tests for a user story
- Find edge cases

---

👌 **WHAT WE'VE LEARNED**

- Automate by priority order
- Introduction to test isolation (I'm logged out at the biginning of each test)
- Repatability: go back to a known state at the beginning of the test
- Cypress: custom command
- Optimize tests with `cy.request()`
- typescrypt: optional parameters (the password can be generic e.g 'simplepassword')
- Cypress api `request` behaves like if the browser made the request
- A REFORMULER: More robust tests with api calls (apis are less prone to change)
- A REFORMULER: les tests passent moins au rouge pour des raisons de changements d'UI autre que ce qui est testée
- Faster tests with api call

---

💪 **EXTRA**

We can add a test to verify the login:

- login
- login with valid credentials
- rewrite the `logout` command.

```typescript
Cypress.Commands.add("logout", () => {
  cy.getCookie("csrftoken").then((csrftoken) => {
    cy.request({
      method: "DELETE",
      url: "/api/login/",
      headers: {
        "X-CSRFToken": csrftoken.value,
      },
    });
  });
});
```

chrono: 9 seconds on my machine

---

## Api tests: Order amount

---

🧩 **PRIMARY OBJECTIVE**

- Know how to write api tests with Cypress
- Know how to add examples to explicit acceptance criterias

---

**Item**

> Basket amount:
> The basket amount should take into account the price and quantity of each entries.
> Order amount:
> Over 30€, the 7€ for delivery fees are offered.

**Workshop:** What could be the acceptance criterias for this item ?

Possible list:

- Basket amount equals the sum of `(product price x quantity)` of each basket entries
  - examples:
    - with 1 product A (23.99€) => 1 x 23.99 = 23.99€
    - with 2 products A (23.99€) and 3 product B (12.99€) => 2 x 23.99 + 3 x 12.99€ = 86.95€
- Over 30€, the 7€ delivery fees are offered
  - examples:
    - with 23.99€ => 23.99€ + 7 = 30.99€
    - with 86.95€ => 23.99€ + 0 = 86.95€

What if ?

- the baskount amount is exactly 30€?

```typescript
// cypress.config.ts
export default defineConfig({
  e2e: {
    specPattern: 'cypress/{api,e2e}/**/*.cy.{js,jsx,ts,tsx}',
  },
})
// api/order-amount.api.cy.ts
describe("Order amount", () => {
  before(() => {});

  beforeEach(() => {});

  specify(
    "Basket amount equals the sum of (product price x quantity) for each basket entries",
    () => {
      // with 2 products A (23.99€) and 3 product B (12.99€) => 2 x 23.99 + 3 x 12.99€ = 86.95€
    }
  );

  describe("Over 30€, the 7€ delivery fees are offered", () => {
    specify("Basket amount bellow 30€", () => {
      // with 23.99€ => 23.99€ + 7 = 30.99€
    });

    specify("Basket amount over 30€", () => {
      // with 86.95€ => 23.99€ + 0 = 86.95€
    });
  });
});
```

_The trainer shows how to encapsulate the basket clearing in an api client_

```typescript
// support/api/basket.api.ts
class BasketApi {
  clearBasket(credentials: string) {
    cy.request({
      method: 'DELETE',
      url: '/api/basket',
      headers: {
        'Authorization': 'Basic ' + btoa(credentials)
      }
    })
  }
}

export default new BasketApi();
```


_The trainee writes the test_

```typescript

describe('Order amount', () => {

  before(() => { })

  beforeEach(() => { })

  specify(
    "Basket amount equals the sum of (product price x quantity) for each basket entries", () => {

      cy.request('POST', '/api/basket/add-product/',
        {
          url: "/api/products/208/", // 23.99€
          quantity: 2
        })
      cy.request('POST', '/api/basket/add-product/',
        {
          url: "/api/products/203/", // 12.99€
          quantity: 3
        })

      cy.request('GET', '/api/basket/').then(response => {
        expect(response.body.total_incl_tax).to.equal("86.95")
      })

    })

  describe("Over 30€, the 7€ delivery fees are offered", () => {
    specify("Basket amount bellow 30€", () => {

      cy.request('POST', '/api/basket/add-product/',
      {
        url: "/api/products/208/", // 23.99€
        quantity: 1
      })

      cy.request('GET', '/api/basket/shipping-methods/').then(response => {
        expect(response.body[0].price.incl_tax).to.equal('7.00')
      })

    });

    specify("Basket amount over 30€", () => {

      cy.request('POST', '/api/basket/add-product/',
      {
        url: "/api/products/203/", // 12.99€
        quantity: 3
      })

      cy.request('GET', '/api/basket/shipping-methods/').then(response => {
        expect(response.body[0].price.incl_tax).to.equal('0.00')
      })
    });
  });

})

```

_The trainer shows the benefits of api tests_
- faster
  - allows to get feedback quicker
  - allows to run more test cases
- apis tend to change less offten than UI, making api tests easier to maintain

---

👍 **WHAT WE PRACTICED**



---

👌 **WHAT WE'VE LEARNED**

- How to write api tests
- How to debug tests with console logs and `debbuger`

---

💪 **EXTRA**

- Encapsulate api calls in api client objects (niveau ++)

```typescript
// support/api/basket.api.ts
class BasketApi {

  clearBasket() {
    // ...
  }

  getBasket(): Cypress.Chainable<BasketResource> {
    return cy.request('GET', '/api/basket/').its('body')
  }

  addProduct(quantity: number, productUrl: string) {
    cy.request('POST', '/api/basket/add-product/',
      {
        url: productUrl,
        quantity
      })
  }

  getShippingMethods(): Cypress.Chainable<ShippingMethodResource[]> {
    return cy.request('GET', '/api/basket/shipping-methods/').its('body')
  }

  getShippingMethod(): Cypress.Chainable<ShippingMethodResource> {
    return cy
      .request('GET', '/api/basket/shipping-methods/')
      .its('body')
      .should('have.length', 1)
      .its(0)
  }
}

class BasketResource {
  total_incl_tax: string
}

class ShippingMethodResource {
  price: ShippingMethodPriceResource
}

class ShippingMethodPriceResource {
  incl_tax: string
}

// api/order-amount.api.cy.ts
import basketApi from "../support/api/basket.api"

describe('Order amount', () => {

  before(() => { })

  beforeEach(() => { })

  specify(
    "Basket amount equals the sum of (product price x quantity) for each basket entries", () => {

      basketApi.addProduct(2, '/api/products/208/') // 23.99€
      basketApi.addProduct(3, '/api/products/203/') // 12.99

      basketApi.getBasket().then(basket => {
        expect(basket.total_incl_tax).to.equal("86.95")
      })

    })

  describe("Over 30€, the 7€ delivery fees are offered", () => {
    specify("Basket amount bellow 30€", () => {

      basketApi.addProduct(1, '/api/products/208/') // 23.99€

      basketApi.getShippingMethod().its('price.incl_tax').should('equal', '7.00')

    });

    specify("Basket amount over 30€", () => {

      basketApi.addProduct(3, '/api/products/203/') // 12.99

      basketApi.getShippingMethod().its('price.incl_tax').should('equal', '0.00')

    });
  });

})
```

- Create a 30€ product to verify the behavior on the exact threshold

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
  - add csrf verfication on apis ?

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

## How it fits in the dev process

### Benefits of automation testing

Some other benefits of automated testing are:

- Free testers up to focus on more exploratory-type testing
- Get fast feedback to your developer on failing checked in software
- Improved product quality

Warning: Don't underestimate the cost of maintaining automated test suites.

## Automation pitfalls

Not treating test code like production code ?

- Expecting automation testing to replace manual testers
- Underestimating the amount of time it takes to maintain your web app automation
- Automating all UI end-to-end journeys. Scripts should be **atomic** so that when they fail, you know why.
- Focusing on UI automation types of testing only
- Not having a controlled test environment
- Ignoring failing tests. If you notice a flaky test, refactor it to make it more reliable. Delete any tests that are not reliable and haven’t been fixed within a given time frame.
- Developers not making their code automatable
- Not using proper synchronization in your tests (handling waits)
- Not writing isoloted tests: you should be able to run your tests in any order.
- Not writing repeatable tests
- Not treating your automated code just like your production code.
  - tests should be simple (easy to read, and easy to modify)
  - There should be a whole team’s collaborative automation efforts (collective code ownership)
  - follow code best practices (KISS, DRY, Pair programming, code reviews)

## What Test Cases Should be Automated?

Test that focuses on the money areas of your application
Test that focuses on the risk areas of your application
Tests that need to run against different data sets
Tests that are hard to test manually.
Focus on critical paths of your application

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
