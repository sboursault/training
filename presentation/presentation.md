
<!-- .slide: class="slide-title" -->

<br>
<br>
<br>
<br>

<h1 style>End to End tests <br>with Cypress</h1>

<br>

<p><small>Training course by Sébastien Boursault</small>

Notes:

Presentation examples : https://github.com/dzello/revealjs-themes
https://revealjs-themes.dzello.com/robot-lung.html#/
https://revealjs-themes.dzello.com/sunblind.html#/


---

<!-- .slide: id="toc" -->

## Table of content

<ol>
  <li><a href="#/test-strategy">Test strategy</a>
  <li><a href="#/cypress-tips">Cypress tips</a>
  <li><a href="#/good-tests">Qualities of a good test</a>
</ol>


---

<!-- .slide: id="test-strategy" -->

<div class="part-title">
  <span class="text-level-3">Part 1</span>
  <h1>Test strategy</h1>
</div>

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

## Who automates the tests?

<h3 class="fragment">Favour a <strong>whole team approach</strong></h3>

<p class="block-head fragment">Developers and testers work together to</p>
<ul class="text-level-2">
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

<p class="text-level-2 fragment">as part of your CI/CD pipeline</p>

<h3 class="fragment">Have a dedicated environment</h3>

<p class="text-level-2 fragment">A shared environment is not predictible</p>

Note:
On a shared environment, tests can fail for external reasons.
you must have clear control over the environment in which the tests run.

---

## Design testable code

<h3 class="fragment">Add <code>data-*</code> attributes to select html elements</h3>

```html
<input type="email" id="email" name="email"
  class="form-control" data-testid="register-form__email-input"/>
```

<!-- .element: class="fragment" -->

<p class="text-level-2 fragment">Selectors based on <code>data-testid</code> are <strong>more efficient</strong> and<br> <strong>more robust to changes</strong></p>

### Make async APIs testable <!-- .element: class="fragment" -->

<p class="text-level-2 fragment">Ask "what happens instead?" to prove that something does not happen</p>

Note:
The data-cy attribute will not change from CSS style or JS behavioral changes, meaning it's not coupled to the behavior or styling of an element.
Don't test it if it's not testable

See "Ask 'what happens instead?'" in 50 quick ideas. Maybe you can subscribe to an error topic...

---

## Do I still need manual tests?

**YES!** <!-- .element: class="fragment" -->

Automated tests free testers up to focus on more exploratory-type testing <!-- .element: class="fragment" -->

---

<!-- .slide: id="cypress-tips" -->

<div class="part-title">
  <span class="text-level-3">Part 2</span>
  <h1>Cypress tips</h1>
</div>


---

## Page object pattern

Page objects abstract away the DOM manipulation from the test code <!-- .element: class="fragment" -->

```typescript
cy.get(".basket-mini .dropdown-toggle").click(); // this is about HTML

cataloguePage.displayMiniBasket();               // this is about the
                                                 // application
```

<!-- .element: class="fragment" -->

<p class="text-level-2 apart fragment">Tests get <strong>easier to read</strong> and <strong>easier to maintain</strong>

---

## Wait for events, not time

<h3 class="fragment">When can I verify the result of async operations?</h3>

```typescript
// bad
cy.wait(2000)  // wait for 2 seconds

// Good
cy.intercept("POST", "/api/basket/add-product").as("addProductToBasket")
cy.wait("@addProductToBasket")  // wait for a http response

// Good
cy.contains("Welcome")  // wait for the page to contain "welcome"
```

<!-- .element: class="fragment" -->

<p class="text-level-2 apart fragment">Wait for events to avoid <strong>long</strong> and <strong>flaky</strong> tests</p>

<small class="fragment">More on cypress implicit waits: <a href="https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting">https://docs.cypress.io/guides/references/best-practices#Unnecessary-Waiting</a></small>

Note:
Testing offten involves asynchronous behaviours.

---



!!!!!!!!!!!!!!!!!!!

Develop this and check other bad patterns


## Don't let flaky tests attack your confidence

Quarantine flaky tests
Fix theme as soon as possible
and kill them if necessary

---

<!-- .slide: id="good-tests" -->

<div class="part-title">
  <span class="text-level-3">Part 3</span>
  <h1>Qualities of a good test</h1>
</div>

---

## Good automated tests are F.I.R.S.T

<div class="fragment">

- Fast
- Isolated
- Repeatable
- Simple and Self-Verifying
- Timely

</div>

---

### Fast

<p class="fragment">The faster the test suite, the more offten it can run

<p class="fragment">Shortening the feedback loop accelerates the development process

<!-- cost of switching subject -->

---

### Isolated

<p class="fragment">Isolated tests can run in any order

<h3 class="fragment">Repeatable</h3>

<p class="fragment">Repeatable tests don't depend on the state of the environment in which they run

<p class="fragment apart">Without isolation and repeatability, you often get false positive. The biggest risk is too <strong>loose confidence in your tests</strong>.

Note: move the environment to a <strong>well-known state</strong> before they run

---

### Simple and Self-Verifying

<p class="fragment">Test must be easy to read

<p class="fragment">The purpose of a test should be obvious

<p class="fragment">Apply clean code practices (DRY, KISS, Single responsibility, solid ?)

---

### Timely

<p class="fragment">Try to automate tests before development

<div class="apart text-level-2">
<!--When written before development / Benefits -->
<ul>
  <li class="fragment">Production code is crafted so it's <strong>testable</strong>
  <li class="fragment">Tests are used to <strong>validate the changes</strong>
</ul>
</div>

<p class="apart text-level-2 fragment">Testing before development is more fun,<br> more beneficial, more productive, and less frustrating

---

## Resources

<div class="text-level-2">

- https://christianlydemann.com/the-most-common-cypress-mistakes/
- Joe C automation guide
- Agile Testing: A Practical Guide for Testers and Agile Teams (Lisa Crispin and Janet Gregory, 2008, Addison-Wesley)
- http://martinfowler.com/bliki/PageObject.html
- Fifty Quick Ideas To Improve Your Tests (Gojko Adzic, David Evans and Tom Roden, 2015, Neuri Consulting Llp)
- https://docs.cypress.io/guides/references/best-practices
- https://medium.com/pragmatic-programmers/unit-tests-are-first-fast-isolated-repeatable-self-verifying-and-timely-a83e8070698e

</div>
