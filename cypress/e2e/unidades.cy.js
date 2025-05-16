describe('Acesso à página de unidades', () => {
    beforeEach(() => {
        cy.login();
    });

    it('Deve navegar para unidades via sidebar', () => {
        cy.get('#unidades_nav').click();
        cy.url().should('include', '/unidades');
        cy.contains('Unidades').should('exist');
    });
});