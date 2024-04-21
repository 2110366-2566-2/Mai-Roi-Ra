// cypress/integration/report.spec.js

describe('Report successfully', () => {
  it('checks ProblemItem for non-empty title and detail', () => {
    // Intercept the GET request to fetch ProblemItem data from localhost:5000
    cy.intercept('GET', 'http://localhost:8080/api/v1/problems', (req) => {
      req.reply({
        statusCode: 200,
        body: [
          { title: 'Sample Title 1', description: 'Sample Description 1' },
          { title: 'Sample Title 2', description: 'Sample Description 2' },
          // Add more sample ProblemItem objects as needed
        ],
      }).as('getProblems');
    });

    // Visit the page or perform actions that trigger the request
    // For example:
    cy.visit('/supportandservice');

    // Wait for the interception to resolve before proceeding
    cy.wait('@getProblems');

    // Assuming the ProblemItem exists on the page and has specific classes or IDs
    // Replace '.problem-item' with the actual selector for the ProblemItem component
    cy.get('.ProblemItem').each(($ProblemItem) => {
      // Check that the title is not empty
      cy.wrap($ProblemItem).find('.problem').should('not.have.text', '');

      // Check that the detail is not empty
      cy.wrap($ProblemItem).find('.description').should('not.have.text', '');
    });
  });
});
