
<!-- .slide: id="good-tests" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 2</span>
  <h1>Qualities of good tests</h1>
</div>

---

## Good automated tests are F.I.R.S.T

<div class="mt-5 fragment">

- Fast
- Isolated
- Repeatable
- Small
- Timely

</div>

Note:

Ask the trainee to list the qualities of a good test.
This is the one thing the learner should memorize.


---

<!-- .slide: class="slide--vcenter" -->

<div>
<h3>Fast</h3>

  <p class="fragment">The faster the test suite, the more offten it can run

  <p class="fragment">Shortening the feedback loop accelerates the development process
</div>
<!-- cost of switching subject -->

---

<!-- .slide: class="slide--vcenter" -->

<div>
  <h3>Isolated</h3>

  <p class="fragment">Isolated tests can run in any order

  <h3 class="fragment">Repeatable</h3>

  <p class="fragment">Repeatable tests don't depend on the state of the environment in which they run

  <p class="fragment apart">Without isolation and repeatability, you often get false positive. The biggest risk is too <strong>loose confidence in your tests</strong>.

</div>

Note: move the environment to a <strong>well-known state</strong> before they run

---

<!-- .slide: class="slide--vcenter" -->

<div>
  <h3>Small</h3>

  Avoid automating all UI end-to-end journeys. 

  Write **atomic** scripts so that when they fail, you know why.

</div>



Note:
originaly: Simple and Self-Verifying
- Test must be easy to read
- The purpose of a test should be obvious
- Apply clean code practices (DRY, KISS, Single responsibility, solid ?)

---

<!-- .slide: class="slide--vcenter" -->

<div>
  <h3>Timely</h3>

  <p class="fragment">Try to automate tests before development

  <div class="apart text-level-2">
  <!--When written before development / Benefits -->
  <ul>
    <li class="fragment">Production code is crafted so it's <strong>testable</strong>
    <li class="fragment">Tests are used to <strong>validate the changes</strong>
  </ul>
  </div>

  <p class="apart text-level-2 fragment">Testing before development is more fun,<br> more beneficial, more productive, and less frustrating

</div>

