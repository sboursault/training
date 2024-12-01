

<!-- .slide: class="slide--vcenter" -->

<div class="bubble bubble-bottom-left">
  <i class="emo emo-36 emoji-nerd_face"></i>
  <span class="bubble__text">How to make this test repeatable?</span>
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

## Make the test repeatable
<!-- .element: data-tags="practice" class="text-size-heading-3" -->

<div class="exercice">
  <p>Let's code
  <ul>
    <li>Clear the basket before each test
    <pre><code class="sh">
curl -X DELETE https://.../api/baskets/{id} \
  --header "Authorization: Basic c3VwZXJ1c..."
    </code></pre>
  </ul>
  <p>Commands
  <ul class="small">
    <li><code>cy.request()</code>
    <li><code>btoa('bob@test.com:my-passwd')</code> to encode credentials
  </ul>
  <p>Userful links
  <ul style="small">
    <li>https://docs.cypress.io/api/table-of-contents
    <li>https://docs.cypress.io/api/commands/request
    <li>http://&lt;simple-commerce-instance&gt;/api/basket/
  </ul>
</div>


Note:

/api to get api documentation 
GET /api/basket gives the id and url of the basket

l'écriture est un peu compliqué (basic auth, btoa, double appel...), montrer l'exemple !

prepare the data before running the test, avoid reverting changes at the end of each tests.
- easier to understand the prerequesites of a test
- when a test fails, better to keep the system as is to facilitate debug


---

## WHY ?? - TODO

---

## Verify the basket recovery - part&nbsp;2
<!-- .element: data-tags="practice, optional" class="text-size-heading-3" -->

<div class="exercice">
  <p class="">Let's code
  <ul>
    <li>Automate the other acceptance criteria on the basket recovery
  </ul>
</div>
