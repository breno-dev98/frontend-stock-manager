describe('Acesso à página de saída', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Deve navegar para saída via sidebar', () => {
        cy.get('#saidas_nav').click();
        cy.url().should('include', '/saidas');
        cy.contains('Saída').should('exist');
    });
});