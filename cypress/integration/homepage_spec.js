describe('Homepage', () => {
  
  beforeEach(() => {
    cy.checkAllMoviesData()
  })
  describe('Onload', () => {

    it('should let user know the movie list is loading', () => {
      cy.get('.loading')
        .contains('💪Loading Your Movies💪')
    })
  
    it('should display header and preview img', () => {
      cy.contains('.app-logo','Netflex')
      cy.get('input[type=search]')
        .should('be.visible') 
      cy.get('.user-menu-btn').find('img')
        .should('be.visible')
      cy.get('.top-img')
        .should('be.visible')
    })
  
    it('should retrieve all the movies', () => {
      cy.contains('.results-title','All Movies')
      cy.get('.poster-image')
        .should('have.length', 10)
        .should('be.visible')
    })
  })
  
  describe('Onclick', () => {
    // beforeEach(() => {
    //   cy.checkAllMoviesData()
    // })

    it('should have / path on load', () => {
      cy.url().should('equal', 'http://localhost:3000/')
    })

    it('should say loading your movies while wating on movie to get displayed', () => {
      cy.get('.poster-image')
        .eq(0).click()
        .get('.glass')
        .contains('💪Loading Your Movies💪')
    })

    it('should have link path to specific movie on poster click', () => {
      cy.get('.movie-poster')
      cy.get('.poster-image')
        .eq(0).click()
        .url().should('not.equal', 'http://localhost:3000/')
        .url().should('equal', 'http://localhost:3000/movies/694919')
    })

    it('should still display movie info on refresh', () => {
      cy.get('.poster-image')
        .eq(0).click()
        .get('.glass')
        .contains('💪Loading Your Movies💪')
        .url().should('equal', 'http://localhost:3000/movies/694919')
        .url().should('not.equal', 'http://localhost:3000/')
      cy.reload()
        .get('.glass')
        .contains('💪Loading Your Movies💪')
        .url().should('equal', 'http://localhost:3000/movies/694919')
        .url().should('not.equal', 'http://localhost:3000/')
    })

  })
 

})