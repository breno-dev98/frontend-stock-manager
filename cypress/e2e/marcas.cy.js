describe('Acesso à página de marcas', () => {
    beforeEach(() => {
        cy.login(); // faz login antes de cada teste
    });

    it('Deve navegar para marcas via sidebar', () => {
        cy.get('#marcas_nav').click();
        cy.url().should('include', '/marcas');
        cy.contains('Marcas').should('exist');
    });
});
