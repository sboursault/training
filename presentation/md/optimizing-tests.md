

<!-- .slide: id="good-tests" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 6</span>
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

<div class="text-level-2">
<p class="fragment">Try to <strong>avoid the UI</strong> for all the parts of the tests <br> not dealing with <strong>UI-specific risks</strong>

<div class="fragment mt-100">
  <p>Prefer <strong>api</strong> calls in the setup phase
  <ul>
    <li>Api calls runs faster
    <li>Api change less offten than ui
    <li>An api call is offten easier to develop
    <li>Api are (offten) synchronous
  </ul>
</div>

<p class="fragment">It's ok to develop missing apis for test needs

<p class="fragment">Sometimes, direct <strong>db access</strong> can be a second-best alternative
</div>


---

## </> Speed up your tests
<!-- .element: class="text-size-heading-3" -->

<div class="exercice text-level-2">
  <p>Let's code
  <ul>
    <li>In the tests which requires a logged user, replace the UI login by a simple http request
  </ul>
  <pre class="mt-50">
    <code>curl -X POST https://.../api/login \
  -u "tom@test.com:tom@test.com"</code>
  </pre>
  <p>Commands that may help
  <ul>
    <li><code>cy.request()</code>, <code>debugger</code>
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/table-of-contents
    <li class="url-link">https://docs.cypress.io/api/commands/request
    <li class="url-link">http://&lt;simple-commerce-instance&gt;/api/login/
  </ul>
</div>


