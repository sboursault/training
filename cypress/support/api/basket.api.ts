class BasketApi {
  clearBasket() {
    cy.request('/api/baskets')
      .then(response => cy.getCookie('csrftoken')
        .then(csrftoken => {
          cy.request({
            method: 'DELETE',
            url: response.body[0].url,
            headers: {
              'X-CSRFToken': csrftoken.value
            }
          })
        })
      )
  }
}

export default new BasketApi()
