// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Add testing-library commands
import '@testing-library/cypress/add-commands';

// Custom command for login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command to check form validation
Cypress.Commands.add('checkFormValidation', (fieldName, value, expectedError) => {
  cy.get(`input[name="${fieldName}"]`).type(value).blur();
  if (expectedError) {
    cy.contains(expectedError).should('be.visible');
  }
});

// Custom command to reset database state (if applicable)
Cypress.Commands.add('resetDb', () => {
  // Implement based on your backend setup
  cy.request('POST', '/api/testing/reset');
});

// Custom command to check accessibility
Cypress.Commands.add('checkAccessibility', () => {
  cy.injectAxe();
  cy.checkA11y(null, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa'],
    },
  });
}); 