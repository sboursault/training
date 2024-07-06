
<!-- .slide: id="good-tests" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 7</span>
  <h1>Isolated tests</h1>
</div>

---



## &lt;/> Specification workshop for the delivery fees
<!-- .element: data-toc-label="</> Verify the delivery fees" class="text-size-heading-3"-->

<div class="exercice">
  <p>The Product Owner presents a new story:
  <ul>
    <li class="text-level-3"><i>Delivery fees are free for orders over 30€</i>
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
    <li>Automate the most valuable acceptance criteria to verify the basket recovery
    <ul>
      <li>For baskets strictly bellow 30€, we charge 7€ delivery fees
      <li>For baskets strictly over 30€, we offer delivery fees
    </ul>
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


---


The initial data set contains no product sold exactly 30€.

So, how can we verify the case where the basket is exactly 30€ ?


- We could go in the admin and change the price of a product
  - this is a manual task and must be done each time the data set is restored
- ask a developer to include a product of 30€ in the initial data set
  - has limits :
    - what about it's stock ?
    - knowing the test suites becomes necessary to manage the initial data set
- change the price of a product using api
  - risk to break some tests if they already use this product
- create a product by api within the test, which costs exactly 30€ :)
  - This option makes the test more isolated from other tests

---


## What is tests isolation?

<div class="fragment mt-300">
  <p>Isolated tests can run in any order
  <p>Each test can run separately from the test suite
</div>

<p class="fragment mt-300">Ultimately, they can even run in parallel :)

---

## Verify the free delivery on a created product




http://localhost:8000/api/register/

---

## Optional


utiliser des comptes différents pour chaque fichier de spec

