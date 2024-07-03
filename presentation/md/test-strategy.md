
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

## Continuous Integration <br> / Continuous Delivery

<h3 class="fragment">Run automated tests on each release</h3>

<p class="text-level-2 fragment">as part of your CI/CD pipeline

<h3 class="fragment">Run E2E tests on a dedicated environment</h3>
<p class="text-level-2 fragment">A shared environment is not predictible
<p class="text-level-2 fragment">This environment is built as part of the CI/CD pipeline

Note:
On a shared environment, tests can fail for external reasons.
you must have clear control over the environment in which the tests run.

---

## &lt;/> Define env variables
<!-- .element: class="text-size-heading-3" -->

<div class="exercice text-level-3">

  <p>Let's code
  <ul>
    <li>Create Cypress env variables for the user's login and password 
    <li>Define these variables in a file named <code>env.staging.json</code>, near your <code>cypress.config.ts</code>
    <li>Create the npm script <code>cy:open:staging</code> in your <code>package.json</code> to use this specific file
  </ul>
  <p>Useful links
  <ul style="font-size:75%">
    <li class="url-link">https://gist.github.com/sboursault/192026364072fa43c99d2b7f9f52ce16
    <li class="url-link">https://docs.cypress.io/guides/references/configuration#setupNodeEvents
    <li class="url-link">https://docs.cypress.io/guides/guides/environment-variables
  </ul>


</div>



---

## Never ignore failing tests

<p class="mt-300 fragment">Fix flaky tests as soon as possible

<p class="fragment">If not fixed within a given time frame,<br> <strong>quarantine</strong> or <strong>delete</strong> the flaky test

<p class="fragment">Don't let flaky tests attack your confidence!

