import allMovies from "../fixtures/allMovies"

const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies'
Cypress.Commands.add('checkAllMoviesData', () => {
  cy.intercept(baseURL, allMovies ).as('getAllMovies')
    .visit('http://localhost:3000/')
})

Cypress.Commands.add('interceptInfoFetches', () => {
  cy.fixture('../fixtures/single-movie.json')
    .then((json) => {
      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401', json)
    })

  cy.fixture('../fixtures/movie-videos.json')
    .then((json) => {
      cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/337401/videos', json)
    })
});