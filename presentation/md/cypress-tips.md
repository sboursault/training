

<!-- .slide: id="cypress-tips" class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <span class="text-level-3">Part 4</span>
    <h1>Cypress tips</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>


---
<!-- .slide: class="text-level-2" -->

## Using variables

<div class="fragment">
  <p class="mt-150">Commands are enqueued and run asynchronously

  ```typescript
  const button = cy.get('button')  //
  button.click();                  // this won't work
  ```
</div>

<div class="fragment">
  <p class="mt-150">Use <code>.then()</code> to access what a Cypress command yields

  ```typescript
  cy.get('button').then(button => {
    button.click()
  })
  ```
</div>


<small class="fragment mt-200">Cypress guide on varibles and aliases: <a href="https://docs.cypress.io/guides/guides/debugging">https://docs.cypress.io/guides/core-concepts/variables-and-aliases</a></small>


---

## Debug tests - TO REVIEW

<ul class="mt-300">
  <li class="fragment"><code>cy.pause()</code>
  <li class="fragment"><code>cy.request('/some-url').then(response => debugger)</code> (with the dev tools open)
  <li class="fragment">From the time travel, click on a request to inspect its response
</ul>



<small class="fragment mt-300">Cypress debugging guide: <a href="https://docs.cypress.io/guides/guides/debugging">https://docs.cypress.io/guides/guides/debugging</a></small>

---
<!-- .slide: class="text-level-2" -->
## Wait for events, not time

<p class="fragment">Your browser is asynchronous!

<p class="fragment">When can I verify the result of async operations?

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

<p class="fragment mt-150">Wait for <strong>events</strong> to avoid long and flaky tests

<p class="fragment mt-200"><small>More on cypress implicit waits: <a href="https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting">https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting</a></small>

Note:
Testing offten involves asynchronous behaviours.

---

## Test accros multiple domains

<!-- .slide: class="text-level-1" -->

<p class="fragment">Within a test, you can't verify pages from different <strong>origins</strong>

<p class="fragment">Example:
  
<div class="text-center text-level-2 mt-50 fragment">
  <p class="">An ecommerce site sends new orders to a logistics application.<br>We want to verify the orders are correctly sent.
  <div class="box mt-50 fragment">
    <span class="box_label">Cypress test</span>
    <div class="flex-row flex-row--center mt-50 mb-50">
      <div class="browser-box" data-arrow="->browser-logistics">
        <img>
        <p>//www.mystore.com
      </div>
      <div class="browser-box" id="browser-logistics">
        <img>
        <p>//logistics.mystore
        <p class="browser-box_error no-wrap fragment">Cypress error!!
      </div>
    </div>
    <p class="fragment mt-75">In a single test, you can't navigate on a first domain to create an order, <br>and then navigate to another domain
  </div>
  
</div>


---

<!-- .slide: class="text-level-2" -->

<div class="flex-row flex-row--center mt-200">
  <div class="bubble bubble-bottom-left">
    <i class="emo emo-36 emoji-face_with_monocle"></i>
    <span class="bubble__text">So how to verify my app works well within an ecosystem?
    <br>
    (a.k.a. <strong>Integration tests</strong>)</span>
  </div>
</div>

<div class="mt-300 fragment">
  <p>The <code>cy.origin()</code> command allows to bypass this limitation
  <ul class="no-bullets">
    <li><i class="emo emoji-thumbup"></i>Good for a quick action on another domain, like <a href="https://docs.cypress.io/guides/end-to-end-testing/social-authentication">social authentication</a>
    <li><i class="emo emoji-x"></i>Page objects don't work on the other origin
  </ul>
</div>

<div class="fragment">
  <p class="mt-200">A better alternative for integration tests:
  <ul>
    <li><!--Make direct calls to the other app <strong>api</strong> from your test, and check the created data--> Check the data created in the other app with <strong>direct calls</strong> to this other app <strong>api</strong> (see <code>cy.request()</code>)
  </ul>
</div>

---

## cy.session TODO

ajouter un mot sur cy.session() good second choice, if you can't log using api