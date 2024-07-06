# Tests End-to-End avec Cypress

Nombre de jours : 2
Public visé : développeur·se, testeur·se
Description courte : Automatisez vos tests de bout en bout avec Cypress


## Description

Cette formation vous apprendra comment automatiser vos tests de bout en bout (End-to-end - E2E) avec Cypress. Vous découvrirez comment construire une suite **maintenable**, **extensible** et **rapide**, mais aussi comment intégrer ces tests dans votre processus de développement. 
 
Cet apprentissage s'adresse aussi bien aux développeurs qu'aux testeurs qui souhaitent se former à l'automatisation des tests de bout en bout.

Au cours de la session, nous verrons comment traduire un besoin en critères d'acceptation, et comment automatiser leur vérification. Vous apprendrez comment construire une suite de tests en partant de zéro. Vous vous approprierez l'API Cypress et son éscosytème, tout en découvrant les bonnes pratiques de cette discipline. Vous comprendrez comment améliorer la lisibilité et la maintenabilité des tests avec le pattern **Page Object**. Nous écrirons des tests robustes en travaillant sur leur **isolation** et leur **répétabilité**. Enfin, nous verrons comment optimiser l'exécution des tests en préférant des appels API pour la phase de préparation des données.

Parce que c'est en forgeant qu'on devient forgeron, la formation est axée sur la pratique. En fil rouge, vous élaborerez une suite de tests qui vérifie les fonctionnalités d'un site e-commerce, comme la gestion du panier ou le déclenchement des promotions.

Comme pour toutes nos formations, chaque session est limitée à [6 participants](https://www.humancoders.com/pages/manifeste#taille-humaine), ce qui permet au formateur d'adapter sa présentation et garantit un temps d'échange privilégié pour chacun.


## Objectifs Pédagogiques

- Concevoir des tests bout en bout (E2E)
- Automatiser ces tests avec Cypress
- Améliorer la lisibilité et l'évolutivité des tests E2E
- Créer une suite de tests rapides et extensibles (basée sur des tests isolés et répétables)


## Pré-requis

- Notions de base en programmation
- Connaissances de base en HTML et CSS
- Ordinateur portable à apporter
- Installation de Git et Node.js (18.x)
- Compte github avec clé configurée sur l'ordinateur (assistance possible si besoin)

Les tests seront écrits en typescript, mais il n'est pas nécessaire de connaître le langage. Cela fait partie de la formation.


## Programme de la formation

### Jour 1 : Automatisation des tests

#### Démmarrer avec Cypress

- Écosystème Cypress
  - Cypress CLI
  - Application Cypress
  - Documentation en ligne
- Principales commandes de l'api de développement (`cy.visit()`, `cy.get()`, `cy.click()`, etc.)
- Hooks
- Mise en place de sélecteurs dédiés (basé sur un attribut `data-testid`)
- Création de commandes personnalisées (commandes custom)
- Pattern Page Object

**Mises en pratique :**
 - Initialisation d'un projet Cypress avec Typescript
 - Atelier de spécification sur le mini-panier d'un site e-commerce, puis sur le login
 - Automatisation des critères d'acceptation
 - Simplification des tests à l'aide de commandes personnalisées et du pattern Page Object

 
### Jour 2 : Gérer votre suite de tests

#### Stratégie de test
- Complémentatrité des différents types de tests (Agile testing quadrants)
- Behaviour Driven Development
- Qui automatise les tests ?
- Tips CI/CD

**Mises en pratique :**
 - Gérer les variables d'environnment

#### Une suite de test rapide et extensible
- Écrire des tests répétables et isolés
- Optimisation du temps d'exécution de la suite
- Debugger les tests Cypress
- La commande `cy.request()`
- Génération d'un jeu de données spécifique pour un test

**Mises en pratique :**
 - Atelier de spécification et automatisation des tests sur la récupération du panier, puis sur les frais de livraison
 - Travail sur la phase de préparation du test (setup) :
   - Nettoyage des données
   - Création des produits pertinents pour vérifier les critères d'acceptation
   - Optimisation à l'aide d'appels API


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

