
# Training walkthrough

## Preparation

Before the training, it can help to have a call with each trainee to understand his motivations and his knowledge in tools like git, js or typescript. This will help to adapt the speech to the audience during the session.

The trainnee should come with a laptop with installed development tools:
- nodejs 18 or above
- vscode (or webstorm)
- git
- a github account with a ssh key configured on the laptop

<br>

## Notes for the trainer

All along the training, repeat and repeat again the FIRST qualities of good tests:
- Fast
- Isolated
- Repeatable
- Small
- Timely

This is the one thing the learner should memorize.

Print the walkthrough before the training


<br>

## Module 1: Basics of E2E tests with Cypress


Verifying the mini basket of an e-commerce website

<br>

---

🧩 **PRIMARY OBJECTIVE**

- Know how to configure a cypress project with typescript
- Know what acceptance criteria are, and how they fit in the development process
- Know how to write tests with Cypress
- Know how to find info in the cypress doc
- Know how to improve maintanabitly with the Page Object pattern

---



### Project setup


- create a github project

- create ssh key to connect to github (required to push on github)

```sh
ssh-keygen -t ed25519 -C "sboursault@protonmail.com"
cat ~/.ssh/id_ed25519.pub
```

- git clone using ssh

```sh
git clone git@github.com:sboursault/simple-commerce-e2e.git
cd simple-commerce-e2e/
echo node_modules > .gitignore
code .
```

#### Install cypress


```sh
npm init
npm install cypress --save-dev
npx cypress open
```


Create a simplistic test: how to verify the page title with Cypress.

```js
// home-page.cy.js
describe('home-page', () => {
    specify('the home page title contains "All products"', () => {
        cy.visit('/')
        cy.title().should('equals', 'All products | Simple commerce')
    })
})
```

_While writing this test, we can see there's no auto-completion._ 😢


Create a npm script in `package.json` for convenience

```json
  "scripts": {
    "cy:open": "npx cypress open --e2e --browser electron"
  },
```


#### Install typescript


<br>

> 📘 Userful link
> - https://docs.cypress.io/guides/tooling/typescript-support



<br>

```sh
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

#### Configure cypress

<br>

> 📘 Userful link
> - https://docs.cypress.io/guides/references/configuration

<br>

Rename `cypress.config.js` to `cypress.config.ts`

```ts
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:8000",
  },
});
```

First typescript test: how to verify the page title with Cypress

```ts
describe('home', () => {
    specify('the home page title is "Tous les produits"', () => {
        cy.visit('/')
        cy.title().should('equal', 'All products | Simple commerce')
    })
})
```


<br>

### Theoretical part: End to end tests in the development process

<br>


### Acceptance criteria workshop



**User story**

> As a shopper,
> I want to see my basket content in the mini-basket,
> so that I always know the basket's content and amount.



<br>

### Automate verification with cypress



```typescript
// mini-basket.cy.ts
describe("Mini-basket", () => {
  it('always shows the number of products in basket', () => {
    cy.visit('/')
    cy.get('button').contains('Add to basket').click()
    cy.get('.basket-mini .dropdown-toggle').should('contain.text', '(1)')
  })

  it("when empty, it doesn't show the number of products in basket", () => {
    cy.visit('/')
    cy.get('.basket-mini .dropdown-toggle').should('not.contain.text', '(')
  })
});
```

_Then the trainee writes the tests to verify the mini-basket dropdown content:_

- _it contains basket entries_
- _it informs the user when the product is empty_

```typescript

describe('detail', () => {
  it.only('contains basket entries (with product name, quantity and price)', () => {
    cy.visit('/')
    cy.get('[data-testid=product-pod-209] button').contains('Add to basket').click()
    cy.get('.basket-mini .dropdown-toggle').click()
    cy.get('.basket-mini .dropdown-menu')
      .should('contain.text', 'The shellcoder\'s handbook')
      .and('contain.text', 'Qty 1')
      .and('contain.text', '€9.99')
  })
  it("indicates when the basket is empty", () => {
    cy.visit('/')
    cy.get('.basket-mini .dropdown-toggle').click()
    cy.get('.basket-mini .dropdown-menu')
      .should('contain.text', 'Your basket is empty')
  })
})
```

<br>

### Refactor with page object

_Our test quickly becomes complex, and not so easy to read._
_Let's rewrite it with a page object._

```typescript
//
// catalogue.page.ts
//
class CatalogPage {
  // getters
  miniBasketLink() {
    return cy.get('.basket-mini .dropdown-toggle')
  }
  miniBasket() {
    return cy.get('.basket-mini .dropdown-menu')
  }
  // behaviour
  showMiniBasket() {
    this.miniBasketLink().click()
  }
  addProductToBasket(produtId: number) {
    cy.get(`[data-testid=product-pod-${produtId}] button`).contains('Add to basket').click()
  }
}
export default new CatalogPage()
```

_Technical interactions are isolated in the page object layer.
The result is much more readable and much more maintainable_


Same exercice with the login

```typescript
// login.spec.cy.ts
import cataloguePage from "../support/page-object/catalogue.page"
import loginPage from "../support/page-object/login.page"
describe('login', () => {
  beforeEach(() => {
    cy.visit('/accounts/login/')
  })
  it('accepts valid credentials', () => {
      loginPage.loginWith('tom@test.com', 'tom@test.com')
      cataloguePage.topMenu()
        .should('contain.text', 'tom@test.com')
  })
  it('shows an error on invalid password', () => {
      loginPage.loginWith('tom@test.com', 'tom@test.co')
      cataloguePage.topMenu()
        .should('contain.text', 'Account')
        .and('not.contain.text', 'tom@test.com')
      loginPage.loginForm()
        .should('contain.text', 'Oops! We found some errors')
  })
})
// login.page.cy.ts
class LoginPage {
  // components
  loginForm() {
    return cy.get('#login_form')
  }
  // behaviours 
  loginWith(username: string, password: string) {
    this.fillUsername(username)
      .fillPassword(password)
    cy.get('#login_form button').click()
  }
  fillUsername(value : string) {
    cy.get('#id_login-username').type(value)
    return this;
  }
  fillPassword(value : string) {
    cy.get('#id_login-password').type(value)
    return this;
  }
}
export default new LoginPage() 
```

---

👌 **WHAT WE'VE LEARNED**

- Configure a cypress project with typescript
- Cypress runner in action with execution logs and chrome inspector
- Mocha api (before, beforeEach, describe, it)
- Cypress api (visit, get, click, should, and)
- CSS selectors
- Typescript basics (Create an object)
- The page object pattern
- Continuously polish your test code

---



<br>


## Module 2: Fast, repeatable and isolated tests

Verifying the basket recovery on an e-commerce website

<br>

_As the test suite grows, we encounter new issues:_
- _The test suite gets longer to run._
- _Some tests become flaky (they fail from time to time, even if no code was changed).

_We can avoid most of them by improving practices._

<br>

### Theoretical part: Qualities of good E2E tests

_To make this part more entertaining, we can start with a quick brainstorm on what makes a good test._

<br>

---

🧩 **PRIMARY OBJECTIVE**

- Practice writing acceptance tests for a user story
- Find edge cases
- Write good acceptance tests: isolated (I'm logged out at the biginning of each test) and **repatable** (go back to a known state at the beginning of the test)
- Know how to improve maintanabitly with Cypress custom commands
- Know how to run test faster with api calls

---


**User story**

> As a shopper,
> I want to recover the basket from my previous session
> so that I can prepare my order and validate in several times.

**Workshop:** What could be the acceptance criteria for this story ?

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
describe("Basket recovery", () => {
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

curl -X DELETE https://simplecommerce1nz5qlcr-sbc1.functions.fnc.fr-par.scw.cloud/api/basket -u "tom@test.com:tom@test.com"

_The trainer shows how to use the `request` command._

```typescript
cy.request({
  method: "DELETE",
  url: "/api/basket",
  headers: {
    Authorization: "Basic " + btoa("mytest@test.com:simplepassword"),
  },
});
```

<br>

### Simplify test with custom commands

_The trainer shows how to create a `login` custom command, the learner repeats with `logout` and `clearBasket`._

Let's polish our test with a login command.

https://on.cypress.io/custom-commands
https://docs.cypress.io/guides/tooling/typescript-support#Using-an-External-Typings-File

```typescript

// cypress/support/cypress.d.ts

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

// cypress/support/commands.ts

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


<br>

### Optimize with api call

Let's refactor the login command to use apis instead of the UI.

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

### Theoretical part: Cypress tips

<br>

### Extra exercise: Verify the login

💪 This part be can added for the fastest trainees

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

_The test suite now takes only 9 seconds_

<br>

## Module3: API tests

Verifying the order amount


---

🧩 **PRIMARY OBJECTIVE**

- Know how to write api tests with Cypress
- Know how to use aliases
- Know how to add examples to explicit acceptance criteria

---

**Item**

> Basket amount:
> The basket amount should take into account the price and quantity of each entries.
> Order amount:
> Over 30€, the 7€ for delivery fees are offered.

**Workshop:** What could be the acceptance criteria for this item ?

Possible list:

- Basket amount equals the sum of `(product price x quantity)` of each basket entries
  - example:
    - with 2 products A (23.99€) and 3 product B (12.99€) => 2 x 23.99 + 3 x 12.99€ = 86.95€
- Over 30€, the 7€ delivery fees are offered
  - examples:
    - with 23.99€ => shipping price is 7.00€
    - with 86.95€ => shipping price is 0.00€

What if ?

- the basket amount is exactly 30€?

```typescript
// cypress.config.ts
export default defineConfig({
  e2e: {
    specPattern: "cypress/{api,e2e}/**/*.cy.{js,jsx,ts,tsx}",
  },
});
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
      method: "DELETE",
      url: "/api/basket",
      headers: {
        Authorization: "Basic " + btoa(credentials),
      },
    });
  }
}

export default new BasketApi();
```

_The trainee writes the test_

```typescript
describe("Order amount", () => {
  before(() => {});

  beforeEach(() => {});

  specify(
    "Basket amount equals the sum of (product price x quantity) for each basket entries",
    () => {
      cy.request("POST", "/api/basket/add-product/", {
        url: "/api/products/208/", // 23.99€
        quantity: 2,
      });
      cy.request("POST", "/api/basket/add-product/", {
        url: "/api/products/203/", // 12.99€
        quantity: 3,
      });

      cy.request("GET", "/api/basket/").then((response) => {
        expect(response.body.total_incl_tax).to.equal("86.95");
      });
    }
  );

  describe("Over 30€, the 7€ delivery fees are offered", () => {
    specify("Basket amount bellow 30€", () => {
      cy.request("POST", "/api/basket/add-product/", {
        url: "/api/products/208/", // 23.99€
        quantity: 1,
      });

      cy.request("GET", "/api/basket/shipping-methods/").then((response) => {
        expect(response.body[0].price.incl_tax).to.equal("7.00");
      });
    });

    specify("Basket amount over 30€", () => {
      cy.request("POST", "/api/basket/add-product/", {
        url: "/api/products/203/", // 12.99€
        quantity: 3,
      });

      cy.request("GET", "/api/basket/shipping-methods/").then((response) => {
        expect(response.body[0].price.incl_tax).to.equal("0.00");
      });
    });
  });
});
```

_The trainer shows the benefits of api tests_

- faster
  - allows to get feedback quicker
  - allows to run more test cases
- apis tend to change less offten than UI, making api tests easier to maintain

_The trainer explains the execution order and how to define variables_


```typescript

// not good
let response = cy.request("GET", "/api/basket/shipping-methods/")
expect(response.body[0].price.incl_tax).to.equal("0.00");

// good
cy.request("GET", "/api/basket/shipping-methods/").then((response) => {
  expect(response.body[0].price.incl_tax).to.equal("0.00");
});

// good
cy.request("GET", "/api/basket/shipping-methods/").as('response')
cy.get('@response').its('body[0].price.incl_tax').should('eq', '0.00')

```

---

👍 **WHAT WE PRACTICED**

---

👌 **WHAT WE'VE LEARNED**

- How to write api tests
- How to debug tests with console logs and `debbuger`
- Cypress execution order

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
    return cy.request("GET", "/api/basket/").its("body");
  }

  addProduct(quantity: number, productUrl: string) {
    cy.request("POST", "/api/basket/add-product/", {
      url: productUrl,
      quantity,
    });
  }

  getShippingMethods(): Cypress.Chainable<ShippingMethodResource[]> {
    return cy.request("GET", "/api/basket/shipping-methods/").its("body");
  }

  getShippingMethod(): Cypress.Chainable<ShippingMethodResource> {
    return cy
      .request("GET", "/api/basket/shipping-methods/")
      .its("body")
      .should("have.length", 1)
      .its(0);
  }
}

class BasketResource {
  total_incl_tax: string;
}

class ShippingMethodResource {
  price: ShippingMethodPriceResource;
}

class ShippingMethodPriceResource {
  incl_tax: string;
}

// api/order-amount.api.cy.ts
import basketApi from "../support/api/basket.api";

describe("Order amount", () => {
  before(() => {});

  beforeEach(() => {});

  specify(
    "Basket amount equals the sum of (product price x quantity) for each basket entries",
    () => {
      basketApi.addProduct(2, "/api/products/208/"); // 23.99€
      basketApi.addProduct(3, "/api/products/203/"); // 12.99

      basketApi.getBasket().then((basket) => {
        expect(basket.total_incl_tax).to.equal("86.95");
      });
    }
  );

  describe("Over 30€, the 7€ delivery fees are offered", () => {
    specify("Basket amount bellow 30€", () => {
      basketApi.addProduct(1, "/api/products/208/"); // 23.99€

      basketApi
        .getShippingMethod()
        .its("price.incl_tax")
        .should("equal", "7.00");
    });

    specify("Basket amount over 30€", () => {
      basketApi.addProduct(3, "/api/products/203/"); // 12.99

      basketApi
        .getShippingMethod()
        .its("price.incl_tax")
        .should("equal", "0.00");
    });
  });
});
```

- Create a 30€ product to verify the behavior on the exact threshold (niveau ++)

```typescript

// cypress/support/product-admin.api.ts

class ProductAdminApi {

  private adminCredentials = btoa('superuser@example.com:testing')

  createProduct(price: string): Cypress.Chainable<string> {
    return cy.request(
      {
        method: 'POST',
        url: '/api/admin/products/',
        headers: {
          'Authorization': 'Basic ' + this.adminCredentials
        },
        body: {
          slug: randomString(10),
          product_class: 'book',
          stockrecords: [
            {
              "partner_sku": randomString(10),
              "price_currency": "EUR",
              "price": price,
              "num_in_stock": 100,
              "partner": "http://localhost:8000/api/admin/partners/3/"
            }
          ],
        }
      }).its('headers.location').then(url => {
        return '/api' + url.substring(url.indexOf("/products/"))
      })
  }
}

function randomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default new ProductAdminApi()

// cypress/api/order-amount.api.cy.ts

specify("Basket amount equals 30€", () => {
  productAminApi.createProduct('30.00').then(productUrl =>
    basketApi.addProduct(1, productUrl)
  )
  basketApi.getShippingMethod().its('price.incl_tax').should('equal', '0.00')
});
```

Now we get a new problem. The products we create come first on the homepage.
If we create too many produts, the test on the basket recovery may fail.
This is an isolation problem.

Possible solutions :
- Adapt the basket recovery tests to add products from product detail pages
- Adapt the basket recovery tests to add products from the 'books_2' category (simpler)

```typescript

// cypress/e2e/basket-recovery.cy.ts

cy.visit('/catalogue/category/books_2/')
```


---



### Améliorations

définition de commande custom pour récupérer les éléments via data-testid.
On peut avoir un objet simple-commerce pour les interractions plus haut niveau (login...)

cypress tip :
// use the debugger (https://christianlydemann.com/the-most-common-cypress-mistakes/)

// variables, execution order and retryability
(https://christianlydemann.com/the-most-common-cypress-mistakes/)
(https://docs.cypress.io/guides/references/best-practices#Assigning-Return-Values)

// test against a dedicated env (not one shared with manual tests)
// write atomic tests ((https://testguild.com/atomic-tests/))





<br>

## Repeat: Create and update address

The aim of this

If there is enough time, the trainee can use all what he learned to verify the address creation and update in the user settings.
This involves:
- creating a repeatable test by deleting and creating a user without address
- creating the address (ui), verify it (ui)
- creating and updating an address (creation with ui or api), verify it (ui)


<br>

## Elaborate

- Optimize login with api calls `cy.request()` see https://groups.google.com/g/django-oscar/c/qxOXbmu54-U
- Check cypress doc more offten
- not enough stock with intercept
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
  - verify behaviours based on api calls (includes waiting for an api response)
    - amazon quick search shows product that match with my request
    - results are changed after a new search !! (this can one imply waiting for an api response)





idées :

- démo avec génération de code par chatgpt et github copilot

## Test a SPA

prévoir un chapitre test d'une spa
- idée :
    - envoi d'un email sur gmail à moi même, je le reçois bien.
- ajout de wait dans le page object



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
