
<!-- .slide: class="text-level-3" -->

## The problem with a conventional dev process
<!-- .element: class="text-size-heading-3" -->

<p class="fragment mt-200" data-fragment-index="1">When I started on my last project...

<div class="box flex-row mt-100 screen fragment" style="padding:40px;" data-fragment-index="2">
  <div class="rectangle" data-arrow="->task-dev">Specifications</div>
  <div class="rectangle fragment" data-arrow="->task-test" id="task-dev" data-fragment-index="3">Development<br>(Developer)</div>
  <div class="rectangle overlay-anchor fragment" data-arrow="->task-prod" id="task-test" data-fragment-index="4">Manual tests<br>(Tester)
    <div class="overlay overlay--friction fragment">
      <i class="emo emo-64 emoji-face_with_symbols_on_mouth"></i>
    </div>
  </div>
  <div class="rectangle fragment" id="task-prod" data-fragment-index="5">Production <br> deployment</div>
</div>

<p class="print"><img src="img/print/bdd-1.png"></img></p>

<div class="flex-row">
  <div class="flex-column tiny-gap">
    <ul class="mt-200 text-level-3 no-bullets">
      <li class="fragment"><i class="emo emoji-x"></i>Different understanding
      <li class="fragment"><i class="emo emoji-x"></i>Regressions happen
      <li class="fragment"><i class="emo emoji-x"></i>Too many non regression tests to execute manually
    </ul>
    <div class="sticky fragment">
      Not very satisfying &nbsp; :(
    </div>
  </div>
  <div class="bubble bubble-bottom-left fragment">
    <i class="emo emo-36 emoji-nerd_face"></i>
    <span class="bubble__text">Maybe we should automate <br> end to end tests...</span>
  </div>
</div>
    


---
<!-- .element: class="text-level-3" -->

<p class="mt-150">So, let's automate end to end tests...

<div class="box flex-row mt-150 screen fragment" style="padding:40px;" data-fragment-index="2">
  <div class="rectangle" data-arrow="->task-dev">Specifications</div>
  <div class="rectangle fragment" id="task-dev" data-arrow="->task-test" data-fragment-index="3">Development<br>(Developer)</div>
  <div class="rectangle overlay-anchor fragment" id="task-test" data-arrow="->task-prod" data-fragment-index="4">Test automation<br>(Tester & Developer)
    <div class="overlay overlay--friction fragment">
      <i class="emo emo-64 emoji-face_with_symbols_on_mouth"></i>
    </div>
  </div>
  <div class="rectangle fragment" id="task-prod" data-fragment-index="5">Production <br> deployment</div>
</div>

<img src="img/print/bdd-2.png" class="print"></img>

<div class="mt-200 flex-row">
  <div class="flex-column gap-10">
    <ul class="no-bullets">
      <li class="fragment"><i class="emo emoji-x"></i>Different understanding
      <li class="fragment"><i class="emo emoji-thumbup"></i>Fewer regressions
      <li class="fragment"><i class="emo emoji-x"></i>Tests are difficult to write and to maintain <br> (the program wasn't designed with the tests in mind)
    </ul>
    <div class="sticky fragment">
      Better quality, but not efficient… <div class="fragment">and we intruced new difficulties&nbsp; :(</div>
    </div>
  </div>
  <div class="bubble bubble-bottom-left fragment">
    <i class="emo emo-36 emoji-face_with_monocle"></i>
    <span class="bubble__text">So…<br>What's the solution?</span>
  </div>
</div>


---
<!-- .element: class="text-level-3" -->

## The Behaviour Driven Development approach
<!-- .element: class="text-size-heading-3" -->

<div class="box flex-row screen fragment mt-125" style="padding:30px;">
  <div class="rectangle" data-arrow="->task-example">Problem to solve</div>
  <div class="rectangle fragment" id="task-example" data-arrow="->task-dev,->task-test">Specification <br>workshop</div>
  <div class="flex-column">
    <div class="rectangle fragment" id="task-dev" data-arrow="->task-prod">Development<br>(Developer)</div>
    <div class="rectangle fragment" id="task-test">
      Test automation<br>(Tester & Developer)
      <span class="fragment" data-arrow="task-test->task-dev:validate"></span>
    </div>
  </div>
  <div class="rectangle fragment" id="task-prod">Production <br> deployment</div>
</div>

<img src="img/print/bdd-3.png" class="print"></img>

<p class="fragment mt-125">For each story, and before the development, we agree on a set of concrete <strong>key examples</strong> that illustrate how the feature should work

<div class="flex-row flex-row--center">
  <ul class="mt-100 no-bullets">
    <li class="fragment"><i class="emo emoji-thumbup"></i>Shared understanding
    <li class="fragment"><i class="emo emoji-thumbup"></i>The team discover unknown unknowns earlier
    <li class="fragment"><i class="emo emoji-thumbup"></i>We get the <strong>Scenarios to automate</strong> out of the process
  </ul>
</div>

Note:
We can add a design workshop in the process to prevent non testable code.

---

## &lt;/> Define acceptance criteria
<!-- .element: data-toc-label="</> Verify the mini-basket" -->

<div class="exercice">
  <p>The Product Owner presents a new story:
  <ul>
    <li class="text-level-4"><i> As a shopper,<br>
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

- Toggle
  - _The mini basket always shows the number of products in basket_
  - _When empty, it doesn't show the number of products in basket_
- Detail
  - _It contains basket entries (with prodcut name, quantity and price)_
  - _When empty, it informs the basket is empty_


---

## &lt;/> Automate the verification with cypress
<!-- .element: data-toc-exclude class="text-size-heading-3"-->

<div class="exercice text-level-3">
  <p>Let's code
  <ul>
    <li>Automate the verification of the acceptance criteria identified during the specification workshop
  </ul>
  <p>Commands
  <ul>
    <li class="text-level-5"><code>cy.visit()</code>, <code>cy.get()</code>, <code>cy.contains()</code>, <code>cy.click()</code>, <code>cy.should()</code>
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/table-of-contents
    <li class="url-link">https://www.w3schools.com/cssref/css_selectors.php
    <li class="url-link">https://chromewebstore.google.com/detail/css-and-xpath-checker/aoinfihhckpkkcpholfhmkeplbhddipe
  </ul>
</div>

Note:

_The teacher shows how to automate the tests on the toggle, the trainee repeats and automaite the tests on the detail_

_The spec file can be created from the Cypress dashboard._



