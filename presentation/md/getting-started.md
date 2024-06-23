

<!-- .slide: id="e2e-tests-dev-process" class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <span class="text-level-3">Part 1</span>
    <h1 class="text-size-heading-2">Getting started</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>


---

## &lt;/> Create and configure a Cypress project
<!-- .element: class="text-size-heading-3"  data-toc-label="Create and configure a Cypress project" data-toc-icon="code" -->

<div class="block--exercice text-level-3">
  <p>Let's code
  <ul>
    <li>Create a github project
    <li>Install and configure cypress to run typescript test
    <li>Create a simplistic test:
      <ul>
        <li><i>The home page title contains "All products"</i>
      </ul>
  </ul>
  <p>Cypress commands that may help
  <ul class="text-level-4">
    <li><code>visit</code>, <code>title</code>, <code>should</code>
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/guides/getting-started/installing-cypress
    <li class="url-link">https://docs.cypress.io/guides/getting-started/opening-the-app
    <li class="url-link">https://docs.cypress.io/guides/guides/command-line
  </ul>
</div>

Note:

```typescript
describe('home-page', () => {
  specify('the home page title contains "All products"', () => {
      cy.visit('/')
      cy.title().should('equals', 'All products | Simple commerce')
  })
})
```

---

## The problem with a conventional dev process
<!-- .element: class="text-size-heading-3" -->

<p class="fragment" data-fragment-index="1">When I started on my last project...

<div class="box flex-row mt-100 screen fragment" style="padding:40px;" data-fragment-index="2">
  <div class="badge" data-arrow="->task-dev">Specifications</div>
  <div class="badge fragment" data-arrow="->task-test" id="task-dev" data-fragment-index="3">Development<br>(Developer)</div>
  <div class="badge overlay-anchor fragment" data-arrow="->task-prod" id="task-test" data-fragment-index="4">Manual tests<br>(Tester)
    <div class="overlay overlay--friction fragment">
      <i class="emo emo-64 emoji-face_with_symbols_on_mouth"></i>
    </div>
  </div>
  <div class="badge fragment" id="task-prod" data-fragment-index="5">Production <br> deployment</div>
</div>

<p class="print"><img src="img/print/bdd-1.png"></img></p>

<div class="flex-row">
  <div class="flex-column tiny-gap">
    <ul class="mt-100 text-level-3 no-bullets">
      <li class="fragment"><i class="emo emoji-x"></i>Different understanding
      <li class="fragment"><i class="emo emoji-x"></i>Regressions happen
      <li class="fragment"><i class="emo emoji-x"></i>Too many non regression tests to execute manually
    </ul>
    <div class="sticky fragment">
      Not very satisfying &nbsp; :(
    </div>
  </div>
  <div class="bubble bubble-bottom-left flex-row fragment">
    <i class="emo emo-36 emoji-nerd_face"></i>
    <span class="bubble__text">Maybe we should automate <br> end to end tests...</span>
  </div>
</div>
    


---

So, let's automate end to end tests...

<div class="box flex-row mt-100 screen fragment" style="padding:40px;" data-fragment-index="2">
  <div class="badge" data-arrow="->task-dev">Specifications</div>
  <div class="badge fragment" id="task-dev" data-arrow="->task-test" data-fragment-index="3">Development<br>(Developer)</div>
  <div class="badge overlay-anchor fragment" id="task-test" data-arrow="->task-prod" data-fragment-index="4">Test automation<br>(Tester & Developer)
    <div class="overlay overlay--friction fragment">
      <i class="emo emo-64 emoji-face_with_symbols_on_mouth"></i>
    </div>
  </div>
  <div class="badge fragment" id="task-prod" data-fragment-index="5">Production <br> deployment</div>
</div>

<img src="img/print/bdd-2.png" class="print"></img>

<div class="mt-150 flex-row">
  <div class="flex-column gap-10">
    <ul class="text-level-3 no-bullets">
      <li class="fragment"><i class="emo emoji-x"></i>Different understanding
      <li class="fragment"><i class="emo emoji-thumbup"></i>Fewer regressions
      <li class="fragment"><i class="emo emoji-x"></i>Tests are difficult to write and to maintain <br> (the program wasn't designed with the tests in mind)
    </ul>
    <div class="sticky fragment">
      Better quality, but not efficient... <div class="fragment">and we intruced new difficulties&nbsp; :(</div>
    </div>
  </div>
  <div class="bubble bubble-bottom-left flex-row fragment">
    <i class="emo emo-36 emoji-face_with_monocle"></i>
    <span class="bubble__text">So...<br>What's the solution?</span>
  </div>
</div>


---

## The Behaviour Driven Development approach
<!-- .element: class="text-size-heading-3" -->

<div class="box flex-row screen fragment mt-100" style="padding:30px;">
  <div class="badge" data-arrow="->task-example">Problem to solve</div>
  <div class="badge fragment" id="task-example" data-arrow="->task-dev,->task-test">Specification <br>workshop</div>
  <div class="flex-column">
    <div class="badge fragment" id="task-dev" data-arrow="->task-prod">Development<br>(Developer)</div>
    <div class="badge fragment" id="task-test">
      Test automation<br>(Tester & Developer)
      <span class="fragment" data-arrow="task-test->task-dev"></span>
    </div>
  </div>
  <div class="badge fragment" id="task-prod">Production <br> deployment</div>
</div>

!!!!!!?????
Should we have a design workshop in the process ?

<img src="img/print/bdd-3.png" class="print"></img>

<p class="text-level-3 fragment">For each story, and before the development, we agree on a set of concrete <strong>key examples</strong> that illustrate how the feature should work

<ul class="mt-50 text-level-3 no-bullets">
  <li class="fragment"><i class="emo emoji-thumbup"></i>Shared understanding
  <li class="fragment"><i class="emo emoji-thumbup"></i>The team discover unknown unknowns earlier
  <li class="fragment"><i class="emo emoji-thumbup"></i>We get the <strong>Scenarios to automate</strong> out of the process
</ul>

---

## &lt;/> Define acceptance criteria
<!-- .element: data-toc-icon="code" data-toc-label="Verify the mini-basket" -->

<div class="block--exercice mt-250">
  <p>The Product Owner presents a new story:
  <ul>
    <li class="text-level-3"><i> As a shopper,<br>
    I want to see my basket content in the mini-basket,<br>
    so that I always know the basket's content and amount.</i>
  </ul>
  <p class="mt-125">As a team, define acceptance criteria for this story

</div>

Note:

_The trainer takes the role of the Product Owner, the participants are the testers. They must suggest acceptance criteria to the PO._
_The PO can show mockups or wireframes_
_The PO can kindly reject some criterias if he thinks they are not required right now. Example : displaying discounts.


_Possible list:_

- _The mini basket always shows the number of products in basket_
- _It contains basket entries (with prodcut name, quantity and price)_
- _When empty, it doesn't show the number of products in basket_
- _When empty, it informs the basket is empty_


---

## &lt;/> automate the verification with cypress
<!-- .element: data-toc-exclude class="text-size-heading-3"-->

<div class="block--exercice text-level-3">
  <p>During the specification workshop, we identifed some acceptance criteria.
  <p>Let's code
  <ul>
    <li>Automate the verification of the acceptance criteria
  </ul>
  <p>Cypress commands that may help
  <ul class="text-level-4">
    <li><code>visit</code>, <code>get</code>, <code>contains</code>, <code>click</code>, <code>should</code>
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/table-of-contents
    <li class="url-link">https://www.w3schools.com/cssref/css_selectors.php
    <li class="url-link">https://chromewebstore.google.com/detail/css-and-xpath-checker/aoinfihhckpkkcpholfhmkeplbhddipe
  </ul>
</div>

Note:

_The trainer writes and explains the tests for:_

- _The mini-basket always shows the number of products in basket_
- _When empty, it doesn't show the number of products in basket_

_The spec file can be created from the Cypress dashboard._

