// cypress/e2e/login.cy.js
describe('Login', () => {
  it('deve permitir login com credenciais válidas', () => {
    cy.visit('localhost:5173/login');
    cy.get('input[name=email]').type(Cypress.env('EMAIL'));
    cy.get('input[name=senha]').type(Cypress.env('SENHA'));
    cy.get('button[type=submit]').click();
    cy.url().should('include', '/dashboard');
  });
});
