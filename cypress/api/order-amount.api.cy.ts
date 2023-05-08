
describe('Order amount', () => {

  before(() => { })

  beforeEach(() => { })

  describe('Basket amount equals the sum of (product price x quantity) for each basket entries', () => {

    /**
     * with 1 product A (23.99€) => 1 x 23.99 = 23.99€
     */
    specify('with 1 product A', () => { })

    /**
     * with 2 products A (23.99€) and 3 product B (12.99€) => 2 x 23.99 + 3 x 12.99€ = 86.95€
     */
    specify('with 2 products A and 3 product B', () => { })
  })

  describe('Over 30€, the 7€ for delivery fees are offered', () => {

    /**
     * with 23.99€ => 23.99€ + 7 = 30.99€
     */
    specify('Basket amount bellow 30€', () => { })

    /**
     * with 86.95€ => 23.99€ + 0 = 86.95€
     */
    specify('Basket amount over 30€', () => { })
  })

})