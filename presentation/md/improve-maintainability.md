

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

<p class="mt-150 fragment">We spend much more time reading code, than writing it.<br/>
So the code should optimize for reading.

<p class="mt-150 fragment">An E2E test have many reasons to fail
<ul class="fragment">
  <li>the application may not have been designed to be tested
  <li>the UI can change frequently
  <li>asynchronous nature of the browser
</ul>
<p class="fragment">As a result, a SDET can spend more than half of her time on test maintenance.

Note:
SDET: automaticien

---

## Dedicated selectors

<p class="mt-250 fragment">Add a <code>data-testid</code> attribute to query your html elements</p>

```html
<input type="email" id="email" name="email"
  class="form-control" data-testid="register-form__email-input"/>
```

<!-- .element: class="fragment mt-150" -->

<p class="mt-250 fragment">Selectors based on a dedicated attribute are <strong>more efficient</strong> and<br> <strong>more robust to changes</strong></p>


Note:

The data-cy attribute will not change from CSS style or JS behavioral changes, meaning it's not coupled to the behavior or styling of an element.
Don't test it if it's not testable


---
<!-- .element: class="text-level-2" -->
## Hooks

<p>Hooks are helpful to set conditions that run before a set of tests

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
})

```

<div class="fragment mt-150">
<p>Avoid using <code>after()</code> and <code>afterEach()</code>
<ul>
  <li>When a tests fails, clean-up code might remove important information, making it harder to investigate
</ul>
</div>

</div>

Note: 
It may sound logical that each test should clean up after itself, but...
---

## Tests in progress

<p class="mt-150">Use <code>only()</code> and <code>skip()</code> to include or exclude some tests

```typescript
describe('My feature', () => {
  it.skip('works as intended') {
    // This test will be skipped 
  }
  it.only('works differently in alternative case') {
    // This will exclude all other tests
  }
})

```

<ul class="mt-200 no-bullets">
  <li><code>only()</code> serves when you want to run a single test on your machine
  <li><code>skip()</code> can be added temporarily on broken tests (or not passing yet)
</ul>
---

## Custom command

<div class="fragment">
<p>Let's take an example

```typescript
cy.get(`[data-testid=my-component]`)
```

</div>

<div class="fragment mt-125">

<p>can be simplified with a custom command:

```typescript 
cy.getByTestid(`my-component`)
```

</div>

<p class="fragment mt-200">Custom commands work well for behaviors that are desirable across many tests


---

## Page object pattern

<p class="mt-200 fragment">Page objects abstract away the technical interactions from the decision code</p>

```typescript
cy.get(".basket-mini .dropdown-toggle").click(); // this is about HTML

```
<!-- .element: class="fragment" -->

```typescript
cataloguePage.displayMiniBasket();               // this is about the
                                                 // application
```

<!-- .element: class="fragment" -->

<p class="mt-150 fragment">Tests with Page Objects are <strong>easier to read</strong> and <strong>easier to maintain</strong>


---

## &lt;/> Creating a custom command
<!-- .element: data-toc-label="</> Simplify the mini-basket tests" -->


<div class="exercice text-level-2">
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

## &lt;/> Test with Page Objects
<!-- .element: data-toc-exclude -->


<div class="exercice text-level-2">
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

