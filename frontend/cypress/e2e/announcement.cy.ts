// cypress/integration/report.spec.js

describe('Annoucement successfully', () => {


  beforeEach(() => {
    // Before each test, navigate to the login page and perform login
    cy.fixture('organizer').then((organizer) => {
        cy.visit('/login')
        cy.get('input[type="text"]').type(organizer.phoneNumber)
        cy.get('input[type="password"]').type(organizer.password)
        cy.contains('button', 'Log in').click()
        cy.wait(8000)
    })
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from failing the test
    return false
  })
  
  it('checks Annoucement for empty title and detail', () => {
      cy.visit('/profile');
      cy.contains('button', 'Announcement').click();
      cy.contains('button', 'Done').click();
      cy.wait(7000);
      cy.contains('div', " Announcement").should('be.visible')
  })

  it('checks Annoucement for empty title', () => {
      cy.visit('/profile');
      cy.contains('button', 'Announcement').click();
      cy.get('textarea').type('description v1');
      cy.contains('button', 'Done').click();
      cy.wait(7000);
      cy.contains('div', " Announcement").should('be.visible')
  })

  it('checks Annoucement for empty detail', () => {
      cy.visit('/profile');
      cy.contains('button', 'Announcement').click();
      cy.get('input[type="text"]').type('test v1');
      cy.contains('button', 'Done').click();
      cy.wait(7000);
      cy.contains('div', " Announcement").should('be.visible')
  })

  it('checks Announcement for non-empty title and detail', () => {
    cy.visit('/profile');
    cy.contains('button', 'Announcement').click();
    cy.get('input[type="text"]').type('test v1');
    cy.get('textarea').type('description v1');
    cy.contains('button', 'Done').click();
    cy.wait(7000);
  })

  
})
