

<!-- .slide: class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-4">Part 6</span>
  <h1 class="text-size-heading-1-smaller">Speed up E2E tests</h1>
</div>

<div class="part-toc box fragment"></div>


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

<div class="text-level-1">
<p class="fragment">Try to <strong>avoid the UI</strong> for all the parts of the tests not dealing with <strong>UI-specific risks</strong>

<div class="fragment mt-100">
  <p>Prefer direct <strong>API</strong> calls in the setup phase
  <ul>
    <li>API calls runs faster
    <li>APIs change less offten than UI
    <li>API calls are easier to automate
  </ul>
</div>

<p class="fragment">It's ok to develop missing APIs for test needs

<p class="fragment">Sometimes, direct <strong>db access</strong> can be a second-best alternative
</div>


---

## Speed up your tests
<!-- .element: data-tags="practice" -->

<div class="exercice text-level-3">
  <p>Let's code
  <ul>
    <li>In the tests which requires a logged user, replace the UI login by a simple http request
    <pre><code class="sh">
curl -i \
  -X POST \
  --header "Content-Type: application/json" \
  --data '{"username":"tom@test.com","password":"tom@test.com"}' \
  http://localhost:8000/api/login/  # ⚠️ don't forget the trailing "/"
    </code></pre>
  </ul>
  <p>Commands
  <ul>
    <li><code>cy.request()</code>
  </ul>
  
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/table-of-contents
    <li class="url-link">https://docs.cypress.io/api/commands/request
    <li class="url-link">http://&lt;simple-commerce-instance&gt;/api/login/
  </ul>
</div>

Note:
- Here the trainee implements the request call alone.
- I just have to show a curl example.
- Wath the time before and after change.

{% if(cy) { %}
---

## Cypress session

<p class="mt-400">To speed up the login, <code>cy.session()</code> can be a second-best alternative

<ul class="no-bullets mt-0">
  <li class="mt-50"><i class="emo emoji-thumbup"></i>Works when authencating with a direct HTTP call is not possible
  <li class="mt-50"><i class="emo emoji-x"></i>Small or no benefit when you have dedicated accounts for each test
</ul>

<small class="mt-500">Using <code>cy.session()</code>: https://docs.cypress.io/api/commands/session</small>


{% } %}

---

## Speed up your tests - part&nbsp;2 - TO COMPLETE
<!-- .element: data-tags="practice, optional" class="text-size-heading-3" -->

<div class="exercice">
  <p class="">Let's code
  <ul>
    <li>Use api calls to add a product to the basket
  </ul>
</div>


