class AdminApi {

  zut(credentials: string) {
    cy.request({
      method: 'DELETE',
      url: '/api/basket',
      headers: {
        'Authorization': 'Basic ' + btoa(credentials)
      }
    })
  }
}

export default new AdminApi()
