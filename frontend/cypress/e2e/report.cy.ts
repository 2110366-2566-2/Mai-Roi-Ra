// cypress/integration/report.spec.js

describe('Report successfully', () => {


  beforeEach(() => {
    // Before each test, navigate to the login page and perform login
    cy.fixture('user').then((user) => {
        cy.visit('/login')
        cy.get('input[type="text"]').type(user.phoneNumber)
        cy.get('input[type="password"]').type(user.password)
        cy.contains('button', 'Log in').click()
        cy.wait(8000)
    })
  })

  Cypress.on('uncaught:exception', (err, runnable) => {
    // return false to prevent Cypress from failing the test
    return false
  })

  it('checks ProblemItem for non-empty title and detail', () => {
    cy.visit('/supportandservice');
    cy.contains('span', 'Problem').click();
    cy.contains('button', 'Report').click();
    cy.contains('span', 'Event problem').parent() // Select the parent element
      .find('input:first').click();
    cy.get('textarea').type('banana')
    cy.contains('button', 'Done').click();
    cy.wait(7000);
    cy.contains('h2', 'Event').should("be.visible");
    cy.contains('p', 'banana').should("be.visible");
  })

  it('checks ProblemItem for non-empty title and detail', () => {
    cy.visit('/supportandservice');
    cy.contains('span', 'Problem').click();
    cy.contains('button', 'Report').click();
    // cy.contains('span', 'Event problem').parent() // Select the parent element
    //   .find('input:first').click();
    // cy.get('textarea').type('banana')
    cy.contains('button', 'Done').click();
    cy.wait(7000);
    cy.contains('div', "What’s happening?").should('be.visible')
  })
  
})
