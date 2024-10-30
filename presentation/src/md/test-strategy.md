
<!-- .slide: class="text-level-1" -->

## Technical design workshop

<div class="mt-150 fragment">
  <p>To ensure a new feature will be testable, have a <strong>technical design workshop</strong> and ask:
  <p class="text-center"><b>How will we test this?</b>
</div>

<div class="mt-150 fragment">
  <p>And more specifically
  <ul>
    <li>Do we need dedicated selectors?
    <li>If there are asynchronous processes, how can we know when they are finished? 
  </ul>
</div>

<p class="mt-150 fragment">It doesn't have to be a formal meeting, but at least, try to ask the question before the development starts

Note: 

Consider having a technical design workshop, where you ask this question:

"How will we test this?"

---

## Good End-to-End tests

<div class="flex-row flex-row--center">
<div>
  <p class="mt-300r">Remember, your tests should be
  <ul class="ms-200r">
    <li>Maintainable
    <li>Fast
    <li>Repeatable
    <li>Islated
  </ul>
</div>
</div>

---

## Who automates the tests?

<p class="mt-300 fragment">Favour a <strong>whole team approach</strong></p>

<p class="mt-250 fragment">Developers and testers work together to</p>
<ul>
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

## Browsers and mobile devices


<div class="mt-200 fragment">
  <p>Consider running your tests on multiple browsers
  <ul>
    <li>
      <a href="https://gs.statcounter.com/browser-market-share/all/europe">
        Browser Market Share
      </a>
    </li>
  </ul>
</div>

<div class="mt-200 fragment">
  <p>Consider runnging your tests on mobile AND desktop
  <ul>
    <li>
      <a href="https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/europe">
        Desktop vs Mobile vs Tablet Market Share
      </a>
    </li>
  </ul>
</div>

<div class="flex-row flex-row--center">
  <div class="mt-200 sticky fragment">
    <u>Caution:</u>
    <div class="sticky__content">
      Multi device/browser automation requires <br><u>extra effort</u>
      in writing, maintenance and execution
    </div>
  </div>
</div>

---

## Never ignore failing tests

<div class="fragment">
<div class="fragment custom highlight-bold mt-300">
  <p class="fragment custom blink-then-stop text-center">Fix flaky tests as soon as possible
</p>
</div>
</div>

<p class="fragment mt-300">Don't let flaky tests attack your confidence!

<p class="fragment mt-200">If not fixed within a given time frame, <strong>quarantine</strong> or <strong>delete</strong> the flaky test


