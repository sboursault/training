# Tests End-to-End avec Cypress

## Description

[Cypress](https://www.cypress.io/) est aujourd'hui l'outil open-source le plus populaire pour l'automatisation des tests end-to-end. Il permet d'exécuter vos tests de bout en bout en interagissant avec les pages de votre site web. Il est basé sur javascript et se démarque gràce à son expérience développeur : contrairement aux outils basés sur Selenium, pas besoin de webdriver et le debugging est largement facilité.

Si l'écriture des premiers tests E2E peut sembler triviale, de nombreuses difficultés apparaissent au fur et à mesure que la suite de tests grandit. L'analyse des retours prend de plus en plus de temps. Sans les bonnes pratiques, la suite n'est plus maintenable et finit par être abandonnée.

Cette formation s'adresse aussi bien aux développeurs qu'aux testeurs qui souhaitent se former à l'automatisation des tests E2E avec Cypress.

L'essentiel de l'apprentissage est orienté sur la pratique. En automatisant la vérification d'un site e-commerce, vous découvrirez comment construire une suite extensible, maintenable et rapide.

Le succès de la mise en place des tests End-to-end repose sur un travail d'équipe. Nous verrons donc aussi comment une équipe peut s'organiser pour inclure les tests E2E dans son processus de développement.

Comme pour toutes nos formations, chaque session est limitée à [6 participants](https://www.humancoders.com/pages/manifeste#taille-humaine), ce qui permet au formateur d'adapter sa présentation et garantit un temps d'échange privilégié pour chacun.


## Les objectifs

À l’issue de cette formation, le participant sera en mesure de :

- Concevoir des tests E2E
- Automatiser ces tests avec Cypress
- Améliorer la lisibilité et l'évolutivité des tests E2E
- Écrire des tests E2E robustes (des tests indépendants et répétables)
- Optimiser leur temps d'exécution


## Pré-requis

- Notions de base en programmation
- Connaissances de base en HTML et CSS
- Ordinateur portable à apporter
- Installation de Git et Node.js (18.x)
- Compte github avec clé configurée sur l'ordinateur (assistance possible si besoin)

Les tests seront écrits en typescript, mais il n'est pas nécessaire de connaître le langage. Cela fait parti de la formation.


## Programme de la formation

### Jour 1 : Automatisation des tests

- Écosytème Cypress (CLI, Application, time travel, logs)
- Principales commandes de l'api de développement
- Identification des sélecteurs stables (sélecteurs CSS, sélecteurs dédiés)
- Pattern Page Object

**Mises en pratique :**
 - Initialisation d'un projet Cypress avec Typescript
 - Atelier d'écriture de critères d'acceptation sur les fonctionnalités d'un site e-commerce
 - Automatisation des critères d'acceptation sur le login et le comportement du panier
 - Réécriture avec le pattern Page Object
 
### Jour 2 : Gérer votre suite de test

- Qualités d'un bon test automatisé (isolé, répétable, rapide...)
- Place des tests E2E dans la stratégie de test

**Mises en pratique :**
 - Ateliers d'écriture de critères d'acceptation
 - Tests plus complexes sur le panier, optimisation de la phase de préparation graĉe aux appels API
 - Tests sur la gestion des promotions, avec génération du jeu de données


