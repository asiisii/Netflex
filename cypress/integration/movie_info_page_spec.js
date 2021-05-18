describe('Movie Info Page', () => {
  beforeEach('access Home Page and stub API calls', () => {
    cy.visit('http://localhost:3000/')

    cy.fixture('../fixtures/single-movie.json')
      .then((json) => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401', json)
      })

    cy.fixture('../fixtures/movie-trailer.json')
      .then((json) => {
        cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401/videos', json)
      })
  })

  it('should render when a user selects a movie from the Home Page', () => {
    cy.get('#337401')
      .click()
      .url().should('eq', 'http://localhost:3000/') // Once we start using Router, this URL will need to change to 'http://localhost:3000/337401'
  })

  it('should display the details of the movie selected from the Home Page', () => {
    cy.get('#337401').click()

    cy.get('.details').get('.poster-title').contains('Mulan')
    cy.get('.details').get('.genre').contains('Action | Adventure | Drama | Fantasy')

    cy.fixture('../fixtures/single-movie.json')
      .then((json) => {
        cy.get('.details').get('.overview').contains(json.movie.overview)
      })

    cy.get('.details').get('.runtime').contains('1hrs 55mins')
    cy.get('.details').get('.release-date').contains('09/04/2020')
    cy.get('.details').get('.rating').contains('5.1/10')
  })

  it('should display the trailer of the movie selected from the Home Page,', () => {
    cy.get('#337401').click()
      .get('.trailer').should('have.attr', 'src', json.movie.)
  })
})
