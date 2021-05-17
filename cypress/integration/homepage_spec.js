describe('Homepage', () => {
  beforeEach(() => {
    cy.checkAllMoviesData()
  })

  it('should retrieve all the movies', () => {
    cy.contains('h3','Netflex')
      // .get('input[type=text]')
  })
})