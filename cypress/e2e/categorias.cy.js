describe('Acesso à página de categorias', () => {
    beforeEach(() => {
        cy.login(); // faz login antes de cada teste
    });

    it('Deve navegar para categorias via sidebar', () => {
        cy.get('#categorias_nav').click();
        cy.url().should('include', '/categorias');
        cy.contains('Categorias').should('exist');
    });
});
