
<!-- .slide: id="good-tests" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 4</span>
  <h1>Repeatable tests</h1>
</div>

---


## &lt;/> Specification workshop for the basket recovery
<!-- .element: data-toc-label="</> Verify the basket recovery" class="text-size-heading-3"-->

<div class="exercice">
  <p>The Product Owner presents a new story:
  <ul>
    <li class="text-level-3"><i> As a shopper,<br>
    I want to recover my basket,<br>
    so that I don't have to fill it again when I come back</i>
  </ul>
  <p class="mt-125">As a team, define acceptance criteria for this story
</div>

Note:

_Possible list:_

- After login, the mini basket contains the items from my last session
- After logout, the mini basket is empty
- After login, the product also contain the items I added as an anonymous user
- After login, the mini basket contains both the items from my last session and those from my current basket



The user can be created manually.

---

## </> Automate the basket recovery verification
<!-- .element: data-toc-exclude class="text-size-heading-3" -->

<div class="exercice mt-150">
  <p>Let's code
  <ul>
    <li>Automate the most valuable acceptance criteria to verify the basket recovery
  </ul>
  <p>Commands that may help
  <ul>
    <li>?
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/table-of-contents
  </ul>
</div>

Note:

The teacher starts a <strong>simple</strong> and <strong>valuable</strong> scenario
- After login, the mini basket contains the items from my last session

add SimpleCommerceApp.login() ?

problem : the test is not repeatable

---

<!-- .slide: class="slide--vcenter" -->

<div class="bubble bubble-bottom-left">
  <i class="emo emo-36 emoji-nerd_face"></i>
  <span class="bubble__text">How can we make our tests repeatable?</span>
</div>

Note:
We need to either pick a new user, or clear the basket between each test
This can be done through the ui, but this is tricky to implement
A better option is to clear the basket through api

A developer gives this trick :
"call /api/basket/ to get the basket url and then delete it"
curl -X GET https://.../api/basket/ -u "tom@test.com:tom@test.com"
curl -X DELETE https://.../api/basket -u "tom@test.com:tom@test.com"

---

## </> Make the test repeatable
<!-- .element: class="text-size-heading-3" -->

<div class="exercice">
  <p>Let's code
  <ul>
    <li>Clear the basket before each test
  </ul>
  <pre class="mt-50">
    <code>curl -X DELETE https://.../api/basket \
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
    <li class="url-link">http://&lt;simple-commerce-instance&gt;/api/basket/
  </ul>
</div>


Note:

prepare the data before running the test, avoid reverting changes at the end of each tests.
- easier to understand the prerequesites of a test
- when a test fails, better to keep the system as is to facilitate debug


---

## </> Optional: Let's practice
<!-- .element: class="text-size-heading-3" -->

<div class="exercice">
  <p class="">Let's code
  <ul>
    <li>Automate the other acceptance criteria on the basket recovery
  </ul>
</div>
