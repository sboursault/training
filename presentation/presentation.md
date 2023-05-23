## Slide 1

A paragraph with some text and a [link](https://hakim.se).

And some small text. <!-- .element: class="small" -->

---

## Slide 2

bonjour

oui oui

---

## Slide 3

```js [1-2|3|4]
let a = 1;
let b = 2;
let c = (x) => 1 + 2 + x;
c(3);
```

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

<p class="fragment">Favour a <strong>whole team approach</strong>: any task might be completed by any team member</p>

<div class="fragment">
<p class="block-head">Developers and testers collaborates to</p>
  <ul>
    <li>Build and maintain the test infrastructure</li>
    <li>Design testable code</li>
    <li>Write and maintain the automated tests</li>
  </ul>
</div>

Notes:
While a team can have automation experts, it doesn't limit particular tasks to particular team members
Everyone should feel responsible for the automated tests
Without automated tests, we don't have a quality product

## Do I still need manual tests?

**YES!** <!-- .element: class="fragment" -->

Automated tests free testers up to focus on more exploratory-type testing <!-- .element: class="fragment" -->

---

# Cypress tips

---

## Page object pattern

Page objects abstract away the DOM manipulation from the test code <!-- .element: class="fragment" -->

```typescript
cy.get(".basket-mini .dropdown-toggle").click();  // this is about HTML


cataloguePage.displayMiniBasket();                // this is about the 
                                                  // application
```
<!-- .element: class="fragment" -->

<p class="apart fragment">Tests get <strong>easier to read</strong> and <strong>easier to maintain</strong>

---

## Wait for events, not time

<p class="fragment">When can I verify the result of async operations?



```typescript
// bad
cy.wait(2000)                  // wait for 2 seconds

// Good
cy.intercept('POST', '/api/basket/add-product')
  .as('addProductToBasket')
cy.wait('@addProductToBasket') // wait for a http response

// Good
cy.contains("Welcome")         // wait for the page to contain "welcome"

```
<!-- .element: class="fragment" -->

<p class="fragment">Wait for events to avoid <strong>long</strong> and <strong>flaky</strong> tests</p>

<small class="fragment">More on cypress implicit waits: <a href="https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting">https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting</a></small>


Note:
Testing offten involves asynchronous behaviours.

---

Isolation:
Properly isolated tests can be run in any sequence. 

Repeatability
you must have clear control over the environment in which they run, so you have a well-known state at the beginning of the test.