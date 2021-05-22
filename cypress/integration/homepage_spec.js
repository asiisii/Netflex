describe('Homepage', () => {
  
  beforeEach(() => {
      cy.checkAllMoviesData()
  })
  
  describe('Onload', () => {
      
    it('should let user know the movie list is loading', () => {
      cy.get('body').then(body => {
        if (body.get('.loading')) {
          cy.contains('💪Loading Your Movies💪')
        } 
      })
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
      cy.wait('@getAllMovies') //alias for our fixtures data
        .its('response.statusCode')
        .should('eq', 200)
      cy.contains('.results-title','All Movies')
        .get('.poster-image')
        .should('have.length', 10)
        .should('be.visible')
    })
  })
  
  describe('Onclick', () => {

    it('should have / path on load', () => {
      cy.url().should('equal', 'http://localhost:3000/')
    })

    it('should say loading your movies while wating on movie to get displayed', () => {
      cy.get('.poster-image')
        .eq(0).click()
        .url().should('equal', 'http://localhost:3000/movies/694919')
        .get('.glass')
        .contains('💪Loading...💪')
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
        .contains('💪Loading...💪')
        .url().should('equal', 'http://localhost:3000/movies/694919')
        .url().should('not.equal', 'http://localhost:3000/')
      cy.reload()
        .get('.glass')
        .contains('💪Loading...💪')
        .url().should('equal', 'http://localhost:3000/movies/694919')
        .url().should('not.equal', 'http://localhost:3000/')
    })

    it.only('should change the number of poster when search match', () => {
      cy.get('.poster-image')
        .should('have.length', 10) 
      cy.get('input[type=search]')
        .should('be.visible')
        .type('mulan')
      cy.get('.poster-image')
        .should('have.length', 1) 
      cy.focused().clear()
      cy.get('input[type=search]')
        .type('m')
      cy.get('.poster-image')
        .should('have.length', 4) 
    })

  })
 

})