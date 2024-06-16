# Tests End-to-End avec Cypress

Nombre de jours : 2
Public visé : développeur·se, testeur·se
Description courte : Automatisez vos tests de bout en bout avec Cypress


## Description

Cette formation vous apprendra comment construire une suite de tests E2E **maintenable**, **extensible** et **rapide**, mais aussi comment intégrer ces tests dans votre processus de développement. 

Cet apprentissage s'adresse aussi bien aux développeurs qu'aux testeurs qui souhaitent se former à l'automatisation des tests E2E avec Cypress.

Au cours de la session, nous verrons comment traduire un besoin en critères d'acceptation, et comment automatiser leur vérification. Vous apprendrez comment construire une suite de tests en partant de zéro. Vous vous approprierez l'API Cypress et son écosytème, tout en découvrant les bonnes pratiques de cette discipline. Vous comprendrez comment améliorer la lisibilité et la maintenabilité des tests avec le pattern **Page Object**, et comment les fiabiliser en les rendant **isolés** et **répétables**. Enfin, nous verrons comment optimiser l'exécution des tests en préférant des appels API pour la préparation des données.

Parce que c'est en forgeant qu'on devient forgeron, la formation est axée sur la pratique. En fil rouge, vous élaborerez une suite de tests qui vérifie les fonctionnalités d'un site e-commerce, comme par exemple la gestion du panier ou le déclenchement des promotions.

Comme pour toutes nos formations, chaque session est limitée à [6 participants](https://www.humancoders.com/pages/manifeste#taille-humaine), ce qui permet au formateur d'adapter sa présentation et garantit un temps d'échange privilégié pour chacun.


## Objectifs Pédagogiques

- Concevoir des tests E2E
- Automatiser ces tests avec Cypress
- Améliorer la lisibilité et l'évolutivité des tests E2E
- Écrire des tests E2E robustes (des tests isolés et répétables)
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

#### Démmarrer avec Cypress

- Écosystème Cypress (CLI, Application, time travel, logs)
- Principales commandes de l'api de développement
  - `visit`
  - `get`
  - `contains`
  - `click`
  - `type`
  - `should`

**Mises en pratique :**
 - Initialisation d'un projet Cypress avec Typescript
 - Atelier de spécification sur le mini-panier d'un site e-commerce
 - Automatisation des critères d'acceptation
 - Réécriture avec des commandes custom et le pattern Page Object

#### Améliorer la maintenabilité
- Identification des sélecteurs stables (sélecteurs CSS, sélecteurs dédiés)
- Hooks
- Commandes custom
- Pattern Page Object

**Mises en pratique :**
 - Atelier de spécification sur le login
 - Automatisation des critères d'acceptation
 - Réécriture avec des commandes custom et le pattern Page Object
 
### Jour 2 : Gérer votre suite de tests

#### Stratégie de test
- Place des tests E2E dans la stratégie de test (Agile testing quadrants)
- Qui automatise les tests
- Behaviour Driven development
- Tips CI/CD

**Mises en pratique :**
 - Gérer les variables d'environnment

#### Écrire des tests rapides et répétables
- Écrire des tests répétables
- Optimisation du temps d'exécution de la suite
- Debugger les tests Cypress
- La commande `request`

**Mises en pratique :**
 - Atelier de spécification et automatisation des tests sur la récupération du panier
 - Nettoyage des données dans la phase de préparation du test (setup)
 - Optimisation de la phase de préparation à l'aide d'appels API


### Écrire des tests isolés
- Génération d'un jeu de données spécifique pour un test, afin d'éviter tout impact sur les autres tests

**Mises en pratique :**
 - Atelier de spécification et automatisation des tests sur les frais de livraison
 - Dans la phase de préparation, création des produits pertinents pour vérifier les critères d'acceptation


## Profil

### Avec quelles technologies préfères-tu travailler ?

Cypress, Typescript, Python, Java

### Bio

Sébastien est un développeur curieux et touche-à-tout. Il est passé par tous les rôles d'une équipe de développement : Développeur, Testeur, Scrum Master et Product owner.

Il travaille pour un éditeur dans une approche où les critères d'acceptation deviennent les tests automatisés qui pilotent le développement. Cette approche leur permet d'avancer vite et sereinement.

Sébastien partage volontiers sa culture du clean code et de l'automatisation des tests, en particulier lors de ses formations, où il apprécie d'échanger avec des personnes d'horizons différents.

### Articles

- [(Not So Obvious) Tips To Write Better DTOs in Java](https://medium.com/javarevisited/not-so-obvious-tips-to-write-better-dtos-in-java-c6116895b180)

### Lectures recommandées

- [Domain-Driven Design: Tackling Complexity in the Heart of Software](https://www.amazon.fr/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215/)
- [Agile Testing: A Practical Guide for Testers and Agile Teams](https://www.amazon.fr/Agile-Testing-Practical-Guide-Testers/dp/0321534468/)

