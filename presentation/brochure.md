# Brochure


## Description


Cypress est le framework de test open source le plus populaire (https://www.perfecto.io/sites/default/files/pdfs/ebook-perfecto-state-test-automation-23.pdf).

Il permet d'exécuter vos tests End-2-End (de bout en bout) en interragissant avec l'IHM de votre site web.

Cette formation vous montrera comment automatiser vos tests avec Cypress. Découvrez aussi les bonnes pratiques pour construire une suite de tests maintenable et rapide.


Dire ce qui n'est pas simple, et qui sera abordé :


Revoir intro de cucumber java ?

Ce qu'il faut comprendre. 
Ecrire de bons tests auto, ce n'est pas évident. Il y a plein de manière de se planter.
- tests qui passent au rouge, perte de confiance de l'équipe
- tests trop long
- manque d'efficacité, rejet de l'équipe de dév
C'est une discipline à part.
C'est du code, mais avec pattern propres, des règles différentes du code de prod. (répétabilité des tests, page object...)
Et en même temps il y a un fort lien avec le business.
Ecrire des tests d'acceptation, c'est du code mais avec 


on parlera donc d'organisation de l'équipe, de process de dév, de ci/cd

!!!!! revoir 50 quick ideas pour organiser les critères d'acceptance
ajouter une page 3 amigos pour impliquer tout le monde et avoir des meilleurs critères d'acc

prévoir un chapitre test d'une spa
- idée : 
  - envoi d'un email sur gmail à moi même, je le reçois bien.
- ajout de wait dans le page object

## Objectifs pédagogiques

À l’issue de cette formation, le participant sera en mesure de :

être autonomoe sur l'automatisation de tests avec cypress
Worflow de dév efficace
Concevoir des tests automatisés (Web et API) avec Cypress
Débugger

You'll learn to how to write acceptance criterias, and how to verify these acceptance criterias with automized tests using Cypress.
You'll also learn how to write a maintanable tests suite, how reduce flakyness (must be defined), and how to keep a fast test suite.


## Public concerné/visé/cible

Développeurs ou Testeurs qui souhaitent se former à l'automatisation des tests avec cypress.

This training is for you if you want to discover how E2E tests can fit in development workflow.


## Prérequis

Connaissance de base en programmation.
Une connaissance en JavaScript ou typescript est un plus.
Une connaissance de base de git est un plus.

Knowledge of git, and understanding a language programming will help


## Programme de la formation

un progromme trop riche : https://expandtesting.com/formations/tests-acceptation-cypress/

&gt; Conception de cas de tests BDD en langage <strong>Gherkin</strong><br>
&gt; Mise en place du <strong>framework de test Cypress</strong><br>
&gt; Prise en main des fonctionnalités de bases de Cypress (environnement, locators…)<br>
&gt;<strong> Conception des scripts automatisés</strong><br>
&gt; Exécution de tests (Test Runner, connexion de Cypress à d’autres outils et terminal CI)<br>
&gt; Création de <strong>rapports de test</strong>

## Modalités pédagogique et évaluation

<strong>30% de théorie et 70% de pratique.</strong><br><br>

<strong>Évaluation des compétences acquises</strong> par des cas pratiques.<br><br>

Formation synchrone incluant l’accès aux supports de cours.

## Lieu et Horraire

<div style="text-align: justify;"><strong>Lieu :</strong> Dans nos locaux, en classe à distance (connexion via internet, casque, micro) ou au sein de votre entreprise.</div><div>&nbsp;</div><div style="text-align: justify;"><strong>Horaires :</strong> 9h00-12h30/13h30-17h00</div>				


### Organization

2 days of 6 hours.
9:00 to 12:00 - 13:30 to 16:30



## Plan de formation

### Jour 1

Initialisation d'un projet Cypress avec Typescript
Découverte de Cypress (Outils et Api)
Ecriture de critères d'acceptation
Automatisation des critères d'acceptation
Bonnes pratiques pour l'écriture des tests
 - Page Object
 - Sélecteurs dédiés
 - Isolation
 - Répétabilité


### Jour 2

- Mise en place de tests d'acceptation dans une organisation agile
- Optimisation du setup des tests en passant par les API
- Tests d'api
- Autres fonctionnalités importantes de Cypress
  - Logs
  - Debug
  - Retry-ability
  - Variables and Aliases





objectifs

## Project setup

🧩 **PRIMARY OBJECTIVE**


- Know how to configure a cypress project with typescript

👌 **WHAT WE'VE LEARNED**

- Configure a cypress project with typescript

## Simple tests: mini basket


🧩 **PRIMARY OBJECTIVE**

- Know what acceptance criterias are, and how they fit in the development process
- Know how to automize tests with Cypress
- Know how to find info in the cypress doc
- Know how to improve maintanabitly with the Page Object pattern

- Know what acceptance criterias are, and how they fit in the development process
- Know how to automize tests with Cypress
- Know how to find info in the cypress doc
- Know how to improve maintanabitly with the Page Object pattern

👌 **WHAT WE'VE LEARNED**

- Cypress runner in action with execution logs and chrome inspector
- Mocha api (before, beforeEach, describe, it)
- Cypress api (visit, get, click, should, and)
- CSS selectors based on class and data-test-id
- Introduction to retryability (Timeout to find elements)
- Introduction to test isolation (basket is automatically emptied betwin tests)
- Use page object to avoid code duplication and facilitate reading
- Create a typescript object
- Continuously polish your test code

## Test strategy

## Fast, repeatable and isolated tests: basket recovery


🧩 **PRIMARY OBJECTIVE**

- practice writing acceptance tests for a user story
- Find edge cases
- Write good acceptance tests: isolated (I'm logged out at the biginning of each test) and **repatable** (go back to a known state at the beginning of the test)
- Know how to improve maintanabitly with Cypress custom commands
- Know how to run test faster with api calls

👍 **WHAT WE PRACTICED**

- Write acceptance tests for a user story
- Find edge cases


👌 **WHAT WE'VE LEARNED**

- Automate by priority order
- Introduction to test isolation (I'm logged out at the biginning of each test)
- Repatability: go back to a known state at the beginning of the test
- Cypress: custom command
- Optimize tests with `cy.request()`
- typescrypt: optional parameters (the password can be generic e.g 'simplepassword')
- Cypress api `request` behaves like if the browser made the request
- A REFORMULER: More robust tests with api calls (apis are less prone to change)
- A REFORMULER: les tests passent moins au rouge pour des raisons de changements d'UI autre que ce qui est testée
- Faster tests with api call


## Qualities of a good automated test

## Api tests: Order amount

🧩 **PRIMARY OBJECTIVE**

- Know how to write api tests with Cypress
- Know how to use aliases
- Know how to add examples to explicit acceptance criterias

👌 **WHAT WE'VE LEARNED**

- How to write api tests
- How to debug tests with console logs and `debbuger`
- Cypress execution order

