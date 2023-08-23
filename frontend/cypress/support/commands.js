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
Cypress.Commands.add('signup', (email, password) => {
  cy.visit("/signup");
  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get("#submit").click();
})
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

Cypress.Commands.add("signupAndLogin", () => {
  cy.visit("/signup");
  cy.get('input[name="email"]').type("test@example.com");
  cy.get('input[name="password"]').type("testpassword");
  cy.get('input[name="name"]').type("Test User");
  cy.get('button[type="submit"]').click();

  cy.visit("/login");
  cy.get('input[name="email"]').type("test@example.com");
  cy.get('input[name="password"]').type("testpassword");
  cy.get('button[type="submit"]').click();
});