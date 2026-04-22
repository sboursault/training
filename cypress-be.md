## JOUR 1 les bases + page object

Getting started
- Create and configure a Playwright
- The problem with a conventional dev process
- The Behaviour Driven Development approach
- First test: Add to basket
Playwright basics
- Interactions and Verifications
- Finding elements by user-facing attributes
- Finding elements by CSS selector
- Finding elements by test id
- Verify the login
Improve maintainability
- Why investing in maintainability?
- Hooks
- Page object pattern
- Rewrite tests with Page Objects
Tips and tricks
- Write small tests
- Solid locators
- Wait for events, not time
- Several ways to run tests
- Type checking and linting
- Add type checking and linting

## JOUR 2 des tests fiables (répétables indépendants) et rapides & CI

Repeatable tests
- Verify the basket recovery
- Make the test repeatable
- What is reapetability?
- Verify the basket recovery - part 2
Speed up E2E tests
- Why optimizing test speed?
- Minimize UI interactions
- Speed up your tests
- Speed up your tests - part 2
Isolated tests
- Verify the delivery fees
- ...when the basket is exactly 30€
- What, why and how?
- Run tests with distinct user accounts



## JOUR 3 mobile, accessibility, mise en pratique sur leur projet

TEST EN MODE COMPOSANT/MOCK ? pas dit que ce soit possible / intéressant
TEST DE NON REG VISUELLE ? pas dit que ce soit intéressant

en option tests de non régression visuels, mais pas sûr que ça les intéresse

Mobile tests
Accessibility



Tests visuels ?
Tests de composants
 - prendre un cas où on modifie une donnée (mock sur GET et vérif du PUT)
quels solution CI/CD ? jenkins / gitlab / github / autre ?
Version cloud de Cypress ?
Accessibility n'est pas comprise dans les plan standard
coverage ??

accès aux sources d'un projet qu'il voudrait tester ?
afin d'évaluer la facilité d'intégration de cypress


to add

verify accessibility
https://docs.cypress.io/api/commands/press

mobile exercises

accessibility selectors with cypress-testing-library
https://testing-library.com/docs/cypress-testing-library/intro/

about CI :
- add something about cypress cloud and parallelization
- add something on github actions

concepts avancés...

logging with session...

tips :
Using variables by declaring an alias
https://docs.cypress.io/api/commands/get#Alias

