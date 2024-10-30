

## Handle CSRF protection WIP
<!-- .element: data-toc-exclude data-tags="practice, optional" class="text-size-heading-3" -->

<div class="exercice text-level-4">


  <p>A CSRF protection was added on the APIs that relies on the user session and that modifies data

  <p>Let's code
  <ul>
    <li>On the calls that don't pass anymore, add a <code>X-CSRFToken</code> header with the value from the <code>csrftoken</code> cookie.
  </ul>
  <p>Useful links
  <ul style="font-size:75%">
    <li class="url-link"> COOKIES
  </ul>

</div>




What about a part on CI/CD

intéressant de montre le cycle de vie d'un test

conception pour s'entendre sur le périmètre d'un item
valide le dév
non régression
documentation



pour aller plus loin, il faudrait que j'essaie différents produits (applitools, browserstack, cypress cloud, autre ?)
- critères adhérence, suis marié avec eux
- cloud mobile
- stats sur les flaky tests (moins utile avec pw ?)

Consider running some e2e tests on production (synethetic monitoring)
https://martinfowler.com/bliki/SyntheticMonitoring.html


On which env should I run E2E tests ?
- Local development: yes
- Integration/Testing: No
- Staging/Preproduction: Maybe
- Production: Maybe
- E2E environment: Yes
