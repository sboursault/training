
<!-- .slide: id="good-tests" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 4</span>
  <h1>Repeatable tests</h1>
</div>

---


## &lt;/> Specification workshop for the basket recovery
<!-- .element: data-toc-icon="code" data-toc-label="Verify the basket recovery" class="text-size-heading-3"-->

<div class="block--exercice mt-250">
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

<div class="block--exercice text-level-1">
  <p>Let's code
  <ul>
    <li>Automate the verification of the login acceptance criteria
  </ul>
  <p>Cypress commands that may help
  <ul>
    <li><code>type</code>
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/table-of-contents
  </ul>
</div>

Note:

The teacher starts a simple and valuable scenario
- After login, the mini basket contains the items from my last session
add SimpleCommerceApp.login()

problem : the test is not repeatable.
We need to either pick a new user, or clear the basket between each test
This can be done through the ui, but this is tricky to implement
A better option is to clear the basket through api
- api change less offten than ui
- the api call easier to develop
- the api call runs faster
- api are (offten) synchronous
A developer gives this trick :
"call /api/basket/ to get the basket url and then delete it"
curl -X GET https://.../api/basket/ -u "tom@test.com:tom@test.com"
curl -X DELETE https://.../api/basket -u "tom@test.com:tom@test.com"

---

## </> Make the tests repeatable
<!-- .element: class="text-size-heading-3" -->

<div class="block--exercice text-level-1">
  <p>Let's code
  <ul>
    <li>Clear the basket before each test<br/>
    <pre style="width:auto;">
      <code>curl -X DELETE https://.../api/basket \
    -u "tom@test.com:tom@test.com"</code>
    </pre>
  </ul>
  <p>Cypress commands that may help
  <ul>
    <li><code>request</code>
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/table-of-contents
    <li>LINK TO THE API DOC
  </ul>
</div>


Note:

prepare the data before running the test, avoid reverting changes at the end of each tests.
- easier to understand the prerequesites of a test
- when a test fails, better to keep the system as is to facilitate debug

---

## make it REPEATABLE by clearing the basket by API, need DEBUG, cy.request, minimize ui interractions ?

