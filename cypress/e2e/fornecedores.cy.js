describe('Acesso à página de fornecedores', () => {
    beforeEach(() => {
        cy.login(); // faz login antes de cada teste
    });

    it('Deve navegar para fornecedores via sidebar', () => {
        cy.get('#fornecedores_nav').click();
        cy.url().should('include', '/fornecedores');
        cy.contains('Fornecedores').should('exist');
    });
});
