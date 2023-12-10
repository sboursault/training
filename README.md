# simple-commerce-e2e

<br>
Ask for feedback all allong the training, and also at the end.

see the retryable parts here, debug, and others...
https://christianlydemann.com/the-most-common-cypress-mistakes/

<br>

## About this training

<br>

### Who is this training for?

Knowledge of git, and understanding a language programming will help
This training is for you if you want to discover how E2E tests can fit in development workflow.

You'll learn to how to write acceptance criterias, and how to verify these acceptance criterias with automized tests using Cypress.
You'll also learn how to write a maintanable tests suite, how reduce flakyness (must be defined), and how to keep a fast test suite.

<br>

### What you'll learn

<br>

### Organization

2 days of 6 hours.
9:00 to 12:00 - 13:30 to 16:30

<br>


### Améliorations

définition de commande custom pour récupérer les éléments via data-testid.
On peut avoir un objet simple-commerce pour les interractions plus haut niveau (login...)

cypress tip :
// use the debugger (https://christianlydemann.com/the-most-common-cypress-mistakes/)

// variables, execution order and retryability
(https://christianlydemann.com/the-most-common-cypress-mistakes/)
(https://docs.cypress.io/guides/references/best-practices#Assigning-Return-Values)

// test against a dedicated env (not one shared with manual tests)
// write atomic tests ((https://testguild.com/atomic-tests/))





<br>

## Repeat: Create and update address

The aim of this

If there is enough time, the trainee can use all what he learned to verify the address creation and update in the user settings.
This involves:
- creating a repeatable test by deleting and creating a user without address
- creating the address (ui), verify it (ui)
- creating and updating an address (creation with ui or api), verify it (ui)


<br>

## Elaborate

- Optimize login with api calls `cy.request()` see https://groups.google.com/g/django-oscar/c/qxOXbmu54-U
- Check cypress doc more offten
- not enough stock with intercept
- more on getting tests repeatable
    - create the user if it doesn't exist (using api)
- test the user creation
- test a single page application
- run cypress in cicd

    - env variables to change baseUrl or password

- prévoir BEAUCOUP d'exercices en plus

    - change languages
    - what if I'm french, or english ?
    - mobile tests - only if they are interested in the subject
        - change dimensions and user agent
        - page objects adaptation and dependency injection ?
            - https://github.com/typestack/typedi
        - mobile or desktop specific tests
    - add csrf verfication on apis ?
    - verify behaviours based on api calls (includes waiting for an api response)
        - amazon quick search shows product that match with my request
        - results are changed after a new search !! (this can one imply waiting for an api response)

Déploiement :

- serverless containers sur scaleway
- google cloud run
- knative ovh cloud (paraît compliqué: commande kubectl)



## Test a SPA

prévoir un chapitre test d'une spa
- idée :
    - envoi d'un email sur gmail à moi même, je le reçois bien.
- ajout de wait dans le page object



## Verify behavior by mocking server reponse

Ah bah non, ça ne marche pour l'ajout de produit sans stock.
C'est un rechargement de page complet, l'erreur 'no stock available' arrive avec le contenu de la page.

https://www.google.com/search?channel=fs&client=ubuntu&q=cypress+mock+api
page cypress pas si simple pour une première page de la doc cypress...
Reprendre les étapes précédentes, il faut se référer plus souvent à la doc cypress !

Cette étape demande beaucoup de préparation.
Elle est intéressante, mais dispensable.
Je préparerai à la fin.

On pourrait recoder le add product pour que l'opération soit en rest.
si erreur, on affiche les messages
si succès, on rafraichit la page ou bien juste le mini panier et les messages.
(utiliser une sorte de toggle si c'est possible)
Je crois comprendre que l'api reste peut être utilisée avec la session utilisateur
https://github.com/django-oscar/django-oscar-api/issues/137

Autre solution : présenter `intercept` uniquement en théorique

- intéressant pour les SPA pour simuler une réponse spécifique
- intéressant pour attendre le retour d'une requête
