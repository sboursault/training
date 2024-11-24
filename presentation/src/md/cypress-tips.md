

## Write small tests

<p class="mt-400 fragment" data-fragment-index="1">Prefer a set of <strong>small tests</strong> over a long script that verify many things

<p class="mt-200r fragment" data-fragment-index="2">When a small test fail, it's easier to find what is broken
 
<p class="mt-200r fragment" data-fragment-index="3">Avoid automating all UI end-to-end journeys<span class="fragment" data-fragment-index="4">,</span>
<div class="mt-25r fragment" data-fragment-index="4" style="text-align:right;margin-right: 2em">
particularly on <strong>Single Page Applications</strong>
</div>

<if-cy>
---
## Using variables

<!-- .slide: class="text-level-3" -->

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

</if-cy>

---

## Debug tests


{% if(pw) { %}

https://playwright.dev/docs/debug

debug with vscode

{% } %}


<div class="mt-300 fragment">
  <p>Inspect the <strong>page</strong> and <strong>any storage</strong> during the test
  
  ```typescript
  cy.navigate('/some-page')
  cy.pause()
  // or
  cy.navigate('/some-page')
    .then(() => {
      debugger  // works only with the dev tools open
    })
  ```
  <!-- .element: class="mt-75" -->  <!-- à généraliser ? -->
</div>

<small class="fragment mt-300">Cypress debugging guide: <a href="https://docs.cypress.io/guides/guides/debugging">https://docs.cypress.io/guides/guides/debugging</a></small>


---

<!-- .slide: class="text-level-3" -->

<p>Debug <strong>direct http calls</strong> made with <code>cy.request()</code>

<ul class="mt-0">
  <li class="fragment mt-50">With <code>debugger</code>

```typescript
cy.request('/some-url')
  .then((response) => {
    debugger  // works only with the dev tools open
  })
```
<!-- .element: class="mt-50" -->

<li class="mt-75 fragment">From the <strong>time travel panel</strong>, click on a <strong>request log</strong> to get the full request and response
<br>
<div class="text-center"><img class="mt-50" src="img/debug-request.png" height="450"></div>
</li>


---
<!-- .slide: class="text-level-3" -->
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

{% if(cy) { %}
---

## Test accross multiple domains

<!-- .slide: class="text-level-1" -->

<p class="fragment mt--100">a.k.a. <strong>Integration tests</strong>


<p class="fragment">Within a test, you can't verify pages from different <strong>origins</strong>

<p class="fragment">Example:
  
<div class="text-center text-level-3 fragment">
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
    <p class="fragment mt-75">In a single test, you can't visit a first domain, and then visit another
  </div>
  
</div>


---

<!-- .slide: class="text-level-3" -->

<div class="flex-row flex-row--center mt-200">
  <div class="bubble bubble-bottom-left">
    <i class="emo emo-36 emoji-face_with_monocle"></i>
    <span class="bubble__text">So how to verify my app works well within an ecosystem?
  </div>
</div>

<div class="mt-300 fragment">
  <p>The <code>cy.origin()</code> command allows to navigate on another domain
  <ul class="no-bullets mt-0">
    <li class="mt-50"><i class="emo emoji-thumbup"></i>Good for a quick action on another domain, like <a href="https://docs.cypress.io/guides/end-to-end-testing/social-authentication">social authentication</a>
    <li class="mt-50"><i class="emo emoji-x"></i>Page objects don't work on the other origin
  </ul>
</div>

<div class="fragment">
  <p class="mt-200">A better alternative:
  <ul>
    <li class="mt-25"><!--Make direct calls to the other app <strong>api</strong> from your test, and check the created data--> Check the data created in the other app with <strong>direct calls</strong> to this other app <strong>api</strong> (see <code>cy.request()</code>)
  </ul>
</div>

{% } %}