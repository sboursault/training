
<!-- .slide: class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <span class="text-level-3">Part 8</span>
    <h1>Test strategy</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>

---

<!-- .slide: data-auto-animate -->
## Agile testing quandrants

<img class="mt-0 fragment" src="img/agile-testing-quandrands.jpg" style="max-width:60%" >

---
<!-- .slide: data-auto-animate -->

## Agile testing quandrants
<!-- .element: data-toc-exclude -->

<div class="flex-row text-level-3">

  <img class="screen" src="img/agile-testing-quandrands.jpg" style="max-width:50%" >

  <div>
    <div class="">To succeed, you probably need tests from each quadrants!</div>
    <div class="mt-150 fragment">You can't automate everything</div>
    <p class="fragment">So, focus on:</p>
    <ul>
      <li class="fragment">Critical paths (eg. registration)</li>
      <li class="fragment">Risk areas (eg. payment)</li>
      <li class="fragment">Parts that are hard to test manually</li>
    </ul>
  </div>
</div>


Notes:
What type of tests do you know?
  put them on a board as people give them, organized like the quadrant
Which ones are necessary to succeed?
- What is diffcult to test manually should be automated
- What is difficult to automate, could be verified manually
- You can't automate everything
- Automated tests free testers up to focus on more exploratory-type testing

- Risk areas include checkout, payemnts, etc.
- Hard to test manually:
  - complex setup (data, configuration...)
  - tests on multiple device
  - etc.


---

## Behaviour driven development

Before the development, a programmer, a tester and the PO have a conversation to clarify the acceptance criteria for a user story
<!-- .element: class="fragment" -->

We call it a **Specification workshop** (aka **3 amigos** or **Discovery workshop**)
<!-- .element: class="fragment" -->

During the workshop, the participants agree on concrete **key examples** that illustrate how the feature should work
<!-- .element: class="fragment" -->

These examples becomes the acceptance criteria for the story: they'll be automated and verified with E2E tests
<!-- .element: class="fragment" -->


Note:

Surtout expliquer qu'on se réunit avant de démarrer le développement pour comprendre le périmètre de la story,
et comment la vérification sera automatisée

Participants
- A programmer, who thinks about how to make things, says what is feasable, suggests simpler paths
- A tester, who thinks about how to break things, and come up with lots of scenarios, sometimes covering obscure edge cases, and sometimes covery very important ones 
- The product owner, who cares about scope
- Anybody relevant to the story being discussed (operations, UX designer...)-->

---

## Who automates the tests?

<p class="mt-250 fragment">Favour a <strong>whole team approach</strong></p>

<p class="mt-150 text-level-2 fragment">Developers and testers work together to</p>
<ul class="text-level-2">
  <li class="fragment">Build and maintain the test infrastructure</li>
  <li class="fragment">Design testable code</li> <!-- Developers write more testable code -->
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

## Continuous Integration and Delivery
<!-- .element: class="mt-50 text-size-heading-2" -->


<p class="fragment mt-400">Run automated tests on each release, as part of your CI/CD pipeline

<div class="fragment mt-400">
  <p>Run E2E tests on a <strong>dedicated environment</strong>
  <ul>
    <li>A shared environment is not predictible
    <li>Try to build the environment as part of your CI/CD pipeline
  </ul>
</div>

Note:
On a shared environment, tests can fail for external reasons.
you must have clear control over the environment in which the tests run.

---

## &lt;/> Env variables
<!-- .element: class="mt-50 text-size-heading-3" -->

<div class="exercice text-level-5">

  <p class="mt--50">Let's code
  <ul>
    <li>Install <strong>dotenvx</strong>

```sh
npm install @dotenvx/dotenvx
```  

<li>Create a file named <code>.env</code> with these variables

```properties
# .env
CYPRESS_BASE_URL=http://127.0.0.1:8000/
CYPRESS_ADMIN_LOGIN=tom@test.com
CYPRESS_ADMIN_PASSWD=tom@test.com
```

<li>Update the scripts in <code>package.json</code>

```json
"scripts": {
  "cy:open": "dotenvx run -f .env -- npx cypress open --e2e --browser chromium",
},
```

<li>Rewrite tests to use the env variables and verify they still pass

  </ul>
  
  <p class="mt-50">Commands
  <ul>
    <li><code>cy.env()</code>
  </ul>

  <p class="mt-75">Useful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/guides/guides/environment-variables
    <li class="url-link">https://github.com/dotenvx/dotenvx
  </ul>

</div>

---

## &lt;/> Env variables
<!-- .element: data-toc-exclude class="text-size-heading-3" -->

<div class="exercice text-level-4">

  <p class="mt-50">Let's code
  <ul>
    <li>Copy your <code>.env</code> file to a file named <code>.env.e2e</code>
    <li>In <code>package.json</code>, add a script to target the e2e environment

```json
"scripts": {
  "cy:open:e2e": "dotenvx run -f .env.e2e -- npx cypress open --e2e --browser chromium",
},
```

<li>Change the value of <code>CYPRESS_BASE_URL</code> in <code>.env.e2e</code> and watch the test fail

<li>Define a system env varibale named <code>CYPRESS_BASE_URL</code> with the right value and watch the test pass


  </ul>
  <p>Useful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/guides/guides/environment-variables
    <li class="url-link">https://github.com/dotenvx/dotenvx
  </ul>

</div>


---
 
## Excluding and Including Tests

<div class="text-level-3">
<p>Sometimes you just want to run a subset of your test suite
<ul>
  <li>Some test may not run on all environments
  <li>You may want to run only the test concerning a specific domain
</ul>
</div>

<div class="fragment">

```typescript
it('sends an email to confirm email address',
    { tags: ['sendsEmail'] },
    () => {
      // some verification that may not work on all environments
    })
```

<!-- .element: class="mt-50" -->


```sh
npx cypress run --env grepTags=-sendsEmail  # runs all tests without the tag 'sendsEmail'
```

</div>

<p class="fragment text-level-4">How to use <strong>@cypress/grep</strong>:<br><a href="https://github.com/cypress-io/cypress/tree/develop/npm/grep">https://github.com/cypress-io/cypress/tree/develop/npm/grep</a>


---

## Never ignore failing tests

<div class="fragment custom highlight-bold mt-300">
  <p class="fragment custom blink-then-stop text-center">Fix flaky tests as soon as possible
</p>
</div>

<p class="fragment mt-200">If not fixed within a given time frame, <strong>quarantine</strong> or <strong>delete</strong> the flaky test

<p class="fragment">Don't let flaky tests attack your confidence!



---

add slide to introduce tech design workshop
