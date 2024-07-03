

<!-- .slide: id="good-tests" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 5</span>
  <h1>Speed up E2E tests</h1>
</div>

---

## Why optimizing test speed?

<p class="fragment mt-500">The faster the tests, the more they are run

<div class="fragment mt-200">
  <p>Shorten the feedback loop
  <ul>
    <li>Ultimately, the developer should get feedback when he's still working on the issue
  </ul>
</div>

Note:
encourage the developers to run E2E tests on their machine before pushing their code

---

<!-- .slide: class="slide--vcenter" -->

<div class="bubble bubble-bottom-left">
  <i class="emo emo-36 emoji-nerd_face"></i>
  <span class="bubble__text">How can we make our tests run faster?</span>
</div>

Note:

The login can be verified once, and then for each test that require logging, this can be done through a direct call

---

## Minimize UI interactions

<p class="fragment">Try to <strong>avoid the UI</strong> for all the parts of the tests <br> not dealing with <strong>UI-specific risks</strong>

<div class="fragment mt-100">
  <p>Prefer <strong>api</strong> calls in the setup phase
  <ul>
    <li>Api change less offten than ui
    <li>An api call is offten easier to develop
    <li>Api calls runs faster
    <li>Api are (offten) synchronous
  </ul>
</div>

<p class="fragment">It's ok to develop missing apis for test needs

<p class="fragment">Sometimes, direct <strong>db access</strong> can be a second-best alternative

Note:

From 50 quick ideas...
By avoiding the UI layer where it is not actually relevant for the purpose of the test, teams can save a lot of troubleshooting time and speed up feedback, while still keeping the same level of risk coverage.

Even when tests need to execute through the UI, minimise the part of the test that actually simulates user actions. Evaluate which parts of the tests are actually dealing with UI-specific risks, and try to automate everything else by avoiding the UI.

Set-up and clean-up tasks serve to make tests reliable and repeatable, but they do not actually deal with the user interface risk (or, more precisely, they should not – if a set-up task is testing things, it should be broken into several tests).




---

## optimize tests with a command/api to login and logout ?
