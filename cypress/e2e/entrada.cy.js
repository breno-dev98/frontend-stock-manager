describe('Acesso à página de entrada', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Deve navegar para entrada via sidebar', () => {
        cy.get('#entradas_nav').click();
        cy.url().should('include', '/entradas');
        cy.contains('Entrada').should('exist');
    });
});