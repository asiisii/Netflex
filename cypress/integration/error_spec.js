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

    it('should display error msg for other errors', () => {
      cy.intercept('https://rancid-tomatillos.herokuapp.com/api/v2/movies', {
        statusCode: 400
      })
      cy.visit('http://localhost:3000/')
        .contains('Oops! Request failed. Please try again.')
    })

  })

  describe('Invalid Url', () => {
    it('should display error msg for invalid url', () => {
      cy.visit('http://localhost:3000/asdf')
        .get('h1')
        .contains('Page Not Found')
    })

  })
  
  

  

})