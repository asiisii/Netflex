describe('Homepage', () => {
  describe('Status Error', () => {
    it('should display error message for 404 status code', () => {
      cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
        statusCode: 404
      })
      cy.visit('http://localhost:3000/')
        .contains('Sorry! We can\'t find the page you\'re looking for...')
    })

    it('should display error message for 500 status code', () => {
      cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
        statusCode: 500
      })
      cy.visit('http://localhost:3000/')
        .contains('Internal Server Error. Our whole team are now aware.')
    })


  })

  
  

  

})