# high level plan

Création d'un projet github

install cypress, config typescript

> cypress api (describe, it)

Theoretical part: End to end tests in the development process

workshop

- _The mini basket always shows the number of products in basket_
- _It contains basket entries (with prodcut name, quantity and price)_
- _When empty, it doesn't show the number of products in basket_
- _When empty, it informs the basket is empty_

The professor automize the tests the 2 tests on the mini basket always shown info,
the trainee repeats.

> work with css selectors
> cypress api (only, skip, visit, get, click, should)
> cypress time travel


The professor automize the tests the 2 tests on the mini basket detail.
We use a more precise selector for the product to use.
The trainee repeats.

> dedicated selector (data-testid)

commit

The professor refactors the tests with beforeEach and page objects (CataloguePage).
Distinguish components (miniBasketLink) from behaviours (showMiniBasket, addProductToBasket)

The trainee repeats.


workshop to identify test to verify login
(successful login + failed login)
The trainee automize the test, using what he has learned so far (page object and hooks)
He needs to create a user manually for the first time.
possible list :
- the login accepts valid credentials
- shows an error on invalid password

> cypress api (type)


