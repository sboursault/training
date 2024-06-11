
<!-- .slide: id="e2e-tests-dev-process" class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <h1 class="text-size-heading-2">Behaviour Driven Development</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>

---

## Acceptance criteria

A user story is composed of...

<div class="block">
  
  <div class="flex-row fragment">
    <div class="box text-level-4" style="text-align:center; width:15%;">
       a user story <br> template
    </div>
    <div class="text-level-3 fragment" style="width:80%">
      <i><strong>As a</strong> user,<br>
      <strong>I want to</strong> use a search field to type a city, name, or street,<br>
      <strong>so that</strong> I could find matching hotel options.</i>
    </div>
  </div>

  <div class="flex-row mt-200 fragment">
    <div class="box text-level-4" style="text-align:center; width:15%;">
       and its <br> acceptance criteria
    </div>
    <ul class="fragment" style="margin: 0; width:80%">
      <li class="text-level-5">The search field is placed on the top bar
      <li class="text-level-5">Search starts once the user clicks “Search”
      <li class="text-level-5">The field contains a placeholder with a grey-colored text: “Where are you going?”
      <li class="text-level-5">The placeholder disappears once the user starts typing
      <li class="text-level-5">Search is performed if a user types in a city, hotel name, street, or all combined
      <li class="text-level-5">...
    </ul>
  </div>
</div>


---

<p class="mt-125 fragment">Acceptance tests comes out of acceptance criteria

<div class="mt-125 fragment">
<!--Thinking about tests before development is more efficient <br>  and favors a <strong>whole team approach</strong> on E2E testing-->
Plutôt qu'une personne qui vérifie les critères d'acceptation
</div>

it is far better to focus on illustrating user stories with key examples.

Key examples are a small number of relatively simple scenarios that are easy to understand, evaluate for completeness and critique.

If there are too many rules, break them down into several groups of smaller examples

Several simple groups of key examples are much easier to understand and implement than a huge list of complex scenarios.

Overly complex examples, or too many examples, are often a sign that some important business concepts are not explicitly described.

---

## How to make it work


- Start with the simplest key example 
  - Always prefer actual values over generalisations
- Underline the parts of the example that are most relevant to the feature or rule. Make sure you distinguish between inputs and outputs.
- Using the values you have underlined, create a table with column names for each input and each output.

Dans les tp, proposer des règles de gestion floues, qui pourront être affinées avec tests



---

## Specification workshop



<p class="mt-300">Tips to make it work:
<ul>
<li class="text-level-2 fragment">Invite whoever is relevant (operations, UX designer...)
<li class="text-level-2 fragment">Keep Discovery Workshops short and frequent (15 min. per story, every other day)
<li class="text-level-2 fragment">Don't make it a big ceremony, just ask for examples
</ul>

---



## Acceptance criteria

<p class="fragment">Illustrate rules with <strong>key examples</strong> and <strong>counter examples</strong>

<p class="text-level-2 mt-125 fragment">Howto:
<ul>
<li class="text-level-2 fragment">Prefer actual values over generalisations (unless the value is irrelevant to the rule)
<li class="text-level-2 fragment">Use natural language (the given/when/then structure can come later)
<li class="text-level-2 fragment">Discover extra paths with the <a href="#/shaded-figs">shaded figs</a>
<li class="text-level-2 fragment">Make a table when there are 3 or more examples
<li class="text-level-2 fragment">Group rules when there are too many
</ul>

<p class="text-level-2 mt-125 fragment">Too many examples for a rule (more than 5)? look for hidden concepts



---

<!-- .slide: id="test-strategy" class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <h1>Test strategy</h1>
  </div>
  
  <div class="part-toc box fragment"></div>

</div>



---

## Automated tests in the dev process

<div class="box fragment">
  <p class="box__title">Sprint</p>
  <div class="flex-row">
    <div class="badge" id="box-1">User story</div>
    <div class="badge fragment" id="box-2">Acceptance criteria</div>
    <div class="badge fragment" id="box-3">Automated tests</div>
    <div class="badge fragment" id="box-4">Validates the <br> new feature</div>
  </div>
</div>
<div class="box fragment">
  <p class="box__title">Future sprints</p>
  <div class="flex-row">
    <div class="badge" id="box-5">Regression tests</div>
    <div class="badge fragment" id="box-6">Living documentation</div>
  </div>
</div>

Notes:
The Acceptance tests comes out of acceptance criteria.
Thinking about tests before development is more efficient:
 - the developer and the tester are aligned on the scope of the change
 - the developer writes testable code
When automating a test, one must have these 3 finalities in mind.
We need to balance completeness, clarity and speed.


---

<!-- .slide: id="extra-tips" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <h1>Extra tips</h1>
</div>

---

## Test you apis

---

### Make async APIs testable

<p class="text-level-2">Ask "what happens instead?" to prove that something does not happen</p>

See "Ask 'what happens instead?'" in 50 quick ideas. Maybe you can subscribe to an error topic...




---

<!-- .slide: id="extra-tips" class="slide--part-title slide--vcenter" -->

<div class="part-title">
  <span class="text-level-3">Part 5</span>
  <h1>Extra tips</h1>
</div>

---

## Test you apis

---

<!-- .slide: id="test-strategy" class="slide--part-title slide--vcenter" -->

<div class="flex-row">

  <div class="part-title">
    <h1>Annex</h1>
  </div>

  <div class="part-toc box fragment"></div>

</div>



---
<!-- .slide: id="shaded-figs" -->


## Find alternative paths

Use the ‘shaded figs’ to find alternative path to verify
<br/><span class="text-level-5">from [50 quick ideas to improve your tests](https://leanpub.com/50quickideas-tests/read)</span>

<table class="text-level-4">
<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Scary<br/>😱<td>
<td>What would scare each stakeholder the most about this piece of functionality?</td>
</tr>
<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Happy<br/>🙂<td>
<td>The key example, positive test, that describes the case</td>
</tr>
<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Angry<br/>😠<td>
<td>Paths where the application may react badly: validation errors, bad inputs...</td>
</tr>
<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Delinquent<br/>👺<td>
<td>Security risks: authentication, authorisation, permissions, data confidentiality...</td>
</tr>
</table>


---



<table class="mt-150 text-level-4">

<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Embarrassing<br/>💩 🤦‍♂️<td>
<td>Things that could cause huge embarrassment all round <!--They might have a significant impact on credibility, internally or externally --> </td>
</tr>


<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Desolate<br/>😶<td>
<td>Try zeros, nulls, blanks or missing data, truncated data, incomplete input, file or event</td>
</tr>

<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Forgetful<br/>😯<td>
<td>Fill up all the memory and CPU capacity so the application can't store anything
</td>
</tr>

<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Indecisive<br/>🤷🏽‍♂️<td>
<td>Simulate an indecisive user: turn things on and off, click back buttons on the browser, move between breadcrumb trails with half-entered data
</td>
</tr>

<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Greedy<br/>😋<td>
<td>Select everything, opt into every option, order lots of everything, load up the functionality with as much as it allows to see how it behaves</td>
</tr>

<tr class="fragment">
<td style="text-align: center; text-wrap: nowrap;">Stressful<br/>😓<td>
<td>Find the breaking point of your components under stress</td>
</tr>


</table>

---

## Resources

<div class="text-level-5">

- https://christianlydemann.com/the-most-common-cypress-mistakes/
- Joe C automation guide
- Agile Testing: A Practical Guide for Testers and Agile Teams (Lisa Crispin and Janet Gregory, 2008, Addison-Wesley)
- http://martinfowler.com/bliki/PageObject.html
- Fifty Quick Ideas To Improve Your Tests (Gojko Adzic, David Evans and Tom Roden, 2015, Neuri Consulting Llp)
- https://docs.cypress.io/guides/references/best-practices
- https://medium.com/pragmatic-programmers/unit-tests-are-first-fast-isolated-repeatable-self-verifying-and-timely-a83e8070698e
- [Why Automated Tests Should Be Atomic](https://testguild.com/atomic-tests/)
- https://cucumber.io/blog/bdd/aslaks-view-of-bdd/
- https://www.altexsoft.com/blog/business/acceptance-criteria-purposes-formats-and-best-practices/

- image from https://techbootcamps.utexas.edu/blog/how-to-become-a-programmer/
</div>
