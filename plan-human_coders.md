# Tests End-to-End avec Cypress

## Description

[Cypress](https://www.cypress.io/) est aujourd'hui l'outil open-source le plus populaire pour l'automatisation des test end-to-end. Il permet d'exécuter vos tests de bout en bout en interagissant avec les pages de votre site web. Il est basé sur javascript et se démarque gràce à son expérience développeur : contrairement aux outils basés sur Selenium, pas besoin de webdriver et le debugging est largement facilité.

Cette formation s'adresse aussi bien aux développeurs qu'aux testeurs qui souhaitent se former à l'automatisation des tests avec Cypress.

Si l'écriture des premiers tests E2E peut sembler triviale, de nombreuses difficultés apparaissent au fur et à mesure que la suite de tests grandit. L'analyse des retours prend de plus en plus de temps. Sans les bonnes pratiques, la suite n'est plus maintenable et finit par être abandonnée.

Avec cet apprentissage, vous acquerrez les clés pour démarrer votre suite de tests E2E sur des bases saines. L'essentiel de l'apprentissage sera basé sur la pratique. En automatisant la vérification d'un site e-commerce, vous découvrirez comment construire une suite extensible, maintenable et rapide.

Le succès de la mise en place des tests End-to-end repose sur un travail d'équipe. Nous verrons donc aussi comment l'équipe de développement peut s'organiser pour intégrer ces tests dans son processus de développement.

Comme pour toutes nos formations, chaque session est limitée à [6 participants](https://www.humancoders.com/pages/manifeste#taille-humaine), ce qui permet au formateur d'adapter sa présentation et garantit un temps d'échange privilégié pour chacun.


## Les objectifs

À l’issue de cette formation, le participant sera en mesure de :

- Concevoir et automatiser des tests E2E avec Cypress (connaissance de l'outil et de l'API de développement)
- Améliorer la maintenabilité des tests E2E
- Optimiser le temps d'exécution des tests E2E

## Pré-requis

- Notions de base en programmation
- connaissances de base en HTML et CSS
- Ordinateur portable à apporter
- Installation de Node.js (18.x)
- Installation de Git
- Compte github avec clé configurée sur l'ordinateur (assistance possible si besoin)

Les tests seront écrits en typescript, mais il n'est pas nécessaire de connaître le langage. Cela fait parti de la formation.

## Programme de la formation

### Jour 1 : Automatisation des tests

- Écosytème cypress (CLI, Application, time travel, logs)
- Principales commande de l'api développement
- Identification des sélecteurs stables (sélecteurs CSS, sélecteurs dédiés)
- Pattern Page Object

- Mises en pratique :
 - Initialisation d'un projet Cypress avec Typescript
 - Ateliers d'écriture de critères d'acceptation sur les fonctionnalités d'un site e-commerce
 - Automatisation des critères d'acceptation sur le comportement du panier
 - Amélioration de la maintenabilité avec le pattern page object

 
### Jour 2 : Gérer votre suite de test

- Optimisation des tests en passant par les API
- Qualités d'un bon test automatisé (isolé, répétable, rapide...)
- Place des tests E2E dans la stratégie de test
- Fonctionnalités avancées (debug, attentes implicites, retry-ability, variables and aliases...)

- Mises en pratique :
 - Automatisation de tests plus complexes sur la gestion des promotions
 - Réécriture du setup des tests en appel API
