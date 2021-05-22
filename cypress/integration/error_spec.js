describe('Homepage', () => {
  describe('Status Error', () => {
    it('should display error message for 404 status code', () => {
      cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
        statusCode: 404
      })
      cy.visit('http://localhost:3000/')
        .contains('Sorry! We can\'t find the page you\'re looking for...')
    })

    
  })

  
  

  

})