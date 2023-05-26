## Slide 1

A paragraph with some text and a [link](https://hakim.se).

And some small text. <!-- .element: class="small" -->

---

# Test strategy

---

## Automated tests in the dev process

<div class="box">
  <p class="box__title">Sprint</p>
  <div class="badge" id="box-1">User story</div>
  <div class="badge fragment" id="box-2">Acceptance criterias</div>
  <div class="badge fragment" id="box-3">Automated tests</div>
  <div class="badge fragment" id="box-4">Validates the new feature</div>
</div>
<div class="box fragment">
  <p class="box__title">Future sprints</p>
  <div class="badge" id="box-5">Regression tests</div>
  <div class="badge fragment" id="box-6">Living documentation</div>
</div>

---

## You can't automate everything!

<p class="fragment block-head">You should focus on</p>
<ul>
<li class="fragment">Critical paths and risk areas of your application</li>
<li class="fragment">Parts that are hard to test manually</li>
</ul>

Notes:

- Risk areas include checkout, payemnts, etc.
- Hard to test manually:
  - complex setup (data, configuration...)
  - tests on multiple device
  - etc.

---

## Who automizes the tests?

<h3 class="fragment">Favour a <strong>whole team approach</strong></h3>

<p class="block-head fragment">Developers and testers work together to</p>
<ul class="level-2-text">
  <li class="fragment">Build and maintain the test infrastructure</li>
  <li class="fragment">Design testable code</li>
  <li class="fragment">Write and maintain the automated tests</li>
</ul>

Notes:
Any task might be completed by any team member
While a team can have automation experts, it doesn't limit particular tasks to particular team members
Everyone should feel responsible for the automated tests
Without automated tests, we don't have a quality product

---

## Test infrastructure

<h3 class="fragment">Run automated tests on each release</h3>

<p class="level-2-text fragment">as part of your CI/CD pipeline</p>

<h3 class="fragment">Have a dedicated environment</h3>

<p class="level-2-text fragment">A shared environment is not predictible</p>

Note:
On a shared environment, tests can fail for external reasons.
you must have clear control over the environment in which the tests run.
---

## Design testable code

<h3 class="fragment">Add <code>data-*</code> attributes to select html elements</h3>

```html
<input type="email" id="email" name="email"
  class="form-control" data-testid="register-form__email-input"
/>
```

<!-- .element: class="fragment" -->

<p class="level-2-text fragment">Selectors based on <code>data-testid</code> are <strong>more efficient</strong> and<br> <strong>more robust to changes</strong></p>

### Make async APIs testable <!-- .element: class="fragment" -->

<p class="level-2-text fragment">Ask "what happens instead?" to prove that something does not happen</p>

Note:
The data-cy attribute will not change from CSS style or JS behavioral changes, meaning it's not coupled to the behavior or styling of an element.
Don't test it if it's not testable

See "Ask 'what happens instead?'" in 50 quick ideas. Maybe you can subscribe to an error topic...

---

## Do I still need manual tests?

**YES!** <!-- .element: class="fragment" -->

Automated tests free testers up to focus on more exploratory-type testing <!-- .element: class="fragment" -->

---

# Cypress tips

---

## Page object pattern

Page objects abstract away the DOM manipulation from the test code <!-- .element: class="fragment" -->

```typescript
cy.get(".basket-mini .dropdown-toggle").click(); // this is about HTML

cataloguePage.displayMiniBasket();               // this is about the
                                                 // application
```

<!-- .element: class="fragment" -->

<p class="level-2-text apart fragment">Tests get <strong>easier to read</strong> and <strong>easier to maintain</strong>

---

## Wait for events, not time

<h3 class="fragment">When can I verify the result of async operations?</h3>

```typescript
// bad
cy.wait(2000); // wait for 2 seconds

// Good
cy.intercept("POST", "/api/basket/add-product").as("addProductToBasket");
cy.wait("@addProductToBasket"); // wait for a http response

// Good
cy.contains("Welcome"); // wait for the page to contain "welcome"
```

<!-- .element: class="fragment" -->

<p class="level-2-text apart fragment">Wait for events to avoid <strong>long</strong> and <strong>flaky</strong> tests</p>

<small class="fragment">More on cypress implicit waits: <a href="https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting">https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting</a></small>

Note:
Testing offten involves asynchronous behaviours.

---

## Don't let flaky tests attack your confidence

Quarantine flaky tests
Fix theme as soon as possible
and kill them if necessary

---


Isolation:
Properly isolated tests can be run in any sequence.

Repeatability
you must have clear control over the environment in which they run, so you have a well-known state at the beginning of the test.
