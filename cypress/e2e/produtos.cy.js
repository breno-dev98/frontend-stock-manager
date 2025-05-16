describe('Acesso à página de produtos', () => {
  beforeEach(() => {
    cy.login(); // faz login antes de cada teste
  });

  it('Deve navegar para produtos via sidebar', () => {
    cy.get('#produtos_nav').click();
    cy.url().should('include', '/produtos');
    cy.contains('Produtos').should('exist');
  });
});
