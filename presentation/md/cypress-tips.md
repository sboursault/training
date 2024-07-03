

<!-- .slide: id="cypress-tips" class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <span class="text-level-3">Part 4</span>
    <h1>Cypress tips</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>


---

## Using variables

<div class="fragment">
  <p class="mt-150 text-level-2">Commands are enqueued and run asynchronously

  ```typescript
  const button = cy.get('button')  //
  button.click();                  // this won't work
  ```
</div>

<div class="fragment">
  <p class="mt-150  text-level-2">Use <code>.then()</code> to access what a Cypress command yields

  ```typescript
  cy.get('button').then(button => {
    button.click()
  })
  ```
</div>


<small class="fragment mt-200">Cypress guide on varibles and aliases: <a href="https://docs.cypress.io/guides/guides/debugging">https://docs.cypress.io/guides/core-concepts/variables-and-aliases</a></small>


---

## Debug tests

<ul class="mt-300">
  <li class="fragment"><code>cy.pause()</code>
  <li class="fragment"><code>cy.request('/some-url').then(response => debugger)</code> (with the dev tools open)
  <li class="fragment">From the time travel, click on a request to inspect its response
</ul>



<small class="fragment mt-300">Cypress debugging guide: <a href="https://docs.cypress.io/guides/guides/debugging">https://docs.cypress.io/guides/guides/debugging</a></small>

---

## Wait for events, not time

<p class="text-level-2 fragment">Your browser is asynchronous!

<p class="text-level-2 fragment">When can I verify the result of async operations?

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

<!-- .element: class="mt-50 fragment" -->

<p class="text-level-2 fragment">Wait for <strong>events</strong> to avoid long and flaky tests

<p class="fragment fragment mt-50"><small>More on cypress implicit waits: <a href="https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting">https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting</a></small>

Note:
Testing offten involves asynchronous behaviours.



