describe('Homepage', () => {
  beforeEach(() => {
    cy.checkAllMoviesData()
  })

  it('should retrieve all the movies', () => {
    cy.get('.loading')
      .contains('💪Loading Your Movies💪')
    cy.contains('.app-logo','Netflex')
    //or
    // cy.get('.app-logo').should('contain', 'Netflex')

    cy.get('input[type=search]')
      .should('be.visible') 
    // can also write just [type=search]
    cy.get('.user-menu-btn').find('img')
      .should('be.visible')
    cy.contains('.results-title','All Movies')
    cy.get('.top-img')
      .should('have.length', 1)
      .should('be.visible')
    cy.get('.poster-image')
      .should('have.length', 10)
      .should('be.visible')
    // hover check 
    // i gotta value 
  })
})
// use get when looking for a class
// use contains to check if the DOM elem contains desired text