
<!-- .slide: class="slide--part-title slide--vcenter" -->


<div class="part-title">
  <span class="text-level-4">Part 8</span>
  <h1>Test strategy</h1>
</div>

<div class="part-toc box fragment"></div>



Note:
- On va voir un ensemble de bonnes pratiques
  - certaines peuvent ne pas être adaptées à votre contexte, ou pas faisable
  - il n'est pas nécessaire de toutes les adopter


---

<!-- .slide: data-auto-animate -->
## Agile testing quandrants

<img class="mt-0 fragment" src="img/agile-testing-quandrands.jpg" style="max-width:60%" >

---
<!-- .slide: data-auto-animate -->

## Agile testing quandrants
<!-- .element: data-toc-exclude -->

<div class="flex-row text-level-4">

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


