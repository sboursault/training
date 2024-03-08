class BasketApi {

  clearBasket() {
    cy.getCookie('csrftoken')
      .then(cookie => {
        cy.request({
          url : '/api/basket/',
        }).then(response => {
          cy.request({
            method: 'DELETE',
            url : response.body.url,
            headers: {
              'X-CSRFToken': cookie.value
            }
          })
        })        
      })
  }

  addProduct(productId: number, quantity: number = 1) {
    // it seems there is a kind of bug when we call this endpoint with the `auth` part :
    // when we log in, the basket is cleared
    // A workaround is to clear the cookies before login
    // or maybe not to use the `auth` part (login, use this api with the csrf token, and logout)
    // Anyway, the basic auth is not a good practice
    cy.getCookie('csrftoken')
      .then(cookie => {
        cy.request({
          method: 'POST',
          url : '/api/basket/add-product/',
          body: { url: `/api/products/${productId}/`, quantity },
          headers: {
            'X-CSRFToken': cookie.value
          }
        })
      })
    
  }
}

export default new BasketApi()
