// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --


// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import allMovies from "../fixtures/allMovies"

const baseURL = 'https://rancid-tomatillos.herokuapp.com/api/v2/'
Cypress.Commands.add('checkAllMoviesData', () => {
  cy.intercept(baseURL, { fextures: allMovies })
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