describe('Movie Info Page', () => {
  beforeEach('access Home Page and stub API calls', () => {
    cy.interceptInfoFetches()
    cy.visit('http://localhost:3000/')
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

  it('should display the trailer of the movie selected from the Home Page', () => {
    cy.get('#337401').click()
    cy.get('.trailer').should('have.attr', 'src', 'https://www.youtube.com/embed/KK8FHdFluOQ')
  })

  it('should inform the user if no information was found', () => {
    cy.get('#737173').click()

    cy.get('.details').get('.poster-title').contains('No Information Available.');
    cy.get('.trailer').should('have.attr', 'src', 'https://i.insider.com/5b0d4c731ae6622f008b4f81?')
  })

  it('should return the user to the Home Page when the "Go back" button is selected', () => {
    cy.get('#337401').click()
    cy.get('.close-info-btn').click()
    cy.url().should('eq', 'http://localhost:3000/') 
  })
})
