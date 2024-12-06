


{% if(pw) { %}

https://playwright.dev/docs/browser-contexts#how-playwright-achieves-test-isolation

Playwright uses browser contexts to **achieve** Test Isolation. Each test has its own Browser Context. Running the test creates a new browser context each time.

---

{% } %}

## &lt;/> Specification workshop for the delivery fees
<!-- .element: data-toc-label="</> Verify the delivery fees" class="text-size-heading-3"-->

<div class="exercice">
  <p>The Product Owner presents a new story:
  <ul>
    <li class="text-level-4"><i>Delivery fees are free for orders over 30€</i>
  </ul>
  <p class="mt-125">As a team, define acceptance criteria for this story
</div>

Note:

_Possible list:_
- basket amount bellow 30€ -> delivery fees are charged 7€
- basket amount equals 30€ -> delivery fees are charged 7€
- basket amount over 30€   -> delivery fees offered


---

## </> Automate the delivery fees verification
<!-- .element: data-toc-exclude class="text-size-heading-3" -->

<div class="exercice mt-150">
  <p>Let's code
  <ul>
    <li>Automate the most valuable acceptance criteria to verify the delivery fees
    <ul>
      <li>For baskets strictly bellow 30€, we charge 7€ delivery fees
      <li>For baskets strictly over 30€, we offer delivery fees
    </ul>
  </ul>
  <p>Functions
  <ul>
    <li>?
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/table-of-contents
  </ul>
</div>

Note:


---

<!-- .slide: class="text-level-3" -->

<div class="flex-row flex-row--center mt-300" >
  <div class="bubble bubble-bottom-left">
    <i class="emo emo-36 emoji-face_with_monocle"></i>
    <div class="bubble__text">
    <p>How to verify the delivey fees when the basket is <strong>exactly</strong> 30€?
    <p>There's no product sold exactly 30€ in the initial data set
    </div>
  </div>
</div>


<div class="mt-400 flex-row flex-row--center fragment">

<div style="width:80%; padding-left:2em;">

<p>In the <strong>test setup</strong>, call the <strong>product api</strong> to create a new product sold 30€

<ul class="no-bullets mt-0">
  <li class="mt-50"><i class="emo emoji-thumbup"></i>No modification of a product that may be used in another test
  <li class="mt-50"><i class="emo emoji-thumbup"></i>Keeps the initial data unchanged
  <li class="mt-50"><i class="emo emoji-thumbup"></i>If there's a problem with this product in the future, anybody will be confident to fix it, without fear of breaking another test
</ul>

</div>

</div>

Note:

- We could go in the admin and change the price of a product
  - this is a manual task and must be done each time the data set is restored
- ask a developer to include a product of 30€ in the initial data set
  - has limits :
    - what about it's stock ?
    - knowing the test suites becomes necessary to manage the initial data set
- change the price of a product using api
  
  - Imagine your test suite is quite long,
You're not sure which products are already used in existing tests.
    - There's a risk to break some tests if they already use this product

- create a product by api within the test, which costs exactly 30€ :)
  - This option makes the test more isolated from other tests

---

<!-- .slide: class="text-level-2" -->

## Delivery fees when the basket is exactly 30€
<!-- .element: data-tags="practice" class="text-size-heading-3" data-toc-label="...when the basket is exactly 30€" -->

<app-exercise class="mt-350r fragment">
  <p>Let's code
  <ul>
    <li>Through the product api, create a new product sold 30€
    <li>Verify the delivery fees with this product
    <li>Rewrite so that the test shows the price of the new product
  </ul>
</app-exercise>

<app-help class="fragment mt-600r">
  <div style="columns: 2;">
    <p>Functions
    <ul>
      <li>Generate random identifiers: <code>crypto.randomUUID()</code> 
      <li>Encode admin credentials: <code>btoa('superuser@example.com:testing')</code>
    </ul>
    <p>Links
    <ul>
      <li>https://docs.cypress.io/api/table-of-contents</li>
      <li>https://docs.cypress.io/api/commands/request</li>
      <li>http://&lt;simple-commerce-instance&gt;/api/admin/products/</li>
    </ul>
  </div>
</app-help>

---

<!-- .slide: class="text-level-2" -->

<p class="mt-100r">How to create a new product?

<pre><code class="sh">
curl -i \
  -X POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Basic c3VwZXJ1c2VyQGV4YW1wbGUuY29tOnRlc3Rpbmc=" \
  --data '
  {
    "slug": "aaaa",
    "product_class": "book",
    "stockrecords": [
      {
        "partner": "/api/admin/partners/3/",
        "partner_sku": "aaaa",
        "price_currency": "EUR",
        "price": 15,
        "num_in_stock": 100
      }
    ]
  }' \
  http://localhost:8000/api/admin/products/

  # ⚠️ don't forget the trailing "/" at the end of the url
  # ⚠️ `slug` and `stockrecords[].partner_sku` must be unique
</code></pre>

</div>

---

## What is test isolation?

<div class="fragment mt-300">

<div class="fragment custom highlight-bold text-center">
  <p >The result of a test should never depend 
  <br>on the result of preceding tests
</p>
</div>

</div>

<div class="fragment mt-300">
  <p> In practice
  <ul>
    <li class="fragment">Isolated tests can run in <strong>any order</strong>
    <li class="fragment">Each test can run <strong>separately from the test suite</strong>
    <li class="fragment">Ultimately, tests can even run in <strong>parallel</strong>!
  </ul>
</div>


Note:
- In practice
  - When an isolated test fails, you don't need to investigate on what happend before.
The issue is either within the test or the verified code

---

## How to isolate tests?

<p class="fragment mt-150r">Before running, each test should set up the environment to a known state

<p class="fragment mt-150r">On the <strong>browser side</strong>, Cypress already cleans the context between each test  (DOM, cookies, local and session storage)

<div class="fragment mt-150r">
  <p>On the <strong>server side</strong>, you may need to
  <ul>
    <li>create a dedicated user for the user
    <li>create dedicated products, or verify their availability
    <li>etc.
  </ul>
</div>

Note:
To enforce test isolation...

---

## Benefits

<p class="mt-200">It’s far more practical to clean up environments in test setups, before each test executes
<ul>
  <li>When a tests fails, clean-up code might remove important information, making it harder to investigate
  <li>Clean-up procedures after testing may not be executed
  <li>In test setup, you only need to prepare the data relevant for the current test
  <li>When a bug causes a test failure, you will only need to investigate that single test, not 500 other false alarms
  <li>You may parallelize your test run
</ul>


---

## Run tests with distinct user accounts
<!-- .element: data-tags="practice, optional" class="text-size-heading-3" -->

<div class="exercice">
  <p class="">Let's code
  <ul>
    <li>In the test setup, create a dedicated user and use it throughout the test
  </ul>
</div>


