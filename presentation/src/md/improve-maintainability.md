

## Hooks

<!-- .slide: class="text-level-3" -->

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

## Pending tests

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

<ul class="mt-200">
  <li><code>only()</code> serves when you want to run a single test on your machine
  <li><code>skip()</code> can be added temporarily on broken tests (or not passing yet)
</ul>

{% if(cy) { %}

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

## Create a custom command
<!-- .element: data-tags="practice, optional" -->


<div class="exercice text-level-3">
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

{% } %}



