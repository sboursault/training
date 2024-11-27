
# Tests End-to-End avec Playwright

Nombre de jours : 2
Public visé : développeur·se
Description courte : Automatisez vos tests de bout en bout avec Playwirght


### Description

Cette formation vous apprendra comment automatiser vos tests de bout en bout (End-to-end - E2E) avec Playwright. Vous découvrirez comment construire une suite **maintenable**, **extensible** et **rapide**, mais aussi comment intégrer ces tests dans votre processus de développement. 

Cet apprentissage s'adresse aux développeur·se·s qui souhaitent se former à l'automatisation des tests de bout en bout.

Au cours de la formation, vous apprendrez :
- comment traduire un besoin en critères d'acceptation, et comment automatiser leur vérification,
- comment construire une suite de tests avec Playwright, en partant de zéro,
- comment écrire des tests lisibles et la maintenables avec le pattern Page Object, et comment les fiabiliser en les rendant indépendants et répétables.
- comment optimiser l'exécution des tests en préférant des appels API pour la préparation des données.

La formation est axée sur la pratique. En fil rouge, vous élaborerez une suite de tests qui vérifie les fonctionnalités d'un site e-commerce, comme la gestion du panier ou le déclenchement des promotions.


### Objectifs

- Concevoir des tests bout en bout (E2E)
- Automatiser ces tests avec Playwright
- Améliorer la lisibilité et la maintenabilité des tests E2E
- Créer une suite de tests rapides et extensibles (basée sur des tests isolés et répétables)


### Pré-requis

- Notions de base en programmation
- Connaissances de base en HTML et CSS
- Ordinateur portable à apporter
- Installation de Git et Node.js (18.x)
- Compte github avec clé configurée sur l'ordinateur (assistance possible si besoin)

Les tests seront écrits en typescript, mais il n'est pas nécessaire de connaître le langage. Cela fait partie de la formation.


### Programme

#### Jour 1 : Automatisation des tests

##### Démmarrer avec Playwright

- Écosystème Playwright
  - Playwright CLI
  - Playwright UI
  - Documentation en ligne
- Principales fonctions de l'API Playwright (`page.goto()`, `page.locator()`, `locator.click()`, etc.)
- Assertions
- Hooks
- Locators
- Page Object et Fixtures

**Mises en pratique :**
 - Initialisation d'un projet Playwright avec Typescript
 - Atelier de spécification sur le mini-panier d'un site e-commerce, puis sur le login
 - Automatisation des critères d'acceptation
 - Simplification des tests à l'aide du pattern Page Object et de Fixtures

 
#### Jour 2 : Gérer votre suite de tests

##### Stratégie de test
- Complémentatrité des différents types de tests (Agile testing quadrants)
- Behaviour Driven Development
- Qui automatise les tests ?
- Tips CI/CD

**Mise en pratique :**
 - Adapter votre suite de tests pour vérifier différents environnements (local, e2e, preprod...)

##### Une suite de test rapide et extensible
- Écrire des tests répétables et indépendants
- Optimisation du temps d'exécution de la suite
- Debugger les tests Playwright
- L'objet `Request`
- Génération d'un jeu de données spécifique pour un test

**Mises en pratique :**
 - Atelier de spécification et automatisation des tests sur la récupération du panier, puis sur les frais de livraison
 - Travail sur la phase de préparation du test (setup) :
   - Nettoyage des données
   - Adaptation du jeu de données initial
   - Optimisation à l'aide d'appels API


## Profil

### Avec quelles technologies préfères-tu travailler ?

Playwight, Cypress, Typescript, Python, Java

### Bio

Sébastien dévellope des applications depuis plus de 15 ans. Il est passé par tous les rôles d'une équipe de dév : Développeur, Testeur, Scrum Master et Product owner.

Il travaille chez un éditeur, dans une approche où les critères d'acceptation deviennent les tests automatisés qui pilotent le développement. Cette approche leur permet d'avancer vite et sereinement.

Sébastien partage volontiers sa culture du clean code et de l'automatisation des tests, en particulier lors de ses formations, où il apprécie d'échanger avec des personnes d'horizons différents.

### Articles

- [(Not So Obvious) Tips To Write Better DTOs in Java](https://medium.com/javarevisited/not-so-obvious-tips-to-write-better-dtos-in-java-c6116895b180)

### Lectures recommandées

- [Domain-Driven Design: Tackling Complexity in the Heart of Software](https://www.amazon.fr/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215/)
- [Agile Testing: A Practical Guide for Testers and Agile Teams](https://www.amazon.fr/Agile-Testing-Practical-Guide-Testers/dp/0321534468/)

