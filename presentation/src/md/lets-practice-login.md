


<!-- .slide: id="lets-practice-login" class="slide--part-title slide--vcenter" -->


  <div class="part-title">
    <span class="text-level-4">Part 3</span>
    <h1>Let's practice</h1>
  </div>


Note:


Simplify code with dedicated selectors, custom command and page object


---

## &lt;/> Specification workshop for the login
<!-- .element: data-toc-label="</> Verify the login" -->

<div class="exercice text-level-3">
  <p>The Product Owner presents a new story:
  <ul>
    <li><i> As a shopper,<br>
    I want to login,<br>
    so that I can verify my last order</i>
  </ul>
  <p class="mt-125">As a team, define acceptance criteria for this story
</div>

Note:

_Possible list:_

- the login accepts valid credentials
- shows an error on invalid password


The user can be created manually.

---

## </> Automate the login verification
<!-- .element: data-toc-exclude -->

<div class="exercice">
  <p>Let's code
  <ul>
    <li>Automate the verification of the login acceptance criteria
    <li>Simplify the code with hooks, custom commands and page objects
  </ul>
  <p>Commands
  <ul>
    <li><code>cy.type()</code>
  </ul>
  <p>Userful links
  <ul style="font-size:75%">
    <li class="url-link">https://docs.cypress.io/api/table-of-contents
  </ul>
</div>
