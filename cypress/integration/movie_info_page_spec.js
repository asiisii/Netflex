describe('Movie Info Page', () => {
  beforeEach('access Home Page and stub API calls', () => {
    cy.visit('http://localhost:3000/')
    cy.fixture('../fixtures/single-movie.json')
      .then((json) => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401', json)
      })
  })

  it('should be rendered when a user selects a movie from the Home Page', () => {
    cy.get('#337401')
      .click()
      .url().should('eq', 'http://localhost:3000/') // Once we start using Router, this URL will need to change to 'http://localhost:3000/337401'
  })

  it('should display the details of the movie selected from the Home Page', () => {

  })
})
