
<!-- .slide: class="text-level-2" -->

## Excluding and Including Tests

<div class="fragment">
<p>Sometimes you just want to run a subset of your test suite
<ul>
  <li>Some test may not run on all environments
  <li>You may want to run only the test concerning a specific domain
</ul>
</div>

<div class="fragment mt-100">

```typescript
it('sends an email to confirm email address', { tags: ['sendsEmail'] }, () => {
  // some verification that may not work on all environments
})
```


```sh
npx cypress run --env grepTags=-sendsEmail  # runs all tests without the tag 'sendsEmail'
```
<!-- .element: class="mt-150" -->

</div>

<small class="fragment mt-150">
How to use <strong>@cypress/grep</strong>:<br><a href="https://github.com/cypress-io/cypress/tree/develop/npm/grep">https://github.com/cypress-io/cypress/tree/develop/npm/grep</a>
</small>




---

## Define environment variables
<!-- .element: data-toc-label="Manage environment variables" data-tags="practice,optional" class="mt-0 text-size-heading-3" -->

<div class="exercice text-level-4">

  <p class="mt--50">Let's code
  <ul>
    <li>Install <strong>dotenvx</strong>

```sh
npm install @dotenvx/dotenvx
```  

<li>Create a file named <code>.env</code> with these variables

{% if (pw) { %}
```properties
# .env
BASE_URL=http://127.0.0.1:8000/
ADMIN_LOGIN=superuser@example.com
ADMIN_PASSWD=testing
```
{% } else { %}
```properties
# .env
CYPRESS_BASE_URL=http://127.0.0.1:8000/
CYPRESS_ADMIN_LOGIN=superuser@example.com
CYPRESS_ADMIN_PASSWD=testing
```
{% } %}

<li>Update the scripts in <code>package.json</code>


{% if (pw) { %}
<pre><code class="json" data-line-numbers="2">
"scripts": {
  "pw:test-ui": "dotenvx run -f .env -- npx playwright test --ui"
},
</code></pre>
{% } else { %}
<pre><code class="json" data-line-numbers="2">
"scripts": {
  "cy:open": "dotenvx run -f .env -- npx cypress open --e2e --browser chromium"
},
</code></pre>
{% } %}



<li>Rewrite tests to use the env variables and verify they still pass

  </ul>
  
  <p class="mt-50">Functions
  <ul style="font-size:.9em">
    <li><code>cy.env()</code>
  </ul>

  <p class="mt-50">Useful links
  <ul style="font-size:.75em">
    <li>https://docs.cypress.io/guides/guides/environment-variables
    <li>https://github.com/dotenvx/dotenvx
  </ul>

</div>

---
## Manage environment variables
<!-- .element: data-toc-exclude data-tags="practice,optional" class="text-size-heading-3" -->

<div class="exercice text-level-3">

  <p class="mt-50">Let's code
  <ul>
    <li>Copy your <code>.env</code> file to a file named <code>.env.e2e</code>
    <li>In <code>package.json</code>, add a script to target the e2e environment

{% if (pw) { %}
<pre><code class="json" data-line-numbers="3">
"scripts": {
  "pw:test-ui": "dotenvx run -f .env -- npx playwright test --ui",
  "pw:test-ui:e2e": "dotenvx run -f .env.e2e -- npx playwright test --ui"
},
</code></pre>
{% } else { %}
<pre><code class="json" data-line-numbers="3">
"scripts": {
  "cy:open": "dotenvx run -f .env -- npx cypress open --e2e --browser chromium"
  "cy:open:e2e": "dotenvx run -f .env.e2e -- npx cypress open --e2e --browser chromium",
},
</code></pre>
{% } %}


<li>Change the base url in <code>.env.e2e</code> and watch the test fail

  </ul>
  <p>Useful links
  <ul style="font-size:75%">
    <li>https://docs.cypress.io/guides/guides/environment-variables
    <li>https://github.com/dotenvx/dotenvx
  </ul>

</div>



{% if(pw) { %}

---

## TODO TRACE VIEWER

{% } %}

