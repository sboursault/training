
<!-- .slide: id="test-strategy" class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <span class="text-level-3">Part 4</span>
    <h1>Test strategy</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>

---





<!-- .slide: data-auto-animate -->
<h2 class="slide-title">Agile testing quandrants</h2>

<img class="mt-0 fragment" src="img/agile-testing-quandrands.jpg" style="max-width:60%" >

---
<!-- .slide: data-auto-animate -->

<h2 class="slide-title screen">Agile testing quandrants</h2>

<div class="flex-row text-level-3">

  <img class="screen" src="img/agile-testing-quandrands.jpg" style="max-width:50%" >

  <div>
    <div class="">To succeed, you probably need tests from each quadrants!</div>
    <div class="mt-3 fragment">You can't automate everything</div>
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

<h2 class="slide-title">3 amigos</h2>


---

<h2 class="slide-title">Who automates the tests?</h2>

<p class="mt-5 fragment">Favour a <strong>whole team approach</strong></p>

<p class="mt-3 text-level-2 fragment">Developers and testers work together to</p>
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

<h2 class="slide-title">Continuous Integration <br> / Continuous Delivery</h2>

<h3 class="mt-4 fragment">Run automated tests on each release</h3>

<p class="text-level-2 fragment">as part of your CI/CD pipeline

<h3 class="fragment">Run E2E tests on a dedicated environment</h3>
<p class="text-level-2 fragment">A shared environment is not predictible
<p class="text-level-2 fragment">This environment is built as part of the CI/CD pipeline

Note:
On a shared environment, tests can fail for external reasons.
you must have clear control over the environment in which the tests run.

---

<h2 class="slide-title">Never ignore failing tests</h2>

<p class="mt-6 fragment">Fix flaky tests as soon as possible

<p class="fragment">If not fixed within a given time frame,<br> <strong>quarantine</strong> or <strong>delete</strong> the flaky test

<p class="fragment">Don't let flaky tests attack your confidence!

