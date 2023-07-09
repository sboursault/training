
<!-- .slide: class="slide--presentation-title" -->

<br>
<br>
<br>
<br>

<h1 style>End to End tests <br>with Cypress</h1>

<br>
<br>

<p><small>Training course by Sébastien Boursault</small>

Notes:

Presentation examples : https://github.com/dzello/revealjs-themes
https://revealjs-themes.dzello.com/robot-lung.html#/
https://revealjs-themes.dzello.com/sunblind.html#/

---

<!-- .slide: id="toc" class="slide--vcenter" -->

<div>

## Table of content

<ol>
  <li><a href="#/test-strategy">Test strategy</a>
  <li><a href="#/cypress-tips">Cypress tips</a>
  <li><a href="#/good-tests">Qualities of a good test</a>
</ol>

</div>

---

<!-- .slide: id="test-strategy" class="slide--part-title slide--vcenter" -->

<div class="flex-container-row">

  <div class="part-title">
    <span class="text-level-3">Part 1</span>
    <h1>Test strategy</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>


---

<h2 class="slide-title">Automated tests in the dev process</h2>

<div class="box fragment">
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

Notes:
The Acceptance tests comes out of acceptance criterias.
Thinking about tests before development is more efficient:
 - the developer and the tester are aligned on the scope of the change
 - the developer writes testable code
When automating a test, one must have these 3 finalities in mind.
We need to balance completeness, clarity and speed.

---

<h2 class="slide-title">Who automates the tests?</h2>

<h3 class="mt-5 fragment">Favour a <strong>whole team approach</strong></h3>

<p class="mb-none fragment">Developers and testers work together to</p>
<ul class="text-level-2">
  <li class="fragment">Build and maintain the test infrastructure</li>
  <li class="fragment">Design testable code</li>
  <li class="fragment">Write and maintain the automated tests</li>
</ul>

Notes:
- Build and maintain the test infrastructure -> requires the dev ops help
- Design testable code -> requires developers
- Write and maintain the automated tests -> requires developers
Any task might be completed by any team member
While a team can have automation experts, it doesn't limit particular tasks to particular team members
Everyone should feel responsible for the automated tests
**Without automated tests, we don't have a quality product.**


---

<h2 class="slide-title">Continuous Integration <br> / Continuous Delivery</h2>

<h3 class="mt-4 fragment">Run automated tests on each release</h3>

<p class="text-level-2 fragment">as part of your CI/CD pipeline</p>

<h3 class="fragment">Have a dedicated environment</h3>

<p class="text-level-2 fragment">A shared environment is not predictible</p>

Note:
On a shared environment, tests can fail for external reasons.
you must have clear control over the environment in which the tests run.



---

<h2 class="slide-title">You can't automate everything!</h2>

<p class="mt-6 fragment mb-none">Focus on:</p>
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



<h2 class="slide-title">Do I still need manual tests?</h2>

<div class="mt-6 fragment"><strong>YES!</strong></div>

Automated tests free testers up to focus on more exploratory-type testing <!-- .element: class="fragment" -->

---

<!-- .slide: id="cypress-tips" class="slide--part-title slide--vcenter" -->

<div class="flex-container-row">

  <div class="part-title">
    <span class="text-level-3">Part 2</span>
    <h1>Cypress tips</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>

---

<h2 class="slide-title">Page object pattern</h2>

<p class="mt-4 fragment">Page objects abstract away the DOM manipulation from the test code</p>

```typescript
cy.get(".basket-mini .dropdown-toggle").click(); // this is about HTML

cataloguePage.displayMiniBasket();               // this is about the
                                                 // application
```

<!-- .element: class="fragment" -->

<p class="text-level-2 apart fragment">Tests get <strong>easier to read</strong> and <strong>easier to maintain</strong>

---

<h2 class="slide-title">Dedicated selectors</h2>

<p class="mt-5 fragment">Add <code>data-*</code> attributes to select html elements</p>

```html
<input type="email" id="email" name="email"
  class="form-control" data-testid="register-form__email-input"/>
```

<!-- .element: class="fragment" -->

<p class="text-level-2 apart fragment">Selectors based on <code>data-testid</code> are <strong>more efficient</strong> and<br> <strong>more robust to changes</strong></p>


Note:

The data-cy attribute will not change from CSS style or JS behavioral changes, meaning it's not coupled to the behavior or styling of an element.
Don't test it if it's not testable

---

<h2 class="slide-title">Wait for events, not time</h2>


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

<h2 class="slide-title">Minimize UI interrections</h2>


<p class="mt-5 fragment">Try to <strong>avoid the UI</strong> for all the parts of the tests <br> not dealing with <strong>UI-specific risks</strong>

<p class="mt-2 fragment">Setup your tests through <strong>api</strong>, <strong>db access</strong>...

<p class="mt-5 fragment">No UI set-up is <strong>faster</strong> and <strong>easier to maintain</strong>

Note:

From 50 quick ideas...
By avoiding the UI layer where it is not actually relevant for the purpose of the test, teams can save a lot of troubleshooting time and speed up feedback, while still keeping the same level of risk coverage.

Even when tests need to execute through the UI, minimise the part of the test that actually simulates user actions. Evaluate which parts of the tests are actually dealing with UI-specific risks, and try to automate everything else by avoiding the UI.

Set-up and clean-up tasks serve to make tests reliable and repeatable, but they do not actually deal with the user interface risk (or, more precisely, they should not – if a set-up task is testing things, it should be broken into several tests).


---

<!-- .slide: id="good-tests" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 3</span>
  <h1>Qualities of a good test</h1>
</div>

---

## Good automated tests are F.I.R.S.T

<div class="mt-5 fragment">

- Fast
- Isolated
- Repeatable
- Small <!-- or Simple and Self-Verifying -->
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

### Small

Avoid automating all UI end-to-end journeys. 

Write **atomic** scripts so that when they fail, you know why.

Note:
originaly: Simple and Self-Verifying
- Test must be easy to read
- The purpose of a test should be obvious
- Apply clean code practices (DRY, KISS, Single responsibility, solid ?)

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

<!-- .slide: id="extra-tips" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 5</span>
  <h1>Extra tips</h1>
</div>

---

<h2 class="slide-title">Test you apis</h2>

---

<h2 class="slide-title">Never ignore failing tests</h2>

<p class="fragment">Fix flaky tests as soon as possible

<p class="fragment">If not fixed within a given time frame,<br> <strong>delete</strong> or <strong>quarantine</strong> the flaky test

<p class="fragment">Don't let flaky tests attack your confidence!

---

### Make async APIs testable

<p class="text-level-2">Ask "what happens instead?" to prove that something does not happen</p>

See "Ask 'what happens instead?'" in 50 quick ideas. Maybe you can subscribe to an error topic...

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
- [Why Automated Tests Should Be Atomic](https://testguild.com/atomic-tests/)

</div>
