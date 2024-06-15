

<!-- .slide: id="cypress-tips" class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <span class="text-level-3">Part 3</span>
    <h1>Cypress tips</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>

---

## Debug tests

<ul class="mt-300">
  <li class="fragment"><code>cy.pause()</code>
  <li class="fragment"><code>cy.then(() => debugger)</code> (with the dev tools open)
  <li class="fragment">From the time travel, click on a request to inspect its response
</ul>



<small class="fragment mt-300">Cypress debugging guide: <a href="https://docs.cypress.io/guides/guides/debugging">https://docs.cypress.io/guides/guides/debugging</a></small>

---

## Wait for events, not time


<h3 class="fragment">When can I verify the result of async operations?</h3>

```typescript
// bad
cy.wait(2000)  // wait for 2 seconds

// Good
cy.contains('Welcome')  // wait for the page to contain "welcome"

// Good
cy.intercept('POST', '/api/basket/add-product').as('addProductToBasket')
cy.get('button').contains('Add to basket').click()
cy.wait('@addProductToBasket')  // wait for a http response
```

<!-- .element: class="fragment" -->

<p class="text-level-2 mt-125 fragment">Wait for events to avoid <strong>long</strong> and <strong>flaky</strong> tests</p>

<small class="fragment">More on cypress implicit waits: <a href="https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting">https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting</a></small>

Note:
Testing offten involves asynchronous behaviours.




---

## Minimize UI interactions


<p class="fragment">Try to <strong>avoid the UI</strong> for all the parts of the tests <br> not dealing with <strong>UI-specific risks</strong>

<p class="fragment">Setup your tests through <strong>api</strong>, <strong>db access</strong>...

<p class="fragment">No UI set-up is <strong>faster</strong> and <strong>easier to maintain</strong>


A better option is to clear the basket through api
- api change less offten than ui
- the api call easier to develop
- the api call runs faster
- api are (offten) synchronous

Note:



From 50 quick ideas...
By avoiding the UI layer where it is not actually relevant for the purpose of the test, teams can save a lot of troubleshooting time and speed up feedback, while still keeping the same level of risk coverage.

Even when tests need to execute through the UI, minimise the part of the test that actually simulates user actions. Evaluate which parts of the tests are actually dealing with UI-specific risks, and try to automate everything else by avoiding the UI.

Set-up and clean-up tasks serve to make tests reliable and repeatable, but they do not actually deal with the user interface risk (or, more precisely, they should not – if a set-up task is testing things, it should be broken into several tests).

