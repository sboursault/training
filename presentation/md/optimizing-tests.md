

<!-- .slide: id="good-tests" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 5</span>
  <h1>Test optimization ?</h1>
</div>

---

<!-- .slide: class="slide--vcenter" -->

<div class="bubble bubble-bottom-left">
  <i class="emo emo-36 emoji-nerd_face"></i>
  <span class="bubble__text">How can we make our tests run faster?</span>
</div>

---

## Minimize UI interactions


<p class="fragment">Try to <strong>avoid the UI</strong> for all the parts of the tests <br> not dealing with <strong>UI-specific risks</strong>

<p class="fragment">Setup your tests through <strong>api</strong>, <strong>db access</strong>...

<p class="fragment">No UI set-up is <strong>faster</strong> and <strong>easier to maintain</strong>


A better option is to clear the basket through api
- api change less offten than ui
- the api call easier to develop
- the api call runs faster
- api are (offten) synchronous

Note:



From 50 quick ideas...
By avoiding the UI layer where it is not actually relevant for the purpose of the test, teams can save a lot of troubleshooting time and speed up feedback, while still keeping the same level of risk coverage.

Even when tests need to execute through the UI, minimise the part of the test that actually simulates user actions. Evaluate which parts of the tests are actually dealing with UI-specific risks, and try to automate everything else by avoiding the UI.

Set-up and clean-up tasks serve to make tests reliable and repeatable, but they do not actually deal with the user interface risk (or, more precisely, they should not – if a set-up task is testing things, it should be broken into several tests).




---

## optimize tests with a command/api to login and logout ?
