# high level plan


ajout au panier :
- intro cypress et page object
login
- exo en solo sur les même notions
comportement du panier
- code en solo
- réécriture du login en api pour l'exemple
- le stagiaire réécrit l'ajout au panier en api
promotions
- code en solo à partir des api déjà créées
- création d'un produit en api pour l'exemple
- le stagiaire écrit l'ajout de user en api

3 amigos !


**20min**

</> Create a Cypress project
- Create a github project
- Install and configure cypress to run typescript test
- Create a simplistic test:
- The home page title contains "All products"

**15min**

Theoretical part: End to end tests in the development process


**20min**

specification workshop on the mini basket


**45min**
The professor automizes the 2 tests on the mini basket always shown info,
the trainee repeats.

> work with css selectors
> cypress api (only, skip, visit, get, click, should)
> cypress time travel

**45min**
The professor automize the 2 tests on the mini basket detail.
We use a more precise selector for the product to use.
The trainee repeats.

> dedicated selector (data-testid)

commit

**45min**
The professor refactors the tests with beforeEach and page objects (CataloguePage).

> typescript and page objects

The trainee repeats.


------------------- mid-day break -------------------


**15min**
login spectification workshop

**60min**
The trainee codes the test on the login


**20min**
Theoretical part: Cypress tips


Now let's speak about repeatability and speed

**20min**
basket recovery workshop

//- After login, the mini basket contains the items from my last session
//- After logout, the mini basket is empty
//- After login, the product also contain the items I added as an anonymous user
//- After login, the mini basket contains both the items from my last session and those from my current basket

**15min**
The teacher starts a simple and valuable scenario
- After login, the mini basket contains the items from my last session
add SimpleCommerceApp.login()

**15min**
the trainee repeats this part ?

**15min**
problem : the test is not repeatable if we don't clear the basket betwin each test
A developer gives this trick :
"call /api/basket/ to get the basket url and then delete it"
curl -X GET https://.../api/basket/ -u "tom@test.com:tom@test.com"
curl -X DELETE https://.../api/basket -u "tom@test.com:tom@test.com"

> create app object for higher level interractions
> cypress api (request, chaining)
> Debug api requests
> repeatability

**15min**
The trainee repeats

**30min**
and writes the other tests
have a look at the time the suite takes
The basket-recovery tests takes 23s.

------------------- day 2 -------------------

**20min**
Theoretical part: Qualities of good E2E tests

**20min**
Let's refactor the login to use the api -> 18s, and the logout -> 16s 
> fast tests using api for preparation
> cypress api getCookie
> bypass csrf token security

curl -X POST \
  -H 'Content-Type: application/json' \
  --data '{"username":"tom@test.com", "password":"tom@test.com"}' \
  https://simplecommerce1nz5qlcr-sbc1.functions.fnc.fr-par.scw.cloud/api/login/

**20min**
Trainees repeat

**30min**
and also replace the calls to add a product to the basket

curl -X POST \
  -H 'Content-Type: application/json' \
  --data '{"url":"/api/products/209/", "quantity":1}' \
  -u "tom@test.com:tom@test.com" \
  https://simplecommerce1nz5qlcr-sbc1.functions.fnc.fr-par.scw.cloud/api/basket/add-product/

now it takes 12s
but it seems there's a bug when we use the auth part ()
Maybe we should login and logout each time we want to manipulate the basket

adding login and logout before each calls works, and with a dirty logout, the test takes 12s, 9s if we remove some securities.

The time is divided by 2. Et pourtant, c'est pas fou, ce qu'on a fait
on a juste remplacé le login et l'ajout au panier.
Imaginez sur un setup plus complexe, on peut avoir des tests qui s'exécutent 5 ou 10 fois plus vite.


> Order amount:
> Over 30€, the 7€ for delivery fees are offered.


**20min**
Theoretical part: Test strategy

Test sur api direct

> Order amount: Over 30€, the 7€ for delivery fees are offered.
possible list :
+ with 23.99€ => shipping price is 7.00€
+ with 86.95€ => shipping price is 0.00€




// ajout au panier et login: lisibilité et évolutivité avec page object
// comportement du panier : rapidité
// vérif des promos : indépendance et répétabilité
//  - on crée notre produit pour être sûr de ne pas géner d'autres tests
//  - tant qu'à faire on crée aussi l'utilisateur



**10min**
Theoretical part: Remontrer la 1ère partie parce que c'est important :)


extra :
activer protection csrf avec la variable d'environnement CSRF_ENABLED=true


Prévoir des pauses et temps d'échanges

idée :
- améliorer sélecteur sur le accountLink
- précréer le compte de test



- Fonctionnalités avancées (debug, attentes implicites, retry-ability, variables and aliases...)

Ajouter une partie commande custom getByTestId avant le page object

