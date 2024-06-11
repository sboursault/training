

<!-- .slide: id="improve-maintainability" class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <span class="text-level-3">Part 2</span>
    <h1>Improve maintainability</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>

Note:


Simplify code with dedicated selectors, custom command and page object

---

## Why investing in maintainability?

<p class="fragment">We spend much more time reading code, than writing it.<br/>
So the code should optimize for reading.

<p class="mt-2 fragment">An E2E test have many reasons to fail
<ul class="fragment">
  <li>the application may not have been designed to be tested
  <li>the UI can change frequently
  <li>asynchronous nature of the browser
</ul>
<p class="fragment">As a result, a SDET can spend more than half of his time on test maintenance.

Note:
SDET: automaticien

---

<h2 class="slide-title">Dedicated selectors</h2>

<p class="mt-5 fragment">Add a<code>data-testid</code> attribute to query your html elements</p>

```html
<input type="email" id="email" name="email"
  class="form-control" data-testid="register-form__email-input"/>
```

<!-- .element: class="fragment mt-3" -->

<p class="mt-5 fragment">Selectors based on a dedicated attribute are <strong>more efficient</strong> and<br> <strong>more robust to changes</strong></p>


Note:

The data-cy attribute will not change from CSS style or JS behavioral changes, meaning it's not coupled to the behavior or styling of an element.
Don't test it if it's not testable


---

## Hooks

Hooks are helpful to set conditions that run before or after a set of tests.

```typescript
describe('My feature', () => {
  before(() => {
    // runs once before all tests
  })

  beforeEach(() => {
    // runs before each test
  })

  it('works as intended') {
    // some verifications...
  }

  afterEach(() => {
    // runs after each test
  })

  after(() => {
    // runs once after all tests
  })
})

```
<!-- .element: style="font-size:37%" -->


---

## &lt;/> Add hooks
<!-- .element: data-toc-level="2" data-toc-label="Let's code" -->

---

## Custom command

<p class="fragment">Let's take an example

```typescript
cy.get(`[data-testid=my-component]`)
```
<!-- .element: class="fragment" -->

<div class="fragment mt-2">

<p class="text-level-2">can be simplified with a custom command:

```typescript 
cy.getByTestid(`my-component`)
```

</div>

<p class="fragment mt-3">Custom commands work well for behaviors that are desirable across many tests.


---

## &lt;/> Creating a custom command
<!-- .element: data-toc-level="2" data-toc-label="Let's code" -->


<div class="block--exercice text-level-3">
  <p>Let's code
  <ul>
    <li>Create the custom command <code>cy.getByTestid()</code> and refactor the test code to use it.
  </ul>
  <p>Hints
  <ul>
    <li>Define the command in <code>cypress/support/commands.js</code>
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/cypress-api/custom-commands
    <li class="url-link">https://docs.cypress.io/guides/tooling/typescript-support#Types-for-Custom-Commands
  </ul>
</div>

---

<h2 class="slide-title">Page object pattern</h2>

<p class="mt-4 fragment">Page objects abstract away the technical interactions from the decision code</p>

```typescript
cy.get(".basket-mini .dropdown-toggle").click(); // this is about HTML

```
<!-- .element: class="fragment" -->

```typescript
cataloguePage.displayMiniBasket();               // this is about the
                                                 // application
```

<!-- .element: class="fragment" -->

<p class="mt-3 fragment">Tests with Page Objects are <strong>easier to read</strong> and <strong>easier to maintain</strong>



---

## &lt;/> Test with Page Objects
<!-- .element: data-toc-level="2" data-toc-label="Let's code" -->


<div class="block--exercice text-level-3">
  <p>Let's code
  <ul>
    <li>Refactor your tests to use a page object reprensenting the catalog page.
  </ul>
  <p>Hints
  <ul>
    <li>Create the <code>CatalogPage</code> in <nobr><code>cypress/support/page-objects/catalog-page.ts</code></nobr>
    <li>Add a commponent getter: <code>CatalogPage.miniBasketLink()</code>
    <li>And behaviors:
      <ul>
        <li><code>CatalogPage.showMiniBasket()</code>
        <li><code>CatalogPage.addProductToBasket(produtId: number)</code>
      </ul>
  </ul>
</div>

